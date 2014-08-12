
var Raphael = require('./raphael/index'),
  STEP_MS = 16,//16毫秒一个step
  HANDLERS = {

  },
  TIMES = {},//动画的事件校验
  NAN = NaN,
  PRE_HAND = 'h',
  objectPrototype = Object.prototype,
  toString = objectPrototype.toString;
  

//取小于当前值的
function floor(values,value){
  var length = values.length,
    pre = values[0];
  if(value < values[0]){
    return NAN;
  }
  if(value >= values[length - 1]){
    return values[length - 1];
  }
  for (var i = 1; i < values.length; i++) {
    if(value < values[i]){
      break;
    }
    pre = values[i];
  }

  return pre;
}
//大于当前值的第一个
function ceiling(values,value){
  var length = values.length,
    pre = values[0],
    rst;
  if(value < values[0] || value > values[length - 1]){
    return NAN;
  }

  for (var i = 1; i < values.length; i++) {
    if(value <= values[i]){
      rst = values[i];
      break;
    }
    pre = values[i];
  }

  return rst;
}

//将数值逼近到指定的数
function tryFixed(v,base){
  var str = base.toString(),
    index = str.indexOf('.');
  if(index == -1){
    return parseInt(v);
  }
  var length = str.substr(index + 1).length;
  return parseFloat(v.toFixed(length));
}
//分步动画
function animTime(duration,fn,callback){
    var baseTime = new Date().getTime(),
      baseInterval = 16,
      uid = Util.guid(PRE_HAND);

    next(0,fn,duration,callback);
    function next(num,fn,duration,callback){
      var nowTime = new Date().getTime();
      var durTime = nowTime - baseTime;
      if(durTime >= duration){
        fn(1,num);
        callback && callback();
        return ;
      }

      var factor = Math.pow(durTime/duration, 1.7);
      fn(factor,num);
      HANDLERS[uid] =  Util.requestAnimationFrame(function(){
        next(num+1,fn,duration,callback);
      });
    }
    return uid;
  } 

function stopStep(uid){
  if(HANDLERS[uid]){
      Util.cancelAnimationFrame(HANDLERS[uid]);
    delete HANDLERS[uid];
    //delete TIMES[uid];
  }
}

var MAX_LEVEL = 5;

function deepMix(dst,src,level){
  level = level || 0;
  for(var k in src){
    if(src.hasOwnProperty(k)){
      var value = src[k];
      if(value !== null && Util.isObject(value)){
        if(!Util.isObject(dst[k])){
          dst[k] =  {};
        }
        if(level < MAX_LEVEL){
          deepMix(dst[k],src[k]);
        }else{
          dst[k] = src[k];
        }
      }else if(Util.isArray(value)){
        //if(!Util.isArray(dst[k])){
        dst[k] = [];
        //}
        dst[k] = dst[k].concat(value);
      }else if(value !== undefined){
        dst[k] = src[k];
      }
    }
  }
}

/**
 * @class Chart.Util
 * @singleton
 * 绘图的工具类
 */
