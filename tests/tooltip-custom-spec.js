var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

  var Chart = require('../src/chart'),
    Util = require('../src/util');

  $('<div id="t3"></div>').prependTo('body');


describe('测试自定义 Tooltip',function(){

  var chart = new Chart({
    width : 1000,
    height : 500,
    id : 't3',
    plotCfg : {
      margin : [50,50,50]
    },
    title : {
      text : 'Monthly Average Temperature'
    },
    subTitle : {
      text : 'Source: WorldClimate.com'
    },
    xAxis : {
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      
    },
    yAxis : {
      title : {
        text : 'xxxxx'
      }
    },  
    tooltip : {
      valueSuffix : '°C',
      custom : true,
      shared : true,
      html : '<div style="position:absolute;visibility:hidden;" class="tooltip"><h3 class="title"></h3><ul class="list"></ul></div>',
      crosshairs : true
    },
    legend : {
      align : 'right',
      layout : 'vertical',
      dy : -150,
      dx : -60
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

  chart.on('tooltipchange',function(ev){
    var node = $(ev.dom),
      title = ev.title,
      items = ev.items,
      listEl = node.find('.list');
    listEl.empty();
    node.find('.title').html(title);
    $.each(items,function(index,item){
      var str = Util.substitute('<li style="color:{color}">{name} : {value}</li>',item);
      $(str).appendTo(listEl);
    });
    
  });

  var tooltip = chart.get('seriesGroup').get('tipGroup'),
    customDiv = tooltip.get('customDiv')

  describe('自定义tooltip',function(){

    it('tooltip生成',function(){
      expect(customDiv).not.to.be(undefined);
      expect(customDiv.style.visibility).to.be('hidden');
    });

    it('测试cross线生成',function(){
      var line = tooltip.get('crossShape');
      expect(line).not.to.be(undefined);
    });


    it('show',function(){
      tooltip.show();
      expect(customDiv.style.visibility).to.be('visible');
    });

  });

  function getX(){
    var line = tooltip.get('crossShape'),
      transform = line.attr('transform');
    return transform[0][1];
  }

  describe('移动',function(){

    it('设置items',function(){
      tooltip.setTitle('test');
      tooltip.setItems([{name : 'test',value:122,color : 'red'}]);
      expect($(customDiv).find('.title').text()).to.be('test');
      expect($(customDiv).find('.list').children().length).to.be(1);
    });

    it('修改items',function(){

    });

    it('移动',function(){

    });

  });
});