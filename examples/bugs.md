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
        var stock = new Achart({
              id : 'c1',
              forceFit : true, //自适应宽度
              height : 400,
              plotCfg : {
                  margin : [30,50,30,50] //画板的边距
              },
              legend : {
                  dy : -130, //跟绘图区域的偏移y
                  dx : -10,
                  align : 'right',//top,left,right,bottom(默认)
                  layout : 'vertical',//默认 horizontal
                  back : { //背景的配置信息，等同于shape的attrs
                    fill : '#fff',
                    'fill-opacity': 0.5,
                    stroke : null
                  },
                  spacingX : 10
                },
              xAxis : {//格式化时间
                  labels : {
                    label : {
                      'font-size': '8'
                    }
                  },
                  type : 'time' ,
                  formatter : function(value)   {
                      return Chart.Date.format(new Date(value),'yyyy-mm-dd');
                  },
                  animate : false
              },
              yAxis : {
                  animate : false
              },
              seriesOptions : { 
                  areaCfg : { 
                      smooth : true
                  }
              },
              rangeSelectorOption: {
              selectAreaCfg: {
                fill: '#ccc',
                'fill-opacity': .4,
                  stroke: '#bbbbbb'
              }
              },
              xTickCounts : [1,8],//设置x轴tick最小数目和最大数目 
              tooltip : {
                  valueSuffix : '',
                  shared : true, //是否多个数据序列共同显示信息
                  crosshairs : true //是否出现基准线
              },
              series : [{
                    name : 'uv',
                    data :[1507373,1614452,1504101,1384340,1373193,1447516,1445095],
                    pointInterval: 86400000,
                    pointStart: 1419436800000
                  }]
          });
          stock.render();
});
````

