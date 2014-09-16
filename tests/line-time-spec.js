var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery'),
    Chart = require('../src/chart');

$('<div id="c1"></div>').prependTo('body');

var chart = new Chart({
  id : 'c1',
  width : 950,
  height : 500,
  plotCfg : {
    margin : [50,50,80] //画板的边距
  },
  title : {
    text : '二天内的温度'

  },
  subTitle : {
    text : 'Source: WorldClimate.com'
  },
  xAxis : {
    type : 'time',
    formatter : function(value){
      var date = new Date(value);
      if(date.getHours() == 0){ //天
        return (date.getMonth() + 1) + '月' + date.getDay() + '日';
      }else{
        return date.getHours() + ': 00';
      }
    }/*,
    autoOffset : false*/
  },
  yAxis : {
    title : {
      text : '温度',
      rotate : -90
    }
  },
  seriesOptions : { //设置多个序列共同的属性
    lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
      markers : {
        single : true //仅使用一个marker
      },
      smooth : true,
      pointInterval: 3600000, // one hour
      pointStart:new Date(2009, 9, 6, 0, 0, 0).getTime() // Date.UTC(2009, 9, 6)//
    }
  },
  tooltip : {
    valueSuffix : '°C',
    shared : true, //是否多个数据序列共同显示信息
    crosshairs : true //是否出现基准线
    /**/
  },
  series : [{
    name: 'New York',

    data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
      7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
      8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
      7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
      3.0, 3.0]
    }/*,
    {
    name: 'Voll',
    data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
        0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
        3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4]
    }*/]

});

chart.render();