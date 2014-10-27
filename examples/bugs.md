# bugs

----
 
 bug fixed

----


## 皮肤


````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  var chart = new Achart({
      id : 'c1', //render改成 id
      
      width : 950,
      height : 500,
      plotCfg : {
        margin : [50,50,80] //画板的边距
      },
      title : {
        text : '一年的平均温度'

      },
      subTitle : {
        text : 'Source: WorldClimate.com'
      },
      xAxis : {
        categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      },
      yAxis : {
        title : {
          text : '温度',
          rotate : -90
        }
      },
      tooltip : {
        valueSuffix : '°C',
        shared : true, //是否多个数据序列共同显示信息
        crosshairs : true //是否出现基准线
      },
      series : [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }, {
        name: 'Beijing',
        data: [13.9, 14.2, 15.7, 18.5, 21.9, 25.2, 27.0, 26.6, 24.2, 20.3, 16.6, 14.8]
      }, {
        name: 'Sahnghai',
        data: [17.0, 16.9, 19.5, 24.5, 28.2, 31.5, 35.2, 36.5, 33.3, 28.3, 23.9, 19.6]
      }]
    });

    chart.render();

    var group = chart.get('seriesGroup'),
      series1 = chart.getSeries()[0],
      xAxis = series1.get('xAxis'),
      yAxis = series1.get('yAxis'),
      index = 3,
      data = series1.get('data'),
      value = data[index];

    var x = xAxis.getOffsetByIndex(index),
      y = yAxis.getOffset(value);

    group._processTracking({x : x,y : y},group.get('tipGroup'));

});
````
