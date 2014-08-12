/**
 * @fileOverview 坐标轴区域
 * @ignore
 */

var Util = require('../util');	

function min(x,y){
	return x > y ? y : x;
}
function max(x,y){
	return x > y ? x : y;
}

/**
 * @class Chart.PlotRange
 * 用于计算是否在坐标轴内的帮助类
 * @protected
 */
function PlotRange(start,end){
	this.start = start;
	this.end = end;
	this.init();
};


Util.augment(PlotRange,{

	//初始化
	init : function(){
		var plotRange = this;

		start = plotRange.start;
  	end = plotRange.end;

  	//top-left
  	  var tl = plotRange.tl = {};
  	  tl.x = min(start.x,end.x);
  	  tl.y = min(start.y,end.y);
  	

  	//top-right
  		var tr = plotRange.tr = {};
  		tr.x = max(start.x,end.x);
  		tr.y = min(start.y,end.y);
  	//bottom-left
  		var bl = plotRange.bl = {};
  		bl.x = min(start.x,end.x);
  		bl.y = max(start.y,end.y);

  	//bottom-right
  		var br = plotRange.br = {};
  		br.x = max(start.x,end.x);
  		br.y = max(start.y,end.y);

  		var cc = plotRange.cc = {};
  		cc.x = (br.x - tl.x)/2 + tl.x;
  		cc.y = (br.y - tl.y)/2 + tl.y;
  	
	},
  /**
   * 重置
   * @param  {Object} start 开始点
   * @param  {Object} end   结束点
   */
  reset : function(start,end){
    this.start = start;
    this.end = end;
    this.init();
  },
	/**
	 * 是否在范围内
	 * @param {Number} x x坐标
	 * @param {Number} y y坐标
	 * @return {Boolean}   是否在范围内
	 */
	isInRange : function(x,y){
		if(Util.isObject(x)){
			y = x.y;
			x = x.x;
		}
		var  plotRange = this,
			tl = plotRange.tl,
			br = plotRange.br;

		return x >= tl.x && x <= br.x && y >= tl.y && y <= br.y;
	},
	/**
	 * 是否在垂直范围内
	 * @param  {Number}  y y坐标
	 * @return {Boolean} 在垂直范围内
	 */
	isInVertical : function(y){

		if(Util.isObject(y)){
			y = y.y;
		}

		var  plotRange = this,
			tl = plotRange.tl,
			br = plotRange.br;

		return y >= tl.y && y <= br.y;
	},
	/**
	 * 是否在水平范围内
	 * @param  {Number}  x x坐标
	 * @return {Boolean}  是否在水平范围内
	 */
	isInHorizontal : function(x){

		if(Util.isObject(x)){
			x = x.x;
		}

		var  plotRange = this,
			tl = plotRange.tl,
			br = plotRange.br;

		return x >= tl.x && x <= br.x;
	},
	/**
	 * 获取宽度
	 * @return {Number} 宽度
	 */
	getWidth : function(){
		var tl = this.tl,
			br = this.br;
		return br.x - tl.x;
	},
	/**
	 * 获取宽度
	 * @return {Number} 宽度
	 */
	getHeight : function(){
		var tl = this.tl,
			br = this.br;
		return br.y - tl.y;
	}

});

module.exports = PlotRange;
