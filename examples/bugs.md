# bugs

----
 
 bug fixed

----

## 修复Bug

````html
<style>
  .ac-tooltip{
    position:absolute;
    visibility:hidden;
    border : 1px solid #efefef;
    background-color: white;
    opacity: .8;
    padding: 20px;
 
    transition: top 200ms,left 200ms;
    -moz-transition:  top 200ms,left 200ms;  /* Firefox 4 */
    -webkit-transition:  top 200ms,left 200ms; /* Safari 和 Chrome */
    -o-transition:  top 200ms,left 200ms;
  }
 
  .ac-tooltip .ac-title{
    margin: 0;
    padding: 5px 0;
  }
 
  .ac-tooltip .ac-list{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ac-tooltip li{
    line-height:  22px;
  }
</style>
<div id="canvas"></div>
````

````javascript
seajs.use('acharts', function(AChart) {
     var data = [
            {"month":"0","tokyo":7,"newYork":-0.2,"berlin":-0.9},
            {"month":"1","tokyo":6.9,"newYork":0.8,"berlin":0.6},
            {"month":"2","tokyo":9.5,"newYork":5.7,"berlin":3.5},
            {"month":"3","tokyo":14.5,"newYork":11.3,"berlin":8.4},
            {"month":"4","tokyo":18.2,"newYork":17,"berlin":13.5},
            {"month":"5","tokyo":21.5,"newYork":22,"berlin":17},
            {"month":"6","tokyo":25.2,"newYork":24.8,"berlin":18.6},
            {"month":"7","tokyo":26.5,"newYork":24.1,"berlin":17.9},
            {"month":"8","tokyo":23.3,"newYork":20.1,"berlin":14.3},
            {"month":"9","tokyo":18.3,"newYork":14.1,"berlin":9},
            {"month":"10","tokyo":13.9,"newYork":8.6,"berlin":3.9},
            {"month":"11","tokyo":9.6,"newYork":2.5,"berlin":1}
          ];
        var chart = new AChart({
          theme : AChart.Theme.SmoothBase,
          id : 'canvas',
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          xAxis : {
            type : 'category'
          },
          data : data,
          tooltip : {
            valueSuffix : '°C',
            shared : true, //是否多个数据序列共同显示信息
            crosshairs : true //是否出现基准线
          },
          seriesOptions: {
            lineCfg : {
              xField : 'month'
            }
          },
          series : [{
                name: 'Tokyo',
                yField : 'tokyo'
            }]
        });
 
        chart.render();
});
````

