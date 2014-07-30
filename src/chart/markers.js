/**
 * @fileOverview 显示点的标记
 * @ignore
 */


var 
	Util = require('../util'),
	Group = require('./mixin/activedgroup'),
	PlotItem = require('./plotitem');

	

/**
 * @class Chart.Markers
 * 显示点的标记集合
 * @extends Chart.PlotItem
 */
var Markers = function(cfg){
	Markers.superclass.constructor.call(this,cfg);
};


Util.extend(Markers,PlotItem);

Util.mixin(Markers,[Group]);

Markers.ATTRS = {
	elCls : 'x-chart-markers',
	zIndex : 6,
	/**
	 * 标记的配置项
	 * @type {Object}
	 */
	marker : null,
	/**
	 * 标记处于active状态时的配置项
	 * @type {Object}
	 */
	actived : null,
	/**
	 * 是否只有一个marker
	 * @type {Boolean}
	 */
	single : false,
	/**
	 * @private
	 */
	xCache : null
};

Util.augment(Markers,{

	//渲染控件
	renderUI : function(){
		var _self = this;
		_self.set('xCache',[]);
		Markers.superclass.renderUI.call(_self);
		_self._drawMarkers();
	},
	/**
	 * @protected
	 * 是否激活
	 * @param {Chart.Actived} item 可以被激活的元素
	 * @return {Chart.Actived[]} 可以被激活的元素集合
	 */
	isItemActived : function(item){
		return item.get('actived');
	},
	/**
	 * @protected
	 * 设置激活状态
	 * @param {Chart.Actived} item 可以被激活的元素
	 * @param {Boolean} actived 是否激活
	 */
	setItemActived : function(item,actived){
		var _self = this,
			marker = _self.get('marker'),
			activedCfg = _self.get('actived'),
			single = _self.get('single');
		if(actived){
			item.attr(activedCfg);
			item.set('actived',true);
			if(single && !item.get('visible')){
				item.show();
			}
		}else{
			item.attr(marker);
			item.set('actived',false);
			if(single){
				item.hide();
			}
		}
	},
	/**
	 * 标记改变
	 * @param {Array} items 标记集合
	 */
	change : function(items){
		var _self = this,
			children = _self.get('children'),
			xCache = [];
		
		// 假如是single模式,就不change
		if (_self.get('single')) {
			return ;
		}
		_self.set('items',items);

		Util.each(items,function(item,index){
			var marker = children[index];
			if(marker){
				if(Util.svg){
					marker.animate({
						x : item.x,
						y : item.y
					},400);
				}else{
					marker.attr(item);
				}
				xCache.push(item.x);
			}else{
				_self._addMarker(item);
			}
			
		});

		var count = _self.getCount();
		for(var i = count - 1 ; i > items.length - 1; i--){
			_self.getChildAt(i).remove();
		}

		_self.set('xCache',xCache); //清空缓存

	},
	_drawMarkers : function(){
		var _self = this,
			single = _self.get('single'),
			items = _self.get('items');

		if(single){
			items = [{x : 0 ,y : 0,visible:false}];
		}
		Util.each(items,function(item){
			_self._addMarker(item)
		});
	},
	/**
	 * 添加marker
	 * @param {Object} item marker的配置信息
	 */
	addMarker : function(item){
		return this._addMarker(item);
	},
	//添加marker
	_addMarker : function(item){
		var _self = this,
			xCache = _self.get('xCache'),
			marker = _self.get('marker'),
			cfg = Util.mix({},marker,item);

		xCache.push(parseInt(item.x));
		return _self.addShape('marker',cfg);
			
	},
	/**
	 * 获取逼近的marker
	 * @return {Chart.Canvas.Shape} marker
	 */
	getSnapMarker : function(point,tolerance){
		var _self = this,
			xCache = _self.get('xCache'),
			single = _self.get('single'),
			rst;

		if(single){
			return _self.getChildAt(0);
		}
		if(Util.isObject(point)){
			var children = _self.get('children');
			Util.each(children,function(marker){
				if(marker.attr('x') == point.x && marker.attr('y') == point.y){
					rst = marker;
					return false;
				}
			});
		}else{
			var	snap = Util.snapTo(xCache,point,tolerance),
			index = Util.indexOf(xCache,snap);
			rst =  _self.getChildAt(index);
		}

		return rst;
	}
});

module.exports = Markers;
