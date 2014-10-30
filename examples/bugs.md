# bugs

----
 
 bug fixed

----



## 测试

````html

<div id="c5"></div>

````

````javascript
seajs.use('acharts', function(AChart) {
  var chart = new AChart({
    theme : AChart.Theme.SmoothBase,
    id : 'c5',
    width : 950,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
    },
    xAxis : {
      title : {
        text : '收入'
      }
    },
    yAxis : {
      title : {
        text : '出生率'
      },
      min : -10
    },  
    tooltip : {
      shared : true
    },
    seriesOptions : {
        bubbleCfg : {
          labels : {
            label : {
              'font-size' : 12,
              fill : '#fff'
            }
          },
          activeCircle : {
                stroke : "red"
          }
        }
    },
    series: [{
      name : 'bubble1',
      
      data: [
        {x : 97,y:36,r:79,name : '中国'},
        {x : 94,y:74,r:60,name : '日本'},
        {x : 68,y:76,r:58,name : '山东'},
        {x : 64,y:87,r:56,name : '测试'},
        {x : 68,y:27,r:73,name : '比例'},
        {x : 74,y:99,r:42,name : '看看'},
        {x : 7,y:93,r:87,name : '你好'},
        {x : 51,y:69,r:40,name : '我好'},
        {x : 38,y:23,r:33,name : '不好'},
        {x : 57,y:86,r:31,name : '在这里'}
      ]
  },{
    name : 'bubble2',
    data: [[9, 81, 63],
        [98, 5, 89],
        [51, 50, 73],
        [41, 22, 14],
        [58, 24, 20],
        [78, 37, 34],
        [55, 56, 53],
        [18, 45, 70],
        [42, 44, 28],
        [3, 52, 59],
        [31, 18, 97],
        [79, 91, 63],
        [93, 23, 23],
        [44, 83, 22]],
      circle : {
          fill : 'r(0.4, 0.3)rgba(255,255,255,0.5)-rgba(69,114,167,0.5)'
      }
  }]
  });

  chart.render();
});

````
