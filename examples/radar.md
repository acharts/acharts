# Radar

---

## Line chart


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
            margin : [50,50,100]
 
          },
          title : {
            text : '折线雷达图',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'circle' //圆形栅格，可以改成polygon
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
 
          series: [
            {
                name : 'line1',
                type: 'line',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                type: 'line',
                name: 'Line2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'line',
                name: 'line3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## Regional map


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
            text : '区域雷达图',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          /*tooltip : {
            shared : true //共享栅格
          },*/
          series: [
            {
                name : 'area1',
                type: 'area',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                type: 'area',
                name: 'area2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: 'area3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();

});
````

## Stacked area charts


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c3',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '区域层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          seriesOptions : {
            areaCfg : {
              stackType : 'normal'
            }
          },
          /*tooltip : {
            shared : true //共享栅格
          },*/
          series: [
            {
                name : 'c1',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                name: 'c2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                name: 'c3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## Percentage


````html
<div id="c4"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c4',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '区域层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          seriesOptions : {
            areaCfg : {
              stackType : 'percent'
            }
          },
          /*tooltip : {
            shared : true //共享栅格
          },*/
          series: [
            {
                name : 'c1',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                name: 'c2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                name: 'c3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## Bar


````html
<div id="c5"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c5',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '柱状雷达图',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                name : 'column',
                type: 'column',
                data: [8, 7, 6, 5, 4, 6, 2, 7]
            }
            ]
        });
 
        chart.render();
});
````

## Multiple bar


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
            text : '柱状图',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                name : 'c1',
                type: 'column',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                type: 'column',
                name: 'c2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'column',
                name: 'c3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## Stacked bar chart


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
            text : '柱状层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          seriesOptions : {
            columnCfg : {
              stackType : 'normal'
            }
          },
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                name : 'c1',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                name: 'c2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                name: 'c3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();

});
````

## Percentage bar


````html
<div id="c8"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  
        var chart = new AChart({
          id : 'c8',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '柱状层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
          seriesOptions : {
            columnCfg : {
              stackType : 'percent'
            }
          },
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                name : 'c1',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                name: 'c2',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                name: 'c3',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## Hybrid graph


````html
<div id="c9"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  
        var chart = new AChart({
          id : 'c9',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '柱状层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'polygon' //圆形栅格，可以改成circle
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
 
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                type: 'column',
                name: 'Column',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                type: 'line',
                name: 'Line',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: 'Area',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

## The circular grid line


````html
<div id="c10"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  
        var chart = new AChart({
          id : 'c10',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,100]
 
          },
          title : {
            text : '柱状层叠',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          xAxis : {
            type : 'circle',
            tickInterval : 45
          },
          yAxis : {
            title : null,
            type : 'radius',
            grid : {
              type : 'circle' //圆形栅格，可以改成polygon
            },
            labels : {
              label : {
                x : -12
              }
            },
            min : 0
          },
 
          tooltip : {
            shared : true //共享栅格
          },
          series: [
            {
                type: 'column',
                name: 'Column',
                data: [8, 7, 6, 5, 4, 3, 2, 1]
            },
            {
                type: 'line',
                name: 'Line',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: 'Area',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }
            ]
        });
 
        chart.render();
});
````

