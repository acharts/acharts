var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
  Group = require('../src/chart/seriesgroup'),
  NAxis = require('../src/chart/axis/number'),
  CAxis = require('../src/chart/axis/category'),
  PlotRange = require('../src/chart/plotrange'),
  Tooltip = require('../src/chart/tooltip');

  $('<div id="t2"></div>').prependTo('body');

/*

describe('测试Tooltip',function(){
	var canvas = new Canvas({
		id : 't2',
		width : 900,
		height : 500
	});

	var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50}),
		xAxis = canvas.addGroup(CAxis,{
			plotRange : plotRange,
			categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			labels : {
				label : {
					y : 12
				}
			}
		});

	var yAxis = canvas.addGroup(NAxis,{
			plotRange : plotRange,
			line : null,
			tickLine : null,
			grid : {
				line : {
					stroke : '#c0c0c0'
				}
			},
			title : {
				text : 'xsxxxxx',
				font : '16px bold',
				fill : 'blue',
				rotate : 90,
				x : -30
			},
			min : -5,
			max : 30,
			position:'left',
			tickInterval : 5,
			labels : {
				label : {
					x : -12
				}
			}
		});

	var tooltip = canvas.addGroup(Tooltip,{
		plotRange : plotRange,
		title : {
			text : '这是测试title',
			'font-size' : '10',
				'text-anchor' : 'start',
				x : 8,
				y : 15
		},
		valueSuffix : 'millions',
		visible : true,
		items : [
			{
			color : '#2f7ed8',
			name : 'Asia',
			value : '635'
		},{
			color : '#0d233a',
			name : 'Africa',
			value : '107'
		}]
		
	});

	canvas.sort();

	describe('测试生成',function(){
		it('测试生成',function(){
			expect(tooltip.get('el')).not.to.be(undefined);
		});
	});

	function getPoint(){
		return {
			x : tooltip.get('x'),
			y : tooltip.get('y')
		};
	}

	describe('测试移动位置',function(){

		it('全部移动到坐标轴内',function(done){
			tooltip.setPosition(300,300);
			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.x + bbox.width).to.be(300);
				done();
			},200);
			
		});

		it('左侧全部外面',function(done){
			tooltip.setPosition(10,300);
			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.x).to.be(50);
				done();
				
			},300);
		});

		it('左侧部分外面',function(done){
			tooltip.setPosition(60,300);
			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.x).to.be(60);
				done();
				
			},300);
		});


		it('上面',function(done){
			tooltip.setPosition(300,10);

			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.y).to.be(50);
				done();
				
			},300);
		});

		it('上面部分',function(done){
			tooltip.setPosition(300,60);

			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.y).to.be(50);
				done();
			},300);
		});

		it('左上角',function(done){
			tooltip.setPosition(10,10);

			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.y).to.be(50);
				expect(bbox.x).to.be(50);
				done();
			},300);
		});

		it('左上角部分',function(done){
			tooltip.setPosition(60,60);

			setTimeout(function(){
				var bbox = tooltip.getBBox();
				expect(xAxis.isInAxis(bbox)).to.be(true);
				expect(bbox.y).to.be(50);
				expect(bbox.x).to.be(60);
				done();
			},300);
		});
	});
});
*/
describe('测试Tooltip',function(){

	var canvas = new Canvas({
		id : 't2',
		width : 900,
		height : 500
	});

	var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50}),
		xAxis = canvas.addGroup(CAxis,{
			plotRange : plotRange,
			categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			labels : {
				label : {
					y : 12
				}
			}
		});

	var yAxis = canvas.addGroup(NAxis,{
			plotRange : plotRange,
			line : null,
			tickLine : null,
			grid : {
				line : {
					stroke : '#c0c0c0'
				}
			},
			title : {
				text : 'xsxxxxx',
				font : '16px bold',
				fill : 'blue',
				rotate : 90,
				x : -30
			},
			min : -5,
			max : 30,
			position:'left',
			tickInterval : 5,
			labels : {
				label : {
					x : -12
				}
			}
		});

	var tooltip = canvas.addGroup(Tooltip,{
		plotRange : plotRange,
		title : {
			text : '这是测试title',
			'font-size' : '10',
				'text-anchor' : 'start',
				x : 8,
				y : 15
		},
		valueSuffix : 'millions',
		offset : 10,
		crosshairs : true,
		items : [
			{
			color : '#2f7ed8',
			name : 'Asia',
			value : '635'
		},{
			color : '#0d233a',
			name : 'Africa',
			value : '107'
		}]
		
	});

	canvas.sort();

	canvas.on('mousemove',function(ev){
		var point = canvas.getPoint(ev.clientX,ev.clientY);
		if(plotRange.isInRange(point)){
			tooltip.setPosition(point.x,point.y);
			if(!tooltip.get('visible')){
				tooltip.show();
			}
		}else{
			if(tooltip.get('visible')){
				tooltip.hide();
			}
		}
	});
	tooltip.show();

	describe('测试生成',function(){

		it('tooltip生成',function(){

		});

		it('测试cross线生成',function(){
			var line = tooltip.get('crossShape');
			expect(line).not.to.be(undefined);

		});

	});

	function getX(){
		var line = tooltip.get('crossShape'),
			transform = line.attr('transform');
		return transform[0][1];
	}

	describe('移动',function(){
		it('全部移动到坐标轴内',function(done){
			tooltip.setPosition(300,300);
			setTimeout(function(){
				expect(getX()).to.be(300);
				done();
			},200);
			
		});

		it('左侧全部外面',function(done){
			tooltip.setPosition(10,300);
			setTimeout(function(){
				expect(getX()).to.be(50);
				done();
			},300);
		});

		it('左侧部分外面',function(done){
			tooltip.setPosition(60,300);
			setTimeout(function(){
				expect(getX()).to.be(60);
				done();
			},300);
		});


		it('上面',function(done){
			tooltip.setPosition(300,10);

			setTimeout(function(){
				expect(getX()).to.be(300);
				done();

			},300);
		});

		it('上面部分',function(done){
			tooltip.setPosition(300,60);

			setTimeout(function(){
				expect(getX()).to.be(300);
				done();
			},300);
		});

		it('左上角',function(done){
			tooltip.setPosition(10,10);

			setTimeout(function(){
				
				expect(getX()).to.be(50);
				done();
			},300);
		});

		it('左上角部分',function(done){
			tooltip.setPosition(60,60);

			setTimeout(function(){
				expect(getX()).to.be(60);
				done();
			},300);
		});

		xit('移除',function(done){
			setTimeout(function(){
				$('#t2').remove();
				done();
			},800);
		});

	});
});
