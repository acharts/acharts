# Column

---

## Basic Type


````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c1',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          title : {
            text : '柱状图'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            categories: [
              'Tokyo',
              'Jakarta',
              'New York',
              'Seoul',
              'Manila',
              'Mumbai',
              'Sao Paulo',
              'Mexico City',
              'Dehli',
              'Osaka',
              'Cairo',
              'Kolkata',
              'Los Angeles',
              'Shanghai',
              'Moscow',
              'Beijing',
              'Buenos Aires',
              'Guangzhou',
              'Shenzhen',
              'Istanbul'
            ],
            labels : {
              label : {
                rotate : -45,
                'text-anchor' : 'end'
              }
            }
          },
          yAxis : {
            min : 0
          },
          seriesOptions : { //设置多个序列共同的属性
            /*columnCfg : { //公共的样式在此配置
 
            }*/
          },
          tooltip : {
            valueSuffix : '￥'
          },
          series : [ {
            name: 'Africa',
            type : 'column',
            data: [34.4, 21.8, {y : 20.1,attrs : {fill : '#ff0000'}}, 20, 19.6, 19.5, 19.1, 18.4, 18,
                17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
                11.7, 11.2],
            labels : { //显示的文本信息
              label : {
                rotate : -90,
                y : 10,
                'fill' : '#fff',
                'text-anchor' : 'end',
                textShadow: '0 0 3px black',
                'font-size' : '14px'
              }
            }
 
          }]
 
        });
 
        chart.render();
});
````

## event 

````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c1',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          title : {
            text : '柱状图'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'category'
          },
          yAxis : {
            min : 0
          },
          seriesOptions : { //设置多个序列共同的属性
            columnCfg : { //公共的样式在此配置
 
            }
          },
          tooltip : {
            valueSuffix : '%'
          },
          series : [ {
            name: '浏览器分布',
            type : 'column',
            data: [
              {x : 'ie',y : 50,attrs : {fill : '#7179cb'}},
              {x : 'chrome',y : 30,attrs : {fill : '#6ed7ff'}},
              {x : 'firfox',y : 10,attrs : {fill : '#79c850'}},
              {x : 'other',y : 10,attrs : {fill : '#ffb65d'}},
            ]
 
          }]
 
        });
 
        chart.render();
});
````

 
## Multi column


````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c2',
          
          width : 950,
          height : 400,
          title : {
            text : 'Monthly Average Temperature',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },
          tooltip : {
            shared : true
          },
          seriesOptions : {
              columnCfg : {
 
              }
          },
          series: [ {
                  name: 'Tokyo',
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
 
              }]
 
        });
 
        chart.render();
});
````

## The breakpoint graph


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c3',
          
          width : 950,
          height : 400,
          title : {
            text : 'Monthly Average Temperature',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },
          tooltip : {
            shared : true
          },
          seriesOptions : {
              columnCfg : {
 
              }
          },
          series: [ {
                  name: 'Tokyo',
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, null, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, null, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
 
              }]
 
        });
 
        chart.render();
});
````

## Stacked bar chart


````html
<div id="c4"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c4',
          
          width : 950,
          height : 400,
          title : {
            text : 'Monthly Average Temperature',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },
          tooltip : {
            shared : true
          },
          seriesOptions : {
              columnCfg : {
                stackType : 'normal' //层叠
              }
          },
          series: [ {
                  name: 'Tokyo',
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
 
              }]
 
        });
 
        chart.render();
});
````

## Percentage bar chart


````html
<div id="c5"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c5',
          
          width : 950,
          height : 400,
          title : {
            text : 'Monthly Average Temperature',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },
          tooltip : {
            shared : true
          },
          seriesOptions : {
              columnCfg : {
                stackType : 'percent' //层叠
              }
          },
          series: [ {
                  name: 'Tokyo',
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
 
              }]
 
        });
 
        chart.render();
});
````



````html

<div id="c6"></div>

<div>
  <div id="p1" style="border : 1px solid red;position:absolute;">
    
  </div>
</div>

````

````javascript
seajs.use('acharts', function(AChart) {

  var chart = new AChart({
          id : 'c6',
          width : 950,
          height : 400,
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },
          tooltip : {
            shared : true,
            custom : true,
            html : '#p1'
          },
          seriesOptions : {
              columnCfg : {
                stackType : 'normal' //层叠
              }
          },
          series: [ {
                  name: 'Tokyo',
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

              }]
  });

  chart.render();


  var pieChart = new AChart({
    id : 'p1',
    theme : Chart.Theme.Smooth2,
    plotCfg : {
      margin : 0
    },
    width : 250,
    height : 250,
    
    legend : null ,//不显示图例
    seriesOptions : { //设置多个序列共同的属性
      pieCfg : {
        labels : {
          distance : 10,
          label : {
            //文本信息可以在此配置
          },
          renderer : function(value,item){ //格式化文本
            return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
          }
        }
      }
    },
    tooltip : null,
    series : [{
        type: 'pie',
        size : '40%',
        animate : false,
        name: 'percent'
    }]
  });

  pieChart.render();
  var pie = pieChart.getSeries()[0];
  var handler = null;
  chart.on('tooltipchange',function(ev){
    var items = ev.items,
      data = [];
    for(var i = 0;i<items.length; i++){
      var item = items[i];
      data.push([item.name,item.value]);
    }

    clearTimeout(handler);
    handler = setTimeout(function(){ //避免频繁更改


      pie.changeData(data,true);
      //console.log(JSON.stringify(data));
      console.log(pie.getPoints());
    },200);
    
    
  });

});

````