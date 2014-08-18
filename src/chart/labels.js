/**
 * @fileOverview 图表中的文本信息
 * @ignore
 */


var 
	Item = require('./plotitem'),
	Util = require('../util'),
	CLS_LABELS = 'x-chart-labels';

/**
 * @class Chart.Labels
 * 文本集合
 * @extends Chart.PlotItem
 */
var Labels = function(cfg){
	Labels.superclass.constructor.call(this,cfg);
};

Labels.ATTRS = {

	elCls : CLS_LABELS,

	zIndex : 6,
	/**
	 * 文本集合
	 * @type {Array}
	 */
	items : null,
	/**
	 * 内部label的默认配置信息
	 * @type {Object}
	 */
	label : null,
	/**
	 * 格式化函数 function (text,item)
	 * @type {Function}
	 */
	renderer : null,

	custom : false,

	html : '<div class="ac-labels" style="position:absolute;top:0;left:0;"></div>',

	itemTpl : '<div class="ac-label" style="position:absolute;">{text}</div>',

	animate : true,
	
	duration : 400

};

Util.extend(Labels,Item);

Util.augment(Labels,{
	
	//渲染控件
	renderUI : function(){
		var _self = this;
		Labels.superclass.renderUI.call(_self);
		_self._drawLabels();
	},
	/**
	 * 添加文本
	 * @param {Object} item 文本配置项
	 */
	addLabel : function(item){
		var _self = this,
			items = _self.get('items'),
			count = items.length;
		items.push(item);
		return _self._addLabel(item,count);
	},
	/**
	 * 设置文本
	 * @param {Array} items 文本集合
	 */
	setItems : function(items){
		var _self = this;

		_self.clear();
		_self.set('items',items);
		_self._drawLabels();
	},
	clear : function(){
		var _self = this,
			customDiv = _self.get('customDiv');
		if(customDiv){
			customDiv.innerHTML = '';
		}

		Labels.superclass.clear.call(_self);
	},
	//绘制文本
	_drawLabels : function(){
		var _self = this,
			items = _self.get('items'),
			cfg;

		Util.each(items,function(item,index){
			_self._addLabel(item,index);
		});
	},

	_addLabel : function(item,index){
		var _self = this,
			cfg = _self._getLabelCfg(item,index);

		return _self._createText(cfg);
	},
	_getLabelCfg : function(item,index){
		var _self = this,
			label = _self.get('label'),
			renderer = _self.get('renderer');

		if(!Util.isObject(item)){
			var tmp = item;
			item = {};
			item.text = tmp;
		}

		if(renderer){
			item.text = renderer(item.text,item,index);
		}
		if(item.text == null){
			item.text = '';
		}
		
		item.text = item.text.toString();
		item.x = (item.x || 0) + (label.x || 0);
		item.y = (item.y || 0) + (label.y || 0);
		cfg = Util.mix({},label,item);

		return cfg;
	},
	/**
	 * 获取内部labels
	 * @return {Array} 内部的label集合
	 */
	getLabels : function(){
		var _self = this,
			customDiv = _self.get('customDiv');
		if(customDiv){
			return Util.makArray(customDiv.childNodes);
		}else{
			return _self.get('children');
		}
	},
	//更改label
	changeLabel : function(label,item){
		var _self = this,
			custom = _self.get('custom'),
			index,
			cfg;

			index = Util.indexOf(_self.get('children'),label);
		cfg = _self._getLabelCfg(item,index);
		if(label){
			if(custom){
				var node = _self._createDom(cfg);
				label.innerHTML = node.innerHTML;
				_self._setCustomPosition(cfg,label);
			}else{
				label.attr('text',cfg.text);
				if(label.attr('x') != cfg.x || label.attr('y') != cfg.y){
					if(Util.svg && _self.get('animate') && !cfg.rotate){
						if(cfg.rotate){
							label.attr('transform','');
						}
						
						label.animate({
							x : cfg.x,
							y : cfg.y
						},_self.get('duration'));
					}else{
						label.attr(cfg);
						if(cfg.rotate){
							label.attr('transform',Util.substitute('r{rotate} {x} {y}',cfg));
						}
					}
				}
			}
			
		}
	},
	//设置自定义label的位置
	_setCustomPosition : function(cfg,labelDom){
		var _self = this,
			anchor = cfg['text-anchor'] || 'middle',
			top = cfg.y,
			left = cfg.x,
			width = Util.getWidth(labelDom),
			height = Util.getHeight(labelDom);

		top = top - height/2;
		if(anchor == 'middle'){
			left = left - width/2;
		}else if(anchor == 'end'){
			left = left - width;
		}
		labelDom.style.top = parseInt(top) + 'px';
		labelDom.style.left = parseInt(left) + 'px';
	},
	/**
	 * 创建按文本
	 * @private
	 */
	_createText : function(cfg){
		var _self = this,
			custom = _self.get('custom'),
			customDiv = _self.get('customDiv');
		if(custom){
			if(!customDiv){
				var tmp = _self.get('html'),
					wraper = _self.get('canvas').get('node').parentNode;
				customDiv = Util.createDom(tmp);
				wraper.style.position = 'relative';
				wraper.appendChild(customDiv);
				_self.set('customDiv',customDiv);
			}
			var node = _self._createDom(cfg);
			customDiv.appendChild(node);
			_self._setCustomPosition(cfg,node);
		}else{
			return this.addShape('label',cfg);
		}
	},
	_createDom : function(cfg){
		var _self = this,
			itemTpl = _self.get('itemTpl'),
			str = Util.substitute(itemTpl,cfg),
			node = Util.createDom(str);
		return node;
	},
	//覆写删除
	remove : function(){
		var _self = this,
			customDiv = _self.get('customDiv');
		Labels.superclass.remove.call(this);
		if(customDiv){
			customDiv.parentNode.removeChild(customDiv);
		}
	}

});


module.exports = Labels;
