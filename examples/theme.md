# Theme

---


## Default


````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

    var Theme = AChart.Theme;
 
    //AChart有一个默认的皮肤 Theme.Base
    Theme.Base = {
        "plotCfg": {
            "margin": [
                50,
                50,
                100
            ]
        },
        "title": {
            "font-size": "16px",
            "font-family": "SimSun,Georgia, Times, serif",
            "fill": "#274b6d"
        },
        "subTitle": {
            "font-size": 14,
            "font-family": "tahoma,arial,SimSun,Georgia, Times, serif",
            "fill": "#4d759e"
        },
        "xAxis": {
            "labels": {
                "label": {
                    "y": 12
                }
            }
        },
        "yAxis": {
            "line": null,
            "tickLine": null,
            "grid": {
                "line": {
                    "stroke": "#c0c0c0"
                }
            },
            "title": {
                "text": "",
                "rotate": -90,
                "x": -30
            },
            "position": "left",
            "labels": {
                "label": {
                    "x": -12
                }
            }
        },
        "legend": {
            "dy": 30
        },
        "seriesOptions": {
            "lineCfg": {
                "duration": 1000,
                "line": {
                    "stroke-width": 2,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round"
                },
                "lineActived": {
                    "stroke-width": 3
                },
                "markers": {
                    "marker": {
                        "radius": 3
                    },
                    "actived": {
                        "radius": 6,
                        "stroke": "#fff"
                    }
                },
                "animate": true
            },
            "areaCfg": {
                "line": {
                    "stroke-width": 0.5,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round"
                },
                "lineActived": {
                    "stroke-width": 1
                },
                "markers": {
                    "marker": {
                        "radius": 3
                    },
                    "actived": {
                        "radius": 6,
                        "stroke": "#fff"
                    }
                }
            },
            "flagCfg": {
                "line": {
                    "stroke": "#000000",
                    "stroke-width": 1
                },
                "flag": {
                    "fill": "#ffffff",
                    "stroke": "#000000",
                    "stroke-width": 1,
                    "r": 5
                },
                "distance": -5,
                "duration": 1000,
                "animate": true,
                "custom": false,
                "onSeries": "xaxis"
            },
            "bubbleCfg": {
                "circle": {
                    "stroke-width": 1,
                    "fill-opacity": 0.5
                },
                "activeCircle": {
                    "stroke-width": 2
                }
            },
            "pieCfg": {
                "colors": [
                    "#5e90c9",
                    "#1c2d3f",
                    "#a9d052",
                    "#a12d2d",
                    "#43bbb4",
                    "#5a2a94",
                    "#fabe3c",
                    "#2279dc",
                    "#e360e5",
                    "#48000c"
                ],
                "item": {
                    "stroke": "#fff"
                },
                "labels": {
                    "distance": 30,
                    "label": {}
                }
            }
        },
        "tooltip": {
            "x": -999,
            "y": -999
        },
        "colors": [
            "#5e90c9",
            "#1c2d3f",
            "#a9d052",
            "#a12d2d",
            "#43bbb4",
            "#5a2a94",
            "#fabe3c",
            "#2279dc",
            "#e360e5",
            "#48000c"
        ],
        "symbols": [
            "circle",
            "diamond",
            "square",
            "triangle",
            "triangle-down"
        ]
    };
    var chart = new AChart({
        id : 'c1',
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

## Change color

````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
  
 
    var Theme = AChart.Theme;
 
    //重写一个theme对象 颜色不同于默认皮肤
    Theme.color = {
        "plotCfg": {
            "margin": [
                50,
                50,
                100
            ]
        },
        "title": {
            "font-size": "16px",
            "font-family": "SimSun,Georgia, Times, serif",
            "fill": "#274b6d"
        },
        "subTitle": {
            "font-size": 14,
            "font-family": "tahoma,arial,SimSun,Georgia, Times, serif",
            "fill": "#4d759e"
        },
        "xAxis": {
            "labels": {
                "label": {
                    "y": 12
                }
            }
        },
        "yAxis": {
            "line": null,
            "tickLine": null,
            "grid": {
                "line": {
                    "stroke": "#c0c0c0"
                }
            },
            "title": {
                "text": "",
                "rotate": -90,
                "x": -30
            },
            "position": "left",
            "labels": {
                "label": {
                    "x": -12
                }
            }
        },
        "legend": {
            "dy": 30
        },
        "seriesOptions": {
            "lineCfg": {
                "duration": 1000,
                "line": {
                    "stroke-width": 2,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round"
                },
                "lineActived": {
                    "stroke-width": 3
                },
                "markers": {
                    "marker": {
                        "radius": 3
                    },
                    "actived": {
                        "radius": 6,
                        "stroke": "#fff"
                    }
                },
                "animate": true
            },
            "areaCfg": {
                "line": {
                    "stroke-width": 0.5,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round"
                },
                "lineActived": {
                    "stroke-width": 1
                },
                "markers": {
                    "marker": {
                        "radius": 3
                    },
                    "actived": {
                        "radius": 6,
                        "stroke": "#fff"
                    }
                }
            },
            "flagCfg": {
                "line": {
                    "stroke": "#000000",
                    "stroke-width": 1
                },
                "flag": {
                    "fill": "#ffffff",
                    "stroke": "#000000",
                    "stroke-width": 1,
                    "r": 5
                },
                "distance": -5,
                "duration": 1000,
                "animate": true,
                "custom": false,
                "onSeries": "xaxis"
            },
            "bubbleCfg": {
                "circle": {
                    "stroke-width": 1,
                    "fill-opacity": 0.5
                },
                "activeCircle": {
                    "stroke-width": 2
                }
            },
            "pieCfg": {
                "colors" : [
                    '#1ABC9C',
                    '#2ECC71',
                    '#3498DB',
                    '#E74C3C',
                    '#F1C40F',
                    '#E67E22',
                    '#9B59B6',
                    '#34495E',
                    '#95A5A6'
                ],
                "item": {
                    "stroke": "#fff"
                },
                "labels": {
                    "distance": 30,
                    "label": {}
                }
            }
        },
        "tooltip": {
            "x": -999,
            "y": -999
        },
        "colors" : [
            '#1ABC9C',
            '#2ECC71',
            '#3498DB',
            '#E74C3C',
            '#F1C40F',
            '#E67E22',
            '#9B59B6',
            '#34495E',
            '#95A5A6'
        ],
        "symbols": [
            "circle",
            "diamond",
            "square",
            "triangle",
            "triangle-down"
        ]
    };
 
    var chart = new AChart({
        id : 'c2',
        width : 950,
        height : 500,
        theme: AChart.Theme.color,//引用了新定义的皮肤
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

## Expanded skin


````html
<div id="c3"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

    var Theme = AChart.Theme;
 
    //扩展一个皮肤  使用Theme.initTheme方法扩展Theme.Base
    //更改了一下标题的颜色 和 marker的样式
    Theme.extend = Theme.initTheme(Theme.Base,{
        "title": {
            "fill": "#00cccc"
        },
        "subTitle": {
            "fill": "#00cccc"
        },
        seriesOptions: {
            lineCfg:{
                animate: false
            }
        },
        "symbols": [
            "circle"
        ]
    });
 
    var chart = new AChart({
        id : 'c3',
        width : 950,
        height : 500,
        theme: AChart.Theme.extend,//引用了新定义的皮肤
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

## Grid


````html
<div id="c4"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

    var Theme = AChart.Theme;
 
    //扩展一个皮肤  使用Theme.initTheme方法扩展Theme.Base
    //base里面已经有y坐标轴栅格，只需添加x轴栅格
    Theme.grid = Theme.initTheme(Theme.Base,{
        xAxis : {
            grid : {
                line : {
                    stroke : '#ddd'
                }
            }
        },
        yAxis: {
            grid: {
                line : {
                    stroke : '#ddd'
                },
                minorCount: 4,//次要线个数
                minorLine:{
                    stroke : '#eee'//次要线配置
                }
            }
        }
    });
 
    var chart = new AChart({
        id : 'c4',
        width : 950,
        height : 500,
        theme: AChart.Theme.grid,//引用了新定义的皮肤
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

## Change background color


````html
<div id="c5"></div>
````

````javascript
seajs.use('acharts', function(Achart) {

    var Theme = AChart.Theme;
 
    //扩展一个皮肤  使用Theme.initTheme方法扩展Theme.Base
    //更改了图形的颜色
    Theme.blue = Theme.initTheme(Theme.Base,{
        //画板背景替换
        plotCfg: {
            border: {
                fill: '#666'
            }
        },
        //标题颜色替换
        "title": {
                "fill": "#fff"
        },
        "subTitle": {
            "fill": "#fff"
        },
        //替换坐标轴字体颜色
        "xAxis": {
            "labels": {
                "label": {
                    stroke: "#fff"
                }
            }
        },
        "yAxis": {
            "labels": {
                "label": {
                    stroke: "#fff"
                }
            },
            title : {
                stroke: "#fff"
            }
        }
 
    });
 
    var chart = new AChart({
        id : 'c5',
        width : 950,
        height : 500,
        theme: AChart.Theme.blue,//引用了新定义的皮肤
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