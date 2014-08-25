var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Util = require('achart-util'),
  Canvas = require('achart-canvas'),
  Group = require('../src/seriesgroup'),
  Axis = require('achart-axis'),
  NAxis = Axis.Number,
  CAxis = Axis.Category,
  PlotRange = require('achart-plot').Range,
  Simulate = require('event-simulate');

  $('<div id="se1"></div>').prependTo('body');


describe('测试折线分组',function(){

  var canvas = new Canvas({
    id : 'se1',
    width : 900,
    height : 500
  });



  var plotRange = new PlotRange({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup(Group,{
    xAxis : {
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    },
    yAxis : {
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
      position:'left',
      labels : {
        label : {
          x : -12
        }
      }
    },
    legend : {
      dy : 30
    },
    plotRange : plotRange,
    seriesOptions : {
      lineCfg : {
        duration : 1000,
        line : {
          'stroke-width': 2,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round'
        },
        lineActived : {
          'stroke-width': 3
        },
        //smooth:true,
        markers : {
          marker : {
            radius : 3
          },
          actived : {
            radius : 6,
            stroke: '#fff'
          }
        },
        animate : true
      }
      
    },
    tooltip : {
      valueSuffix : '°C',
      offset : 10,
      shared : true,
      crosshairs : true
    },
    series : [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
          name: 'New York',
          data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, /**/{
          name: 'Berlin',
          data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
  });

  canvas.sort();
  describe('测试生成',function(){
    it('test offset',function(){
      var offset1 = Util.getOffset(canvas.get('node')),
        offset2 = $(canvas.get('node')).offset();
      expect(offset1.top).to.be(offset2.top);
      expect(offset1.left).to.be(offset2.left);
    });
    it('测试分组生成',function(){
      expect(group.get('el')).not.to.be(undefined);

      expect(group.get('node')).not.to.be(undefined);
    });
    it('测试序列生成',function(done){
      setTimeout(function(){
        expect(group.get('children').length).to.be(group.get('series').length);
        done();
      },1000);
      
    });

    it('测试marker',function(){
      var item = group.getFirst();
      var markersGroup = item.get('markersGroup');
      expect(markersGroup).not.to.be(undefined);
      expect(markersGroup.getCount()).to.be(item.get('data').length);
    });
  }); 

  describe('坐标轴生成',function(){
    it('x轴生成',function(){
      var xAxis = group.get('xAxis');
      expect(xAxis.get('type')).to.be('category');
    });

    it('y轴生成',function(){
      var yAxis = group.get('yAxis');
      expect(yAxis.get('type')).to.be('number');
    });
  });

  function findByName(name){
    return group.findBy(function(item){
      return item.get('name') == name;
    });
  }

  describe('测试操作',function(){
    it('测试查找',function(){
      var series = findByName('Tokyo');
      expect(series).not.to.be(null);
      expect(series.get('color')).to.be(group.get('colors')[0]);
    });

    it('测试激活序列',function(done){
      var series = findByName('Tokyo');
      group.setActivedItem(series);
      setTimeout(function(){
        expect(series.get('actived')).to.be(true);
        expect(group.getActived()).to.be(series);
        done();
      },100);
      
    });

    it('激活另一个',function(done){
      var series1 = findByName('Tokyo'),
        series2 = findByName('Berlin');

      expect(series1.get('actived')).to.be(true);
      expect(series2.get('actived')).not.to.be(true);

      group.setActivedItem(series2);

      setTimeout(function(){
        expect(series1.get('actived')).to.be(false);
        expect(series2.get('actived')).to.be(true);
        expect(group.getActived()).to.be(series2);
        done();
      },300);

    });

    it('清除激活',function(){
      group.clearActivedItem();
      expect(group.getActived()).to.be(null);
    });
  });

  describe('测试事件',function(){

    it('测试鼠标移动到序列',function(done){
      var series = findByName('Tokyo');
      var node = series.get('node');

      Simulate.simulate(node,'mouseover');

      setTimeout(function(){
        expect(series.isActived()).to.be(true);
        done();
      },200);

    });

    it('测试鼠标移动到另一个序列',function(done){
      var series1 = findByName('Tokyo'),
        series2 = findByName('Berlin');

      expect(series2.isActived()).to.be(false);
      expect(series1.isActived()).to.be(true);

      Simulate.simulate(series2.get('node'),'mouseover');

      setTimeout(function(){
        expect(series2.isActived()).to.be(true);
        expect(series1.isActived()).to.be(false);

        done();
      },200);  
    });

    it('测试鼠标移出序列',function(done){
      var 
        series2 = findByName('Berlin');

      expect(series2.isActived()).to.be(true);
      Simulate.simulate(series2.get('node'),'mouseout');

      setTimeout(function(){
        expect(series2.isActived()).to.be(true);
        done();
      },200);  
    });

  });

  describe('测试图例',function(){
    var legendGroup = group.get('legendGroup').get('itemsGroup');

    it('测试图例生成',function(){
      expect(legendGroup).not.to.be(undefined);
      expect(legendGroup.getCount()).to.be(group.getCount());
    });

    it('测试图例位置',function(){

    });

    it('测试图例线,marker',function(){
      var item = legendGroup.getFirst();
      expect(item.get('shape')).not.to.be(undefined);
      expect(item.get('shape').get('type')).to.be('line');

      expect(item.get('marker')).not.to.be(undefined);
      expect(item.get('marker').attr('symbol')).to.be('circle');
    });

    it('测试图例，文本',function(){
      var item = legendGroup.getLast();
      expect(item.get('labelShape').attr('text')).to.be(group.getLast().get('name'));
    });

    it('hover',function(){

      var item = legendGroup.getFirst();
      Simulate.simulate(item.get('node'),'mouseover');

      expect(item.get('item').isActived()).to.be(true);

    });

    it('out',function(){
      var item = legendGroup.getFirst();
      Simulate.simulate(item.get('node'),'mouseout');

      expect(item.get('item').isActived()).to.be(false);
    });

    it('选中',function(done){
      var item = legendGroup.getFirst();
      Simulate.simulate(item.get('node'),'click');

      setTimeout(function(){
        expect(item.get('item').get('visible')).to.be(false);
        done();
      },800);
    });

    it('取消选中',function(done){

      var item = legendGroup.getFirst();
      Simulate.simulate(item.get('node'),'click');

      setTimeout(function(){
        expect(item.get('item').get('visible')).to.be(true);
        done();
      },800);
    });
  });

  describe('更改坐标轴',function(){
    var yAxis = group.get('yAxis');
    var interval = yAxis.get('tickInterval'),
      labelsGroup = yAxis.get('labelsGroup'),
      count = labelsGroup.getCount();

    it('隐藏序列,重置坐标轴',function(done){
      group.hideSeries(group.getChildAt(0));
      group.hideSeries(group.getChildAt(1));
      setTimeout(function(){
        expect(interval).to.be(yAxis.get('tickInterval'));
        expect(count).not.to.be(labelsGroup.getCount());
        done();
      },500);
      
    });
    it('显示图例,重置坐标轴',function(done){
      group.showSeries(group.getChildAt(0));
      group.showSeries(group.getChildAt(1));
      setTimeout(function(){
        expect(interval).to.be(yAxis.get('tickInterval'));
        expect(count).to.be(labelsGroup.getCount());
        done();
      },500);
    });
  });
});
