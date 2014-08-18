var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery'),
    Chart = require('../src/chart');

$('<div id="c1"></div>').prependTo('body');
/*

describe('测试图形的基础内容', function() {
  
  var chart = new Chart({
    forceFit : true,
    //height: 300,
    fitRatio : .4,
    id : 'c1',
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
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      position : 'left',
      labels : {
        label : {
          'text-anchor' : 'end',
          x : -12,
          y : 0
        }
      }
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      },
      position : 'bottom'
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
          invert : true,
          animate : false
        }
    },
    series : [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }]
  });

  chart.render();
  
});
*/
describe('测试图形的基础内容', function() {
  
  var chart = new Chart({
    forceFit : true,
    //height: 300,
    fitRatio : .4,
    id : 'c1',
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
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      position : 'left',
      labels : {
        label : {
          'text-anchor' : 'end',
          x : -12,
          y : 0
        }
      }
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      },
      position : 'bottom'
    },  
    tooltip : {
      valueSuffix : '°C',
      shared : true
    },
    invert : true,

    legend : {
      align : 'right',
      layout : 'vertical',
      dy : -150,
      dx : -60
    },
    seriesOptions : {
        areaCfg : {
          animate : false,
          stackType : 'normal'
        }
    },
    series : [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
          name: 'New York',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

      }/*, {
          name: 'London',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

      }, {
          name: 'Berlin',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

      }*/]
  });

  chart.render();
  
});

