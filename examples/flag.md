# Flag

---
````html
<style>
    .ac-tooltip{
        position:absolute;
        visibility:hidden;
        border : 1px solid #efefef;
        background-color: white;
        opacity: .8;
        padding: 10px;
 
        transition: top 200ms,left 200ms;
        -moz-transition:  top 200ms,left 200ms;  /* Firefox 4 */
        -webkit-transition:  top 200ms,left 200ms; /* Safari 和 Chrome */
        -o-transition:  top 200ms,left 200ms;
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
````
## Dynamic Line chart


````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new Chart({
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
            custom : true //自定义tooltip
        },
        seriesOptions: {
        },
        series : [{
            id: 's1',
            type: 'line',
            name: 'Tokyo',
            data: [7.0, 6.9, 19.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            type: 'line',
            name: 'Beijing',
            data: [13.9, 14.2, 15.7, 8.5, 21.9, 25.2, 7.0, 26.6, 24.2, 20.3, 16.6, 14.8]
        },{
            name: 'flag',
            data:[{
                x : '一月'
            },{
                x : '一月'
            },{
                x : '十一月'
            },{
                x : '十二月'
            }],
            animate: true,
            type: 'flag',
            onSeries: 's1' //定义flag坐落的series,不存在则坐落在x轴上面
        }]
    });
 
    chart.render();
});
````

## DCustom style


````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new Chart({
        id : 'c2', //render改成 id
            
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
        custom : true //自定义tooltip
    },
    seriesOptions: {
        flagCfg: {
            flags:{
                flag:{
                    distance: -15,              //上下偏移的距离
                    line: {
                        'stroke': '#000000',
                        'stroke-width': 1
                    },
                    shapeType: 'circle',        //可选circle，rect，image三种，默认rect
                    shapeCfg: {                 //shape的配置项
                        stock: '#ccc',
                        r: 10,
                        width: 22,
                        height: 22
                    },
                    title: 'A',                 //显示的title
                    titleCfg: {                 //title配置项
                        rotate : 90,
                        fill : '#333333',
                        'font-size':13,
                        'font-weight' : 'bold'
                    },
                    text: '这是一个flag',         //tooltip显示

                },
                events: {
                    flagclick: function(ev){
                        console.log(ev);
                    }
                }
            },
            duration : 1000,                //动画时间
            animate: true,                  //是否动画
        }
    },
    series : [{
        id: 's1',
        type: 'line',
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        type: 'line',
        name: 'Beijing',
        data: [13.9, 14.2, 15.7, 18.5, 21.9, 25.2, 27.0, 26.6, 24.2, 20.3, 16.6, 14.8]
    },{
        name: 'flag',
        data:[{
            x : '一月'
        },{
            x : '一月'
        },{
            x : '十一月'
        },{
            x : '十二月'
        }],
        type: 'flag',
        onSeries: 's1' //定义flag坐落的series
    }]
    });
 
    chart.render();
});
````

## DCustom flag


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
    var chart = new Chart({
        id : 'c3', //render改成 id
            
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
        custom : true //自定义tooltip
    },
    seriesOptions: {
    },
    series : [{

        type: 'line',
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
    id: 's1',
        type: 'line',
        name: 'Beijing',
        data: [13.9, 14.2, 15.7, 18.5, 21.9, 25.2, 27.0, 26.6, 24.2, 20.3, 16.6, 14.8]
    },{
        name: 'flag',
        data:[{
            x : '一月',
            flag:{//可以配置在内部
                title:''  ,
                distance: 0,
                shapeType: 'image',
                shapeCfg: {
                    width: 16,
                    height: 20,
                    src: 'https://i.alipayobjects.com/i/ecmng/png/201408/3Ds9p7HMph_src.png'
                }
            },
        },{
            x : '一月',
            flag:{
                title:''  ,
                distance: 0,
                shapeType: 'image',
                shapeCfg: {
                    width: 16,
                    height: 20,
                    src: 'https://i.alipayobjects.com/i/ecmng/png/201408/3Ds9p7HMph_src.png'
                }
            },
        },{
            x : '十一月',
            flag:{
                title:'F',
            },
        },{
            x : '十二月',
            flag:{
                title:'G',
                shapeType: 'circle',        //可选circle，rect，image三种，默认rect
                shapeCfg: {                 //shape的配置项
                    stock: '#ccc',
                    r: 10,
                    width: 22,
                    height: 22
                },
            },
        }],
        type: 'flag',
        onSeries: 's1' //定义flag坐落的series
    }]
    });
 
    chart.render();

});
````





