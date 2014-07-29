
var $ = require('jquery'),
expect = require('expect.js'),
sinon = require('sinon'),
Canvas = require('../src/graphic/canvas'),
simulate = require('../lib/event'),
Util = require('../src/util');

$('<div id="s1"></div>').appendTo('body');

var canvas = new Canvas({
  id : 's1',
  width : 500,
  height : 500
});

var el = canvas.get('el'),
  node = canvas.get('node'),
  nodeEl = $(node);

nodeEl.css('background','#efefef');


describe('测试画板生成',function(){

  it('测试生成dom',function(){
    expect(el).not.to.be(undefined);
    expect(node).not.to.be(undefined);
  });
  it('测试默认属性',function(){
    expect(nodeEl.width()).to.be(canvas.get('width'));
    expect(nodeEl.height()).to.be(canvas.get('height'));
  });

  it('test getPoint',function(){
    var offset = Util.getOffset(node),
      point = canvas.getPoint(offset.left + 200,offset.top + 200);

    expect(point.x).to.be(200);

    expect(point.y).to.be(200);
  });


});


describe('测试画板操作',function(){

  it('更改宽度,高度',function(){
    expect(nodeEl.width()).to.be(500);
    canvas.setSize(300,300);
    expect(nodeEl.width()).to.be(300);
  });
  
  it('更改viewbox',function(){
    canvas.setViewBox(0,0,600,600);
    expect(canvas.get('viewbox').width).to.be(600);
  });

  it('test getPoint',function(){
    var offset = Util.getOffset(node),
      point = canvas.getPoint(offset.left + 200,offset.top + 200);

    expect(point.x).to.be(400);

    expect(point.y).to.be(400);
  });
  
  it('test relative x',function(){
    var point = canvas.getRelativePoint(200,200);
    expect(point.x).to.be(400);
  });

  it('更改viewbox',function(){
    canvas.setSize(600,600);

    expect(canvas.get('viewbox').width).to.be(600);
  });
});

