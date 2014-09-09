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
            onSeries: 's1' //定义flag坐落的series,不存在则坐落在x轴上面
        }]
    });
 
    chart.render();
 
    //绑定点击事件
    chart.on('flagclick',function(ev){
        console.log('click');
    });
    //绑定hover事件
    chart.on('flagmouseover',function(ev){
        console.log('over');
    });
    chart.on('flagmouseout',function(ev){
        console.log('out');
    });
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
            line: {//线的配置
                'stroke': '#cc0000',
                'stroke-width': 1
            },
            flag: {//圈的配置
                'fill' : '#cc0000',
                'stroke': '#cc0000',
                'stroke-width': 1,
                'r': 5
            },
            distance: -15,      //上下偏移的距离
            duration : 1000,    //动画时间
            animate: true,      //是否动画
            custom: false       //是否自定义flag，当此项为true时，line和flag的配置失效
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
 
    //绑定点击事件
    chart.on('flagclick',function(ev){
        console.log('click');
    });
    //绑定hover事件
    chart.on('flagmouseover',function(ev){
        console.log('over');
    });
    chart.on('flagmouseout',function(ev){
        console.log('out');
    });
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
        flagCfg: {
            distance: -7,      //上下偏移的距离
            duration : 1000,   //动画时间
            animate: true,     //是否动画
            custom: true,      //是否自定义flag，当此项为true时，line和flag的配置失效
            html: '<img width="21" height="19" src="https://i.alipayobjects.com/i/ecmng/png/201408/3Ds0U7nGOD_src.png" />' //html模板，默认就是<img width="21" height="19" src="https://i.alipayobjects.com/i/ecmng/png/201408/3Ds0U7nGOD_src.png" />
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
            x : '一月',
            html : '<span><img width="15.5" height="19" src="https://i.alipayobjects.com/i/ecmng/png/201408/3Ds9p7HMph_src.png" /></span>'
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
 
    //绑定点击事件
    chart.on('flagclick',function(ev){
        console.log('click');
    });
    //绑定hover事件
    chart.on('flagmouseover',function(ev){
        console.log('over');
    });
    chart.on('flagmouseout',function(ev){
        console.log('out');
    });

});
````





