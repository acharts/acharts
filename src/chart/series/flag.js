/*
*
* @line图的tag
*
* */

var
    Cartesian = require('./cartesian'),
    Util = require('../../util');

function trySet(obj,name,value){
    if(obj && !obj[name]){
        obj[name] = value;
    }
}

/**
 * @class Chart.Series.Flag
 * 使用线连接数据的数据图序列
 * @extends Chart.Series.Cartesian
 */
function Flag(cfg){
    Flag.superclass.constructor.call(this,cfg);
}

Util.extend(Flag,Cartesian);

Flag.ATTRS = {

    type : 'flag',
    elCls : 'x-chart-flag-series',
    zIndex: 6,
    /**
     * 配置
     * @type {Object}
     */
    flag : null,

    /**
     * y偏离
     * @type {Number}
     */
    distance: 0,

    /**
     * 笔触
     * @type {Object}
     */
    line: null,

    /**
     * 使用html
     * @type {bool}
     */

    custom: false,

    /**
     * 使用html时候的内容
     * @type {String}
     */

    title: null

};

Util.augment(Flag,{
    /**
     *  重写获取point函数
     */
    _getPoints : function(){
        var _self = this,
            data = _self.get('data'),
            xField = _self.get('xField'),
            yField = _self.get('yField'),
            onSeries = _self.get('onSeries'),
            parent = _self.get('parent'),
            distance = _self.get('distance'),
            series = parent.find(onSeries),
            flagAttrs = _self.get('flag'),
            lineAttrs = _self.get('line'),
            xAxis = _self.get('xAxis'),
            yAxis = _self.get('yAxis'),
            points = [];

        cfg = Util.mix({},flagAttrs,lineAttrs);
        Util.each(data,function(item,index){
            var point,sameNum = 0;
            if(Util.isObject(item)){
                var xValue = item[xField];

                //不存在落点线条 则落到坐标轴上面
                if(!series || !series.get('visible')){
                    var _x = xAxis.getOffset(xValue),
                        _y = yAxis.getStartOffset();

                    point = {
                        x: _x,
                        y: _y,
                        xValue: xValue
                    }
                }
                else{
                    point = series.findPointByValue(xValue);
                }

                //若存在坐标轴一样的flag  往上堆叠
                Util.each(data,function(newItem,newIndex){
                    if(newIndex < index && item[xField] == newItem[xField]){
                        sameNum ++;
                    }
                })

                var finalDistance = distance > 0 ? (distance * (sameNum + 1) + cfg.r * 2 * sameNum) : (distance * (sameNum + 1) - cfg.r * 2 * sameNum);
                point = Util.mix({},point,{
                    y: point.y + finalDistance
                });

                point.obj = item;
            }
            _self.processPoint(point,index);
            points.push(point);
        });

        return points;
    },
    /**
     *  重写legend导致的画面变动
     */
    changeShapes : function(points,animate){
        var _self = this,
            flagAttrs = _self.get('flag'),
            lineAttrs = _self.get('line'),
            cfg = Util.mix({},flagAttrs,lineAttrs),
            custom = _self.get('custom'),
            distance = _self.get('distance'),
            groups = _self.get('children');

        points = points || this._getPoints();

        if(custom){
            var customDiv = _self.get('customDiv');
            if(customDiv){
                Util.each(points,function(point,index){
                    var flag = customDiv.childNodes[index],
                        flagWidth = Util.getWidth(flag),
                        x = point.x,
                        y = point.y,
                        flagHeight = Util.getHeight(flag),
                        left = x - flagWidth/2,
                        top = y + distance - flagHeight/2
                    flag.style.cssText = "z-index:5;position:absolute;left:"+ left +"px;top:"+ top +"px";
                });
            }
        }else{
            if(groups){
                Util.each(points,function(point,index){
                   var group =  groups[index],
                       x = point.x,
                       y = point.y,
                       shapes = group.get('children'),
                       circle = shapes[0],line = shapes[1];

                    circle.attr({
                       cx: x,
                       cy: distance > 0 ? (y + cfg.r) : (y - cfg.r)
                    });
                    line.attr({
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y - distance
                    });

                });
            }
        }
    },
    draw : function(points,callback){
        var _self = this,
            animate = _self.get('animate'),
            duration = _self.get('duration');

        if(!animate) {
            Util.each(points, function (item, index) {
                _self._drawShape(item, index);
            });

            _after();
        }else{
            var onSeries = _self.get('onSeries'),
                parent = _self.get('parent');

            var seriesPoints = _self._getPoints();

            var cur = 0,
                sub = [],
                count = seriesPoints.length;

            //动画生成线和对应的点
            Util.animStep(duration,function(factor){
                var pre = cur;
                cur = parseInt((factor) * count,10);
                if(cur > count - 1){
                    cur = count - 1;
                }

                if(cur != pre){
                    sub = points.slice(0,cur + 1);
                    for(var i = pre; i< cur; i++){
                        _findFlagToDraw(seriesPoints[i]);
                    }
                }
                if(factor == 1){
                    _findFlagToDraw(seriesPoints[cur]);
                }
            },_after);
        }

        function _after(){
            _self.bindFlagEvent();
            callback && callback();
        }

        function _findFlagToDraw(currPoint){
            Util.each(points, function (item, index) {
                if(item.x == currPoint.x && !item.isDraw){
                    _self._drawShape(item, index);
                    item.isDraw = true; //防止堆叠时候x值相同而重复画
                }
            });
        }

    },
    /**
     *  根据点绘制
     */
    _drawShape: function(point,index){
        var _self = this,
            flagAttrs = _self.get('flag'),
            lineAttrs = _self.get('line'),
            custom = _self.get('custom'),
            x = point.x,
            y = point.y,
            distance = _self.get('distance'),
            flagShape = _self.get('flagShape'),
            cfg = Util.mix({},flagAttrs,lineAttrs);

        //自定义html
        if(custom){
            var title = _self.get('data')[index]['title'],
                html = '<div class="ac-flags"></div>',
                flag = Util.createDom("<span>" + title + "</span>"),
                outterNode = _self.get('canvas').get('node').parentNode,
                customDiv = _self.get('customDiv');

            outterNode.style.position = 'relative';

            //判断是否存在 不存在则追加并绑定事件
            if(!customDiv){
                customDiv = Util.createDom(html);
                outterNode.appendChild(customDiv);

                _self.bindTooltip(customDiv);
                _self.bindDomEvent(customDiv);

            }
            customDiv.appendChild(flag);
            var flagWidth = Util.getWidth(flag),
                flagHeight = Util.getHeight(flag),
                left = x - flagWidth/2,
                top = y + distance - flagHeight/2
            flag.style.cssText = "z-index:5;position:absolute;left:"+ left +"px;top:"+ top +"px";

            _self.set('customDiv',customDiv);
        }else{

            var group = _self.addGroup();
            //circle
            cfg = Util.mix(cfg,{
                cx: x,
                cy: distance > 0 ? (y + cfg.r) : (y - cfg.r)
            });
            group.addShape('circle',cfg);

            //line
            cfg = Util.mix(cfg,{
                x1: x,
                y1: y,
                x2: x,
                y2: y - distance
            });
            group.addShape('line',cfg);
        }
    },
    /**
     * 开放事件接口
     */
    bindFlagEvent: function(){
        var _self = this;

        _self.on('click',function(ev){
            _self.fireUp('flagclick',ev);
        });
        _self.on('mouseover',function(ev){
            _self.fireUp('flagmouseover',ev);
        });
        _self.on('mouseout',function(ev){
            _self.fireUp('flagmouseout',ev);
        });
    },
    /**
     *  自定义事件时，添加tooltip
     */
    bindTooltip: function(element){
        var _self = this,
            parent = _self.get('parent');

        Util.addEvent(element,'mouseover',function(){
            if(parent.setActivedItem){
                if(!parent.isItemActived(_self)){
                    parent.setActivedItem(_self);
                }
            }
        });
    },
    /**
     * 自定义flag开放事件接口
     */
    bindDomEvent: function(element){
        var _self = this;
        Util.addEvent(element,'click',function(ev){
            _self.fireUp('flagclick',ev);
        });
        Util.addEvent(element,'mouseover',function(ev){
            _self.fireUp('flagmouseover',ev);
        });
        Util.addEvent(element,'mouseout',function(ev){
            _self.fireUp('flagmouseout',ev);
        });
    },
    /**
     * 显示
     */
    show : function(){
        var _self = this,
            customDiv = _self.get('customDiv');
        _self.get('el').show();
        _self.set('visible',true);

        if(customDiv){
            customDiv.style.display = 'block';
        }
    },
    /**
     * 隐藏
     */
    hide : function(){
        var _self = this,
            customDiv = _self.get('customDiv');
        _self.get('el').hide();
        _self.set('visible',false);

        if(customDiv){
            customDiv.style.display = 'none';
        }
    }
});

module.exports = Flag;