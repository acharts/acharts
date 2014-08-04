
var expect = require('expect.js'),
    sinon = require('sinon'),
    Simulate = require('../lib/event'),
    $ = require('jquery');

var Chart = require('../src/chart');

$('<div id="p1"></div>').prependTo('body');


describe('测试饼图',function(){
  var chart = new Chart({
    id : 'p1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
      
    },
    title : {
      text : '饼图'
    },
   
    tooltip : {
      shared : true,
      pointRenderer : function(point){
        return (point.percent * 100).toFixed(2)+ '%';
      }
    },
    seriesOptions : {
        pieCfg : {
          allowPointSelect : true,
          labels : {
            distance : 40,
            label : {

            },
            renderer : function(value,item){
                
                return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
            }
          }
        }
    },
    legend : null,
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',   0.7]
        ]
    }]
  });

  chart.render();
  var group = chart.get('seriesGroup'),
    pie = group.getSeries()[0];
  describe('测试饼图',function(){

    it('生成饼图',function(done){
      setTimeout(function(){
        expect(pie).not.to.be(undefined);
        expect(pie.get('node')).not.to.be(undefined);
        done();
      },1000);
      
    });
    it('生成label',function(){
      var labels = pie.get('labelsGroup');
      expect(labels.getCount()).to.be(pie.get('data').length);
    });

    it('点击选中饼图',function(done){
      var first = pie.getItems()[0];
      Simulate.simulate(first.get('node'),'click');
      setTimeout(function(){
        expect(first.get('selected')).to.be(true);
        done();
      },600);

    });

    it('点击其他',function(done){
      var first = pie.getItems()[0],
        second = pie.getItems()[1];
    
      Simulate.simulate(second.get('node'),'click');
      setTimeout(function(){
        expect(first.get('selected')).to.be(false);
        expect(second.get('selected')).to.be(true);
        done();
      },600);
    });

    it('点击取消',function(done){
      var second = pie.getItems()[1];

      Simulate.simulate(second.get('node'),'click');

      setTimeout(function(){
        expect(second.get('selected')).to.be(false);
        done();
      },500);
    });
  });

  describe('测试触发的事件',function(){
    var items = pie.getItems(),
    
    unActiveFn = sinon.spy();

    it('触发actived',function(done){
      var first = items[0],
        callback = sinon.spy();
      chart.on('seriesitemactived',callback);

      Simulate.simulate(first.get('node'),'mouseover');

      setTimeout(function(){
        expect(first.get('actived')).to.be(true);
        expect(callback.called).to.be(true);

        chart.off('seriesitemactived',callback);
        done();
      }),500;
      
    });
    it('触发unactived',function(done){
      var first = items[0],
        second = items[1],
        callback = sinon.spy();
      chart.on('seriesitemunactived',callback);
      Simulate.simulate(second.get('node'),'mouseover');

      setTimeout(function(){
        expect(first.get('actived')).to.be(false);
        expect(second.get('actived')).to.be(true);

        chart.off('seriesitemunactived',callback);
        done();
      },500);
    });

    it('触发click,触发选中',function(done){
      var first = items[0],
        callback = sinon.spy(),
        selCallback = sinon.spy();
      chart.on('seriesitemclick',callback);
      chart.on('seriesitemselected',selCallback);
      Simulate.simulate(first.get('node'),'click');

      setTimeout(function(){
        expect(callback.called).to.be(true);
         expect(selCallback.called).to.be(true);
        chart.off('seriesitemclick',callback);
        chart.off('seriesitemselected',selCallback);
        done();
      },500);
    });

    it('触发取消选中',function(done){
      var first = items[0],
        callback = sinon.spy();
      chart.on('seriesitemunselected',callback);

      Simulate.simulate(first.get('node'),'click');

      setTimeout(function(){
        expect(callback.called).to.be(true);
        chart.off('seriesitemunselected',callback);
        done();
      },500);
    });
  });
});

describe('测试饼图',function(){
  var chart = new Chart({
    id : 'p1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
      
    },
    title : {
      text : '饼图'
    },
   
    tooltip : {
      shared : true,
      pointRenderer : function(point){
        return (point.percent * 100).toFixed(2)+ '%';
      }
    },
    seriesOptions : {
        pieCfg : {
          allowPointSelect : true,
          labels : {
            distance : 40,
            label : {

            },
            renderer : function(value,item){
                
                return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
            }
          }
        }
    },
    legend : null,
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox',   45.0],
            ['test',1],
            ['test',1],
            ['test',1],
            ['test',1],
            ['IE',       26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['Safari',    8.5],
            ['test',1],
            ['test',1],
            ['test',1],
            ['test',1],
            ['Opera',     6.2],
            ['test',1],
            ['test',1],
            ['test',1],
            ['test',1],
            ['Others',   0.7]
        ]
    }]
  });

  chart.render();
  var group = chart.get('seriesGroup');
  describe('测试饼图',function(){
    
  });
});

describe('测试饼图',function(){
  var chart = new Chart({
    id : 'p1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
      
    },
   
    tooltip : {
      shared : true
    },
    seriesOptions : {
        pieCfg : {
          
        }
    },
    legend : null,
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize : '60%',
        data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',   0.7]
        ]
    }]
  });

  chart.render();
  var group = chart.get('seriesGroup');
  describe('测试饼图',function(){
    
  });
});

describe('测试饼图',function(){
  var chart = new Chart({
    id : 'p1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
      
    },

    tooltip : {
      shared : true
    },
    seriesOptions : {
        pieCfg : {
          labels : {
            distance : 40,
            label : {

            },
            renderer : function(value,item){
                
                return value + ' ' + (item.point.percent * 100).toFixed(2) + '%'; 
              }
          }
        }
    },
    legend : null,
    series: [{
        type: 'pie',
        name: 'Browser share',
        startAngle : -180,
        endAngle : 0,
        data:[['Firefox',   44.2],
                ['IE7',       26.6],
                ['IE6',       20],
                ['Chrome',    3.1],
                ['Other',    5.4]
                ]
    }]
  });

  chart.render();
  var group = chart.get('seriesGroup');
  describe('测试饼图',function(){
    xit('移除',function(done){
      setTimeout(function(){
        $('#p1').remove();
        done();
      },800);
    });
  });
});

/*
*/