describe('测试生成图形',function(){

  it('画圆',function(){
    var circle = canvas.addShape('circle',{
      cx : 100,
      cy : 100,
      r : 20,
      fill : 'red'
    });
    var nEl = $(circle.get('node'));
    expect(circle.get('el')).not.to.be(undefined);
    expect(circle.get('node')).not.to.be(undefined);
    if(Util.svg){
      expect(nEl.attr('cx')).to.be(circle.attr('cx').toString());
    }
    
  });
  it('画线',function(){
    var line = canvas.addShape('line',{
      x1 : 10,
      y1 : 10,
      x2 : 50,
      y2 : 50,
      stroke : 'red',
      'arrow-end' : 'classic'
    });

    var nEl = $(line.get('node'));
    expect(line.get('el')).not.to.be(undefined);
    expect(line.get('node')).not.to.be(undefined);
    if(Raphael.svg){
      expect(line.attr('x1')).to.be(10);
      expect(line.attr('x2')).to.be(50);
    }
    
    expect(line.attr('stroke')).to.be('red');
  });

  it('矩形',function(){
    var rect = canvas.addShape('rect',{
      x : 20,
      y : 20,
      width : 30,
      height : 20,
      stroke : 'blue'
    });
    var nEl = $(rect.get('node'));
    expect(rect.get('el')).not.to.be(undefined);
    expect(rect.get('node')).not.to.be(undefined);
    expect(rect.getPath().length).to.be(5);
  });
 it('多边形',function(){

    var polygon = canvas.addShape('polygon',{
      points : ['0,0','60,0','0,60']
    });

    var nEl = $(polygon.get('node'));
    expect(polygon.get('el')).not.to.be(undefined);
    expect(polygon.get('node')).not.to.be(undefined);

  });
  it('椭圆',function(){
    var ellipse = canvas.addShape('ellipse',{
      cx : 100,
      cy : 100,
      rx : 20,
      ry : 50
    });

    var nEl = $(ellipse.get('node'));
    expect(ellipse.get('el')).not.to.be(undefined);
    expect(ellipse.get('node')).not.to.be(undefined);
    expect(ellipse.attr('ry')).to.be(50);
    ellipse.attr('ry',60);
    expect(ellipse.attr('ry')).to.be(60);
  });
  it('path',function(){
    var str = 'M0 120 L0 50';
    var path = canvas.addShape('path',{
      path : 'M0 120 L0 50'
    });

    var nEl = $(path.get('node'));
    expect(path.get('el')).not.to.be(undefined);
    expect(path.get('node')).not.to.be(undefined);
    if(Raphael.svg){
      expect(path.getTotalLength()).to.be(70);
    }
    
    expect(Util.parsePathArray(path.getPath())).to.be(str);
  });

  it('文本',function(){
    var text = canvas.addShape('text',{
      x : 100,
      y : 10,
      text : '你好么\n我很好'
    });
    var nEl = $(text.get('node'));
    expect(text.get('el')).not.to.be(undefined);
    expect(text.get('node')).not.to.be(undefined);

    if(Raphael.svg){
      expect(nEl.children().length).to.be(2);
    }else{

    }
  });

  it('label',function(){
    var text = canvas.addShape('label',{
      x : 100,
      y : 30,
      rotate : -45,
      text : '你好么\n我很好'
    });

    var nEl = $(text.get('node'));
    expect(text.get('el')).not.to.be(undefined);
    expect(text.get('node')).not.to.be(undefined);

    
      var ts = text.attr('transform');
      expect(ts[0][0]).to.be('r');
      expect(ts[0][1]).to.be(-45);
      expect(ts[0][2]).to.be(100);
    

  });

  it('图片',function(){
    var image = canvas.addShape('image',{
      x : 100,
      y : 100,
      width: 200,
      height: 100,
      src : 'http://gtms01.alicdn.com/tps/i1/T1oM_QFb8iXXcKT9UI-120-160.jpg_120x160q90.jpg'
    });
    var nEl = $(image.get('node'));
    expect(image.get('el')).not.to.be(undefined);
    expect(image.get('node')).not.to.be(undefined);

  });



  it('查找',function(){
    var path = canvas.addShape({
      id : 'p1',
      type:'path',
      attrs :{
        path : 'M 50 0 L50,50 0,50 z',
        fill : 'blue'
      }
    });
    //path.attr('id','p1');
    expect(path.get('id')).to.be('p1');
     expect(canvas.find('p1')).to.be(path);

  });

  it('path动画',function(){
    var path = canvas.addShape({
      type:'path',
      attrs :{
        path : 'M 25 208.31428571428572 L 35 208.31428571428572 L 105 209.22 L 175 185.67142857142858 L 245 140.3857142857143 L 315 106.87428571428572 L 385 76.9857142857143 L 455 43.47428571428571 L 525 31.69999999999999 L 595 60.68285714285713 L 665 105.96857142857144 L 735 145.82000000000002 L 805 184.7657142857143 L 815 184.7657142857143',
        stroke : 'blue'
      }
    });

    path.animate({path : 'M 25 279.86571428571426 L 35 279.86571428571426 L 105 266.28 L 175 240.01428571428573 L 245 195.6342857142857 L 315 149.44285714285715 L 385 117.74285714285713 L 455 103.25142857142856 L 525 109.5914285714286 L 595 142.19714285714286 L 665 190.2 L 735 236.39142857142858 L 805 262.65714285714284 L 815 262.65714285714284'},2000);
  });

  it('测试平移',function(done){

    var path = canvas.find('p1');
    expect(path).not.to.be(null);

    expect(Util.isPointInsidePath(path.getPath(),25,30)).to.be(true);
    path.translate(50,50);

    setTimeout(function(){
      expect(Util.isPointInsidePath(path.getTransformPath(),25,30)).to.be(false);
      expect(Util.isPointInsidePath(path.getTransformPath(),75,80)).to.be(true);
      done();
    }, 200)
    
  });

  it('旋转',function(){
    var path = canvas.find('p1');
    expect(Util.isPointInsidePath(path.getTransformPath(),60,75)).to.be(false);
    path.rotate(90);
    expect(Util.isPointInsidePath(path.getPath(),25,30)).to.be(true);
    expect(Util.isPointInsidePath(path.getTransformPath(),25,30)).to.be(false);
    expect(Util.isPointInsidePath(path.getTransformPath(),75,80)).to.be(true);
    expect(Util.isPointInsidePath(path.getTransformPath(),60,75)).to.be(true);
  });

  it('放大',function(){
    var path = canvas.find('p1');
    var length = path.getTotalLength();
    path.scale(2,2);
  });

  it('翻转',function(){

  });

  it('删除图形',function(){
    var path = canvas.find('p1');
    path.remove();
    expect(canvas.find('p1')).to.be(null);
  });
  
 /**/ it('清除所有',function(done){
    setTimeout(function(){
      canvas.clear();
      expect(canvas.get('children').length).to.be(0);
      done();
    }, 500)
    
  });
});