var Util = {

  /**
     * 替换字符串中的字段.
     * @param {String} str 模版字符串
     * @param {Object} o json data
     * @param {RegExp} [regexp] 匹配字符串的正则表达式
     */

    substitute: function (str, o) {
      if(!str || !o){
        return str;
      }
      return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
      });
    },
    /**
     * 使第一个字母变成大写
     * @param  {String} s 字符串
     * @return {String} 首字母大写后的字符串
     */
    ucfirst : function(s){
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    },
    /**
     * 判断是否是字符串
     * @return {Boolean} 是否是字符串
     */
    isString : function(value){
        return typeof value === 'string';
    },
    /**
     * 判断是否数字
     * @return {Boolean} 是否数字
     */
    isNumber : function(value){
        return typeof value === 'number';
    },
    /**
     * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
     * @return {Boolean} 是否数字
     */
    isNumeric : function(value){
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    /**
     * 是否是布尔类型
     *
     * @param {Object} value 测试的值
     * @return {Boolean}
     */
    isBoolean: function(value) {
        return typeof value === 'boolean';
    },
    /**
     * 是否为函数
     * @param  {*} fn 对象
     * @return {Boolean}  是否函数
     */
    isFunction : function(fn){
        return typeof(fn) === 'function';
    },
    /**
     * 是否数组
     * @method
     * @param  {*}  obj 是否数组
     * @return {Boolean}  是否数组
     */
    isArray : ('isArray' in Array) ? Array.isArray : function(value) {
        return toString.call(value) === '[object Array]';
    },

    /**
     * 是否日期
     * @param  {*}  value 对象
     * @return {Boolean}  是否日期
     */
    isDate: function(value) {
        return toString.call(value) === '[object Date]';
    },
    /**
     * 是否是javascript对象
     * @param {Object} value The value to test
     * @return {Boolean}
     * @method
     */
    isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

    /**
     * 实现类的继承，通过父类生成子类
     * @param  {Function} subclass
     * @param  {Function} superclass 父类构造函数
     * @param  {Object} overrides  子类的属性或者方法
     * @return {Function} 返回的子类构造函数
     * 示例:
     *      @example
     *      //父类
     *      function base(){
     *  
     *      }
     *
     *      function sub(){
     * 
     *      }
     *      //子类
     *      Util.extend(sub,base,{
     *          method : function(){
     *    
     *          }
     *      });
     *
     *      //或者
     *      var sub = Util.extend(base,{});
     */
    extend : function(subclass,superclass,overrides, staticOverrides){
        //如果只提供父类构造函数，则自动生成子类构造函数
        if(!Util.isFunction(superclass))
        {
            overrides = superclass;
            superclass = subclass;
            subclass =  function(){};
        }

        var create = Object.create ?
          function (proto, c) {
              return Object.create(proto, {
                  constructor: {
                      value: c
                  }
              });
          } :
          function (proto, c) {
              function F() {
              }

              F.prototype = proto;

              var o = new F();
              o.constructor = c;
              return o;
          };
            
        var superObj = create(superclass.prototype,subclass);//new superclass(),//实例化父类作为子类的prototype
        subclass.prototype = Util.mix(superObj,subclass.prototype);     //指定子类的prototype
        subclass.superclass = create(superclass.prototype,superclass);
        Util.mix(superObj,overrides);
        Util.mix(subclass,staticOverrides);
        return subclass;
    },
    /**
     * 复制到原型链上
     * @param  {Function} c   类
     * @param  {Object} obj 对象
     */
    augment : function(c){

      var args = Util.toArray(arguments);
      for(var i = 1;i < args.length; i++){
        var obj = args[i];
        if(Util.isFunction(obj)){
            obj = obj.prototype;
        }
        Util.mix(c.prototype,obj);
      }
    },
    /**
     * 转换成数组
     * @param  {*} value 需要转换的对象
     * @return {Array}  数组
     */
    toArray: function (value) { 
      if(!value || !value.length){
        return [];
      }
      if(Util.vml){
        var rst = [];
        for(var i = 0; i < value.length; i++){
          rst.push(value[i]);
        }
        return rst;
      }else{
        return Array.prototype.slice.call(value); 
      }
      
    },
    /**
     * 合并数据
     * @return {Object} 将数据合并到第一个
     */
    mix : function(){
      var args = Util.toArray(arguments),
        obj = args[0];
      if(obj == true){
        obj = args[1];
        for(var i = 2;i < args.length; i++){
          var source = args[i];
          deepMix(obj,source);
        }
      }else{
        for(var i = 1;i < args.length; i++){
          var source = args[i];
          for(var k in source){
            if(source.hasOwnProperty(k) && k != 'constructor'){
              obj[k] = source[k];
            }
          }
        }
      }

      
      return obj;
    },
    mixin : function(c,mixins){
      if(c && mixins){
        c._mixins = mixins;
        c.ATTRS = c.ATTRS || {};
        var temp = {};
        Util.each(mixins,function(mixin){
          Util.augment(c,mixin);
          var attrs = mixin.ATTRS;
          if(attrs){
            Util.mix(temp,attrs);
          }
        });

        c.ATTRS = Util.mix(temp,c.ATTRS);
      }
    },
    /**
     * map 数组
     * @param  {Array} arr 数组
     * @return {Array} map后的数组
     */
    map : function(arr,func){
      var result = [];
      Util.each(arr,function(value,index){
        result.push(func(value,index));
      });
      return result;
    },
   /**
     * 过滤数组
     * @param {Object|Array} element/Object 数组中的元素或者对象的值 
     * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){},如果返回true则添加到结果集
     * @return {Array} 过滤的结果集
     */
    filter : function(array,func){
      var result = [];
      Util.each(array,function(value,index){
        if(func(value,index)){
          result.push(value);
        }
      });
      return result;
    },
    /**
     * 遍历数组或者对象
     * @param {Object|Array} element/Object 数组中的元素或者对象的值
     * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
     */
    each : function (elements,func) {
      if(!elements){
          return;
      }
      if(Util.isObject(elements)){
        for(var k in elements){
          if(elements.hasOwnProperty(k)){
           var rst = func(elements[k],k);
           if(rst == false){
             break;
           }
          }
        }
      }else if(elements.length){
        for (var i = 0; i < elements.length ; i++) {
          var rst = func(elements[i],i);
          if(rst == false){
             break;
           }
        };
      }
    },
    requestAnimationFrame : function(fn){
        var method = window.requestAnimationFrame 
        || window.webkitRequestAnimationFrame 
        || function(fn){
           return setTimeout(fn,16);
        };
        
        return method(fn);
    },
    cancelAnimationFrame : function(id){
        var method = window.cancelAnimationFrame 
        || window.webkitCancelAnimationFrame 
        || function(id){
           return clearTimeout(id);
        }; 
        return  method(id);
    },
    /**
     * 生成唯一的Id
     * @method
     * @param {String} prefix 前缀
     * @return {String} 唯一的编号
     */
    guid : (function(){
        var map = {};
        return function(prefix){
            prefix = prefix || 'acharts';
            if(!map[prefix]){
                map[prefix] = 1;
            }else{
                map[prefix] += 1;
            }
            return prefix + map[prefix];
        };
    })(),

    indexOf : function(arr,obj){
      var m = Array.prototype.indexOf;
      if(m){
        return m.call(arr,obj);
      }
      var index = -1;

      for(var i = 0 ; i < arr.length; i++){
        if(arr[i] == obj){
          index = i;
          break;
        }
      }
      return index;
    },
    /**
     * 删除
     */
    remove : function(arr,obj){
      var index = Util.indexOf(arr,obj);
      if(index !== -1){
        arr.splice(index,1);
      }
    },
    /**
     * 清空
     * @param  {Array} array 数组
     */
    empty : function(array){
      if(!(array instanceof(Array))){
        for (var i = array.length - 1; i >= 0; i--) {
          delete array[i];
        }
      }
      array.length = 0;
    },
    /**
     * 2个数组是否等同
     * @param  {Array} a1 数组1
     * @param  {Array} a2 数组2
     * @return {Boolean} 2个数组相等或者内部元素是否相等
     */
    equalsArray : function(a1,a2){
      if(a1 == a2){
        return true;
      }
      if(!a1 || !a2){
        return false;
      }

      if(a1.length != a2.length){
        return false;
      }
      var rst = true;
      for(var i = 0 ;i < a1.length; i++){
        if(a1[i] !== a2[i]){
          rst = false;
          break;
        }
      }
      return rst;
    },
    /**
     * 封装事件，便于使用上下文this,和便于解除事件时使用
     * @protected
     * @param  {Object} self   对象
     * @param  {String} action 事件名称
     */
    wrapBehavior : function(self, action) {
        return self['_wrap_' + action] = function (e) {
          self[action](e);
        };
    },
    /**
     * 获取封装的事件
     * @protected
     * @param  {Object} self   对象
     * @param  {String} action 事件名称
     */
    getWrapBehavior : function(self, action) {
        return self['_wrap_' + action];
    }
};


