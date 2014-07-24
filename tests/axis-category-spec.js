var 
    expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

var Canvas = require('../src/canvas'),
  Axis = require('../src/chart/axis/category'),
  NumberAxis = require('../src/chart/axis/number');

var Util = require('../src/util');

$('<div id="s2"></div>').prependTo('body');

var canvas = new Canvas({
  id : 's2',
  width : 500,
  height : 500
});



describe('测试分类坐标轴生成',function(){

  var plotRange = {
      start : {x : 20,y : 480},
      end : {x : 480, y : 20}
    },
    axis = canvas.addGroup(Axis,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(NumberAxis,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        },
        minorLine : {
          stroke : '#e0e0e0'
        },
        minorCount : 4
      },
      min : 50,
      max : 100,
      position:'left',
      tickInterval : 10,
      labels : {
        label : {
          x : -12
        }
      }
    });

  var node = axis.get('node');

  it('测试坐标系生成',function(){
    expect(node).not.to.be(undefined);

  });
  it('测试生成的坐标点',function(){
    expect(axis.get('ticks').length).to.be(13);
  });

  it('测试label',function(){
    var labelsGroup = axis.get('labelsGroup');
    expect(labelsGroup.get('children').length).to.be(13);
  });

  it('获取点的x坐标',function(){
    
    var value = '三月',
      offset = axis.getOffset(value);
    expect(isNaN(offset)).not.to.be(true);
    expect(parseInt(offset)).to.be(115);
  });

  describe('测试分类坐标轴变化',function(){
    var labelsGroup = axis.get('labelsGroup');
    it('更改坐标轴',function(done){
      var categories =  ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
      axis.change({
        categories : categories.slice(0,6)
      });

      
      setTimeout(function(){
        var value = 'two',
        offset = axis.getOffset(value);
        expect(isNaN(offset)).not.to.be(true);
        expect(parseInt(offset)).to.be(135);
        done();
      },500);


    });
    
    it('测试新的label',function(){
      expect(labelsGroup.get('children').length).to.be(7);
    });

    it('remove',function(done){

      setTimeout(function(){
        canvas.destroy();
        $('#s2').remove();
        done();
      },1000);
    });/**/
  });
});



