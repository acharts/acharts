var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
    Series = require('../src/chart/series/line'),
    Flag = require('../src/chart/series/flag'),
    NAxis = require('../src/chart/axis/number'),
    CAxis = require('../src/chart/axis/category');

$('<div id="l1"></div>').prependTo('body');
$('<div id="l2"></div>').prependTo('body');

describe('测试序列生成',function(){

    describe('测试一般flag的生成',function(){
        var canvas = new Canvas({
            id : 'l1',
            width : 900,
            height : 500
        });

        var plotRange = {
                start : {x : 50,y : 400},
                end : {x : 850, y : 50}
            },
            xAxis = canvas.addGroup(CAxis,{
                plotRange : plotRange,
                categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                labels : {
                    label : {
                        y : 12
                    }
                }
            });

        var yAxis = canvas.addGroup(NAxis,{
            plotRange : plotRange,
            line : null,
            tickLine : null,
            grid : {
                line : {
                    stroke : '#c0c0c0'
                }
            },
            title : {
                text : 'xsxxxxx',
                font : '16px bold',
                fill : 'blue',
                rotate : 90,
                x : -30
            },
            min : -5,
            max : 30,
            position:'left',
            tickInterval : 5,
            labels : {
                label : {
                    x : -12
                }
            }
        });

        canvas.sort();

        var line = canvas.addGroup(Series,{
            xAxis : xAxis,
            yAxis : yAxis,
            color : '#2f7ed8',
            line : {
                'stroke-width': 2,
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round'
            },
            lineActived : {
                'stroke-width': 3
            },
            markers : {
                marker : {

                    symbol : 'circle',
                    radius : 4
                },
                actived : {
                    radius : 6,
                    stroke: '#fff'
                }
            },
            id: 's1',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        });

        var series = canvas.addGroup(Flag,{
            xAxis : xAxis,
            yAxis : yAxis,
            line: {
                'enabled': true,
                'stroke': '#000000',
                'stroke-width': 1
            },
            flag: {
                'fill' : '#ffffff',
                'stroke': '#000000',
                'stroke-width': 1,
                'r': 5
            },
            custom: false,
            distance: -5,
            data:[{
                x : '一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>',
            },{
                x : '一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>'
            },{
                x : '十一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>'
            }],
            type: 'flag',
            onSeries: 's1'
        });

        it('测试flag的生成',function(){
            expect(series.get('node')).not.to.be(undefined);
            expect(series.get('children').length).to.be(6);
        });

        it('测试鼠标事件',function(){

            series.on('click',function(ev){
                series.fireUp('flagclick',ev);
            });
            series.on('mouseover',function(ev){
                series.fireUp('flagmouseover',ev);
            });
            series.on('mouseout',function(ev){
                series.fireUp('flagmouseout',ev);
            });

        });

        describe('测试操作',function(){

            it('隐藏',function(){
                series.hide();
                expect(series.get('node').style.display).to.be('none');
            });

            it('显示',function(){
                series.show();
                expect(series.get('node').style.display).not.to.be('none');
            });
        });
    })

    describe('测试自定义flag的生成',function(){
        var canvas = new Canvas({
            id : 'l2',
            width : 900,
            height : 500
        });
        var plotRange = {
                start : {x : 50,y : 400},
                end : {x : 850, y : 50}
            },
            xAxis = canvas.addGroup(CAxis,{
                plotRange : plotRange,
                categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                labels : {
                    label : {
                        y : 12
                    }
                }
            });

        var yAxis = canvas.addGroup(NAxis,{
            plotRange : plotRange,
            line : null,
            tickLine : null,
            grid : {
                line : {
                    stroke : '#c0c0c0'
                }
            },
            title : {
                text : 'xsxxxxx',
                font : '16px bold',
                fill : 'blue',
                rotate : 90,
                x : -30
            },
            min : -5,
            max : 30,
            position:'left',
            tickInterval : 5,
            labels : {
                label : {
                    x : -12
                }
            }
        });

        canvas.sort();

        var series1 = canvas.addGroup(Flag,{
            xAxis : xAxis,
            yAxis : yAxis,
            line: {
                'enabled': true,
                'stroke': '#000000',
                'stroke-width': 1
            },
            flag: {
                'fill' : '#ffffff',
                'stroke': '#000000',
                'stroke-width': 1,
                'r': 5
            },
            custom: true,
            distance: -5,
            data:[{
                x : '一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>'
            },{
                x : '一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>'
            },{
                x : '十一月',
                title : '<span><img width="20" height="22" src="https://voc.alipay.com/css/image/5.png" /></span>'
            }],
            type: 'flag',
            onSeries: 's1'
        });

        it('测试flag的生成',function(){
            expect($(series1.get('canvas').get('node').parentNode).find('.ac-flags').children().length).to.be(3);
        });

        it('测试鼠标事件',function(){
            var acFlag = $(series1.get('canvas').get('node').parentNode).find('.ac-flags');
            acFlag.on('click',function(ev){
                series1.fireUp('flagclick',ev);
            });
            acFlag.on('mouseover',function(ev){
                series1.fireUp('flagmouseover',ev);
            });
            acFlag.on('mouseout',function(ev){
                series1.fireUp('flagmouseout',ev);
            });
        });

        describe('测试操作',function(){

            it('隐藏',function(){
                series1.hide();
                expect($(series1.get('canvas').get('node').parentNode).find('.ac-flags').get(0).style.display).to.be('none');
            });

            it('显示',function(){
                series1.show();
                expect($(series1.get('canvas').get('node').parentNode).find('.ac-flags').get(0).style.display).not.to.be('none');
            });

        });
    })

});
