/**
 * @fileOverview 所有数据图形序列的容器,管理这些序列的增删，active状态，事件处理等等
 * @ignore
 */


var Util = require('achart-util'),
  ActivedGroup = require('achart-actived').Group,
  PlotItem = require('achart-plot').Item,
  Legend = require('achart-legend'),
  Tooltip = require('achart-tooltip'),
  Axis = require('achart-axis'),
  Series = require('achart-series');

function min(x,y){
  return x > y ? y : x;
}
function max(x,y){
  return x > y ? x : y;
}

/**
 * @class Chart.SeriesGroup
 * 数据序列的容器
 * @protected
 */
function Group(cfg){
  Group.superclass.constructor.call(this,cfg);
}

Group.ATTRS = {
  elCls : 'x-chart-series-group',
  zIndex : 5,
  plotRange : null,
  /**
   * 存在多个序列时，线的颜色，marker的颜色
   * @type {Object}
   */
  colors : ['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a'],
  /**
   * 如果使用marker，那么不同图形序列的形状
   * @type {Array}
   */
  symbols : ['circle','diamond','square','triangle','triangle-down'],
  /**
   * 序列图的统一配置项，不同的序列图有不同的配置项例如：
   *
   *  - lineCfg : 折线图的配置项
   *  - columnCfg : 柱状图的配置项
   * @type {Object}
   */
  seriesOptions : {},

  /**
   * y轴的坐标个数限制
   * @type {Array}
   */
  yTickCounts : [3,5],
  /**
   * x轴的坐标轴个数限制
   * @type {Array}
   */
  xTickCounts : [5,10],
  /**
   * 数据图形序列的配置项
   * @type {Array}
   */
  series : null,
  /**
   * 图例
   * @type {Object}
   */
  legend : null,
  /**
   * x 坐标轴
   * @type {Chart.Axis}
   */
  xAxis : null,
  /**
   * y 坐标轴
   * @type {Array|Chart.Axis}
   */
  yAxis : null,
  /**
   * 提示信息的配置项
   * @type {Object}
   */
  tooltip : null,
  /**
   * @private
   * 缓存的层叠数据
   * @type {Array}
   */
  stackedData : null,
  /**
   * 可以设置数据序列共同的数据源
   * @type {Array}
   */
  data : null,
  /**
   * 活动子项的名称，用于组成 itemactived,itemunactived的事件
   * @protected
   * @type {String}
   */
  itemName : 'series'

};

Util.extend(Group,PlotItem);

Util.mixin(Group,[ActivedGroup]);

