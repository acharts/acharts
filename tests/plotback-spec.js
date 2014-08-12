var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
  PlotBack = require('../src/chart/plotback');




describe('plotback rect',function () {

  $('<div id="pb1"></div>').appendTo('body');

  var canvas = new Canvas({
    id : 'pb1',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(PlotBack,{
    margin : 30,
    border : {
      stroke : '#ededed'
    },
    background : {
      fill : '#eee',
      border : '#fff'
    }
  });

  var plotRange = back.get('plotRange');

  it('plotrange',function(){
    expect(plotRange).not.to.be(undefined);
  }); 

  it('margin',function(){
    expect(plotRange.tl.x).to.be(30);

    expect(plotRange.tl.y).to.be(30);

    expect(plotRange.br.x).to.be(470);

    expect(plotRange.br.y).to.be(470);
  });

  it('border',function(){
    var rect = back.get('borderShape');

    expect(rect).not.to.be(undefined);

    expect(rect.attr('x')).to.be(0);
    expect(rect.attr('y')).to.be(0);
    expect(rect.attr('width')).to.be(canvas.get('width'));
  });

  it('background',function(){
    var backShape = back.get('backShape');

    expect(backShape.attr('x')).to.be(30);
    expect(backShape.attr('y')).to.be(30);
    expect(backShape.attr('width')).to.be(canvas.get('width') - 30 * 2);
  });

  it('change margin',function(done){
    setTimeout(function(){
      back.set('margin',[20,40]);
      back.repaint();
      expect(plotRange.tl.x).to.be(40);

      expect(plotRange.tl.y).to.be(20);

      expect(plotRange.br.x).to.be(460);

      expect(plotRange.br.y).to.be(480);
      done();
    },500);
    
  });

  it('change canvas width,height',function(done){

    setTimeout(function(){
      canvas.setSize(300,300);
      back.repaint();
      expect(plotRange.tl.x).to.be(40);

      expect(plotRange.tl.y).to.be(20);

      expect(plotRange.br.x).to.be(260);

      expect(plotRange.br.y).to.be(280);
      done();
    },500);
    
  });/**/

});

describe('plotback image',function () {

  $('<div id="pb2"></div>').appendTo('body');

  var canvas = new Canvas({
    id : 'pb2',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(PlotBack,{
    margin : 30,
    border : {
      stroke : '#ededed'
    },
    background : {
      image : "http://builive.com/assets/img/java.png"
    }
  });

  var plotRange = back.get('plotRange');
  it('image',function(){
    var backShape = back.get('backShape');

    expect(backShape.attr('x')).to.be(30);
    expect(backShape.attr('y')).to.be(30);
    expect(backShape.attr('width')).to.be(canvas.get('width') - 30 * 2);
    expect(backShape.attr('src')).not.to.be(undefined);

  });

  it('change',function(done){
     setTimeout(function(){
      canvas.setSize(300,300);
      back.repaint();
      expect(plotRange.tl.x).to.be(30);

      expect(plotRange.tl.y).to.be(30);

      expect(plotRange.br.x).to.be(270);

      expect(plotRange.br.y).to.be(270);
      done();
    },500);
  });
});