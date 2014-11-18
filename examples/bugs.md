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
        markers : {
          events : {
            markerclick : function(ev){
              console.log(ev);
            },
            click : function(ev){
              console.log(ev);
            }
          }
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }]
    });

    chart.render();
});
````

