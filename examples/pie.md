# Pie

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
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              labels : {
                distance : 40,
                label : {
                  //文本信息可以在此配置
                },
                renderer : function(value,item){ //格式化文本
                  return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                }
              }
            }
          },
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
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
});
````

## Multiple text pie


````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c2',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '饼图'
          },
 
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          seriesOptions : {
              pieCfg : {
                allowPointSelect : true, //允许选中
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
                      sliced: true
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
});
````

## The internal display text


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c3',
          
          width : 950,
          height : 500,
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
 
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
              type: 'pie',
              name: 'Browser share',
              allowPointSelect : true,
              labels : {
                distance : -30,
                label : {
                  fill : '#fff'
                }
              },
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
});
````

## Circular diagram


````html
<div id="c4"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c4',
          
          width : 950,
          height : 500,
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              labels : {
                distance : 40, //文本距离圆的距离
                label : {
                  //文本信息可以在此配置
                },
                renderer : function(value,item){ //格式化文本
                  return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                }
              },
              innerSize : '60%' //内部的圆，留作空白
 
            }
          },
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
              type: 'pie',
              name: 'Browser share',
              data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
              ]
          }]
        });
 
        chart.render();
});
````

## Half the pie chart


````html
<div id="c5"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c5',
          
          width : 950,
          height : 500,
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              labels : {
                distance : 40, //文本距离圆的距离
                label : {
                  //文本信息可以在此配置
                },
                renderer : function(value,item){ //格式化文本
                  return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                }
              }
 
 
            }
          },
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
              name: 'Browser share',
              startAngle : -180,
              endAngle : 0,
              data: [
                ['Firefox',   44.2],
                ['IE7',       26.6],
                ['IE6',       20],
                ['Chrome',    3.1],
                ['Other',    5.4]
              ]
          }]
        });
 
        chart.render();
});
````

## Can't selected

````html
<div id="c6"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c6',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '饼图'
          },
 
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          seriesOptions : {
              pieCfg : {
                allowPointSelect : false, //不允许选中
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
                      sliced: true
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
});
````

## Change color


````html
<div id="c7"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

        var chart = new AChart({
          id : 'c7',
          width : 950,
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
                colors : [ '#ff6600','#b01111','#ac5724','#572d8a','#333333','#7bab12','#c25e5e','#a6c96a','#133960','#2586e7'],
                allowPointSelect : true, //允许选中
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
                      sliced: true
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

});
````

## Custom text


````html
<div id="c8"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

        var chart = new AChart({
          id : 'c8',
          
          width : 950,
          height : 500,
          legend : null ,//不显示图例
          tooltip : null,
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              labelHeight : 60, //label 的高度，用于布局
              labelLine : false, //不显示连接线
 
              labels : {
                distance : 40, //文本距离圆的距离
                custom : true, //自定义标签
                renderer : function(value,item){
                    return'<span class="title">' + value + '</span><br><span style="color:'+item.point.color+'">' + (item.point.percent * 100).toFixed(2)  + '%</span>'; 
                }
              },
              innerSize : '60%' //内部的圆，留作空白
 
            }
          },
          
          series : [{
              type: 'pie',
              name: 'Browser share',
              data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
              ]
          }]
        });
 
        chart.render();
});
````

## Nested pie


