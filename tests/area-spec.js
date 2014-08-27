var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery'),
    Chart = require('../acharts');

$('<div id="a1"></div>').prependTo('body');

$.getJSON('data/time-data.json?nowrap',function (data) {
  // body...
  var chart = new AChart({
        id : 'a1',
        width : 950,
        height : 500,
        plotCfg : {
          margin : [50,50,80] //画板的边距
        },
        title : {
          text : '区域图'
        },
        xAxis : {//格式化时间
          type : 'time' ,
          formatter : function(value)   {
            return AChart.Date.format(new Date(value),'yyyy-mm-dd');
          }
        },
        seriesOptions : { //设置多个序列共同的属性
          areaCfg : { //如果数据序列未指定类型，则默认为指定了xxCfg的类型，否则都默认是line
            markers : {
              single : true
            }
          }
        },
        tooltip : {
          valueSuffix : '￥'
        },
        series : [{
          name : 'test',
          animate : false,
          data : data
        }]

      });

      chart.render();
})  
  



    