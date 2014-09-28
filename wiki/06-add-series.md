# 自定义图表

---

如何自己创建一个图表

---

## 目录

  * 如何扩展
  * 没有坐标系的图表
  * 有坐标系的图表

### 如何创建一个新的图表序列

  * 我们来看一下一个图表序列需要那些功能

    * 将数据序列转换成坐标系或者画布上的点
    * 将点绘制成对应的图形，初始化时的动画
    * 鼠标在画布上移动时，图表序列作出相应
    * 数据发生改变时，图形改变，并有相应的动画

  * acharts 的图表序列提供了2个基类，2扩展，对上面的功能提供了一些便利

    * [Series](http://spmjs.io/docs/achart-series/wiki/01-base.html)图表序列基类，一切图表序列的父类
    * [Series.Cartesian](http://spmjs.io/docs/achart-series/wiki/02-cartesian.html) 使用坐标轴的图表序列的基类
    * [Series.Stacked](http://spmjs.io/docs/achart-series/wiki/07-stacked.html) 需要层叠功能的图表序列
    * [Series.ItemGroup](http://spmjs.io/docs/achart-series/wiki/08-itemgroup.html) 有多个图形子项的序列

### 不使用坐标轴的图表序列

  * 不使用坐标轴的图表序列，需要继承[Series](http://spmjs.io/docs/achart-series/wiki/01-base.html)，需要以下步骤：

    1. 覆写绘制序列的函数

      * draw(points,callback) 绘制函数，绘制完成后调用callback方法
      * processColor(color) 如果需要处理颜色覆写此方法

    2. 覆写转换数据的方法

      * getPointByIndex(value,index) 处理单个数值，根据数值在数组中的索引获取对应的点
      * getPointByValue(xValue,yValue) 将对应的x值和y值传入函数，如果数据源是数组，则在返回的点上附加 point.arr = arr;如果数据源是对象则 point.obj = obj;
      * processPoint(point,index) 如果需要特别处理转换的点，覆写此函数

    3. 覆写图形更改的方法

      * changeShapes(points) 数据发生改变时触发
    4. 覆写状态相关的方法

      * setActiveStatus(actived) actived 状态发生改变时使用

    5.如果处理鼠标事件覆写

      * bindMouseOver()
      * bindMouseOut()

    6. 如果需要显示tooltip信息，覆写

      * getTrackingInfo(ev) 获取当前的点信息

  * 必须覆写的方法

    * draw(points,callback) 绘制内部图形
    * changeShapes(points) 图形发生改变时
    * 当数据类型是单个数值时，覆写getPointByIndex(value,index)，否则覆写getPointByValue(xValue,yValue)

#### 示例

  * 漏斗图示例

````html
<div id="c1"></div>
````

````javascript

seajs.use('acharts',function(){
  var Util = AChart.Util,
    Series = AChart.Series,
    ActivedGroup = AChart.Actived.Group;

  var Funnel = function(cfg){
    Funnel.superclass.constructor.call(this,cfg);
  };

  Util.extend(Funnel,Series);

  Util.mixin(Funnel,[ActivedGroup]);

  Funnel.ATTRS = {
    colors : ['#ff6600','#b01111','#ac5724','#572d8a'],
    xField : 'name',
    yField : 'value',
    width : null,
    item : {
      stroke : '#fff'
    }
  };

  Util.augment(Funnel,{
    renderUI : function(){
      this._sortData(this.get('data'));
      this._initGroup();
      Funnel.superclass.renderUI.call(this);
      
    },
    //存放漏斗图形的分组
    _initGroup : function(){
      var _self = this,
        group = _self.addGroup();
      _self.set('group',group);
    },
    //处理节点前，对数据进行排序
    _sortData : function(data){
      data.sort(function(obj1,obj2){
        return obj2.value - obj1.value;
      });
    },
    getPointByValue : function(name,value) {
      return {xValue : name,value : value};
    },

    processPoint : function(point,index){
      var _self = this,
        width = _self.get('width'),
        startPoint = _self._getStartPoint(),
        centerX = (startPoint.x + width/2),
        avgHeight = _self._getAvgHeight(),
        curY = startPoint.y + avgHeight * index,
        centerY = curY + avgHeight/2;

      point.x = centerX;
      point.y = centerY;

      point.beginY = curY;
      point.endY = curY + avgHeight;

    },
    draw : function(points,callback){
      var _self = this;

      Util.each(points,function(point,index){
        _self._drawPoint(point,index);
      });

      callback && callback();
    },
    _getAvgHeight : function(){
      return this.get('width')/this.get('data').length;
    },
    _drawPoint : function(point,index){
      var _self = this,
        cfg = _self._getItemCfg(point,index),
        group = _self.get('group');

      cfg.path = _self._getItemPath(point,index);
       var shape = group.addShape('path',cfg);
      shape.set('point',point);

      if(_self.get('labels')){
        _self.addLabel(point.xValue,point);
      }
    },
    //省略逻辑直接设置20,20,否则需要根据plotRange计算
    _getStartPoint : function(){
      return {x : 20,y:20};
    },
    //获取最大的值
    _getMaxValue : function(){
      return this.get('data')[0].value;
    },
    //获取节点的path
    _getItemPath : function(point,index){
      var _self = this,
        max = _self._getMaxValue(),
        width = _self.get('width'),
        points = _self.getPoints(),
        nextValue = points[index + 1] ? points[index + 1].value : 0;

      var tl = point.x - (point.value/max) * width/2;
        tr = point.x + (point.value/max) * width/2,
        bl = point.x - (nextValue/max) * width/2,
        br = point.x + (nextValue/max) * width/2;

      return [['M',tl,point.beginY],['L',tr,point.beginY],['L',br,point.endY],['L',bl,point.endY],['z']];
    },
    _getItemCfg : function(point,index){
      var _self = this,
        colors = _self.get('colors'),
        item = _self.get('item'),
        rst = {};

      Util.mix(rst,item);
      rst.fill = colors[index%colors.length];
      point.color = rst.fill;
      return rst;
    },
    getActiveItems : function(){
      return this.get('group').get('children');
    },
    //覆写 ActivedGroup 的是否处于激活状态
    isItemActived : function(item) {
      return item.get('actived');
    },
    //覆写设置子项 actived状态的变化
    setItemActived : function(item,actived){
      var _self = this,
        color = item.getCfgAttr('attrs').fill; //初始化时的颜色

      if(actived){
        item.set('actived',true);
        item.attr('fill',Util.highlight(color,0.15));
      }else{
        item.set('actived',false);
        item.attr('fill',color);
      }
    },
    bindMouseOver : function(){
      var _self = this;

      _self.get('group').on('mouseover',function(ev){
        var item = ev.target.shape;
        if(item){
          _self.setActivedItem(item);
        }
      });
    },
    //获取当前定位的点
    getTrackingInfo : function(){
      var _self = this,
        item = _self.getActived();
      return item && item.get('point');
    }

  });

  Series.Funnel = Funnel;

  var chart = new AChart({
    id : 'c1',
    width : 500,
    height : 500,
    tooltip : {
      title : {
        'font-size' : '16px',
        y : 10,
        x : 5,
        fill : '#ff7c26'
      }
    },
    legend : null,
    series : [
      {   
        name : '流量分析',
        type : 'funnel',
        width : 400,
        labels : {
          label : {
            'font-size' : '16px',
            fill : '#fff'
          }
        },
        data : [
          {value:60, name:'访问'},
          {value:40, name:'咨询'},
          {value:20, name:'订单'},
          {value:80, name:'点击'},
          {value:100, name:'展现'}
        ]
      }
    ]

  });

  chart.render();
  

});

````