/**/

describe('测试maker',function(){

  it('测试circle',function(){
    var circle = canvas.addShape('marker',{
      x : 400,
      y : 100,
      fill: 'blue',
      radius : 10,
      symbol : 'circle'
    });

    circle.set('id','mc');
    var path = circle.getPath();
    expect(circle.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(400);
    expect(path[0][2]).to.be(90);
  });

  it('测试三角',function(){
    var triangle = canvas.addShape('marker',{
      x : 350,
      y : 100,
      fill: 'blue',
      radius : 10,
      symbol : 'triangle'
    });

    var path = triangle.getPath();
    expect(triangle.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(350);
    expect(path[0][2]).to.be(90);
  });

  it('测试正方形',function(){
    var rect = canvas.addShape('marker',{
      x : 400,
      y : 200,
      fill: '#ffcc00',
      radius : 10,
      symbol : 'square'
    });
    var path = rect.getPath();
    expect(rect.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(390);
    expect(path[0][2]).to.be(190);
  });

  it('测试倒三角',function(){
    var triangle = canvas.addShape('marker',{
      x : 350,
      y : 200,
      fill: 'yellow',
      radius : 10,
      symbol : 'triangle-down'
    });

    var path = triangle.getPath();
    expect(triangle.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(350);
    expect(path[0][2]).to.be(210);
  });

  it('测试菱形',function(){
    var  diamond = canvas.addShape('marker',{
      x : 350,
      y : 150,
      fill: 'red',
      radius : 10,
      symbol : 'diamond'
    });

    var path = diamond.getPath();
    expect(diamond.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(340);
    expect(path[0][2]).to.be(150);

  });

  it('测试图片',function(){
    var image = canvas.addShape('marker',{
      x : 400,
      y : 150,
      radius : 10,
      symbol : 'url(http://mat1.gtimg.com/www/images/qq2012/weather/20120906/sun.png)'
    });

    expect(image.get('el').type).to.be('image');

  });
  it('测试自定义path',function(){
    var cpath = canvas.addShape('marker',{
      x : 400,
      y : 250,
      path : 'M {x} {y} l 10 0 l0 10 z',
      fill : 'red'
    });

    var path = cpath.getPath();
    expect(cpath.get('el')).not.to.be(null);
    expect(path[0][1]).to.be(400);
    expect(path[0][2]).to.be(250);
  });

  it('更改半径',function(){
    var mc = canvas.find('mc'),
      radius = mc.attr('radius');
    expect(mc).not.to.be(null);
    expect(radius).not.to.be(undefined);
    mc.attr('radius',radius * 2);
    expect(mc.attr('radius')).to.be(radius * 2);

    var path = mc.getPath();
    
    expect(path[0][1]).to.be(400);
    expect(path[0][2]).to.be(80);
  });

  it('移动',function(){
    var mc = canvas.find('mc'),
      x = mc.attr('x'),
      y = mc.attr('y');
    mc.attr({
       x : x + 10,
       y : y + 10
    });

    var path = mc.getPath();
    
    expect(path[0][1]).to.be(410);
    expect(path[0][2]).to.be(90);

  });
});

function drawGrid(width,height){
  var xLength = width/10,
    yLength = height/10;
  var sgroup = canvas.addGroup(),
    ygroup = canvas.addGroup();

  for (var i = 0; i < xLength; i++) {
    sgroup.addShape('line',{
      x1 : i * 10,
      y1 : 0,
      x2 : i * 10,
      y2 : height,
      stroke : '#ccc'
    });
  };

  for (var j = 0; j < yLength; j++) {
    ygroup.addShape('line',{
      x1 : 0,
      y1 : j * 10,
      x2 : width,
      y2 : j * 10,
      stroke : '#ccc'
    });
  };
}

describe('测试分组',function(){
  var group;
  
  it('测试生成分组',function(){
    drawGrid(canvas.get('width'),canvas.get('height'));
       group  = canvas.addGroup();
       expect(group.isGroup).to.be(true);
       expect(group.get('el')).not.to.be(undefined);
       expect(group.get('node')).not.to.be(undefined);
       expect($.contains(node,group.get('node'))).to.be(true);
  });

  it('添加图形',function(){
    var circle = group.addShape({
      type : 'circle',
      id : 'c1',
      attrs : {
        cx : 100,
        cy : 100,
        r : 20,
        fill : 'red'
      }
    });
    expect(circle.get('el')).not.to.be(undefined);
    expect(circle.get('node')).not.to.be(undefined);
    expect($.contains(group.get('node'),circle.get('node'))).to.be(true);
  });

  it('查找图形',function(){
    var circle = group.find('c1');
    expect(circle).not.to.be(null);
    expect(circle.get('id')).to.be('c1');
  });

  it('删除图形',function(){
    var circle = group.find('c1'),
      cNode = circle.get('node');
    var length = group.get('children').length;
    expect(circle).not.to.be(null);

    expect($.contains(group.get('node'),cNode)).to.be(true);
    circle.remove();
    expect(group.find('c1')).to.be(null);
    expect(group.get('children').length).to.be(length - 1);

    expect($.contains(group.get('node'),cNode)).to.be(false);
  });

  it('清理图形',function(){
    group.addShape({
      type:'path',
      attrs :{
        path : 'M 50 0 L50,50 0,50 z',
        fill : 'blue'
      }
    });

    group.addShape({
      id : 'p1',
      type:'path',
      attrs :{
        path : 'M 150 0 L50,50 0,150 z',
        fill : 'blue'
      }
    });

    expect(group.get('children').length).to.be(2);
    group.clear();
    expect(group.get('children').length).to.be(0);
    expect($(group.get('node')).children().length).to.be(0);
  });

  it('测试平移',function(){
    var circle = group.addShape({
      type : 'circle',
      id : 'c1',
      attrs : {
        cx : 100,
        cy : 100,
        r : 20,
        fill : 'red'
      }
    });

    group.addShape('rect',{
      x : 50,
      y : 50,
      width : 50,
      height : 50,
      fill : 'yellow'
    });
    //var 
      //path = group.getPath();
    group.translate(50,50);
    
  });

  it('动画移动',function(done){
    var d = $('<div style="position:absolute;width:100px;height:100px;border:1px solid red"></div>').appendTo('body');

    group.animate({
      x : 100,
      y : 100
    },1000);

    setTimeout(function(){
      group.animate({
        x : 200,
        y : 200
      },1000);
      done();
    }, 500);
    

    d.animate({
      top: 100,
      left : 100
    },1000);


  });

  it('清除transform',function(done){
    setTimeout(function(){
      group.attr('transform','');
      done();
    }, 500);
  
  });

  it('清除分组内容',function(done){
    setTimeout(function(){
      var length = group.get('children').length;
      expect(length).not.to.be(0);
      group.clear();

      expect(group.get('children').length).to.be(0);

      expect($(group.get('node')).children().length).to.be(0);
      done();
    }, 500);
  });

  it('测试分组嵌套',function(){
    var g2 = group.addGroup({
      id : 'g2'
    });
    g2.addShape({
      type : 'circle',
      id : 'c1',
      attrs : {
        cx : 100,
        cy : 100,
        r : 20,
        fill : 'red'
      }
    });

    expect(g2.get('el')).not.to.be(null);
    expect(g2.get('node')).not.to.be(null);

  });

  it('查找分组',function(){
    expect(canvas.find('g2')).not.to.be(null);
    expect(group.find('g2')).not.to.be(null);
    
  });

  it('查找图形',function(){
    expect(canvas.find('c1')).not.to.be(null);
    expect(group.find('c1')).not.to.be(null);
  });

  it('移除分组',function(done){
    setTimeout(function(){
      var gNode = group.get('node');
      group.remove();
      expect(canvas.find('g2')).to.be(null);
      expect(canvas.find('c1')).to.be(null);
      expect($.contains(node,gNode)).not.to.be(true);
      done();
    }, 500);
  });
  

});
  


describe('测试事件',function(){
  var group ;
  describe('测试图形事件',function(){
    
    it('测试绑定事件',function(done){
      group = canvas.addGroup();
      var circle =  group.addShape({
        type : 'circle',
        id : 'c3',
        attrs : {r : 50,
          'class' : 'myclass',
          cx : 100,
          cy : 100,
          fill : 'blue'
        }
      });
      var callback = sinon.spy();

      circle.on('click', function(){
        callback();
        window.console && console.log('circle click');

      });
      circle.on('mouseover',function(ev){
        circle.attr('stroke','red');
        window.console &&console.log('over');
      });

      circle.on('mouseout',function(ev){
        circle.attr('stroke','black');
        window.console &&console.log('out');
      });

      simulate.simulate(circle.get('node'),'click');
      $(circle.get('node')).trigger('click');
      setTimeout(function(){
        expect(callback.called).to.be(true);
        circle.off();
        done();
      }, 200);
    });
  
    it('测试移除绑定事件',function(done){
      var circle = group.find('c3');

      var callback = sinon.spy();

      circle.on('click',function(){
        callback();
        window.console && console.log('click');
      });
      circle.off();
      simulate.simulate(circle.get('node'),'click');
      //$(circle.get('node')).trigger('click');
     
      setTimeout(function(){
        expect(callback.called).not.to.be(true);
        done();
      }, 200);

    });
 /**/
  });

  describe('测试分组事件',function(){

    it('测试绑定事件',function(done){
      var rect = group.addShape('rect',{
        x : 0,
        y : 0,
        width :40,
        height : 40,
        fill : 'red'
      });

      var callback = sinon.spy();

      group.on('click',function(ev){
        callback();
        var shape = ev.target.shape;
        expect(shape).to.be(rect);
        window.console &&  console.log('group click');
      });
       simulate.simulate(rect.get('node'),'click');
      //$(rect.get('node')).trigger('click');
            

      setTimeout(function(){
        expect(callback.called).to.be(true);
        group.off();
        done();
      });

    });
    it('测试移除绑定事件',function(done){
      var circle = group.find('c3');
      var callback = sinon.spy();
      group.on('mouseover',callback);
      group.off('mouseover',callback);
      simulate.simulate(circle.get('node'),'mouseover');
      //$(circle.get('node')).trigger('click')

      setTimeout(function(){
        expect(callback.called).not.to.be(true);
        done();
      });
    });
    
  });

  describe('测试画板事件',function(done){

    it('测试绑定事件',function(done){
      var circle = canvas.find('c3'),
        callback = sinon.spy();
      canvas.on('click',function(){
        callback();
      });  

      simulate.simulate(circle.get('node'),'click');
      //$(circle.get('node')).trigger('click');
      setTimeout(function(){
        expect(callback.called).to.be(true);
        canvas.off();
        done();
      });
    });
    
  });
 /* */
});
/**/
