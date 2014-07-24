var Auto = require('../src/chart/axis/auto'),
    expect = require('expect.js'),
    Util = require('../src/util'),
    sinon = require('sinon'),
    DateUtil = require('../src/date');

    $ = require('jquery');

  $('<div id="s2"></div>').appendTo('body');

  function log(data,rst,title){

  $('<h3>'+title+'</h3>').appendTo('#s2');
  var el = $('<div class="well"></div>').appendTo('#s2');


  var s1 = '<p>数据 ： ' + JSON.stringify(data) + '</p>';
  $(s1).appendTo(el);
  rst.startDate = DateUtil.format(new Date(rst.min),'yyyy-mm-dd HH:MM:ss');
  rst.endDate = DateUtil.format(new Date(rst.max),'yyyy-mm-dd HH:MM:ss');
  rst.ticks = Util.map(rst.ticks,function(item){
    return DateUtil.format(new Date(item),'yyyy-mm-dd HH:MM:ss') ;
  });

  var s2 = '<p>结果：'+JSON.stringify(rst)+'</p>';
  $(s2).appendTo(el);

}


describe('测试时间坐标轴',function(){

 /**/
  it('指定最大值，最小值,不指定interval',function(){
    var info = {
      min : new Date(2010,1,1).getTime(),
      max : new Date(2019,12,31).getTime(),
      data : []
    };

    var rst = Auto.Time.caculate(info);
    expect(rst.ticks.length).to.be(6);
    log(info.data,rst,'指定最大值，最小值,不指定interval');

  });

  it('指定数据，不指定interval',function(){
    var data = [Date.UTC(2010,1,1),Date.UTC(2019,12,31)];
    var rst = Auto.Time.caculate({data : data});
    expect(rst.ticks.length).to.be(6);
    log(data,rst,'指定数据，不指定interval');
  });
  it('指定数据,测试月，不指定interval',function(){
    var data = [new Date('2010/12/31'),new Date('2012/01/01')];
    var rst = Auto.Time.caculate({data : data});

    expect(rst.ticks.length).to.be(15);
    log(data,rst,'指定数据，,测试月，不指定interval');
  });
  
  it('指定数据,测试月，不指定interval',function(){
    var data = [new Date('2010/01/01'),new Date('2012/02/01')];
    var rst = Auto.Time.caculate({data : data});

    expect(rst.ticks.length).to.be(10);
    log(data,rst,'指定数据，,测试月小于结束月，不指定interval');
  });
  /**/
 
 it('指定数据,测试天，不指定interval',function(){
    var data = [new Date('2010/12/20'),new Date('2011/05/20')];
    var rst = Auto.Time.caculate({data : data});

    expect(rst.ticks.length).to.be(9);
    log(data,rst,'指定数据,测试天，不指定interval');
  });

 it('指定数据,测试天，不指定interval',function(){
    var data = [new Date('2010/1/20'),new Date('2010/06/20')];
    var rst = Auto.Time.caculate({data : data});

    expect(rst.ticks.length).to.be(9);
    log(data,rst,'指定数据,测试天，不指定interval');
  });
  
  it('指定数据,测试天，指定interval',function(){
    var data = [new Date('2010/1/20'),new Date('2010/03/20')];
    var rst = Auto.Time.caculate({data : data,interval : 7 * 24 * 3600 * 1000});

    expect(rst.ticks.length).to.be(9);
    log(data,rst,'指定数据,测试天，不指定interval');
  });

  it('移除',function(){
    $('#s2').remove();
  })

});