````html
<div id="c9"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
 
        var colors = [ '#ff6600','#b01111','#ac5724','#572d8a','#333333','#7bab12','#c25e5e','#a6c96a','#133960','#2586e7'],
        categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
        name = 'Browser brands',
        data = [{
                y: 55.11,
                color: colors[0],
                drilldown: {
                    name: 'MSIE versions',
                    categories: ['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0'],
                    data: [10.85, 7.35, 33.06, 2.81],
                    color: colors[0]
                }
            }, {
                y: 21.63,
                color: colors[1],
                drilldown: {
                    name: 'Firefox versions',
                    categories: ['Firefox 2.0', 'Firefox 3.0', 'Firefox 3.5', 'Firefox 3.6', 'Firefox 4.0'],
                    data: [0.20, 0.83, 1.58, 13.12, 5.43],
                    color: colors[1]
                }
            }, {
                y: 11.94,
                color: colors[2],
                drilldown: {
                    name: 'Chrome versions',
                    categories: ['Chrome 5.0', 'Chrome 6.0', 'Chrome 7.0', 'Chrome 8.0', 'Chrome 9.0',
                        'Chrome 10.0', 'Chrome 11.0', 'Chrome 12.0'],
                    data: [0.12, 0.19, 0.12, 0.36, 0.32, 9.91, 0.50, 0.22],
                    color: colors[2]
                }
            }, {
                y: 7.15,
                color: colors[3],
                drilldown: {
                    name: 'Safari versions',
                    categories: ['Safari 5.0', 'Safari 4.0', 'Safari Win 5.0', 'Safari 4.1', 'Safari/Maxthon',
                        'Safari 3.1', 'Safari 4.1'],
                    data: [4.55, 1.42, 0.23, 0.21, 0.20, 0.19, 0.14],
                    color: colors[3]
                }
            }, {
                y: 2.14,
                color: colors[4],
                drilldown: {
                    name: 'Opera versions',
                    categories: ['Opera 9.x', 'Opera 10.x', 'Opera 11.x'],
                    data: [ 0.12, 0.37, 1.65],
                    color: colors[4]
                }
            }];
 
 
            // Build the data arrays
            var browserData = [];
            var versionsData = [];
            for (var i = 0; i < data.length; i++) {
 
                // add browser data
                browserData.push({
                    name: categories[i],
                    y: data[i].y,
                    attrs : {
                      fill: data[i].color
                    }
                });
 
                // add version data
                for (var j = 0; j < data[i].drilldown.data.length; j++) {
                    var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
                        y: data[i].drilldown.data[j],
                        attrs : {
                          fill: AChart.Util.highlight(data[i].color,.3)
                        }
                    });
                }
            }
 
        var chart = new AChart({
          id : 'c9',
          width : 950,
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
                allowPointSelect : true //允许选中
 
              }
          },
          legend : null,
          series: [{
                  name: 'Browsers',
                  allowPointSelect : false,
                  data: browserData,
                  labels : {
                    distance : -30,
                    label : {
                      fill : '#fff'
                    }
                  },
                  size: '60%'
                },
                {
                  name: 'Versions',
                  labels : {
                    label : {
 
                    },
                    renderer : function(value,item){
                      return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                    }
                  },
                  data: versionsData,
                  size: '80%',
                  innerSize: '60%'
                }
 
          ]
        });
 
        chart.render();
});
````

## Multilayer nested pie


````html
<div id="c10"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new AChart({
      id : 'c10',
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
            labels : null
          }
      },
      series: [{
          type: 'pie',
          radius : 100,
          innerRadius : 80,
          name: 'outter',
          data: [
            {name : 'outter',   y : 60},
            {name : '',y : 40,attrs : {fill : '#fff'},placeHolder : true}
          ]
      },
      {
          type: 'pie',
          name: 'middle',
          radius : 80,
          innerRadius : 60,
          data: [
            {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}},
            {name : '',y : 70,attrs : {fill : '#fff'},placeHolder : true}
          ]
      },
      {
          type: 'pie',
          name: 'inner',
          radius : 60,
          innerRadius : 40,
          data: [
            {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}},
            {name : '',y : 50,attrs : {fill : '#fff'},placeHolder : true}
          ]
      }]
    });
 
    chart.render();
});
````

## Calculation of initial position


````html
<div id="c11"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new AChart({
      id : 'c11',
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
            labels : null,
            animate : false
          }
      },
      series: [{
          type: 'pie',
          radius : 100,
          innerRadius : 80,
          name: 'outter',
          startAngle : -198, // 360 * 60% / 2 + 90
          endAngle : 162, //
          data: [
            {name : 'outter',   y : 60},
            {name : '',y : 40,attrs : {fill : '#efefef'},placeHolder : true}
          ]
      },
      {
          type: 'pie',
          name: 'middle',
          radius : 80, 
          innerRadius : 60,
          startAngle :  -144,//360 * 30% / 2 + 90
          endAngle : 226,
          data: [
            {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}},
            {name : '',y : 70,attrs : {fill : '#efefef'},placeHolder : true}
          ]
      },
      {
          type: 'pie',
          name: 'inner',
          radius : 60,
          innerRadius : 40,
          startAngle :  -180,//360 * 50% / 2 + 90
          endAngle : 180,
          data: [
            {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}},
            {name : '',y : 50,attrs : {fill : '#efefef'},placeHolder : true}
          ]
      }]
    });
 
    chart.render();
});
````

## Multilayer nested pie (counterclockwise)


