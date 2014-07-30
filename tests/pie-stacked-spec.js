var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Util = require('../src/util'),
  Chart = require('../src/chart');

$('<div id="p3"></div>').prependTo('body');

describe('环形图', function() {
  var chart = new Chart({
    id : 'p3',
    width : 1000,
    height : 500,
    plotCfg : {
      margin : [50,50,100]
    },
    title : {
      text : '饼图'
    },
    tooltip : {
      shared : true
    },
    seriesOptions : {
        pieCfg : {
          allowPointSelect : false,
          labels : null
        }
    },
    series: [{
        type: 'pie',
        radius : 100,
        innerRadius : 80,
        name: 'outter',
        data: [
          {name : 'outter',   y : 60},
          {name : '',y : 40,attrs : {fill : '#fff'},placeHolder : true}
        ]
    },
    {
        type: 'pie',
        name: 'middle',
        radius : 80,
        innerRadius : 60,
        data: [
          {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}},
          {name : '',y : 70,attrs : {fill : '#fff'},placeHolder : true}
        ]
    },
    {
        type: 'pie',
        name: 'inner',
        radius : 60,
        innerRadius : 40,
        data: [
          {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}},
          {name : '',y : 50,attrs : {fill : '#fff'},placeHolder : true}
        ]
    }]
  });

  chart.render();

});


describe('逆向环形图', function() {
  var chart = new Chart({
    id : 'p3',
    width : 300,
    height : 300,
    plotCfg : {
      margin : [0]
    },
    title : {
      text : '饼图'
    },
    tooltip : {
      shared : true
    },
    seriesOptions : {
        pieCfg : {
          allowPointSelect : false,
          labels : null
        }
    },
    legend : {
      align : 'right',//top,left,right,bottom(默认)
      layout : 'vertical',//默认 horizontal
      dy : -100,
      dx : -100,
      back : null
    },
    tooltip : null,
    series: [{
        type: 'pie',
        radius : 100,
        innerRadius : 80,
        name: 'outter',
        color : 'rgb(169, 208, 82)',
        data: [
          {name : '',y : 40,attrs : {fill : '#fff'},placeHolder : true},
          {name : 'outter',   y : 60,attrs : {fill : 'rgb(169, 208, 82)'}}
        ]
    },
    {
        type: 'pie',
        name: 'middle',
        radius : 80,
        innerRadius : 60,
        color: 'rgb(85, 194, 187)',
        data: [
          
          {name : '',y : 70,attrs : {fill : '#fff'},placeHolder : true},
          {name : 'middle',   y : 30,attrs : {fill : 'rgb(85, 194, 187)'}}
        ]
    },
    {
        type: 'pie',
        name: 'inner',
        radius : 60,
        color : 'rgb(161, 45, 45)',
        innerRadius : 40,
        data: [
          
          {name : '',y : 50,attrs : {fill : '#fff'},placeHolder : true},
          {name : 'inner',   y : 50,attrs : {fill : 'rgb(161, 45, 45)'}}
        ]
    }]
  });

  chart.render();

});