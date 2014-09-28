# Line

---

## Basic Type


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
});
````

## Curve Graph


````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c2',
          
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
          seriesOptions : { //设置多个序列共同的属性
            lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
              smooth : true
            }
          },
          tooltip : {
            valueSuffix : '°C'/*,
            shared : true, //是否多个数据序列共同显示信息
            crosshairs : true //是否出现基准线
            */
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
            }]
        });
 
        chart.render();
});
````

## Values are not continuous


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c3',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          title : {
            text : '非连续数据'
 
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          yAxis : {
            title : {
              text : '温度',
              rotate : -90
            }
          },
          seriesOptions : { //设置多个序列共同的属性
            lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
 
              smooth : true,
              pointStart : 20,
              pointInterval : 100
            }
          },
          tooltip : {
            valueSuffix : '°C'
          },
          series : [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          },{
              name: 'New York',
              pointInterval : 25,
              data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
                7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
                8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
                7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2]
          }, {
              name: 'London',
              data: [[100,3.9], [250,4.2], [300,5.7], [400,8.5], [520,11.9], [600,15.2], [900,17.0], [1050,16.6], [1100,14.2]]
          }]
 
        });
 
        chart.render();
});
````

## Non uniform y


````html
<div id="c4"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c4',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          title : {
            text : '非均匀坐标轴'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          yAxis : {
            title : {
              text : '金额',
              x : -40,
              rotate : -90
            },
            ticks : [0,20,500,5000,5100]
          },
          seriesOptions : { //设置多个序列共同的属性
            lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
              smooth : true,
              pointStart : 20,
              pointInterval : 100
            }
          },
          tooltip : {
            valueSuffix : '￥'
          },
          series : [{
            name: 'Tokyo',
            data: [10,412,5020,5034,5023,5078,5008,5025,4997,420,18,40]
          }]
 
        });
 
        chart.render();
});
````

## Multi axis Y


````html
<div id="c5"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c5',
          
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,80] //画板的边距
          },
          title : {
            text : '非均匀坐标轴'
          },
          subTitle : {
            text : 'Source: WorldClimate.com'
          },
          yAxis : [{
            position : 'left',
 
            title : {
              text : '金额',
              x : -40,
              rotate : -90
            },
            ticks : [0,20,500,5000,5100]
          },{
            type : 'number',
            position : 'right',
            line : null,
            tickLine : null,
            labels : {
              label : {
                x : 12
              }
            },
            title : {
              text : '右边',
              x : 40,
              rotate : 90
            },
            ticks : [0,5,10,15,20]
          }],
          seriesOptions : { //设置多个序列共同的属性
            lineCfg : { //不同类型的图对应不同的共用属性，lineCfg,areaCfg,columnCfg等，type + Cfg 标示
              smooth : true,
              pointStart : 20,
              pointInterval : 100
            }
          },
          tooltip : {
            valueSuffix : '￥'
          },
          series : [{
            name: 'Tokyo',
            data: [10,412,5020,5034,5023,5078,5008,5025,4997,420,18,40]
          }, {
              name: 'London',
              yAxis : 1, //使用第二个坐标轴，索引为1
              data: [[100,3.9], [250,4.2], [300,5.7], [400,8.5], [520,11.9], [600,15.2], [900,17.0], [1050,16.6], [1100,14.2]]
          }]
 
        });
 
        chart.render();
});
````

## Custom tooltip


````html
<style>
  .ac-tooltip{
    border : 1px solid #efefef;
  }
 
  .ac-tooltip .ac-title{
    margin: 0;
    padding: 5px 0;
  }
 
  .ac-tooltip .ac-list{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ac-tooltip li{
    line-height:  22px;
  }
</style>
<div id="c6"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c6', //render改成 id
          
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
            custom : true, //自定义tooltip,自动生成的dom，自己覆写其中的css
            //html : '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><h4 class="ac-title"></h4><ul class="ac-list"></ul></div>', //默认的模板
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
});
````

## Fixed tooltip


````html
<style>
  .ac-tooltip{
    border-width:  : 0;
    background-color: white;
    opacity: .8;
    padding: 20px;
  }
 
  .ac-tooltip .ac-title{
    margin: 0;
    padding: 5px 0;
  }
 
  .ac-tooltip .ac-list{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ac-tooltip li{
    line-height:  22px;
  }
</style>
<div class="detail-section">
  <h2>点击图表显示提示信息</h2>
  <div class="row">
    <div class="span8">
      <div id="tip" class="ac-tooltip">
        <h3 class="ac-title"></h3>
        <table>
          <thead>
            <tr>
              <td>index</td>
              <td>name</td>
              <td>value</td>
            </tr>
          </thead>
          <tbody class="ac-list"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<div id="c7"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c7', //render改成 id
          
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
            custom : true, //自定义tooltip
            html : '#tip',//自定义tooltip的 模板或者 #id
            customFollow : false, //自定义tooltip不跟随移动
            triggerEvent : 'click', //点击触发显示tip
            formatter : function (item,index) {
              return AChart.Util.substitute('<tr><td>'+index+'</td><td>{name}</td><td style="color:{color}">{value}</td></tr>',item);
            },
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

});
````

## Coordinate transformation


````html
<div id="c8"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  
        var chart = new AChart({
          id : 'c8', //render改成 id
          
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
          invert : true, //坐标轴转置
          xAxis : {   //坐标轴更改位置和文本配置信息
            position : 'left', //x轴居左
            title : {
              text : '温度',
              rotate : -90
            },
            labels : {
              label : {
                'text-anchor' : 'end',
                x : -12,
                y : 0
              }
            },
            categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis : {
            position : 'bottom'
          },
          tooltip : {
            valueSuffix : '°C'
          },
          series : [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          }]
        });
 
        chart.render();
});
````


### auto category

````html

<div id="c9"></div>

````

````javascript
seajs.use('acharts', function(Achart) {

 var chart = new AChart({
          id : 'c9', //render改成 id
          theme : Chart.Theme.Smooth2,
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
            type : 'category'
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
            data: [['一月',-0.2], ['二月',0.8], ['三月',5.7], ['四月',11.3], ['五月',17.0], ['六月',21.5], ['七月',25.2], ['八月',26.5], ['九月',23.3], ['十月',18.3], ['十一月',13.9], ['十二月',9.6]]
          }, {
            name: 'New York',
            data:  [['一月',7.0], ['二月',6.9], ['三月',9.5], ['四月',14.5], ['五月',18.2], ['六月', 22.0], ['七月',24.8], ['八月',24.1], ['九月',20.1], ['十月',14.1], ['十一月',8.6], ['十二月',2.5]]
          }]
        });
 
        chart.render();

  });

````


