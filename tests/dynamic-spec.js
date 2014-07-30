var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery'),
    DateUtil = require('../src/date');

$('<div id="d1"></div>').prependTo('body');

var Chart = require('../src/chart');
/* 
describe('关系图1',function(){
  var chart = new Chart({
    id : 'd1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,50]
      
    },
    title : {
      text : 'Monthly Average Temperature'
    },
    subTitle : {
      text : 'Source: WorldClimate.com'
    },
    xAxis : {

    },
    yAxis : {
      title : {
        text : 'xxxxx'
      }
    },  
    tooltip : {
      valueSuffix : '°C',
      shared : true,
      crosshairs : true
    },
    legend : {
      align : 'right',
      layout : 'vertical',
      dy : -150,
      dx : -60
    },
    series : [ {
        name: 'New York',
        pointStart : 100,
        pointInterval : 10,
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }]
  });

  chart.render();

  var series = chart.getSeries()[0];

  describe('测试图形的基础内容',function(){

    it('测试控件生成',function(done){
      setTimeout(function(){
        expect(chart.get('el')).not.to.be(null);
        done();
      },500);
      
    });

    it('测试自动生成的x轴',function(){
      var xAxis = series.get('xAxis'),
        ticks = xAxis.get('ticks');
      expect(ticks.length > 0).to.be(true);
      expect(ticks[0] <= series.get('pointStart'));
      expect(ticks[ticks.length - 1] > series.get('data').length * 10 + 100);
    });

  });

  describe('更改图形',function(){



    it('增加数据',function(done){
      var data = series.get('data'),
        count = series.getPoints().length;

      data.push(13);
      series.changeData(data,true);

      setTimeout(function(){
        expect(series.getPoints().length).to.be(count + 1);
        expect(series.get('markersGroup').getCount()).to.be(count + 1);
        done();
      },1000);

    });

    it('减少数据',function(done){
      var data = series.get('data'),
        count = series.getPoints().length;
      data.shift();

      series.changeData(data,true);

      setTimeout(function(){
        expect(series.getPoints().length).to.be(count - 1);
        expect(series.get('markersGroup').getCount()).to.be(count - 1);
        done();
      },500);

    });

    it('更改多个数据，不更新图表',function(done){
      var data = series.get('data'),
        count = series.getPoints().length;
      
      data.push(7);
      data.push(4);

      series.changeData(data);
      
      setTimeout(function(){
        expect(series.getPoints().length).to.be(count);
        expect(series.get('markersGroup').getCount()).to.be(count);
        done();
      },500);
    });

    it('更新图表',function(done){
      var count = series.getPoints().length;
      chart.repaint();
      setTimeout(function(){
        var xAxis = series.get('xAxis'),
        ticks = xAxis.get('ticks');
        expect(ticks.length > 0).to.be(true);
        expect(ticks[0] <= series.get('pointStart'));
        expect(ticks[ticks.length - 1] > series.get('data').length * 10 + 100);

        expect(series.getPoints().length).to.be(count + 2);
        expect(series.get('markersGroup').getCount()).to.be(count + 2);
        done();
      },500);
    });
    it('替换数据源',function(done){
      series.changeData([-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],true);
      setTimeout(function(){
        expect(series.getPoints().length).to.be(series.get('data').length);
        done();
      },500);
    });
  });
})
  


describe('动态图2',function(){

  var chart = new Chart({
    id : 'd1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,50]
      
    },
    title : {
      text : 'Monthly Average Temperature'
    },
    subTitle : {
      text : 'Source: WorldClimate.com'
    },
    xAxis : {
      type : 'time',
      tickInterval : 1000,
      formatter : function(value){
        var date = new Date(value);
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      },
      tickOffset : 10
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      },
      min : 0
    },  
    tooltip : {
      valueSuffix : '°C',
      shared : true,
      crosshairs : true
    },
    legend : {
      align : 'right',
      layout : 'vertical',
      dy : -150,
      dx : -60
    },
    series : [ {
        name: 'New York',
       // smooth : true,
        pointInterval : 2000,

        //type : 'column',
        data: (function() {                                                 
            // generate an array of random data                             
            var data = [],                                                  
                time = Math.floor((new Date()).getTime()/1000) * 1000,                              
                i;                                                          
                                                                            
            for (i = -19; i <= 0; i++) {                                    
                data.push({                                                 
                    x: time + i * 1000,                                     
                    y: Math.random() + .25                                      
                });                                                         
            }                                                               
            return data;                                                    
        })() 
    }]
  });

  chart.render();

    var series = chart.getSeries()[0]; 

                             
    setInterval(function() {                                    
        add(); 
                            
    }, 1000);


    function add(){
      var x = Math.floor((new Date()).getTime()/1000) * 1000, // current time         
            y = Math.random() + 0.25;  
        
      series.addPoint([x, y],true,true); 
    }

});
 */
describe('动态图3',function(){

  var today = DateUtil.today();

  function getData(){
    var data = [],                                                  
        time = Math.floor(today.getTime()/1000) * 1000,   
        endTime =  Math.floor(new Date().getTime()/1000) * 1000,                         
        i;                                                          
                                                                    
    for (i = time; i <= endTime; i = i + 1000 * 60 * 2) {                                    
        data.push({                                                 
            x: i,                                     
            y: getRandom()                                   
        });                                                         
    }                                                               
    return data;    
  }
  var chart = new Chart({
    id : 'd1',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,50]
      
    },
    title : {
      text : 'Monthly Average Temperature'
    },
    subTitle : {
      text : 'Source: WorldClimate.com'
    },
    xAxis : {
      type : 'time',
      formatter : function(value){
        var date = new Date(value);
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      },
      tickOffset : 10,
      startDate : today,
      endDate : DateUtil.addDay(1,today),
      tickInterval : 60 * 60 * 2 * 1000
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      },
      min : 0
    },  
    tooltip : {
      valueSuffix : '°C',
      shared : true,
      crosshairs : true
    },
    legend : {
      align : 'right',
      layout : 'vertical',
      dy : -150,
      dx : -60
    },
    seriesOptions : {
      lineCfg : { 
        pointInterval : 2000,
        line : {
          "stroke-width" : 0.5
        },
        lineActived : {
          "stroke-width" : 0.5
        },
        markers : {
          single : true
        }//不显示marker,数据量大时，动画非常卡顿
      }
    },
    series : [ {
        name: 'New York',        
        //type : 'column',
        data: getData() /**/
    }]
  });

  function getRandom(){
    var r = Math.random(),
      factor = r > 0.5 ? 1 : -1;
    return 100 + Math.random() * 30 * factor;
  }

  chart.render();
/*()
  var series = chart.getSeries()[0],
    series1 = chart.getSeries()[1]; 

                           
  setInterval(function() {                                    
      add(); 
                          
  }, 5000);


  function add(){
    var x = Math.floor((new Date()).getTime()/1000) * 5000, // current time         
          y = getRandom();  
      
    series.addPoint([x, y],false,false);  //第一个不重绘

    var x = Math.floor((new Date()).getTime()/1000) * 5000, // current time         
          y = getRandom(); 

    series1.addPoint([x, y],false,true);  //第二个重绘
  }*/
})  
