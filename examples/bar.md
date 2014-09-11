# Bar

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
          height : 400,
          title : {
            text : 'Monthly Average Temperature',
            'font-size' : '16px'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          invert : true,
          xAxis : {
            categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May'
            ],
            position : 'left', //x轴居左
            labels : {
              label : {
                'text-anchor' : 'end',
                x : -12,
                y : 0
              }
            }
          },
          yAxis : {
            position : 'bottom',
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
                  data: [49.9, 71.5, 106.4, 129.2, 144.0]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, null, 47.0]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6]
 
              }]
 
        });
 
        chart.render();

});
````

## Persentage

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
          invert : true,
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
            ],
            position : 'left', //x轴居左
            labels : {
              label : {
                'text-anchor' : 'end',
                x : -12,
                y : 0
              }
            }
          },
          yAxis : {
            position : 'bottom',
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
                  data: [49.9, 71.5, 106.4, 129.2, 144.0, 33.2, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
 
              }, {
                  name: 'New York',
                  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
 
              }, {
                  name: 'London',
                  data: [48.9, 38.8, 39.3, 93.2, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
 
              }, {
                  name: 'Berlin',
                  data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
 
              }]
 
        });
 
        chart.render();
});
````