````html
<div id="c12"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new AChart({
      id : 'c12',
      width : 300,
      height : 300,
      plotCfg : {
        margin : [0]
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
            labels : null,
            animate : false
          }
      },
      legend : {
        align : 'right',//top,left,right,bottom(默认)
        layout : 'vertical',//默认 horizontal
        dy : -100,
        dx : -100,
        back : null
      },
      tooltip : null,
      series: [{
          type: 'pie',
          radius : 100,
          innerRadius : 80,
          name: 'outter',
          color : 'rgb(169, 208, 82)',
          data: [
            {name : '',y : 40,attrs : {fill : '#fff'},placeHolder : true},
            {name : 'outter',   y : 60,attrs : {fill : 'rgb(169, 208, 82)'}}
          ]
      },
      {
          type: 'pie',
          name: 'middle',
          radius : 80,
          innerRadius : 60,
          color: 'rgb(85, 194, 187)',
          data: [
            
            {name : '',y : 70,attrs : {fill : '#fff'},placeHolder : true},
            {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}}
          ]
      },
      {
          type: 'pie',
          name: 'inner',
          radius : 60,
          color : 'rgb(161, 45, 45)',
          innerRadius : 40,
          data: [
            
            {name : '',y : 50,attrs : {fill : '#fff'},placeHolder : true},
            {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}}
          ]
      }]
    });
 
    chart.render();
});
````

## use legend


````html
<div id="c13"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c13',
          
          width : 950,
          height : 500,
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              labels : {
                distance : 40,
                label : {
                  //文本信息可以在此配置
                },
                renderer : function(value,item){ //格式化文本
                  return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                }
              }
            }
          },
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
              type: 'pie',
              name: 'Browser share',
              legend : {
                align : 'bottom'
              },
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
});
````


## 级联饼图

````html

<div id="c14"></div>

````

````javascript
seajs.use('acharts', function(AChart) {
          var data = [{
                name: 'MSIE',
                value: 55.11,
                selected : true,
                drilldown: [
                  {name : 'MSIE 6.0',value : 10.85},
                  {name : 'MSIE 7.0',value : 7.35},
                  {name : 'MSIE 8.0',value : 33.06},
                  {name : 'MSIE 9.0',value : 2.81}
                ]
            }, {
                name: 'Firefox',
                value: 21.63,
                drilldown:[
                  {name : 'Firefox 2.0',value : 0.20},
                  {name : 'Firefox 3.0',value : 0.83},
                  {name : 'Firefox 3.5',value : 1.58},
                  {name : 'Firefox 3.6',value : 13.12},
                  {name : 'Firefox 4.0',value : 5.43}
                ]
            }, {
                name: 'Chrome',
                value: 11.94,
                drilldown: [
                  {name : 'Chrome 5.0',value : 0.12},
                  {name : 'Chrome 6.0',value : 0.19},
                  {name : 'Chrome 7.0',value : 0.12},
                  {name : 'Chrome 8.0',value : 0.36},
                  {name : 'Chrome 9.0',value : 9.91},
                  {name : 'Chrome 10.0',value : 0.50},
                  {name : 'Chrome 11.0',value : 0.22}
                ]
            }, {
                name: 'Safari',
                value: 7.15,
                drilldown:[
                  {name : 'Safari 5.0',value : 4.55},
                  {name : 'Safari 4.0',value : 1.42},
                  {name : 'Safari Win 5.0',value : 0.23},
                  {name : 'Safari/Maxthon',value : 0.21},
                  {name : 'Safari 3.1',value : 0.20},
                  {name : 'Safari 4.1',value : 0.19},
                ]
            }, {
                name: 'Opera',
                value: 2.14,
                drilldown: [
                  {name : 'Opera 9.x',value : 0.12},
                  {name : 'Opera 10.x',value : 0.37},
                  {name : 'Opera 11.x',value : 1.65}
                ]
          }];

        var chart = new AChart({
          id : 'c14',
          width : 950,
          height : 500,
          title : {
            text : '浏览器分布图'
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : true,
              yField : 'value', //表示值的字段
              labels : {
                distance : 20,
                label : {
                  //文本信息可以在此配置
                },
                renderer : function(value,item){ //格式化文本
                  return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%';
                }
              }
            }
          },
          tooltip : {
            pointRenderer : function(point){
              return (point.percent * 100).toFixed(2)+ '%';
            }
          },
          series : [{
              type: 'pie',
              center : [200,200],
              size : '50%',
              name: '浏览器分步',
              data: data
          },{
              type: 'pie',
              name : '内部版本',
              center : [600,200],
              size : '50%'
          },]
        });

        

        chart.render();

        var mainPie = chart.getSeries()[0],
          subPie = chart.getSeries()[1];

        mainPie.on('itemselected',function(ev){
          var item = ev.point.obj;
          subPie.changeData(item.drilldown,true);
        });
});

````


