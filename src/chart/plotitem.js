/**
 * @fileOverview 所有图表内部元素的基类，继承自group
 * @ignore
 */


var Util = require('../util'),
	Canvas = require('../canvas');

function initClassAttrs(c){
  if(c._attrs || c == Canvas.Group){
    return;
  }

  var superCon = c.superclass.constructor;
  if(superCon && !superCon._attrs){
    initClassAttrs(superCon);
  }
  c._attrs =  {};
  
  Util.mix(true,c._attrs,superCon._attrs);
  Util.mix(true,c._attrs,c.ATTRS);
}

/**
 * @class Chart.PlotItem
 * 图表内部元素的基类
 * @extends Canvas.Group
 * 
 */
function Item(cfg){
	initClassAttrs(this.constructor);
	Item.superclass.constructor.call(this,cfg);
};

Item.ATTRS = {
  /**
   * 活动子项的名称，用于组成 itemactived,itemunactived的事件
   * @protected
   * @type {String}
   */
  itemName : 'item',
  /**
   * 所属分组的名称,用于事件中标示父元素
   * @protected
   * @type {String}
   */
  groupName : ''
};

Util.extend(Item, Canvas.Group);

Util.augment(Item,{
	//获取默认的属性
	getDefaultCfg : function(){
		var _self = this,
			con = _self.constructor,
			attrs = con._attrs,
			rst = Util.mix(true,{},attrs);
		return rst;
	},
  /**
   * 在顶层图表控件上触发事件
   * @param {String} name 事件名称
   * @param  {Object} ev 事件对象
   */
  fireUp : function(name,ev){
    var _self = this,
      canvas = _self.get('canvas'),
      chart = canvas.chart;
    if(chart){
      ev.target = ev.target || chart;
      chart.fire(name,ev);
    }
  },
  /**
   * @protected
   * 在分组上触发事件
   * @param  {String} name 事件名称
   * @param  {Object} item 触发事件的子项
   * @param  {Object} obj  事件对象
   */
  fireUpGroup : function(name,item,obj){
    var _self = this,
      itemName = _self.get('itemName'),
      groupName = _self.get('groupName');
    obj = obj || {};
    obj[itemName] =  item;
    if(groupName){
      obj[groupName] = _self.get('parent')
    }
    _self.fireUp(itemName.toLowerCase() + name,obj);
  }
});

module.exports = Item;
