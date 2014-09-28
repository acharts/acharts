# 图表的数据

---

图表的数据

---

## 目录

  * 简介
  * 数据格式
  * 自动生成坐标轴
  * 数据转换成点
  * 更改数据

### 简介

  * 图表序列用于将数据序列转换成图形，根据坐标轴计算图形的位置，用户跟图形交互时显示代表的数据

### 数据格式

  * 图表序列的数据源都是数组，数组的元素有3种数据格式

    1. 数值，最简单的数据方式，此时x轴的位置通过数据的索引计算，如 data : [1,2,3,4]
    2. 对象，通过图表序列的xField,yField标示，x,y坐标轴代表的字段，如 data : [{a : 1,b:2},{a : 2,b:3}],此时多个序列可以共享一个数据源
    3. 数组，图表序列会将数组解析成x轴y轴需要的数据

  * 示例

    * <a href="http://builive.com/chart/line.php#line/base.php">简单数据</a>
    * <a href="http://builive.com/chart/line.php#line/data.php">使用对象</a>
    * <a href="http://builive.com/chart/line.php#line/auto-x.php">使用数组</a>

### 自动生成坐标轴

图表的坐标轴可以用户直接指定，也可以通过数据自动计算，对于不同类型的坐标轴情况不完全一样

  * 数字、时间坐标轴，如果存在以下情况，不进行自动计算
    * 存在ticks属性
    * max,min,tickInterval 都设置了
  * 分类坐标轴，设置了categories时不自动计算
  * 圆形坐标轴，设置了ticks 或者 tickInterval的情况不进行自动计算

### 数据转换成点

  * 需要坐标轴的图表序列将数据转换成的点存在以下属性：

    * x x轴的坐标点
    * y y轴的坐标点
    * xValue x轴上的值
    * value 一般等同于y轴上的值
    * yValue y轴上的值

  * 不需要坐标轴的图表序列，生成的节点由用户自定义，但是一般也提供以下属性：

    * xValue 一般标示 name
    * yValue 一般标示 value

  * 数据转换成点后，不同的图形可能需要对节点进行一些特殊的处理，例如：

    * 饼图需要在节点上增加，起始角度，结束角度等信息
    * 柱状图、区域图，层叠的时候在节点上附加层叠相关的信息

#### 数据格式和数据转换

  * 数字、时间坐标轴

    * 数值，x轴对应的值使用 pointInterval决定，y轴对应的值通过传入的数值计算
    * 对象，xField,yField决定 x轴和y轴的值
    * 数组，如果设置了pointInterval x轴对应的值则按照pointStart + pointInterval * index 计算，y轴的值取第一个，否则x轴取第一个值，y轴取第二个

  * 分类坐标轴

    * 数值，按照index索引计算x轴位置
    * 对象，如果存在 obj[xField] 则使用,否则按照索引计算
    * 数组，第一个是x轴对应的值，第二个是y轴对应的值

### 更改数据

  * 更改数据的方式有2种
    * 整个图表更改数据
    * 单个图表序列更改数据

#### 整个图表更改数据

  * 如果所有的图表序列共享一份数据源，即数组内部是多个对象，则

  ```js
  chart.changeData([obj1,obj2...objn]);

  ```

  * 如果每个图表序列有单独的数据源，则：


  ```js
  chart.changeData([data1,data2...datan]);//data1 = [xx,xx,xx]...datan=[]

  ```

#### 单个图表序列更改数据

  * 图表序列更改数据，暂时不重绘

  ```js

    series1.changeData(data1);
    series2.changeData(data2);

    chart.repaint();

  ```

  * 图表序列更改数据的同时，重绘图表

  ```js

    series1.changeData(data1,true);

  ```




