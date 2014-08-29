# pie

---


## import js

````html

<script src="../dist/acharts/1.0.6/acharts.js?nowrap "></script>

````

## basic pie


````html

<div id="c1"></div>
````

````js
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

````

## Too much text in the pie chart


````html

<div id="c2"></div>
````

````js
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
````

## Internal display text


````html

<div id="c3"></div>
````

````js
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
````


## Ring the pie chart


````html

<div id="c4"></div>
````

````js
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
````

## Half the pie chart


````html

<div id="c5"></div>
````

````js
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
````
