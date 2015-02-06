# bugs

----
 
 bug fixed

----

## 修复Bug

````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c1',
          width : 350,
          height : 300,
          plotCfg: {
            margin:10
          },
          legend : null ,//不显示图例
          seriesOptions : { //设置多个序列共同的属性
            pieCfg : {
              allowPointSelect : false,
              labels : null
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
              size: '80%',
              innerSize: '60%',
              data: [
                ['Firefox',   18.0],
                ['IE',       20],
                 ['c',       25],
                ['Others',   30] 
              ]
          }]
        });
 
        chart.render();
});
````

