# 事件汇总

---

图表元素的事件汇总

---

## 简介
除了默认的DOM事件 click,mousedown,mouseup,mouseover,mouseout等事件外，图表的很多步骤需要开放出事件，下面是自定义事件的列表，不断补充此列表

## 自定义事件列表

### 图表事件

### Axis事件

* beforechange
* afterchange
* beforepaint
* afterpaint

### Seires事件

#### 通用事件

 * click,mousedown,mouseup,mouseover,mouseout等DOM事件
 * beforepaint
 * afterpaint
 * datachange

#### pie

 * itemactived
 * itemunactived
 * itemselected
 * itemunselected

#### column

 * itemactived
 * itemunactived
 * itemselected
 * itemunselected

### Legends事件

 * itemover
 * itemout
 * itemclick
 * itemchecked
 * itemunchecked

### Markers 事件

 * markerclick
 * itemactived
 * itemunactived

### Flags

 * flagclick

### Tooltip 事件

### 动画事件（每个具体的事件）