Util.augment(Group,{


  //渲染控件
  renderUI : function(){
    var _self = this;
    Group.superclass.renderUI.call(_self);
    //_self._renderTracer();
    _self._renderLegend();

    _self._renderSeries();

    _self._renderAxis();
    _self._addSeriesAxis();

    _self._paintAxis(_self.get('xAxis'),'xAxis');
    _self._paintAxis(_self.get('yAxis'),'yAxis');
    _self._paintSeries();

    _self._renderTooltip();
  },
  //绑定事件
  bindUI : function(){
    var _self = this;
    Group.superclass.bindUI.call(_self);
    _self.bindCanvasEvent();
    _self.bindChartEvent();
  },
  //绑定鼠标在画板上移动事件
  bindCanvasEvent : function(){
    var _self = this,
      tipGroup = _self.get('tipGroup'),
      triggerEvent = tipGroup ? tipGroup.get('triggerEvent') : '',
      canvas = _self.get('canvas');

    if (triggerEvent == 'click') {
      function __documentClick(ev){
        if(!Util.contains(canvas.get('node'), ev.target)&&canvas.get('node') != ev.target){
          _self.onTriggerOut(ev);
          Util.removeEvent(document,'click', __documentClick);
        }
      }
      canvas.on('click',function(ev){
        _self.onCanvasMove(ev);
        setTimeout(function(){
          Util.removeEvent(document,'click', __documentClick);
          Util.addEvent(document,'click', __documentClick);
        })
      });

    } else {
      canvas.on('mousemove',Util.wrapBehavior(_self,'onCanvasMove'));
      canvas.on('mouseout',Util.wrapBehavior(_self,'onMouseOut'));
    }
  },
  //绑定图表事件
  bindChartEvent : function(){
    var _self = this,
      canvas = _self.get('canvas');

    function fireChartEvent(name,ev){
      var point = canvas.getPoint(ev.clientX,ev.clientY),
        info = _self.getPointInfo(point,ev);
      _self.fireUp(name,info);
    }

    canvas.on('click',function(ev){
      var point = canvas.getPoint(ev.clientX,ev.clientY);
      if(_self._isInAxis(point)){
        var info = _self.getPointInfo(point,ev);
        _self.fireUp('plotclick',info);
      }
    });

    canvas.on('mousemove',function(ev){
      var point = canvas.getPoint(ev.clientX,ev.clientY),
        isOver = _self.get('isOver');
      if(_self._isInAxis(point)){
        var info = _self.getPointInfo(point,ev);
        _self.fireUp('plotmove',info);
        if(!isOver){
          _self.fireUp('plotover',info);
          _self.set('isOver',true);
        }
      }else if(isOver){
        _self.fireUp('plotout');
        _self.set('isOver',false);
      }
    });
  },
  //获取图标上对应位置的信息，待扩充
  getPointInfo : function(point,ev){
    var _self = this,
      shape = ev.target.shape;
    return Util.mix({shape : shape},point);
  },
  //处理鼠标在画板上移动
  onCanvasMove : function(ev){
    var _self = this,
      canvas = _self.get('canvas'),
      tipGroup = _self.get('tipGroup'),
      point,
      tipInfo;

    if(!tipGroup){
      return;
    }
    point = canvas.getPoint(ev.clientX,ev.clientY);
    if(_self._isInAxis(point)){
      _self._processTracking(point,tipGroup);
    }else{
      _self.onMouseOut();
    }
  },
  // 处理隐藏tip事件
  onTriggerOut : function(ev){
    var _self = this,
      tipGroup = _self.get('tipGroup');
    _self.clearActivedItem();
    //标志从显示到隐藏
    if(tipGroup.get('visible')){
      if(tipGroup.get('shared')){
        Util.each(_self.getVisibleSeries(),function(series){
          var markers = series.get('markersGroup');
          markers && markers.clearActivedItem();
        });
      }
      _self._hideTip();
    }
  },

  onMouseOut : function(ev){
    var _self = this;
    if(ev && ev.target != _self.get('canvas').get('none')){
      return;
    }
    _self.onTriggerOut(ev);

  },
  /**
   * 获取所有的数据序列
   * @return {Array} [description]
   */
  getSeries : function(){
    return this.get('children');
  },
  //处理鼠标跟随事件
  _processTracking : function(point,tipGroup){
    var _self = this,
      sArray = [],
      //prePoint = _self.get('prePoint'),
      tipInfo;


    if(!tipGroup.get('shared')){
      var activedItem = _self.getActived();
      activedItem && sArray.push(activedItem);
    }else{
      sArray = _self.getSeries();
    }

    Util.each(sArray,function(series){
      if(series && series.get('stickyTracking') && series.get('visible')){
        series.onStickyTracking({point : point});
      }
    });
    if(sArray.length){
      tipInfo = _self._getTipInfo(sArray,point);
      if(tipInfo.items.length){
        _self._showTooltip(tipInfo.title,tipInfo.point,tipInfo.items);
      }

    }
  },
  //获取显示tooltip的内容
  _getTipInfo : function(sArray,point){
    var rst = {
      items : [],
      point : {}
    };
    var count = 0,
      renderer = this.get('tipGroup') && this.get('tipGroup').get('pointRenderer');
    Util.each(sArray,function(series,index){
      var info = series.getTrackingInfo(point),
          item = {},
          title,
          invert = series.get('invert'),
          xName = invert ? 'y' : 'x',
          yName = invert ? 'x' : 'y';

      if(info){
        if(series.get('visible')){
          var formatter = renderer;
          if(series.get('pointRenderer')){
            formatter = series.get('pointRenderer');
          }
          count = count + 1;
          var tipInfo = series.getTipInfo(info);
          if(Util.isObject(tipInfo)){
            rst.items.push(tipInfo);
          }else if(Util.isArray(tipInfo) && Util.isObject(tipInfo[0])){
            rst.items = rst.items.concat(tipInfo);
          }else{
            item.name = series.get('name');
            item.value = formatter ? formatter(info,series) : tipInfo;
            item.color = info.color || series.get('color');
            item.suffix = series.get('suffix');
            rst.items.push(item);
          }
          var markersGroup = series.get('markersGroup');
          if(markersGroup && markersGroup.get('single')){
            var marker = markersGroup.getChildAt(0);
            marker && marker.attr({
              x :info.x,
              y : info.y
            });
          }
        }
        if(series.get('xAxis')){
          title = series.get('xAxis').formatPoint(info.xValue);
        }else{
          title = info.xValue;
        }
        if(count == 1){
          rst.title =  title;
          if(info[xName]){
            rst.point[xName] = info[xName];
            if(sArray.length == 1){
              rst.point[yName] = info[yName];
            }else{
              rst.point[yName]  = point[yName] ;
            }
          }else{
            rst.point[xName] = point[xName];
            rst.point[yName] = point[yName] ;
          }

        }
      }
    });

    return rst;
  },
  //显示tooltip
  _showTooltip : function(title,point,items){
    var _self = this,
      tooltip = _self.get('tipGroup'),
      prePoint = _self.get('prePoint');
    if(!prePoint || prePoint.x != point.x || prePoint.y != point.y){
      tooltip.setPosition(point.x,point.y);
      _self.set('prePoint',point);
      if(!tooltip.get('visible')){
        tooltip.show();
      }
      tooltip.setTitle(title);
      tooltip.setItems(items);
    }
  },
  //隐藏tip
  _hideTip : function(){
    var _self = this,
      tipGroup = _self.get('tipGroup');
    if(tipGroup && tipGroup.get('visible')){
      tipGroup.hide();
      _self.set('prePoint',null);
    }
  },
  //是否在坐标系内
  _isInAxis : function(point){
    var _self = this,
      plotRange = _self.get('plotRange');

    return plotRange.isInRange(point);
  },
  //渲染所有的序列
  _renderSeries : function(){
    var _self = this,
      series = _self.get('series');

    Util.each(series,function(item,index){
      _self.addSeries(item,index);
    });
  },
  //渲染legend
  _renderLegend : function(){
    var _self = this,
      legend = _self.get('legend'),
      legendGroup;

    if(legend){
      legend.items = legend.items || [];
      legend.plotRange = _self.get('plotRange');
      legendGroup = _self.get('parent').addGroup(Legend,legend);
      _self.set('legendGroup',legendGroup);
    }
  },
  //渲染tooltip
  _renderTooltip : function(){
    var _self = this,
      tooltip = _self.get('tooltip'),
      tipGroup;
    if(tooltip){
      tooltip.plotRange = _self.get('plotRange');
      tipGroup = _self.get('parent').addGroup(Tooltip,tooltip);
      _self.set('tipGroup',tipGroup);
    }
  },
  _renderAxis : function(){
    var _self = this,
      xAxis = _self.get('xAxis'),
      yAxis = _self.get('yAxis');
    if(xAxis && !xAxis.isGroup){
      xAxis = _self._createAxis(xAxis);
      _self.set('xAxis',xAxis);
    }

    if(Util.isArray(yAxis) && !yAxis[0].isGroup){ //如果y轴是一个数组
      var temp = [];
      Util.each(yAxis,function(item){
        temp.push(_self._createAxis(item));
        _self.set('yAxis',temp);
      });
    }else if(yAxis && !yAxis.isGroup){
      if(xAxis && xAxis.get('type') == 'circle'){
        yAxis.type = 'radius';
        yAxis.circle = xAxis;
      }
      yAxis = _self._createAxis(yAxis);
      _self.set('yAxis',yAxis);
    }


  },
  //创建坐标轴
  _createAxis : function(axis){
    var _self = this,
      type = axis.type,
      C,
      name;
    if(!type && axis.categories){
      type = 'category';
    }
    if(type == 'category' || type == 'timeCategory'){
      if(!axis.categories){
        axis.autoTicks = true; //标记是自动计算的坐标轴
      }
    }else if(!axis.ticks && type != 'circle'){
      axis.autoTicks = true; //标记是自动计算的坐标轴
    }

    axis.plotRange = _self.get('plotRange');
    axis.autoPaint = false;  //暂时不绘制坐标轴，需要自动生成坐标轴

    type = type || 'number';
    name = Util.ucfirst(type);
    C = Axis[name];
    if(C){
      return  _self.get('parent').addGroup(C,axis);
    }
    return null;
  },
  //获取y轴的坐标点
  _caculateAxisInfo : function(axis,name){
    if(axis.get('type') == 'category'){
      return this._caculateCategories(axis,name);
    }
    var _self = this,
      data = [],
      type = axis.get('type'),
      length = axis.getLength(),
      stackType,
      series,
      min,
      max,
      interval,
      tickCounts = (name == 'xAxis' ? _self.get('xTickCounts') :  _self.get('yTickCounts')) || [],
      autoUtil,
      rst;
      if(type == 'number' || type == 'radius') {
        min = axis.getCfgAttr('min');
        max = axis.getCfgAttr('max');
        autoUtil = Axis.Auto;
      }else if(type == 'time'){
        var startDate = axis.get('startDate'),
          endDate = axis.get('endDate');
        if(startDate){
          min = startDate.getTime();
        }
        if(endDate){
          max = endDate.getTime();
        }
        autoUtil = Axis.Auto.Time;
      }else if(type == 'timeCategory'){
        autoUtil = Axis.Auto.TimeCategory;
      }

      interval = axis.getCfgAttr('tickInterval');

    series = _self._getRelativeSeries(axis,name);

    var cfg = {
      min : min,
      max : max,
      minCount : tickCounts[0],
      maxCount : tickCounts[1],
      interval: interval
    };
    if(name == 'yAxis' && series.length){
      stackType = series[0].get('stackType');
    }
    if(stackType && stackType != 'none'){
      data = _self.getStackedData(axis,name);
    }else{
      data = _self.getSeriesData(axis,name);
    }
    if(data.length){
      cfg.data = data;

      rst =  autoUtil.caculate(cfg,stackType);
    }else{
      rst = {
        ticks : []
      };
    }

    return rst;

  },
  _caculateCategories : function(axis,name){
    var _self = this,
      data = _self.getSeriesData(axis,name),
      categories = [];
      if(data.length){
        categories = categories.concat(data[0]);
      }
    if(data.length > 1 && !_self.get('data')){ //不共享data时
      for (var i = 1; i < data.length; i++) {
        var arr = data[i];
        Util.each(arr,function(value){
          if(Util.indexOf(categories,value) == -1){
            categories.push(value);
          }
        });
      };
    }
    return {
      categories : categories
    };
  },
  /**
   * 获取数据序列的数据
   * @protected
   * @param  {Chart.Axis} axis 坐标轴
   * @param  {String} name 坐标轴名称
   * @return {Array} 数据集合
   */
  getSeriesData : function(axis,name,stacked){
    var _self = this,
      data = [],
      series = _self._getRelativeSeries(axis,name);
    axis = axis || _self.get('yAxis');
    name = name || 'yAxis';

    Util.each(series,function(item){
      if(name == 'xAxis' || (stacked && item.isStacked && item.isStacked())|| (!stacked &&(!item.isStacked || !item.isStacked()))){
        if(item.get(name) == axis){
          var arr = item.getData(name);
          if(arr.length){
            data.push(arr);
          }
        }
      }
    });

    return data;
  },
  //转换数据,将json转换成数组
  _parseData : function(obj,fields){
    var rst = [];
    Util.each(fields,function(key){
      rst.push(obj[key]);
    });
    return rst;
  },
  /**
   * @protected
   * 获取层叠数据
   * @param  {String} stackType 层叠类型
   * @param  {Chart.Axis} axis 坐标轴
   * @param  {String} name 坐标轴名称
   * @return {Array} 数据集合
   */
  getStackedData : function(axis,name){
    var _self = this,
      data,
      first
      stackedData = _self.get('stackedData'),
      rst = [],
      arr = [];
    if(stackedData){
      arr = stackedData;
    }else{
      data = _self.getSeriesData(axis,name,true);
      first = data[0],
      min = Math.min.apply(null,first);

      Util.each(first,function(value,index){
        var temp = value;
        for(var i = 1 ; i< data.length; i++){
          var val = data[i][index];
          temp += val;
          if(min == null || val < min){
            min = val;
          }
        }
        arr.push(temp);
      });
      arr.push(min);
      _self.set('stackedData',arr);
    }
    var otherData = _self.getSeriesData(axis,name,false);
    if(otherData.length){
      rst.push(arr);
      rst = rst.concat(otherData);
    }else{
      rst = arr;
    }
    
    return rst;
  },
  //name 标示是xAxis ,yAxis and so on
  _paintAxis : function(axis,name){
    var _self = this,
      arr;

    if(Util.isArray(axis)){
      arr = axis;
    }else{
      arr = [axis];
    }

    Util.each(arr,function(item,index){
      if(_self._hasRelativeSeries(item,name)){
        if(item.get('autoTicks')){
          var info = _self._caculateAxisInfo(item,name);
          item.changeInfo(info);
        }

        item.paint();
      }

    });

  },
  _getRelativeSeries : function(axis,name){
    var _self = this,
      series = _self.getVisibleSeries(),
      rst = [];

    Util.each(series,function(item){
      if(item.get(name) == axis){
        rst.push(item);
      }
    });
    return rst;
  },
  //是否存在关联的数据序列
  _hasRelativeSeries : function(axis,name){
    var _self = this,
      series = _self.getVisibleSeries(),
      rst = false;

    Util.each(series,function(item){
      if(item.get(name) == axis){
        rst = true;
        return false;
      }
    });
    return rst;

  },
  //数据变化或者序列显示隐藏引起的坐标轴变化
  _resetAxis : function(axis,type){

    if(!axis.get('autoTicks')){//如果是非自动计算坐标轴，不进行重新计算
      if(axis.isRangeChange()){
        axis.change({
          ticks : axis.get('ticks')
        });
      }
      return;
    }
    type = type || 'yAxis';

    this.set('stackedData',null);

    var _self = this,
      info = _self._caculateAxisInfo(axis,type);

    axis.change(info);
  },
  _resetSeries : function(){
    var _self = this,
      series = _self.getSeries();
    Util.each(series,function(item){
      if(item.get('visible')){
        item.repaint();
      }
    });
  },
  /**
   * 重新绘制数据序列
   */
  repaint : function(){
    var _self = this,
      legendGroup = _self.get('legendGroup'),
      xAxis = _self.get('xAxis'),
      yAxis = _self.get('yAxis');
    xAxis && _self._resetAxis(xAxis,'xAxis');
    if(yAxis){
      if(Util.isArray(yAxis)){
        Util.each(yAxis,function(axis){
          _self._resetAxis(axis,'yAxis');
        });
      }else{
        _self._resetAxis(yAxis,'yAxis');
      }
    }
    _self._resetSeries();
    if(legendGroup){
      legendGroup.resetPosition();
    }
  },
  /**
   * 改变数据
   * @param  {Array} data 数据
   */
  changeData : function(data){
    var _self = this,
      series = _self.getSeries(),
      fields = _self.get('fields');

    _self.set('data',data);

    Util.each(series,function(item,index){
      if(fields){
        var arr = _self._getSeriesData(item.get('name'),index);
        item.changeData(arr);
      }else{
        if(Util.isArray(data[0])){
          item.changeData(data[i]);
        }else{
          item.changeData(data);
        }
      }
    });
    _self.repaint();
  },
  //根据series获取data
  _getSeriesData : function(name,index){
    var _self = this,
      data = _self.get('data'),
      fields = _self.get('fields'),
      obj = data[index];
    if(name){
      Util.each(data,function(item){
        if(item.name == name){
          obj = item;
          return false;
        }
      });
    }
    return _self._parseData(obj,fields);
  },
  //获取默认的类型
  _getDefaultType : function(){
    var _self = this,
      seriesCfg = _self.get('seriesOptions'),
      rst = 'line'; //默认类型是线
    Util.each(seriesCfg,function(v,k){
      rst = k.replace('Cfg','');
      return false;
    });
    return rst;
  },
  /**
   * 获取显示的数据序列
   * @return {Chart.Series[]} 数据序列集合
   */
  getVisibleSeries : function(){
    var _self = this,
      series = _self.getSeries();
    return Util.filter(series,function(item){
      return item.get('visible');
    });
  },
  /**
   * 添加数据序列
   * @param {Chart.Series} item 数据序列对象
   */
  addSeries : function(item,index){
    var _self = this,
      type = item.type || _self._getDefaultType(),
      cons = _self._getSeriesClass(type),
      cfg = _self._getSeriesCfg(type,item,index),
      series ;
    cfg.autoPaint = cfg.autoPaint || false;

    series  = _self.addGroup(cons,cfg);
    _self._addLegendItem(series);
    return series;
  },
  //绘制数据线
  _paintSeries : function(){
    var _self = this,
      series = _self.getSeries();

    Util.each(series,function(item){
      item.paint();
    });
  },
  _addSeriesAxis : function(){
    var _self = this,
      series = _self.getSeries();

    Util.each(series,function(item){
      if(!(item instanceof Series.Cartesian)){
        return true;
      }
      //x轴
      if(!item.get('xAxis')){
        item.set('xAxis', _self.get('xAxis'));
      }
      //y轴
      var yAxis = _self.get('yAxis');

      if(item.get('yAxis') == null){
        if(Util.isArray(yAxis)){
          item.set('yAxis',yAxis[0]);
        }else{
          item.set('yAxis',yAxis);
        }
      }
      //多个y轴时
      if(Util.isNumber(item.get('yAxis'))){
        item.set('yAxis',yAxis[item.get('yAxis')]);
      }
    });

  },
  /**
   * 显示series
   * @param  {Chart.Series} series 数据序列对象
   */
  showChild : function(series){
    var _self = this,
      yAxis = series.get('yAxis');
    if(!series.get('visible')){
      series.show();
      if(yAxis){
        _self._resetAxis(yAxis);
        _self._resetSeries();
      }
    }
  },
  /**
   * 隐藏series
   * @param  {Chart.Series} series 数据序列对象
   */
  hideChild : function(series){
    var _self = this,
      yAxis = series.get('yAxis');
    if(series.get('visible')){
      series.hide();
      if(yAxis){
        _self._resetAxis(yAxis);
        _self._resetSeries();
      }
    }
  },
  _addLegendItem : function(series){
    var _self = this,
      legendGroup = _self.get('legendGroup'),
      markers = series.get('markers');

    var symbol = markers && markers.marker.symbol;

    legendGroup && legendGroup.addItem({
      color : series.get('color'),
      name : series.get('name'),
      type : series.get('legendType'),
      symbol : symbol,
      item : series
    });
  },
  //获取序列的配置信息
  _getSeriesCfg : function(type,item,index){
    var _self = this,
      seriesCfg = _self.get('seriesOptions'),
      colors = _self.get('colors'),
      data = _self.get('data'),
      fields = _self.get('fields'),
      symbols = _self.get('symbols');

    item = Util.mix(true,{},seriesCfg[type + 'Cfg'],item);

    item.invert = _self.get('invert');
    
    //颜色
    if(!item.color && colors.length){
      item.color = colors[index % (colors.length)];
    }
    //marker的形状
    if(item.markers && item.markers.marker && !item.markers.marker.symbol){
      item.markers.marker.symbol = symbols[index % symbols.length];
    }
    if(data && !item.data){
      if(fields){
        item.data = _self._getSeriesData(item.name,index);
      }else{
        item.data = data;
      }
    }
    return item;
  },
  //根据类型获取构造函数
  _getSeriesClass : function(type){
    var name = Util.ucfirst(type),
      c = Series[name] || Series;
    return c;
  },
  remove : function(){
    var _self = this,
      canvas = _self.get('canvas');
    canvas.off('mousemove',Util.getWrapBehavior(_self,'onCanvasMove'));
    canvas.off('mouseout',Util.getWrapBehavior(_self,'onMouseOut'));

    Group.superclass.remove.call(_self);
  }
});

module.exports = Group;
