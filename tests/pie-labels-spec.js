var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Util = require('../src/util'),
  Chart = require('../src/chart');

$('<div id="p3"></div>').prependTo('body');

describe('环形图', function() {
  var chart = new Chart({
    id : 'p3',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
    },
    title : {
      text : '饼图'
    },
    tooltip : {
      shared : true
    },
    seriesOptions : {
        pieCfg : {
          allowPointSelect : false,
          labelHeight : 60,
          labels : {
            custom : true,
            distance : 40,
            renderer : function(value,item){
                return value + '<br><span style="color:'+item.point.color+'">' + (item.point.percent * 100).toFixed(2)  + '%</span>'; 
            }
          }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        animate : false,
        data: [
          ['Others',   0.7],
          ['Safari',    0.8],['Others',   0.7],
          ['Safari',    0.8],['Others',   0.7],
          ['Safari',    0.8],
          ['Opera',     6.2],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          }
          /*['Firefox',   45.0],
          ['IE',       26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',   0.7]*/
        ]
    }]
  });

  chart.render();
  describe('测试labels生成',function(){
    it('测试生成',function(done){
      setTimeout(function(){
        expect($('.ac-labels').children().length).to.be(6);
        done();
      },1000);
      
    });

    it('测试线取消',function(){
      expect($('.x-line-group',chart.get('el')).length).to.be(0);
    });

    it('change data',function(){
      var data = [
          ['Others',   0.7],
          ['Safari',    0.8],
          ['Opera',     6.2],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          }
          
        ];

      chart.getSeries()[0].changeData(data,true);
      expect($('.ac-labels').children().length).to.be(data.length);
    });
  });
/*
*/
});