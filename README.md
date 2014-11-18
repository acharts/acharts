
# acharts [![spm version](http://spmjs.io/badge/acharts)](http://spmjs.io/package/acharts)

---

Acharts is a javascript charts,using svg and vml,Using Raphael as a foundation.

---

## links

* [API](http://acharts.github.io/acharts-api/api/index.html)
* [demo](http://acharts.github.io)
* [使用文档](wiki/)

## 答疑

 * 旺旺群：1467247830
 * qq群：361974463
 * 邮箱： dxq613@gmail.com
 * issues : https://github.com/acharts/acharts/issues

## Usage

  1. 引入cdn上的代码 
  
  ```js
    <script src="http://g.tbcdn.cn/bui/acharts/1.0.15/acharts-min.js"></script>
  ```

  2. 使用,引入acharts文件后，会在window上增加Chart变量代表Chart控件类

  ```js
  var chart = new AChart({
    //configs
  });
  // use acharts
  ```


## 图表的属性

  * id 图表渲染到的容器的id，必须
  * width 图表的宽度，如果设置forceFit :true,则自动计算宽度
  * height 图表的高度
  * data 图表的数据，如果此属性设置，series内部就不需要设置data
  * forceFit 图表宽度自适应，窗口发生改变时，图表宽度自适应
  * fitRatio 如果设置了forceFit 那么宽高的比例由此属性决定，默认0，不按照比例设置高度
  * plotCfg 图表的边框、背景设置，详细信息参考：[图表背景](http://spmjs.io/docs/achart-plot/#plot-back)，[wiki](http://spmjs.io/docs/achart-plot/wiki/back.html)
  * title 图表标题，设置null时不显示，是一个文本图形，配置信息参考:[文本](http://spmjs.io/docs/achart-canvas/#text)
  * subTitle 图表子标题，设置null时不显示，是一个文本图形，配置信息参考:[文本](http://spmjs.io/docs/achart-canvas/#text)
  * xAxis x轴坐标，对应 [Axis类](http://spmjs.io/docs/achart-axis/)，更多[坐标轴文档](http://spmjs.io/docs/achart-axis/wiki/)
    * type 标示坐标轴类型会转换成对应的坐标轴，例如 Axis.Number 对应 type : 'number';Axis.Circle 对应 type : 'circle'
    * 其他配置信息是指定类型坐标轴的配置信息
  * yAxis y轴坐标，配置信息类似于 xAxis,特别之处在于：
    * yAxis可以是数组，标示图表有多个y坐标轴，对应的图表序列 series里面配置 yAxis:1，即可
  * yTickCounts y轴坐标轴的坐标点的个数，决定显示的文本和栅格密度，这个值是一个数组类型，指定最小、最大个数，默认 ： [3,5]
  * xTickCounts x轴坐标轴的坐标个数，也是有个数组 ，默认 [5,10]
  * colors 颜色列表，多个图表序列时，每个图表序列的颜色依次自动赋值
  * tooltip 提示信息，详细信息参考[tooltip](http://spmjs.io/docs/achart-tooltip/)
  * legend 图例，详细信息参考[图例](http://spmjs.io/docs/achart-legend/)
  * series 图表序列的配置信息，是一个数组，每个对象代表一个图表序列,详细信息参考[图表序列](http://spmjs.io/docs/achart-series/),[详细文档](http://spmjs.io/docs/achart-series/wiki/)，更多[图表序列](http://spmjs.io/docs/achart-series-other/)

    * type 标示图表序列的类型，例如 type : 'line' 代表 Series.Line; type : 'column' 代表Series.Column
    * 其他配置信息参考 对应的数据类型
  * seriesOptions 图表序列统一的配置信息，多个同样的图表序列的配置信息可以一起配置
    * 每种图表一种配置信息，例如 lineCfg 标示折线图 type : 'line' 的配置信息，columnCfg 标示柱状图的配置信息
    * 如果仅有一种类型的配置信息，例如 seriesOptions : {columnCfg : {}}，默认所有series的类型为 column
  * theme 图表的皮肤，详细信息参考[图表皮肤](http://spmjs.io/docs/achart-theme/)

#### 只读属性

  * canvas 画布，详细信息参考[画布](http://spmjs.io/docs/achart-canvas/)



### 方法

  * render() 渲染图表
  * on(eventName,fn) 绑定事件
  * off(eventName,fn) 解除事件绑定
  * get(name) 获取属性
  * set(name,value) 设置属性

  * getSeries() 返回所有的series
  * getSeriesByName(name) 获取指定名称的series
  * getXAxis(seriesName) 根据序列series的name返回对应的x坐标轴，如果不指定则取第一个序列的x坐标轴
  * getYAxis(seriesName) 根据序列series的name返回对应的y坐标轴，如果不指定则取第一个序列的y坐标轴
  * changeData(data) 更改数据，如果有多个序列则 data 是一个多维数组，data = [data1,data2...datan]


### 绑定事件

  * 图表的事件绑定方式有多种方式： 
    * 直接在chart上绑定图表的事件，事件类型比较少，必须在图表上触发事件
    * 配置项中配置对应元素的事件，例如可以在具体的某个 series里面配置series的事件 
    * 查找到对应的[图形](http://spmjs.io/docs/achart-canvas/#shape)或者[分组](http://spmjs.io/docs/achart-canvas/#group)，绑定事件

#### 直接在图表上绑定事件
  * 图表支持的事件类型：
  
    * plotclick 图表边框内部的点击事件
      * ev.x 点击的x坐标
      * ev.y 点击的y坐标
      * ev.shape 点击的图形
    * plotmove 图表边框内部的移动事件
      * ev.x 移动到的x坐标
      * ev.y 移动到的y坐标
      * ev.shape 移动到的图形
    * plotover 进入图表的边框内部
      * ev.x 进入的x坐标
      * ev.y 进入的y坐标
      * ev.shape 移动到的图形
    * plotout 移出图表边框
    * seriesactived 图表序列激活，例如折线图激活
      * ev.series 图表序列
    * seriesunactived 图表序列取消激活
      * ev.series 图表序列
    * seriesitemclick 点击图表序列子项，例如饼图的一个子项（弧形）被点击
      * ev.series 图表序列
      * ev.seriesItem 图表序列子项
    * seriesitemselected 选中图表序列的一个子项，例如柱状图的一项被选中
      * ev.series 图表序列
      * ev.seriesItem 图表序列子项
    * seriesitemunselected 取消选中图表序列的一个子项
      * ev.series 图表序列
      * ev.seriesItem 图表序列子项
    * tooltipshow 提示信息显示
    * tooltiphide 提示信息隐藏

  * 绑定事件的代码

    ```js

    chart.on('plotclick',function(ev){
      var shape = ev.shape;
      if(shape){
        //TO DO
      }
    });

    ```


