var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
  Tooltip = require('../src/chart/tooltip');

$('<div id="t1"></div>').prependTo('body');

var canvas = new Canvas({
	id : 't1',
	width : 300,
	height : 300
});

var tooltip = canvas.addGroup(Tooltip,{
	x : 10,
	y : 10,
	title : {
		text : '这是测试title',
		'font-size' : '10',
			'text-anchor' : 'start',
			x : 8,
			y : 15
	},
	visible : true,
	valueSuffix : 'millions',
	items : [
		{color : 'red',name : 'name1',value : '1222333'},
		{color : 'blue',name : 'n2',value : '1233'},
		{color : 'yellow',name : 'name3',value : 'swww - afas'}
	]
});

describe('测试生成',function(){

	it('测试tooltip',function(){
		expect(tooltip.get('el')).not.to.be(undefined);
		expect(tooltip.get('node')).not.to.be(undefined);
	});

	it('测试title',function(){
		expect(tooltip.get('titleShape')).not.to.be(undefined);
	});

	it('测试文本项',function(){
		expect(tooltip.get('textGroup')).not.to.be(undefined);
		expect(tooltip.get('textGroup').getCount()).to.be(3);
	});

	it('测试边框',function(){
		var borderShape = tooltip.get('borderShape');
		expect(borderShape).not.to.be(undefined);
		expect(borderShape.attr('stroke')).to.be('red');
	});

});

describe('测试操作',function(){

	it('修改标题',function(done){
		setTimeout(function(){
			var title = 'new title';
			tooltip.setTitle(title);
			expect(tooltip.get('titleShape').attr('text')).to.be(title);
			done();
		},300);
		
	});

	it('修改内容',function(){
		var items = [{
			color : '#2f7ed8',
			name : 'Asia',
			value : '635'
		},{
			color : '#0d233a',
			name : 'Africa',
			value : '107'
		}];

		tooltip.setItems(items);

		expect(tooltip.get('textGroup').getCount()).to.be(2);
	});

	it('边框改变',function(){
		expect(tooltip.get('borderShape').attr('stroke')).to.be('#2f7ed8');
	});

	it('测试移动',function(){
		tooltip.setPosition(100,100);
	});

	it('修改复杂内容',function(){
		var items = [{
			color : '#2f7ed8',
			name : 'Asia',
			value : '635'
		},{
			color : '#0d233a',
			name : 'Africa',
			value : ['107',{fill : 'red',text : 100}]
		}];

		tooltip.setItems(items);

		expect(tooltip.get('textGroup').getCount()).to.be(2);

	});

	xit('移除',function(done){
		setTimeout(function(){
			$('#t1').remove();
			done();
		},800);
	});

});

/**/
