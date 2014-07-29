
var  expect = require('expect.js'),
    sinon = require('sinon'),
    Util = require('../src/util');

describe('test basic util',function(){

    it('test substitute',function(){
        var temp = '<div>{a}</div>',
        str = Util.substitute(temp,{a : '123'});

        expect(str).to.be('<div>123</div>');

        str = Util.substitute('');
        expect(str).to.be('');
    });

    it('test ucfirst',function(){
        var str = 'abc';

        expect(Util.ucfirst(str)).to.be('Abc');
    });

    it('type',function(){
        expect(Util.isString('123')).to.be(true);
        expect(Util.isString(123)).to.be(false);

        expect(Util.isNumber(123)).to.be(true);
        expect(Util.isNumber('123')).to.be(false);

        expect(Util.isObject({})).to.be(true);

        expect(Util.isFunction(123)).to.be(false);

        var a = function(){}
        expect(Util.isFunction(a)).to.be(true);

        expect(Util.isArray([])).to.be(true);

        expect(Util.isBoolean(true)).to.be(true);

        expect(Util.isDate(new Date())).to.be(true);

    });

    it('mix',function(){
        var a = {a : 123},
            b = {b : 'b'};

        Util.mix(a,b);
        expect(a.b).to.be(b.b);
    });

    it('test mix prototype',function(){
        var A = function(a){
            this.a = a;
        },b = {b : 'b'};

        A.prototype.c = 'c';
        var a = new A('123');

        Util.mix(b,a);
        expect(b.c).to.be(undefined);
    });

    it('frame',function(done){
        var callback = sinon.spy();

        Util.requestAnimationFrame(callback);
        setTimeout(function(){
            expect(callback.called).to.be(true);
            done();
        },20);
    });
    it('clear frame',function(done){
        var callback = sinon.spy();

        var id = Util.requestAnimationFrame(callback);

        Util.cancelAnimationFrame(id);
        setTimeout(function(){
            expect(callback.called).to.be(false);
            done();
        },20);
    });

    describe('test extend',function(){
        function base(){
            this.name = 'base';
        }

        base.prototype = {
            method1 : function(){
                
            }
        };

        var subClass = function(){
            this.name = 'subclass';
        }

        subClass.prototype ={
            method : function(){}
        };
        Util.extend(subClass,base,{
            method2:function(){

            }
        });

        var sub2 = Util.extend(subClass,{
            method3 :function(){}
        });

        var obj = new subClass(),
            obj1 = new sub2();

        it('test extend',function(){
            expect(obj instanceof base).to.be(true);
            expect(obj instanceof subClass).to.be(true);

            expect(obj1 instanceof subClass).to.be(true);
        });

        it('test self method',function(){
            expect(obj.method).not.to.be(undefined);
        });
        it('test inherit method',function(){
            expect(obj.method1).not.to.be(undefined);
        });

        it('test custom method',function(){
            expect(obj.method2).not.to.be(undefined);
        });

        it('test constructor',function(){
            expect(obj.constructor).to.be(subClass);
        });

        it('invoke superclass method',function(){
            expect(obj.constructor.superclass.constructor).to.be(base);
        });

        it('test subclass',function(){
            expect(obj1.method1).not.to.be(undefined);
            expect(obj1.method2).not.to.be(undefined);
            expect(obj1.method2).not.to.be(undefined);
            expect(obj1.constructor.superclass.constructor).to.be(subClass);
        })
    });

    it('to array',function(){

        var args = Util.toArray(arguments);
        expect(Util.isArray(args)).to.be(true);

    });

    it('test augment',function(){

        var A = function(a){
            this.a = a;
        },b = {b : 'b'},
        B = function(b){
            this.b = b;
        };

        A.prototype.c = 'c';
        B.prototype.b1 = 'b1';

        Util.augment(A,b,B);

        var a = new A('a');
        expect(a.a).to.be('a');
        expect(a.b).to.be('b');
        expect(a.c).to.be('c');
        expect(a.b1).to.be('b1');

    });

    it('each obj',function(){
        var a = {a : 'a',b : 'b'};

        var num = 0;
        Util.each(a,function(v,k){
            num++;
        });
        expect(num).to.be(2);
    });

    it('each array',function(){
        var a = [1,2,3];

        var num = 0;
        Util.each(a,function(item,index){
            num++;
        });

        expect(num).to.be(a.length);

    });

    it('test map',function(){
        var arr = [1,2,3,4,5];

        var rst = Util.map(arr,function(item){
            return item * 2;
        });

        expect(rst.length).to.be(arr.length);

        expect(rst[0]).to.be(arr[0] * 2);

        expect(rst[4]).to.be(arr[4] * 2);
    });

    it('test filter',function(){
        var arr = [1,2,3,4,5],
            rst = Util.filter(arr,function(v){
                return v % 2 == 0;
            });
        expect(rst.length).to.be(2);
    });

    it('test indexOf',function(){
        var arr = [1,2,3,4,5];
        expect(Util.indexOf(arr,3)).to.be(2);
    });

    it('test remove',function(){
        var arr = [1,2,3,4,5];
        Util.remove(arr,3);
        expect(Util.indexOf(arr,3)).to.be(-1);
    });

    it('test empty',function(){
        var arr = [1,2,3];
        Util.empty(arr);

        expect(arr.length).to.be(0);
        expect(arr[0]).to.be(undefined);
    });
    it('test deep mix',function(){
        var obj = {
            a : {
                b : {
                   c : {

                   } 
                }
            },
            a1 : '1',
            a2 : '2'
        },
        src = {
            a : {
                b : {
                   c : {
                        d : 'd'
                   },
                   c1 : 'c1'
                },
                b1 : 'b1'
            },
            a1 : 'a1'
        };
        Util.mix(true,obj,src);

        expect(obj.a2).to.be('2');
        expect(obj.a1).to.be('a1');
        expect(obj.a.b.c.d).to.be('d');
    });

    it('equalsArray',function(){
        var arr = [1,2,3,4,5];
        expect(Util.equalsArray(arr,[1,2,3,4,5])).to.be(true);
        expect(Util.equalsArray(arr,[1,2,3,4])).to.be(false);


    });

    it('wrapBehavior',function(){
        var spy = sinon.spy();
        var obj = {
            click : function(){
                spy();
            }
        };

        var method = Util.wrapBehavior(obj,'click');
        method();
        expect(method).to.be(Util.getWrapBehavior(obj,'click'));

        expect(spy.called).to.be(true);
    });

    it('mixin',function(){
        function A (){

        }

        function B (){

        }
        B.prototype.b = function(){

        };

        function C(){

        }

        C.prototype.c = function(){

        }

        Util.mixin(A,[B,C]);

        expect(A._mixins.length).to.be(2);
        var a = new A();
        expect(a.b).not.to.be(undefined);
    });

});

