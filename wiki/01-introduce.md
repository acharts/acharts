# 入门

---

acharts 入门

---

## 目录

  * 引入acharts
  * 创建图表
  * 绑定事件
  * 操作图表
  * 更多

### 引入acharts
  
  * 可以下载acharts到本地
    * [最新版本](https://github.com/acharts/acharts/archive/master.zip)
    * [历史版本](https://github.com/acharts/acharts/releases)
  * 直接引入cdn上的地址

    * 例如 ：http://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js 其中1.0.9是版本号，可以替换成对应的版本

    ```html
      <script src="http://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js"></script> 
      <script src="http://g.tbcdn.cn/bui/acharts/1.0.9/acharts-min.js"></script> 

      <!- https -->
      <script src="https://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js"></script> 
      <script src="https://s.tbcdn.cn/g/bui/acharts/1.0.9/acharts-min.js"></script>

    ```

  * 更详细和灵活的使用方式，参考:[acharts的使用方式](use.md)

<script src="http://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js?nowrap"></script> 


### 创建图表

  * 引入acharts文件后，会生成：window.AChart 作为入口
  * 创建第一个图表

````html
<div id="c1"></div>
````

````javascript

  var chart = new AChart({
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
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }, {
        name: 'Beijing',
        data: [13.9, 14.2, 15.7, 18.5, 21.9, 25.2, 27.0, 26.6, 24.2, 20.3, 16.6, 14.8]
      }, {
        name: 'Sahnghai',
        data: [17.0, 16.9, 19.5, 24.5, 28.2, 31.5, 35.2, 36.5, 33.3, 28.3, 23.9, 19.6]
      }]
    });

    chart.render();

````

#### 图表的属性

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
#### 配置项中配置事件的回调函数

  * 配置项中每个代表[图形分组](http://spmjs.io/docs/achart-canvas/#group)的配置项，都可以使用`events`属性配置对应事件的回调函数
  * 各个图形元素的[事件汇总](08-events.md)
  * 示例：

````html
<div id="c2"></div>
````
````javascript

  var chart = new AChart({
    id : 'c2',
    theme : Chart.Theme.Smooth2,
    width : 950,
    height : 400,
    title : {
      text : 'Monthly Average Temperature',
      'font-size' : '16px'
    },
    subTitle : {
      text : 'Source: WorldClimate.com'
    },
    xAxis : {
      type : 'category'
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      },
      min : 0
    },
    seriesOptions : {
        columnCfg : {
          allowPointSelect : true,
          xField : 'x',
          item : {
            cursor : 'pointer',
            stroke : 'none'
          }
        }
    },
    series: [ {
      name: '浏览器占比',
      events : {
        itemclick : function (ev) {
          var point = ev.point,
            //item = ev.item, //点击的项
            obj = point.obj; //point.obj是点击的配置项的信息
          alert(obj.x); //执行一系列操作
        }/*,
        itemselected : function(ev){ //选中事件

        },
        itemunselected : function(ev){ //取消选中事件

        }
        */
      },
      data: [
        {x : 'ie',y : 50,attrs : {fill : '#7179cb'}},
        {x : 'chrome',y : 30,attrs : {fill : '#6ed7ff'}},
        {x : 'firfox',y : 10,attrs : {fill : '#79c850'}},
        {x : 'other',y : 10,attrs : {fill : '#ffb65d'}},
      ]
    }]

  });

  chart.render();


````

#### 查找图形或者分组，绑定事件

  * 通过chart.get('canvas').find(id) 来查找对应的图形元素然后绑定事件，其他查找方法参考[图形查找](http://spmjs.io/docs/achart-canvas/api/container.html#查找)
  * 在对应的分组的配置项中可以配置id 
  * 示例

  ```js
  var chart = new AChart({
    ...
    series: [ {
      name: 'Tokyo',
      type : 'line',
      markers : {
        id : 'test_markers',
        marker : {
          radius : 6,
          symbol : 'url(http://mat1.gtimg.com/www/images/qq2012/weather/20120906/sun.png)'
        },
        actived : {
          radius : 10
        }
      },
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]

    }]

  });

  chart.get('canvas').find('test_markers').on('markerclick',function(ev){
    var marker = ev.marker,
      point = ev.point;
    //TO DO
  });

  ```

### 操作图表
  

#### 图表的API

  * render() 渲染图表，创建图表控件，绘制图表
  * paint() 绘制图表，如果chart.clear()后，可以重新调用此方法
  * repaint() 重新渲染图表
  * on(eventType,fn) 绑定事件
  * off(eventType,fn) 移除事件
  * fire(eventType) 触发事件
  * getSeries() 获取所有的图表序列
  * changeData(data) 改变数据，详细信息参考[图表的数据格式](09-data.md)

    * 如果data里面的元素是一个个的对象，那么所有的图表序列共享，例如 changeData([{},{}]);
    * 如果data是一个多维数组，那么每个图表序列一个数组，例如 changeData([[],[],...,dataN]);


### 更多

  * [使用方式](02-use.md)
  * [图表元素](03-component.md)
  * [图表类型](04-series.md)
  * [图表的模块](05-modules.md)
  * [实现自己的图表类型](06-add-series.md)