var ARR_EV = ['srcElement','toElement','clientX','clientY','keyCode'];

function getEventObj(ev){
  var  rst = {};
  rst.target = ev.srcElement;
  rst.pageX = ev.clientX + document.body.scrollLeft - document.body.clientLeft;
  rst.pageY = ev.clientY + document.body.scrollTop - document.body.clientTop;
  Util.each(ARR_EV,function(key){
    rst[key] = ev[key];
  });
  return rst;
}

var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
  table = document.createElement('table'),
  tableRow = document.createElement('tr'),
  containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
  };

Util.mix(Util,{


  /**
   * 是否是vml
   * @type {Boolean}
   */
  vml : Raphael.vml,
  /**
   * 是否是svg
   * @type {Boolean}
   */
  svg : Raphael.svg,
  /**
   * 创建DOM 节点
   * @param  {String} str Dom 字符串
   * @return {HTMLElement}  DOM 节点
   */
  createDom : function(str){
    var name = fragmentRE.test(str) && RegExp.$1;

    if (!(name in containers)){
      name = '*'
    }
    container = containers[name];
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    container.innerHTML = '' + str;
    return container.childNodes[0];
  },
  getOffset : function(o){
    var rst = {},
      left = 0,
      top = 0;
    while (o!=null && o!=document.body){
    
        left += (o.offsetLeft || 0);
        top += (o.offsetTop || 0);
        o = o.offsetParent;
    };
    rst.top = top;
    rst.left = left;
    return rst;
  },
  /**
   * 是否包含指定节点
   * @param  {HTMLElement} node    节点
   * @param  {HTMLElement} subNode 子节点
   * @return {HTMLElement} 是否包含在节点中
   */
  contains : function(node,subNode){
      if(!node || !subNode){
        return false;
      }
      var rst = false,
        parent = subNode.parentNode;
      while(parent!=null && parent!=document.body){
        if(parent == node){
          rst = true;
          break;
        }
        parent = parent.parentNode;
      }

      return rst;
  },
  /**
   * 获取宽度
   * @param  {HTMLElement} el  dom节点
   * @return {Number} 宽度
   */
  getWidth : function(el){
    var width = Util.getStyle(el,'width');
    if(width == 'auto'){
      width = el.offsetWidth;
    }
    return parseFloat(width);
  },
   /**
   * 获取高度
   * @param  {HTMLElement} el  dom节点
   * @return {Number} 高度
   */
  getHeight : function(el){
    var height = Util.getStyle(el,'height');
    if(height == 'auto'){
      height = el.offsetHeight;
    }
    return parseFloat(height);
  },
  getOuterWidth : function(el){
    var width = Util.getWidth(el),
      bLeft = parseFloat(Util.getStyle(el,'borderLeftWidth')) || 0,
      pLeft = parseFloat(Util.getStyle(el,'paddingLeft')),
      pRight = parseFloat(Util.getStyle(el,'paddingRight')),
      bRight = parseFloat(Util.getStyle(el,'borderRightWidth')) || 0;

    return width + bLeft + bRight + pLeft + pRight;
  },
  getOuterHeight : function(el){
     var height = Util.getHeight(el),
      bTop = parseFloat(Util.getStyle(el,'borderTopWidth')) || 0,
      pTop = parseFloat(Util.getStyle(el,'paddingTop')),
      pBottom = parseFloat(Util.getStyle(el,'paddingBottom')),
      bBottom = parseFloat(Util.getStyle(el,'borderBottomWidth')) || 0;

    return height + bTop + bBottom + pTop + pBottom;
  },
  /**
   * 获取样式
   * @param  {HTMLElement} el  dom节点
   * @param  {String} name 样式名
   * @return {String} 属性值
   */
  getStyle : function(el,name){
    if(window.getComputedStyle){
      return window.getComputedStyle(el,null)[name];
    }
    return el.currentStyle[name];
  },
  addEvent : function( obj, type, fn ) {
    if ( obj.attachEvent ) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){
          window.event.target = window.event.srcElement;
          obj['e'+type+fn]( getEventObj(window.event) );
        }
        obj.attachEvent( 'on'+type, obj[type+fn] );
    } else
        obj.addEventListener( type, fn, false );
  },
  removeEvent : function( obj, type, fn ) {
      if ( obj.detachEvent ) {
          obj.detachEvent( 'on'+type, obj[type+fn] );
          obj[type+fn] = null;
      } else
          obj.removeEventListener( type, fn, false );
  },
  angle : function(x1, y1, x2, y2){
    return Raphael.angle(x1, y1, x2, y2);
  },
  /**
   * 分步执行动画
   * @param  {Number}   duration 执行时间
   * @param  {Function} fn  每一步执行的回调函数，function(step,total){}
   * @param  {Function} callback 回调函数
   * @return {String} 动画的handler用于终止动画
   */
  animStep : function(duration,fn,callback){
    return  animTime(duration,fn,callback);
  },
  /**
   * 终止分步执行的动画
   * @param  {String} handler 句柄
   */
  stopStep : function(handler){
    stopStep(handler);
  },
  animPath : function(pathShape,toPath,reserve,duration,easing,callback){
    //vml阻止动画执行
    /**/
    if(Util.vml){
      after();
      return;
    }
    reserve = reserve || 0;
    duration = duration || 400;

    var curPath = pathShape.getPath(),
      endPath = Util.parsePathString(toPath),
      tempPath,
      last = curPath.slice(reserve * -1);

    if(curPath.length > endPath.length){
      tempPath = curPath.slice(0,endPath.length);
    }else{
      tempPath = curPath.concat([]);
      if(reserve){
        for(var i = tempPath.length; i < endPath.length;i ++){
          tempPath = tempPath.concat(last);
        }
      }
    }
    pathShape.attr('path',tempPath);

    pathShape.animate({path : endPath},duration,easing,after);

    function after(){
      pathShape.attr('path',toPath);
      callback && callback();
    }
  },
  /**
   * 获取path上的点
   * @param  {String} path 路径
   * @param  {Number} length 长度
   * @return {Object}  {x: x-axis ,y: y-axis}
   */
  getPointAtLength : function(path, length){
    return Raphael.getPointAtLength(path,length);
  },
  /**
   * 节点是否在指定的Path中
   * @param  {String} path 路径
   * @param {Number} x x坐标
   * @param {Number} y y坐标
   * @return {Boolean} 是否在path中
   */
  isPointInsidePath : function(path, x, y){
    return Raphael.isPointInsidePath(path,x,y);
  },
  /**
   * 获取子path
   * @param  {String} path 路径字符串
   * @param  {Number} from 开始的节点
   * @param  {Number} to   结束的节点
   * @return {String} 子路径
   */
  getSubpath : function(path, from, to){
    return Raphael.getSubpath(path,from,to);
  },
  /**
   * 将path字符串转换成数组
   * @param  {String} str 字符串
   * @return {Array}  数组
   */
  parsePathString : function(str){
    return Raphael.parsePathString(str);
  },

  /**
   * 将path数组转换成字符串
   * @param  {Array} array 数组
   * @return {String}  字符串
   */
  parsePathArray : function(array){
    if(Util.isArray(array)){
      var path = Util.map(array,function(item){
        var str = item.join(' ');
        return str.replace(/([a-z,A-Z])\s+/,'$1');
      });
      return path.join(' ');
    }
    return array;
  },

  /**
   * 平移path
   * @param  {String} path 路径
   * @param  {Array|String|Object} transform 平移路径
   * @return {Array} path数组
   */
  transformPath : function(path,transform){
    return Raphael.transformPath(path,transform);
  },
  /**
   * 获取逼近的值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @param  {Number} [tolerance=10] 逼近范围
   * @return {Number} 逼近的值
   */
  snapTo : function(values, value, tolerance){
    if(tolerance){
      return Raphael.snapTo(values, value, tolerance);
    }
    var floorVal = floor(values,value),
      ceilingVal = ceiling(values,value);
    if(isNaN(floorVal) || isNaN(ceilingVal)){
      if(values[0] >= value){
        return values[0];
      }
      var last = values[values.length -1];
      if(last <= value){
        return last;
      }
    }
    

    if(Math.abs(value - floorVal) < Math.abs(ceilingVal - value)){
      return floorVal;
    }
    return ceilingVal;
  },
  /**
   * 获取逼近的最小值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最小值
   */
  snapFloor : function(values,value){
    return floor(values,value);
  },
  /**
   * 获取逼近的最大值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最大值
   */
  snapCeiling : function(values,value){
    return ceiling(values,value);
  },
  /**
   * 将数字保留对应数字的小数位
   * @param  {Number} value 值
   * @param  {Number} base  基准值
   * @return {Number}  fixed后的数字
   */
  tryFixed : function(value,base){
    return tryFixed(value,base);
  },
  /**
   * 设置值，仅当对象上没有此属性时
   * @param  {Object} obj 对象
   * @param  {String} name  字段名
   * @param  {*} value 值
   */
  trySet : function(obj,name,value){
    if(obj && !obj[name]){
      obj[name] = value;
    }
    return obj[name];
  },
  /**
   * 将颜色变亮
   * @param  {String} c  颜色
   * @param  {Number} percent 变亮的比例 0 - 1
   * @return {String} 变亮的颜色
   */
  highlight : function(c,percent){
    var color = Raphael.color(c),
      l = color.l * (1 + percent);
    return Raphael.hsl2rgb(color.h,color.s,l).hex;
  },
  /**
   * 将颜色变暗
   * @param  {String} c  颜色
   * @param  {Number} percent 变暗的比例 0 - 1
   * @return {String} 变暗的颜色
   */
  dark : function(c,percent){
    var color = Raphael.color(c),
      l = color.l * (1 - percent);
    return Raphael.hsl2rgb(color.h,color.s,l).hex;
  }
});

module.exports = Util;
