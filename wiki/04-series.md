# 图表的类型

----

各种各样的图表类型

----

## 目录

  * 各种图表
  * 如何指定图表类型

### 各种图表

<style>
  table{
    border :1px solid #dddddd;
    border-collapse: collapse;
  }

  table th,td{
    border :1px solid #dddddd;
    padding: 5px 10px;
  }
  table th{
    background-color: #EEE;
  }

</style>

  | 图表类型 | 类 | 功能 | 文档 | API | 
  | --- | --- | --- | --- | --- |
  |折线图|Series.Line|将数据显示在图表上，并用线连接，可以转换成曲线|[demo](http://builive.com/chart/line.php#line/base.php),[文档](http://spmjs.io/docs/achart-series/wiki/03-line.html)|[API](http://spmjs.io/docs/achart-series/#line),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Line)|
  |区域图|Series.Area|继承折线图，显示区域，支持[层叠功能](http://spmjs.io/docs/achart-series/wiki/07-stacked.html)|[demo](http://builive.com/chart/area.php),[文档](http://spmjs.io/docs/achart-series/wiki/04-area.html)|[API](http://spmjs.io/docs/achart-series/#area),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Area)|
  |柱状图|Series.Column|柱状图，支持[层叠功能](http://spmjs.io/docs/achart-series/wiki/07-stacked.html)|[demo](http://builive.com/chart/column.php),[文档](http://spmjs.io/docs/achart-series/wiki/05-column.html)|[API](http://spmjs.io/docs/achart-series/#column),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Column)|
  |饼图|Series.Pie|饼图，支持环形图、嵌套饼图|[demo](http://builive.com/chart/pie.php),[文档](http://spmjs.io/docs/achart-series/wiki/05-pie.html)|[API](http://spmjs.io/docs/achart-series/#pie),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Pie)|
  |雷达图|无|仅仅替换x轴，y轴的类型，即可支持折线图、区域图、柱状图|[demo](http://builive.com/chart/radar.php),[文档](http://spmjs.io/docs/achart-series/wiki/09-radar.html)|无|
  |散点图|Series.Scatter|显示多个散点|[demo](http://builive.com/chart/scatter.php#scatter/base.php),[文档]()|[API](),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Scatter)|
  |气泡图|Series.Bubble|气泡图，在坐标系内显示气泡，并根据大小显示大小|[demo](http://builive.com/chart/scatter.php#bubble/base.php),[文档]()|[API](),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Bubble)|
  |标记图|Series.Flag|在其他图表上打上标记|[demo](http://builive.com/chart/line.php#line/flag-base.php),[文档]()|[API](),[详细](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Series.Flag)|


### 如何指定图表类型

  * 默认是折线类型 type : 'line'
  * 在series定义中指定 type 
  * seriesOptions 属性中声明唯一的 type + 'Cfg' 时，所有未指定type的图表序列默认为type ,例如：

  ```js

    seriesOptions : {
      columnCfg : {

      }
    },
    series : [
      {name : '1',data : []}, //column
      {name : '2',data : [],type : 'line'}
    ]

  ```
