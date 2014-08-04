var  expect = require('expect.js'),
    sinon = require('sinon'),
    Labels = require('../src/chart/labels'),
    $ = require('jquery'),
    Canvas = require('../src/graphic/canvas');

$('<div id="s2"></div>').appendTo('body');

/**/
describe('test labels',function () {

  var canvas = new Canvas({
    id : 's2',
    width : 500,
    height : 500
  });

  var labels = canvas.addGroup(Labels,{
    items : [
      {x : 10,y : 20,text : "1"},
      {x : 10,y : 40,text : "2"},
      {x : 10,y : 60,text : "3"},
      {x : 10,y : 80,text : "4"},
      {x : 10,y : 100,text : "5",font : "10px Arial",stroke : "red"},
      {x : 10,y : 120,text : "6"},
      {x : 10,y : 140,text : "7"},
      {x : 10,y : 160,text : "8"}
    ],
    label : {
      font : '20px/1.5 "Helvetica Neue",Helvetica,Arial,sans-serif',
      stroke : '#333',
      x : 10,
      y : 10,
      rotate : 90
    },
    renderer : function(value,item,index){
      if(index % 2 == 0){
        item.rotate = 45;
      }
      return value;
    }
  });



  it('labels create',function(){
    expect(labels.getCount()).to.be(labels.get('items').length);
  });

  it('labels x,y',function(){
    var item = labels.getFirst();
    expect(item.attr('x')).to.be(20);
    expect(item.attr('y')).to.be(30);
  });

  it('labels rotate',function(){
    var item = labels.getLast(),
      transform = item.attr('transform');

    expect(transform[0][1]).to.be(90);
  });

  it('custom cfg',function(){
    var item = labels.getChildAt(4);
    expect(item.attr('stroke')).to.be('red');
  });

  it('labels change',function(){
    var items = [{x : 10,y : 20,text : "一"},
          {x : 10,y : 40,text : "二"},
          {x : 10,y : 60,text : "三"},
          {x : 10,y : 80,text : "四"},
          {x : 10,y : 100,text : "五",font : "10px Arial",stroke : "red"},
          {x : 10,y : 120,text : "六"},
          {x : 10,y : 140,text : "七"}];

    labels.setItems(items);

    expect(labels.getCount()).to.be(7);

  });

  it('change label',function(){
    var label = labels.getFirst();
    labels.changeLabel(label,{x : 100,y : 20,text : "变化"});
    expect(label.attr('x')).to.be(110);
  });

  xit('移除',function(done){
      setTimeout(function(){
        $('#s2').remove();
        done();
      },800);
    });
});

describe('test custom labels',function(){
  var canvas = new Canvas({
    id : 's2',
    width : 500,
    height : 500
  });

  var labels = canvas.addGroup(Labels,{
    items : [
      {x : 10,y : 20,text : "1",'text-anchor' : 'start'},
      {x : 10,y : 40,text : "2"},
      {x : 10,y : 60,text : "3"},
      {x : 10,y : 80,text : "4"},
      {x : 10,y : 100,text : "5"},
      {x : 10,y : 120,text : "6"},
      {x : 10,y : 140,text : "7"},
      {x : 10,y : 160,text : "8"}
    ],
    custom : true,
    label : {
      x : 10,
      y : 10,
      custom : true
    },
    renderer : function(value){
      return '<span>' + value + '</span>'
    }
  });

  var customDiv = labels.get('customDiv');

  it('labels create',function(){
    expect(customDiv).not.to.be(undefined);
    expect(customDiv.childNodes.length).to.be(labels.get('items').length);
  });

  it('labels x,y',function(){
    var item = customDiv.childNodes[0];
    expect(parseFloat(item.style.left)).to.be(20);

    var second = customDiv.childNodes[1];
    expect(parseFloat(second.style.left)).not.to.be(40);

  });

  it('custom renderer',function(){
    var item = customDiv.childNodes[0];
    expect(item.innerHTML).to.be('<span>1</span>');
  });

  it('labels change',function(){
    var items = [{x : 10,y : 20,text : "一"},
          {x : 10,y : 40,text : "二"},
          {x : 10,y : 60,text : "三"},
          {x : 10,y : 80,text : "四"},
          {x : 10,y : 100,text : "五",font : "10px Arial",stroke : "red"},
          {x : 10,y : 120,text : "六"},
          {x : 10,y : 140,text : "七"}];

    labels.setItems(items);

    expect(customDiv.childNodes.length).to.be(7);

  });

   it('change label',function(){
    var label = customDiv.childNodes[0];
    labels.changeLabel(label,{x : 100,y : 20,text : "变化"});

    expect(label.innerHTML).to.be('<span>变化</span>');
    //expect(label.attr('x')).to.be(110);
  });

});