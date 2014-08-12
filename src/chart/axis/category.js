/**
 * @fileOverview 分类坐标轴
 * @ignore
 */

var Util = require('../../util'),
	Axis = require('./base');

/**
 * @class Chart.Axis.Category
 * 分组坐标轴
 * @extends Chart.Axis
 */
function Category(cfg){
	Category.superclass.constructor.call(this,cfg);
}

Util.extend(Category,Axis);

Category.ATTRS = {

	/**
	 * 分组集合
	 * @type {Array}
	 */
	categories : null,
    /**
     * 类型
     * @type {String}
     */
    type : 'category'

};

Util.augment(Category,{
	//渲染控件前
	beforeRenderUI : function(){
		var _self = this;
		Category.superclass.beforeRenderUI.call(_self);
		
		//如果未指定坐标轴上的点，则自动计算
		if(!_self.get('ticks')){
		  var categories = _self.get('categories'),
		  	ticks = [];
		  ticks = ticks.concat(categories);
          if(ticks[ticks.length - 1] != ' '){
            ticks.push(' ');
          }
          _self.set('ticks',ticks);
		}
	},
    //ticks 获取
    changeInfo : function(info){
        var _self = this,
            ticks = info.ticks;
        if(!ticks){
            ticks = ticks.concat(info.categories);
            if(ticks.length && ticks[ticks.length - 1] != ' '){
               ticks.push(' '); 
            }
        }else{
            info.categories = [].concat(info.ticks);
            Util.remove(info.categories,' ');
        }
        
        
        _self.set('categories',info.categories);
        _self.set('ticks',ticks);
    },
	/**
	 * @override
	 * @ignore
	 */
	getOffsetByIndex : function(index){
    	var _self = this,
    		avg = _self._getAvgLength(),
    		offset =  avg * index;
    	if(offset >= 0){
    		offset += avg/2;
    	}else{
    		offset -= avg/2;
    	}
    	return _self._appendEndOffset(offset) + _self._getStartCoord();
    },
    /**
     * 根据画板上的点获取坐标轴上的值，对已分类坐标轴来说就是获取其中的一个分类
     * @param  {Number} offset 
     * @return {Number} 点在坐标轴上的值,如果不在坐标轴上,值为NaN
     */
    getValue : function(offset){
        var _self = this,
            index = _self.getSnapIndex(offset),
            categories = _self.get('categories');
        return categories[index];
    },
    /**
     * 改变坐标轴，对于分类坐标轴，只能更改 categories
     * <code>
     *     axis.changeAxis({
     *         categories : categories
     *     });
     * </code>
     */
    changeAxis : function(info){

    },
    _getAvgLength : function(){
    	var _self = this,
    		length = _self._getLength(),
    		ticks = _self.get('ticks'),
    		count = ticks.length,
    		avg = (length / (count - 1));
    	return avg;
    },
    /**
     * @protected
     * 获取显示坐标点的位置
     */
    getTickOffsetPoint : function(index){
      var _self = this,
    		ortho = _self._getOrthoCoord(),
    		avg = _self._getAvgLength(),
    		current = _self.getOffsetByIndex(index);
    	
    	if(current >= 0){
    		current -= avg/2;
    	}else{
    		current += avg/2;
    	}
    	if(_self.isVertical()){
    		return {
    			x : ortho,
    			y : current
    		};
    	}

    	return {
    		x : current,
    		y : ortho
    	};
    }
});

module.exports = Category;
