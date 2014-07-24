var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
  Axis = require('../src/chart/axis/circle'),
  PlotRange = require('../src/chart/plotrange'),
  RAxis = require('../src/chart/axis/radius');

var Util = require('../src/util');

$('<div id="s3"></div>').prependTo('body');


describe('测试中轴坐标系', function() {

  var canvas = new Canvas({
    id : 's3',
    width : 500,
    height : 500
  });

  var plotRange = new PlotRange({x : 20,y : 20}, {x : 460, y : 460});
  var xAxis = canvas.addGroup(Axis,{
      plotRange : plotRange,
      line : {
          'stroke-width' : 1,
          'stroke' : '#C0D0E0'
      },
      tickLine : {
          'stroke-width' : 1,
          value : 5,
          'stroke' : '#C0D0E0'
      },
      tickInterval : 60,
      labels : {
        label : {
          
        }
      },
      grid : {
        line : {
          'stroke-width' : 1,
          'stroke' : '#C0D0E0'
        }
      }
    });
  var yAxis = canvas.addGroup(RAxis,{
      plotRange : plotRange,
      line : {
          'stroke-width' : 1,
          'stroke' : '#aaa'
      },
     
      min : 0,
      max : 100,
      circle : xAxis,
      tickInterval : 20,
      grid : {
        line : {
          'stroke-width' : 1,
          'stroke' : '#C0D0E0'
        },
         type : 'circle'
      },
      labels : {
        label : {
          x : -12
        }
      }
    });

  describe('测试中轴坐标系',function(){

    it('测试坐标轴生成',function(){
      expect(xAxis.get('node')).not.to.be(undefined);
      
    });
    it('测试半径,圆心',function(){
      var center = xAxis.getCenter();
      expect(center.x).to.be(240);
      expect(center.y).to.be(240);

      var r = xAxis.getRadius();
      expect(r).to.be(200);
    });
    it('测试线',function(){
      var lineShape = xAxis.get('lineShape');
      expect(lineShape).not.to.be(undefined);
      expect(lineShape.getPath().length).not.to.be(0);
    });
    it('测试ticks',function(){
      var ticks = xAxis.get('ticks');
      expect(ticks.length).to.be(6);

      var tickShape = xAxis.get('tickShape');
      expect(tickShape).not.to.be(undefined);
      expect(tickShape.getPath().length).to.be(6*2);
    });

    it('测试lables',function(){
      var labelsGroup = xAxis.get('labelsGroup');
      expect(labelsGroup).not.to.be(null);
      expect(labelsGroup.getCount()).to.be(6);
    });

    it('测试栅格',function(){
      var gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be(undefined);
      expect(gridGroup.getCount()).to.be(1);
    });

    it('根据角度获取值坐标点，圆上',function(){
      var point = xAxis.getCirclePoint(0);
      expect(point.x).to.be(240);
      expect(point.y).to.be(40);

      var point1 = xAxis.getCirclePoint(180);
      expect(parseInt(point1.x)).to.be(240);
      expect(parseInt(point1.y)).to.be(440);
    });
    it('根据角度获取值坐标点，圆外，圆内',function(){

    });

    it('根据点获取角度',function(){
      var point = {x : 240,y : 40},
        angle = xAxis.getCircleAngle(point.x,point.y);
      expect(angle).to.be(0);

      point = {x : 40,y : 240};
      angle = xAxis.getCircleAngle(point.x,point.y);
      expect(angle).to.be(270);
    });

  });

  describe('测试半径坐标轴',function(){

    it('测试坐标轴生成',function(){
       expect(yAxis.get('node')).not.to.be(undefined);
    });

    it('测试栅格',function(){
      var gridGroup = yAxis.get('gridGroup');
      expect(gridGroup).not.to.be(undefined);
      expect(gridGroup.getCount()).to.be(1);
    });
  });


});

describe('测试中轴坐标系2', function() {

  var canvas = new Canvas({
    id : 's3',
    width : 500,
    height : 500
  });

  var plotRange = new PlotRange({x : 20,y : 20}, {x : 460, y : 460});
  var xAxis = canvas.addGroup(Axis,{
      plotRange : plotRange,
      ticks : ['一月','二月','三','四月','五月','六月'],
      labels : {
        label : {
          
        }
      },
      grid : {
        line : {
          'stroke-width' : 1,
          'stroke' : '#C0D0E0'
        }
      }
    });
  var yAxis = canvas.addGroup(RAxis,{
      plotRange : plotRange,
      line : {
          'stroke-width' : 1,
          'stroke' : '#aaa'
      },
     
      min : 0,
      max : 100,
      circle : xAxis,
      tickInterval : 20,
      grid : {
        line : {
          'stroke-width' : 1,
          'stroke' : '#C0D0E0'
        },
         type : 'polygon'
      },
      labels : {
        label : {
          x : -12
        }
      }
    });

  describe('测试中轴坐标系',function(){

    it('测试坐标轴生成',function(){
      expect(xAxis.get('node')).not.to.be(undefined);
      
    });
    it('测试半径,圆心',function(){
      var center = xAxis.getCenter();
      expect(center.x).to.be(240);
      expect(center.y).to.be(240);

      var r = xAxis.getRadius();
      expect(r).to.be(200);
    });
    

    it('测试lables',function(){
      var labelsGroup = xAxis.get('labelsGroup');
      expect(labelsGroup).not.to.be(null);
      expect(labelsGroup.getCount()).to.be(6);
    });

    it('测试栅格',function(){
      var gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be(undefined);
      expect(gridGroup.getCount()).to.be(1);
    });

    it('根据角度获取值坐标点，圆上',function(){
      var point = xAxis.getCirclePoint(0);
      expect(point.x).to.be(240);
      expect(point.y).to.be(40);

      var point1 = xAxis.getCirclePoint(180);
      expect(parseInt(point1.x)).to.be(240);
      expect(parseInt(point1.y)).to.be(440);
    });
    it('根据角度获取值坐标点，圆外，圆内',function(){

    });

    it('根据点获取角度',function(){
      var point = {x : 240,y : 40},
        angle = xAxis.getCircleAngle(point.x,point.y);
      expect(angle).to.be(0);

      point = {x : 40,y : 240};
      angle = xAxis.getCircleAngle(point.x,point.y);
      expect(angle).to.be(270);
    });

  });

  describe('测试半径坐标轴',function(){

    it('测试坐标轴生成',function(){
       expect(yAxis.get('node')).not.to.be(undefined);
    });

    it('测试栅格',function(){
      var gridGroup = yAxis.get('gridGroup');
      expect(gridGroup).not.to.be(undefined);
      expect(gridGroup.getCount()).to.be(1);
    });

    it('remove',function(done){

      setTimeout(function(){
        canvas.destroy();
        $('#s3').remove();
        done();
      },1000);
    });
  });

});