describe('test util with raphael',function(){

    it('angle',function(){
        var angle = Util.angle(10,10,0,0);

        expect(angle).to.be(45);
    });

    it('test anim step',function(done){
        var spy = sinon.spy(),
            callback = sinon.spy();
        Util.animStep(500,function(factor){
            spy();
        },callback);

        setTimeout(function(){
            expect(callback.called).to.be(true);
            expect(spy.called).to.be(true);
            expect(spy.callCount > 1).to.be(true);
            done();
        },550);

    });

    it('stopStep',function(done){
        var spy = sinon.spy(),
            callback = sinon.spy();
        var handler = Util.animStep(500,function(factor){
            spy();
        },callback);

        setTimeout(function(){
            Util.stopStep(handler);
        },200);

        setTimeout(function(){
            expect(callback.called).to.be(false);
            expect(spy.called).to.be(true);
            expect(spy.callCount > 1).to.be(true);
            done();
        },500);
    });

    it('getPointAtLength',function(){
        var path = 'M 100 100 L 100 40 L 30 40';

        var point = Util.getPointAtLength(path,50);
        expect(point.x).to.be(100);
        expect(parseInt(point.y)).to.be(50);
    });

    it('isPointInsidePath',function(){
        var path = 'M 0 0 L 10 0 L 10 10 L 0 10 z';

        expect(Util.isPointInsidePath(path,5,5)).to.be(true);

        expect(Util.isPointInsidePath(path,10,11)).to.be(false);
    });

    it('getSubpath',function(){
        var path = 'M 0 0 L 10 0 L 10 10 L 0 10 z';
        var subPath = Util.getSubpath(path,1,2);
        expect(subPath).not.to.be(null);
    });

    it('parsePathString',function(){
        var path = 'M0 0 L10 0 L10 10 L0 10 z';
        var arr = Util.parsePathString(path);

        expect(arr.length).to.be(5);

    });

    it('parsePathArray',function(){
        var path = 'M0 0 L10 0 L10 10 L0 10 z';
        var arr = Util.parsePathString(path);
        expect(Util.parsePathArray(arr)).to.be(path);
    });

    it('transformPath',function(){

    });

    it('snapTo',function(){
        var arr = [1,5,10,12,15,18,20,25];

        var value = 13;

        expect(Util.snapTo(arr,value)).to.be(12);

        expect(Util.snapFloor(arr,value)).to.be(12);

        expect(Util.snapCeiling(arr,value)).to.be(15);
    });

    it('tryFixed',function(){
        var base = 0.25,
            value = 1.2344;
        expect(Util.tryFixed(value,base)).to.be(1.23);
    });

    it('try set',function(){

        var obj = {a : 123};
        expect(Util.trySet(obj,'a')).to.be(123);

        expect(obj.b).to.be(undefined);
        expect(Util.trySet(obj,'b','b')).to.be('b');

        expect(obj.b).to.be('b');

    });

    it('highlight',function(){
        var c = 'red';
        expect(Util.highlight(c,.15)).to.be('#ff2626');
    });

    it('dark',function(){
        var c = '#fff';
        expect(Util.dark(c,.15)).to.be('#d8d8d8');
    });
});



