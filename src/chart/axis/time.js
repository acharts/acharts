/**
 * @fileOverview 时间坐标轴
 * @ignore
 */


var Util = require('../../util'),
  NAixs = require('./number');

function parseTime(d){
  if(d instanceof Date){
    return d.getTime();
  }
  if(Util.isNumber(d)){
    return d;
  }
  var date = d;
  if(Util.isString(d)){
    date = d.replace('-','\/');
    date = new Date(date).getTime();
  }
  return date;
}

/**
 * @class Chart.Axis.Time
 * 时间坐标轴
 */
var Time = function(cfg){
  Time.superclass.constructor.call(this,cfg)
};

Time.ATTRS = {

  /**
   * 开始日期时间
   * @type {Date}
   */
  startDate : null,

  dateFormat : null,
  /**
   * 结束日期时间
   * @type {Date}
   */
  endDate : null
};

Util.extend(Time,NAixs);

Util.augment(Time,{
  //渲染控件前
  beforeRenderUI : function(){
    var _self = this;
    
    
    var startTime = parseTime(_self.get('startDate')),
      endTime = parseTime(_self.get('endDate'));
    if(startTime && !_self.get('min')){
      _self.set('min',startTime);
    }
    if(endTime && !_self.get('max')){
      _self.set('max',endTime);
    }

    Time.superclass.beforeRenderUI.call(_self);

  }
});

module.exports = Time;
