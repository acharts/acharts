# 图表的构成

---

图表的一些概念和构成

---

## 目录

  * 图表的构成
  * 交互行为

### 图表构成

图表由以下各个部分构成：

  * [画布](http://spmjs.io/docs/achart-canvas/):绘制所有图表的画布，可以通过chart.get('canvas')获取
  * [图表背景](http://spmjs.io/docs/achart-plot/#plot-back) ： 包括边框、背景，通过 plotCfg配置，详细信息参考[wiki](http://spmjs.io/docs/achart-plot/wiki/back.html)
  * [图表可视区域](http://spmjs.io/docs/achart-plot/wiki/range.html)，即图表边框内部的区域,参考[wiki](http://spmjs.io/docs/achart-plot/wiki/range.html)
  * [坐标轴](http://spmjs.io/docs/achart-axis/)，一个图表有多个坐标轴，目前支持一个x坐标轴，[多个y坐标轴](http://builive.com/chart/line.php#line/multiple-y.php)
  * [图表序列](http://spmjs.io/docs/achart-series/)，一个图表可以有多个图表序列，通过series属性配置
  * [图例](http://spmjs.io/docs/achart-legend/),用于标示图表序列，或者其他元素
  * [提示信息](http://spmjs.io/docs/achart-tooltip/),显示图表序列信息，可以使用html，自定义内部元素

### 交互行为

  * 图表初始化时，根据各个图表序列的数据，自动计算坐标轴，显示图表序列,显示初始化动画
  * 鼠标在图表画布上移动时，如果进入图表的可视区域，显示图表序列的信息
  * 鼠标在图例上移动，移动到一个图例项上时，高亮对应的图表序列，点击时隐藏对应的图表序列，再次点击，显示对应的图表序列
  * 改变图表序列的数据，重新计算坐标轴，重新绘制图形


