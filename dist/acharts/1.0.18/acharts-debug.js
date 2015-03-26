;(function() {
var achart_util_110_src_util_debug, achart_raphael_102_src_eve_debug, achart_date_100_index_debug, achart_util_110_index_debug, achart_raphael_102_src_core_debug, achart_raphael_102_src_svg_debug, achart_raphael_102_src_vml_debug, achart_canvas_112_src_canvasitem_debug, achart_plot_111_src_plotrange_debug, achart_actived_102_src_actived_debug, achart_actived_102_src_activedgroup_debug, achart_auto_103_index_debug, achart_series_107_src_stacked_debug, achart_theme_101_index_debug, achart_raphael_102_src_index_debug, achart_actived_102_index_debug, achart_raphael_102_index_debug, achart_canvas_112_src_raphealgroup_debug, achart_canvas_112_src_util_debug, achart_canvas_112_src_base_debug, achart_canvas_112_src_shape_debug, achart_canvas_112_src_container_debug, achart_canvas_112_src_group_debug, achart_canvas_112_src_canvas_debug, achart_canvas_112_index_debug, achart_plot_111_src_plotitem_debug, achart_plot_111_src_plotback_debug, achart_plot_111_index_debug, achart_legend_103_src_legenditem_debug, achart_tooltip_104_src_tooltip_debug, achart_axis_113_src_grid_debug, achart_labels_103_src_labels_debug, achart_labels_103_src_showlabels_debug, achart_markers_102_src_markers_debug, achart_flags_101_src_flag_debug, achart_candlesticks_101_src_candlestick_debug, achart_legend_103_src_legend_debug, achart_legend_103_src_uselegend_debug, achart_tooltip_104_index_debug, achart_labels_103_index_debug, achart_markers_102_index_debug, achart_flags_101_src_flags_debug, achart_candlesticks_101_src_candlesticks_debug, achart_legend_103_index_debug, achart_axis_113_src_abstract_debug, achart_axis_113_src_circle_debug, achart_series_107_src_base_debug, achart_series_107_src_cartesian_debug, achart_series_107_src_line_debug, achart_series_107_src_itemgroup_debug, achart_series_107_src_area_debug, achart_series_107_src_pie_debug, achart_flags_101_index_debug, achart_candlesticks_101_index_debug, achart_axis_113_src_base_debug, achart_axis_113_src_category_debug, achart_axis_113_src_number_debug, achart_axis_113_src_time_debug, achart_axis_113_src_timecategory_debug, achart_axis_113_src_numbercategory_debug, achart_axis_113_src_radius_debug, achart_series_107_src_column_debug, achart_axis_113_index_debug, achart_series_107_index_debug, achart_arearange_102_src_arearange_debug, achart_series_other_104_src_bubble_debug, achart_series_other_104_src_scatter_debug, achart_series_other_104_src_flag_debug, acharts_1018_src_seriesgroup_debug, achart_arearange_102_index_debug, achart_series_other_104_index_debug, acharts_1018_src_chart_debug, acharts_1018_acharts_debug;
achart_util_110_src_util_debug = function (exports) {
  var NAN = NaN, objectPrototype = Object.prototype, toString = objectPrototype.toString;
  //取小于当前值的
  function floor(values, value) {
    var length = values.length, pre = values[0];
    if (value < values[0]) {
      return NAN;
    }
    if (value >= values[length - 1]) {
      return values[length - 1];
    }
    for (var i = 1; i < values.length; i++) {
      if (value < values[i]) {
        break;
      }
      pre = values[i];
    }
    return pre;
  }
  //大于当前值的第一个
  function ceiling(values, value) {
    var length = values.length, pre = values[0], rst;
    if (value > values[length - 1]) {
      return NAN;
    }
    if (value < values[0]) {
      return values[0];
    }
    for (var i = 1; i < values.length; i++) {
      if (value <= values[i]) {
        rst = values[i];
        break;
      }
      pre = values[i];
    }
    return rst;
  }
  //将数值逼近到指定的数
  function tryFixed(v, base) {
    var str = base.toString(), index = str.indexOf('.');
    if (index == -1) {
      return parseInt(v);
    }
    var length = str.substr(index + 1).length;
    return parseFloat(v.toFixed(length));
  }
  var MAX_LEVEL = 5;
  function deepMix(dst, src, level) {
    level = level || 0;
    for (var k in src) {
      if (src.hasOwnProperty(k)) {
        var value = src[k];
        if (value !== null && Util.isObject(value)) {
          if (!Util.isObject(dst[k])) {
            dst[k] = {};
          }
          if (level < MAX_LEVEL) {
            deepMix(dst[k], src[k]);
          } else {
            dst[k] = src[k];
          }
        } else if (Util.isArray(value)) {
          //if(!Util.isArray(dst[k])){
          dst[k] = [];
          //}
          dst[k] = dst[k].concat(value);
        } else if (value !== undefined) {
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
        if (!str || !o) {
          return str;
        }
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
          if (match.charAt(0) === '\\') {
            return match.slice(1);
          }
          return o[name] === undefined ? '' : o[name];
        });
      },
      /**
       * 使第一个字母变成大写
       * @param  {String} s 字符串
       * @return {String} 首字母大写后的字符串
       */
      ucfirst: function (s) {
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
      },
      /**
       * 判断是否是字符串
       * @return {Boolean} 是否是字符串
       */
      isString: function (value) {
        return typeof value === 'string';
      },
      /**
       * 判断是否数字
       * @return {Boolean} 是否数字
       */
      isNumber: function (value) {
        return typeof value === 'number';
      },
      /**
       * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
       * @return {Boolean} 是否数字
       */
      isNumeric: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },
      /**
       * 是否是布尔类型
       *
       * @param {Object} value 测试的值
       * @return {Boolean}
       */
      isBoolean: function (value) {
        return typeof value === 'boolean';
      },
      /**
       * 是否为函数
       * @param  {*} fn 对象
       * @return {Boolean}  是否函数
       */
      isFunction: function (fn) {
        return typeof fn === 'function';
      },
      /**
       * 是否数组
       * @method
       * @param  {*}  obj 是否数组
       * @return {Boolean}  是否数组
       */
      isArray: 'isArray' in Array ? Array.isArray : function (value) {
        return toString.call(value) === '[object Array]';
      },
      /**
       * 是否日期
       * @param  {*}  value 对象
       * @return {Boolean}  是否日期
       */
      isDate: function (value) {
        return toString.call(value) === '[object Date]';
      },
      /**
       * 是否是javascript对象
       * @param {Object} value The value to test
       * @return {Boolean}
       * @method
       */
      isObject: toString.call(null) === '[object Object]' ? function (value) {
        // check ownerDocument here as well to exclude DOM nodes
        return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
      } : function (value) {
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
      extend: function (subclass, superclass, overrides, staticOverrides) {
        //如果只提供父类构造函数，则自动生成子类构造函数
        if (!Util.isFunction(superclass)) {
          overrides = superclass;
          superclass = subclass;
          subclass = function () {
          };
        }
        var create = Object.create ? function (proto, c) {
            return Object.create(proto, { constructor: { value: c } });
          } : function (proto, c) {
            function F() {
            }
            F.prototype = proto;
            var o = new F();
            o.constructor = c;
            return o;
          };
        var superObj = create(superclass.prototype, subclass);
        //new superclass(),//实例化父类作为子类的prototype
        subclass.prototype = Util.mix(superObj, subclass.prototype);
        //指定子类的prototype
        subclass.superclass = create(superclass.prototype, superclass);
        Util.mix(superObj, overrides);
        Util.mix(subclass, staticOverrides);
        return subclass;
      },
      /**
       * 复制到原型链上
       * @param  {Function} c   类
       * @param  {Object} obj 对象
       */
      augment: function (c) {
        var args = Util.toArray(arguments);
        for (var i = 1; i < args.length; i++) {
          var obj = args[i];
          if (Util.isFunction(obj)) {
            obj = obj.prototype;
          }
          Util.mix(c.prototype, obj);
        }
      },
      /**
       * 转换成数组
       * @param  {*} value 需要转换的对象
       * @return {Array}  数组
       */
      toArray: function (value) {
        if (!value || !value.length) {
          return [];
        }
        if (Util.vml) {
          var rst = [];
          for (var i = 0; i < value.length; i++) {
            rst.push(value[i]);
          }
          return rst;
        } else {
          return Array.prototype.slice.call(value);
        }
      },
      /**
       * 合并数据
       * @return {Object} 将数据合并到第一个
       */
      mix: function () {
        var args = Util.toArray(arguments), obj = args[0];
        if (obj == true) {
          obj = args[1];
          for (var i = 2; i < args.length; i++) {
            var source = args[i];
            deepMix(obj, source);
          }
        } else {
          for (var i = 1; i < args.length; i++) {
            var source = args[i];
            for (var k in source) {
              if (source.hasOwnProperty(k) && k != 'constructor') {
                obj[k] = source[k];
              }
            }
          }
        }
        return obj;
      },
      mixin: function (c, mixins) {
        if (c && mixins) {
          c._mixins = mixins;
          c.ATTRS = c.ATTRS || {};
          var temp = {};
          Util.each(mixins, function (mixin) {
            Util.augment(c, mixin);
            var attrs = mixin.ATTRS;
            if (attrs) {
              Util.mix(temp, attrs);
            }
          });
          c.ATTRS = Util.mix(temp, c.ATTRS);
        }
      },
      /**
       * map 数组
       * @param  {Array} arr 数组
       * @return {Array} map后的数组
       */
      map: function (arr, func) {
        var result = [];
        Util.each(arr, function (value, index) {
          result.push(func(value, index));
        });
        return result;
      },
      /**
       * 过滤数组
       * @param {Object|Array} element/Object 数组中的元素或者对象的值 
       * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){},如果返回true则添加到结果集
       * @return {Array} 过滤的结果集
       */
      filter: function (array, func) {
        var result = [];
        Util.each(array, function (value, index) {
          if (func(value, index)) {
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
      each: function (elements, func) {
        if (!elements) {
          return;
        }
        if (Util.isObject(elements)) {
          for (var k in elements) {
            if (elements.hasOwnProperty(k)) {
              var rst = func(elements[k], k);
              if (rst == false) {
                break;
              }
            }
          }
        } else if (elements.length) {
          for (var i = 0; i < elements.length; i++) {
            var rst = func(elements[i], i);
            if (rst == false) {
              break;
            }
          }
        }
      },
      requestAnimationFrame: function (fn) {
        var method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
            return setTimeout(fn, 16);
          };
        return method(fn);
      },
      cancelAnimationFrame: function (id) {
        var method = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (id) {
            return clearTimeout(id);
          };
        return method(id);
      },
      /**
       * 生成唯一的Id
       * @method
       * @param {String} prefix 前缀
       * @return {String} 唯一的编号
       */
      guid: function () {
        var map = {};
        return function (prefix) {
          prefix = prefix || 'acharts';
          if (!map[prefix]) {
            map[prefix] = 1;
          } else {
            map[prefix] += 1;
          }
          return prefix + map[prefix];
        };
      }(),
      indexOf: function (arr, obj) {
        var m = Array.prototype.indexOf;
        if (m) {
          return m.call(arr, obj);
        }
        var index = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == obj) {
            index = i;
            break;
          }
        }
        return index;
      },
      /**
       * 删除
       */
      remove: function (arr, obj) {
        var index = Util.indexOf(arr, obj);
        if (index !== -1) {
          arr.splice(index, 1);
        }
      },
      /**
       * 清空
       * @param  {Array} array 数组
       */
      empty: function (array) {
        if (!(array instanceof Array)) {
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
      equalsArray: function (a1, a2) {
        if (a1 == a2) {
          return true;
        }
        if (!a1 || !a2) {
          return false;
        }
        if (a1.length != a2.length) {
          return false;
        }
        var rst = true;
        for (var i = 0; i < a1.length; i++) {
          if (a1[i] !== a2[i]) {
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
      wrapBehavior: function (self, action) {
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
      getWrapBehavior: function (self, action) {
        return self['_wrap_' + action];
      },
      /**
       * 获取逼近的值，用于对齐数据
       * @param  {Array} values   数据集合
       * @param  {Number} value   数值
       * @param  {Number} [tolerance=10] 逼近范围
       * @return {Number} 逼近的值
       */
      snapTo: function (values, value, tolerance) {
        if (tolerance) {
          return Raphael.snapTo(values, value, tolerance);
        }
        var floorVal = floor(values, value), ceilingVal = ceiling(values, value);
        if (isNaN(floorVal) || isNaN(ceilingVal)) {
          if (values[0] >= value) {
            return values[0];
          }
          var last = values[values.length - 1];
          if (last <= value) {
            return last;
          }
        }
        if (Math.abs(value - floorVal) < Math.abs(ceilingVal - value)) {
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
      snapFloor: function (values, value) {
        return floor(values, value);
      },
      /**
       * 获取逼近的最大值，用于对齐数据
       * @param  {Array} values   数据集合
       * @param  {Number} value   数值
       * @return {Number} 逼近的最大值
       */
      snapCeiling: function (values, value) {
        return ceiling(values, value);
      },
      /**
       * 将数字保留对应数字的小数位
       * @param  {Number} value 值
       * @param  {Number} base  基准值
       * @return {Number}  fixed后的数字
       */
      tryFixed: function (value, base) {
        return tryFixed(value, base);
      }
    };
  exports = Util;
  return exports;
}();
achart_raphael_102_src_eve_debug = function () {
  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  // 
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  // 
  // http://www.apache.org/licenses/LICENSE-2.0
  // 
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  // ┌────────────────────────────────────────────────────────────┐ \\
  // │ Eve 0.4.2 - JavaScript Events Library                      │ \\
  // ├────────────────────────────────────────────────────────────┤ \\
  // │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
  // └────────────────────────────────────────────────────────────┘ \\
  (function (glob) {
    var version = '0.4.2', has = 'hasOwnProperty', separator = /[\.\/]/, wildcard = '*', fun = function () {
      }, numsort = function (a, b) {
        return a - b;
      }, current_event, stop, events = { n: {} },
      /*\
           * eve
           [ method ]
      
           * Fires event with given `name`, given scope and other parameters.
      
           > Arguments
      
           - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
           - scope (object) context for the event handlers
           - varargs (...) the rest of arguments will be sent to event handlers
      
           = (object) array of returned values from the listeners
          \*/
      eve = function (name, scope) {
        name = String(name);
        var e = events, oldstop = stop, args = Array.prototype.slice.call(arguments, 2), listeners = eve.listeners(name), z = 0, f = false, l, indexed = [], queue = {}, out = [], ce = current_event, errors = [];
        current_event = name;
        stop = 0;
        for (var i = 0, ii = listeners.length; i < ii; i++)
          if ('zIndex' in listeners[i]) {
            indexed.push(listeners[i].zIndex);
            if (listeners[i].zIndex < 0) {
              queue[listeners[i].zIndex] = listeners[i];
            }
          }
        indexed.sort(numsort);
        while (indexed[z] < 0) {
          l = queue[indexed[z++]];
          out.push(l.apply(scope, args));
          if (stop) {
            stop = oldstop;
            return out;
          }
        }
        for (i = 0; i < ii; i++) {
          l = listeners[i];
          if ('zIndex' in l) {
            if (l.zIndex == indexed[z]) {
              out.push(l.apply(scope, args));
              if (stop) {
                break;
              }
              do {
                z++;
                l = queue[indexed[z]];
                l && out.push(l.apply(scope, args));
                if (stop) {
                  break;
                }
              } while (l);
            } else {
              queue[l.zIndex] = l;
            }
          } else {
            out.push(l.apply(scope, args));
            if (stop) {
              break;
            }
          }
        }
        stop = oldstop;
        current_event = ce;
        return out.length ? out : null;
      };
    // Undocumented. Debug only.
    eve._events = events;
    /*\
         * eve.listeners
         [ method ]
    
         * Internal method which gives you array of all event handlers that will be triggered by the given `name`.
    
         > Arguments
    
         - name (string) name of the event, dot (`.`) or slash (`/`) separated
    
         = (array) array of event handlers
        \*/
    eve.listeners = function (name) {
      var names = name.split(separator), e = events, item, items, k, i, ii, j, jj, nes, es = [e], out = [];
      for (i = 0, ii = names.length; i < ii; i++) {
        nes = [];
        for (j = 0, jj = es.length; j < jj; j++) {
          e = es[j].n;
          items = [
            e[names[i]],
            e[wildcard]
          ];
          k = 2;
          while (k--) {
            item = items[k];
            if (item) {
              nes.push(item);
              out = out.concat(item.f || []);
            }
          }
        }
        es = nes;
      }
      return out;
    };
    /*\
       * eve.on
       [ method ]
       **
       * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
       | eve.on("*.under.*", f);
       | eve("mouse.under.floor"); // triggers f
       * Use @eve to trigger the listener.
       **
       > Arguments
       **
       - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
       - f (function) event handler function
       **
       = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment. 
       > Example:
       | eve.on("mouse", eatIt)(2);
       | eve.on("mouse", scream);
       | eve.on("mouse", catchIt)(1);
       * This will ensure that `catchIt()` function will be called before `eatIt()`.
    *
       * If you want to put your handler before non-indexed handlers, specify a negative value.
       * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
      \*/
    eve.on = function (name, f) {
      name = String(name);
      if (typeof f != 'function') {
        return function () {
        };
      }
      var names = name.split(separator), e = events;
      for (var i = 0, ii = names.length; i < ii; i++) {
        e = e.n;
        e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = { n: {} });
      }
      e.f = e.f || [];
      for (i = 0, ii = e.f.length; i < ii; i++)
        if (e.f[i] == f) {
          return fun;
        }
      e.f.push(f);
      return function (zIndex) {
        if (+zIndex == +zIndex) {
          f.zIndex = +zIndex;
        }
      };
    };
    /*\
       * eve.f
       [ method ]
       **
       * Returns function that will fire given event with optional arguments.
    * Arguments that will be passed to the result function will be also
    * concated to the list of final arguments.
     | el.onclick = eve.f("click", 1, 2);
     | eve.on("click", function (a, b, c) {
     |     console.log(a, b, c); // 1, 2, [event object]
     | });
       > Arguments
    - event (string) event name
    - varargs (…) and any other arguments
    = (function) possible event handler function
      \*/
    eve.f = function (event) {
      var attrs = [].slice.call(arguments, 1);
      return function () {
        eve.apply(null, [
          event,
          null
        ].concat(attrs).concat([].slice.call(arguments, 0)));
      };
    };
    /*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
    eve.stop = function () {
      stop = 1;
    };
    /*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     > Arguments
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
    eve.nt = function (subname) {
      if (subname) {
        return new RegExp('(?:\\.|\\/|^)' + subname + '(?:\\.|\\/|$)').test(current_event);
      }
      return current_event;
    };
    /*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
    eve.nts = function () {
      return current_event.split(separator);
    };
    /*\
       * eve.off
       [ method ]
       **
       * Removes given function from the list of event listeners assigned to given name.
    * If no arguments specified all the events will be cleared.
       **
       > Arguments
       **
       - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
       - f (function) event handler function
      \*/
    /*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
    eve.off = eve.unbind = function (name, f) {
      if (!name) {
        eve._events = events = { n: {} };
        return;
      }
      var names = name.split(separator), e, key, splice, i, ii, j, jj, cur = [events];
      for (i = 0, ii = names.length; i < ii; i++) {
        for (j = 0; j < cur.length; j += splice.length - 2) {
          splice = [
            j,
            1
          ];
          e = cur[j].n;
          if (names[i] != wildcard) {
            if (e[names[i]]) {
              splice.push(e[names[i]]);
            }
          } else {
            for (key in e)
              if (e[has](key)) {
                splice.push(e[key]);
              }
          }
          cur.splice.apply(cur, splice);
        }
      }
      for (i = 0, ii = cur.length; i < ii; i++) {
        e = cur[i];
        while (e.n) {
          if (f) {
            if (e.f) {
              for (j = 0, jj = e.f.length; j < jj; j++)
                if (e.f[j] == f) {
                  e.f.splice(j, 1);
                  break;
                }
              !e.f.length && delete e.f;
            }
            for (key in e.n)
              if (e.n[has](key) && e.n[key].f) {
                var funcs = e.n[key].f;
                for (j = 0, jj = funcs.length; j < jj; j++)
                  if (funcs[j] == f) {
                    funcs.splice(j, 1);
                    break;
                  }
                !funcs.length && delete e.n[key].f;
              }
          } else {
            delete e.f;
            for (key in e.n)
              if (e.n[has](key) && e.n[key].f) {
                delete e.n[key].f;
              }
          }
          e = e.n;
        }
      }
    };
    /*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
    eve.once = function (name, f) {
      var f2 = function () {
        eve.unbind(name, f2);
        return f.apply(this, arguments);
      };
      return eve.on(name, f2);
    };
    /*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
    eve.version = version;
    eve.toString = function () {
      return 'You are running Eve ' + version;
    };
    //(typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
    glob.eve = eve;
  }(this));
}();
achart_date_100_index_debug = function (exports) {
  var dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;
  function dateParse(val) {
    if (val instanceof Date) {
      return val;
    }
    return new Date(val);
  }
  function DateAdd(strInterval, NumDay, dtDate) {
    var dtTmp = new Date(dtDate);
    if (isNaN(dtTmp)) {
      dtTmp = new Date();
    }
    NumDay = parseInt(NumDay, 10);
    switch (strInterval) {
    case 's':
      dtTmp = new Date(dtTmp.getTime() + 1000 * NumDay);
      break;
    case 'n':
      dtTmp = new Date(dtTmp.getTime() + 60000 * NumDay);
      break;
    case 'h':
      dtTmp = new Date(dtTmp.getTime() + 3600000 * NumDay);
      break;
    case 'd':
      dtTmp = new Date(dtTmp.getTime() + 86400000 * NumDay);
      break;
    case 'w':
      dtTmp = new Date(dtTmp.getTime() + 86400000 * 7 * NumDay);
      break;
    case 'm':
      dtTmp = new Date(dtTmp.getFullYear(), dtTmp.getMonth() + NumDay, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      break;
    case 'y':
      //alert(dtTmp.getFullYear());
      dtTmp = new Date(dtTmp.getFullYear() + NumDay, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      //alert(dtTmp);
      break;
    }
    return dtTmp;
  }
  var dateFormat = function () {
      var token = /w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function (val, len) {
          val = String(val);
          len = len || 2;
          while (val.length < len) {
            val = '0' + val;
          }
          return val;
        },
        // Some common format strings
        masks = {
          'default': 'ddd mmm dd yyyy HH:MM:ss',
          shortDate: 'm/d/yy',
          //mediumDate:   'mmm d, yyyy',
          longDate: 'mmmm d, yyyy',
          fullDate: 'dddd, mmmm d, yyyy',
          shortTime: 'h:MM TT',
          //mediumTime:   'h:MM:ss TT',
          longTime: 'h:MM:ss TT Z',
          isoDate: 'yyyy-mm-dd',
          isoTime: 'HH:MM:ss',
          isoDateTime: 'yyyy-mm-dd\'T\'HH:MM:ss',
          isoUTCDateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
          //added by jayli
          localShortDate: 'yy\u5E74mm\u6708dd\u65E5',
          localShortDateTime: 'yy\u5E74mm\u6708dd\u65E5 hh:MM:ss TT',
          localLongDate: 'yyyy\u5E74mm\u6708dd\u65E5',
          localLongDateTime: 'yyyy\u5E74mm\u6708dd\u65E5 hh:MM:ss TT',
          localFullDate: 'yyyy\u5E74mm\u6708dd\u65E5 w',
          localFullDateTime: 'yyyy\u5E74mm\u6708dd\u65E5 w hh:MM:ss TT'
        },
        // Internationalization strings
        i18n = {
          dayNames: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            '\u661F\u671F\u65E5',
            '\u661F\u671F\u4E00',
            '\u661F\u671F\u4E8C',
            '\u661F\u671F\u4E09',
            '\u661F\u671F\u56DB',
            '\u661F\u671F\u4E94',
            '\u661F\u671F\u516D'
          ],
          monthNames: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
        };
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc) {
        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) {
          throw SyntaxError('invalid date');
        }
        mask = String(masks[mask] || mask || masks['default']);
        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === 'UTC:') {
          mask = mask.slice(4);
          utc = true;
        }
        var _ = utc ? 'getUTC' : 'get', d = date[_ + 'Date'](), D = date[_ + 'Day'](), m = date[_ + 'Month'](), y = date[_ + 'FullYear'](), H = date[_ + 'Hours'](), M = date[_ + 'Minutes'](), s = date[_ + 'Seconds'](), L = date[_ + 'Milliseconds'](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
            d: d,
            dd: pad(d, undefined),
            ddd: i18n.dayNames[D],
            dddd: i18n.dayNames[D + 7],
            w: i18n.dayNames[D + 14],
            m: m + 1,
            mm: pad(m + 1, undefined),
            mmm: i18n.monthNames[m],
            mmmm: i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12, undefined),
            H: H,
            HH: pad(H, undefined),
            M: M,
            MM: pad(M, undefined),
            s: s,
            ss: pad(s, undefined),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L, undefined),
            t: H < 12 ? 'a' : 'p',
            tt: H < 12 ? 'am' : 'pm',
            T: H < 12 ? 'A' : 'P',
            TT: H < 12 ? 'AM' : 'PM',
            Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
            o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: [
              'th',
              'st',
              'nd',
              'rd'
            ][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
          };
        return mask.replace(token, function ($0) {
          return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
      };
    }();
  /**
   * 日期的工具方法
   * @class Chart.Date
   * @singleton
   */
  var DateUtil = {
      /**
       * 日期加法
       * @param {String} strInterval 加法的类型，s(秒),n(分),h(时),d(天),w(周),m(月),y(年)
       * @param {Number} Num     数量，如果为负数，则为减法
       * @param {Date} dtDate    起始日期，默认为此时
       */
      add: function (strInterval, Num, dtDate) {
        return DateAdd(strInterval, Num, dtDate);
      },
      /**
       * 小时的加法
       * @param {Number} hours 小时
       * @param {Date} date 起始日期
       */
      addHour: function (hours, date) {
        return DateAdd('h', hours, date);
      },
      /**
       * 分的加法
       * @param {Number} minutes 分
       * @param {Date} date 起始日期
       */
      addMinute: function (minutes, date) {
        return DateAdd('n', minutes, date);
      },
      /**
       * 秒的加法
       * @param {Number} seconds 秒
       * @param {Date} date 起始日期
       */
      addSecond: function (seconds, date) {
        return DateAdd('s', seconds, date);
      },
      /**
       * 天的加法
       * @param {Number} days 天数
       * @param {Date} date 起始日期
       */
      addDay: function (days, date) {
        return DateAdd('d', days, date);
      },
      /**
       * 增加周
       * @param {Number} weeks 周数
       * @param {Date} date  起始日期
       */
      addWeek: function (weeks, date) {
        return DateAdd('w', weeks, date);
      },
      /**
       * 增加月
       * @param {Number} months 月数
       * @param {Date} date  起始日期
       */
      addMonths: function (months, date) {
        return DateAdd('m', months, date);
      },
      /**
       * 增加年
       * @param {Number} years 年数
       * @param {Date} date  起始日期
       */
      addYear: function (years, date) {
        return DateAdd('y', years, date);
      },
      /**
       * 日期是否相等，忽略时间
       * @param  {Date}  d1 日期对象
       * @param  {Date}  d2 日期对象
       * @return {Boolean}  是否相等
       */
      isDateEquals: function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
      },
      /**
       * 日期时间是否相等，包含时间
       * @param  {Date}  d1 日期对象
       * @param  {Date}  d2 日期对象
       * @return {Boolean}  是否相等
       */
      isEquals: function (d1, d2) {
        if (d1 == d2) {
          return true;
        }
        if (!d1 || !d2) {
          return false;
        }
        if (!d1.getTime || !d2.getTime) {
          return false;
        }
        return d1.getTime() == d2.getTime();
      },
      /**
       * 字符串是否是有效的日期类型
       * @param {String} str 字符串
       * @return 字符串是否能转换成日期
       */
      isDateString: function (str) {
        return dateRegex.test(str);
      },
      /**
       * 将日期格式化成字符串
       * @param  {Date} date 日期
       * @param  {String} mask 格式化方式
       * @param  {Date} utc  是否utc时间
       * @return {String}    日期的字符串
       */
      format: function (date, mask, utc) {
        return dateFormat(date, mask, utc);
      },
      /**
       * 转换成日期
       * @param  {String|Date} date 字符串或者日期
       * @return {Date}    日期对象
       */
      parse: function (date) {
        if (typeof date === 'string') {
          date = date.replace(/-/g, '/');
        }
        return dateParse(date);
      },
      /**
       * 当前天
       * @return {Date} 当前天 00:00:00
       */
      today: function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      },
      /**
       * 返回当前日期
       * @return {Date} 日期的 00:00:00
       */
      getDate: function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
    };
  exports = DateUtil;
  return exports;
}();
achart_util_110_index_debug = function (exports) {
  var achartUtil = achart_util_110_src_util_debug;
  exports = achartUtil;
  return exports;
}();
achart_raphael_102_src_core_debug = function (exports) {
  achart_raphael_102_src_eve_debug;
  (function (glob, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['eve'], function (eve) {
        return factory(glob, eve);
      });
    } else {
      factory(glob, glob.eve);
    }
  }(this, function (window, eve) {
    function R(first) {
      if (R.is(first, 'function')) {
        return loaded ? first() : eve.on('raphael.DOMload', first);
      } else if (R.is(first, array)) {
        return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
      } else {
        var args = Array.prototype.slice.call(arguments, 0);
        if (R.is(args[args.length - 1], 'function')) {
          var f = args.pop();
          return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on('raphael.DOMload', function () {
            f.call(R._engine.create[apply](R, args));
          });
        } else {
          return R._engine.create[apply](R, arguments);
        }
      }
    }
    R.version = '2.1.2';
    R.eve = eve;
    var loaded, separator = /[, ]+/, elements = {
        circle: 1,
        rect: 1,
        path: 1,
        ellipse: 1,
        text: 1,
        image: 1
      }, formatrg = /\{(\d+)\}/g, proto = 'prototype', has = 'hasOwnProperty', g = {
        doc: document,
        win: window
      }, oldRaphael = {
        was: Object.prototype[has].call(g.win, 'Raphael'),
        is: g.win.Raphael
      }, Paper = function () {
        this.ca = this.customAttributes = {};
      }, paperproto, appendChild = 'appendChild', apply = 'apply', concat = 'concat', supportsTouch = 'ontouchstart' in g.win || g.win.DocumentTouch && g.doc instanceof DocumentTouch, E = '', S = ' ', Str = String, split = 'split', events = 'click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel'[split](S), touchMap = {
        mousedown: 'touchstart',
        mousemove: 'touchmove',
        mouseup: 'touchend'
      }, lowerCase = Str.prototype.toLowerCase, math = Math, mmax = math.max, mmin = math.min, abs = math.abs, pow = math.pow, PI = math.PI, nu = 'number', string = 'string', array = 'array', toString = 'toString', fillString = 'fill', objectToString = Object.prototype.toString, paper = {}, push = 'push', ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, isnan = {
        'NaN': 1,
        'Infinity': 1,
        '-Infinity': 1
      }, bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, round = math.round, setAttribute = 'setAttribute', toFloat = parseFloat, toInt = parseInt, upperCase = Str.prototype.toUpperCase, availableAttrs = R._availableAttrs = {
        'arrow-end': 'none',
        'arrow-start': 'none',
        blur: 0,
        'clip-rect': '0 0 1e9 1e9',
        'clip-angle': '0 0 1e9 1e9',
        'clip-circle': '0 0 1e9',
        cursor: 'default',
        cx: 0,
        cy: 0,
        fill: '#fff',
        'fill-opacity': 1,
        font: '10px "Arial"',
        'font-family': '"Arial"',
        'font-size': '10',
        'font-style': 'normal',
        'font-weight': 400,
        gradient: 0,
        height: 0,
        href: 'http://raphaeljs.com/',
        'letter-spacing': 0,
        opacity: 1,
        path: 'M0,0',
        r: 0,
        rx: 0,
        ry: 0,
        src: '',
        stroke: '#000',
        'stroke-dasharray': '',
        'stroke-linecap': 'butt',
        'stroke-linejoin': 'butt',
        'stroke-miterlimit': 0,
        'stroke-opacity': 1,
        'stroke-width': 1,
        target: '_blank',
        'text-anchor': 'middle',
        title: 'Raphael',
        transform: '',
        width: 0,
        x: 0,
        y: 0
      }, availableAnimAttrs = R._availableAnimAttrs = {
        blur: nu,
        'clip-rect': 'csv',
        'clip-angle': 'csv',
        'clip-circle': 'csv',
        cx: nu,
        cy: nu,
        fill: 'colour',
        'fill-opacity': nu,
        'font-size': nu,
        height: nu,
        opacity: nu,
        path: 'path',
        r: nu,
        rx: nu,
        ry: nu,
        stroke: 'colour',
        'stroke-opacity': nu,
        'stroke-width': nu,
        transform: 'transform',
        width: nu,
        x: nu,
        y: nu
      }, whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, hsrg = {
        hs: 1,
        rg: 1
      }, p2s = /,?([achlmqrstvxz]),?/gi, pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, eldata = {}, sortByKey = function (a, b) {
        return a.key - b.key;
      }, sortByNumber = function (a, b) {
        return toFloat(a) - toFloat(b);
      }, fun = function () {
      }, pipe = function (x) {
        return x;
      }, rectPath = R._rectPath = function (x, y, w, h, r) {
        if (r) {
          return [
            [
              'M',
              x + r,
              y
            ],
            [
              'l',
              w - r * 2,
              0
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              r,
              r
            ],
            [
              'l',
              0,
              h - r * 2
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              -r,
              r
            ],
            [
              'l',
              r * 2 - w,
              0
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              -r,
              -r
            ],
            [
              'l',
              0,
              r * 2 - h
            ],
            [
              'a',
              r,
              r,
              0,
              0,
              1,
              r,
              -r
            ],
            ['z']
          ];
        }
        return [
          [
            'M',
            x,
            y
          ],
          [
            'l',
            w,
            0
          ],
          [
            'l',
            0,
            h
          ],
          [
            'l',
            -w,
            0
          ],
          ['z']
        ];
      }, ellipsePath = function (x, y, rx, ry) {
        if (ry == null) {
          ry = rx;
        }
        return [
          [
            'M',
            x,
            y
          ],
          [
            'm',
            0,
            -ry
          ],
          [
            'a',
            rx,
            ry,
            0,
            1,
            1,
            0,
            2 * ry
          ],
          [
            'a',
            rx,
            ry,
            0,
            1,
            1,
            0,
            -2 * ry
          ],
          ['z']
        ];
      }, getPath = R._getPath = {
        path: function (el) {
          return el.attr('path');
        },
        circle: function (el) {
          var a = el.attrs;
          return ellipsePath(a.cx, a.cy, a.r);
        },
        ellipse: function (el) {
          var a = el.attrs;
          return ellipsePath(a.cx, a.cy, a.rx, a.ry);
        },
        rect: function (el) {
          var a = el.attrs;
          return rectPath(a.x, a.y, a.width, a.height, a.r);
        },
        image: function (el) {
          var a = el.attrs;
          return rectPath(a.x, a.y, a.width, a.height);
        },
        text: function (el) {
          var bbox = el._getBBox();
          return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
        },
        set: function (el) {
          var bbox = el._getBBox();
          return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
        }
      }, mapPath = R.mapPath = function (path, matrix) {
        if (!matrix) {
          return path;
        }
        var x, y, i, j, ii, jj, pathi;
        path = path2curve(path);
        for (i = 0, ii = path.length; i < ii; i++) {
          pathi = path[i];
          for (j = 1, jj = pathi.length; j < jj; j += 2) {
            x = matrix.x(pathi[j], pathi[j + 1]);
            y = matrix.y(pathi[j], pathi[j + 1]);
            pathi[j] = x;
            pathi[j + 1] = y;
          }
        }
        return path;
      };
    R._g = g;
    R.type = g.win.SVGAngle || g.doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') ? 'SVG' : 'VML';
    if (R.type == 'VML') {
      var d = g.doc.createElement('div'), b;
      d.innerHTML = '<v:shape adj="1"/>';
      b = d.firstChild;
      b.style.behavior = 'url(#default#VML)';
      if (!(b && typeof b.adj == 'object')) {
        return R.type = E;
      }
      d = null;
    }
    R.svg = !(R.vml = R.type == 'VML');
    R._Paper = Paper;
    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;
    R.is = function (o, type) {
      type = lowerCase.call(type);
      if (type == 'finite') {
        return !isnan[has](+o);
      }
      if (type == 'array') {
        return o instanceof Array;
      }
      return type == 'null' && o === null || type == typeof o && o !== null || type == 'object' && o === Object(o) || type == 'array' && Array.isArray && Array.isArray(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };
    function clone(obj) {
      if (typeof obj == 'function' || Object(obj) !== obj) {
        return obj;
      }
      var res = new obj.constructor();
      for (var key in obj)
        if (obj[has](key)) {
          res[key] = clone(obj[key]);
        }
      return res;
    }
    R.angle = function (x1, y1, x2, y2, x3, y3) {
      if (x3 == null) {
        var x = x1 - x2, y = y1 - y2;
        if (!x && !y) {
          return 0;
        }
        return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
      } else {
        return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
      }
    };
    R.rad = function (deg) {
      return deg % 360 * PI / 180;
    };
    R.deg = function (rad) {
      return rad * 180 / PI % 360;
    };
    R.snapTo = function (values, value, tolerance) {
      tolerance = R.is(tolerance, 'finite') ? tolerance : 10;
      if (R.is(values, array)) {
        var i = values.length;
        while (i--)
          if (abs(values[i] - value) <= tolerance) {
            return values[i];
          }
      } else {
        values = +values;
        var rem = value % values;
        if (rem < tolerance) {
          return value - rem;
        }
        if (rem > values - tolerance) {
          return value - rem + values;
        }
      }
      return value;
    };
    var createUUID = R.createUUID = function (uuidRegEx, uuidReplacer) {
        return function () {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
      }(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
        return v.toString(16);
      });
    R.setWindow = function (newwin) {
      eve('raphael.setWindow', R, g.win, newwin);
      g.win = newwin;
      g.doc = g.win.document;
      if (R._engine.initWin) {
        R._engine.initWin(g.win);
      }
    };
    var toHex = function (color) {
        if (R.vml) {
          var trim = /^\s+|\s+$/g;
          var bod;
          try {
            var docum = new ActiveXObject('htmlfile');
            docum.write('<body>');
            docum.close();
            bod = docum.body;
          } catch (e) {
            bod = createPopup().document.body;
          }
          var range = bod.createTextRange();
          toHex = cacher(function (color) {
            try {
              bod.style.color = Str(color).replace(trim, E);
              var value = range.queryCommandValue('ForeColor');
              value = (value & 255) << 16 | value & 65280 | (value & 16711680) >>> 16;
              return '#' + ('000000' + value.toString(16)).slice(-6);
            } catch (e) {
              return 'none';
            }
          });
        } else {
          var i = g.doc.createElement('i');
          i.title = 'Rapha\xEBl Colour Picker';
          i.style.display = 'none';
          g.doc.body.appendChild(i);
          toHex = cacher(function (color) {
            i.style.color = color;
            return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue('color');
          });
        }
        return toHex(color);
      }, hsbtoString = function () {
        return 'hsb(' + [
          this.h,
          this.s,
          this.b
        ] + ')';
      }, hsltoString = function () {
        return 'hsl(' + [
          this.h,
          this.s,
          this.l
        ] + ')';
      }, rgbtoString = function () {
        return this.hex;
      }, prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, 'object') && 'r' in r && 'g' in r && 'b' in r) {
          b = r.b;
          g = r.g;
          r = r.r;
        }
        if (g == null && R.is(r, string)) {
          var clr = R.getRGB(r);
          r = clr.r;
          g = clr.g;
          b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
          r /= 255;
          g /= 255;
          b /= 255;
        }
        return [
          r,
          g,
          b
        ];
      }, packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
          };
        R.is(o, 'finite') && (rgb.opacity = o);
        return rgb;
      };
    R.color = function (clr) {
      var rgb;
      if (R.is(clr, 'object') && 'h' in clr && 's' in clr && 'b' in clr) {
        rgb = R.hsb2rgb(clr);
        clr.r = rgb.r;
        clr.g = rgb.g;
        clr.b = rgb.b;
        clr.hex = rgb.hex;
      } else if (R.is(clr, 'object') && 'h' in clr && 's' in clr && 'l' in clr) {
        rgb = R.hsl2rgb(clr);
        clr.r = rgb.r;
        clr.g = rgb.g;
        clr.b = rgb.b;
        clr.hex = rgb.hex;
      } else {
        if (R.is(clr, 'string')) {
          clr = R.getRGB(clr);
        }
        if (R.is(clr, 'object') && 'r' in clr && 'g' in clr && 'b' in clr) {
          rgb = R.rgb2hsl(clr);
          clr.h = rgb.h;
          clr.s = rgb.s;
          clr.l = rgb.l;
          rgb = R.rgb2hsb(clr);
          clr.v = rgb.b;
        } else {
          clr = { hex: 'none' };
          clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
        }
      }
      clr.toString = rgbtoString;
      return clr;
    };
    R.hsb2rgb = function (h, s, v, o) {
      if (this.is(h, 'object') && 'h' in h && 's' in h && 'b' in h) {
        v = h.b;
        s = h.s;
        h = h.h;
        o = h.o;
      }
      h *= 360;
      var R, G, B, X, C;
      h = h % 360 / 60;
      C = v * s;
      X = C * (1 - abs(h % 2 - 1));
      R = G = B = v - C;
      h = ~~h;
      R += [
        C,
        X,
        0,
        0,
        X,
        C
      ][h];
      G += [
        X,
        C,
        C,
        X,
        0,
        0
      ][h];
      B += [
        0,
        0,
        X,
        C,
        C,
        X
      ][h];
      return packageRGB(R, G, B, o);
    };
    R.hsl2rgb = function (h, s, l, o) {
      if (this.is(h, 'object') && 'h' in h && 's' in h && 'l' in h) {
        l = h.l;
        s = h.s;
        h = h.h;
      }
      if (h > 1 || s > 1 || l > 1) {
        h /= 360;
        s /= 100;
        l /= 100;
      }
      h *= 360;
      var R, G, B, X, C;
      h = h % 360 / 60;
      C = 2 * s * (l < 0.5 ? l : 1 - l);
      X = C * (1 - abs(h % 2 - 1));
      R = G = B = l - C / 2;
      h = ~~h;
      R += [
        C,
        X,
        0,
        0,
        X,
        C
      ][h];
      G += [
        X,
        C,
        C,
        X,
        0,
        0
      ][h];
      B += [
        0,
        0,
        X,
        C,
        C,
        X
      ][h];
      return packageRGB(R, G, B, o);
    };
    R.rgb2hsb = function (r, g, b) {
      b = prepareRGB(r, g, b);
      r = b[0];
      g = b[1];
      b = b[2];
      var H, S, V, C;
      V = mmax(r, g, b);
      C = V - mmin(r, g, b);
      H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
      H = (H + 360) % 6 * 60 / 360;
      S = C == 0 ? 0 : C / V;
      return {
        h: H,
        s: S,
        b: V,
        toString: hsbtoString
      };
    };
    R.rgb2hsl = function (r, g, b) {
      b = prepareRGB(r, g, b);
      r = b[0];
      g = b[1];
      b = b[2];
      var H, S, L, M, m, C;
      M = mmax(r, g, b);
      m = mmin(r, g, b);
      C = M - m;
      H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
      H = (H + 360) % 6 * 60 / 360;
      L = (M + m) / 2;
      S = C == 0 ? 0 : L < 0.5 ? C / (2 * L) : C / (2 - 2 * L);
      return {
        h: H,
        s: S,
        l: L,
        toString: hsltoString
      };
    };
    R._path2string = function () {
      return this.join(',').replace(p2s, '$1');
    };
    function repush(array, item) {
      for (var i = 0, ii = array.length; i < ii; i++)
        if (array[i] === item) {
          return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
      function newf() {
        var arg = Array.prototype.slice.call(arguments, 0), args = arg.join('\u2400'), cache = newf.cache = newf.cache || {}, count = newf.count = newf.count || [];
        if (cache[has](args)) {
          repush(count, args);
          return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        count.length >= 1000 && delete cache[count.shift()];
        count.push(args);
        cache[args] = f[apply](scope, arg);
        return postprocessor ? postprocessor(cache[args]) : cache[args];
      }
      return newf;
    }
    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement('img');
        img.style.cssText = 'position:absolute;left:-9999em;top:-9999em';
        img.onload = function () {
          f.call(this);
          this.onload = null;
          g.doc.body.removeChild(this);
        };
        img.onerror = function () {
          g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
      };
    function clrToString() {
      return this.hex;
    }
    R.getRGB = cacher(function (colour) {
      if (!colour || !!((colour = Str(colour)).indexOf('-') + 1)) {
        return {
          r: -1,
          g: -1,
          b: -1,
          hex: 'none',
          error: 1,
          toString: clrToString
        };
      }
      if (colour == 'none') {
        return {
          r: -1,
          g: -1,
          b: -1,
          hex: 'none',
          toString: clrToString
        };
      }
      !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == '#') && (colour = toHex(colour));
      var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
      if (rgb) {
        if (rgb[2]) {
          blue = toInt(rgb[2].substring(5), 16);
          green = toInt(rgb[2].substring(3, 5), 16);
          red = toInt(rgb[2].substring(1, 3), 16);
        }
        if (rgb[3]) {
          blue = toInt((t = rgb[3].charAt(3)) + t, 16);
          green = toInt((t = rgb[3].charAt(2)) + t, 16);
          red = toInt((t = rgb[3].charAt(1)) + t, 16);
        }
        if (rgb[4]) {
          values = rgb[4][split](commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == '%' && (red *= 2.55);
          green = toFloat(values[1]);
          values[1].slice(-1) == '%' && (green *= 2.55);
          blue = toFloat(values[2]);
          values[2].slice(-1) == '%' && (blue *= 2.55);
          rgb[1].toLowerCase().slice(0, 4) == 'rgba' && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == '%' && (opacity /= 100);
        }
        if (rgb[5]) {
          values = rgb[5][split](commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == '%' && (red *= 2.55);
          green = toFloat(values[1]);
          values[1].slice(-1) == '%' && (green *= 2.55);
          blue = toFloat(values[2]);
          values[2].slice(-1) == '%' && (blue *= 2.55);
          (values[0].slice(-3) == 'deg' || values[0].slice(-1) == '\xB0') && (red /= 360);
          rgb[1].toLowerCase().slice(0, 4) == 'hsba' && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == '%' && (opacity /= 100);
          return R.hsb2rgb(red, green, blue, opacity);
        }
        if (rgb[6]) {
          values = rgb[6][split](commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == '%' && (red *= 2.55);
          green = toFloat(values[1]);
          values[1].slice(-1) == '%' && (green *= 2.55);
          blue = toFloat(values[2]);
          values[2].slice(-1) == '%' && (blue *= 2.55);
          (values[0].slice(-3) == 'deg' || values[0].slice(-1) == '\xB0') && (red /= 360);
          rgb[1].toLowerCase().slice(0, 4) == 'hsla' && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == '%' && (opacity /= 100);
          return R.hsl2rgb(red, green, blue, opacity);
        }
        rgb = {
          r: red,
          g: green,
          b: blue,
          toString: clrToString
        };
        rgb.hex = '#' + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
        R.is(opacity, 'finite') && (rgb.opacity = opacity);
        return rgb;
      }
      return {
        r: -1,
        g: -1,
        b: -1,
        hex: 'none',
        error: 1,
        toString: clrToString
      };
    }, R);
    R.hsb = cacher(function (h, s, b) {
      return R.hsb2rgb(h, s, b).hex;
    });
    R.hsl = cacher(function (h, s, l) {
      return R.hsl2rgb(h, s, l).hex;
    });
    R.rgb = cacher(function (r, g, b) {
      return '#' + (16777216 | b | g << 8 | r << 16).toString(16).slice(1);
    });
    R.getColor = function (value) {
      var start = this.getColor.start = this.getColor.start || {
          h: 0,
          s: 1,
          b: value || 0.75
        }, rgb = this.hsb2rgb(start.h, start.s, start.b);
      start.h += 0.075;
      if (start.h > 1) {
        start.h = 0;
        start.s -= 0.2;
        start.s <= 0 && (this.getColor.start = {
          h: 0,
          s: 1,
          b: start.b
        });
      }
      return rgb.hex;
    };
    R.getColor.reset = function () {
      delete this.start;
    };
    function catmullRom2bezier(crp, z) {
      var d = [];
      for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
        var p = [
            {
              x: +crp[i - 2],
              y: +crp[i - 1]
            },
            {
              x: +crp[i],
              y: +crp[i + 1]
            },
            {
              x: +crp[i + 2],
              y: +crp[i + 3]
            },
            {
              x: +crp[i + 4],
              y: +crp[i + 5]
            }
          ];
        if (z) {
          if (!i) {
            p[0] = {
              x: +crp[iLen - 2],
              y: +crp[iLen - 1]
            };
          } else if (iLen - 4 == i) {
            p[3] = {
              x: +crp[0],
              y: +crp[1]
            };
          } else if (iLen - 2 == i) {
            p[2] = {
              x: +crp[0],
              y: +crp[1]
            };
            p[3] = {
              x: +crp[2],
              y: +crp[3]
            };
          }
        } else {
          if (iLen - 4 == i) {
            p[3] = p[2];
          } else if (!i) {
            p[0] = {
              x: +crp[i],
              y: +crp[i + 1]
            };
          }
        }
        d.push([
          'C',
          (-p[0].x + 6 * p[1].x + p[2].x) / 6,
          (-p[0].y + 6 * p[1].y + p[2].y) / 6,
          (p[1].x + 6 * p[2].x - p[3].x) / 6,
          (p[1].y + 6 * p[2].y - p[3].y) / 6,
          p[2].x,
          p[2].y
        ]);
      }
      return d;
    }
    R.parsePathString = function (pathString) {
      if (!pathString) {
        return null;
      }
      var pth = paths(pathString);
      if (pth.arr) {
        return pathClone(pth.arr);
      }
      var paramCounts = {
          a: 7,
          c: 6,
          h: 1,
          l: 2,
          m: 2,
          r: 4,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          z: 0
        }, data = [];
      if (R.is(pathString, array) && R.is(pathString[0], array)) {
        data = pathClone(pathString);
      }
      if (!data.length) {
        Str(pathString).replace(pathCommand, function (a, b, c) {
          var params = [], name = b.toLowerCase();
          c.replace(pathValues, function (a, b) {
            b && params.push(+b);
          });
          if (name == 'm' && params.length > 2) {
            data.push([b][concat](params.splice(0, 2)));
            name = 'l';
            b = b == 'm' ? 'l' : 'L';
          }
          if (name == 'r') {
            data.push([b][concat](params));
          } else
            while (params.length >= paramCounts[name]) {
              data.push([b][concat](params.splice(0, paramCounts[name])));
              if (!paramCounts[name]) {
                break;
              }
            }
        });
      }
      data.toString = R._path2string;
      pth.arr = pathClone(data);
      return data;
    };
    R.parseTransformString = cacher(function (TString) {
      if (!TString) {
        return null;
      }
      var paramCounts = {
          r: 3,
          s: 4,
          t: 2,
          m: 6
        }, data = [];
      if (R.is(TString, array) && R.is(TString[0], array)) {
        data = pathClone(TString);
      }
      if (!data.length) {
        Str(TString).replace(tCommand, function (a, b, c) {
          var params = [], name = lowerCase.call(b);
          c.replace(pathValues, function (a, b) {
            b && params.push(+b);
          });
          data.push([b][concat](params));
        });
      }
      data.toString = R._path2string;
      return data;
    });
    var paths = function (ps) {
      var p = paths.ps = paths.ps || {};
      if (p[ps]) {
        p[ps].sleep = 100;
      } else {
        p[ps] = { sleep: 100 };
      }
      setTimeout(function () {
        for (var key in p)
          if (p[has](key) && key != ps) {
            p[key].sleep--;
            !p[key].sleep && delete p[key];
          }
      });
      return p[ps];
    };
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
      var t1 = 1 - t, t13 = pow(t1, 3), t12 = pow(t1, 2), t2 = t * t, t3 = t2 * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y, mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x), my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y), nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x), ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y), ax = t1 * p1x + t * c1x, ay = t1 * p1y + t * c1y, cx = t1 * c2x + t * p2x, cy = t1 * c2y + t * p2y, alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
      (mx > nx || my < ny) && (alpha += 180);
      return {
        x: x,
        y: y,
        m: {
          x: mx,
          y: my
        },
        n: {
          x: nx,
          y: ny
        },
        start: {
          x: ax,
          y: ay
        },
        end: {
          x: cx,
          y: cy
        },
        alpha: alpha
      };
    };
    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
      if (!R.is(p1x, 'array')) {
        p1x = [
          p1x,
          p1y,
          c1x,
          c1y,
          c2x,
          c2y,
          p2x,
          p2y
        ];
      }
      var bbox = curveDim.apply(null, p1x);
      return {
        x: bbox.min.x,
        y: bbox.min.y,
        x2: bbox.max.x,
        y2: bbox.max.y,
        width: bbox.max.x - bbox.min.x,
        height: bbox.max.y - bbox.min.y
      };
    };
    R.isPointInsideBBox = function (bbox, x, y) {
      return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };
    R.isBBoxIntersect = function (bbox1, bbox2) {
      var i = R.isPointInsideBBox;
      return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
      var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4, t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
      return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
      if (z == null) {
        z = 1;
      }
      z = z > 1 ? 1 : z < 0 ? 0 : z;
      var z2 = z / 2, n = 12, Tvalues = [
          -0.1252,
          0.1252,
          -0.3678,
          0.3678,
          -0.5873,
          0.5873,
          -0.7699,
          0.7699,
          -0.9041,
          0.9041,
          -0.9816,
          0.9816
        ], Cvalues = [
          0.2491,
          0.2491,
          0.2335,
          0.2335,
          0.2032,
          0.2032,
          0.1601,
          0.1601,
          0.1069,
          0.1069,
          0.0472,
          0.0472
        ], sum = 0;
      for (var i = 0; i < n; i++) {
        var ct = z2 * Tvalues[i] + z2, xbase = base3(ct, x1, x2, x3, x4), ybase = base3(ct, y1, y2, y3, y4), comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * math.sqrt(comb);
      }
      return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
      if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
        return;
      }
      var t = 1, step = t / 2, t2 = t - step, l, e = 0.01;
      l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
      while (abs(l - ll) > e) {
        step /= 2;
        t2 += (l < ll ? 1 : -1) * step;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
      }
      return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
      if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
        return;
      }
      var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (!denominator) {
        return;
      }
      var px = nx / denominator, py = ny / denominator, px2 = +px.toFixed(2), py2 = +py.toFixed(2);
      if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
        return;
      }
      return {
        x: px,
        y: py
      };
    }
    function inter(bez1, bez2) {
      return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
      return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
      var bbox1 = R.bezierBBox(bez1), bbox2 = R.bezierBBox(bez2);
      if (!R.isBBoxIntersect(bbox1, bbox2)) {
        return justCount ? 0 : [];
      }
      var l1 = bezlen.apply(0, bez1), l2 = bezlen.apply(0, bez2), n1 = mmax(~~(l1 / 5), 1), n2 = mmax(~~(l2 / 5), 1), dots1 = [], dots2 = [], xy = {}, res = justCount ? 0 : [];
      for (var i = 0; i < n1 + 1; i++) {
        var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
        dots1.push({
          x: p.x,
          y: p.y,
          t: i / n1
        });
      }
      for (i = 0; i < n2 + 1; i++) {
        p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
        dots2.push({
          x: p.x,
          y: p.y,
          t: i / n2
        });
      }
      for (i = 0; i < n1; i++) {
        for (var j = 0; j < n2; j++) {
          var di = dots1[i], di1 = dots1[i + 1], dj = dots2[j], dj1 = dots2[j + 1], ci = abs(di1.x - di.x) < 0.001 ? 'y' : 'x', cj = abs(dj1.x - dj.x) < 0.001 ? 'y' : 'x', is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
          if (is) {
            if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
              continue;
            }
            xy[is.x.toFixed(4)] = is.y.toFixed(4);
            var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t), t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
            if (t1 >= 0 && t1 <= 1.001 && t2 >= 0 && t2 <= 1.001) {
              if (justCount) {
                res++;
              } else {
                res.push({
                  x: is.x,
                  y: is.y,
                  t1: mmin(t1, 1),
                  t2: mmin(t2, 1)
                });
              }
            }
          }
        }
      }
      return res;
    }
    R.pathIntersection = function (path1, path2) {
      return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
      return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
      path1 = R._path2curve(path1);
      path2 = R._path2curve(path2);
      var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
      for (var i = 0, ii = path1.length; i < ii; i++) {
        var pi = path1[i];
        if (pi[0] == 'M') {
          x1 = x1m = pi[1];
          y1 = y1m = pi[2];
        } else {
          if (pi[0] == 'C') {
            bez1 = [
              x1,
              y1
            ].concat(pi.slice(1));
            x1 = bez1[6];
            y1 = bez1[7];
          } else {
            bez1 = [
              x1,
              y1,
              x1,
              y1,
              x1m,
              y1m,
              x1m,
              y1m
            ];
            x1 = x1m;
            y1 = y1m;
          }
          for (var j = 0, jj = path2.length; j < jj; j++) {
            var pj = path2[j];
            if (pj[0] == 'M') {
              x2 = x2m = pj[1];
              y2 = y2m = pj[2];
            } else {
              if (pj[0] == 'C') {
                bez2 = [
                  x2,
                  y2
                ].concat(pj.slice(1));
                x2 = bez2[6];
                y2 = bez2[7];
              } else {
                bez2 = [
                  x2,
                  y2,
                  x2,
                  y2,
                  x2m,
                  y2m,
                  x2m,
                  y2m
                ];
                x2 = x2m;
                y2 = y2m;
              }
              var intr = interHelper(bez1, bez2, justCount);
              if (justCount) {
                res += intr;
              } else {
                for (var k = 0, kk = intr.length; k < kk; k++) {
                  intr[k].segment1 = i;
                  intr[k].segment2 = j;
                  intr[k].bez1 = bez1;
                  intr[k].bez2 = bez2;
                }
                res = res.concat(intr);
              }
            }
          }
        }
      }
      return res;
    }
    R.isPointInsidePath = function (path, x, y) {
      var bbox = R.pathBBox(path);
      return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [
        [
          'M',
          x,
          y
        ],
        [
          'H',
          bbox.x2 + 10
        ]
      ], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
      return function () {
        eve('raphael.log', null, 'Rapha\xEBl: you are calling to method \u201C' + methodname + '\u201D of removed object', methodname);
      };
    };
    var pathDimensions = R.pathBBox = function (path) {
        var pth = paths(path);
        if (pth.bbox) {
          return clone(pth.bbox);
        }
        if (!path) {
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            x2: 0,
            y2: 0
          };
        }
        path = path2curve(path);
        var x = 0, y = 0, X = [], Y = [], p;
        for (var i = 0, ii = path.length; i < ii; i++) {
          p = path[i];
          if (p[0] == 'M') {
            x = p[1];
            y = p[2];
            X.push(x);
            Y.push(y);
          } else {
            var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
            X = X[concat](dim.min.x, dim.max.x);
            Y = Y[concat](dim.min.y, dim.max.y);
            x = p[5];
            y = p[6];
          }
        }
        var xmin = mmin[apply](0, X), ymin = mmin[apply](0, Y), xmax = mmax[apply](0, X), ymax = mmax[apply](0, Y), width = xmax - xmin, height = ymax - ymin, bb = {
            x: xmin,
            y: ymin,
            x2: xmax,
            y2: ymax,
            width: width,
            height: height,
            cx: xmin + width / 2,
            cy: ymin + height / 2
          };
        pth.bbox = clone(bb);
        return bb;
      }, pathClone = function (pathArray) {
        var res = clone(pathArray);
        res.toString = R._path2string;
        return res;
      }, pathToRelative = R._pathToRelative = function (pathArray) {
        var pth = paths(pathArray);
        if (pth.rel) {
          return pathClone(pth.rel);
        }
        if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
          pathArray = R.parsePathString(pathArray);
        }
        var res = [], x = 0, y = 0, mx = 0, my = 0, start = 0;
        if (pathArray[0][0] == 'M') {
          x = pathArray[0][1];
          y = pathArray[0][2];
          mx = x;
          my = y;
          start++;
          res.push([
            'M',
            x,
            y
          ]);
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
          var r = res[i] = [], pa = pathArray[i];
          if (pa[0] != lowerCase.call(pa[0])) {
            r[0] = lowerCase.call(pa[0]);
            switch (r[0]) {
            case 'a':
              r[1] = pa[1];
              r[2] = pa[2];
              r[3] = pa[3];
              r[4] = pa[4];
              r[5] = pa[5];
              r[6] = +(pa[6] - x).toFixed(3);
              r[7] = +(pa[7] - y).toFixed(3);
              break;
            case 'v':
              r[1] = +(pa[1] - y).toFixed(3);
              break;
            case 'm':
              mx = pa[1];
              my = pa[2];
            default:
              for (var j = 1, jj = pa.length; j < jj; j++) {
                r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
              }
            }
          } else {
            r = res[i] = [];
            if (pa[0] == 'm') {
              mx = pa[1] + x;
              my = pa[2] + y;
            }
            for (var k = 0, kk = pa.length; k < kk; k++) {
              res[i][k] = pa[k];
            }
          }
          var len = res[i].length;
          switch (res[i][0]) {
          case 'z':
            x = mx;
            y = my;
            break;
          case 'h':
            x += +res[i][len - 1];
            break;
          case 'v':
            y += +res[i][len - 1];
            break;
          default:
            x += +res[i][len - 2];
            y += +res[i][len - 1];
          }
        }
        res.toString = R._path2string;
        pth.rel = pathClone(res);
        return res;
      }, pathToAbsolute = R._pathToAbsolute = function (pathArray) {
        var pth = paths(pathArray);
        if (pth.abs) {
          return pathClone(pth.abs);
        }
        if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
          pathArray = R.parsePathString(pathArray);
        }
        if (!pathArray || !pathArray.length) {
          return [[
              'M',
              0,
              0
            ]];
        }
        var res = [], x = 0, y = 0, mx = 0, my = 0, start = 0;
        if (pathArray[0][0] == 'M') {
          x = +pathArray[0][1];
          y = +pathArray[0][2];
          mx = x;
          my = y;
          start++;
          res[0] = [
            'M',
            x,
            y
          ];
        }
        var crz = pathArray.length == 3 && pathArray[0][0] == 'M' && pathArray[1][0].toUpperCase() == 'R' && pathArray[2][0].toUpperCase() == 'Z';
        for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
          res.push(r = []);
          pa = pathArray[i];
          if (pa[0] != upperCase.call(pa[0])) {
            r[0] = upperCase.call(pa[0]);
            switch (r[0]) {
            case 'A':
              r[1] = pa[1];
              r[2] = pa[2];
              r[3] = pa[3];
              r[4] = pa[4];
              r[5] = pa[5];
              r[6] = +(pa[6] + x);
              r[7] = +(pa[7] + y);
              break;
            case 'V':
              r[1] = +pa[1] + y;
              break;
            case 'H':
              r[1] = +pa[1] + x;
              break;
            case 'R':
              var dots = [
                  x,
                  y
                ][concat](pa.slice(1));
              for (var j = 2, jj = dots.length; j < jj; j++) {
                dots[j] = +dots[j] + x;
                dots[++j] = +dots[j] + y;
              }
              res.pop();
              res = res[concat](catmullRom2bezier(dots, crz));
              break;
            case 'M':
              mx = +pa[1] + x;
              my = +pa[2] + y;
            default:
              for (j = 1, jj = pa.length; j < jj; j++) {
                r[j] = +pa[j] + (j % 2 ? x : y);
              }
            }
          } else if (pa[0] == 'R') {
            dots = [
              x,
              y
            ][concat](pa.slice(1));
            res.pop();
            res = res[concat](catmullRom2bezier(dots, crz));
            r = ['R'][concat](pa.slice(-2));
          } else {
            for (var k = 0, kk = pa.length; k < kk; k++) {
              r[k] = pa[k];
            }
          }
          switch (r[0]) {
          case 'Z':
            x = mx;
            y = my;
            break;
          case 'H':
            x = r[1];
            break;
          case 'V':
            y = r[1];
            break;
          case 'M':
            mx = r[r.length - 2];
            my = r[r.length - 1];
          default:
            x = r[r.length - 2];
            y = r[r.length - 1];
          }
        }
        res.toString = R._path2string;
        pth.abs = pathClone(res);
        return res;
      }, l2c = function (x1, y1, x2, y2) {
        return [
          x1,
          y1,
          x2,
          y2,
          x2,
          y2
        ];
      }, q2c = function (x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3, _23 = 2 / 3;
        return [
          _13 * x1 + _23 * ax,
          _13 * y1 + _23 * ay,
          _13 * x2 + _23 * ax,
          _13 * y2 + _23 * ay,
          x2,
          y2
        ];
      }, a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        var _120 = PI * 120 / 180, rad = PI / 180 * (+angle || 0), res = [], xy, rotate = cacher(function (x, y, rad) {
            var X = x * math.cos(rad) - y * math.sin(rad), Y = x * math.sin(rad) + y * math.cos(rad);
            return {
              x: X,
              y: Y
            };
          });
        if (!recursive) {
          xy = rotate(x1, y1, -rad);
          x1 = xy.x;
          y1 = xy.y;
          xy = rotate(x2, y2, -rad);
          x2 = xy.x;
          y2 = xy.y;
          var cos = math.cos(PI / 180 * angle), sin = math.sin(PI / 180 * angle), x = (x1 - x2) / 2, y = (y1 - y2) / 2;
          var h = x * x / (rx * rx) + y * y / (ry * ry);
          if (h > 1) {
            h = math.sqrt(h);
            rx = h * rx;
            ry = h * ry;
          }
          var rx2 = rx * rx, ry2 = ry * ry, k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))), cx = k * rx * y / ry + (x1 + x2) / 2, cy = k * -ry * x / rx + (y1 + y2) / 2, f1 = math.asin(((y1 - cy) / ry).toFixed(9)), f2 = math.asin(((y2 - cy) / ry).toFixed(9));
          f1 = x1 < cx ? PI - f1 : f1;
          f2 = x2 < cx ? PI - f2 : f2;
          f1 < 0 && (f1 = PI * 2 + f1);
          f2 < 0 && (f2 = PI * 2 + f2);
          if (sweep_flag && f1 > f2) {
            f1 = f1 - PI * 2;
          }
          if (!sweep_flag && f2 > f1) {
            f2 = f2 - PI * 2;
          }
        } else {
          f1 = recursive[0];
          f2 = recursive[1];
          cx = recursive[2];
          cy = recursive[3];
        }
        var df = f2 - f1;
        if (abs(df) > _120) {
          var f2old = f2, x2old = x2, y2old = y2;
          f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
          x2 = cx + rx * math.cos(f2);
          y2 = cy + ry * math.sin(f2);
          res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [
            f2,
            f2old,
            cx,
            cy
          ]);
        }
        df = f2 - f1;
        var c1 = math.cos(f1), s1 = math.sin(f1), c2 = math.cos(f2), s2 = math.sin(f2), t = math.tan(df / 4), hx = 4 / 3 * rx * t, hy = 4 / 3 * ry * t, m1 = [
            x1,
            y1
          ], m2 = [
            x1 + hx * s1,
            y1 - hy * c1
          ], m3 = [
            x2 + hx * s2,
            y2 - hy * c2
          ], m4 = [
            x2,
            y2
          ];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
          return [
            m2,
            m3,
            m4
          ][concat](res);
        } else {
          res = [
            m2,
            m3,
            m4
          ][concat](res).join()[split](',');
          var newres = [];
          for (var i = 0, ii = res.length; i < ii; i++) {
            newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
          }
          return newres;
        }
      }, findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        return {
          x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
          y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
        };
      }, curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        var a = c2x - 2 * c1x + p1x - (p2x - 2 * c2x + c1x), b = 2 * (c1x - p1x) - 2 * (c2x - c1x), c = p1x - c1x, t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a, t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a, y = [
            p1y,
            p2y
          ], x = [
            p1x,
            p2x
          ], dot;
        abs(t1) > '1e12' && (t1 = 0.5);
        abs(t2) > '1e12' && (t2 = 0.5);
        if (t1 > 0 && t1 < 1) {
          dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
          x.push(dot.x);
          y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
          dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
          x.push(dot.x);
          y.push(dot.y);
        }
        a = c2y - 2 * c1y + p1y - (p2y - 2 * c2y + c1y);
        b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
        c = p1y - c1y;
        t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
        t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
        abs(t1) > '1e12' && (t1 = 0.5);
        abs(t2) > '1e12' && (t2 = 0.5);
        if (t1 > 0 && t1 < 1) {
          dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
          x.push(dot.x);
          y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
          dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
          x.push(dot.x);
          y.push(dot.y);
        }
        return {
          min: {
            x: mmin[apply](0, x),
            y: mmin[apply](0, y)
          },
          max: {
            x: mmax[apply](0, x),
            y: mmax[apply](0, y)
          }
        };
      }), path2curve = R._path2curve = cacher(function (path, path2) {
        var pth = !path2 && paths(path);
        if (!path2 && pth.curve) {
          return pathClone(pth.curve);
        }
        var p = pathToAbsolute(path), p2 = path2 && pathToAbsolute(path2), attrs = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
          }, attrs2 = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
          }, processPath = function (path, d, pcom) {
            var nx, ny;
            if (!path) {
              return [
                'C',
                d.x,
                d.y,
                d.x,
                d.y,
                d.x,
                d.y
              ];
            }
            !(path[0] in {
              T: 1,
              Q: 1
            }) && (d.qx = d.qy = null);
            switch (path[0]) {
            case 'M':
              d.X = path[1];
              d.Y = path[2];
              break;
            case 'A':
              path = ['C'][concat](a2c[apply](0, [
                d.x,
                d.y
              ][concat](path.slice(1))));
              break;
            case 'S':
              if (pcom == 'C' || pcom == 'S') {
                nx = d.x * 2 - d.bx;
                ny = d.y * 2 - d.by;
              } else {
                nx = d.x;
                ny = d.y;
              }
              path = [
                'C',
                nx,
                ny
              ][concat](path.slice(1));
              break;
            case 'T':
              if (pcom == 'Q' || pcom == 'T') {
                d.qx = d.x * 2 - d.qx;
                d.qy = d.y * 2 - d.qy;
              } else {
                d.qx = d.x;
                d.qy = d.y;
              }
              path = ['C'][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
              break;
            case 'Q':
              d.qx = path[1];
              d.qy = path[2];
              path = ['C'][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
              break;
            case 'L':
              path = ['C'][concat](l2c(d.x, d.y, path[1], path[2]));
              break;
            case 'H':
              path = ['C'][concat](l2c(d.x, d.y, path[1], d.y));
              break;
            case 'V':
              path = ['C'][concat](l2c(d.x, d.y, d.x, path[1]));
              break;
            case 'Z':
              path = ['C'][concat](l2c(d.x, d.y, d.X, d.Y));
              break;
            }
            return path;
          }, fixArc = function (pp, i) {
            if (pp[i].length > 7) {
              pp[i].shift();
              var pi = pp[i];
              while (pi.length) {
                pp.splice(i++, 0, ['C'][concat](pi.splice(0, 6)));
              }
              pp.splice(i, 1);
              ii = mmax(p.length, p2 && p2.length || 0);
            }
          }, fixM = function (path1, path2, a1, a2, i) {
            if (path1 && path2 && path1[i][0] == 'M' && path2[i][0] != 'M') {
              path2.splice(i, 0, [
                'M',
                a2.x,
                a2.y
              ]);
              a1.bx = 0;
              a1.by = 0;
              a1.x = path1[i][1];
              a1.y = path1[i][2];
              ii = mmax(p.length, p2 && p2.length || 0);
            }
          };
        for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
          p[i] = processPath(p[i], attrs);
          fixArc(p, i);
          p2 && (p2[i] = processPath(p2[i], attrs2));
          p2 && fixArc(p2, i);
          fixM(p, p2, attrs, attrs2, i);
          fixM(p2, p, attrs2, attrs, i);
          var seg = p[i], seg2 = p2 && p2[i], seglen = seg.length, seg2len = p2 && seg2.length;
          attrs.x = seg[seglen - 2];
          attrs.y = seg[seglen - 1];
          attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
          attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
          attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
          attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
          attrs2.x = p2 && seg2[seg2len - 2];
          attrs2.y = p2 && seg2[seg2len - 1];
        }
        if (!p2) {
          pth.curve = pathClone(p);
        }
        return p2 ? [
          p,
          p2
        ] : p;
      }, null, pathClone), parseDots = R._parseDots = cacher(function (gradient) {
        var dots = [];
        for (var i = 0, ii = gradient.length; i < ii; i++) {
          var dot = {}, par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
          dot.color = R.getRGB(par[1]);
          if (dot.color.error) {
            return null;
          }
          dot.color = dot.color.hex;
          par[2] && (dot.offset = par[2] + '%');
          dots.push(dot);
        }
        for (i = 1, ii = dots.length - 1; i < ii; i++) {
          if (!dots[i].offset) {
            var start = toFloat(dots[i - 1].offset || 0), end = 0;
            for (var j = i + 1; j < ii; j++) {
              if (dots[j].offset) {
                end = dots[j].offset;
                break;
              }
            }
            if (!end) {
              end = 100;
              j = ii;
            }
            end = toFloat(end);
            var d = (end - start) / (j - i + 1);
            for (; i < j; i++) {
              start += d;
              dots[i].offset = start + '%';
            }
          }
        }
        return dots;
      }), tear = R._tear = function (el, paper) {
        el == paper.top && (paper.top = el.prev);
        el == paper.bottom && (paper.bottom = el.next);
        el.next && (el.next.prev = el.prev);
        el.prev && (el.prev.next = el.next);
      }, tofront = R._tofront = function (el, paper) {
        if (paper.top === el) {
          return;
        }
        tear(el, paper);
        el.next = null;
        el.prev = paper.top;
        paper.top.next = el;
        paper.top = el;
      }, toback = R._toback = function (el, paper) {
        if (paper.bottom === el) {
          return;
        }
        tear(el, paper);
        el.next = paper.bottom;
        el.prev = null;
        paper.bottom.prev = el;
        paper.bottom = el;
      }, insertafter = R._insertafter = function (el, el2, paper) {
        tear(el, paper);
        el2 == paper.top && (paper.top = el);
        el2.next && (el2.next.prev = el);
        el.next = el2.next;
        el.prev = el2;
        el2.next = el;
      }, insertbefore = R._insertbefore = function (el, el2, paper) {
        tear(el, paper);
        el2 == paper.bottom && (paper.bottom = el);
        el2.prev && (el2.prev.next = el);
        el.prev = el2.prev;
        el2.prev = el;
        el.next = el2;
      }, toMatrix = R.toMatrix = function (path, transform) {
        var bb = pathDimensions(path), el = {
            _: { transform: E },
            getBBox: function () {
              return bb;
            }
          };
        extractTransform(el, transform);
        return el.matrix;
      }, transformPath = R.transformPath = function (path, transform) {
        return mapPath(path, toMatrix(path, transform));
      }, extractTransform = R._extractTransform = function (el, tstr) {
        if (tstr == null) {
          return el._.transform;
        }
        tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
        var tdata = R.parseTransformString(tstr), deg = 0, dx = 0, dy = 0, sx = 1, sy = 1, _ = el._, m = new Matrix();
        _.transform = tdata || [];
        if (tdata) {
          for (var i = 0, ii = tdata.length; i < ii; i++) {
            var t = tdata[i], tlen = t.length, command = Str(t[0]).toLowerCase(), absolute = t[0] != command, inver = absolute ? m.invert() : 0, x1, y1, x2, y2, bb;
            if (command == 't' && tlen == 3) {
              if (absolute) {
                x1 = inver.x(0, 0);
                y1 = inver.y(0, 0);
                x2 = inver.x(t[1], t[2]);
                y2 = inver.y(t[1], t[2]);
                m.translate(x2 - x1, y2 - y1);
              } else {
                m.translate(t[1], t[2]);
              }
            } else if (command == 'r') {
              if (tlen == 2) {
                bb = bb || el.getBBox(1);
                m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                deg += t[1];
              } else if (tlen == 4) {
                if (absolute) {
                  x2 = inver.x(t[2], t[3]);
                  y2 = inver.y(t[2], t[3]);
                  m.rotate(t[1], x2, y2);
                } else {
                  m.rotate(t[1], t[2], t[3]);
                }
                deg += t[1];
              }
            } else if (command == 's') {
              if (tlen == 2 || tlen == 3) {
                bb = bb || el.getBBox(1);
                m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                sx *= t[1];
                sy *= t[tlen - 1];
              } else if (tlen == 5) {
                if (absolute) {
                  x2 = inver.x(t[3], t[4]);
                  y2 = inver.y(t[3], t[4]);
                  m.scale(t[1], t[2], x2, y2);
                } else {
                  m.scale(t[1], t[2], t[3], t[4]);
                }
                sx *= t[1];
                sy *= t[2];
              }
            } else if (command == 'm' && tlen == 7) {
              m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            _.dirtyT = 1;
            el.matrix = m;
          }
        }
        el.matrix = m;
        _.sx = sx;
        _.sy = sy;
        _.deg = deg;
        _.dx = dx = m.e;
        _.dy = dy = m.f;
        if (sx == 1 && sy == 1 && !deg && _.bbox) {
          _.bbox.x += +dx;
          _.bbox.y += +dy;
        } else {
          _.dirtyT = 1;
        }
      }, getEmpty = function (item) {
        var l = item[0];
        switch (l.toLowerCase()) {
        case 't':
          return [
            l,
            0,
            0
          ];
        case 'm':
          return [
            l,
            1,
            0,
            0,
            1,
            0,
            0
          ];
        case 'r':
          if (item.length == 4) {
            return [
              l,
              0,
              item[2],
              item[3]
            ];
          } else {
            return [
              l,
              0
            ];
          }
        case 's':
          if (item.length == 5) {
            return [
              l,
              1,
              1,
              item[3],
              item[4]
            ];
          } else if (item.length == 3) {
            return [
              l,
              1,
              1
            ];
          } else {
            return [
              l,
              1
            ];
          }
        }
      }, equaliseTransform = R._equaliseTransform = function (t1, t2) {
        t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
        t1 = R.parseTransformString(t1) || [];
        t2 = R.parseTransformString(t2) || [];
        var maxlength = mmax(t1.length, t2.length), from = [], to = [], i = 0, j, jj, tt1, tt2;
        for (; i < maxlength; i++) {
          tt1 = t1[i] || getEmpty(t2[i]);
          tt2 = t2[i] || getEmpty(tt1);
          if (tt1[0] != tt2[0] || tt1[0].toLowerCase() == 'r' && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == 's' && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
            return;
          }
          from[i] = [];
          to[i] = [];
          for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
            j in tt1 && (from[i][j] = tt1[j]);
            j in tt2 && (to[i][j] = tt2[j]);
          }
        }
        return {
          from: from,
          to: to
        };
      };
    R._getContainer = function (x, y, w, h) {
      var container;
      container = h == null && !R.is(x, 'object') ? g.doc.getElementById(x) : x;
      if (container == null) {
        return;
      }
      if (container.tagName) {
        if (y == null) {
          return {
            container: container,
            width: container.style.pixelWidth || container.offsetWidth,
            height: container.style.pixelHeight || container.offsetHeight
          };
        } else {
          return {
            container: container,
            width: y,
            height: w
          };
        }
      }
      return {
        container: 1,
        x: x,
        y: y,
        width: w,
        height: h
      };
    };
    R.pathToRelative = pathToRelative;
    R._engine = {};
    R.path2curve = path2curve;
    R.matrix = function (a, b, c, d, e, f) {
      return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
      if (a != null) {
        this.a = +a;
        this.b = +b;
        this.c = +c;
        this.d = +d;
        this.e = +e;
        this.f = +f;
      } else {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
      }
    }
    (function (matrixproto) {
      matrixproto.add = function (a, b, c, d, e, f) {
        var out = [
            [],
            [],
            []
          ], m = [
            [
              this.a,
              this.c,
              this.e
            ],
            [
              this.b,
              this.d,
              this.f
            ],
            [
              0,
              0,
              1
            ]
          ], matrix = [
            [
              a,
              c,
              e
            ],
            [
              b,
              d,
              f
            ],
            [
              0,
              0,
              1
            ]
          ], x, y, z, res;
        if (a && a instanceof Matrix) {
          matrix = [
            [
              a.a,
              a.c,
              a.e
            ],
            [
              a.b,
              a.d,
              a.f
            ],
            [
              0,
              0,
              1
            ]
          ];
        }
        for (x = 0; x < 3; x++) {
          for (y = 0; y < 3; y++) {
            res = 0;
            for (z = 0; z < 3; z++) {
              res += m[x][z] * matrix[z][y];
            }
            out[x][y] = res;
          }
        }
        this.a = out[0][0];
        this.b = out[1][0];
        this.c = out[0][1];
        this.d = out[1][1];
        this.e = out[0][2];
        this.f = out[1][2];
      };
      matrixproto.invert = function () {
        var me = this, x = me.a * me.d - me.b * me.c;
        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
      };
      matrixproto.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
      };
      matrixproto.translate = function (x, y) {
        this.add(1, 0, 0, 1, x, y);
      };
      matrixproto.scale = function (x, y, cx, cy) {
        y == null && (y = x);
        (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
        this.add(x, 0, 0, y, 0, 0);
        (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
      };
      matrixproto.rotate = function (a, x, y) {
        a = R.rad(a);
        x = x || 0;
        y = y || 0;
        var cos = +math.cos(a).toFixed(9), sin = +math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        this.add(1, 0, 0, 1, -x, -y);
      };
      matrixproto.x = function (x, y) {
        return x * this.a + y * this.c + this.e;
      };
      matrixproto.y = function (x, y) {
        return x * this.b + y * this.d + this.f;
      };
      matrixproto.get = function (i) {
        return +this[Str.fromCharCode(97 + i)].toFixed(4);
      };
      matrixproto.toString = function () {
        return R.svg ? 'matrix(' + [
          this.get(0),
          this.get(1),
          this.get(2),
          this.get(3),
          this.get(4),
          this.get(5)
        ].join() + ')' : [
          this.get(0),
          this.get(2),
          this.get(1),
          this.get(3),
          0,
          0
        ].join();
      };
      matrixproto.toFilter = function () {
        return 'progid:DXImageTransform.Microsoft.Matrix(M11=' + this.get(0) + ', M12=' + this.get(2) + ', M21=' + this.get(1) + ', M22=' + this.get(3) + ', Dx=' + this.get(4) + ', Dy=' + this.get(5) + ', sizingmethod=\'auto expand\')';
      };
      matrixproto.offset = function () {
        return [
          this.e.toFixed(4),
          this.f.toFixed(4)
        ];
      };
      function norm(a) {
        return a[0] * a[0] + a[1] * a[1];
      }
      function normalize(a) {
        var mag = math.sqrt(norm(a));
        a[0] && (a[0] /= mag);
        a[1] && (a[1] /= mag);
      }
      matrixproto.split = function () {
        var out = {};
        out.dx = this.e;
        out.dy = this.f;
        var row = [
            [
              this.a,
              this.c
            ],
            [
              this.b,
              this.d
            ]
          ];
        out.scalex = math.sqrt(norm(row[0]));
        normalize(row[0]);
        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [
          row[1][0] - row[0][0] * out.shear,
          row[1][1] - row[0][1] * out.shear
        ];
        out.scaley = math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaley;
        var sin = -row[0][1], cos = row[1][1];
        if (cos < 0) {
          out.rotate = R.deg(math.acos(cos));
          if (sin < 0) {
            out.rotate = 360 - out.rotate;
          }
        } else {
          out.rotate = R.deg(math.asin(sin));
        }
        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
        return out;
      };
      matrixproto.toTransformString = function (shorter) {
        var s = shorter || this[split]();
        if (s.isSimple) {
          s.scalex = +s.scalex.toFixed(4);
          s.scaley = +s.scaley.toFixed(4);
          s.rotate = +s.rotate.toFixed(4);
          return (s.dx || s.dy ? 't' + [
            s.dx,
            s.dy
          ] : E) + (s.scalex != 1 || s.scaley != 1 ? 's' + [
            s.scalex,
            s.scaley,
            0,
            0
          ] : E) + (s.rotate ? 'r' + [
            s.rotate,
            0,
            0
          ] : E);
        } else {
          return 'm' + [
            this.get(0),
            this.get(1),
            this.get(2),
            this.get(3),
            this.get(4),
            this.get(5)
          ];
        }
      };
    }(Matrix.prototype));
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if (navigator.vendor == 'Apple Computer, Inc.' && (version && version[1] < 4 || navigator.platform.slice(0, 2) == 'iP') || navigator.vendor == 'Google Inc.' && version && version[1] < 8) {
      paperproto.safari = function () {
        var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({ stroke: 'none' });
        setTimeout(function () {
          rect.remove();
        });
      };
    } else {
      paperproto.safari = fun;
    }
    var preventDefault = function () {
        this.returnValue = false;
      }, preventTouch = function () {
        return this.originalEvent.preventDefault();
      }, stopPropagation = function () {
        this.cancelBubble = true;
      }, stopTouch = function () {
        return this.originalEvent.stopPropagation();
      }, getEventPosition = function (e) {
        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop, scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
        return {
          x: e.clientX + scrollX,
          y: e.clientY + scrollY
        };
      }, addEvent = function () {
        if (g.doc.addEventListener) {
          return function (obj, type, fn, element) {
            var f = function (e) {
              var pos = getEventPosition(e);
              return fn.call(element, e, pos.x, pos.y);
            };
            obj.addEventListener(type, f, false);
            if (supportsTouch && touchMap[type]) {
              var _f = function (e) {
                var pos = getEventPosition(e), olde = e;
                for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                  if (e.targetTouches[i].target == obj) {
                    e = e.targetTouches[i];
                    e.originalEvent = olde;
                    e.preventDefault = preventTouch;
                    e.stopPropagation = stopTouch;
                    break;
                  }
                }
                return fn.call(element, e, pos.x, pos.y);
              };
              obj.addEventListener(touchMap[type], _f, false);
            }
            return function () {
              obj.removeEventListener(type, f, false);
              if (supportsTouch && touchMap[type])
                obj.removeEventListener(touchMap[type], f, false);
              return true;
            };
          };
        } else if (g.doc.attachEvent) {
          return function (obj, type, fn, element) {
            var f = function (e) {
              e = e || g.win.event;
              var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop, scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft, x = e.clientX + scrollX, y = e.clientY + scrollY;
              e.preventDefault = e.preventDefault || preventDefault;
              e.stopPropagation = e.stopPropagation || stopPropagation;
              return fn.call(element, e, x, y);
            };
            obj.attachEvent('on' + type, f);
            var detacher = function () {
              obj.detachEvent('on' + type, f);
              return true;
            };
            return detacher;
          };
        }
      }(), drag = [], dragMove = function (e) {
        var x = e.clientX, y = e.clientY, scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop, scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft, dragi, j = drag.length;
        while (j--) {
          dragi = drag[j];
          if (supportsTouch && e.touches) {
            var i = e.touches.length, touch;
            while (i--) {
              touch = e.touches[i];
              if (touch.identifier == dragi.el._drag.id) {
                x = touch.clientX;
                y = touch.clientY;
                (e.originalEvent ? e.originalEvent : e).preventDefault();
                break;
              }
            }
          } else {
            e.preventDefault();
          }
          var node = dragi.el.node, o, next = node.nextSibling, parent = node.parentNode, display = node.style.display;
          g.win.opera && parent.removeChild(node);
          node.style.display = 'none';
          o = dragi.el.paper.getElementByPoint(x, y);
          node.style.display = display;
          g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
          o && eve('raphael.drag.over.' + dragi.el.id, dragi.el, o);
          x += scrollX;
          y += scrollY;
          eve('raphael.drag.move.' + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
      }, dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length, dragi;
        while (i--) {
          dragi = drag[i];
          dragi.el._drag = {};
          eve('raphael.drag.end.' + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
      }, elproto = R.el = {};
    for (var i = events.length; i--;) {
      (function (eventName) {
        R[eventName] = elproto[eventName] = function (fn, scope) {
          if (R.is(fn, 'function')) {
            this.events = this.events || [];
            this.events.push({
              name: eventName,
              f: fn,
              unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)
            });
          }
          return this;
        };
        R['un' + eventName] = elproto['un' + eventName] = function (fn) {
          var events = this.events || [], l = events.length;
          while (l--) {
            if (events[l].name == eventName && (R.is(fn, 'undefined') || events[l].f == fn)) {
              events[l].unbind();
              events.splice(l, 1);
              !events.length && delete this.events;
            }
          }
          return this;
        };
      }(events[i]));
    }
    elproto.data = function (key, value) {
      var data = eldata[this.id] = eldata[this.id] || {};
      if (arguments.length == 0) {
        return data;
      }
      if (arguments.length == 1) {
        if (R.is(key, 'object')) {
          for (var i in key)
            if (key[has](i)) {
              this.data(i, key[i]);
            }
          return this;
        }
        eve('raphael.data.get.' + this.id, this, data[key], key);
        return data[key];
      }
      data[key] = value;
      eve('raphael.data.set.' + this.id, this, value, key);
      return this;
    };
    elproto.removeData = function (key) {
      if (key == null) {
        eldata[this.id] = {};
      } else {
        eldata[this.id] && delete eldata[this.id][key];
      }
      return this;
    };
    elproto.getData = function () {
      return clone(eldata[this.id] || {});
    };
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
      return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    elproto.unhover = function (f_in, f_out) {
      return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
      function start(e) {
        (e.originalEvent || e).preventDefault();
        var x = e.clientX, y = e.clientY, scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop, scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
        this._drag.id = e.identifier;
        if (supportsTouch && e.touches) {
          var i = e.touches.length, touch;
          while (i--) {
            touch = e.touches[i];
            this._drag.id = touch.identifier;
            if (touch.identifier == this._drag.id) {
              x = touch.clientX;
              y = touch.clientY;
              break;
            }
          }
        }
        this._drag.x = x + scrollX;
        this._drag.y = y + scrollY;
        !drag.length && R.mousemove(dragMove).mouseup(dragUp);
        drag.push({
          el: this,
          move_scope: move_scope,
          start_scope: start_scope,
          end_scope: end_scope
        });
        onstart && eve.on('raphael.drag.start.' + this.id, onstart);
        onmove && eve.on('raphael.drag.move.' + this.id, onmove);
        onend && eve.on('raphael.drag.end.' + this.id, onend);
        eve('raphael.drag.start.' + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
      }
      this._drag = {};
      draggable.push({
        el: this,
        start: start
      });
      this.mousedown(start);
      return this;
    };
    elproto.onDragOver = function (f) {
      f ? eve.on('raphael.drag.over.' + this.id, f) : eve.unbind('raphael.drag.over.' + this.id);
    };
    elproto.undrag = function () {
      var i = draggable.length;
      while (i--)
        if (draggable[i].el == this) {
          this.unmousedown(draggable[i].start);
          draggable.splice(i, 1);
          eve.unbind('raphael.drag.*.' + this.id);
        }
      !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
      drag = [];
    };
    paperproto.circle = function (x, y, r) {
      var out = R._engine.circle(this, x || 0, y || 0, r || 0);
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.rect = function (x, y, w, h, r) {
      var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.ellipse = function (x, y, rx, ry) {
      var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.path = function (pathString) {
      pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
      var out = R._engine.path(R.format[apply](R, arguments), this);
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.image = function (src, x, y, w, h) {
      var out = R._engine.image(this, src || 'about:blank', x || 0, y || 0, w || 0, h || 0);
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.text = function (x, y, text) {
      var out = R._engine.text(this, x || 0, y || 0, Str(text));
      this.__set__ && this.__set__.push(out);
      return out;
    };
    paperproto.set = function (itemsArray) {
      !R.is(itemsArray, 'array') && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
      var out = new Set(itemsArray);
      this.__set__ && this.__set__.push(out);
      out['paper'] = this;
      out['type'] = 'set';
      return out;
    };
    paperproto.setStart = function (set) {
      this.__set__ = set || this.set();
    };
    paperproto.setFinish = function (set) {
      var out = this.__set__;
      delete this.__set__;
      return out;
    };
    paperproto.setSize = function (width, height) {
      return R._engine.setSize.call(this, width, height);
    };
    paperproto.setViewBox = function (x, y, w, h, fit) {
      return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };
    paperproto.top = paperproto.bottom = null;
    paperproto.raphael = R;
    var getOffset = function (elem) {
      var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop, left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
      return {
        y: top,
        x: left
      };
    };
    paperproto.getElementByPoint = function (x, y) {
      var paper = this, svg = paper.canvas, target = g.doc.elementFromPoint(x, y);
      if (g.win.opera && target.tagName == 'svg') {
        var so = getOffset(svg), sr = svg.createSVGRect();
        sr.x = x - so.x;
        sr.y = y - so.y;
        sr.width = sr.height = 1;
        var hits = svg.getIntersectionList(sr, null);
        if (hits.length) {
          target = hits[hits.length - 1];
        }
      }
      if (!target) {
        return null;
      }
      while (target.parentNode && target != svg.parentNode && !target.raphael) {
        target = target.parentNode;
      }
      target == paper.canvas.parentNode && (target = svg);
      target = target && target.raphael ? paper.getById(target.raphaelid) : null;
      return target;
    };
    paperproto.getElementsByBBox = function (bbox) {
      var set = this.set();
      this.forEach(function (el) {
        if (R.isBBoxIntersect(el.getBBox(), bbox)) {
          set.push(el);
        }
      });
      return set;
    };
    paperproto.getById = function (id) {
      var bot = this.bottom;
      while (bot) {
        if (bot.id == id) {
          return bot;
        }
        bot = bot.next;
      }
      return null;
    };
    paperproto.forEach = function (callback, thisArg) {
      var bot = this.bottom;
      while (bot) {
        if (callback.call(thisArg, bot) === false) {
          return this;
        }
        bot = bot.next;
      }
      return this;
    };
    paperproto.getElementsByPoint = function (x, y) {
      var set = this.set();
      this.forEach(function (el) {
        if (el.isPointInside(x, y)) {
          set.push(el);
        }
      });
      return set;
    };
    function x_y() {
      return this.x + S + this.y;
    }
    function x_y_w_h() {
      return this.x + S + this.y + S + this.width + ' \xD7 ' + this.height;
    }
    elproto.isPointInside = function (x, y) {
      var rp = this.realPath = getPath[this.type](this);
      if (this.attr('transform') && this.attr('transform').length) {
        rp = R.transformPath(rp, this.attr('transform'));
      }
      return R.isPointInsidePath(rp, x, y);
    };
    elproto.getBBox = function (isWithoutTransform) {
      if (this.removed) {
        return {};
      }
      var _ = this._;
      if (isWithoutTransform) {
        if (_.dirty || !_.bboxwt) {
          this.realPath = getPath[this.type](this);
          _.bboxwt = pathDimensions(this.realPath);
          _.bboxwt.toString = x_y_w_h;
          _.dirty = 0;
        }
        return _.bboxwt;
      }
      if (_.dirty || _.dirtyT || !_.bbox) {
        if (_.dirty || !this.realPath) {
          _.bboxwt = 0;
          this.realPath = getPath[this.type](this);
        }
        _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
        _.bbox.toString = x_y_w_h;
        _.dirty = _.dirtyT = 0;
      }
      return _.bbox;
    };
    elproto.clone = function () {
      if (this.removed) {
        return null;
      }
      var out = this.paper[this.type]().attr(this.attr());
      this.__set__ && this.__set__.push(out);
      return out;
    };
    elproto.glow = function (glow) {
      if (this.type == 'text') {
        return null;
      }
      glow = glow || {};
      var s = {
          width: (glow.width || 10) + (+this.attr('stroke-width') || 1),
          fill: glow.fill || false,
          opacity: glow.opacity || 0.5,
          offsetx: glow.offsetx || 0,
          offsety: glow.offsety || 0,
          color: glow.color || '#000'
        }, c = s.width / 2, r = this.paper, out = r.set(), path = this.realPath || getPath[this.type](this);
      path = this.matrix ? mapPath(path, this.matrix) : path;
      for (var i = 1; i < c + 1; i++) {
        out.push(r.path(path).attr({
          stroke: s.color,
          fill: s.fill ? s.color : 'none',
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round',
          'stroke-width': +(s.width / c * i).toFixed(3),
          opacity: +(s.opacity / c).toFixed(3)
        }));
      }
      return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {}, getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        if (length == null) {
          return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
        } else {
          return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
        }
      }, getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
          path = path2curve(path);
          var x, y, p, l, sp = '', subpaths = {}, point, len = 0;
          for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == 'M') {
              x = +p[1];
              y = +p[2];
            } else {
              l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
              if (len + l > length) {
                if (subpath && !subpaths.start) {
                  point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                  sp += [
                    'C' + point.start.x,
                    point.start.y,
                    point.m.x,
                    point.m.y,
                    point.x,
                    point.y
                  ];
                  if (onlystart) {
                    return sp;
                  }
                  subpaths.start = sp;
                  sp = [
                    'M' + point.x,
                    point.y + 'C' + point.n.x,
                    point.n.y,
                    point.end.x,
                    point.end.y,
                    p[5],
                    p[6]
                  ].join();
                  len += l;
                  x = +p[5];
                  y = +p[6];
                  continue;
                }
                if (!istotal && !subpath) {
                  point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                  return {
                    x: point.x,
                    y: point.y,
                    alpha: point.alpha
                  };
                }
              }
              len += l;
              x = +p[5];
              y = +p[6];
            }
            sp += p.shift() + p;
          }
          subpaths.end = sp;
          point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
          point.alpha && (point = {
            x: point.x,
            y: point.y,
            alpha: point.alpha
          });
          return point;
        };
      };
    var getTotalLength = getLengthFactory(1), getPointAtLength = getLengthFactory(), getSubpathsAtLength = getLengthFactory(0, 1);
    R.getTotalLength = getTotalLength;
    R.getPointAtLength = getPointAtLength;
    R.getSubpath = function (path, from, to) {
      if (this.getTotalLength(path) - to < 0.000001) {
        return getSubpathsAtLength(path, from).end;
      }
      var a = getSubpathsAtLength(path, to, 1);
      return from ? getSubpathsAtLength(a, from).end : a;
    };
    elproto.getTotalLength = function () {
      var path = this.getPath();
      if (!path) {
        return;
      }
      if (this.node.getTotalLength) {
        return this.node.getTotalLength();
      }
      return getTotalLength(path);
    };
    elproto.getPointAtLength = function (length) {
      var path = this.getPath();
      if (!path) {
        return;
      }
      return getPointAtLength(path, length);
    };
    elproto.getPath = function () {
      var path, getPath = R._getPath[this.type];
      if (this.type == 'text' || this.type == 'set') {
        return;
      }
      if (getPath) {
        path = getPath(this);
      }
      return path;
    };
    elproto.getSubpath = function (from, to) {
      var path = this.getPath();
      if (!path) {
        return;
      }
      return R.getSubpath(path, from, to);
    };
    var ef = R.easing_formulas = {
        linear: function (n) {
          return n;
        },
        '<': function (n) {
          return pow(n, 1.7);
        },
        '>': function (n) {
          return pow(n, 0.48);
        },
        '<>': function (n) {
          var q = 0.48 - n / 1.04, Q = math.sqrt(0.1734 + q * q), x = Q - q, X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1), y = -Q - q, Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1), t = X + Y + 0.5;
          return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
          var s = 1.70158;
          return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
          n = n - 1;
          var s = 1.70158;
          return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
          if (n == !!n) {
            return n;
          }
          return pow(2, -10 * n) * math.sin((n - 0.075) * (2 * PI) / 0.3) + 1;
        },
        bounce: function (n) {
          var s = 7.5625, p = 2.75, l;
          if (n < 1 / p) {
            l = s * n * n;
          } else {
            if (n < 2 / p) {
              n -= 1.5 / p;
              l = s * n * n + 0.75;
            } else {
              if (n < 2.5 / p) {
                n -= 2.25 / p;
                l = s * n * n + 0.9375;
              } else {
                n -= 2.625 / p;
                l = s * n * n + 0.984375;
              }
            }
          }
          return l;
        }
      };
    ef.easeIn = ef['ease-in'] = ef['<'];
    ef.easeOut = ef['ease-out'] = ef['>'];
    ef.easeInOut = ef['ease-in-out'] = ef['<>'];
    ef['back-in'] = ef.backIn;
    ef['back-out'] = ef.backOut;
    var animationElements = [], requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 16);
      }, animation = function () {
        var Now = +new Date(), l = 0;
        for (; l < animationElements.length; l++) {
          var e = animationElements[l];
          if (e.el.removed || e.paused) {
            continue;
          }
          var time = Now - e.start, ms = e.ms, easing = e.easing, from = e.from, diff = e.diff, to = e.to, t = e.t, that = e.el, set = {}, now, init = {}, key;
          if (e.initstatus) {
            time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
            e.status = e.initstatus;
            delete e.initstatus;
            e.stop && animationElements.splice(l--, 1);
          } else {
            e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
          }
          if (time < 0) {
            continue;
          }
          if (time < ms) {
            var pos = easing(time / ms);
            for (var attr in from)
              if (from[has](attr)) {
                switch (availableAnimAttrs[attr]) {
                case nu:
                  now = +from[attr] + pos * ms * diff[attr];
                  break;
                case 'colour':
                  now = 'rgb(' + [
                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                  ].join(',') + ')';
                  break;
                case 'path':
                  now = [];
                  for (var i = 0, ii = from[attr].length; i < ii; i++) {
                    now[i] = [from[attr][i][0]];
                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                      now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                    }
                    now[i] = now[i].join(S);
                  }
                  now = now.join(S);
                  break;
                case 'transform':
                  if (diff[attr].real) {
                    now = [];
                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                      now[i] = [from[attr][i][0]];
                      for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                        now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                      }
                    }
                  } else {
                    var get = function (i) {
                      return +from[attr][i] + pos * ms * diff[attr][i];
                    };
                    now = [[
                        'm',
                        get(0),
                        get(1),
                        get(2),
                        get(3),
                        get(4),
                        get(5)
                      ]];
                  }
                  break;
                case 'csv':
                  if (attr == 'clip-rect') {
                    now = [];
                    i = 4;
                    while (i--) {
                      now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                    }
                  } else if (attr == 'clip-circle') {
                    now = [];
                    i = 3;
                    while (i--) {
                      now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                    }
                  } else if (attr == 'clip-angle') {
                    now = [];
                    i = 4;
                    while (i--) {
                      now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                    }
                  }
                  break;
                default:
                  var from2 = [][concat](from[attr]);
                  now = [];
                  i = that.paper.customAttributes[attr].length;
                  while (i--) {
                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                  }
                  break;
                }
                set[attr] = now;
              }
            that.attr(set);
            (function (id, that, anim) {
              setTimeout(function () {
                eve('raphael.anim.frame.' + id, that, anim);
              });
            }(that.id, that, e.anim));
          } else {
            (function (f, el, a) {
              setTimeout(function () {
                eve('raphael.anim.frame.' + el.id, el, a);
                eve('raphael.anim.finish.' + el.id, el, a);
                R.is(f, 'function') && f.call(el);
              });
            }(e.callback, that, e.anim));
            that.attr(to);
            animationElements.splice(l--, 1);
            if (e.repeat > 1 && !e.next) {
              for (key in to)
                if (to[has](key)) {
                  init[key] = e.totalOrigin[key];
                }
              e.el.attr(init);
              runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
            }
            if (e.next && !e.stop) {
              runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
            }
          }
        }
        R.svg && that && that.paper && that.paper.safari();
        animationElements.length && requestAnimFrame(animation);
      }, upto255 = function (color) {
        return color > 255 ? 255 : color < 0 ? 0 : color;
      };
    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
      var element = this;
      if (element.removed) {
        callback && callback.call(element);
        return element;
      }
      var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback), x, y;
      runAnimation(a, element, a.percents[0], null, element.attr());
      for (var i = 0, ii = animationElements.length; i < ii; i++) {
        if (animationElements[i].anim == anim && animationElements[i].el == el) {
          animationElements[ii - 1].start = animationElements[i].start;
          break;
        }
      }
      return element;
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
      var cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx, cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
      function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
      }
      function solve(x, epsilon) {
        var t = solveCurveX(x, epsilon);
        return ((ay * t + by) * t + cy) * t;
      }
      function solveCurveX(x, epsilon) {
        var t0, t1, t2, x2, d2, i;
        for (t2 = x, i = 0; i < 8; i++) {
          x2 = sampleCurveX(t2) - x;
          if (abs(x2) < epsilon) {
            return t2;
          }
          d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
          if (abs(d2) < 0.000001) {
            break;
          }
          t2 = t2 - x2 / d2;
        }
        t0 = 0;
        t1 = 1;
        t2 = x;
        if (t2 < t0) {
          return t0;
        }
        if (t2 > t1) {
          return t1;
        }
        while (t0 < t1) {
          x2 = sampleCurveX(t2);
          if (abs(x2 - x) < epsilon) {
            return t2;
          }
          if (x > x2) {
            t0 = t2;
          } else {
            t1 = t2;
          }
          t2 = (t1 - t0) / 2 + t0;
        }
        return t2;
      }
      return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
      f ? eve.on('raphael.anim.frame.' + this.id, f) : eve.unbind('raphael.anim.frame.' + this.id);
      return this;
    };
    function Animation(anim, ms) {
      var percents = [], newAnim = {};
      this.ms = ms;
      this.times = 1;
      if (anim) {
        for (var attr in anim)
          if (anim[has](attr)) {
            newAnim[toFloat(attr)] = anim[attr];
            percents.push(toFloat(attr));
          }
        percents.sort(sortByNumber);
      }
      this.anim = newAnim;
      this.top = percents[percents.length - 1];
      this.percents = percents;
    }
    Animation.prototype.delay = function (delay) {
      var a = new Animation(this.anim, this.ms);
      a.times = this.times;
      a.del = +delay || 0;
      return a;
    };
    Animation.prototype.repeat = function (times) {
      var a = new Animation(this.anim, this.ms);
      a.del = this.del;
      a.times = math.floor(mmax(times, 0)) || 1;
      return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
      percent = toFloat(percent);
      var params, isInAnim, isInAnimSet, percents = [], next, prev, timestamp, ms = anim.ms, from = {}, to = {}, diff = {};
      if (status) {
        for (i = 0, ii = animationElements.length; i < ii; i++) {
          var e = animationElements[i];
          if (e.el.id == element.id && e.anim == anim) {
            if (e.percent != percent) {
              animationElements.splice(i, 1);
              isInAnimSet = 1;
            } else {
              isInAnim = e;
            }
            element.attr(e.totalOrigin);
            break;
          }
        }
      } else {
        status = +to;
      }
      for (var i = 0, ii = anim.percents.length; i < ii; i++) {
        if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
          percent = anim.percents[i];
          prev = anim.percents[i - 1] || 0;
          ms = ms / anim.top * (percent - prev);
          next = anim.percents[i + 1];
          params = anim.anim[percent];
          break;
        } else if (status) {
          element.attr(anim.anim[anim.percents[i]]);
        }
      }
      if (!params) {
        return;
      }
      if (!isInAnim) {
        for (var attr in params)
          if (params[has](attr)) {
            if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
              from[attr] = element.attr(attr);
              from[attr] == null && (from[attr] = availableAttrs[attr]);
              to[attr] = params[attr];
              switch (availableAnimAttrs[attr]) {
              case nu:
                diff[attr] = (to[attr] - from[attr]) / ms;
                break;
              case 'colour':
                from[attr] = R.getRGB(from[attr]);
                var toColour = R.getRGB(to[attr]);
                diff[attr] = {
                  r: (toColour.r - from[attr].r) / ms,
                  g: (toColour.g - from[attr].g) / ms,
                  b: (toColour.b - from[attr].b) / ms
                };
                break;
              case 'path':
                var pathes = path2curve(from[attr], to[attr]), toPath = pathes[1];
                from[attr] = pathes[0];
                diff[attr] = [];
                for (i = 0, ii = from[attr].length; i < ii; i++) {
                  diff[attr][i] = [0];
                  for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                  }
                }
                break;
              case 'transform':
                var _ = element._, eq = equaliseTransform(_[attr], to[attr]);
                if (eq) {
                  from[attr] = eq.from;
                  to[attr] = eq.to;
                  diff[attr] = [];
                  diff[attr].real = true;
                  for (i = 0, ii = from[attr].length; i < ii; i++) {
                    diff[attr][i] = [from[attr][i][0]];
                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                      diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                    }
                  }
                } else {
                  var m = element.matrix || new Matrix(), to2 = {
                      _: { transform: _.transform },
                      getBBox: function () {
                        return element.getBBox(1);
                      }
                    };
                  from[attr] = [
                    m.a,
                    m.b,
                    m.c,
                    m.d,
                    m.e,
                    m.f
                  ];
                  extractTransform(to2, to[attr]);
                  to[attr] = to2._.transform;
                  diff[attr] = [
                    (to2.matrix.a - m.a) / ms,
                    (to2.matrix.b - m.b) / ms,
                    (to2.matrix.c - m.c) / ms,
                    (to2.matrix.d - m.d) / ms,
                    (to2.matrix.e - m.e) / ms,
                    (to2.matrix.f - m.f) / ms
                  ];
                }
                break;
              case 'csv':
                var values = Str(params[attr])[split](separator), from2 = Str(from[attr])[split](separator);
                if (attr == 'clip-rect' || attr == 'clip-circle' || attr == 'clip-angle') {
                  from[attr] = from2;
                  diff[attr] = [];
                  i = from2.length;
                  while (i--) {
                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                  }
                }
                to[attr] = values;
                break;
              default:
                values = [][concat](params[attr]);
                from2 = [][concat](from[attr]);
                diff[attr] = [];
                i = element.paper.customAttributes[attr].length;
                while (i--) {
                  diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                }
                break;
              }
            }
          }
        var easing = params.easing, easyeasy = R.easing_formulas[easing];
        if (!easyeasy) {
          easyeasy = Str(easing).match(bezierrg);
          if (easyeasy && easyeasy.length == 5) {
            var curve = easyeasy;
            easyeasy = function (t) {
              return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
            };
          } else {
            easyeasy = pipe;
          }
        }
        timestamp = params.start || anim.start || +new Date();
        e = {
          anim: anim,
          percent: percent,
          timestamp: timestamp,
          start: timestamp + (anim.del || 0),
          status: 0,
          initstatus: status || 0,
          stop: false,
          ms: ms,
          easing: easyeasy,
          from: from,
          diff: diff,
          to: to,
          el: element,
          callback: params.callback,
          prev: prev,
          next: next,
          repeat: times || anim.times,
          origin: element.attr(),
          totalOrigin: totalOrigin
        };
        animationElements.push(e);
        if (status && !isInAnim && !isInAnimSet) {
          e.stop = true;
          e.start = new Date() - ms * status;
          if (animationElements.length == 1) {
            return animation();
          }
        }
        if (isInAnimSet) {
          e.start = new Date() - e.ms * status;
        }
        animationElements.length == 1 && requestAnimFrame(animation);
      } else {
        isInAnim.initstatus = status;
        isInAnim.start = new Date() - isInAnim.ms * status;
      }
      eve('raphael.anim.start.' + element.id, element, anim);
    }
    R.animation = function (params, ms, easing, callback) {
      if (params instanceof Animation) {
        return params;
      }
      if (R.is(easing, 'function') || !easing) {
        callback = callback || easing || null;
        easing = null;
      }
      params = Object(params);
      ms = +ms || 0;
      var p = {}, json, attr;
      for (attr in params)
        if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + '%' != attr) {
          json = true;
          p[attr] = params[attr];
        }
      if (!json) {
        return new Animation(params, ms);
      } else {
        easing && (p.easing = easing);
        callback && (p.callback = callback);
        return new Animation({ 100: p }, ms);
      }
    };
    elproto.animate = function (params, ms, easing, callback) {
      var element = this;
      if (element.removed) {
        callback && callback.call(element);
        return element;
      }
      var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
      runAnimation(anim, element, anim.percents[0], null, element.attr());
      return element;
    };
    elproto.setTime = function (anim, value) {
      if (anim && value != null) {
        this.status(anim, mmin(value, anim.ms) / anim.ms);
      }
      return this;
    };
    elproto.status = function (anim, value) {
      var out = [], i = 0, len, e;
      if (value != null) {
        runAnimation(anim, this, -1, mmin(value, 1));
        return this;
      } else {
        len = animationElements.length;
        for (; i < len; i++) {
          e = animationElements[i];
          if (e.el.id == this.id && (!anim || e.anim == anim)) {
            if (anim) {
              return e.status;
            }
            out.push({
              anim: e.anim,
              status: e.status
            });
          }
        }
        if (anim) {
          return 0;
        }
        return out;
      }
    };
    elproto.pause = function (anim) {
      for (var i = 0; i < animationElements.length; i++)
        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
          if (eve('raphael.anim.pause.' + this.id, this, animationElements[i].anim) !== false) {
            animationElements[i].paused = true;
          }
        }
      return this;
    };
    elproto.resume = function (anim) {
      for (var i = 0; i < animationElements.length; i++)
        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
          var e = animationElements[i];
          if (eve('raphael.anim.resume.' + this.id, this, e.anim) !== false) {
            delete e.paused;
            this.status(e.anim, e.status);
          }
        }
      return this;
    };
    elproto.stop = function (anim) {
      for (var i = 0; i < animationElements.length; i++)
        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
          if (eve('raphael.anim.stop.' + this.id, this, animationElements[i].anim) !== false) {
            animationElements.splice(i--, 1);
          }
        }
      return this;
    };
    function stopAnimation(paper) {
      for (var i = 0; i < animationElements.length; i++)
        if (animationElements[i].el.paper == paper) {
          animationElements.splice(i--, 1);
        }
    }
    eve.on('raphael.remove', stopAnimation);
    eve.on('raphael.clear', stopAnimation);
    elproto.toString = function () {
      return 'Rapha\xEBl\u2019s object';
    };
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = 'set';
        if (items) {
          for (var i = 0, ii = items.length; i < ii; i++) {
            if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
              this[this.items.length] = this.items[this.items.length] = items[i];
              this.length++;
            }
          }
        }
      }, setproto = Set.prototype;
    setproto.push = function () {
      var item, len;
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        item = arguments[i];
        if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
          len = this.items.length;
          this[len] = this.items[len] = item;
          this.length++;
        }
      }
      return this;
    };
    setproto.pop = function () {
      this.length && delete this[this.length--];
      return this.items.pop();
    };
    setproto.forEach = function (callback, thisArg) {
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        if (callback.call(thisArg, this.items[i], i) === false) {
          return this;
        }
      }
      return this;
    };
    for (var method in elproto)
      if (elproto[has](method)) {
        setproto[method] = function (methodname) {
          return function () {
            var arg = arguments;
            return this.forEach(function (el) {
              el[methodname][apply](el, arg);
            });
          };
        }(method);
      }
    setproto.attr = function (name, value) {
      if (name && R.is(name, array) && R.is(name[0], 'object')) {
        for (var j = 0, jj = name.length; j < jj; j++) {
          this.items[j].attr(name[j]);
        }
      } else {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
          this.items[i].attr(name, value);
        }
      }
      return this;
    };
    setproto.clear = function () {
      while (this.length) {
        this.pop();
      }
    };
    setproto.splice = function (index, count, insertion) {
      index = index < 0 ? mmax(this.length + index, 0) : index;
      count = mmax(0, mmin(this.length - index, count));
      var tail = [], todel = [], args = [], i;
      for (i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      for (i = 0; i < count; i++) {
        todel.push(this[index + i]);
      }
      for (; i < this.length - index; i++) {
        tail.push(this[index + i]);
      }
      var arglen = args.length;
      for (i = 0; i < arglen + tail.length; i++) {
        this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
      }
      i = this.items.length = this.length -= count - arglen;
      while (this[i]) {
        delete this[i++];
      }
      return new Set(todel);
    };
    setproto.exclude = function (el) {
      for (var i = 0, ii = this.length; i < ii; i++)
        if (this[i] == el) {
          this.splice(i, 1);
          return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
      (R.is(easing, 'function') || !easing) && (callback = easing || null);
      var len = this.items.length, i = len, item, set = this, collector;
      if (!len) {
        return this;
      }
      callback && (collector = function () {
        !--len && callback.call(set);
      });
      easing = R.is(easing, string) ? easing : collector;
      var anim = R.animation(params, ms, easing, collector);
      item = this.items[--i].animate(anim);
      while (i--) {
        this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        this.items[i] && !this.items[i].removed || len--;
      }
      return this;
    };
    setproto.insertAfter = function (el) {
      var i = this.items.length;
      while (i--) {
        this.items[i].insertAfter(el);
      }
      return this;
    };
    setproto.getBBox = function () {
      var x = [], y = [], x2 = [], y2 = [];
      for (var i = this.items.length; i--;)
        if (!this.items[i].removed) {
          var box = this.items[i].getBBox();
          x.push(box.x);
          y.push(box.y);
          x2.push(box.x + box.width);
          y2.push(box.y + box.height);
        }
      x = mmin[apply](0, x);
      y = mmin[apply](0, y);
      x2 = mmax[apply](0, x2);
      y2 = mmax[apply](0, y2);
      return {
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        width: x2 - x,
        height: y2 - y
      };
    };
    setproto.clone = function (s) {
      s = this.paper.set();
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        s.push(this.items[i].clone());
      }
      return s;
    };
    setproto.toString = function () {
      return 'Rapha\xEBl\u2018s set';
    };
    setproto.glow = function (glowConfig) {
      var ret = this.paper.set();
      this.forEach(function (shape, index) {
        var g = shape.glow(glowConfig);
        if (g != null) {
          g.forEach(function (shape2, index2) {
            ret.push(shape2);
          });
        }
      });
      return ret;
    };
    setproto.isPointInside = function (x, y) {
      var isPointInside = false;
      this.forEach(function (el) {
        if (el.isPointInside(x, y)) {
          isPointInside = true;
          return false;
        }
      });
      return isPointInside;
    };
    R.registerFont = function (font) {
      if (!font.face) {
        return font;
      }
      this.fonts = this.fonts || {};
      var fontcopy = {
          w: font.w,
          face: {},
          glyphs: {}
        }, family = font.face['font-family'];
      for (var prop in font.face)
        if (font.face[has](prop)) {
          fontcopy.face[prop] = font.face[prop];
        }
      if (this.fonts[family]) {
        this.fonts[family].push(fontcopy);
      } else {
        this.fonts[family] = [fontcopy];
      }
      if (!font.svg) {
        fontcopy.face['units-per-em'] = toInt(font.face['units-per-em'], 10);
        for (var glyph in font.glyphs)
          if (font.glyphs[has](glyph)) {
            var path = font.glyphs[glyph];
            fontcopy.glyphs[glyph] = {
              w: path.w,
              k: {},
              d: path.d && 'M' + path.d.replace(/[mlcxtrv]/g, function (command) {
                return {
                  l: 'L',
                  c: 'C',
                  x: 'z',
                  t: 'm',
                  r: 'l',
                  v: 'c'
                }[command] || 'M';
              }) + 'z'
            };
            if (path.k) {
              for (var k in path.k)
                if (path[has](k)) {
                  fontcopy.glyphs[glyph].k[k] = path.k[k];
                }
            }
          }
      }
      return font;
    };
    paperproto.getFont = function (family, weight, style, stretch) {
      stretch = stretch || 'normal';
      style = style || 'normal';
      weight = +weight || {
        normal: 400,
        bold: 700,
        lighter: 300,
        bolder: 800
      }[weight] || 400;
      if (!R.fonts) {
        return;
      }
      var font = R.fonts[family];
      if (!font) {
        var name = new RegExp('(^|\\s)' + family.replace(/[^\w\d\s+!~.:_-]/g, E) + '(\\s|$)', 'i');
        for (var fontName in R.fonts)
          if (R.fonts[has](fontName)) {
            if (name.test(fontName)) {
              font = R.fonts[fontName];
              break;
            }
          }
      }
      var thefont;
      if (font) {
        for (var i = 0, ii = font.length; i < ii; i++) {
          thefont = font[i];
          if (thefont.face['font-weight'] == weight && (thefont.face['font-style'] == style || !thefont.face['font-style']) && thefont.face['font-stretch'] == stretch) {
            break;
          }
        }
      }
      return thefont;
    };
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing, line_spacing) {
      origin = origin || 'middle';
      letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
      line_spacing = mmax(mmin(line_spacing || 1, 3), 1);
      var letters = Str(string)[split](E), shift = 0, notfirst = 0, path = E, scale;
      R.is(font, 'string') && (font = this.getFont(font));
      if (font) {
        scale = (size || 16) / font.face['units-per-em'];
        var bb = font.face.bbox[split](separator), top = +bb[0], lineHeight = bb[3] - bb[1], shifty = 0, height = +bb[1] + (origin == 'baseline' ? lineHeight + +font.face.descent : lineHeight / 2);
        for (var i = 0, ii = letters.length; i < ii; i++) {
          if (letters[i] == '\n') {
            shift = 0;
            curr = 0;
            notfirst = 0;
            shifty += lineHeight * line_spacing;
          } else {
            var prev = notfirst && font.glyphs[letters[i - 1]] || {}, curr = font.glyphs[letters[i]];
            shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + font.w * letter_spacing : 0;
            notfirst = 1;
          }
          if (curr && curr.d) {
            path += R.transformPath(curr.d, [
              't',
              shift * scale,
              shifty * scale,
              's',
              scale,
              scale,
              top,
              height,
              't',
              (x - top) / scale,
              (y - height) / scale
            ]);
          }
        }
      }
      return this.path(path).attr({
        fill: '#000',
        stroke: 'none'
      });
    };
    paperproto.add = function (json) {
      if (R.is(json, 'array')) {
        var res = this.set(), i = 0, ii = json.length, j;
        for (; i < ii; i++) {
          j = json[i] || {};
          elements[has](j.type) && res.push(this[j.type]().attr(j));
        }
      }
      return res;
    };
    R.format = function (token, params) {
      var args = R.is(params, array) ? [0][concat](params) : arguments;
      token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
        return args[++i] == null ? E : args[i];
      }));
      return token || E;
    };
    R.fullfill = function () {
      var tokenRegex = /\{([^\}]+)\}/g, objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, replacer = function (all, key, obj) {
          var res = obj;
          key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
            name = name || quotedName;
            if (res) {
              if (name in res) {
                res = res[name];
              }
              typeof res == 'function' && isFunc && (res = res());
            }
          });
          res = (res == null || res == obj ? all : res) + '';
          return res;
        };
      return function (str, obj) {
        return String(str).replace(tokenRegex, function (all, key) {
          return replacer(all, key, obj);
        });
      };
    }();
    R.ninja = function () {
      oldRaphael.was ? g.win.Raphael = oldRaphael.is : delete Raphael;
      return R;
    };
    R.st = setproto;
    (function (doc, loaded, f) {
      if (doc.readyState == null && doc.addEventListener) {
        doc.addEventListener(loaded, f = function () {
          doc.removeEventListener(loaded, f, false);
          doc.readyState = 'complete';
        }, false);
        doc.readyState = 'loading';
      }
      function isLoaded() {
        /in/.test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve('raphael.DOMload');
      }
      isLoaded();
    }(document, 'DOMContentLoaded'));
    eve.on('raphael.DOMload', function () {
      loaded = true;
    });
    oldRaphael.was ? g.win.Raphael = R : Raphael = R;
    return R;
  }));
  exports = Raphael;
  return exports;
}();
achart_raphael_102_src_svg_debug = function () {
  achart_raphael_102_src_core_debug;
  window.Raphael && window.Raphael.svg && function (R) {
    var has = 'hasOwnProperty', Str = String, toFloat = parseFloat, toInt = parseInt, math = Math, mmax = math.max, abs = math.abs, pow = math.pow, separator = /[, ]+/, eve = R.eve, E = '', S = ' ';
    var xlink = 'http://www.w3.org/1999/xlink', markers = {
        block: 'M5,0 0,2.5 5,5z',
        classic: 'M5,0 0,2.5 5,5 3.5,3 3.5,2z',
        diamond: 'M2.5,0 5,2.5 2.5,5 0,2.5z',
        open: 'M6,1 1,3.5 6,6',
        oval: 'M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z'
      }, markerCounter = {};
    R.toString = function () {
      return 'Your browser supports SVG.\nYou are running Rapha\xEBl ' + this.version;
    };
    var $ = function (el, attr) {
        if (attr) {
          if (typeof el == 'string') {
            el = $(el);
          }
          for (var key in attr)
            if (attr[has](key)) {
              if (key.substring(0, 6) == 'xlink:') {
                el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
              } else {
                el.setAttribute(key, Str(attr[key]));
              }
            }
        } else {
          el = R._g.doc.createElementNS('http://www.w3.org/2000/svg', el);
          el.style && (el.style.webkitTapHighlightColor = 'rgba(0,0,0,0)');
        }
        return el;
      }, addGradientFill = function (element, gradient) {
        var type = 'linear', id = element.id + gradient, fx = 0.5, fy = 0.5, o = element.node, SVG = element.paper, s = o.style, el = R._g.doc.getElementById(id);
        if (!el) {
          gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
            type = 'radial';
            if (_fx && _fy) {
              fx = toFloat(_fx);
              fy = toFloat(_fy);
              var dir = (fy > 0.5) * 2 - 1;
              pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * dir + 0.5) && fy != 0.5 && (fy = fy.toFixed(5) - 0.00001 * dir);
            }
            return E;
          });
          gradient = gradient.split(/\s*\-\s*/);
          if (type == 'linear') {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
              return null;
            }
            var vector = [
                0,
                0,
                math.cos(R.rad(angle)),
                math.sin(R.rad(angle))
              ], max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
            vector[2] *= max;
            vector[3] *= max;
            if (vector[2] < 0) {
              vector[0] = -vector[2];
              vector[2] = 0;
            }
            if (vector[3] < 0) {
              vector[1] = -vector[3];
              vector[3] = 0;
            }
          }
          var dots = R._parseDots(gradient);
          if (!dots) {
            return null;
          }
          id = id.replace(/[\(\)\s,\xb0#]/g, '_');
          if (element.gradient && id != element.gradient.id) {
            SVG.defs.removeChild(element.gradient);
            delete element.gradient;
          }
          if (!element.gradient) {
            el = $(type + 'Gradient', { id: id });
            element.gradient = el;
            $(el, type == 'radial' ? {
              fx: fx,
              fy: fy
            } : {
              x1: vector[0],
              y1: vector[1],
              x2: vector[2],
              y2: vector[3],
              gradientTransform: element.matrix.invert()
            });
            SVG.defs.appendChild(el);
            for (var i = 0, ii = dots.length; i < ii; i++) {
              el.appendChild($('stop', {
                offset: dots[i].offset ? dots[i].offset : i ? '100%' : '0%',
                'stop-color': dots[i].color || '#fff'
              }));
            }
          }
        }
        $(o, {
          fill: 'url(#' + id + ')',
          opacity: 1,
          'fill-opacity': 1
        });
        s.fill = E;
        s.opacity = 1;
        s.fillOpacity = 1;
        return 1;
      }, updatePosition = function (o) {
        var bbox = o.getBBox(1);
        $(o.pattern, { patternTransform: o.matrix.invert() + ' translate(' + bbox.x + ',' + bbox.y + ')' });
      }, addArrow = function (o, value, isEnd) {
        if (o.type == 'path') {
          var values = Str(value).toLowerCase().split('-'), p = o.paper, se = isEnd ? 'end' : 'start', node = o.node, attrs = o.attrs, stroke = attrs['stroke-width'], i = values.length, type = 'classic', from, to, dx, refX, attr, w = 3, h = 3, t = 5;
          while (i--) {
            switch (values[i]) {
            case 'block':
            case 'classic':
            case 'oval':
            case 'diamond':
            case 'open':
            case 'none':
              type = values[i];
              break;
            case 'wide':
              h = 5;
              break;
            case 'narrow':
              h = 2;
              break;
            case 'long':
              w = 5;
              break;
            case 'short':
              w = 2;
              break;
            }
          }
          if (type == 'open') {
            w += 2;
            h += 2;
            t += 2;
            dx = 1;
            refX = isEnd ? 4 : 1;
            attr = {
              fill: 'none',
              stroke: attrs.stroke
            };
          } else {
            refX = dx = w / 2;
            attr = {
              fill: attrs.stroke,
              stroke: 'none'
            };
          }
          if (o._.arrows) {
            if (isEnd) {
              o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
              o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
            } else {
              o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
              o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
            }
          } else {
            o._.arrows = {};
          }
          if (type != 'none') {
            var pathId = 'raphael-marker-' + type, markerId = 'raphael-marker-' + se + type + w + h;
            if (!R._g.doc.getElementById(pathId)) {
              p.defs.appendChild($($('path'), {
                'stroke-linecap': 'round',
                d: markers[type],
                id: pathId
              }));
              markerCounter[pathId] = 1;
            } else {
              markerCounter[pathId]++;
            }
            var marker = R._g.doc.getElementById(markerId), use;
            if (!marker) {
              marker = $($('marker'), {
                id: markerId,
                markerHeight: h,
                markerWidth: w,
                orient: 'auto',
                refX: refX,
                refY: h / 2
              });
              use = $($('use'), {
                'xlink:href': '#' + pathId,
                transform: (isEnd ? 'rotate(180 ' + w / 2 + ' ' + h / 2 + ') ' : E) + 'scale(' + w / t + ',' + h / t + ')',
                'stroke-width': (1 / ((w / t + h / t) / 2)).toFixed(4)
              });
              marker.appendChild(use);
              p.defs.appendChild(marker);
              markerCounter[markerId] = 1;
            } else {
              markerCounter[markerId]++;
              use = marker.getElementsByTagName('use')[0];
            }
            $(use, attr);
            var delta = dx * (type != 'diamond' && type != 'oval');
            if (isEnd) {
              from = o._.arrows.startdx * stroke || 0;
              to = R.getTotalLength(attrs.path) - delta * stroke;
            } else {
              from = delta * stroke;
              to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
            }
            attr = {};
            attr['marker-' + se] = 'url(#' + markerId + ')';
            if (to || from) {
              attr.d = R.getSubpath(attrs.path, from, to);
            }
            $(node, attr);
            o._.arrows[se + 'Path'] = pathId;
            o._.arrows[se + 'Marker'] = markerId;
            o._.arrows[se + 'dx'] = delta;
            o._.arrows[se + 'Type'] = type;
            o._.arrows[se + 'String'] = value;
          } else {
            if (isEnd) {
              from = o._.arrows.startdx * stroke || 0;
              to = R.getTotalLength(attrs.path) - from;
            } else {
              from = 0;
              to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
            }
            o._.arrows[se + 'Path'] && $(node, { d: R.getSubpath(attrs.path, from, to) });
            delete o._.arrows[se + 'Path'];
            delete o._.arrows[se + 'Marker'];
            delete o._.arrows[se + 'dx'];
            delete o._.arrows[se + 'Type'];
            delete o._.arrows[se + 'String'];
          }
          for (attr in markerCounter)
            if (markerCounter[has](attr) && !markerCounter[attr]) {
              var item = R._g.doc.getElementById(attr);
              item && item.parentNode.removeChild(item);
            }
        }
      }, dasharray = {
        '': [0],
        'none': [0],
        '-': [
          3,
          1
        ],
        '.': [
          1,
          1
        ],
        '-.': [
          3,
          1,
          1,
          1
        ],
        '-..': [
          3,
          1,
          1,
          1,
          1,
          1
        ],
        '. ': [
          1,
          3
        ],
        '- ': [
          4,
          3
        ],
        '--': [
          8,
          3
        ],
        '- .': [
          4,
          3,
          1,
          3
        ],
        '--.': [
          8,
          3,
          1,
          3
        ],
        '--..': [
          8,
          3,
          1,
          3,
          1,
          3
        ]
      }, addDashes = function (o, value, params) {
        value = dasharray[Str(value).toLowerCase()];
        if (value) {
          var width = o.attrs['stroke-width'] || '1', butt = {
              round: width,
              square: width,
              butt: 0
            }[o.attrs['stroke-linecap'] || params['stroke-linecap']] || 0, dashes = [], i = value.length;
          while (i--) {
            dashes[i] = value[i] * width + (i % 2 ? 1 : -1) * butt;
          }
          $(o.node, { 'stroke-dasharray': dashes.join(',') });
        }
      }, setFillAndStroke = function (o, params) {
        var node = o.node, attrs = o.attrs, vis = node.style.visibility;
        node.style.visibility = 'hidden';
        for (var att in params) {
          if (params[has](att)) {
            if (!R._availableAttrs[has](att)) {
              continue;
            }
            var value = params[att];
            attrs[att] = value;
            switch (att) {
            case 'blur':
              o.blur(value);
              break;
            case 'href':
            case 'title':
              var hl = $('title');
              var val = R._g.doc.createTextNode(value);
              hl.appendChild(val);
              node.appendChild(hl);
              break;
            case 'target':
              var pn = node.parentNode;
              if (pn.tagName.toLowerCase() != 'a') {
                var hl = $('a');
                pn.insertBefore(hl, node);
                hl.appendChild(node);
                pn = hl;
              }
              if (att == 'target') {
                pn.setAttributeNS(xlink, 'show', value == 'blank' ? 'new' : value);
              } else {
                pn.setAttributeNS(xlink, att, value);
              }
              break;
            case 'cursor':
              node.style.cursor = value;
              break;
            case 'transform':
              o.transform(value);
              break;
            case 'arrow-start':
              addArrow(o, value);
              break;
            case 'arrow-end':
              addArrow(o, value, 1);
              break;
            case 'clip-angle':
              var angle = Str(value).split(separator);
              if (angle.length == 4) {
                var center = {
                    x: parseInt(angle[0], 10),
                    y: parseInt(angle[1], 10)
                  };
                var RAD = Math.PI / 180;
                var _getCoord = function (angle, r) {
                  var self = this;
                  var rst = {};
                  rst.x = center.x + r * Math.sin(angle * RAD);
                  rst.y = center.y - r * Math.cos(angle * RAD);
                  return rst;
                };
                var getPiePath = function (startAngle, endAngle, r) {
                  var path, cx = center.x, cy = center.y, start = _getCoord(startAngle, r), end = _getCoord(endAngle, r);
                  path = [
                    'M',
                    cx + ',',
                    cy,
                    'L',
                    start.x + ',',
                    start.y,
                    'A',
                    r + ',',
                    r + ',',
                    0 + ',',
                    +(endAngle - startAngle > 180) + ',',
                    1 + ',',
                    end.x + ',',
                    end.y,
                    'z'
                  ];
                  return path.join('');
                };
                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                var el = $('clipPath'), pt = $('path');
                el.id = R.createUUID();
                var p = getPiePath(0, parseInt(angle[3], 10), parseInt(angle[2], 10));
                $(pt, {
                  d: p,
                  fill: '#ffffff',
                  stroke: '#000000',
                  'stroke-width': 1.5
                });
                el.appendChild(pt);
                o.paper.defs.appendChild(el);
                $(node, { 'clip-path': 'url(#' + el.id + ')' });
                o.clip = pt;
              }
              if (!value) {
                var path = node.getAttribute('clip-path');
                if (path) {
                  var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                  clip && clip.parentNode.removeChild(clip);
                  $(node, { 'clip-path': E });
                  delete o.clip;
                }
              }
              break;
            case 'clip-circle':
              var circle = Str(value).split(separator);
              if (circle.length == 3) {
                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                var el = $('clipPath'), cc = $('circle');
                el.id = R.createUUID();
                $(cc, {
                  cx: circle[0],
                  cy: circle[1],
                  r: circle[2]
                });
                el.appendChild(cc);
                o.paper.defs.appendChild(el);
                $(node, { 'clip-path': 'url(#' + el.id + ')' });
                o.clip = cc;
              }
              if (!value) {
                var path = node.getAttribute('clip-path');
                if (path) {
                  var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                  clip && clip.parentNode.removeChild(clip);
                  $(node, { 'clip-path': E });
                  delete o.clip;
                }
              }
              break;
            case 'clip-rect':
              var rect = Str(value).split(separator);
              if (rect.length == 4) {
                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                var el = $('clipPath'), rc = $('rect');
                el.id = R.createUUID();
                $(rc, {
                  x: rect[0],
                  y: rect[1],
                  width: rect[2],
                  height: rect[3]
                });
                el.appendChild(rc);
                o.paper.defs.appendChild(el);
                $(node, { 'clip-path': 'url(#' + el.id + ')' });
                o.clip = rc;
              }
              if (!value) {
                var path = node.getAttribute('clip-path');
                if (path) {
                  var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                  clip && clip.parentNode.removeChild(clip);
                  $(node, { 'clip-path': E });
                  delete o.clip;
                }
              }
              break;
            case 'path':
              if (o.type == 'path') {
                $(node, { d: value ? attrs.path = R._pathToAbsolute(value) : 'M0,0' });
                o._.dirty = 1;
                if (o._.arrows) {
                  'startString' in o._.arrows && addArrow(o, o._.arrows.startString);
                  'endString' in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                }
              }
              break;
            case 'width':
              node.setAttribute(att, value);
              o._.dirty = 1;
              if (attrs.fx) {
                att = 'x';
                value = attrs.x;
              } else {
                break;
              }
            case 'x':
              if (attrs.fx) {
                value = -attrs.x - (attrs.width || 0);
              }
            case 'rx':
              if (att == 'rx' && o.type == 'rect') {
                break;
              }
            case 'cx':
              node.setAttribute(att, value);
              o.pattern && updatePosition(o);
              o._.dirty = 1;
              break;
            case 'height':
              node.setAttribute(att, value);
              o._.dirty = 1;
              if (attrs.fy) {
                att = 'y';
                value = attrs.y;
              } else {
                break;
              }
            case 'y':
              if (attrs.fy) {
                value = -attrs.y - (attrs.height || 0);
              }
            case 'ry':
              if (att == 'ry' && o.type == 'rect') {
                break;
              }
            case 'cy':
              node.setAttribute(att, value);
              o.pattern && updatePosition(o);
              o._.dirty = 1;
              break;
            case 'r':
              if (o.type == 'rect') {
                $(node, {
                  rx: value,
                  ry: value
                });
              } else {
                node.setAttribute(att, value);
              }
              o._.dirty = 1;
              break;
            case 'src':
              if (o.type == 'image') {
                node.setAttributeNS(xlink, 'href', value);
              }
              break;
            case 'stroke-width':
              if (o._.sx != 1 || o._.sy != 1) {
                value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
              }
              if (o.paper._vbSize) {
                value *= o.paper._vbSize;
              }
              node.setAttribute(att, value);
              if (attrs['stroke-dasharray']) {
                addDashes(o, attrs['stroke-dasharray'], params);
              }
              if (o._.arrows) {
                'startString' in o._.arrows && addArrow(o, o._.arrows.startString);
                'endString' in o._.arrows && addArrow(o, o._.arrows.endString, 1);
              }
              break;
            case 'stroke-dasharray':
              addDashes(o, value, params);
              break;
            case 'fill':
              var isURL = Str(value).match(R._ISURL);
              if (isURL) {
                el = $('pattern');
                var ig = $('image');
                el.id = R.createUUID();
                $(el, {
                  x: 0,
                  y: 0,
                  patternUnits: 'userSpaceOnUse',
                  height: 1,
                  width: 1
                });
                $(ig, {
                  x: 0,
                  y: 0,
                  'xlink:href': isURL[1]
                });
                el.appendChild(ig);
                (function (el) {
                  R._preload(isURL[1], function () {
                    var w = this.offsetWidth, h = this.offsetHeight;
                    $(el, {
                      width: w,
                      height: h
                    });
                    $(ig, {
                      width: w,
                      height: h
                    });
                    o.paper.safari();
                  });
                }(el));
                o.paper.defs.appendChild(el);
                $(node, { fill: 'url(#' + el.id + ')' });
                o.pattern = el;
                o.pattern && updatePosition(o);
                break;
              }
              var clr = R.getRGB(value);
              if (!clr.error) {
                delete params.gradient;
                delete attrs.gradient;
                !R.is(attrs.opacity, 'undefined') && R.is(params.opacity, 'undefined') && $(node, { opacity: attrs.opacity });
                !R.is(attrs['fill-opacity'], 'undefined') && R.is(params['fill-opacity'], 'undefined') && $(node, { 'fill-opacity': attrs['fill-opacity'] });
              } else if ((o.type == 'circle' || o.type == 'ellipse' || Str(value).charAt() != 'r') && addGradientFill(o, value)) {
                if ('opacity' in attrs || 'fill-opacity' in attrs) {
                  var gradient = R._g.doc.getElementById(node.getAttribute('fill').replace(/^url\(#|\)$/g, E));
                  if (gradient) {
                    var stops = gradient.getElementsByTagName('stop');
                    $(stops[stops.length - 1], { 'stop-opacity': ('opacity' in attrs ? attrs.opacity : 1) * ('fill-opacity' in attrs ? attrs['fill-opacity'] : 1) });
                  }
                }
                attrs.gradient = value;
                attrs.fill = 'none';
                break;
              }
              clr[has]('opacity') && $(node, { 'fill-opacity': clr.opacity > 1 ? clr.opacity / 100 : clr.opacity });
            case 'stroke':
              clr = R.getRGB(value);
              node.setAttribute(att, clr.hex);
              att == 'stroke' && clr[has]('opacity') && $(node, { 'stroke-opacity': clr.opacity > 1 ? clr.opacity / 100 : clr.opacity });
              if (att == 'stroke' && o._.arrows) {
                'startString' in o._.arrows && addArrow(o, o._.arrows.startString);
                'endString' in o._.arrows && addArrow(o, o._.arrows.endString, 1);
              }
              break;
            case 'gradient':
              (o.type == 'circle' || o.type == 'ellipse' || Str(value).charAt() != 'r') && addGradientFill(o, value);
              break;
            case 'opacity':
              if (attrs.gradient && !attrs[has]('stroke-opacity')) {
                $(node, { 'stroke-opacity': value > 1 ? value / 100 : value });
              }
            case 'fill-opacity':
              if (attrs.gradient) {
                gradient = R._g.doc.getElementById(node.getAttribute('fill').replace(/^url\(#|\)$/g, E));
                if (gradient) {
                  stops = gradient.getElementsByTagName('stop');
                  $(stops[stops.length - 1], { 'stop-opacity': value });
                }
                break;
              }
            default:
              att == 'font-size' && (value = toInt(value, 10) + 'px');
              var cssrule = att.replace(/(\-.)/g, function (w) {
                  return w.substring(1).toUpperCase();
                });
              node.style[cssrule] = value;
              o._.dirty = 1;
              node.setAttribute(att, value);
              break;
            }
          }
        }
        tuneText(o, params);
        node.style.visibility = vis;
      }, leading = 1.2, tuneText = function (el, params) {
        if (el.type != 'text' || !(params[has]('text') || params[has]('font') || params[has]('font-size') || params[has]('x') || params[has]('y'))) {
          return;
        }
        var a = el.attrs, node = el.node, fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue('font-size'), 10) : 10;
        if (params[has]('text')) {
          a.text = params.text;
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
          var texts = Str(params.text).split('\n'), tspans = [], tspan;
          for (var i = 0, ii = texts.length; i < ii; i++) {
            tspan = $('tspan');
            i && $(tspan, {
              dy: fontSize * leading,
              x: a.x
            });
            tspan.appendChild(R._g.doc.createTextNode(texts[i]));
            node.appendChild(tspan);
            tspans[i] = tspan;
          }
        } else {
          tspans = node.getElementsByTagName('tspan');
          for (i = 0, ii = tspans.length; i < ii; i++)
            if (i) {
              $(tspans[i], {
                dy: fontSize * leading,
                x: a.x
              });
            } else {
              $(tspans[0], { dy: 0 });
            }
        }
        $(node, {
          x: a.x,
          y: a.y
        });
        el._.dirty = 1;
        var bb = el._getBBox(), dif = a.y - (bb.y + bb.height / 2);
        dif && R.is(dif, 'finite') && $(tspans[0], { dy: dif });
      }, Element = function (node, svg) {
        var X = 0, Y = 0;
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.matrix = R.matrix();
        this.realPath = null;
        this.paper = svg;
        this.attrs = this.attrs || {};
        this._ = {
          transform: [],
          sx: 1,
          sy: 1,
          deg: 0,
          dx: 0,
          dy: 0,
          dirty: 1
        };
        !svg.bottom && (svg.bottom = this);
        this.prev = svg.top;
        svg.top && (svg.top.next = this);
        svg.top = this;
        this.next = null;
      }, elproto = R.el;
    Element.prototype = elproto;
    elproto.constructor = Element;
    R._engine.path = function (pathString, SVG) {
      var el = $('path');
      SVG.canvas && SVG.canvas.appendChild(el);
      var p = new Element(el, SVG);
      p.type = 'path';
      setFillAndStroke(p, {
        fill: 'none',
        stroke: '#000',
        path: pathString
      });
      return p;
    };
    elproto.rotate = function (deg, cx, cy) {
      if (this.removed) {
        return this;
      }
      deg = Str(deg).split(separator);
      if (deg.length - 1) {
        cx = toFloat(deg[1]);
        cy = toFloat(deg[2]);
      }
      deg = toFloat(deg[0]);
      cy == null && (cx = cy);
      if (cx == null || cy == null) {
        var bbox = this.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
      }
      this.transform(this._.transform.concat([[
          'r',
          deg,
          cx,
          cy
        ]]));
      return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
      if (this.removed) {
        return this;
      }
      sx = Str(sx).split(separator);
      if (sx.length - 1) {
        sy = toFloat(sx[1]);
        cx = toFloat(sx[2]);
        cy = toFloat(sx[3]);
      }
      sx = toFloat(sx[0]);
      sy == null && (sy = sx);
      cy == null && (cx = cy);
      if (cx == null || cy == null) {
        var bbox = this.getBBox(1);
      }
      cx = cx == null ? bbox.x + bbox.width / 2 : cx;
      cy = cy == null ? bbox.y + bbox.height / 2 : cy;
      this.transform(this._.transform.concat([[
          's',
          sx,
          sy,
          cx,
          cy
        ]]));
      return this;
    };
    elproto.translate = function (dx, dy) {
      if (this.removed) {
        return this;
      }
      dx = Str(dx).split(separator);
      if (dx.length - 1) {
        dy = toFloat(dx[1]);
      }
      dx = toFloat(dx[0]) || 0;
      dy = +dy || 0;
      this.transform(this._.transform.concat([[
          't',
          dx,
          dy
        ]]));
      return this;
    };
    elproto.transform = function (tstr) {
      var _ = this._;
      if (tstr == null) {
        return _.transform;
      }
      R._extractTransform(this, tstr);
      this.clip && $(this.clip, { transform: this.matrix.invert() });
      this.pattern && updatePosition(this);
      this.node && $(this.node, { transform: this.matrix });
      if (_.sx != 1 || _.sy != 1) {
        var sw = this.attrs[has]('stroke-width') ? this.attrs['stroke-width'] : 1;
        this.attr({ 'stroke-width': sw });
      }
      return this;
    };
    elproto.hide = function () {
      !this.removed && this.paper.safari(this.node.style.display = 'none');
      return this;
    };
    elproto.show = function () {
      !this.removed && this.paper.safari(this.node.style.display = '');
      return this;
    };
    elproto.remove = function () {
      if (this.removed || !this.node.parentNode) {
        return;
      }
      var paper = this.paper;
      paper.__set__ && paper.__set__.exclude(this);
      eve.unbind('raphael.*.*.' + this.id);
      if (this.gradient) {
        paper.defs.removeChild(this.gradient);
      }
      R._tear(this, paper);
      if (this.node.parentNode.tagName.toLowerCase() == 'a') {
        this.node.parentNode.parentNode.removeChild(this.node.parentNode);
      } else {
        this.node.parentNode.removeChild(this.node);
      }
      for (var i in this) {
        this[i] = typeof this[i] == 'function' ? R._removedFactory(i) : null;
      }
      this.removed = true;
    };
    elproto._getBBox = function () {
      if (this.node.style.display == 'none') {
        this.show();
        var hide = true;
      }
      var bbox = {};
      try {
        bbox = this.node.getBBox();
      } catch (e) {
      } finally {
        bbox = bbox || {};
      }
      hide && this.hide();
      return bbox;
    };
    elproto.attr = function (name, value) {
      if (this.removed) {
        return this;
      }
      if (name == null) {
        var res = {};
        for (var a in this.attrs)
          if (this.attrs[has](a)) {
            res[a] = this.attrs[a];
          }
        res.gradient && res.fill == 'none' && (res.fill = res.gradient) && delete res.gradient;
        res.transform = this._.transform;
        return res;
      }
      if (value == null && R.is(name, 'string')) {
        if (name == 'fill' && this.attrs.fill == 'none' && this.attrs.gradient) {
          return this.attrs.gradient;
        }
        if (name == 'transform') {
          return this._.transform;
        }
        var names = name.split(separator), out = {};
        for (var i = 0, ii = names.length; i < ii; i++) {
          name = names[i];
          if (name in this.attrs) {
            out[name] = this.attrs[name];
          } else if (R.is(this.paper.customAttributes[name], 'function')) {
            out[name] = this.paper.customAttributes[name].def;
          } else {
            out[name] = R._availableAttrs[name];
          }
        }
        return ii - 1 ? out : out[names[0]];
      }
      if (value == null && R.is(name, 'array')) {
        out = {};
        for (i = 0, ii = name.length; i < ii; i++) {
          out[name[i]] = this.attr(name[i]);
        }
        return out;
      }
      if (value != null) {
        var params = {};
        params[name] = value;
      } else if (name != null && R.is(name, 'object')) {
        params = name;
      }
      for (var key in params) {
        eve('raphael.attr.' + key + '.' + this.id, this, params[key]);
      }
      for (key in this.paper.customAttributes)
        if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], 'function')) {
          var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
          this.attrs[key] = params[key];
          for (var subkey in par)
            if (par[has](subkey)) {
              params[subkey] = par[subkey];
            }
        }
      setFillAndStroke(this, params);
      return this;
    };
    elproto.toFront = function () {
      if (this.removed) {
        return this;
      }
      if (this.node.parentNode.tagName.toLowerCase() == 'a') {
        this.node.parentNode.parentNode.appendChild(this.node.parentNode);
      } else {
        this.node.parentNode.appendChild(this.node);
      }
      var svg = this.paper;
      svg.top != this && R._tofront(this, svg);
      return this;
    };
    elproto.toBack = function () {
      if (this.removed) {
        return this;
      }
      var parent = this.node.parentNode;
      if (parent.tagName.toLowerCase() == 'a') {
        parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild);
      } else if (parent.firstChild != this.node) {
        parent.insertBefore(this.node, this.node.parentNode.firstChild);
      }
      R._toback(this, this.paper);
      var svg = this.paper;
      return this;
    };
    elproto.insertAfter = function (element) {
      if (this.removed) {
        return this;
      }
      var node = element.node || element[element.length - 1].node;
      if (node.nextSibling) {
        node.parentNode.insertBefore(this.node, node.nextSibling);
      } else {
        node.parentNode.appendChild(this.node);
      }
      R._insertafter(this, element, this.paper);
      return this;
    };
    elproto.insertBefore = function (element) {
      if (this.removed) {
        return this;
      }
      var node = element.node || element[0].node;
      node.parentNode.insertBefore(this.node, node);
      R._insertbefore(this, element, this.paper);
      return this;
    };
    elproto.blur = function (size) {
      var t = this;
      if (+size !== 0) {
        var fltr = $('filter'), blur = $('feGaussianBlur');
        t.attrs.blur = size;
        fltr.id = R.createUUID();
        $(blur, { stdDeviation: +size || 1.5 });
        fltr.appendChild(blur);
        t.paper.defs.appendChild(fltr);
        t._blur = fltr;
        $(t.node, { filter: 'url(#' + fltr.id + ')' });
      } else {
        if (t._blur) {
          t._blur.parentNode.removeChild(t._blur);
          delete t._blur;
          delete t.attrs.blur;
        }
        t.node.removeAttribute('filter');
      }
      return t;
    };
    R._engine.circle = function (svg, x, y, r) {
      var el = $('circle');
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Element(el, svg);
      res.attrs = {
        cx: x,
        cy: y,
        r: r,
        fill: 'none',
        stroke: '#000'
      };
      res.type = 'circle';
      $(el, res.attrs);
      return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
      var el = $('rect');
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Element(el, svg);
      res.attrs = {
        x: x,
        y: y,
        width: w,
        height: h,
        r: r || 0,
        rx: r || 0,
        ry: r || 0,
        fill: 'none',
        stroke: '#000'
      };
      res.type = 'rect';
      $(el, res.attrs);
      return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
      var el = $('ellipse');
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Element(el, svg);
      res.attrs = {
        cx: x,
        cy: y,
        rx: rx,
        ry: ry,
        fill: 'none',
        stroke: '#000'
      };
      res.type = 'ellipse';
      $(el, res.attrs);
      return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
      var el = $('image');
      $(el, {
        x: x,
        y: y,
        width: w,
        height: h,
        preserveAspectRatio: 'none'
      });
      el.setAttributeNS(xlink, 'href', src);
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Element(el, svg);
      res.attrs = {
        x: x,
        y: y,
        width: w,
        height: h,
        src: src
      };
      res.type = 'image';
      return res;
    };
    R._engine.text = function (svg, x, y, text) {
      var el = $('text');
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Element(el, svg);
      res.attrs = {
        x: x,
        y: y,
        'text-anchor': 'middle',
        text: text,
        font: R._availableAttrs.font,
        stroke: 'none',
        fill: '#000'
      };
      res.type = 'text';
      setFillAndStroke(res, res.attrs);
      return res;
    };
    R._engine.setSize = function (width, height) {
      this.width = width || this.width;
      this.height = height || this.height;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      if (this._viewBox) {
        this.setViewBox.apply(this, this._viewBox);
      }
      return this;
    };
    R._engine.create = function () {
      var con = R._getContainer.apply(0, arguments), container = con && con.container, x = con.x, y = con.y, width = con.width, height = con.height;
      if (!container) {
        throw new Error('SVG container not found.');
      }
      var cnvs = $('svg'), css = 'overflow:hidden;', isFloating;
      x = x || 0;
      y = y || 0;
      width = width || 512;
      height = height || 342;
      $(cnvs, {
        height: height,
        version: 1.1,
        width: width,
        xmlns: 'http://www.w3.org/2000/svg'
      });
      if (container == 1) {
        cnvs.style.cssText = css + 'position:absolute;left:' + x + 'px;top:' + y + 'px';
        R._g.doc.body.appendChild(cnvs);
        isFloating = 1;
      } else {
        cnvs.style.cssText = css + 'position:relative';
        if (container.firstChild) {
          container.insertBefore(cnvs, container.firstChild);
        } else {
          container.appendChild(cnvs);
        }
      }
      container = new R._Paper();
      container.width = width;
      container.height = height;
      container.canvas = cnvs;
      container.clear();
      container._left = container._top = 0;
      isFloating && (container.renderfix = function () {
      });
      container.renderfix();
      return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
      eve('raphael.setViewBox', this, this._viewBox, [
        x,
        y,
        w,
        h,
        fit
      ]);
      var size = mmax(w / this.width, h / this.height), top = this.top, aspectRatio = fit ? 'meet' : 'xMinYMin', vb, sw;
      if (x == null) {
        if (this._vbSize) {
          size = 1;
        }
        delete this._vbSize;
        vb = '0 0 ' + this.width + S + this.height;
      } else {
        this._vbSize = size;
        vb = x + S + y + S + w + S + h;
      }
      $(this.canvas, {
        viewBox: vb,
        preserveAspectRatio: aspectRatio
      });
      while (size && top) {
        sw = 'stroke-width' in top.attrs ? top.attrs['stroke-width'] : 1;
        top.attr({ 'stroke-width': sw });
        top._.dirty = 1;
        top._.dirtyT = 1;
        top = top.prev;
      }
      this._viewBox = [
        x,
        y,
        w,
        h,
        !!fit
      ];
      return this;
    };
    R.prototype.renderfix = function () {
      var cnvs = this.canvas, s = cnvs.style, pos;
      try {
        pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
      } catch (e) {
        pos = cnvs.createSVGMatrix();
      }
      var left = -pos.e % 1, top = -pos.f % 1;
      if (left || top) {
        if (left) {
          this._left = (this._left + left) % 1;
          s.left = this._left + 'px';
        }
        if (top) {
          this._top = (this._top + top) % 1;
          s.top = this._top + 'px';
        }
      }
    };
    R.prototype.clear = function () {
      R.eve('raphael.clear', this);
      var c = this.canvas;
      while (c.firstChild) {
        c.removeChild(c.firstChild);
      }
      this.bottom = this.top = null;
      (this.desc = $('desc')).appendChild(R._g.doc.createTextNode('Created with Rapha\xEBl ' + R.version));
      c.appendChild(this.desc);
      c.appendChild(this.defs = $('defs'));
    };
    R.prototype.remove = function () {
      eve('raphael.remove', this);
      this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
      for (var i in this) {
        this[i] = typeof this[i] == 'function' ? R._removedFactory(i) : null;
      }
    };
    var setproto = R.st;
    for (var method in elproto)
      if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = function (methodname) {
          return function () {
            var arg = arguments;
            return this.forEach(function (el) {
              el[methodname].apply(el, arg);
            });
          };
        }(method);
      }
  }(window.Raphael);
}();
achart_raphael_102_src_vml_debug = function () {
  achart_raphael_102_src_core_debug;
  window.Raphael && window.Raphael.vml && function (R) {
    var has = 'hasOwnProperty', Str = String, toFloat = parseFloat, math = Math, round = math.round, mmax = math.max, mmin = math.min, abs = math.abs, fillString = 'fill', separator = /[, ]+/, eve = R.eve, ms = ' progid:DXImageTransform.Microsoft', S = ' ', E = '', map = {
        M: 'm',
        L: 'l',
        C: 'c',
        Z: 'x',
        m: 't',
        l: 'r',
        c: 'v',
        z: 'x'
      }, bites = /([clmz]),?([^clmz]*)/gi, blurregexp = / progid:\S+Blur\([^\)]+\)/g, val = /-?[^,\s-]+/g, cssDot = 'position:absolute;left:0;top:0;width:1px;height:1px', zoom = 21600, pathTypes = {
        path: 1,
        rect: 1,
        image: 1
      }, ovalTypes = {
        circle: 1,
        ellipse: 1
      }, path2vml = function (path) {
        var total = /[ahqstv]/gi, command = R._pathToAbsolute;
        Str(path).match(total) && (command = R._path2curve);
        total = /[clmz]/g;
        if (command == R._pathToAbsolute && !Str(path).match(total)) {
          var res = Str(path).replace(bites, function (all, command, args) {
              var vals = [], isMove = command.toLowerCase() == 'm', res = map[command];
              args.replace(val, function (value) {
                if (isMove && vals.length == 2) {
                  res += vals + map[command == 'm' ? 'l' : 'L'];
                  vals = [];
                }
                vals.push(round(value * zoom));
              });
              return res + vals;
            });
          return res;
        }
        var pa = command(path), p, r;
        res = [];
        for (var i = 0, ii = pa.length; i < ii; i++) {
          p = pa[i];
          r = pa[i][0].toLowerCase();
          r == 'z' && (r = 'x');
          for (var j = 1, jj = p.length; j < jj; j++) {
            r += round(p[j] * zoom) + (j != jj - 1 ? ',' : E);
          }
          res.push(r);
        }
        return res.join(S);
      }, compensation = function (deg, dx, dy) {
        var m = R.matrix();
        m.rotate(-deg, 0.5, 0.5);
        return {
          dx: m.x(dx, dy),
          dy: m.y(dx, dy)
        };
      }, setCoords = function (p, sx, sy, dx, dy, deg) {
        var _ = p._, m = p.matrix, fillpos = _.fillpos, o = p.node, s = o.style, y = 1, flip = '', dxdy, kx = zoom / sx, ky = zoom / sy;
        s.visibility = 'hidden';
        if (!sx || !sy) {
          return;
        }
        o.coordsize = abs(kx) + S + abs(ky);
        s.rotation = deg * (sx * sy < 0 ? -1 : 1);
        if (deg) {
          var c = compensation(deg, dx, dy);
          dx = c.dx;
          dy = c.dy;
        }
        sx < 0 && (flip += 'x');
        sy < 0 && (flip += ' y') && (y = -1);
        s.flip = flip;
        o.coordorigin = dx * -kx + S + dy * -ky;
        if (fillpos || _.fillsize) {
          var fill = o.getElementsByTagName(fillString);
          fill = fill && fill[0];
          o.removeChild(fill);
          if (fillpos) {
            c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
            fill.position = c.dx * y + S + c.dy * y;
          }
          if (_.fillsize) {
            fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
          }
          o.appendChild(fill);
        }
        s.visibility = 'visible';
      };
    R.toString = function () {
      return 'Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xEBl ' + this.version;
    };
    var addArrow = function (o, value, isEnd) {
        var values = Str(value).toLowerCase().split('-'), se = isEnd ? 'end' : 'start', i = values.length, type = 'classic', w = 'medium', h = 'medium';
        while (i--) {
          switch (values[i]) {
          case 'block':
          case 'classic':
          case 'oval':
          case 'diamond':
          case 'open':
          case 'none':
            type = values[i];
            break;
          case 'wide':
          case 'narrow':
            h = values[i];
            break;
          case 'long':
          case 'short':
            w = values[i];
            break;
          }
        }
        var stroke = o.node.getElementsByTagName('stroke')[0];
        stroke[se + 'arrow'] = type;
        stroke[se + 'arrowlength'] = w;
        stroke[se + 'arrowwidth'] = h;
      }, setFillAndStroke = function (o, params) {
        o.attrs = o.attrs || {};
        var node = o.node, a = o.attrs, s = node.style, xy, newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r), isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry), res = o;
        for (var par in params)
          if (params[has](par)) {
            a[par] = params[par];
          }
        if (newpath) {
          a.path = R._getPath[o.type](o);
          o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        'blur' in params && o.blur(params.blur);
        if (params.path && o.type == 'path' || newpath) {
          node.path = path2vml(~Str(a.path).toLowerCase().indexOf('r') ? R._pathToAbsolute(a.path) : a.path);
          if (o.type == 'image') {
            o._.fillpos = [
              a.x,
              a.y
            ];
            o._.fillsize = [
              a.width,
              a.height
            ];
            setCoords(o, 1, 1, 0, 0, 0);
          }
        }
        'transform' in params && o.transform(params.transform);
        if (isOval) {
          var cx = +a.cx, cy = +a.cy, rx = +a.rx || +a.r || 0, ry = +a.ry || +a.r || 0;
          node.path = R.format('ar{0},{1},{2},{3},{4},{1},{4},{1}x', round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
          o._.dirty = 1;
        }
        if ('clip-rect' in params) {
          var rect = Str(params['clip-rect']).split(separator);
          if (rect.length == 4) {
            rect[2] = +rect[2] + +rect[0];
            rect[3] = +rect[3] + +rect[1];
            var div = node.clipRect || R._g.doc.createElement('div'), dstyle = div.style;
            dstyle.clip = R.format('rect({1}px {2}px {3}px {0}px)', rect);
            if (!node.clipRect) {
              dstyle.position = 'absolute';
              dstyle.top = 0;
              dstyle.left = 0;
              dstyle.width = o.paper.width + 'px';
              dstyle.height = o.paper.height + 'px';
              node.parentNode.insertBefore(div, node);
              div.appendChild(node);
              node.clipRect = div;
            }
          }
          if (!params['clip-rect']) {
            node.clipRect && (node.clipRect.style.clip = 'auto');
          }
        }
        if (o.textpath) {
          var textpathStyle = o.textpath.style;
          params.font && (textpathStyle.font = params.font);
          params['font-family'] && (textpathStyle.fontFamily = '"' + params['font-family'].split(',')[0].replace(/^['"]+|['"]+$/g, E) + '"');
          params['font-size'] && (textpathStyle.fontSize = params['font-size']);
          params['font-weight'] && (textpathStyle.fontWeight = params['font-weight']);
          params['font-style'] && (textpathStyle.fontStyle = params['font-style']);
        }
        if ('arrow-start' in params) {
          addArrow(res, params['arrow-start']);
        }
        if ('arrow-end' in params) {
          addArrow(res, params['arrow-end'], 1);
        }
        if (params.opacity != null || params['stroke-width'] != null || params.fill != null || params.src != null || params.stroke != null || params['stroke-width'] != null || params['stroke-opacity'] != null || params['fill-opacity'] != null || params['stroke-dasharray'] != null || params['stroke-miterlimit'] != null || params['stroke-linejoin'] != null || params['stroke-linecap'] != null) {
          var fill = node.getElementsByTagName(fillString), newfill = false;
          fill = fill && fill[0];
          !fill && (newfill = fill = createNode(fillString));
          if (o.type == 'image' && params.src) {
            fill.src = params.src;
          }
          params.fill && (fill.on = true);
          if (fill.on == null || params.fill == 'none' || params.fill === null) {
            fill.on = false;
          }
          if (fill.on && params.fill) {
            var isURL = Str(params.fill).match(R._ISURL);
            if (isURL) {
              fill.parentNode == node && node.removeChild(fill);
              fill.rotate = true;
              fill.src = isURL[1];
              fill.type = 'tile';
              var bbox = o.getBBox(1);
              fill.position = bbox.x + S + bbox.y;
              o._.fillpos = [
                bbox.x,
                bbox.y
              ];
              R._preload(isURL[1], function () {
                o._.fillsize = [
                  this.offsetWidth,
                  this.offsetHeight
                ];
              });
            } else {
              fill.color = R.getRGB(params.fill).hex;
              fill.src = E;
              fill.type = 'solid';
              if (R.getRGB(params.fill).error && (res.type in {
                  circle: 1,
                  ellipse: 1
                } || Str(params.fill).charAt() != 'r') && addGradientFill(res, params.fill, fill)) {
                a.fill = 'none';
                a.gradient = params.fill;
                fill.rotate = false;
              }
            }
          }
          if ('fill-opacity' in params || 'opacity' in params) {
            var opacity = ((+a['fill-opacity'] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
            opacity = mmin(mmax(opacity, 0), 1);
            fill.opacity = opacity;
            if (fill.src) {
              fill.color = 'none';
            }
          }
          node.appendChild(fill);
          var stroke = node.getElementsByTagName('stroke') && node.getElementsByTagName('stroke')[0], newstroke = false;
          !stroke && (newstroke = stroke = createNode('stroke'));
          if (params.stroke && params.stroke != 'none' || params['stroke-width'] || params['stroke-opacity'] != null || params['stroke-dasharray'] || params['stroke-miterlimit'] || params['stroke-linejoin'] || params['stroke-linecap']) {
            stroke.on = true;
          }
          (params.stroke == 'none' || params.stroke === null || stroke.on == null || params.stroke == 0 || params['stroke-width'] == 0) && (stroke.on = false);
          var strokeColor = R.getRGB(params.stroke);
          stroke.on && params.stroke && (stroke.color = strokeColor.hex);
          opacity = ((+a['stroke-opacity'] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
          var width = (toFloat(params['stroke-width']) || 1) * 0.75;
          opacity = mmin(mmax(opacity, 0), 1);
          params['stroke-width'] == null && (width = a['stroke-width']);
          params['stroke-width'] && (stroke.weight = width);
          width && width < 1 && (opacity *= width) && (stroke.weight = 1);
          stroke.opacity = opacity;
          params['stroke-linejoin'] && (stroke.joinstyle = params['stroke-linejoin'] || 'miter');
          stroke.miterlimit = params['stroke-miterlimit'] || 8;
          params['stroke-linecap'] && (stroke.endcap = params['stroke-linecap'] == 'butt' ? 'flat' : params['stroke-linecap'] == 'square' ? 'square' : 'round');
          if (params['stroke-dasharray']) {
            var dasharray = {
                '-': 'shortdash',
                '.': 'shortdot',
                '-.': 'shortdashdot',
                '-..': 'shortdashdotdot',
                '. ': 'dot',
                '- ': 'dash',
                '--': 'longdash',
                '- .': 'dashdot',
                '--.': 'longdashdot',
                '--..': 'longdashdotdot'
              };
            stroke.dashstyle = dasharray[has](params['stroke-dasharray']) ? dasharray[params['stroke-dasharray']] : E;
          }
          newstroke && node.appendChild(stroke);
        }
        if (res.type == 'text') {
          res.paper.canvas.style.display = E;
          var span = res.paper.span, m = 100, fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
          s = span.style;
          a.font && (s.font = a.font);
          a['font-family'] && (s.fontFamily = a['font-family']);
          a['font-weight'] && (s.fontWeight = a['font-weight']);
          a['font-style'] && (s.fontStyle = a['font-style']);
          fontSize = toFloat(a['font-size'] || fontSize && fontSize[0]) || 10;
          s.fontSize = fontSize * m + 'px';
          res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, '&#60;').replace(/&/g, '&#38;').replace(/\n/g, '<br>'));
          var brect = span.getBoundingClientRect();
          res.W = a.w = (brect.right - brect.left) / m;
          res.H = a.h = (brect.bottom - brect.top) / m;
          res.X = a.x;
          res.Y = a.y + res.H / 2;
          ('x' in params || 'y' in params) && (res.path.v = R.format('m{0},{1}l{2},{1}', round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
          var dirtyattrs = [
              'x',
              'y',
              'text',
              'font',
              'font-family',
              'font-weight',
              'font-style',
              'font-size'
            ];
          for (var d = 0, dd = dirtyattrs.length; d < dd; d++)
            if (dirtyattrs[d] in params) {
              res._.dirty = 1;
              break;
            }
          switch (a['text-anchor']) {
          case 'start':
            res.textpath.style['v-text-align'] = 'left';
            res.bbx = res.W / 2;
            break;
          case 'end':
            res.textpath.style['v-text-align'] = 'right';
            res.bbx = -res.W / 2;
            break;
          default:
            res.textpath.style['v-text-align'] = 'center';
            res.bbx = 0;
            break;
          }
          res.textpath.style['v-text-kern'] = true;
        }
      }, addGradientFill = function (o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs, pow = Math.pow, opacity, oindex, type = 'linear', fxfy = '.5 .5';
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
          type = 'radial';
          if (fx && fy) {
            fx = toFloat(fx);
            fy = toFloat(fy);
            pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5);
            fxfy = fx + S + fy;
          }
          return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == 'linear') {
          var angle = gradient.shift();
          angle = -toFloat(angle);
          if (isNaN(angle)) {
            return null;
          }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
          return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
          o.removeChild(fill);
          fill.on = true;
          fill.method = 'none';
          fill.color = dots[0].color;
          fill.color2 = dots[dots.length - 1].color;
          var clrs = [];
          for (var i = 0, ii = dots.length; i < ii; i++) {
            dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
          }
          fill.colors = clrs.length ? clrs.join() : '0% ' + fill.color;
          if (type == 'radial') {
            fill.type = 'gradientTitle';
            fill.focus = '100%';
            fill.focussize = '0 0';
            fill.focusposition = fxfy;
            fill.angle = 0;
          } else {
            fill.type = 'gradient';
            fill.angle = (270 - angle) % 360;
          }
          o.appendChild(fill);
        }
        return 1;
      }, Element = function (node, vml) {
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = vml;
        this.matrix = R.matrix();
        this._ = {
          transform: [],
          sx: 1,
          sy: 1,
          dx: 0,
          dy: 0,
          deg: 0,
          dirty: 1,
          dirtyT: 1
        };
        !vml.bottom && (vml.bottom = this);
        this.prev = vml.top;
        vml.top && (vml.top.next = this);
        vml.top = this;
        this.next = null;
      };
    var elproto = R.el;
    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
      if (tstr == null) {
        return this._.transform;
      }
      var vbs = this.paper._viewBoxShift, vbt = vbs ? 's' + [
          vbs.scale,
          vbs.scale
        ] + '-1-1t' + [
          vbs.dx,
          vbs.dy
        ] : E, oldt;
      if (vbs) {
        oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
      }
      R._extractTransform(this, vbt + tstr);
      var matrix = this.matrix.clone(), skew = this.skew, o = this.node, split, isGrad = ~Str(this.attrs.fill).indexOf('-'), isPatt = !Str(this.attrs.fill).indexOf('url(');
      matrix.translate(1, 1);
      if (isPatt || isGrad || this.type == 'image') {
        skew.matrix = '1 0 0 1';
        skew.offset = '0 0';
        split = matrix.split();
        if (isGrad && split.noRotation || !split.isSimple) {
          o.style.filter = matrix.toFilter();
          var bb = this.getBBox(), bbt = this.getBBox(1), dx = bb.x - bbt.x, dy = bb.y - bbt.y;
          o.coordorigin = dx * -zoom + S + dy * -zoom;
          setCoords(this, 1, 1, dx, dy, 0);
        } else {
          o.style.filter = E;
          setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
        }
      } else if (skew) {
        o.style.filter = E;
        skew.matrix = Str(matrix);
        skew.offset = matrix.offset();
      }
      oldt && (this._.transform = oldt);
      return this;
    };
    elproto.rotate = function (deg, cx, cy) {
      if (this.removed) {
        return this;
      }
      if (deg == null) {
        return;
      }
      deg = Str(deg).split(separator);
      if (deg.length - 1) {
        cx = toFloat(deg[1]);
        cy = toFloat(deg[2]);
      }
      deg = toFloat(deg[0]);
      cy == null && (cx = cy);
      if (cx == null || cy == null) {
        var bbox = this.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
      }
      this._.dirtyT = 1;
      this.transform(this._.transform.concat([[
          'r',
          deg,
          cx,
          cy
        ]]));
      return this;
    };
    elproto.translate = function (dx, dy) {
      if (this.removed) {
        return this;
      }
      dx = Str(dx).split(separator);
      if (dx.length - 1) {
        dy = toFloat(dx[1]);
      }
      dx = toFloat(dx[0]) || 0;
      dy = +dy || 0;
      if (this._.bbox) {
        this._.bbox.x += dx;
        this._.bbox.y += dy;
      }
      this.transform(this._.transform.concat([[
          't',
          dx,
          dy
        ]]));
      return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
      if (this.removed) {
        return this;
      }
      sx = Str(sx).split(separator);
      if (sx.length - 1) {
        sy = toFloat(sx[1]);
        cx = toFloat(sx[2]);
        cy = toFloat(sx[3]);
        isNaN(cx) && (cx = null);
        isNaN(cy) && (cy = null);
      }
      sx = toFloat(sx[0]);
      sy == null && (sy = sx);
      cy == null && (cx = cy);
      if (cx == null || cy == null) {
        var bbox = this.getBBox(1);
      }
      cx = cx == null ? bbox.x + bbox.width / 2 : cx;
      cy = cy == null ? bbox.y + bbox.height / 2 : cy;
      this.transform(this._.transform.concat([[
          's',
          sx,
          sy,
          cx,
          cy
        ]]));
      this._.dirtyT = 1;
      return this;
    };
    elproto.hide = function () {
      !this.removed && (this.node.style.display = 'none');
      return this;
    };
    elproto.show = function () {
      !this.removed && (this.node.style.display = E);
      return this;
    };
    elproto._getBBox = function () {
      if (this.removed) {
        return {};
      }
      return {
        x: this.X + (this.bbx || 0) - this.W / 2,
        y: this.Y - this.H,
        width: this.W,
        height: this.H
      };
    };
    elproto.remove = function () {
      if (this.removed || !this.node.parentNode) {
        return;
      }
      this.paper.__set__ && this.paper.__set__.exclude(this);
      R.eve.unbind('raphael.*.*.' + this.id);
      R._tear(this, this.paper);
      this.node.parentNode.removeChild(this.node);
      this.shape && this.shape.parentNode.removeChild(this.shape);
      for (var i in this) {
        this[i] = typeof this[i] == 'function' ? R._removedFactory(i) : null;
      }
      this.removed = true;
    };
    elproto.attr = function (name, value) {
      if (this.removed) {
        return this;
      }
      if (name == null) {
        var res = {};
        for (var a in this.attrs)
          if (this.attrs[has](a)) {
            res[a] = this.attrs[a];
          }
        res.gradient && res.fill == 'none' && (res.fill = res.gradient) && delete res.gradient;
        res.transform = this._.transform;
        return res;
      }
      if (value == null && R.is(name, 'string')) {
        if (name == fillString && this.attrs.fill == 'none' && this.attrs.gradient) {
          return this.attrs.gradient;
        }
        var names = name.split(separator), out = {};
        for (var i = 0, ii = names.length; i < ii; i++) {
          name = names[i];
          if (name in this.attrs) {
            out[name] = this.attrs[name];
          } else if (R.is(this.paper.customAttributes[name], 'function')) {
            out[name] = this.paper.customAttributes[name].def;
          } else {
            out[name] = R._availableAttrs[name];
          }
        }
        return ii - 1 ? out : out[names[0]];
      }
      if (this.attrs && value == null && R.is(name, 'array')) {
        out = {};
        for (i = 0, ii = name.length; i < ii; i++) {
          out[name[i]] = this.attr(name[i]);
        }
        return out;
      }
      var params;
      if (value != null) {
        params = {};
        params[name] = value;
      }
      value == null && R.is(name, 'object') && (params = name);
      for (var key in params) {
        eve('raphael.attr.' + key + '.' + this.id, this, params[key]);
      }
      if (params) {
        for (key in this.paper.customAttributes)
          if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], 'function')) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par)
              if (par[has](subkey)) {
                params[subkey] = par[subkey];
              }
          }
        if (params.text && this.type == 'text') {
          this.textpath.string = params.text;
        }
        setFillAndStroke(this, params);
      }
      return this;
    };
    elproto.toFront = function () {
      !this.removed && this.node.parentNode.appendChild(this.node);
      this.paper && this.paper.top != this && R._tofront(this, this.paper);
      return this;
    };
    elproto.toBack = function () {
      if (this.removed) {
        return this;
      }
      if (this.node.parentNode.firstChild != this.node) {
        this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
        R._toback(this, this.paper);
      }
      return this;
    };
    elproto.insertAfter = function (element) {
      if (this.removed) {
        return this;
      }
      if (element.constructor == R.st.constructor) {
        element = element[element.length - 1];
      }
      if (element.node.nextSibling) {
        element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
      } else {
        element.node.parentNode.appendChild(this.node);
      }
      R._insertafter(this, element, this.paper);
      return this;
    };
    elproto.insertBefore = function (element) {
      if (this.removed) {
        return this;
      }
      if (element.constructor == R.st.constructor) {
        element = element[0];
      }
      element.node.parentNode.insertBefore(this.node, element.node);
      R._insertbefore(this, element, this.paper);
      return this;
    };
    elproto.blur = function (size) {
      var s = this.node.runtimeStyle, f = s.filter;
      f = f.replace(blurregexp, E);
      if (+size !== 0) {
        this.attrs.blur = size;
        s.filter = f + S + ms + '.Blur(pixelradius=' + (+size || 1.5) + ')';
        s.margin = R.format('-{0}px 0 0 -{0}px', round(+size || 1.5));
      } else {
        s.filter = f;
        s.margin = 0;
        delete this.attrs.blur;
      }
      return this;
    };
    R._engine.path = function (pathString, vml) {
      var el = createNode('shape');
      el.style.cssText = cssDot;
      el.coordsize = zoom + S + zoom;
      el.coordorigin = vml.coordorigin;
      var p = new Element(el, vml), attr = {
          fill: 'none',
          stroke: '#000'
        };
      pathString && (attr.path = pathString);
      p.type = 'path';
      p.path = [];
      p.Path = E;
      setFillAndStroke(p, attr);
      vml.canvas.appendChild(el);
      var skew = createNode('skew');
      skew.on = true;
      el.appendChild(skew);
      p.skew = skew;
      p.transform(E);
      return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
      var path = R._rectPath(x, y, w, h, r), res = vml.path(path), a = res.attrs;
      res.X = a.x = x;
      res.Y = a.y = y;
      res.W = a.width = w;
      res.H = a.height = h;
      a.r = r;
      a.path = path;
      res.type = 'rect';
      return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
      var res = vml.path(), a = res.attrs;
      res.X = x - rx;
      res.Y = y - ry;
      res.W = rx * 2;
      res.H = ry * 2;
      res.type = 'ellipse';
      setFillAndStroke(res, {
        cx: x,
        cy: y,
        rx: rx,
        ry: ry
      });
      return res;
    };
    R._engine.circle = function (vml, x, y, r) {
      var res = vml.path(), a = res.attrs;
      res.X = x - r;
      res.Y = y - r;
      res.W = res.H = r * 2;
      res.type = 'circle';
      setFillAndStroke(res, {
        cx: x,
        cy: y,
        r: r
      });
      return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
      var path = R._rectPath(x, y, w, h), res = vml.path(path).attr({ stroke: 'none' }), a = res.attrs, node = res.node, fill = node.getElementsByTagName(fillString)[0];
      a.src = src;
      res.X = a.x = x;
      res.Y = a.y = y;
      res.W = a.width = w;
      res.H = a.height = h;
      a.path = path;
      res.type = 'image';
      fill.parentNode == node && node.removeChild(fill);
      fill.rotate = true;
      fill.src = src;
      fill.type = 'tile';
      res._.fillpos = [
        x,
        y
      ];
      res._.fillsize = [
        w,
        h
      ];
      node.appendChild(fill);
      setCoords(res, 1, 1, 0, 0, 0);
      return res;
    };
    R._engine.text = function (vml, x, y, text) {
      var el = createNode('shape'), path = createNode('path'), o = createNode('textpath');
      x = x || 0;
      y = y || 0;
      text = text || '';
      path.v = R.format('m{0},{1}l{2},{1}', round(x * zoom), round(y * zoom), round(x * zoom) + 1);
      path.textpathok = true;
      o.string = Str(text);
      o.on = true;
      el.style.cssText = cssDot;
      el.coordsize = zoom + S + zoom;
      el.coordorigin = '0 0';
      var p = new Element(el, vml), attr = {
          fill: '#000',
          stroke: 'none',
          font: R._availableAttrs.font,
          text: text
        };
      p.shape = el;
      p.path = path;
      p.textpath = o;
      p.type = 'text';
      p.attrs.text = Str(text);
      p.attrs.x = x;
      p.attrs.y = y;
      p.attrs.w = 1;
      p.attrs.h = 1;
      setFillAndStroke(p, attr);
      el.appendChild(o);
      el.appendChild(path);
      vml.canvas.appendChild(el);
      var skew = createNode('skew');
      skew.on = true;
      el.appendChild(skew);
      p.skew = skew;
      p.transform(E);
      return p;
    };
    R._engine.setSize = function (width, height) {
      var cs = this.canvas.style;
      this.width = width;
      this.height = height;
      width == +width && (width += 'px');
      height == +height && (height += 'px');
      cs.width = width;
      cs.height = height;
      cs.clip = 'rect(0 ' + width + ' ' + height + ' 0)';
      if (this._viewBox) {
        R._engine.setViewBox.apply(this, this._viewBox);
      }
      return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
      R.eve('raphael.setViewBox', this, this._viewBox, [
        x,
        y,
        w,
        h,
        fit
      ]);
      var width = this.width, height = this.height, size = 1 / mmax(w / width, h / height), H, W;
      if (fit) {
        H = height / h;
        W = width / w;
        if (w * H < width) {
          x -= (width - w * H) / 2 / H;
        }
        if (h * W < height) {
          y -= (height - h * W) / 2 / W;
        }
      }
      this._viewBox = [
        x,
        y,
        w,
        h,
        !!fit
      ];
      this._viewBoxShift = {
        dx: -x,
        dy: -y,
        scale: size
      };
      this.forEach(function (el) {
        el.transform('...');
      });
      return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
      var doc = win.document;
      doc.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)');
      try {
        !doc.namespaces.rvml && doc.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml');
        createNode = function (tagName) {
          return doc.createElement('<rvml:' + tagName + ' class="rvml">');
        };
      } catch (e) {
        createNode = function (tagName) {
          return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
        };
      }
    };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
      var con = R._getContainer.apply(0, arguments), container = con.container, height = con.height, s, width = con.width, x = con.x, y = con.y;
      if (!container) {
        throw new Error('VML container not found.');
      }
      var res = new R._Paper(), c = res.canvas = R._g.doc.createElement('div'), cs = c.style;
      x = x || 0;
      y = y || 0;
      width = width || 512;
      height = height || 342;
      res.width = width;
      res.height = height;
      width == +width && (width += 'px');
      height == +height && (height += 'px');
      res.coordsize = zoom * 1000 + S + zoom * 1000;
      res.coordorigin = '0 0';
      res.span = R._g.doc.createElement('span');
      res.span.style.cssText = 'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;';
      c.appendChild(res.span);
      cs.cssText = R.format('top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden', width, height);
      if (container == 1) {
        R._g.doc.body.appendChild(c);
        cs.left = x + 'px';
        cs.top = y + 'px';
        cs.position = 'absolute';
      } else {
        if (container.firstChild) {
          container.insertBefore(c, container.firstChild);
        } else {
          container.appendChild(c);
        }
      }
      res.renderfix = function () {
      };
      return res;
    };
    R.prototype.clear = function () {
      R.eve('raphael.clear', this);
      this.canvas.innerHTML = E;
      this.span = R._g.doc.createElement('span');
      this.span.style.cssText = 'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;';
      this.canvas.appendChild(this.span);
      this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
      R.eve('raphael.remove', this);
      this.canvas.parentNode.removeChild(this.canvas);
      for (var i in this) {
        this[i] = typeof this[i] == 'function' ? R._removedFactory(i) : null;
      }
      return true;
    };
    var setproto = R.st;
    for (var method in elproto)
      if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = function (methodname) {
          return function () {
            var arg = arguments;
            return this.forEach(function (el) {
              el[methodname].apply(el, arg);
            });
          };
        }(method);
      }
  }(window.Raphael);
}();
achart_canvas_112_src_canvasitem_debug = function (exports) {
  var Util = achart_util_110_index_debug;
  var Item = function () {
  };
  Util.augment(Item, {
    toFront: function () {
      this.get('el').toFront();
      return this;
    },
    toBack: function () {
      this.get('el').toBack();
      return this;
    },
    translate: function (dx, dy) {
      var _self = this, el = _self.get('el');
      el.translate(dx, dy);
      return this;
    },
    index: function () {
      var _self = this, parent = _self.get('parent');
      return Util.indexOf(parent.get('children'), _self);
    },
    animate: function (params, ms, easing, callback) {
      this.get('el').animate(params, ms, easing, callback);
      return this;
    },
    stopAnimate: function () {
      this.get('el').stop();
      return this;
    },
    drag: function (onmove, onstart, onend, mcontext, scontext, econtext) {
      this.get('el').drag(onmove, onstart, onend, mcontext, scontext, econtext);
      return this;
    }
  });
  exports = Item;
  return exports;
}();
achart_plot_111_src_plotrange_debug = function (exports) {
  var Util = achart_util_110_index_debug;
  function min(x, y) {
    return x > y ? y : x;
  }
  function max(x, y) {
    return x > y ? x : y;
  }
  function PlotRange(start, end) {
    this.start = start;
    this.end = end;
    this.init();
  }
  Util.augment(PlotRange, {
    init: function () {
      var plotRange = this;
      start = plotRange.start;
      end = plotRange.end;
      var tl = plotRange.tl = {};
      tl.x = min(start.x, end.x);
      tl.y = min(start.y, end.y);
      var tr = plotRange.tr = {};
      tr.x = max(start.x, end.x);
      tr.y = min(start.y, end.y);
      var bl = plotRange.bl = {};
      bl.x = min(start.x, end.x);
      bl.y = max(start.y, end.y);
      var br = plotRange.br = {};
      br.x = max(start.x, end.x);
      br.y = max(start.y, end.y);
      var cc = plotRange.cc = {};
      cc.x = (br.x - tl.x) / 2 + tl.x;
      cc.y = (br.y - tl.y) / 2 + tl.y;
    },
    reset: function (start, end) {
      this.start = start;
      this.end = end;
      this.init();
    },
    isInRange: function (x, y) {
      if (Util.isObject(x)) {
        y = x.y;
        x = x.x;
      }
      var plotRange = this, tl = plotRange.tl, br = plotRange.br;
      return x >= tl.x && x <= br.x && y >= tl.y && y <= br.y;
    },
    isInVertical: function (y) {
      if (Util.isObject(y)) {
        y = y.y;
      }
      var plotRange = this, tl = plotRange.tl, br = plotRange.br;
      return y >= tl.y && y <= br.y;
    },
    isInHorizontal: function (x) {
      if (Util.isObject(x)) {
        x = x.x;
      }
      var plotRange = this, tl = plotRange.tl, br = plotRange.br;
      return x >= tl.x && x <= br.x;
    },
    getWidth: function () {
      var tl = this.tl, br = this.br;
      return br.x - tl.x;
    },
    getHeight: function () {
      var tl = this.tl, br = this.br;
      return br.y - tl.y;
    }
  });
  exports = PlotRange;
  return exports;
}();
achart_actived_102_src_actived_debug = function (exports) {
  var Util = achart_util_110_index_debug;
  var Actived = function () {
  };
  Actived.ATTRS = { actived: false };
  Util.augment(Actived, {
    isActived: function () {
      return this.get('actived');
    },
    setActived: function () {
      this.setActiveStatus(true);
      this.set('actived', true);
    },
    setActiveStatus: function (actived) {
    },
    clearActived: function () {
      this.setActiveStatus(false);
      this.set('actived', false);
      if (this.clearActivedItem) {
        this.clearActivedItem();
      }
    }
  });
  exports = Actived;
  return exports;
}();
achart_actived_102_src_activedgroup_debug = function (exports) {
  var Util = achart_util_110_index_debug;
  var Group = function () {
  };
  Group.ATTRS = {};
  Util.augment(Group, {
    isItemActived: function (item) {
      return item.isActived();
    },
    getActiveItems: function () {
      return this.get('children');
    },
    setItemActived: function (item, actived) {
      if (actived) {
        item.setActived();
      } else {
        item.clearActived();
      }
    },
    onActived: function (item) {
      this.fire('itemactived', { item: item });
      this.fireUpGroup && this.fireUpGroup('actived', item);
    },
    onUnActived: function (item) {
      this.fire('itemunactived', { item: item });
      this.fireUpGroup && this.fireUpGroup('unactived', item);
    },
    setActivedItem: function (item) {
      var _self = this;
      _self.clearActivedItem();
      if (item && !_self.isItemActived(item)) {
        _self.setItemActived(item, true);
        _self.onActived(item);
      }
    },
    getActived: function () {
      var _self = this, items = _self.getActiveItems(), rst = null;
      Util.each(items, function (item) {
        if (_self.isItemActived(item)) {
          rst = item;
          return false;
        }
      });
      return rst;
    },
    clearActivedItem: function (item) {
      var _self = this;
      item = item || _self.getActived();
      if (item) {
        _self.setItemActived(item, false);
        _self.onUnActived(item);
      }
    }
  });
  exports = Group;
  return exports;
}();
achart_auto_103_index_debug = function (exports) {
  var Util = achart_util_110_index_debug, DateUtil = achart_date_100_index_debug, snapArray = [
      0,
      1,
      1.5,
      2,
      2.5,
      3,
      4,
      5,
      6,
      8,
      10
    ], intervalArray = [
      0,
      1,
      2,
      5,
      10
    ], snapTimeArray = [
      1,
      2,
      4,
      6,
      8,
      12
    ], MIN_COUNT = 5, MAX_COUNT = 7;
  function isNull(v) {
    return v == null;
  }
  function getFactor(v) {
    var factor = 1;
    if (v < 0.000001) {
      return factor;
    }
    while (v > 10) {
      factor = factor * 10;
      v = v / 10;
    }
    while (v < 1) {
      factor = factor / 10;
      v = v * 10;
    }
    return factor;
  }
  function snapTo(v, isFloor, arr) {
    arr = arr || snapArray;
    var isMiddle = arr == snapArray ? false : true;
    var factor = 1;
    if (v < 0) {
      factor = -1;
    }
    v = v * factor;
    var tmpFactor = getFactor(v);
    factor = factor * tmpFactor;
    v = v / tmpFactor;
    if (isMiddle) {
      v = snapMiddle(arr, v);
    } else if (isFloor && factor > 0) {
      v = Util.snapFloor(arr, v);
    } else {
      v = Util.snapCeiling(arr, v);
    }
    return v * factor;
  }
  function snapMiddle(arr, v) {
    var big = v, little = v, rst = v;
    for (var i = 1; i < arr.length; i++) {
      var value = arr[i];
      if (value > v) {
        big = value;
        break;
      } else {
        little = value;
      }
    }
    if (Math.abs(little - v) < Math.abs(big - v)) {
      rst = little;
    } else {
      rst = big;
    }
    return rst;
  }
  function snapMultiple(v, base, ceil) {
    if (ceil) {
      var div = Math.ceil(v / base, 10);
    } else {
      var div = Math.floor(v / base, 10);
    }
    return div * base;
  }
  function tryFixed(v, base) {
    var str = base.toString(), index = str.indexOf('.');
    if (index == -1) {
      return v;
    }
    var length = str.substr(index + 1).length;
    return parseFloat(v.toFixed(length));
  }
  function analyze(arr) {
    var max = arr[0], min = arr[0], length = arr.length;
    for (var i = 1; i < length; i++) {
      var val = arr[i];
      if (max < val) {
        max = val;
      }
      if (min > val) {
        min = val;
      }
    }
    if (min == max) {
      if (min > 0) {
        min = 0;
      } else {
        max = 0;
      }
    }
    return {
      max: max,
      min: min
    };
  }
  function getSimpleArray(data, stacked) {
    var arr = [];
    if (stacked) {
      if (Util.isArray(data[0])) {
        Util.each(data[0], function (value, index) {
          var temp = value;
          for (var i = 1; i < data.length; i++) {
            temp += data[i][index];
          }
          arr.push(temp);
        });
      }
    } else {
      Util.each(data, function (sub) {
        if (Util.isArray(sub)) {
          arr = arr.concat(sub);
        } else {
          arr.push(sub);
        }
      });
    }
    return arr;
  }
  function analyzeData(data, parser, stacked) {
    var arr = getSimpleArray(data, stacked);
    if (parser) {
      arr = Util.map(arr, parser);
    }
    return analyze(arr);
  }
  var Auto = {};
  Auto.caculate = function (info, stackType) {
    var min = info.min, max = info.max, data = info.data, interval = info.interval, ticks = [], minCount = info.minCount || MIN_COUNT, maxCount = info.maxCount || MAX_COUNT, avgCount = (minCount + maxCount) / 2, count, stacked = false;
    if (stackType) {
      if (stackType == 'percent') {
        min = 0;
        max = 100;
        interval = 25;
      }
    }
    if (isNull(min) || isNull(max) || isNull(interval)) {
      var rst = analyzeData(data, null, stacked);
      if (isNull(max)) {
        max = rst.max + 0.05 * (rst.max - rst.min);
      }
      if (isNull(min)) {
        min = rst.min;
      }
      if (max == min) {
        max = min + 1;
        min = min - 1;
        interval = 1;
      }
      if (isNull(interval)) {
        var temp = (max - min) / avgCount;
        interval = snapTo(temp, true, intervalArray);
        count = parseInt((max - min) / interval, 10);
        if (count > maxCount) {
          count = maxCount;
        }
        if (count < minCount) {
          count = minCount;
        }
        interval = snapTo((max - min) / count, true, intervalArray);
        max = snapMultiple(max, interval, true);
        min = snapMultiple(min, interval);
        count = Math.round((max - min) / interval);
      }
    }
    if (isNull(count)) {
      count = (max - min) / interval;
    }
    min = tryFixed(min, interval);
    if (!isNull(min)) {
      ticks.push(min);
    }
    for (var i = 1; i <= count; i++) {
      ticks.push(tryFixed(interval * i + min, interval));
    }
    return {
      min: min,
      max: tryFixed(max, interval),
      interval: interval,
      count: count,
      ticks: ticks,
      info: rst
    };
  };
  Auto.Time = {};
  var MINUTE_MS = 60 * 1000, HOUR_MS = 3600 * 1000, DAY_MS = 24 * 3600 * 1000;
  function floorDate(date) {
    date = new Date(date);
    return DateUtil.getDate(date).getTime();
  }
  function ceilDate(date) {
    date = new Date(date);
    var temp = DateUtil.getDate(date);
    if (temp < date) {
      temp = DateUtil.addDay(1, temp);
    }
    return temp.getTime();
  }
  function getYear(date) {
    return new Date(date).getFullYear();
  }
  function createYear(year) {
    return new Date(year, 0, 1).getTime();
  }
  function getMonth(date) {
    return new Date(date).getMonth();
  }
  function diffMonth(min, max) {
    var minYear = getYear(min), maxYear = getYear(max), minMonth = getMonth(min), maxMonth = getMonth(max);
    return (maxYear - minYear) * 12 + (maxMonth - minMonth) % 12;
  }
  function creatMonth(year, month) {
    return new Date(year, month, 1).getTime();
  }
  function diffDay(min, max) {
    return Math.ceil((max - min) / DAY_MS);
  }
  function diffHour(min, max) {
    return Math.ceil((max - min) / HOUR_MS);
  }
  function diffMinus(min, max) {
    return Math.ceil((max - min) / (60 * 1000));
  }
  Auto.Time.caculate = function (info) {
    var min = info.min, max = info.max, data = info.data, interval = info.interval, ticks = [], count, rst = {};
    if (isNull(min) || isNull(max) || isNull(interval)) {
      rst = analyzeData(data, function (date) {
        if (Util.isDate(date)) {
          date = date.getTime();
        }
        if (Util.isString(date)) {
          date = date.replace(/-/gi, '/');
          date = new Date(date);
        }
        return date;
      });
      if (isNull(max)) {
        max = rst.max;
      }
      if (isNull(min)) {
        min = rst.min;
      }
      if (max - min > DAY_MS) {
        min = floorDate(min);
        max = ceilDate(max);
      }
      if (max == min) {
        throw 'max not  equal to min';
      }
      if (isNull(interval)) {
        var innerTime = max - min, dms = DAY_MS, yms = 365 * dms, yfactor, year;
        interval = parseInt(innerTime / (info.maxCount || 8));
        yfactor = interval / yms;
        var minYear = getYear(min);
        if (yfactor > 0.51) {
          year = Math.ceil(yfactor);
          interval = year * yms;
          var maxYear = getYear(max);
          for (var i = minYear; i <= maxYear + year; i = i + year) {
            ticks.push(createYear(i));
          }
          interval = null;
        } else if (yfactor > 0.0834) {
          var year = getYear(min), month = Math.floor(yfactor / 0.0834), mmMoth = getMonth(min), dMonths = diffMonth(min, max);
          for (var i = 0; i <= dMonths + month; i = i + month) {
            ticks.push(creatMonth(minYear, i + mmMoth));
          }
          interval = null;
        } else if (interval > dms * 0.5) {
          var date = new Date(min), year = date.getFullYear(), month = date.getMonth(min), mday = date.getDate(), day = Math.ceil(interval / dms), ddays = diffDay(min, max);
          interval = day * dms;
          for (var i = 0; i < ddays + day; i = i + day) {
            ticks.push(new Date(year, month, mday + i).getTime());
          }
        } else if (interval > HOUR_MS) {
          var date = new Date(min), year = date.getFullYear(), month = date.getMonth(min), day = date.getDate(), hour = date.getHours(), hours = Util.snapTo(snapTimeArray, Math.ceil(interval / HOUR_MS)), dHours = diffHour(min, max);
          interval = hours * HOUR_MS;
          for (var i = 0; i <= dHours + hours; i = i + hours) {
            ticks.push(new Date(year, month, day, hour + i).getTime());
          }
        } else if (interval > MINUTE_MS) {
          var dMinus = diffMinus(min, max), minutes = Math.ceil(interval / MINUTE_MS);
          interval = minutes * MINUTE_MS;
          for (var i = 0; i <= dMinus + minutes; i = i + minutes) {
            ticks.push(min + i * MINUTE_MS);
          }
        } else {
          if (interval < 1000) {
            interval == 1000;
          }
          min = Math.floor(min / 1000) * 1000;
          var dSeconds = Math.ceil((max - min) / 1000), seconds = Math.ceil(interval / 1000);
          interval = seconds * 1000;
          for (var i = 0; i < dSeconds + seconds; i = i + seconds) {
            ticks.push(min + i * 1000);
          }
        }
      }
    }
    if (!ticks.length) {
      min = Math.floor(min / 1000) * 1000;
      max = Math.ceil(max / 1000) * 1000;
      var count = (max - min) / interval;
      for (var i = 0; i <= count; i++) {
        ticks.push(tryFixed(interval * i + min, interval));
      }
    }
    return {
      max: rst.max || max,
      min: rst.min || min,
      interval: interval,
      ticks: ticks,
      count: ticks.length
    };
  };
  Auto.TimeCategory = {};
  Auto.TimeCategory.caculate = function (info) {
    var rst = {}, ticks = [], tickCount = info.maxCount || MAX_COUNT;
    var categories = getSimpleArray(info.data);
    if (categories.length < tickCount) {
      ticks = [].concat(categories);
    } else {
      var length = categories.length, step = parseInt(length / tickCount, 10);
      for (var i = 0; i < length - 1; i = i + step) {
        ticks.push(categories[i]);
      }
      var last = categories[length - 1];
      if (categories[1] - categories[0] > 2 * (last - categories[categories.length - 2])) {
        ticks.pop();
      }
      ticks.push(last);
    }
    rst.categories = categories;
    rst.ticks = ticks;
    return rst;
  };
  exports = Auto;
  return exports;
}();
achart_series_107_src_stacked_debug = function (exports) {
  /**
   * @fileOverview 处理层叠的数据序列的扩展
   * @ignore
   */
  var Util = achart_util_110_index_debug;
  /**
   * @class Chart.Series.Stacked
   * @protected
   * 此类是一个扩展，不应该直接实例化,主要用于区域图，柱状图层叠的场景
   *
   *  - <a href="http://spmjs.io/docs/achart-series/latest/api/stacked.html" target="_blank">文档</a>
   *  - <a href="http://spmjs.io/docs/achart-series/latest/wiki/07-stacked.html" target="_blank">wiki</a>
   * 
   */
  var Stacked = function () {
  };
  Stacked.ATTRS = {
    /**
     * 数据序列层叠的类型
     *   - none : 不进行层叠
     *   - normal : 一般的层叠方式，后面的数据序列的y值在前一个数据序列基础上显示
     *   - percent : 按照百分比进行层叠展示
     * @type {String}
     */
    stackType: 'none'
  };
  Util.augment(Stacked, {
    /**
     * @protected
     * 处理层叠的点
     * @param  {Object} point 处理的点
     * @param  {Number} index 索引
     */
    processStackedPoint: function (point, index) {
      var _self = this, pre = _self.getVisiblePrev(), xName = _self.getXName(), yName = _self.getYName();
      if (pre) {
        var prePoint = pre.getPoints()[index], baseValue = _self.getBaseValue();
        if (!_self.isInCircle()) {
          //非雷达图中
          point[yName] = point[yName] + prePoint[yName] - baseValue;
        } else {
          //雷达图中
          var xAxis = _self.get('xAxis'), r = xAxis.getDistance(point.x, point.y), ir = prePoint.r || xAxis.getDistance(prePoint.x, prePoint.y), curPoint;
          r = ir + r;
          curPoint = xAxis.getCirclePoint(point.xValue, r);
          point.x = curPoint.x;
          point.y = curPoint.y;
          point.r = r;
          point.ir = ir;
        }
        point.lowY = prePoint[yName];
        point.lowX = prePoint[xName];
      }
    },
    /**
     * @protected
     * 获取数据中的比例
     */
    getStackedPercent: function (value, index) {
      var _self = this, data = _self.get('parent').getStackedData(_self.get('yAxis'), 'yAxis'), total = data[index];
      if (total) {
        return value / total;
      }
      return NaN;
    },
    /**
     * @protected
     * 转换显示的值，一般用于层叠的数据序列中
     */
    parseYValue: function (value, index) {
      var _self = this, stackType = _self.get('stackType'), data = _self.get('data'), index = index == null ? Util.indexOf(data, value) : index, percentValue;
      if (stackType == 'percent') {
        percentValue = _self.getStackedPercent(value, index);
        value = percentValue * 100;
      }
      return value;
    },
    /**
     * @protected
     * 获取显示的前一个序列
     */
    getVisiblePrev: function () {
      var _self = this, parent = _self.get('parent'), yAxis = _self.get('yAxis'), children = parent.get('children'), pre;
      Util.each(children, function (series, i) {
        if (series == _self) {
          return false;
        }
        if (series.get('visible') && series.get('yAxis') == yAxis) {
          //获取前一个显示的数据序列
          pre = series;
        }
      });
      return pre;
    },
    /**
     * 获取提示信息
     * @return {*} 返回显示在上面的文本
     */
    getTipInfo: function (point) {
      var _self = this, stackType = _self.get('stackType');
      if (stackType == 'percent') {
        var y = point.yValue || 0;
        return [
          point.value,
          '\uFF08' + y.toFixed(2) + '%\uFF09'
        ];
      }
      return point.value;
    },
    /**
     * 是否是层叠的数据序列
     * @return {Boolean} 
     */
    isStacked: function () {
      var _self = this, stackType = _self.get('stackType');
      return stackType && stackType !== 'none';
    }
  });
  exports = Stacked;
  return exports;
}();
achart_theme_101_index_debug = function (exports) {
  /**
   * @fileOverview 图表的皮肤
   * @ignore
   */
  var Util = achart_util_110_index_debug;
  /**
   * Chart.Theme
   * @param {Object} cfg  样式的配置项
   * @param {Object} base 扩展的样式
   */
  var Theme = function (base, cfg) {
    return Theme.initTheme(base, cfg);
  };
  Theme.initTheme = function (base, cfg) {
    return Util.mix(true, {}, base, cfg);
  };
  var lineCfg = {
      duration: 1000,
      line: {
        'stroke-width': 2,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round'
      },
      lineActived: { 'stroke-width': 3 },
      markers: {
        marker: { radius: 3 },
        actived: {
          radius: 6,
          stroke: '#fff'
        }
      },
      animate: true
    };
  Theme.Origin = Theme({
    // colors : [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'],
    plotCfg: { margin: [50] },
    yTickCounts: [
      3,
      5
    ],
    xTickCounts: [
      5,
      10
    ],
    title: {
      'font-size': '16px',
      'font-family': 'SimSun,Georgia, Times, serif',
      'fill': '#274b6d'
    },
    subTitle: {
      'font-size': 14,
      'font-family': 'tahoma,arial,SimSun,Georgia, Times, serif',
      'fill': '#4d759e'
    },
    xAxis: { labels: { label: { y: 12 } } },
    yAxis: {
      line: null,
      tickLine: null,
      grid: { line: { stroke: '#c0c0c0' } },
      title: {
        text: '',
        rotate: -90,
        x: -30
      },
      position: 'left',
      labels: { label: { x: -12 } }
    },
    legend: { dy: 30 },
    seriesOptions: {
      lineCfg: lineCfg,
      areaCfg: {
        line: {
          'stroke-width': 0.5,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round'
        },
        lineActived: { 'stroke-width': 1 },
        animate: true,
        markers: lineCfg.markers
      },
      arearangeCfg: {
        markers: null,
        line: { stroke: null },
        area: { stroke: null },
        lineActived: { stroke: null },
        areaActived: { stroke: null }
      },
      flagCfg: {
        flags: {
          flag: {
            distance: -15,
            line: {
              'stroke': '#333',
              'stroke-width': 1
            },
            shapeType: 'rect',
            shapeCfg: {
              stroke: '#333',
              width: 22,
              height: 22
            },
            title: 'A',
            titleCfg: {
              rotate: 90,
              fill: '#333333',
              'font-size': 13,
              'font-weight': 'bold'
            },
            text: ''
          }
        },
        duration: 1000,
        animate: true,
        onSeries: 'xaxis'
      },
      candlestickCfg: {
        candlesticks: {
          candlestick: {
            riseLine: { stroke: 'red' },
            fallLine: { stroke: 'green' },
            riseShape: {
              stroke: 'red',
              fill: 'red'
            },
            fallShape: {
              stroke: 'green',
              fill: 'green'
            }
          }
        }
      },
      bubbleCfg: {
        circle: {
          'stroke-width': 1,
          'fill-opacity': 0.5
        },
        activeCircle: { 'stroke-width': 2 }
      },
      pieCfg: {
        colors: [
          '#5e90c9',
          '#1c2d3f',
          '#a9d052',
          '#a12d2d',
          '#43bbb4',
          '#5a2a94',
          '#fabe3c',
          '#2279dc',
          '#e360e5',
          '#48000c'
        ],
        item: { stroke: '#fff' },
        labels: {
          distance: 30,
          label: {}
        }
      }
    },
    tooltip: {
      x: -999,
      y: -999,
      offset: 5
    }
  });
  // 所有的基础样式.由于深度继承,所以数组类的自己覆盖
  Theme.Base = Theme.initTheme(Theme.Origin, {
    colors: [
      '#5e90c9',
      '#1c2d3f',
      '#a9d052',
      '#a12d2d',
      '#43bbb4',
      '#5a2a94',
      '#fabe3c',
      '#2279dc',
      '#e360e5',
      '#48000c'
    ],
    symbols: [
      'circle',
      'diamond',
      'square',
      'triangle',
      'triangle-down'
    ],
    plotCfg: {
      margin: [
        50,
        50,
        100
      ]
    },
    seriesOptions: {
      pieCfg: {
        colors: [
          '#5e90c9',
          '#1c2d3f',
          '#a9d052',
          '#a12d2d',
          '#43bbb4',
          '#5a2a94',
          '#fabe3c',
          '#2279dc',
          '#e360e5',
          '#48000c'
        ]
      }
    }
  });
  // smooth风格的基础样式,色系分布均为6种.
  Theme.SmoothBase = Theme.initTheme(Theme.Origin, {
    title: { 'fill': '#505050' },
    subTitle: { 'fill': '#999' },
    xAxis: {
      line: {
        'stroke-width': 1,
        'stroke': '#a7a7a7'
      },
      tickLine: null,
      labels: {
        label: {
          y: 12,
          fill: '#444444',
          'font-size': '12'
        }
      }
    },
    yAxis: {
      grid: {
        line: {
          stroke: '#a7a7a7',
          //c9c3bb
          // "stroke-linecap" : "round",
          'stroke-dasharray': '.'
        }
      },
      title: {
        text: '',
        rotate: -90,
        x: -35,
        fill: '#444'
      },
      position: 'left',
      labels: {
        label: {
          x: -20,
          fill: '#444444',
          'font-size': '12'
        }
      }
    },
    plotCfg: {
      margin: [
        50,
        50,
        100
      ]
    },
    legend: {
      back: null,
      spacingX: 30,
      itemCfg: {
        //子项的配置信息
        label: {
          fill: '#a7a7a7',
          'text-anchor': 'start',
          cursor: 'pointer',
          'font-size': '12'
        }
      }
    },
    colors: [
      '#4dceff',
      '#79c850',
      '#ffb65d',
      '#fc694b',
      '#7179cb',
      '#9a9792'
    ],
    symbols: ['circle'],
    seriesOptions: {
      lineCfg: {
        line: { 'stroke-width': 4 },
        lineActived: { 'stroke-width': 4 },
        markers: {
          marker: {
            fill: '#fff',
            radius: 6,
            'stroke-width': 4
          },
          actived: {
            fill: '#fff',
            'stroke-width': 5,
            stroke: null
          }
        }
      },
      areaCfg: {
        markers: {
          single: true,
          marker: {
            fill: '#fff',
            radius: 6,
            'stroke-width': 4
          },
          actived: {
            fill: '#fff',
            'stroke-width': 5,
            stroke: null
          }
        },
        area: {
          'fill-opacity': 0.5,
          stroke: null
        }
      },
      pieCfg: {
        colors: [
          '#4dceff',
          '#79c850',
          '#ffb65d',
          '#fc694b',
          '#7179cb',
          '#9a9792'
        ],
        labels: {
          distance: 30,
          label: {
            'font-size': '12',
            fill: '#a7a7a7'
          }
        }
      }
    },
    tooltip: {
      offset: 10,
      title: {
        'font-size': '12',
        'text-anchor': 'start',
        x: 8,
        y: 15,
        fill: '#444'
      },
      value: {
        'font-size': '12',
        'font-weight': 'normal',
        'text-anchor': 'start',
        fill: '#444'
      },
      crossLine: { stroke: '#d7d7d7' }
    }
  });
  Theme.Smooth1 = Theme.initTheme(Theme.SmoothBase);
  Theme.Smooth2 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#00a3d7',
      '#6ebb46',
      '#f6c100',
      '#ff6a00',
      '#e32400',
      '#423ba8'
    ],
    symbols: [
      'circle',
      'diamond',
      'square',
      'triangle',
      'triangle-down'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#00a3d7',
          '#6ebb46',
          '#f6c100',
          '#ff6a00',
          '#e32400',
          '#423ba8'
        ]
      }
    }
  });
  Theme.Smooth3 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#40a00e',
      '#444444',
      '#85cc82',
      '#5e5e64',
      '#60b336',
      '#89847f'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#40a00e',
          '#444444',
          '#85cc82',
          '#5e5e64',
          '#60b336',
          '#89847f'
        ]
      }
    }
  });
  Theme.Smooth4 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#e1c673',
      '#c49756',
      '#8c6c42',
      '#595348',
      '#c86c4b',
      '#7c4f34'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#e1c673',
          '#c49756',
          '#8c6c42',
          '#595348',
          '#c86c4b',
          '#7c4f34'
        ]
      }
    }
  });
  Theme.Smooth5 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#89847f',
      '#aea9a2',
      '#606060',
      '#232323',
      '#d8d2c7',
      '#444444'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#89847f',
          '#aea9a2',
          '#606060',
          '#232323',
          '#d8d2c7',
          '#444444'
        ]
      }
    }
  });
  Theme.Smooth6 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#ff9d40',
      '#89847f',
      '#ff8127',
      '#b4aea7',
      '#ffba66',
      '#606060'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#ff9d40',
          '#89847f',
          '#ff8127',
          '#b4aea7',
          '#ffba66',
          '#606060'
        ]
      }
    }
  });
  Theme.Smooth7 = Theme.initTheme(Theme.SmoothBase, {
    colors: [
      '#25b0dd',
      '#7fdcff',
      '#30b2c8',
      '#5dc5ee',
      '#266796',
      '#258bca'
    ],
    seriesOptions: {
      pieCfg: {
        colors: [
          '#25b0dd',
          '#7fdcff',
          '#30b2c8',
          '#5dc5ee',
          '#266796',
          '#258bca'
        ]
      }
    }
  });
  exports = Theme;
  return exports;
}();
achart_raphael_102_src_index_debug = function (exports) {
  var Raphael = achart_raphael_102_src_core_debug;
  achart_raphael_102_src_svg_debug;
  achart_raphael_102_src_vml_debug;
  exports = Raphael;
  return exports;
}();
achart_actived_102_index_debug = function (exports) {
  var Actived = achart_actived_102_src_actived_debug;
  Actived.Group = achart_actived_102_src_activedgroup_debug;
  exports = Actived;
  return exports;
}();
achart_raphael_102_index_debug = function (exports) {
  var achartRaphael = achart_raphael_102_src_index_debug;
  exports = achartRaphael;
  return exports;
}();
achart_canvas_112_src_raphealgroup_debug = function () {
  var Util = achart_util_110_index_debug, R = achart_raphael_102_index_debug;
  R.fn.group = function () {
    var out = R._engine.group(this);
    this.__set__ && this.__set__.push(out);
    return out;
  };
  R._getPath.group = function (el) {
    var bbox = el._getBBox();
    return R._rectPath(0, 0, bbox.width, bbox.height);
  };
  var Group = function (node, svg) {
      Group.superclass.constructor.call(this, node, svg);
    }, groupproto;
  Util.extend(Group, R.el.constructor);
  groupproto = Group.prototype;
  groupproto.group = function () {
    var canvas = this.paper, out = canvas.group();
    this.node.appendChild(out.node);
    return out;
  };
  if (window.Raphael.svg) {
    function createNode(tagName) {
      return R._g.doc.createElementNS('http://www.w3.org/2000/svg', tagName);
    }
    R._engine.group = function (svg) {
      var el = createNode('g');
      svg.canvas && svg.canvas.appendChild(el);
      var res = new Group(el, svg);
      res.type = 'group';
      return res;
    };
    groupproto.add = function (json) {
      var rest = this.paper.add(json), el = this.node;
      rest.forEach(function (element) {
        el.appendChild(element.node);
      });
      return rest;
    };
  }
  if (window.Raphael.vml) {
    var createNode = function (tagName) {
      return R._g.doc.createElement('div');
    };
    R._getPath.group = function (el) {
      var node = el.node, set = el.__set, width = 0, height = 0;
      if (set) {
        set.forEach(function (element) {
          var bbox = element.getBBox();
          if (width < bbox.width) {
            width = width;
          }
          if (height < bbox.height) {
            height = bbox.height;
          }
        });
      }
      return R._rectPath(0, 0, width, height);
    };
    groupproto.add = function (json) {
      var rest = this.paper.add(json), el = this.node, set = this.__set;
      rest.forEach(function (element) {
        el.appendChild(element.node);
        if (set) {
          set.push(element);
        }
      });
      if (!this.__set) {
        this.__set = rest;
      }
      return rest;
    };
    groupproto.translate = function (dx, dy) {
      var el = this.node, top = parseFloat(el.style.top, 10) || 0, left = parseFloat(el.style.left, 10) || 0;
      el.style.top = top + dy + 'px';
      el.style.left = left + dx + 'px';
    };
    groupproto.move = function (x, y) {
      var el = this.node;
      el.style.top = y + 'px';
      el.style.left = x + 'px';
    };
    groupproto.animate = function (params, ms, easing, callback) {
      var el = this.node, top = parseFloat(el.style.top, 10) || 0, left = parseFloat(el.style.left, 10) || 0;
      Util.animStep(ms, function (factor) {
        el.style.top = top + (params.y - top) * factor + 'px';
        el.style.left = left + (params.x - left) * factor + 'px';
      }, callback);
    };
    groupproto.transform = function (tstr) {
      var set = this.__set;
      if (set) {
        set.forEach(function (element) {
          element.transform(tstr);
        });
      }
      Group.superclass.transform.call(this, tstr);
    };
    R._engine.group = function (vml) {
      var el = createNode();
      vml.canvas.appendChild(el);
      var res = new Group(el, vml);
      res.type = 'group';
      el.style.position = 'relative';
      return res;
    };
  }
}();
achart_canvas_112_src_util_debug = function (exports) {
  var Util = achart_util_110_index_debug;
  var Raphael = achart_raphael_102_index_debug, HANDLERS = {}, TIMES = {}, NAN = NaN, PRE_HAND = 'h', objectPrototype = Object.prototype, toString = objectPrototype.toString;
  function animTime(duration, fn, callback) {
    var baseTime = new Date().getTime(), baseInterval = 16, uid = Util.guid(PRE_HAND);
    next(0, fn, duration, callback);
    function next(num, fn, duration, callback) {
      var nowTime = new Date().getTime();
      var durTime = nowTime - baseTime;
      if (durTime >= duration) {
        fn(1, num);
        callback && callback();
        return;
      }
      var factor = Math.pow(durTime / duration, 1.7);
      fn(factor, num);
      HANDLERS[uid] = Util.requestAnimationFrame(function () {
        next(num + 1, fn, duration, callback);
      });
    }
    return uid;
  }
  function stopStep(uid) {
    if (HANDLERS[uid]) {
      Util.cancelAnimationFrame(HANDLERS[uid]);
      delete HANDLERS[uid];
    }
  }
  var ARR_EV = [
      'srcElement',
      'toElement',
      'clientX',
      'clientY',
      'keyCode'
    ];
  function getEventObj(ev) {
    var rst = {};
    rst.target = ev.srcElement;
    rst.pageX = ev.clientX + document.body.scrollLeft - document.body.clientLeft;
    rst.pageY = ev.clientY + document.body.scrollTop - document.body.clientTop;
    Util.each(ARR_EV, function (key) {
      rst[key] = ev[key];
    });
    rst.stopPropagation = function () {
      window.event.cancelBubble = true;
    };
    return rst;
  }
  var fragmentRE = /^\s*<(\w+|!)[^>]*>/, table = document.createElement('table'), tableRow = document.createElement('tr'), containers = {
      'tr': document.createElement('tbody'),
      'tbody': table,
      'thead': table,
      'tfoot': table,
      'td': tableRow,
      'th': tableRow,
      '*': document.createElement('div')
    };
  Util.mix(Util, {
    vml: Raphael.vml,
    svg: Raphael.svg,
    createDom: function (str) {
      var name = fragmentRE.test(str) && RegExp.$1;
      if (!(name in containers)) {
        name = '*';
      }
      container = containers[name];
      str = str.replace(/(^\s*)|(\s*$)/g, '');
      container.innerHTML = '' + str;
      return container.childNodes[0];
    },
    getOffset: function (o) {
      var rst = {}, left = 0, top = 0;
      while (o != null && o != document.body) {
        left += o.offsetLeft || 0;
        top += o.offsetTop || 0;
        o = o.offsetParent;
      }
      rst.top = top;
      rst.left = left;
      return rst;
    },
    contains: function (node, subNode) {
      if (!node || !subNode) {
        return false;
      }
      var rst = false, parent = subNode.parentNode;
      while (parent != null && parent != document.body) {
        if (parent == node) {
          rst = true;
          break;
        }
        parent = parent.parentNode;
      }
      return rst;
    },
    getWidth: function (el) {
      var width = Util.getStyle(el, 'width');
      if (width == 'auto') {
        width = el.offsetWidth;
      }
      return parseFloat(width);
    },
    getHeight: function (el) {
      var height = Util.getStyle(el, 'height');
      if (height == 'auto') {
        height = el.offsetHeight;
      }
      return parseFloat(height);
    },
    getOuterWidth: function (el) {
      var width = Util.getWidth(el), bLeft = parseFloat(Util.getStyle(el, 'borderLeftWidth')) || 0, pLeft = parseFloat(Util.getStyle(el, 'paddingLeft')), pRight = parseFloat(Util.getStyle(el, 'paddingRight')), bRight = parseFloat(Util.getStyle(el, 'borderRightWidth')) || 0;
      return width + bLeft + bRight + pLeft + pRight;
    },
    getOuterHeight: function (el) {
      var height = Util.getHeight(el), bTop = parseFloat(Util.getStyle(el, 'borderTopWidth')) || 0, pTop = parseFloat(Util.getStyle(el, 'paddingTop')), pBottom = parseFloat(Util.getStyle(el, 'paddingBottom')), bBottom = parseFloat(Util.getStyle(el, 'borderBottomWidth')) || 0;
      return height + bTop + bBottom + pTop + pBottom;
    },
    getStyle: function (el, name) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)[name];
      }
      return el.currentStyle[name];
    },
    addEvent: function (obj, type, fn) {
      if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function () {
          window.event.target = window.event.srcElement;
          obj['e' + type + fn](getEventObj(window.event));
        };
        obj.attachEvent('on' + type, obj[type + fn]);
      } else
        obj.addEventListener(type, fn, false);
    },
    removeEvent: function (obj, type, fn) {
      if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn]);
        obj[type + fn] = null;
      } else
        obj.removeEventListener(type, fn, false);
    },
    angle: function (x1, y1, x2, y2) {
      return Raphael.angle(x1, y1, x2, y2);
    },
    animStep: function (duration, fn, callback) {
      return animTime(duration, fn, callback);
    },
    stopStep: function (handler) {
      stopStep(handler);
    },
    animPath: function (pathShape, toPath, reserve, duration, easing, callback) {
      if (Util.vml) {
        after();
        return;
      }
      reserve = reserve || 0;
      duration = duration || 400;
      if (!toPath) {
        after();
        return;
      }
      var curPath = pathShape.getPath(), endPath = Util.parsePathString(toPath), tempPath, last = curPath.slice(reserve * -1);
      if (curPath.length > endPath.length) {
        tempPath = curPath.slice(0, endPath.length);
      } else {
        tempPath = curPath.concat([]);
        if (reserve) {
          for (var i = tempPath.length; i < endPath.length; i++) {
            tempPath = tempPath.concat(last);
          }
        }
      }
      pathShape.attr('path', tempPath);
      pathShape.animate({ path: endPath }, duration, easing, after);
      function after() {
        pathShape.attr('path', toPath);
        callback && callback();
      }
    },
    getPointAtLength: function (path, length) {
      return Raphael.getPointAtLength(path, length);
    },
    isPointInsidePath: function (path, x, y) {
      return Raphael.isPointInsidePath(path, x, y);
    },
    getSubpath: function (path, from, to) {
      return Raphael.getSubpath(path, from, to);
    },
    parsePathString: function (str) {
      return Raphael.parsePathString(str);
    },
    parsePathArray: function (array) {
      if (Util.isArray(array)) {
        var path = Util.map(array, function (item) {
            var str = item.join(' ');
            return str.replace(/([a-z,A-Z])\s+/, '$1');
          });
        return path.join(' ');
      }
      return array;
    },
    transformPath: function (path, transform) {
      return Raphael.transformPath(path, transform);
    },
    trySet: function (obj, name, value) {
      if (obj && !obj[name]) {
        obj[name] = value;
      }
      return obj[name];
    },
    highlight: function (c, percent) {
      var color = Raphael.color(c), l = color.l * (1 + percent);
      return Raphael.hsl2rgb(color.h, color.s, l).hex;
    },
    dark: function (c, percent) {
      var color = Raphael.color(c), l = color.l * (1 - percent);
      return Raphael.hsl2rgb(color.h, color.s, l).hex;
    }
  });
  exports = Util;
  return exports;
}();
achart_canvas_112_src_base_debug = function (exports) {
  var Util = achart_canvas_112_src_util_debug;
  var Base = function (cfg) {
    this.cfg = cfg;
    this._attrs = {
      autoRender: true,
      visible: true
    };
    this.events = {};
    var defaultCfg = this.getDefaultCfg();
    Util.mix(this._attrs, defaultCfg, cfg);
    if (this.get('autoRender')) {
      this.render();
    }
  };
  Base.ATTRS = {
    zIndex: null,
    el: null,
    node: null,
    canvas: null,
    visible: true
  };
  Util.augment(Base, {
    getDefaultCfg: function () {
      return {};
    },
    set: function (name, value) {
      var m = '_onRender' + Util.ucfirst(name);
      if (this[m]) {
        this[m](value, this._attrs[name]);
      }
      this._attrs[name] = value;
    },
    get: function (name) {
      return this._attrs[name];
    },
    getCfgAttr: function (name) {
      return this.cfg[name];
    },
    show: function () {
      this.get('el').show();
      this.set('visible', true);
      if (!this.get('visible')) {
        this.fire('show');
      }
    },
    hide: function () {
      this.get('el').hide();
      this.set('visible', false);
      if (this.get('visible')) {
        this.fire('hide');
      }
    },
    attr: function (name, value) {
      var _self = this, el = _self.get('el');
      if (Util.isObject(name)) {
        Util.each(name, function (v, k) {
          _self.attr(k, v);
        });
        return _self;
      }
      if (value !== undefined) {
        return _self._setAttr(name, value);
      }
      return _self._getAttr(name);
    },
    on: function (eventType, fn) {
      var _self = this, node = _self.get('node'), events = this.events, callbacks = events[eventType];
      Util.addEvent(node, eventType, fn);
      if (!callbacks) {
        callbacks = events[eventType] = [];
      }
      callbacks.push(fn);
      return this;
    },
    off: function (eventType, fn) {
      var _self = this, node = _self.get('node'), events = this.events, callbacks = events[eventType];
      if (!eventType) {
        Util.each(events, function (callbacks, type) {
          Util.each(callbacks, function (m) {
            Util.removeEvent(node, type, m);
          });
        });
        this.events = {};
        return this;
      }
      Util.removeEvent(node, eventType, fn);
      if (callbacks) {
        Util.remove(callbacks, fn);
      }
      return this;
    },
    fire: function (eventType, eventObj) {
      var _self = this, events = _self.events, callbacks = events[eventType];
      if (callbacks) {
        Util.each(callbacks, function (m) {
          m(eventObj);
        });
      }
    },
    _getAttr: function (name) {
      var _self = this, el = _self.get('el'), value = el.attr ? el.attr(name) : '', m = '__get' + Util.ucfirst(name);
      if (_self[m]) {
        value = _self[m](value);
      }
      return value;
    },
    _setAttr: function (name, value) {
      var _self = this, el = _self.get('el'), m = '__set' + Util.ucfirst(name);
      if (_self[m]) {
        _self[m](value);
      } else {
        el.attr && el.attr(name, value);
      }
      return _self;
    },
    _onRenderElCls: function (cls, pre) {
      var _self = this, node = _self.get('node'), oldCls = node.getAttribute('class'), arr = oldCls ? oldCls.split(' ') : [];
      if (pre) {
        Util.remove(arr, pre);
      }
      if (cls) {
        arr.push(cls);
      }
      node.setAttribute('class', arr.join(' '));
    },
    _onRenderZIndex: function (zIndex) {
      var _self = this, node = _self.get('node');
      if (zIndex != null) {
        node.setAttribute('zIndex', zIndex);
        if (Util.vml) {
          node.style.zIndex = zIndex;
        }
      }
    },
    beforeRenderUI: function () {
    },
    render: function () {
      var _self = this, zIndex = _self.get('zIndex'), attrs = _self._attrs, node;
      if (!_self.get('rendered')) {
        _self.createDom();
        _self.beforeRenderUI();
        _self.renderUI();
        _self.set('rendered', true);
        node = _self.get('node');
        if (this.get('visible') == false) {
          this.hide();
        }
        Util.each(attrs, function (v, k) {
          var m = _self['_onRender' + Util.ucfirst(k)];
          if (m) {
            m.call(_self, v);
          }
        });
        _self.bindUI();
      }
    },
    createDom: function () {
    },
    renderUI: function () {
    },
    bindUI: function () {
    },
    remove: function (destroy) {
      if (destroy == undefined) {
        destroy = true;
      }
      var _self = this;
      if (_self.get('parent')) {
        _self.get('parent').removeChild(_self, destroy);
        _self.set('parent', null);
      }
      if (destroy) {
        _self.destroy();
      }
    },
    destroy: function () {
      var _self = this, el = _self.get('el'), destroyed = _self.get('destroyed'), node = _self.get('node');
      if (destroyed) {
        return;
      }
      el.remove && el.remove();
      _self._attrs = {};
      _self.events = {};
      _self.set('destroyed', true);
    }
  });
  exports = Base;
  return exports;
}();
achart_canvas_112_src_shape_debug = function (exports) {
  var Base = achart_canvas_112_src_base_debug, Item = achart_canvas_112_src_canvasitem_debug, Util = achart_util_110_index_debug;
  var Shape = function (cfg) {
    Shape.superclass.constructor.call(this, cfg);
  };
  Shape.ATTRS = { attrs: {} };
  Util.extend(Shape, Base);
  Util.mixin(Shape, [Item]);
  Util.augment(Shape, {
    isShape: true,
    createDom: function () {
      var _self = this, el = _self.get('el'), node, cfg, attrs;
      if (!el) {
        cfg = _self.cfg;
        attrs = _self.parseElCfg(cfg.attrs);
        el = _self.createElement(attrs);
        _self.set('el', el);
      }
      node = el.node;
      node.shape = this;
      _self.set('node', node);
      if (this.get('visible') == false) {
        el.hide();
      }
    },
    createElement: function (attrs) {
      var _self = this, parent = _self.get('parent'), set = parent.get('el').add([attrs]), element;
      element = set[0];
      return element;
    },
    parseElCfg: function (attrs) {
      attrs.type = this.get('type');
      return attrs;
    },
    getTotalLength: function () {
      return this.get('el').getTotalLength();
    },
    rotate: function (a, x, y) {
      var _self = this;
      if (_self.isGroup) {
        if (x == null && y == null) {
          var tpoint = _self._getTranslatePoint();
          x = tpoint.x;
          y = tpoint.y;
        }
      }
      this.get('el').rotate(a, x, y);
    },
    scale: function (sx, sy, cx, cy) {
      var _self = this, el = _self.get('el');
      el.scale(sx, sy, cx, cy);
    },
    transform: function (tstr) {
      var _self = this, el = _self.get('el');
      el.transform(tstr);
    },
    getBBox: function () {
      return this.get('el').getBBox();
    },
    getPath: function () {
      var _self = this, el = _self.get('el'), path = el.getPath();
      if (Util.isString(path)) {
        path = Util.parsePathString(path);
      }
      return path;
    },
    getPathString: function () {
      var _self = this, path = _self.getPath();
      return Util.parsePathArray(path);
    },
    getTransformPath: function () {
      var _self = this, path = _self.getPath(), matrix = _self.get('el').matrix;
      return Util.transformPath(path, matrix.toTransformString());
    },
    _getTranslatePoint: function () {
      var _self = this, tPath = _self.getTransformPath(), rst = {
          x: 0,
          y: 0
        };
      Util.each(tPath, function (item) {
        if (item[0] == 'M') {
          rst.x = item[1];
          rst.y = item[2];
        }
      });
      return rst;
    },
    __getTransform: function (value) {
      if (Util.isString(value)) {
        value = value.replace(/([t,s,r])/, ';$1 ').split(';');
        var temp = [];
        Util.each(value, function (str) {
          if (str) {
            var sub = str.split(' ');
            sub = Util.map(sub, function (subStr) {
              if (Util.isNumeric(subStr)) {
                return parseFloat(subStr);
              }
              return subStr;
            });
            temp.push(sub);
          }
        });
        value = temp;
      }
      return value;
    }
  });
  var Circle = function (cfg) {
    Circle.superclass.constructor.call(this, cfg);
  };
  Circle.ATTRS = {
    cx: {},
    cy: {},
    r: {}
  };
  Util.extend(Circle, Shape);
  Shape.Circle = Circle;
  var Rect = function (cfg) {
    Rect.superclass.constructor.call(this, cfg);
  };
  Rect.ATTRS = {
    x: {},
    y: {},
    width: {},
    height: {},
    r: { value: 0 }
  };
  Util.extend(Rect, Shape);
  Shape.Rect = Rect;
  var Ellipse = function (cfg) {
    Ellipse.superclass.constructor.call(this, cfg);
  };
  Ellipse.ATTRS = {
    cx: {},
    cy: {},
    rx: {},
    ry: {}
  };
  Util.extend(Ellipse, Shape);
  Shape.Ellipse = Ellipse;
  var Path = function (cfg) {
    Path.superclass.constructor.call(this, cfg);
  };
  Path.ATTRS = { path: {} };
  Util.extend(Path, Shape);
  Shape.Path = Path;
  var Line = function (cfg) {
    Line.superclass.constructor.call(this, cfg);
  };
  Line.ATTRS = {
    x1: {},
    y1: {},
    x2: {},
    y2: {}
  };
  Util.extend(Line, Path);
  Util.augment(Line, {
    parseElCfg: function (attrs) {
      attrs.type = 'path';
      attrs.path = Util.substitute('M {x1},{y1}L{x2},{y2}', attrs);
      return attrs;
    },
    _getLinePoint: function (pointIndex, coordIndex) {
      var path = this.getPath();
      return path[pointIndex][coordIndex];
    },
    _setLinePoint: function (pointIndex, coordIndex, value) {
      var _self = this, path = this.getPath();
      path[pointIndex][coordIndex] = value;
      _self.attr('path', path);
    },
    __setX1: function (value) {
      this._setLinePoint(0, 1, value);
    },
    __getX1: function () {
      return this._getLinePoint(0, 1);
    },
    __setX2: function (value) {
      this._setLinePoint(1, 1, value);
    },
    __getX2: function () {
      return this._getLinePoint(1, 1);
    },
    __setY1: function (value) {
      this._setLinePoint(0, 2, value);
    },
    __getY1: function () {
      return this._getLinePoint(0, 2);
    },
    __setY2: function (value) {
      this._setLinePoint(1, 2, value);
    },
    __getY2: function () {
      return this._getLinePoint(1, 2);
    }
  });
  Shape.Line = Line;
  function points2path(points, z) {
    if (Util.isArray(points)) {
      points = points.join(' ');
    }
    return 'M' + points + z;
  }
  var PolyLine = function (cfg) {
    PolyLine.superclass.constructor.call(this, cfg);
  };
  PolyLine.ATTRS = { points: [] };
  Util.extend(PolyLine, Path);
  Util.augment(PolyLine, {
    __setPoints: function (value) {
      var _self = this, el = _self.get('el'), path = points2path(value, '');
      _self.attr('path', path);
    },
    parseElCfg: function (attrs) {
      attrs.type = 'path';
      attrs.path = points2path(attrs.points, '');
      return attrs;
    }
  });
  Shape.PolyLine = PolyLine;
  var Polygon = function (cfg) {
    PolyLine.superclass.constructor.call(this, cfg);
  };
  Polygon.ATTRS = { points: [] };
  Util.extend(Polygon, Path);
  Util.augment(Polygon, {
    __setPoints: function (value) {
      var _self = this, el = _self.get('el'), path = points2path(value, 'z');
      _self.attr('path', path);
    },
    parseElCfg: function (attrs) {
      attrs.type = 'path';
      attrs.path = points2path(attrs.points, 'z');
      return attrs;
    }
  });
  Shape.Polygon = Polygon;
  var Text = function (cfg) {
    Text.superclass.constructor.call(this, cfg);
  };
  Text.ATTRS = {
    x: {},
    y: {},
    text: {},
    'font': {},
    'text-anchor': {}
  };
  Util.extend(Text, Shape);
  Shape.Text = Text;
  var Label = function (cfg) {
    Label.superclass.constructor.call(this, cfg);
  };
  Util.extend(Label, Text);
  Label.ATTRS = { rotate: {} };
  Util.augment(Label, {
    parseElCfg: function (attrs) {
      attrs.type = 'text';
      if (attrs.rotate) {
        attrs.transform = Util.substitute('r{rotate} {x} {y}', attrs);
      }
      return attrs;
    }
  });
  Shape.Label = Label;
  var Marker = function (cfg) {
    Marker.superclass.constructor.call(this, cfg);
  };
  Marker.ATTRS = {
    symbol: { value: 'custom' },
    radius: { value: 5 },
    path: {},
    x: {},
    y: {}
  };
  Marker.Symbols = {
    circle: function (x, y, r) {
      return [
        [
          'M',
          x,
          y - r
        ],
        [
          'a',
          r,
          r,
          0,
          1,
          1,
          0,
          2 * r
        ],
        [
          'a',
          r,
          r,
          0,
          1,
          1,
          0,
          -2 * r
        ],
        ['z']
      ];
    },
    square: function (x, y, r) {
      return [
        [
          'M',
          x - r,
          y - r
        ],
        [
          'L',
          x + r,
          y - r
        ],
        [
          'L',
          x + r,
          y + r
        ],
        [
          'L',
          x - r,
          y + r
        ],
        ['z']
      ];
    },
    diamond: function (x, y, r) {
      return [
        [
          'M',
          x - r,
          y
        ],
        [
          'L',
          x,
          y - r
        ],
        [
          'L',
          x + r,
          y
        ],
        [
          'L',
          x,
          y + r
        ],
        ['z']
      ];
    },
    triangle: function (x, y, r) {
      var diffX = r / 0.866, diffY = r;
      return [
        [
          'M',
          x,
          y - r
        ],
        [
          'L',
          x + diffX,
          y + diffY
        ],
        [
          'L',
          x - diffX,
          y + diffY
        ],
        ['z']
      ];
    },
    'triangle-down': function (x, y, r) {
      var diffX = r / 0.866, diffY = r;
      return [
        [
          'M',
          x,
          y + r
        ],
        [
          'L',
          x + diffX,
          y - diffY
        ],
        [
          'L',
          x - diffX,
          y - diffY
        ],
        ['z']
      ];
    }
  };
  Util.extend(Marker, Shape);
  Util.augment(Marker, {
    __setRadius: function (v) {
      var _self = this, attrs = _self.get('attrs');
      _self._setSize(attrs.x, attrs.y, v);
    },
    __getRadius: function () {
      return this.get('attrs').radius;
    },
    __setX: function (x) {
      var _self = this, attrs = _self.get('attrs');
      _self._setSize(x, attrs.y, attrs.radius);
    },
    __getX: function () {
      return this.get('attrs').x;
    },
    __setY: function (y) {
      var _self = this, attrs = _self.get('attrs');
      _self._setSize(attrs.x, y, attrs.radius);
    },
    __getY: function () {
      return this.get('attrs').y;
    },
    __getSymbol: function () {
      return this.get('attrs').symbol;
    },
    _setSize: function (x, y, radius) {
      var _self = this, attrs = _self.get('attrs'), el = _self.get('el');
      if (el.type !== 'image') {
        var cfg = {
            x: x,
            y: y,
            radius: radius
          };
        Util.mix(attrs, cfg);
        var path = _self._getPath(attrs);
        el.attr('path', path);
      } else {
        Util.mix(attrs, {
          width: radius * 2,
          height: radius * 2,
          x: x - (radius - attrs.radius),
          y: y - (radius - attrs.radius),
          radius: radius
        });
        el.attr(attrs);
      }
    },
    animate: function (params, ms, easing, callback) {
      var _self = this, attrs = _self.get('attrs'), path;
      if (_self.get('el').type == 'image') {
        var radius = params.radius || _self.attr('radius');
        params.x = params.x - radius;
        params.y = params.y - radius;
        Util.mix(attrs, {
          x: params.x,
          y: params.y
        });
        _self.get('el').animate(params, ms, easing, callback);
      } else {
        Util.mix(attrs, {
          x: params.x,
          y: params.y
        });
        path = _self._getPath(attrs);
        _self.get('el').animate({ path: path }, ms, easing, callback);
      }
    },
    parseElCfg: function (attrs) {
      var _self = this, symbol = attrs.symbol, radius = attrs.radius || 5;
      if (symbol && !Util.isFunction(symbol) && symbol.indexOf('url') != -1) {
        attrs.type = 'image';
        attrs.src = symbol.replace(/url\((.*)\)/, '$1');
        attrs.width = attrs.radius * 2;
        attrs.height = attrs.radius * 2;
        if (Util.vml) {
          attrs.x -= radius - 1, attrs.y -= radius - 1;
        } else {
          attrs.x -= radius, attrs.y -= radius;
        }
      } else {
        attrs.type = 'path';
        attrs.path = _self._getPath(attrs);
      }
      return attrs;
    },
    _getPath: function (attrs) {
      if (!attrs.symbol && attrs.path) {
        return Util.substitute(attrs.path, attrs);
      }
      var method;
      if (Util.isFunction(attrs.symbol)) {
        method = attrs.symbol;
      } else {
        method = Marker.Symbols[attrs.symbol];
      }
      if (method) {
        return method(attrs.x, attrs.y, attrs.radius);
      } else {
        throw 'not support this type ' + attrs.symbol;
      }
    }
  });
  Shape.Marker = Marker;
  var Image = function (cfg) {
    Image.superclass.constructor.call(this, cfg);
  };
  Image.ATTRS = {
    src: {},
    x: {},
    y: {},
    width: {},
    height: {}
  };
  Util.extend(Image, Shape);
  Shape.Image = Image;
  exports = Shape;
  return exports;
}();
achart_canvas_112_src_container_debug = function (exports) {
  var Shape = achart_canvas_112_src_shape_debug, Base = achart_canvas_112_src_base_debug, Util = achart_util_110_index_debug;
  var Container = function (cfg) {
    Container.superclass.constructor.call(this, cfg);
  };
  Util.extend(Container, Base);
  Container.ATTRS = { children: [] };
  Util.augment(Container, {
    isContainer: true,
    beforeRenderUI: function () {
      this.set('children', []);
    },
    getGroupClass: function () {
    },
    getShapeClass: function (type) {
      var cName = Util.ucfirst(type);
      if (Shape[cName]) {
        return Shape[cName];
      }
      return Shape;
    },
    addShape: function (type, attrs) {
      var _self = this, C, cfg, shape;
      if (Util.isObject(type)) {
        cfg = type;
        type = cfg.type;
      } else {
        cfg = {
          type: type,
          attrs: attrs,
          canvas: _self.get('canvas')
        };
      }
      cfg.parent = _self;
      C = _self.getShapeClass(type);
      shape = new C(cfg);
      shape.set('canvas', _self.get('canvas'));
      _self.addChild(shape);
      return shape;
    },
    addGroup: function (C, cfg) {
      if (Util.isObject(C)) {
        cfg = C;
        C = null;
      }
      var _self = this, cfg = Util.mix({
          parent: _self,
          canvas: _self.get('canvas')
        }, cfg), group;
      C = C || _self.getGroupClass();
      group = new C(cfg);
      _self.addChild(group);
      return group;
    },
    removeChild: function (item, destroy) {
      if (destroy == undefined) {
        destroy = true;
      }
      var _self = this, el = _self.get('el'), children = _self.get('children');
      Util.remove(children, item);
      if (el.__set && el.__set.exclude) {
        el.__set.exclude(item.get('el'));
      }
      if (destroy) {
        item.destroy();
      }
      return item;
    },
    addChild: function (item) {
      var _self = this, children = _self.get('children');
      children.push(item);
      item.parent = item;
    },
    getChildAt: function (index) {
      return this.get('children')[index];
    },
    getCount: function () {
      return this.get('children').length;
    },
    getLast: function () {
      return this.getChildAt(this.getCount() - 1);
    },
    getFirst: function () {
      return this.getChildAt(0);
    },
    find: function (id) {
      var _self = this;
      return _self.findBy(function (item) {
        return item.get('id') == id;
      });
    },
    sort: function () {
      var _self = this, node = _self.get('node'), children = Util.toArray(node.childNodes);
      if (Util.svg) {
        children.sort(function (obj1, obj2) {
          var zIndex1 = obj1.getAttribute('zIndex') || 0, zIndex2 = obj2.getAttribute('zIndex') || 0;
          return +zIndex1 - +zIndex2;
        });
        Util.each(children, function (item) {
          node.appendChild(item);
        });
      } else {
        Util.each(children, function (item) {
          var zIndex = item.getAttribute('zIndex');
          if (zIndex) {
            item.style.zIndex = zIndex;
          }
        });
      }
    },
    findBy: function (fn) {
      var _self = this, children = _self.get('children'), rst = null;
      Util.each(children, function (item) {
        if (fn(item)) {
          rst = item;
        } else if (item.findBy) {
          rst = item.findBy(fn);
        }
        if (rst) {
          return false;
        }
      });
      return rst;
    },
    findByNode: function (node) {
      return this.findBy(function (item) {
        return item.get('node') == node;
      });
    },
    clear: function () {
      var _self = this, children = _self.get('children'), el = _self.get('el');
      Util.each(children, function (item) {
        item.destroy();
      });
      children && Util.empty(children);
      if (el.__set && el.__set.clear) {
        el.__set.clear();
      }
      el.clear && el.clear();
    },
    destroy: function () {
      var _self = this, children = _self.get('children'), el = _self.get('el'), node = _self.get('node');
      if (_self.get('destroyed')) {
        return;
      }
      _self.clear();
      Container.superclass.destroy.call(this);
    }
  });
  exports = Container;
  return exports;
}();
achart_canvas_112_src_group_debug = function (exports) {
  var Container = achart_canvas_112_src_container_debug, Item = achart_canvas_112_src_canvasitem_debug, Util = achart_util_110_index_debug, Shape = achart_canvas_112_src_shape_debug;
  achart_canvas_112_src_raphealgroup_debug;
  var Group = function (cfg) {
    Group.superclass.constructor.call(this, cfg);
  };
  Group.ATTRS = {
    x: null,
    y: null
  };
  Util.extend(Group, Container);
  Util.mixin(Group, [Item]);
  Util.augment(Group, {
    isGroup: true,
    createDom: function () {
      var _self = this, el = _self.get('el'), attrs = _self.get('attrs'), node;
      if (!el) {
        el = _self.createElement();
        attrs && el.attr(attrs);
        _self.set('el', el);
      }
      node = el.node;
      node.group = _self;
      _self.set('node', node);
    },
    renderUI: function () {
      this._initTranslate();
    },
    _initTranslate: function () {
      var _self = this, x = _self.get('x'), y = _self.get('y');
      if (x || y) {
        _self._translate(x || 0, y || 0);
      } else {
        _self.set('x', x || 0);
        _self.set('y', y || 0);
      }
    },
    translate: function (dx, dy) {
      var _self = this, x = _self.get('x') || 0, y = _self.get('y') || 0;
      _self.set('x', x + dx);
      _self.set('y', y + dy);
      _self._translate(dx, dy);
    },
    getBBox: function () {
      var _self = this, children = _self.get('children'), w = 0, h = 0, rst = {};
      Util.each(children, function (item) {
        var bbox = item.getBBox(), w1 = bbox.width + bbox.x, h1 = bbox.height + bbox.y;
        if (w < w1) {
          w = w1;
        }
        if (h < h1) {
          h = h1;
        }
      });
      rst.x = _self.get('x');
      rst.y = _self.get('y');
      rst.width = w;
      rst.height = h;
      return rst;
    },
    _translate: function (dx, dy) {
      var _self = this, el = _self.get('el');
      el.translate(dx, dy);
    },
    containsElement: function (element) {
      var _self = this, node = _self.get('node');
      return node == element || Util.contains(node, element);
    },
    animate: function (params, ms, easing, callback) {
      var _self = this, el = _self.get('el');
      if (Util.svg) {
        var cfg = {};
        if (params.x != undefined) {
          cfg.transform = 't ' + params.x + ' ' + params.y;
        }
        if (params['clip-rect']) {
          cfg['clip-rect'] = params['clip-rect'];
        }
        if (params['clip-circle']) {
          cfg['clip-circle'] = params['clip-circle'];
        }
        if (params['clip-angle']) {
          cfg['clip-angle'] = params['clip-angle'];
        }
        if (params['transform']) {
          cfg['transform'] = params['transform'];
        }
        el.animate(cfg, ms, easing, callback);
      } else {
        el.animate(params, ms, easing, callback);
      }
      _self.set('x', params.x);
      _self.set('y', params.y);
    },
    move: function (x, y) {
      var _self = this, cx = _self.get('x') || 0, cy = _self.get('y') || 0;
      if (Util.svg) {
        _self._translate(x - cx, y - cy);
      } else {
        _self.get('el').move(x, y);
      }
      _self.set('x', x);
      _self.set('y', y);
    },
    createElement: function () {
      var _self = this, el = _self.get('parent').get('el');
      return el.group();
    },
    getGroupClass: function () {
      return Group;
    }
  });
  exports = Group;
  return exports;
}();
achart_canvas_112_src_canvas_debug = function (exports) {
  var Util = achart_util_110_index_debug, Group = achart_canvas_112_src_group_debug, Raphael = achart_raphael_102_index_debug, Container = achart_canvas_112_src_container_debug;
  var Canvas = function (cfg) {
    Canvas.superclass.constructor.call(this, cfg);
  };
  Canvas.ATTRS = {
    width: {},
    height: {},
    id: {},
    viewbox: {}
  };
  Util.extend(Canvas, Container);
  Util.augment(Canvas, {
    getGroupClass: function () {
      return Group;
    },
    renderUI: function () {
      var _self = this, id = _self.get('id'), width = _self.get('width'), height = _self.get('height'), el;
      el = Raphael(id, width, height);
      _self.set('canvas', _self);
      _self.set('el', el);
      _self.set('node', el.canvas);
    },
    setSize: function (width, height) {
      this.set('width', width);
      this.set('height', height);
      this.get('el').setSize(width, height);
    },
    setViewBox: function (x, y, w, h, fit) {
      this.get('el').setViewBox(x, y, w, h, fit);
      this.set('viewbox', {
        x: x,
        y: y,
        width: w,
        height: h
      });
    },
    getPoint: function (clientX, clientY) {
      var _self = this, node = _self.get('node'), viewbox = _self.get('viewbox'), offset = node.getBoundingClientRect(), point = {};
      if (!viewbox) {
        point.x = clientX - offset.left;
        point.y = clientY - offset.top;
      } else {
        var xfactor = viewbox.width / _self.get('width'), yfactor = viewbox.height / _self.get('height');
        point.x = (clientX - offset.left) * xfactor + viewbox.x;
        point.y = (clientY - offset.top) * yfactor + viewbox.y;
      }
      return point;
    },
    getRelativePoint: function (dx, dy) {
      var _self = this, viewbox = _self.get('viewbox'), point = {};
      if (!viewbox) {
        point.x = dx;
        point.y = dy;
      } else {
        var xfactor = viewbox.width / _self.get('width'), yfactor = viewbox.height / _self.get('height');
        point.x = dx * xfactor + viewbox.x;
        point.y = dy * xfactor + viewbox.y;
      }
      return point;
    }
  });
  exports = Canvas;
  return exports;
}();
achart_canvas_112_index_debug = function (exports) {
  var Canvas = achart_canvas_112_src_canvas_debug;
  Canvas.Group = achart_canvas_112_src_group_debug;
  Canvas.Shape = achart_canvas_112_src_shape_debug;
  exports = Canvas;
  return exports;
}();
achart_plot_111_src_plotitem_debug = function (exports) {
  var Util = achart_util_110_index_debug, Canvas = achart_canvas_112_index_debug;
  function initClassAttrs(c) {
    if (c._attrs || c == Canvas.Group) {
      return;
    }
    var superCon = c.superclass.constructor;
    if (superCon && !superCon._attrs) {
      initClassAttrs(superCon);
    }
    c._attrs = {};
    Util.mix(true, c._attrs, superCon._attrs);
    Util.mix(true, c._attrs, c.ATTRS);
  }
  function Item(cfg) {
    initClassAttrs(this.constructor);
    Item.superclass.constructor.call(this, cfg);
  }
  Item.ATTRS = {
    itemName: 'item',
    groupName: 'group',
    events: null
  };
  Util.extend(Item, Canvas.Group);
  Util.augment(Item, {
    getDefaultCfg: function () {
      var _self = this, con = _self.constructor, attrs = con._attrs, rst = Util.mix(true, {}, attrs);
      return rst;
    },
    beforeRenderUI: function () {
      var _self = this, events = _self.get('events');
      Item.superclass.beforeRenderUI.call(this);
      if (events) {
        Util.each(events, function (v, k) {
          _self.on(k, v);
        });
      }
    },
    getVisibleChildren: function () {
      var _self = this, children = _self.get('children');
      return Util.filter(children, function (item) {
        return item.get('visible');
      });
    },
    showChild: function (child) {
      if (child) {
        child.show();
      }
    },
    hideChild: function (child) {
      child && child.hide();
    },
    fireUp: function (name, ev) {
      var _self = this, canvas = _self.get('canvas'), chart = canvas.chart;
      ev = ev || {};
      if (chart) {
        ev.target = ev.target || chart;
        chart.fire(name, ev);
      }
    },
    fireUpGroup: function (name, item, obj) {
      var _self = this, itemName = _self.get('itemName'), groupName = _self.get('groupName');
      obj = obj || {};
      obj[itemName] = item;
      if (groupName) {
        obj[groupName] = _self.get('parent');
      }
      _self.fireUp(itemName.toLowerCase() + name, obj);
    }
  });
  exports = Item;
  return exports;
}();
achart_plot_111_src_plotback_debug = function (exports) {
  var Util = achart_util_110_index_debug, PlotItem = achart_plot_111_src_plotitem_debug, PlotRange = achart_plot_111_src_plotrange_debug;
  var PlotBack = function (cfg) {
    PlotBack.superclass.constructor.call(this, cfg);
  };
  PlotBack.ATTRS = {
    elCls: 'x-chart-back',
    zIndex: 0,
    margin: 20,
    plotRange: null,
    background: null,
    border: null
  };
  Util.extend(PlotBack, PlotItem);
  Util.augment(PlotBack, {
    beforeRenderUI: function () {
      PlotBack.superclass.beforeRenderUI.call(this);
      this._calculateRange();
    },
    renderUI: function () {
      PlotBack.superclass.renderUI.call(this);
      this._renderBorder();
      this._renderBackground();
    },
    repaint: function () {
      this._calculateRange();
      this._renderBorder();
      this._renderBackground();
      return this;
    },
    _renderBorder: function () {
      var _self = this, border = _self.get('border'), canvas = _self.get('canvas'), rect = _self.get('borderShape'), cfg;
      if (border) {
        var width = canvas.get('width'), height = canvas.get('height');
        if (!rect) {
          cfg = Util.mix({
            width: width,
            height: height
          }, border);
          rect = this.addShape('rect', cfg);
          this.set('borderShape', rect);
        } else {
          rect.attr({
            width: width,
            height: height
          });
        }
      }
    },
    _renderBackground: function () {
      var _self = this, background = _self.get('background'), plotRange = _self.get('plotRange'), backShape = _self.get('backShape'), width, height, tl, cfg;
      if (background) {
        width = plotRange.getWidth();
        height = plotRange.getHeight();
        tl = plotRange.tl;
        cfg = {
          x: tl.x,
          y: tl.y,
          width: width,
          height: height
        };
        if (!backShape) {
          if (background.image) {
            cfg.src = background.image;
            backShape = _self.addShape('image', cfg);
          } else {
            Util.mix(cfg, background);
            backShape = _self.addShape('rect', cfg);
          }
          _self.set('backShape', backShape);
        } else {
          backShape.attr(cfg);
        }
      }
    },
    _calculateRange: function () {
      var _self = this, margin = _self.get('margin'), canvas = _self.get('canvas'), width = canvas.get('width'), height = canvas.get('height'), plotRange = _self.get('plotRange'), top = 0, left = 0, right = 0, bottom = 0, start, end;
      if (Util.isNumber(margin)) {
        top = left = right = bottom = margin;
      }
      if (Util.isArray(margin)) {
        top = margin[0];
        right = margin[1] != null ? margin[1] : margin[0];
        bottom = margin[2] != null ? margin[2] : margin[0];
        left = margin[3] != null ? margin[3] : right;
      }
      start = canvas.getRelativePoint(left, height - bottom);
      end = canvas.getRelativePoint(width - right, top);
      if (!plotRange) {
        plotRange = new PlotRange(start, end);
        _self.set('plotRange', plotRange);
      } else {
        plotRange.reset(start, end);
      }
    }
  });
  exports = PlotBack;
  return exports;
}();
achart_plot_111_index_debug = function (exports) {
  var Plot = {};
  Plot.Item = achart_plot_111_src_plotitem_debug;
  Plot.Back = achart_plot_111_src_plotback_debug;
  Plot.Range = achart_plot_111_src_plotrange_debug;
  exports = Plot;
  return exports;
}();
achart_legend_103_src_legenditem_debug = function (exports) {
  var Util = achart_util_110_index_debug, PlotItem = achart_plot_111_index_debug.Item, MARKER_WIDTH = 20, ALIGN_Y = 7;
  var LegendItem = function (cfg) {
    LegendItem.superclass.constructor.call(this, cfg);
  };
  LegendItem.ATTRS = {
    elCls: 'x-chart-legend-item',
    label: {
      x: MARKER_WIDTH,
      'text-anchor': 'start',
      y: ALIGN_Y,
      cursor: 'pointer'
    },
    checked: true,
    legend: null,
    x: null,
    y: null,
    name: null,
    color: null,
    symbol: null,
    type: 'rect',
    uncheckedColor: '#CCC',
    line: {
      x1: 3,
      y1: 7,
      x2: 17,
      y2: 7,
      'stroke-width': 2
    },
    circle: {
      cx: 10,
      cy: 7,
      r: 5,
      'fill-opacity': 0.5
    },
    rect: {
      x: 2,
      y: 2,
      width: 15,
      height: 10
    }
  };
  Util.extend(LegendItem, PlotItem);
  Util.augment(LegendItem, {
    renderUI: function () {
      var _self = this;
      LegendItem.superclass.renderUI.call(_self);
      _self._createShape();
      _self._createMarker();
      _self._createLabel();
    },
    bindUI: function () {
      var _self = this;
      LegendItem.superclass.bindUI.call(_self);
    },
    _setChecked: function (checked) {
      var _self = this, shape = _self.get('shape'), marker = _self.get('marker'), color = checked ? _self.get('color') : _self.get('uncheckedColor');
      shape && shape.attr({
        stroke: color,
        fill: color
      });
      marker && marker.attr({
        stroke: color,
        fill: color
      });
    },
    _onRenderChecked: function (checked) {
      var _self = this;
      if (_self.get('rendered')) {
        _self._setChecked(checked);
      }
    },
    getWidth: function () {
      var _self = this, labelShape = _self.get('labelShape');
      return labelShape.getBBox().width + MARKER_WIDTH;
    },
    _createLabel: function () {
      var _self = this, text = _self.get('name'), label = _self.get('label'), cfg = Util.mix({}, label, { text: text }), labelShape;
      if (!cfg.x) {
        cfg.x = MARKER_WIDTH;
      }
      if (!cfg.y) {
        cfg.y = ALIGN_Y;
      }
      labelShape = _self.addShape('label', cfg);
      _self.set('labelShape', labelShape);
    },
    _createShape: function () {
      var _self = this, type = _self.get('type'), color = _self.get('color'), cfg = Util.mix({
          fill: color,
          stroke: color
        }, _self.get(type)), shape;
      if (cfg && type) {
        shape = _self.addShape(type, cfg);
      }
      shape && shape.attr('cursor', 'pointer');
      _self.set('shape', shape);
    },
    _createMarker: function () {
      var _self = this, symbol = _self.get('symbol'), marker;
      if (symbol) {
        marker = {
          symbol: symbol,
          fill: _self.get('color'),
          'stroke': _self.get('color')
        };
        marker.radius = 3;
        marker.x = 10;
        marker.y = 7;
        marker = _self.addShape('marker', marker);
      }
      _self.set('marker', marker);
    }
  });
  exports = LegendItem;
  return exports;
}();
achart_tooltip_104_src_tooltip_debug = function (exports) {
  var PlotItem = achart_plot_111_index_debug.Item, Util = achart_util_110_index_debug, CLS_TITLE = 'ac-title', CLS_LIST = 'ac-list';
  var max = Math.max;
  function getElementsByClassName(dom, cls) {
    var els = dom.getElementsByTagName('*');
    var ell = els.length;
    var elements = [];
    for (var n = 0; n < ell; n++) {
      var oCls = els[n].className || '';
      if (oCls.indexOf(cls) < 0)
        continue;
      oCls = oCls.split(/\s+/);
      var oCll = oCls.length;
      for (var j = 0; j < oCll; j++) {
        if (cls == oCls[j]) {
          elements.push(els[n]);
          break;
        }
      }
    }
    return elements;
  }
  function find(dom, cls) {
    if (dom.getElementsByClassName) {
      return dom.getElementsByClassName(cls)[0];
    }
    return getElementsByClassName(dom, cls)[0];
  }
  var Tooltip = function (cfg) {
    Tooltip.superclass.constructor.call(this, cfg);
  };
  Tooltip.ATTRS = {
    zIndex: 10,
    elCls: 'x-chart-tootip',
    itemName: 'tootip',
    crosshairs: false,
    plotRange: null,
    shared: false,
    offset: 0,
    title: {
      'font-size': '10',
      'text-anchor': 'start',
      x: 5,
      y: 15
    },
    name: {
      'font-size': '12',
      'text-anchor': 'start'
    },
    value: {
      'font-size': '12',
      'font-weight': 'bold',
      'text-anchor': 'start'
    },
    border: {
      x: 0,
      y: 0,
      r: 3,
      fill: '#fff',
      'fill-opacity': 0.85
    },
    animate: true,
    duration: 100,
    pointRenderer: null,
    valueSuffix: '',
    valueSplit: ' ',
    visible: false,
    custom: false,
    customFollow: true,
    html: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><h4 class="' + CLS_TITLE + '"></h4><ul class="' + CLS_LIST + '"></ul></div>',
    itemTpl: '<li><span style="color:{color}">{name}</span> : {value}</li>',
    items: [],
    crossLine: { stroke: '#C0C0C0' }
  };
  Util.extend(Tooltip, PlotItem);
  Util.augment(Tooltip, {
    renderUI: function () {
      var _self = this, custom = _self.get('custom');
      Tooltip.superclass.renderUI.call(_self);
      if (!custom) {
        _self._renderBorer();
        _self._renderText();
        _self._renderItemGroup();
      } else {
        _self._renderCustom();
      }
      _self._renderCrossLine();
    },
    _renderBorer: function () {
      var _self = this, bbox = _self.getBBox(), rect = _self.addShape('rect', _self.get('border'));
      _self.set('borderShape', rect);
    },
    _renderText: function () {
      var _self = this, title = _self.get('title');
      title && _self.setTitle(title.text);
    },
    _renderCustom: function () {
      var _self = this, html = _self.get('html'), outterNode = _self.get('canvas').get('node').parentNode, customDiv;
      if (/^\#/.test(html)) {
        var id = html.replace('#', '');
        customDiv = document.getElementById(id);
      } else {
        customDiv = Util.createDom(html);
      }
      if (_self.get('customFollow')) {
        outterNode.appendChild(customDiv);
        outterNode.style.position = 'relative';
      }
      _self.set('customDiv', customDiv);
      var items = _self.get('items');
      Util.each(items, function (item, index) {
        _self.addCustomItem(item, index);
      });
    },
    _renderItemGroup: function () {
      var _self = this, items = _self.get('items'), titleShape = _self.get('titleShape'), cfg = {
          x: 8,
          y: 10
        }, group;
      if (titleShape) {
        cfg.y += 20;
      }
      group = _self.addGroup(cfg);
      _self.set('textGroup', group);
      if (items) {
        _self.setItems(items);
      }
    },
    _renderCrossLine: function () {
      var _self = this, crosshairs = _self.get('crosshairs'), shape, canvas = _self.get('canvas'), plotRange = _self.get('plotRange');
      if (crosshairs) {
        var y1, y2;
        if (plotRange) {
          y1 = plotRange.bl.y;
          y2 = plotRange.tl.y;
        } else {
          y1 = canvas.get('height');
          y2 = 0;
        }
        shape = _self.get('parent').addShape({
          type: 'line',
          visible: false,
          zIndex: 3,
          attrs: {
            stroke: _self.get('crossLine').stroke,
            x1: 0,
            y1: y1,
            x2: 0,
            y2: y2
          }
        });
        _self.set('crossShape', shape);
      }
    },
    setTitle: function (text) {
      var _self = this, titleShape, title = _self.get('title'), custom = _self.get('custom'), cfg;
      if (!title) {
        return;
      }
      _self.set('titleText', text);
      if (custom) {
        var customDiv = _self.get('customDiv'), titleDom = find(customDiv, CLS_TITLE);
        if (titleDom) {
          titleDom.innerHTML = text;
        }
        return;
      }
      titleShape = _self.get('titleShape');
      if (!titleShape) {
        title.text = text || '';
        title['text-anchor'] = 'start';
        titleShape = _self.addShape('text', title);
        _self.set('titleShape', titleShape);
      }
      titleShape.attr('text', text);
    },
    getInnerBox: function () {
      var _self = this, rst = {};
      var textGroup = _self.get('textGroup'), titleShape = _self.get('titleShape'), bbx = textGroup.getBBox(), width = bbx.width;
      if (titleShape) {
        var tbox = titleShape.getBBox();
        width = Math.max(width, tbox.width);
      }
      rst.width = bbx.x + width + 8;
      rst.height = bbx.height + bbx.y + 8;
      return rst;
    },
    setColor: function (color) {
      var _self = this, borderShape = _self.get('borderShape'), customDiv = _self.get('customDiv');
      borderShape && borderShape.attr('stroke', color);
      if (customDiv) {
        customDiv.style.borderColor = color;
      }
    },
    show: function () {
      var _self = this, crossShape = _self.get('crossShape'), customDiv = _self.get('customDiv'), hideHandler = _self.get('hideHandler');
      if (hideHandler) {
        clearTimeout(hideHandler);
      }
      Tooltip.superclass.show.call(_self);
      if (customDiv && _self.get('customFollow')) {
        customDiv.style.visibility = 'visible';
      }
      _self.fireUp('tooltipshow', _self.getEventObj());
      crossShape && crossShape.show();
    },
    hide: function () {
      var _self = this, customDiv = _self.get('customDiv'), crossShape = _self.get('crossShape');
      var hideHandler = setTimeout(function () {
          _self.fireUp('tooltiphide', _self.getEventObj());
          if (customDiv && _self.get('customFollow')) {
            customDiv.style.visibility = 'hidden';
          }
          Tooltip.superclass.hide.call(_self);
          _self.set('hideHandler', null);
        }, _self.get('duration'));
      _self.set('hideHandler', hideHandler);
      crossShape && crossShape.hide();
    },
    setPosition: function (x, y) {
      var _self = this, plotRange = _self.get('plotRange'), offset = _self.get('offset'), crossShape = _self.get('crossShape'), bbox = _self.getBBox(), customDiv = _self.get('customDiv'), after = true, animate = _self.get('animate');
      var endx = x, endy = y;
      x = x - bbox.width - offset;
      y = y - bbox.height;
      if (customDiv && _self.get('customFollow')) {
        var paddingLeft = parseFloat(Util.getStyle(customDiv, 'paddingLeft')) || 0;
        x = x - Util.getOuterWidth(customDiv) + paddingLeft;
      }
      if (plotRange) {
        if (!plotRange.isInRange(x, y)) {
          if (!plotRange.isInVertical(y)) {
            y = plotRange.tl.y;
          }
          if (!plotRange.isInHorizontal(x)) {
            x = max(plotRange.tl.x, endx) + offset;
            after = false;
          }
        }
      }
      if (_self.get('x') != x || _self.get('y') != y) {
        if (animate && Util.svg && _self.get('visible')) {
          _self.animate({
            x: x,
            y: y
          }, _self.get('duration'));
        }
        _self.move(x, y);
        _self.moveCustom(x, y);
        if (crossShape) {
          if (after) {
            crossShape.attr('transform', 't' + endx + ' 0');
          } else {
            crossShape.attr('transform', 't' + (x - offset) + ' 0');
          }
        }
      }
    },
    resetBorder: function () {
      var _self = this, bbox = _self.getInnerBox(), borderShape = _self.get('borderShape');
      borderShape.attr({
        width: bbox.width,
        height: bbox.height
      });
    },
    moveCustom: function (x, y) {
      var _self = this, customDiv = _self.get('customDiv');
      if (customDiv && _self.get('customFollow')) {
        var pTop = parseFloat(Util.getStyle(customDiv, 'paddingTop')), bTop = parseFloat(Util.getStyle(customDiv, 'borderTopWidth')) || 0, pLeft = parseFloat(Util.getStyle(customDiv, 'paddingLeft')), bLeft = parseFloat(Util.getStyle(customDiv, 'borderLeftWidth')) || 0;
        customDiv.style.left = x - bLeft - pLeft + 'px';
        customDiv.style.top = y - bTop - pTop + 'px';
      }
    },
    addCustomItem: function (item, index) {
      item.index = index;
      var _self = this, customDiv = _self.get('customDiv'), listDom = find(customDiv, CLS_LIST);
      if (!listDom) {
        return;
      }
      var itemTpl = _self.get('itemTpl'), str = Util.substitute(itemTpl, item), node = Util.createDom(str);
      listDom.appendChild(node);
    },
    addItem: function (item, index) {
      var _self = this, textGroup = _self.get('textGroup'), group = textGroup.addGroup(), name = _self.get('name'), value = _self.get('value'), y = index * 16, cfg, nameShape, width = 0;
      if (name) {
        cfg = Util.mix({}, name, {
          x: 0,
          y: y,
          text: item.name + ':',
          'fill': item.color
        });
        nameShape = group.addShape('text', cfg);
        width = nameShape.getBBox().width + 10;
      }
      var valueSuffix = item.suffix || _self.get('valueSuffix'), itemValue;
      if (Util.isArray(item.value)) {
        Util.each(item.value, function (sub) {
          var subItem;
          if (Util.isObject(sub)) {
            subItem = addValue(sub.text, sub);
          } else {
            subItem = addValue(sub);
          }
          width = width + subItem.getBBox().width;
        });
      } else {
        itemValue = valueSuffix ? item.value + _self.get('valueSplit') + valueSuffix : item.value;
        addValue(itemValue);
      }
      function addValue(text, params) {
        var cfg = Util.mix({}, value, {
            x: width,
            y: y,
            text: text + ''
          }, params);
        return group.addShape('text', cfg);
      }
    },
    setItems: function (items) {
      var _self = this, custom = _self.get('custom');
      _self.clearItems();
      Util.each(items, function (item, index) {
        if (custom) {
          _self.addCustomItem(item, index);
        } else {
          _self.addItem(item, index);
        }
      });
      if (items[0]) {
        _self.setColor(items[0].color);
      }
      if (!custom) {
        _self.resetBorder();
      }
      if (_self.get('items') != items) {
        _self.set('items', items);
        _self.onChange();
      }
    },
    onChange: function () {
      this.fireUp('tooltipchange', this.getEventObj());
    },
    getEventObj: function () {
      var _self = this;
      return {
        title: _self.get('titleText'),
        items: _self.get('items'),
        dom: _self.get('customDiv'),
        tooltip: _self
      };
    },
    clearItems: function () {
      var _self = this, group = _self.get('textGroup'), customDiv = _self.get('customDiv');
      group && group.clear();
      if (customDiv) {
        var listDom = find(customDiv, CLS_LIST);
        if (listDom) {
          listDom.innerHTML = '';
        }
      }
    },
    remove: function () {
      var _self = this, crossShape = _self.get('crossShape'), customDiv = _self.get('customDiv');
      crossShape && crossShape.remove();
      Tooltip.superclass.remove.call(this);
      if (customDiv) {
        customDiv.parentNode.removeChild(customDiv);
      }
    }
  });
  exports = Tooltip;
  return exports;
}();
achart_axis_113_src_grid_debug = function (exports) {
  var Item = achart_plot_111_index_debug.Item, Util = achart_util_110_index_debug, CLS_GRID = 'x-chart-grid';
  function ensure(attrName, self, defVal) {
    var item = self.get(attrName);
    if (!item) {
      item = defVal;
      self.set(attrName, item);
    }
    return item;
  }
  function lines2path(lines, attrs) {
    var path = '', cfg = Util.mix({}, attrs);
    Util.each(lines, function (item) {
      var subPath = Util.substitute('M{x1} {y1}L{x2} {y2}', item);
      path += subPath;
    });
    cfg.path = path;
    return cfg;
  }
  function Grid(cfg) {
    Grid.superclass.constructor.call(this, cfg);
  }
  Util.extend(Grid, Item);
  Grid.ATTRS = {
    zIndex: 1,
    elCls: CLS_GRID,
    type: 'line',
    line: null,
    minorLine: null,
    minorCount: 0,
    renderer: null,
    items: null,
    odd: null,
    even: null,
    animate: true,
    duration: 1000
  };
  Util.augment(Grid, {
    renderUI: function () {
      var _self = this;
      Grid.superclass.renderUI.call(_self);
      _self._drawLines();
    },
    _drawLines: function () {
      var _self = this, lineCfg = _self.get('line'), items = _self.get('items');
      if (items) {
        var preItem;
        _self._precessItems(items);
        _self._drawGridLines(items, lineCfg, CLS_GRID + '-line');
        if (_self.get('minorCount')) {
          _self.drawMinorLines();
        }
      }
    },
    _precessItems: function (items) {
      var _self = this, minorCount = _self.get('minorCount'), renderer = _self.get('renderer'), preItem;
      Util.each(items, function (item, index) {
        if (renderer) {
          renderer.call(this, item, index);
        } else if (minorCount) {
          if (preItem) {
            _self._addMonorItem(item, preItem);
          }
        }
        if (preItem && (_self.get('odd') || _self.get('even'))) {
          _self._drawOddEven(item, preItem, index);
        }
        preItem = item;
      });
    },
    change: function (items) {
      var _self = this;
      _self.set('items', items);
      _self._clearPre();
      _self._precessItems(items);
      _self._changeGridLines(items, CLS_GRID + '-line');
      _self._changeMinorLinses();
    },
    _clearPre: function () {
      var _self = this, items;
      if (_self.get('minorCount')) {
        _self.set('minorItems', []);
      }
      items = _self.findBy(function (item) {
        var elCls = item.get('elCls');
        if (elCls == CLS_GRID + '-line' || elCls == CLS_GRID + '-minor') {
          return false;
        }
        return true;
      });
      Util.each(items, function (item) {
        item.remove();
      });
    },
    _isVertical: function (item) {
      if (item.x1 == item.x2) {
        return true;
      }
      return false;
    },
    _drawGridLines: function (items, lineCfg, cls) {
      var _self = this, cfg = _self._linesToPath(items, lineCfg), gridLine = _self.addShape({
          type: 'path',
          elCls: cls,
          attrs: cfg
        });
      _self.set('gridLine' + cls, gridLine);
    },
    _changeGridLines: function (items, cls) {
      var _self = this, animate = _self.get('animate'), gridLine = _self.get('gridLine' + cls);
      if (gridLine) {
        var cfg = _self._linesToPath(items, {});
        if (animate) {
          Util.animPath(gridLine, cfg.path, 2);
        } else {
          gridLine.attr('path', cfg.path);
        }
      } else if (items && items.length) {
        var lineCfg;
        if (cls == CLS_GRID + '-line') {
          lineCfg = _self.get('line');
        } else {
          lineCfg = _self.get('minorLine');
        }
        _self._drawGridLines(items, lineCfg, cls);
      }
    },
    _linesToPath: function (items, lineCfg) {
      var _self = this, path = [], type = _self.get('type'), cfg;
      if (type == 'line') {
        if (items.length == 0) {
          return '';
        }
        return lines2path(items, lineCfg);
      }
      cfg = Util.mix({}, lineCfg);
      Util.each(items, function (item) {
        path = path.concat(_self._getMultiplePath(item, type));
      });
      cfg.path = path;
      return cfg;
    },
    _getMultiplePath: function (item, type) {
      var _self = this, points = item.points, path = [];
      if (type == 'polygon') {
        Util.each(points, function (point, index) {
          if (index == 0) {
            path.push([
              'M',
              point.x,
              point.y
            ]);
          } else {
            path.push([
              'L',
              point.x,
              point.y
            ]);
          }
        });
        path.push([
          'L',
          points[0].x,
          points[0].y
        ]);
        path.push(['z']);
      } else {
        var x = item.center.x, y = item.center.y, rx = item.r, ry = item.r;
        if (rx == 0) {
          path = [];
        } else {
          path = [
            [
              'M',
              x,
              y
            ],
            [
              'm',
              0,
              -ry
            ],
            [
              'a',
              rx,
              ry,
              0,
              1,
              1,
              0,
              2 * ry
            ],
            [
              'a',
              rx,
              ry,
              0,
              1,
              1,
              0,
              -2 * ry
            ]
          ];
        }
      }
      return path;
    },
    _drawOddEven: function (item, preItem, index) {
      var _self = this, odd = _self.get('odd'), even = _self.get('even'), name, attrs;
      if (index % 2 == 0) {
        if (even) {
          attrs = _self._getBackItem(preItem, item, even);
          name = 'even';
        }
      } else if (odd) {
        attrs = _self._getBackItem(preItem, item, odd);
        name = 'odd';
      }
      if (attrs) {
        _self.addShape({
          type: 'path',
          elCls: CLS_GRID + '-' + name,
          attrs: attrs
        });
      }
    },
    _getBackItem: function (start, end, cfg) {
      var _self = this, path = Util.substitute('M {x1} {y1} L{x2} {y2}', start);
      path = path + Util.substitute('L{x2} {y2} L{x1} {y1}Z', end);
      cfg = Util.mix({}, cfg, { path: path });
      return cfg;
    },
    _getMinorItem: function (start, end, index, count) {
      var _self = this, isVertical = _self._isVertical(start, end), field = isVertical ? 'x' : 'y', ortho = isVertical ? 'y' : 'x', length = end[field + '1'] - start[field + '1'], avg = length / (count + 1), rst = {};
      rst[field + '1'] = rst[field + '2'] = (index + 1) * avg + start[field + '1'];
      rst[ortho + '1'] = start[ortho + '1'];
      rst[ortho + '2'] = start[ortho + '2'];
      return rst;
    },
    _addMonorItem: function (item, preItem) {
      var _self = this, minorItems = ensure('minorItems', _self, []), minorCount = _self.get('minorCount');
      if (minorCount) {
        for (var i = 0; i < minorCount; i++) {
          var minorItem = _self._getMinorItem(preItem, item, i, minorCount);
          minorItems.push(minorItem);
        }
      }
    },
    drawMinorLines: function () {
      var _self = this, lineCfg = _self.get('minorLine'), minorItems = _self.get('minorItems');
      _self._drawGridLines(minorItems, lineCfg, CLS_GRID + '-minor');
    },
    _changeMinorLinses: function () {
      var _self = this, minorItems = _self.get('minorItems');
      _self._changeGridLines(minorItems, CLS_GRID + '-minor');
    }
  });
  exports = Grid;
  return exports;
}();
achart_labels_103_src_labels_debug = function (exports) {
  var Item = achart_plot_111_index_debug.Item, Util = achart_util_110_index_debug, CLS_LABELS = 'x-chart-labels';
  var Labels = function (cfg) {
    Labels.superclass.constructor.call(this, cfg);
  };
  Labels.ATTRS = {
    elCls: CLS_LABELS,
    zIndex: 6,
    items: null,
    label: null,
    renderer: null,
    custom: false,
    html: '<div class="ac-labels" style="position:absolute;top:0;left:0;"></div>',
    itemTpl: '<div class="ac-label" style="position:absolute;">{text}</div>',
    animate: true,
    duration: 400
  };
  Util.extend(Labels, Item);
  Util.augment(Labels, {
    renderUI: function () {
      var _self = this;
      Labels.superclass.renderUI.call(_self);
      _self._drawLabels();
    },
    addLabel: function (item) {
      var _self = this, items = _self.get('items'), count = items.length;
      items.push(item);
      return _self._addLabel(item, count);
    },
    setItems: function (items) {
      var _self = this;
      _self.clear();
      _self.set('items', items);
      _self._drawLabels();
    },
    clear: function () {
      var _self = this, customDiv = _self.get('customDiv');
      if (customDiv) {
        customDiv.innerHTML = '';
      }
      Labels.superclass.clear.call(_self);
    },
    _drawLabels: function () {
      var _self = this, items = _self.get('items'), cfg;
      Util.each(items, function (item, index) {
        _self._addLabel(item, index);
      });
    },
    _addLabel: function (item, index) {
      var _self = this, cfg = _self._getLabelCfg(item, index);
      return _self._createText(cfg);
    },
    _getLabelCfg: function (item, index) {
      var _self = this, label = _self.get('label'), renderer = _self.get('renderer');
      if (!Util.isObject(item)) {
        var tmp = item;
        item = {};
        item.text = tmp;
      }
      if (renderer) {
        item.text = renderer(item.text, item, index);
      }
      if (item.text == null) {
        item.text = '';
      }
      item.text = item.text.toString();
      item.x = (item.x || 0) + (label.x || 0);
      item.y = (item.y || 0) + (label.y || 0);
      cfg = Util.mix({}, label, item);
      return cfg;
    },
    getLabels: function () {
      var _self = this, customDiv = _self.get('customDiv');
      if (customDiv) {
        return Util.makArray(customDiv.childNodes);
      } else {
        return _self.get('children');
      }
    },
    changeLabel: function (label, item) {
      var _self = this, custom = _self.get('custom'), index, cfg;
      index = Util.indexOf(_self.get('children'), label);
      cfg = _self._getLabelCfg(item, index);
      if (label) {
        if (custom) {
          var node = _self._createDom(cfg);
          label.innerHTML = node.innerHTML;
          _self._setCustomPosition(cfg, label);
        } else {
          label.attr('text', cfg.text);
          if (label.attr('x') != cfg.x || label.attr('y') != cfg.y) {
            if (Util.svg && _self.get('animate') && !cfg.rotate) {
              if (cfg.rotate) {
                label.attr('transform', '');
              }
              label.animate({
                x: cfg.x,
                y: cfg.y
              }, _self.get('duration'));
            } else {
              label.attr(cfg);
              if (cfg.rotate) {
                label.attr('transform', Util.substitute('r{rotate} {x} {y}', cfg));
              }
            }
          }
        }
      }
    },
    _setCustomPosition: function (cfg, labelDom) {
      var _self = this, anchor = cfg['text-anchor'] || 'middle', top = cfg.y, left = cfg.x, width = Util.getWidth(labelDom), height = Util.getHeight(labelDom);
      top = top - height / 2;
      if (anchor == 'middle') {
        left = left - width / 2;
      } else if (anchor == 'end') {
        left = left - width;
      }
      labelDom.style.top = parseInt(top) + 'px';
      labelDom.style.left = parseInt(left) + 'px';
    },
    _createText: function (cfg) {
      var _self = this, custom = _self.get('custom'), customDiv = _self.get('customDiv');
      if (custom) {
        if (!customDiv) {
          var tmp = _self.get('html'), wraper = _self.get('canvas').get('node').parentNode;
          customDiv = Util.createDom(tmp);
          wraper.style.position = 'relative';
          wraper.appendChild(customDiv);
          _self.set('customDiv', customDiv);
        }
        var node = _self._createDom(cfg);
        customDiv.appendChild(node);
        _self._setCustomPosition(cfg, node);
      } else {
        return this.addShape('label', cfg);
      }
    },
    _createDom: function (cfg) {
      var _self = this, itemTpl = _self.get('itemTpl'), str = Util.substitute(itemTpl, cfg), node = Util.createDom(str);
      return node;
    },
    remove: function () {
      var _self = this, customDiv = _self.get('customDiv');
      Labels.superclass.remove.call(this);
      if (customDiv) {
        customDiv.parentNode.removeChild(customDiv);
      }
    }
  });
  exports = Labels;
  return exports;
}();
achart_labels_103_src_showlabels_debug = function (exports) {
  var Util = achart_util_110_index_debug, Labels = achart_labels_103_src_labels_debug;
  function removeLabel(label) {
    if (label.remove) {
      label.remove();
    } else if (label.parentNode) {
      label.parentNode.removeChild(label);
    }
  }
  var ShowLabels = function () {
  };
  ShowLabels.ATTRS = { labels: null };
  Util.augment(ShowLabels, {
    renderLabels: function () {
      var _self = this, labels = _self.get('labels'), labelsGroup;
      if (!labels) {
        return;
      }
      if (!labels.items) {
        labels.items = [];
      }
      if (labels.animate == null) {
        labels.animate = _self.get('animate');
      }
      labelsGroup = _self.addGroup(Labels, labels);
      _self.set('labelsGroup', labelsGroup);
    },
    resetLabels: function (items) {
      var _self = this, labels = _self.get('labels');
      if (!labels) {
        return;
      }
      var labelsGroup = _self.get('labelsGroup'), children = labelsGroup.getLabels(), count = children.length;
      items = items || labels.items;
      Util.each(items, function (item, index) {
        if (index < count) {
          var label = children[index];
          labelsGroup.changeLabel(label, item);
        } else {
          _self.addLabel(item.text, item);
        }
      });
      for (var i = count - 1; i >= items.length; i--) {
        removeLabel(children[i]);
      }
    },
    addLabel: function (value, offsetPoint) {
      var _self = this, labelsGroup = _self.get('labelsGroup'), label = {}, rst;
      if (labelsGroup) {
        label.text = value;
        label.x = offsetPoint.x;
        label.y = offsetPoint.y;
        label.point = offsetPoint;
        rst = labelsGroup.addLabel(label);
      }
      return rst;
    },
    removeLabels: function () {
      var _self = this, labelsGroup = _self.get('labelsGroup');
      labelsGroup && labelsGroup.remove();
      _self.set('labelsGroup', null);
    }
  });
  exports = ShowLabels;
  return exports;
}();
achart_markers_102_src_markers_debug = function (exports) {
  var Util = achart_util_110_index_debug, Group = achart_actived_102_index_debug.Group, PlotItem = achart_plot_111_index_debug.Item;
  var Markers = function (cfg) {
    Markers.superclass.constructor.call(this, cfg);
  };
  Util.extend(Markers, PlotItem);
  Util.mixin(Markers, [Group]);
  Markers.ATTRS = {
    elCls: 'x-chart-markers',
    zIndex: 6,
    marker: null,
    actived: null,
    single: false,
    xCache: null
  };
  Util.augment(Markers, {
    renderUI: function () {
      var _self = this;
      _self.set('xCache', []);
      Markers.superclass.renderUI.call(_self);
      _self._drawMarkers();
    },
    bindUI: function () {
      var _self = this;
      _self.on('click', function (ev) {
        var shape = ev.target.shape;
        if (shape) {
          var point = shape.get('point') || shape.get('item');
          _self.fire('markerclick', {
            marker: shape,
            point: point
          });
        }
      });
    },
    isItemActived: function (item) {
      return item.get('actived');
    },
    setItemActived: function (item, actived) {
      var _self = this, marker = _self.get('marker'), activedCfg = _self.get('actived'), single = _self.get('single');
      if (actived) {
        item.attr(activedCfg);
        item.set('actived', true);
        if (single && !item.get('visible')) {
          item.show();
        }
      } else {
        item.attr(marker);
        item.set('actived', false);
        if (single) {
          item.hide();
        }
      }
    },
    change: function (items) {
      var _self = this, children = _self.get('children'), invert = _self.get('invert'), xCache = [];
      if (_self.get('single')) {
        return;
      }
      _self.set('items', items);
      Util.each(items, function (item, index) {
        var marker = children[index];
        if (marker) {
          if (Util.svg) {
            if (_self.get('animate')) {
              var info = {
                  x: item.x,
                  y: item.y
                }, temp = Util.mix({}, item);
              delete temp.x;
              delete temp.y;
              marker.animate(info, 400);
              marker.attr(temp);
            } else {
              marker.attr(item);
            }
          } else {
            marker.attr(item);
          }
          if (invert) {
            xCache.push(item.y);
          } else {
            xCache.push(item.x);
          }
          marker.set('item', item);
        } else {
          _self._addMarker(item);
        }
      });
      var count = _self.getCount();
      for (var i = count - 1; i > items.length - 1; i--) {
        _self.getChildAt(i).remove();
      }
      _self.set('xCache', xCache);
    },
    _drawMarkers: function () {
      var _self = this, single = _self.get('single'), items = _self.get('items');
      if (single) {
        var marker = _self._addMarker({
            x: 0,
            y: 0
          });
        marker.hide();
      } else {
        Util.each(items, function (item) {
          _self._addMarker(item);
        });
      }
    },
    addMarker: function (item) {
      return this._addMarker(item);
    },
    _addMarker: function (item) {
      var _self = this, xCache = _self.get('xCache'), marker = _self.get('marker'), cfg = Util.mix({}, marker, item);
      if (_self.get('invert')) {
        xCache.push(parseInt(item.y));
      } else {
        xCache.push(parseInt(item.x));
      }
      var shape = _self.addShape('marker', cfg);
      shape.set('item', item);
      return shape;
    },
    getSnapMarker: function (point, tolerance) {
      var _self = this, xCache = _self.get('xCache'), single = _self.get('single'), rst;
      if (single) {
        return _self.getChildAt(0);
      }
      if (Util.isObject(point)) {
        var children = _self.get('children');
        Util.each(children, function (marker) {
          if (marker.attr('x') == point.x && marker.attr('y') == point.y) {
            rst = marker;
            return false;
          }
        });
      } else {
        var tmp = [].concat(xCache).sort(function (v1, v2) {
            return v1 - v2;
          }), snap = Util.snapTo(tmp, point, tolerance), index = Util.indexOf(xCache, snap);
        rst = _self.getChildAt(index);
      }
      return rst;
    }
  });
  exports = Markers;
  return exports;
}();
achart_flags_101_src_flag_debug = function (exports) {
  /**
   * @fileOverview 图形标记，包含文本和连接线
   * @ignoreig
   */
  var Util = achart_util_110_index_debug, Item = achart_plot_111_index_debug.Item;
  /**
   * @class Chart.Flags.Flag
   * 图形标记，包含文本和连接线
   */
  var Flag = function (cfg) {
    Flag.superclass.constructor.call(this, cfg);
  };
  Flag.ATTRS = {
    /**
     * 显示的文本
     * @type {String}
     */
    title: '',
    /**
     * 显示的文本配置信息
     * @type {Object}
     */
    titleCfg: null,
    /**
     * tooltip显示的文本
     * @type {String}
     */
    text: '',
    /**
     * 连接线的配置信息
     * @type {Object}
     */
    line: null,
    /**
     * y偏离
     * @type {Number}
     */
    distance: 0,
    /**
     * 图形的配置信息
     * @type {Object}
     */
    shapeCfg: {},
    /**
     * 类型
     * @type {String}
     */
    shapeType: '',
    /**
     * 关联的点
     * @type {Object}
     */
    point: null,
    //缓存
    cash: {}
  };
  Util.extend(Flag, Item);
  Util.augment(Flag, {
    //渲染控件
    renderUI: function () {
      var _self = this;
      Flag.superclass.renderUI.call(_self);
      _self.drawFlag();
    },
    /**
     * 绘制flag
     */
    drawFlag: function () {
      var _self = this;
      _self._drawLine();
      _self._drawShape();
      _self._drawTitle();
    },
    //画线
    _drawLine: function () {
      var _self = this, cash = _self.get('cash');
      var line = _self.addShape('line', _self.__getLineAttr());
      cash.line = line;
    },
    //获取线的配置
    __getLineAttr: function () {
      var _self = this, lineAttr = _self.get('line'), point = _self.get('point'), x = point.x, y = point.y, distance = _self.get('distance');
      //line
      var cfg = Util.mix(lineAttr, {
          x1: x,
          y1: y,
          x2: x,
          y2: distance + y
        });
      distance <= 0 ? _self.set('bottomY', y) : _self.set('topY', y);
      return cfg;
    },
    //画图形
    _drawShape: function () {
      var _self = this, cash = _self.get('cash');
      var shape = _self.addShape(_self.__getShapeAttr());
      cash.shape = shape;
    },
    //获取图形配置
    __getShapeAttr: function () {
      var _self = this, point = _self.get('point'), x = point.x, y = point.y, type = _self.get('shapeType'), shape = _self.get('shapeCfg'), distance = _self.get('distance'), cfg;
      var width = shape.width || 24, height = shape.height || 24;
      switch (type) {
      case 'rect':
        cfg = Util.mix(shape, {
          //矩形
          x: x - width / 2,
          y: distance > 0 ? y + distance : y - height + distance,
          width: width,
          height: height
        });
        distance <= 0 ? _self.set('topY', cfg.y) : _self.set('bottomY', cfg.y + height);
        break;
      case 'image':
        cfg = Util.mix(shape, {
          //图形
          x: x - width / 2,
          y: distance > 0 ? y + distance : y + distance - height,
          width: width,
          height: height
        });
        distance <= 0 ? _self.set('topY', cfg.y) : _self.set('bottomY', cfg.y + height);
        break;
      default:
        type = 'circle';
        cfg = Util.mix(shape, {
          //圆形
          cx: x,
          cy: distance > 0 ? y + shape.r + distance : y - shape.r + distance
        });
        distance <= 0 ? _self.set('topY', cfg.cy - shape.r) : _self.set('bottomY', cfg.cy + shape.r);
        break;
      }
      return {
        type: type,
        attrs: cfg
      };
    },
    //添加文字
    _drawTitle: function () {
      var _self = this, cash = _self.get('cash');
      var cfg = _self.__getTitleAttr();
      if (cfg) {
        var title = _self.addShape('text', _self.__getTitleAttr());
        cash.title = title;
      }
    },
    //获取文字配置
    __getTitleAttr: function () {
      var _self = this, title = _self.get('title'), shape = _self.get('shapeCfg'), titleCfg = _self.get('titleCfg'), point = _self.get('point'), x = point.x, y = point.y, distance = _self.get('distance');
      var width = shape.width || 24, height = shape.height || 24;
      if (!title)
        return;
      var cfg = Util.mix(titleCfg, {
          text: title,
          x: x,
          y: distance > 0 ? y + distance + height / 2 : y + distance - height / 2
        });
      return cfg;
    },
    //删除
    removeFlag: function () {
      var _self = this, cash = _self.get('cash');
      cash.line && cash.line.remove();
      cash.shape && cash.shape.remove();
      cash.title && cash.title.remove();
      _self.remove();
    },
    /**
     * 修改flag配置，会触发重绘
     * @param {Object} item 新的配置信息
     */
    change: function (item) {
      var _self = this;
      Util.mix(_self._attrs, item);
      _self.repaint();
    },
    /**
     * 重绘
     */
    repaint: function () {
      var _self = this, cash = _self.get('cash');
      cash.line && cash.line.remove();
      cash.shape && cash.shape.remove();
      cash.title && cash.title.remove();
      //重绘线
      _self._drawLine();
      //重绘shape
      _self._drawShape();
      //重绘图形
      _self._drawTitle();
    },
    //为了堆叠，根据配置获取topY和bottomY
    changeStackCfg: function (item) {
      var _self = this, point = item.point, y = point.y, distance = item.distance, shape = item.shapeCfg, type = item.shapeType, cfg;
      distance <= 0 ? _self.set('bottomY', y) : _self.set('topY', y);
      var height = shape.height || 24;
      switch (type) {
      case 'rect':
        cfg = Util.mix(shape, { y: distance > 0 ? y + distance : y - height + distance });
        distance <= 0 ? _self.set('topY', cfg.y) : _self.set('bottomY', cfg.y + height);
        break;
      case 'image':
        cfg = Util.mix(shape, { y: distance > 0 ? y + distance : y + distance - height });
        distance <= 0 ? _self.set('topY', cfg.y) : _self.set('bottomY', cfg.y + height);
        break;
      default:
        type = 'circle';
        cfg = Util.mix(shape, { cy: distance > 0 ? y + shape.r + distance : y - shape.r + distance });
        distance <= 0 ? _self.set('topY', cfg.cy - shape.r) : _self.set('bottomY', cfg.cy + shape.r);
        break;
      }
    }
  });
  exports = Flag;
  return exports;
}();
achart_candlesticks_101_src_candlestick_debug = function (exports) {
  /**
   * @fileOverview 股票k线图 单个节点
   * @ignoreig
   */
  var Util = achart_util_110_index_debug, Item = achart_plot_111_index_debug.Item;
  /**
   * @class Chart.Group.Flag
   * 图形标记，包含文本和连接线
   */
  var Candlestick = function (cfg) {
    Candlestick.superclass.constructor.call(this, cfg);
  };
  Candlestick.ATTRS = {
    /**
     * 上升线的配置信息
     * @type {Object}
     */
    riseLine: null,
    /**
     * 下降线的配置信息
     * @type {Object}
     */
    fallLine: null,
    /**
     * 上升的图形的配置信息
     * @type {Object}
     */
    riseShape: null,
    /**
     * 下降的图形的配置信息
     * @type {Object}
     */
    fallShape: null,
    /**
     * 点信息
     * @type {Array}
     * [open,high,low,close]
     */
    points: null,
    /**
     * 单个蜡烛的宽度
     * @type {Number}
     */
    singleWidth: null
  };
  Util.extend(Candlestick, Item);
  Util.augment(Candlestick, {
    //渲染控件
    renderUI: function () {
      var _self = this;
      Candlestick.superclass.renderUI.call(_self);
      _self._drawCandlestick();
    },
    _drawCandlestick: function () {
      var _self = this;
      //判断涨还是跌
      _self._setType();
      //画线
      _self._drawLine();
      //画图形
      _self._drawShape();
    },
    //判断涨还是跌
    _setType: function () {
      var _self = this, points = _self.get('points'), openPoint = points[0], closePoint = points[3];
      var isRise = openPoint.value >= closePoint.value ? false : true;
      _self.set('isRise', isRise);
    },
    //画线
    _drawLine: function () {
      var _self = this, isRise = _self.get('isRise'), lineAttr = isRise ? _self.get('riseLine') : _self.get('fallLine'), points = _self.get('points'), highPoint = points[1], lowPoint = points[2];
      var cfg = Util.mix(lineAttr, {
          x1: highPoint.x,
          y1: highPoint.y,
          x2: lowPoint.x,
          y2: lowPoint.y
        });
      var line = _self.addShape('line', cfg);
      _self.set('lineShape', line);
    },
    //画图形
    _drawShape: function () {
      var _self = this, points = _self.get('points'), isRise = _self.get('isRise'), shapeCfg = isRise ? _self.get('riseShape') : _self.get('fallShape'), openPoint = points[0], closePoint = points[3];
      var width = _self.get('singleWidth') || shapeCfg.width || 20;
      var cfg = Util.mix(shapeCfg, {
          x: openPoint.x - width / 2,
          y: Math.min(openPoint.y, closePoint.y),
          width: width,
          height: Math.max(Math.abs(openPoint.y - closePoint.y), 0.1)
        });
      var rect = _self.addShape('rect', cfg);
      _self.set('rectShape', rect);
    }
  });
  exports = Candlestick;
  return exports;
}();
achart_legend_103_src_legend_debug = function (exports) {
  var Util = achart_util_110_index_debug, PlotItem = achart_plot_111_index_debug.Item, Item = achart_legend_103_src_legenditem_debug, LINE_HEIGHT = 15, PADDING = 5;
  var Legend = function (cfg) {
    Legend.superclass.constructor.call(this, cfg);
  };
  Legend.ATTRS = {
    zIndex: 8,
    elCls: 'x-chart-legend',
    items: null,
    spacingX: PADDING,
    spacingY: PADDING,
    itemCfg: null,
    checkable: true,
    titleCfg: {
      'text-anchor': 'start',
      'font-size': 12,
      y: 10,
      x: 15
    },
    title: null,
    leaveChecked: true,
    layout: 'horizontal',
    dx: 0,
    dy: 0,
    align: 'bottom',
    back: {
      stroke: '#909090',
      fill: '#fff'
    }
  };
  Util.extend(Legend, PlotItem);
  Util.augment(Legend, {
    renderUI: function () {
      var _self = this;
      Legend.superclass.renderUI.call(_self);
      _self._renderTitle();
      _self._renderItems();
      _self._renderBorder();
    },
    bindUI: function () {
      Legend.superclass.bindUI.call(this);
      var _self = this;
      _self.on('mousemove', function (ev) {
        if (ev.stopPropagation) {
          ev.stopPropagation();
        } else {
          window.event.cancelBubble = true;
        }
      });
      _self._bindOverOut();
      _self._bindClick();
    },
    _bindOverOut: function () {
      var _self = this;
      _self.on('mouseover', function (ev) {
        var item = _self.getItemByNode(ev.target);
        if (item) {
          _self.fire('itemover', { item: item });
        }
      });
      _self.on('mouseout', function (ev) {
        var item = _self.getItemByNode(ev.target);
        if (item) {
          _self.fire('itemout', { item: item });
        }
      });
    },
    _bindClick: function () {
      var _self = this, checkable = _self.get('checkable');
      if (checkable) {
        _self.on('click', function (ev) {
          var item = _self.getItemByNode(ev.target);
          if (item) {
            _self.fire('itemclick', { item: item });
            if (checkable) {
              var checked = item.get('checked');
              if (_self.get('leaveChecked') && checked && _self._getLeaveCount() == 1) {
                return;
              }
              item.set('checked', !checked);
              if (checked) {
                _self.fire('itemunchecked', { item: item });
              } else {
                _self.fire('itemchecked', { item: item });
              }
            }
          }
        });
      }
    },
    getItemByNode: function (node) {
      var _self = this, itemsGroup = _self.get('itemsGroup'), items = itemsGroup.get('children'), rst = null;
      Util.each(items, function (item) {
        if (item.containsElement(node)) {
          rst = item;
          return false;
        }
      });
      return rst;
    },
    _getLeaveCount: function () {
      var _self = this, itemsGroup = _self.get('itemsGroup'), items = itemsGroup.get('children'), tmpArr = [];
      tmpArr = Util.filter(items, function (item) {
        return item.get('checked');
      });
      return tmpArr.length;
    },
    _renderItems: function () {
      var _self = this, items = _self.get('items'), itemsGroup = _self.addGroup();
      _self.set('itemsGroup', itemsGroup);
      _self._setItems(items);
    },
    _setItems: function (items) {
      var _self = this;
      Util.each(items, function (item, index) {
        _self._addItem(item, index);
      });
      if (items && items.length) {
        _self.resetPosition();
        _self.resetBorder();
      }
    },
    addItem: function (item) {
      var _self = this, items = _self.get('items');
      _self._addItem(item, items.length);
      _self.resetBorder();
      _self.resetPosition();
    },
    setItems: function (items) {
      var _self = this, itemsGroup = _self.get('itemsGroup');
      itemsGroup.clear();
      _self.set('items', items);
      _self._setItems(items);
    },
    _addItem: function (item, index) {
      var _self = this, itemsGroup = _self.get('itemsGroup'), x = _self._getNextX(), y = _self._getNextY(), itemCfg = _self.get('itemCfg'), cfg = Util.mix({
          x: x,
          y: y
        }, item, itemCfg);
      cfg.legend = _self;
      itemsGroup.addGroup(Item, cfg);
    },
    _renderTitle: function () {
      var _self = this, titleCfg = _self.get('titleCfg'), title = _self.get('title'), titleShape, cfg;
      if (title) {
        cfg = Util.mix({}, titleCfg, { text: title });
        titleShape = _self.addShape('text', cfg);
        _self.set('titleShape', titleShape);
      }
    },
    _getTitleHeight: function () {
      var _self = this, titleShape = _self.get('titleShape'), rst = 0, bbox;
      if (titleShape) {
        bbox = titleShape.getBBox();
        rst = bbox.height + bbox.y;
      }
      return rst;
    },
    _getTitleWidth: function () {
      var _self = this, titleShape = _self.get('titleShape'), rst = 0, bbox;
      if (titleShape) {
        bbox = titleShape.getBBox();
        rst = bbox.width + bbox.x + PADDING;
      }
      return rst;
    },
    _renderBorder: function () {
      var _self = this, border = _self.get('back'), width, height, cfg, shape;
      if (border) {
        width = _self._getTotalWidth();
        height = _self._getTotalHeight();
        cfg = Util.mix({
          r: 5,
          width: width,
          height: height
        }, border);
        shape = _self.addShape('rect', cfg);
        shape.toBack();
        _self.set('borderShape', shape);
      }
    },
    resetBorder: function () {
      var _self = this, borderShape = _self.get('borderShape');
      if (borderShape) {
        borderShape.attr({
          width: _self._getTotalWidth(),
          height: _self._getTotalHeight()
        });
      }
    },
    resetPosition: function () {
      var _self = this, align = _self.get('align'), plotRange = _self.get('plotRange');
      if (!plotRange) {
        return;
      }
      var top = plotRange.tl, end = plotRange.br, dx = _self.get('dx'), dy = _self.get('dy'), width = _self._getTotalWidth(), x, y;
      switch (align) {
      case 'top':
        x = top.x;
        y = top.y;
        break;
      case 'left':
        x = top.x;
        y = (top.y + end.y) / 2;
        break;
      case 'right':
        x = end.x - width;
        y = (top.y + end.y) / 2;
        break;
      case 'bottom':
        x = (top.x + end.x) / 2 - width / 2;
        y = end.y;
      default:
        break;
      }
      _self.move(x + dx, y + dy);
    },
    _getCount: function () {
      return this.get('itemsGroup').get('children').length;
    },
    _getNextX: function () {
      var _self = this, layout = _self.get('layout'), spacing = _self.get('spacingX'), nextX = spacing;
      if (layout == 'horizontal') {
        var children = _self.get('itemsGroup').get('children');
        Util.each(children, function (item) {
          if (item.isGroup) {
            nextX += item.getWidth() + spacing;
          }
        });
      }
      return nextX;
    },
    _getNextY: function () {
      var _self = this, spacing = _self.get('spacingY'), layout = _self.get('layout'), count = _self._getCount(), titleHeight = _self._getTitleHeight(), rst;
      if (layout == 'horizontal') {
        rst = spacing;
      } else {
        rst = LINE_HEIGHT * count + spacing * (count + 1);
      }
      return rst + titleHeight;
    },
    _getTotalWidth: function () {
      var _self = this, spacing = _self.get('spacingX'), width, titleWidth = _self._getTitleWidth();
      if (_self.get('layout') == 'horizontal') {
        width = this._getNextX();
      } else {
        var children = _self.get('itemsGroup').get('children'), max = spacing;
        Util.each(children, function (item) {
          var width = item.getWidth();
          if (item.isGroup && width > max) {
            max = width;
          }
        });
        width = max + spacing * 2;
      }
      return Math.max(width, titleWidth);
    },
    _getTotalHeight: function () {
      var _self = this, nextY = _self._getNextY();
      if (_self.get('layout') == 'horizontal') {
        return LINE_HEIGHT + PADDING * 2 + _self._getTitleHeight();
      }
      return nextY + PADDING;
    }
  });
  exports = Legend;
  return exports;
}();
achart_legend_103_src_uselegend_debug = function (exports) {
  var Util = achart_util_110_index_debug, Legend = achart_legend_103_src_legend_debug;
  var UseLegend = function () {
  };
  UseLegend.ATTRS = {
    legend: null,
    legendGroup: null
  };
  UseLegend.prototype = {
    renderLegend: function () {
      var _self = this, legend = _self.get('legend'), canvas = _self.get('canvas');
      if (legend) {
        if (!legend.plotRange) {
          legend.plotRange = _self.get('plotRange') || _self.get('parent').get('plotRange');
        }
        legend.items = legend.items || _self.getLengendItems();
        var legendGroup = canvas.addGroup(Legend, legend);
        _self.set('legendGroup', legendGroup);
        _self._bindLegendEvent();
      }
    },
    getLengendItems: function () {
      return [];
    },
    getByLendItem: function (legendItem) {
      return legendItem.get('item');
    },
    addLengendItem: function (item) {
      var _self = this, legendGroup = _self.get('legendGroup');
      if (legendGroup) {
        legendGroup.addItem(item);
      }
    },
    resetLegendItems: function () {
      var _self = this, legendGroup = _self.get('legendGroup'), items = _self.getLengendItems();
      legendGroup.setItems(items);
    },
    _bindLegendEvent: function () {
      var _self = this, legendGroup = _self.get('legendGroup');
      legendGroup.on('itemover', function (ev) {
        var legendItem = ev.item, item = _self.getByLendItem(legendItem);
        if (_self.setActivedItem) {
          _self.setActivedItem(item);
        }
      });
      legendGroup.on('itemout', function (ev) {
        var legendItem = ev.item, item = _self.getByLendItem(legendItem);
        if (_self.clearActivedItem) {
          _self.clearActivedItem(item);
        }
      });
      legendGroup.on('itemchecked', function (ev) {
        var legendItem = ev.item, item = _self.getByLendItem(legendItem);
        _self.showChild(item);
      });
      legendGroup.on('itemunchecked', function (ev) {
        var legendItem = ev.item, item = _self.getByLendItem(legendItem);
        _self.hideChild(item);
      });
    },
    removeLegend: function () {
      var _self = this, legendGroup = _self.get('legendGroup');
      if (legendGroup) {
        legendGroup.remove();
      }
    }
  };
  exports = UseLegend;
  return exports;
}();
achart_tooltip_104_index_debug = function (exports) {
  var achartTooltip = achart_tooltip_104_src_tooltip_debug;
  exports = achartTooltip;
  return exports;
}();
achart_labels_103_index_debug = function (exports) {
  var achartLabels = achart_labels_103_src_labels_debug;
  achartLabels.ShowLabels = achart_labels_103_src_showlabels_debug;
  exports = achartLabels;
  return exports;
}();
achart_markers_102_index_debug = function (exports) {
  var achartMarkers = achart_markers_102_src_markers_debug;
  exports = achartMarkers;
  return exports;
}();
achart_flags_101_src_flags_debug = function (exports) {
  var Util = achart_util_110_index_debug, Flag = achart_flags_101_src_flag_debug, Group = achart_actived_102_index_debug.Group, PlotItem = achart_plot_111_index_debug.Item;
  var Flags = function (cfg) {
    Flags.superclass.constructor.call(this, cfg);
  };
  Util.extend(Flags, PlotItem);
  Util.mixin(Flags, [Group]);
  Flags.ATTRS = {
    elCls: 'x-chart-flags',
    zIndex: 6,
    flag: null,
    items: null,
    flagGroups: null
  };
  Util.augment(Flags, {
    renderUI: function () {
      var _self = this;
      Flags.superclass.renderUI.call(_self);
      _self._drawFlags();
    },
    bindUI: function () {
      var _self = this;
      _self.on('click', function (ev) {
        var flag = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('flagclick', { flag: flag });
      });
      _self.on('mouseover', function (ev) {
        var flag = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('flagover', { flag: flag });
      });
      _self.on('mouseout', function (ev) {
        var flag = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('flagout', { flag: flag });
      });
    },
    _drawFlags: function () {
      var _self = this, items = _self.get('items'), flagGroups = [];
      Util.each(items, function (item) {
        flagGroups.push(_self._addFlag(item));
      });
      _self.set('flagGroups', flagGroups);
    },
    addFlag: function (item) {
      var _self = this, flagGroups = _self.get('flagGroups'), items = _self.get('items');
      if (!items) {
        items = [];
        _self.set('items', items);
      }
      items.push(item);
      var flag = this._addFlag(item);
      flagGroups.push(flag);
      return flag;
    },
    _addFlag: function (item) {
      var _self = this, flag = _self.get('flag'), items = _self.get('items');
      var cfg = Util.mix({}, flag, item);
      return _self.addGroup(Flag, cfg);
    },
    removeAll: function () {
      var _self = this, flagGroups = _self.get('flagGroups');
      Util.each(flagGroups, function (item, index) {
        item.removeFlag();
      });
      _self.set('flagGroups', []);
      _self.set('items', []);
    },
    removeByIndex: function (index) {
      var _self = this, flagGroups = _self.get('flagGroups'), items = _self.get('items');
      var flag = flagGroups[index];
      if (flag) {
        flag.remove();
        flagGroups.splice(index, 1);
        items.splice(index, 1);
      }
    },
    change: function (items, animate) {
      var _self = this, selfItems = _self.get('items'), flagGroups = _self.get('flagGroups');
      if (animate) {
        var eachItem = items.length > flagGroups.length ? items : flagGroups;
        var delIndexs = [];
        Util.each(eachItem, function (model, index) {
          var flag = flagGroups[index], selfItem = selfItems[index], item = items[index];
          if (items.length > flagGroups.length && !flag) {
            flag = _self.addFlag(item);
          } else if (items.length < flagGroups.length && !item) {
            delIndexs.push(index);
          } else {
            var point = flag.get('point'), originX = point.x, originY = point.y, currX = item.point.x, currY = item.point.y;
            flag.animate({
              x: currX - originX,
              y: currY - originY
            }, 400, function () {
              flag.animate({
                x: 0,
                y: 0
              });
              flag.change(item);
            });
            selfItem = item;
          }
        });
        Util.each(delIndexs, function (item, index) {
          _self.removeByIndex(index);
        });
      } else {
        _self.removeAll();
        _self.set('items', items);
        _self._drawFlags();
      }
    },
    changeStackCfg: function (index, point) {
      var _self = this, flag = _self.get('flag'), flagGroups = _self.get('flagGroups'), items = _self.get('items');
      var cfg = Util.mix({}, flag, point);
      if (flagGroups[index]) {
        flagGroups[index].changeStackCfg(cfg);
      }
    }
  });
  exports = Flags;
  return exports;
}();
achart_candlesticks_101_src_candlesticks_debug = function (exports) {
  var Util = achart_util_110_index_debug, Candlestick = achart_candlesticks_101_src_candlestick_debug, Group = achart_actived_102_index_debug.Group, PlotItem = achart_plot_111_index_debug.Item;
  var Candlesticks = function (cfg) {
    Candlesticks.superclass.constructor.call(this, cfg);
  };
  Util.extend(Candlesticks, PlotItem);
  Util.mixin(Candlesticks, [Group]);
  Candlesticks.ATTRS = {
    elCls: 'x-chart-candlesticks',
    zIndex: 6,
    candlestick: {},
    items: null,
    candlestickGroup: []
  };
  Util.augment(Candlesticks, {
    renderUI: function () {
      var _self = this;
      Candlesticks.superclass.renderUI.call(_self);
      _self._drawCandlesticks();
    },
    bindUI: function () {
      var _self = this;
      _self.on('click', function (ev) {
        var candlestick = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('stockclick', { candlestick: candlestick });
      });
      _self.on('mouseover', function (ev) {
        var candlestick = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('stockover', { candlestick: candlestick });
      });
      _self.on('mouseout', function (ev) {
        var candlestick = _self.findBy(function (item) {
            return item.containsElement && item.containsElement(ev.target);
          });
        _self.fire('stockout', { candlestick: candlestick });
      });
    },
    _drawCandlesticks: function () {
      var _self = this, candlestickGroup = _self.get('candlestickGroup'), items = _self.get('items');
      Util.each(items, function (item, index) {
        _self._drawSingle(item);
      });
    },
    _drawSingle: function (item) {
      var _self = this, candlestickGroup = _self.get('candlestickGroup'), candlestick = _self.get('candlestick');
      var cfg = Util.mix({}, candlestick, item);
      var group = _self.addGroup(Candlestick, cfg);
      candlestickGroup.push(group);
      return group;
    },
    addCandlestick: function (item) {
      var _self = this, items = _self.get('items');
      if (!items) {
        items = [];
        _self.set('items', items);
      }
      items.push(item);
      return _self._drawSingle(item);
    },
    removeAll: function () {
      var _self = this, candlestickGroup = _self.get('candlestickGroup');
      Util.each(candlestickGroup, function (item, index) {
        item.remove();
      });
      _self.set('candlestickGroup', []);
      _self.set('items', []);
    },
    change: function (items) {
      var _self = this;
      _self.removeAll();
      _self.set('items', items);
      _self._drawCandlesticks();
    }
  });
  exports = Candlesticks;
  return exports;
}();
achart_legend_103_index_debug = function (exports) {
  var Legend = achart_legend_103_src_legend_debug;
  Legend.Item = achart_legend_103_src_legenditem_debug;
  Legend.UseLegend = achart_legend_103_src_uselegend_debug;
  exports = Legend;
  return exports;
}();
achart_axis_113_src_abstract_debug = function (exports) {
  var Item = achart_plot_111_index_debug.Item, Grid = achart_axis_113_src_grid_debug, Util = achart_util_110_index_debug, ShowLabels = achart_labels_103_index_debug.ShowLabels, CLS_AXIS = 'x-chart-axis';
  var Abstract = function (cfg) {
    Abstract.superclass.constructor.call(this, cfg);
  };
  Abstract.ATTRS = {
    ticks: null,
    plotRange: null,
    line: null,
    tickLine: null,
    grid: null,
    labels: null,
    autoPaint: true,
    animate: true,
    formatter: null
  };
  Util.extend(Abstract, Item);
  Util.mixin(Abstract, [ShowLabels]);
  Util.augment(Abstract, {
    beforeRenderUI: function () {
      Abstract.superclass.beforeRenderUI.call(this);
      this.set('pointCache', []);
    },
    renderUI: function () {
      var _self = this;
      Abstract.superclass.renderUI.call(_self);
      _self.renderLabels();
      if (_self.get('title')) {
        _self._renderTitle();
      }
      if (_self.get('autoPaint')) {
        _self.paint();
      }
    },
    paint: function () {
      var _self = this;
      _self._drawLines();
      _self._renderTicks();
      _self._renderGrid();
    },
    _renderTitle: function () {
    },
    _renderGrid: function () {
      var _self = this, grid = _self.get('grid'), gridGroup, plotRange;
      if (!grid) {
        return;
      }
      if (grid.animate == null) {
        grid.animate = _self.get('animate');
      }
      gridGroup = _self.get('parent').addGroup(Grid, grid);
      _self.set('gridGroup', gridGroup);
    },
    isInAxis: function (x, y) {
      var _self = this, plotRange = _self.get('plotRange');
      return plotRange && plotRange.isInRange(x, y);
    },
    getLinePath: function () {
    },
    getOffsetPoint: function (index) {
    },
    getValue: function (offset) {
    },
    getSnapValue: function (offset, tolerance) {
      var _self = this, pointCache = _self.get('pointCache');
      return Util.snapTo(pointCache, offset);
    },
    getTicksCount: function () {
      return this.get('ticks').length;
    },
    getTickOffsetPoint: function (index) {
      return this.getOffsetPoint(index);
    },
    getOffsetByIndex: function (index) {
    },
    _drawLines: function () {
      var _self = this, lineAttrs = _self.get('line'), ticks = _self.get('ticks'), path;
      if (lineAttrs) {
        path = _self.getLinePath();
        lineAttrs = Util.mix({ path: path }, lineAttrs);
        var lineShape = _self.addShape({
            type: 'path',
            elCls: CLS_AXIS + '-line',
            attrs: lineAttrs
          });
        _self.set('lineShape', lineShape);
      }
      _self._processTicks(ticks);
    },
    _processTicks: function (ticks, reset) {
      var _self = this, pointCache = _self.get('pointCache'), labels = _self.get('labels');
      ticks = ticks || _self.get('ticks');
      Util.each(ticks, function (tick, index) {
        var tickOffsetPoint = _self.getTickOffsetPoint(index), offsetPoint = _self.getOffsetPoint(index), offset = _self.getOffsetByIndex(index);
        pointCache.push(offset);
        if (_self.get('tickLine')) {
          _self._addTickItem(tickOffsetPoint, offset);
        }
        if (_self.get('grid')) {
          _self._addGridItem(tickOffsetPoint);
        }
        if (labels) {
          if (!reset) {
            _self.addLabel(_self.formatPoint(tick), offsetPoint, offset);
          } else {
            labels.items.push({
              text: _self.formatPoint(tick),
              x: offsetPoint.x,
              y: offsetPoint.y
            });
          }
        }
      });
    },
    _renderTicks: function () {
      var _self = this, tickItems = _self.get('tickItems'), lineAttrs = _self.get('tickLine'), path = '', cfg = Util.mix({}, lineAttrs);
      if (tickItems) {
        Util.each(tickItems, function (item) {
          var subPath = Util.substitute('M{x1} {y1}L{x2} {y2}', item);
          path += subPath;
        });
        delete cfg.value;
        cfg.path = path;
        var tickShape = _self.addShape({
            type: 'path',
            elCls: CLS_AXIS + '-ticks',
            attrs: cfg
          });
        _self.set('tickShape', tickShape);
      }
    },
    _addTickItem: function (offsetPoint, offset) {
      var _self = this, tickItems = _self.get('tickItems'), cfg = {
          x1: offsetPoint.x,
          y1: offsetPoint.y
        }, end = _self.getTickEnd(cfg, offset);
      if (!tickItems) {
        tickItems = [];
        _self.set('tickItems', tickItems);
      }
      Util.mix(cfg, end);
      tickItems.push(cfg);
    },
    getTickEnd: function (start, offset) {
    },
    formatPoint: function (value) {
      var _self = this, formatter = _self.get('formatter');
      if (formatter) {
        value = formatter.call(this, value);
      }
      return value;
    },
    _addGridItem: function (offsetPoint) {
      var _self = this, grid = _self.get('grid'), plotRange = _self.get('plotRange'), item = {}, cfg;
      if (!grid.items) {
        grid.items = [];
      }
      cfg = _self.getGridItemCfg(offsetPoint);
      Util.mix(item, cfg);
      grid.items.push(item);
    },
    getGridItemCfg: function (offsetPoint) {
    },
    remove: function () {
      var _self = this, gridGroup = _self.get('gridGroup'), labelsGroup = _self.get('labelsGroup');
      gridGroup && gridGroup.remove();
      _self.removeLabels();
      Abstract.superclass.remove.call(this);
    }
  });
  exports = Abstract;
  return exports;
}();
achart_axis_113_src_circle_debug = function (exports) {
  var Util = achart_util_110_index_debug, Abstract = achart_axis_113_src_abstract_debug;
  var RAD = Math.PI / 180;
  function getPoint(self, r, angle) {
    var center = self.getCenter(), rst = {};
    rst.x = center.x + r * Math.sin(angle * RAD);
    rst.y = center.y - r * Math.cos(angle * RAD);
    return rst;
  }
  var Circle = function (cfg) {
    Circle.superclass.constructor.call(this, cfg);
  };
  Util.extend(Circle, Abstract);
  Circle.ATTRS = {
    type: 'circle',
    startAngle: 0,
    endAngle: 360,
    margin: 20,
    radius: null,
    tickInterval: null,
    grid: {
      line: {
        'stroke-width': 1,
        'stroke': '#C0D0E0'
      }
    },
    formatter: function (value) {
      var _self = this, ticks = _self.get('ticks');
      if (Util.isNumber(value)) {
        var index = Util.indexOf(ticks, value);
        if (index == -1) {
          var avg = _self.getTickAvgAngle();
          index = parseInt(value / avg, 10);
          value = ticks[index];
        }
      }
      return value;
    }
  };
  Util.augment(Circle, {
    beforeRenderUI: function () {
      var _self = this;
      Circle.superclass.beforeRenderUI.call(_self);
      var tickInterval = _self.get('tickInterval'), ticks = _self.get('ticks'), startAngle = _self.get('startAngle'), endAngle = _self.get('endAngle'), count;
      if (tickInterval && !ticks) {
        ticks = [];
        count = (endAngle - startAngle) / tickInterval;
        for (var i = 0; i < count; i++) {
          ticks.push(startAngle + tickInterval * i);
        }
        _self.set('ticks', ticks);
      }
    },
    getCenter: function () {
      var _self = this, plotRange = _self.get('plotRange');
      return plotRange.cc;
    },
    getRadius: function () {
      var _self = this, radius = _self.get('radius'), plotRange = _self.get('plotRange');
      if (!radius) {
        radius = Math.min(plotRange.getWidth(), plotRange.getHeight()) / 2 - _self.get('margin');
        _self.set('radius', radius);
      }
      return radius;
    },
    getTickAvgAngle: function () {
      var _self = this, ticks = _self.get('ticks'), startAngle = _self.get('startAngle'), endAngle = _self.get('endAngle');
      return (endAngle - startAngle) / ticks.length;
    },
    getLinePath: function () {
      var _self = this, center = _self.getCenter(), x = center.x, y = center.y, rx = _self.getRadius(), ry = rx;
      return [
        [
          'M',
          x,
          y
        ],
        [
          'm',
          0,
          -ry
        ],
        [
          'a',
          rx,
          ry,
          0,
          1,
          1,
          0,
          2 * ry
        ],
        [
          'a',
          rx,
          ry,
          0,
          1,
          1,
          0,
          -2 * ry
        ],
        ['z']
      ];
    },
    getOffsetPoint: function (index) {
      var _self = this, angle = _self.getOffsetByIndex(index), radius = _self.getRadius();
      return _self.getCirclePoint(angle, radius);
    },
    getCirclePoint: function (angle, r) {
      if (r == null) {
        r = this.getRadius();
      }
      return getPoint(this, r, angle);
    },
    getDistance: function (x, y) {
      var _self = this, center = _self.getCenter();
      return Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
    },
    getCircleAngle: function (x, y) {
      var _self = this, center = _self.getCenter(), r = _self.getDistance(x, y), angle = Math.asin(Math.abs(x - center.x) / r) / Math.PI * 180;
      if (x >= center.x && y <= center.y) {
        return angle;
      }
      if (x >= center.x && y >= center.y) {
        return 180 - angle;
      }
      if (x <= center.x && y >= center.y) {
        return angle + 180;
      }
      return 360 - angle;
    },
    getOffsetByIndex: function (index) {
      var _self = this, ticks = _self.get('ticks'), length = ticks.length, startAngle = _self.get('startAngle'), endAngle = _self.get('endAngle');
      return startAngle + (endAngle - startAngle) / length * index;
    },
    getValue: function (offset) {
      return this.getSnapValue(offset);
    },
    getSnapValue: function (offset, tolerance) {
      var _self = this, pointCache = _self.get('pointCache');
      return Util.snapFloor(pointCache, offset);
    },
    getGridItemCfg: function (point) {
      var _self = this, center = _self.getCenter();
      return {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y
      };
    },
    addLabel: function (text, point, angle) {
      var _self = this, margin = _self.get('margin'), radius = _self.getRadius();
      point = _self.getCirclePoint(angle, radius + margin);
      Circle.superclass.addLabel.call(_self, text, point);
    },
    getTickEnd: function (start, angle) {
      var _self = this, radius = _self.getRadius(), tickLine = _self.get('tickLine'), length = tickLine.value, point = _self.getCirclePoint(angle, radius + length);
      return {
        x2: point.x,
        y2: point.y
      };
    }
  });
  exports = Circle;
  return exports;
}();
achart_series_107_src_base_debug = function (exports) {
  var Util = achart_util_110_index_debug, Item = achart_plot_111_index_debug.Item, ShowLabels = achart_labels_103_index_debug.ShowLabels, Actived = achart_actived_102_index_debug, Markers = achart_markers_102_index_debug;
  var Series = function (cfg) {
    Series.superclass.constructor.call(this, cfg);
  };
  Util.extend(Series, Item);
  Util.mixin(Series, [
    ShowLabels,
    Actived
  ]);
  Series.ATTRS = {
    zIndex: 5,
    markers: null,
    labels: null,
    animate: false,
    duration: 1000,
    changeDuration: 400,
    data: [],
    autoPaint: true,
    enableMouseTracking: true,
    stickyTracking: true,
    xField: 'x',
    yField: 'y',
    itemName: 'seriesItem',
    legendType: 'rect',
    groupName: 'series',
    effectChart: false
  };
  Util.augment(Series, {
    renderUI: function () {
      var _self = this;
      Series.superclass.renderUI.call(_self);
      _self.processColor(this.get('color'));
      _self.renderLabels();
      _self.renderMarkers();
      if (_self.get('autoPaint')) {
        _self.paint();
      }
    },
    bindUI: function () {
      var _self = this;
      Series.superclass.bindUI.call(_self);
      if (_self.get('enableMouseTracking')) {
        _self.bindMouseOver();
        var parent = _self.get('parent');
        _self.on('mouseover', function () {
          if (parent.setActivedItem) {
            if (!parent.isItemActived(_self)) {
              parent.setActivedItem(_self);
            }
          }
        });
      }
      if (!_self.get('stickyTracking')) {
        _self.bindMouseOut();
      }
    },
    changeData: function (data, redraw) {
      var _self = this, preData = _self.get('data'), parent = _self.get('parent');
      if (data != preData) {
        _self.set('data', data);
      }
      if (redraw) {
        if (_self.get('effectChart') && parent && parent.repaint) {
          parent.repaint();
        } else if (_self.get('visible')) {
          _self.repaint();
        }
      }
      _self.fire('datachange', { data: data });
    },
    addPoint: function (point, shift, redraw) {
      var _self = this, data = _self.get('data'), animate = _self.get('animate');
      data.push(point);
      if (shift) {
        data.shift();
      }
      if (!animate) {
        _self.changeData(data, redraw);
      } else {
        if (shift && redraw) {
          data.unshift(data[0]);
        }
        _self.changeData(data, redraw);
        if (shift && redraw) {
          setTimeout(function () {
            data.shift();
            _self.set('points', null);
            _self.shiftPoint();
            _self.repaint();
            _self.fire('datachange', { data: data });
          }, 800);
        }
      }
    },
    shiftPoint: function () {
      var _self = this, markersGroup = _self.get('markersGroup'), labelsGroup = _self.get('labelsGroup'), xAxis = _self.get('xAxis'), first;
      if (markersGroup) {
        first = markersGroup.getChildAt(0);
        first && first.remove();
      }
      if (labelsGroup) {
        first = labelsGroup.getChildAt(0);
        first && first.remove();
      }
      if (xAxis) {
        var labels = xAxis.get('labelsGroup');
        if (labels) {
          first = labels.getChildAt(0);
          first && first.remove();
        }
      }
    },
    getData: function (type) {
    },
    bindMouseOver: function (ev) {
    },
    bindMouseOut: function (ev) {
    },
    onStickyTracking: function (ev) {
    },
    processColor: function (color) {
    },
    getTrackingInfo: function (point) {
    },
    getPoints: function () {
      var _self = this, points = _self.get('points');
      if (!points) {
        points = _self._getPoints();
        _self.set('points', points);
      }
      return points;
    },
    _getPoints: function () {
      var _self = this, data = _self.get('data'), xField = _self.get('xField'), yField = _self.get('yField'), points = [];
      Util.each(data, function (item, index) {
        var point;
        if (Util.isObject(item)) {
          var xValue = item[xField], yValue = item[yField];
          if (xValue == null) {
            point = _self.getPointByIndex(yValue, index);
          } else {
            point = _self.getPointByValue(xValue, yValue);
          }
          point.obj = item;
        } else if (Util.isArray(item)) {
          if (_self.hasXValueInArray()) {
            point = _self.getPointByValue(item[0], item[1]);
          } else {
            point = _self.getPointByIndex(item[0], index);
          }
          point.arr = item;
        } else {
          point = _self.getPointByIndex(item, index);
        }
        point.name = point.name || _self.get('name');
        point.seriesName = _self.get('name');
        _self.processPoint(point, index);
        points.push(point);
      });
      return points;
    },
    hasXValueInArray: function () {
      return true;
    },
    processPoint: function (point, index) {
    },
    getPointByIndex: function (item, index) {
    },
    getPointByValue: function (xValue, value) {
    },
    getTipInfo: function (point) {
      return point.value;
    },
    findPointByValue: function (value) {
      var _self = this, points = _self.get('points'), rst, first = points[0], next, last = points[points.length - 1];
      if (!first) {
        return null;
      }
      if (Util.isNumber(value) && (value > last.xValue || value < first.xValue)) {
        return null;
      }
      Util.each(points, function (point, index) {
        if (_self.snapEqual(point.xValue, value) && point.value != null) {
          rst = point;
          return false;
        } else if (Util.isNumber(value) && point.xValue < value) {
          last = point;
          next = points[index + 1];
        }
      });
      if (last && next) {
        if (Math.abs(last.xValue - value) > Math.abs(next.xValue - value)) {
          last = next;
        }
      }
      return rst || last;
    },
    snapEqual: function (value1, value2) {
      return value1 == value2;
    },
    draw: function (points, callback) {
    },
    paint: function () {
      var _self = this, points = _self.getPoints();
      if (_self.get('isPaint') || !_self.get('data').length) {
        return;
      }
      _self.set('painting', true);
      _self.fire('beforepaint');
      _self.draw(points, function () {
        _self.fire('afterpaint');
      });
      _self.sort();
      _self.set('isPaint', true);
      _self.set('painting', false);
    },
    repaint: function () {
      var _self = this, labels = _self.get('labels'), markers = _self.get('markers'), points;
      _self.set('points', null);
      if (!_self.get('isPaint') && !_self.get('painting')) {
        _self.paint();
        return;
      }
      _self.set('repainting', true);
      points = _self.getPoints();
      if (labels) {
        labels.items = [];
      }
      if (markers) {
        markers.items = [];
      }
      _self.changeShapes(points);
      Util.each(points, function (point) {
        if (point.value != null) {
          if (labels) {
            var item = {};
            item.text = point.value;
            item.x = point.x;
            item.y = point.y;
            labels.items.push(item);
          }
          if (markers) {
            markers.items.push(point);
          }
        }
      });
      _self._changeMarkers();
      _self._changeLabels();
      _self.set('repainting', false);
    },
    changeShapes: function (points) {
    },
    addMarker: function (point) {
      var _self = this, markersGroup = _self.get('markersGroup'), marker = {}, rst;
      if (markersGroup) {
        marker.x = point.x;
        marker.y = point.y;
        if (point.obj && point.obj.marker) {
          Util.mix(marker, point.obj.marker);
        }
        rst = markersGroup.addMarker(marker);
        rst.set('point', point);
      }
      return rst;
    },
    renderMarkers: function () {
      var _self = this, markers = _self.get('markers'), markersGroup;
      if (markers) {
        var cfg = Util.mix({}, markers);
        if (cfg.animate == null) {
          cfg.animate = _self.get('animate');
        }
        cfg.invert = _self.get('invert');
        markersGroup = _self.addGroup(Markers, cfg);
        _self.set('markersGroup', markersGroup);
      }
    },
    _changeMarkers: function () {
      var _self = this, markers = _self.get('markers'), markersGroup;
      if (markers) {
        markersGroup = _self.get('markersGroup');
        markersGroup.change(markers.items);
        var children = markersGroup.get('children');
        Util.each(children, function (item, index) {
          item.set('point', markers.items[index]);
        });
      }
    },
    _changeLabels: function () {
      this.resetLabels();
    },
    removeMarkers: function () {
      var _self = this, markersGroup = _self.get('markersGroup');
      markersGroup && markersGroup.remove();
    },
    setActiveStatus: function (actived) {
    },
    remove: function () {
      var _self = this;
      _self.removeMarkers();
      _self.removeLabels();
      Series.superclass.remove.call(this);
    }
  });
  exports = Series;
  return exports;
}();
achart_series_107_src_cartesian_debug = function (exports) {
  var BaseSeries = achart_series_107_src_base_debug, Util = achart_util_110_index_debug;
  function date2number(value) {
    if (Util.isNumber(value)) {
      return value;
    }
    if (Util.isString(value)) {
      value = value.replace(/'-'/gi, '/');
      value = new Date(value).getTime();
    } else if (Util.isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
  function Cartesian(cfg) {
    Cartesian.superclass.constructor.call(this, cfg);
  }
  Cartesian.ATTRS = {
    pointInterval: null,
    pointStart: 0,
    xAxis: null,
    yAxis: null,
    effectChart: true,
    invert: false,
    pointsCache: {}
  };
  Util.extend(Cartesian, BaseSeries);
  Util.augment(Cartesian, {
    getXName: function () {
      var _self = this, xName = _self.get('xName');
      if (!xName) {
        xName = _self.get('invert') ? 'y' : 'x';
        _self.set('xName', xName);
      }
      return xName;
    },
    getYName: function () {
      var _self = this, yName = _self.get('yName');
      if (!yName) {
        yName = _self.get('invert') ? 'x' : 'y';
        _self.set('yName', yName);
      }
      return yName;
    },
    getPoint: function (x, y) {
      var _self = this, xAxis = _self.get('xAxis'), yAxis = _self.get('yAxis'), yValue = _self.parseYValue(y), xName = _self.getXName(), yName = _self.getYName(), point = {};
      if (xAxis.get('type') == 'time') {
        x = date2number(x);
      }
      if (_self.isInCircle()) {
        point = yAxis.getPointByAngle(x, yValue);
      } else {
        point[xName] = xAxis.getOffset(x);
        point[yName] = yAxis.getOffset(yValue);
      }
      Util.mix(point, {
        yValue: yValue,
        xValue: x,
        value: y
      });
      return point;
    },
    changeData: function (data, redraw) {
      this.set('pointsCache', {});
      Cartesian.superclass.changeData.call(this, data, redraw);
    },
    hasXValueInArray: function () {
      var _self = this, xAxis = _self.get('xAxis'), type = xAxis.get('type');
      if ((type == 'number' || type == 'time') && _self.get('pointInterval')) {
        return false;
      }
      if (type == 'category' && !xAxis.get('autoTicks')) {
        return false;
      }
      return true;
    },
    getPointByValue: function (xValue, value) {
      return this.getPoint(xValue, value);
    },
    parseYValue: function (value, index) {
      return value;
    },
    animateClip: function (fn, callback) {
      if (Util.svg) {
        var _self = this, canvas = _self.get('canvas'), invert = _self.get('invert'), width = canvas.get('width'), duration = _self.get('duration'), height = canvas.get('height'), clip = invert ? '0,0,' + width + ',0' : '0,0,0,' + height;
        _self.attr('clip-rect', clip);
        fn && fn();
        _self.animate({ 'clip-rect': '0,0,' + width + ',' + height }, duration, function () {
          callback && callback();
          _self.attr('clip-rect', '');
        });
      } else {
        callback && callback();
      }
    },
    snapEqual: function (value1, value2) {
      var _self = this;
      if (Util.isString(value1)) {
        return value1 == value2;
      }
      var pointInterval = _self.get('pointInterval');
      if (pointInterval) {
        return Math.abs(value1 - value2) < pointInterval / 2;
      }
      return value1 == value2;
    },
    isInCircle: function () {
      return this.get('xAxis').get('type') == 'circle';
    },
    getCircleCenter: function () {
      var _self = this, xAxis = _self.get('xAxis'), rst = null;
      if (xAxis.get('type') == 'circle') {
        rst = xAxis.getCenter();
      }
      return rst;
    },
    getCircle: function () {
      return this.isInCircle() ? this.get('xAxis') : null;
    },
    getData: function (type) {
      var _self = this, data = _self.get('data'), pointsCache = _self.get('pointsCache'), xAxis = _self.get('xAxis'), first = data[0], rst = [], pointStart = _self.get('pointStart');
      type = type || 'yAxis';
      if (pointsCache[type]) {
        return pointsCache[type];
      }
      if (type == 'xAxis' && (pointStart != null && !(xAxis.get('type') == 'time' && pointStart == 0)) && _self.get('pointInterval')) {
        var pointInterval = _self.get('pointInterval');
        rst.push(pointStart);
        rst.push(pointStart + (data.length - 1) * pointInterval);
      } else {
        var xField = _self.get('xField'), yField = _self.get('yField');
        Util.each(data, function (item) {
          if (Util.isNumber(item) || Util.isString(item)) {
            rst.push(item);
          } else if (Util.isArray(item)) {
            var value = type == 'yAxis' ? item[1] : item[0];
            rst.push(value);
          } else if (item) {
            var value = type == 'yAxis' ? item[yField] : item[xField];
            rst.push(value);
          }
        });
      }
      pointsCache[type] = rst;
      return rst;
    },
    getPointByIndex: function (value, index) {
      var _self = this, xAxis = _self.get('xAxis'), yAxis = _self.get('yAxis'), xName = _self.getXName(), yName = _self.getYName(), x, yValue = _self.parseYValue(value, index), y = yAxis.getOffset(yValue), originValue, xValue, point = {};
      if (xAxis.get('type') == 'number' || xAxis.get('type') == 'time') {
        var pointStart = _self.get('pointStart'), pointInterval = _self.get('pointInterval');
        x = xAxis.getOffset(pointStart + pointInterval * index);
      } else {
        x = xAxis.getOffsetByIndex(index);
      }
      if (_self.isInCircle()) {
        return _self.getPoint(x, value);
      }
      originValue = xAxis.getValue(x);
      if (pointInterval) {
        originValue = Util.tryFixed(originValue, pointInterval);
      }
      point[xName] = x;
      point[yName] = y;
      return Util.mix(point, {
        xValue: originValue,
        yValue: yValue,
        value: value
      });
    },
    getTrackingInfo: function (point) {
      var _self = this, xAxis = _self.get('xAxis'), xName = _self.getXName(), xValue;
      if (_self.isInCircle()) {
        var angle = xAxis.getCircleAngle(point.x, point.y);
        xValue = xAxis.getValue(angle);
      } else {
        xValue = xAxis.getValue(point[xName]);
      }
      return _self.findPointByValue(xValue);
    },
    getBaseValue: function () {
      var _self = this, yAxis = _self.get('yAxis'), value0 = yAxis.getOffset(0) || yAxis.getStartOffset();
      return value0;
    }
  });
  exports = Cartesian;
  return exports;
}();
achart_series_107_src_line_debug = function (exports) {
  var Cartesian = achart_series_107_src_cartesian_debug, Util = achart_util_110_index_debug;
  function trySet(obj, name, value) {
    if (obj && !obj[name]) {
      obj[name] = value;
    }
  }
  function Line(cfg) {
    Line.superclass.constructor.call(this, cfg);
  }
  Util.extend(Line, Cartesian);
  Line.ATTRS = {
    type: 'line',
    elCls: 'x-chart-line-series',
    connectNulls: false,
    line: null,
    lineActived: null,
    tolerance: 20,
    smooth: false,
    legendType: 'line'
  };
  Util.augment(Line, {
    processColor: function () {
      var _self = this, color = _self.get('color');
      if (color) {
        var line = _self.get('line'), markers = _self.get('markers');
        trySet(line, 'stroke', color);
        if (markers && !/http/.test(markers.marker.symbol)) {
          trySet(markers.marker, 'stroke', color);
          trySet(markers.marker, 'fill', color);
        }
      }
    },
    onStickyTracking: function (ev) {
      var _self = this, point = ev.point, markersGroup = _self.get('markersGroup'), marker = _self.getSnapMarker(point);
      markersGroup && markersGroup.setActivedItem(marker);
    },
    changeShapes: function (points, animate) {
      points = points || this.getPoints();
      var _self = this, lineShape = _self.get('lineShape'), trackerShape = _self.get('trackerShape'), path = _self.points2path(points);
      if (animate == null) {
        animate = _self.get('animate');
      }
      if (trackerShape) {
        var tracePath = _self.points2tracker(points);
        trackerShape.attr('path', tracePath);
      }
      if (lineShape) {
        if (animate) {
          if (Util.svg && _self.get('smooth')) {
            var prePath = lineShape.getPath();
            lineShape.attr('path', path);
            path = lineShape.attr('path');
            lineShape.attr('path', prePath);
          }
          Util.animPath(lineShape, path);
        } else {
          lineShape.attr('path', path);
        }
      }
    },
    draw: function (points, callback) {
      var _self = this, animate = _self.get('animate'), duration = _self.get('duration'), lineShape, path = '';
      if (!animate || !Util.svg) {
        drawLine();
        after();
      } else {
        if (_self.isInCircle()) {
          lineShape = _self._createLine(path);
          _self.circleAnimate(points, lineShape);
          after();
        } else {
          _self.animateClip(drawLine, after);
        }
      }
      _self.drawTracker(points);
      function drawLine() {
        path = _self.points2path(points);
        lineShape = _self._createLine(path);
        Util.each(points, function (point) {
          _self._drawPoint(point);
        });
        _self.drawInner(points);
      }
      function after() {
        callback && callback();
      }
    },
    circleAnimate: function (points, lineShape) {
      var _self = this, circle = _self.getCircle(), center = circle.getCenter(), initPoints = [], baseValue = _self.getBaseValue(), path;
      Util.each(points, function (point) {
        var item = Util.mix({ value: baseValue }, center);
        initPoints.push(item);
        _self._drawPoint(item);
      });
      path = _self.points2path(initPoints);
      lineShape.attr('path', path);
      _self.drawInner(initPoints);
      _self.repaint();
    },
    drawInner: function (points) {
    },
    _drawPoint: function (point) {
      var _self = this;
      if (point.value == null) {
        return;
      }
      if (_self.get('markers') && !_self.get('markersGroup').get('single')) {
        _self.addMarker(point);
      }
      if (_self.get('labels')) {
        _self.addLabel(point.value, point);
      }
    },
    _createLine: function (path) {
      var _self = this, lineAttrs = _self.get('line'), cfg = Util.mix({}, lineAttrs);
      cfg.path = path;
      lineShape = _self.addShape('path', cfg);
      _self.set('lineShape', lineShape);
      return lineShape;
    },
    drawTracker: function (points) {
      var _self = this, lineAttrs = _self.get('line'), tolerance = _self.get('tolerance'), path = _self.points2tracker(points), cfg = Util.mix({}, lineAttrs), preWidth = Number(lineAttrs['stroke-width']), shape;
      cfg['stroke-width'] = preWidth + tolerance;
      cfg['stroke-opacity'] = 0.001;
      cfg.path = path;
      shape = _self.addShape('path', cfg);
      _self.set('trackerShape', shape);
    },
    points2path: function (points) {
      if (!points.length) {
        return '';
      }
      var _self = this, smooth = _self.get('smooth'), connectNulls = _self.get('connectNulls'), path = '', preItem, str;
      if (points.length <= 2) {
        smooth = false;
      }
      Util.each(points, function (item, index) {
        if (item.value == null) {
          if (connectNulls) {
            return;
          }
          str = '';
        } else {
          str = preItem == null || preItem.value == null ? smooth ? 'M{x} {y} R' : 'M{x} {y}' : smooth ? ' {x} {y}' : 'L{x} {y}';
        }
        path += Util.substitute(str, item);
        preItem = item;
      });
      if (_self.isInCircle()) {
        path += 'z';
      }
      return path;
    },
    points2tracker: function (points) {
      if (!points.length) {
        return '';
      }
      var _self = this, tolerance = _self.get('tolerance'), first = points[0], path = 'M' + (points[0].x - tolerance) + ' ' + (points[0].y || 0);
      Util.each(points, function (item, index) {
        if (item.value != null) {
          var str = 'L{x} {y}';
          path += Util.substitute(str, item);
        }
      });
      if (_self.isInCircle()) {
        path += 'z';
      }
      return path;
    },
    setActiveStatus: function (actived) {
      var _self = this, line = _self.get('line'), lineShape = _self.get('lineShape'), lineActived = _self.get('lineActived');
      if (actived) {
        lineActived && lineShape.attr(lineActived);
      } else {
        line && lineShape.attr(line);
        var markersGroup = _self.get('markersGroup');
        markersGroup && markersGroup.clearActivedItem();
      }
    },
    getSnapMarker: function (point) {
      var _self = this, markersGroup = _self.get('markersGroup'), xName = _self.getXName(), rst = null;
      if (markersGroup) {
        if (_self.isInCircle()) {
          var info = _self.getTrackingInfo(point);
          rst = markersGroup.getSnapMarker(info);
        } else {
          rst = markersGroup.getSnapMarker(point[xName]);
        }
      }
      return rst;
    }
  });
  exports = Line;
  return exports;
}();
achart_series_107_src_itemgroup_debug = function (exports) {
  var Base = achart_series_107_src_base_debug, Util = achart_util_110_index_debug;
  function removeLabel(label) {
    if (label.remove) {
      label.remove();
    } else if (label.parentNode) {
      label.parentNode.removeChild(label);
    }
  }
  var Group = function () {
  };
  Group.ATTRS = {
    item: undefined,
    group: null,
    allowPointSelect: false,
    cancelSelect: true
  };
  Util.extend(Group, Base);
  Util.augment(Group, {
    addItem: function (point, index) {
      var _self = this, group = _self.get('group'), cfg;
      if (point.value == null) {
        return;
      }
      if (index == null) {
        index = _self.getItems().length;
      }
      if (!group) {
        group = _self.addGroup();
        _self.set('group', group);
      }
      cfg = _self.getItemCfg(point, index);
      if (_self.get('animate')) {
        cfg.path = _self.pointToFactorPath(point, 0);
      } else {
        cfg.path = _self.pointToPath(point);
      }
      var shape = group.addShape('path', cfg);
      shape.isSeriesItem = true;
      shape.set('point', point);
      return shape;
    },
    bindItemClick: function () {
      var _self = this, cancelSelect = _self.get('cancelSelect');
      _self.on('click', function (ev) {
        var target = ev.target, shape = target.shape, selected;
        if (shape && shape.isSeriesItem) {
          if (_self.get('allowPointSelect')) {
            selected = shape.get('selected');
            if (cancelSelect && selected) {
              _self.clearSelected(shape);
            } else {
              _self.setSelected(shape);
            }
          }
          _self.fire('itemclick', {
            item: shape,
            point: shape.get('point')
          });
          _self.fireUpGroup('click', shape);
        }
      });
    },
    setSelected: function (item) {
      var _self = this;
      if (!_self.isSelected(item)) {
        _self.clearSelected();
        _self.setItemSelected(item, true);
        _self.onSelected(item);
      }
    },
    changePoints: function (points) {
      var _self = this, items = _self.getItems(), animate = _self.get('animate');
      points = points || _self.getPoints();
      Util.each(items, function (item, index) {
        var point = points[index], prePoint, path;
        if (point && item.get('visible')) {
          prePoint = item.get('point');
          item.set('point', point);
          item.set('prePoint', prePoint);
          if (!animate) {
            path = _self.pointToPath(point);
            item.attr('path', path);
          } else {
            _self.animateItem(item, prePoint);
          }
          if (point.obj && point.obj.attrs) {
            item.attr(point.obj.attrs);
          }
        }
      });
      var count = points.length, length = items.length;
      var last = items[items.length - 1];
      for (var i = length; i < count; i++) {
        var shape = _self.addItem(points[i], i);
        if (length > 1) {
          animate && _self.animateItem(shape, last.get('prePoint'));
        }
      }
      for (var i = length - 1; i >= count; i--) {
        var item = items[i];
        _self.removeItem(item);
      }
    },
    onSelected: function (item) {
      this.fire('itemselected', {
        item: item,
        point: item.get('point')
      });
      this.fireUpGroup('selected', item);
    },
    onUnSelected: function (item) {
      this.fire('itemunselected', {
        item: item,
        point: item.get('point')
      });
      this.fireUpGroup('unselected', item);
    },
    clearSelected: function (item) {
      var _self = this;
      item = item || _self.getSelected();
      if (item) {
        _self.setItemSelected(item, false);
        _self.onUnSelected(item);
      }
    },
    setItemSelected: function (item, selected) {
    },
    isSelected: function (item) {
      return item && item.get('selected');
    },
    getSelected: function () {
      var _self = this, items = _self.getItems(), rst;
      Util.each(items, function (item) {
        if (_self.isSelected(item)) {
          rst = item;
          return false;
        }
      });
      return rst;
    },
    getItemCfg: function (point, index) {
      var _self = this, item = _self.get('item'), cfg = point.obj, rst = {};
      Util.mix(rst, item);
      if (cfg && cfg.attrs) {
        Util.mix(rst, cfg.attrs);
      }
      return rst;
    },
    getItems: function () {
      var group = this.get('group');
      return group ? group.get('children') : [];
    },
    animateItems: function (callback) {
      var _self = this, items = _self.getItems();
      Util.animStep(_self.get('duration'), function (factor) {
        Util.each(items, function (item) {
          var point = item.get('point'), path = _self.pointToFactorPath(point, factor);
          item.attr('path', path);
        });
      }, callback);
    },
    animateItem: function (item, prePoint) {
      var _self = this, point = item.get('point'), path = _self.pointToPath(point);
      item.animate({ path: path }, _self.get('changeDuration'));
    },
    removeItem: function (item) {
      var _self = this, animHadler = item.get('animHadler');
      _self.removeLabel(item);
      if (animHadler) {
        Util.stopStep(animHadler);
      }
      item.remove();
    },
    removeLabel: function (item) {
      var label = item.get('label');
      label && removeLabel(label);
    },
    pointToFactorPath: function (point, factor) {
    },
    pointToPath: function (point) {
      return this.pointToFactorPath(point, 1);
    }
  });
  exports = Group;
  return exports;
}();
achart_series_107_src_area_debug = function (exports) {
  var Line = achart_series_107_src_line_debug, Util = achart_util_110_index_debug, Stacked = achart_series_107_src_stacked_debug, REGEX_MOVE = /^M.*(M).*$/;
  function trySet(obj, name, value) {
    if (obj && !obj[name]) {
      obj[name] = value;
    }
  }
  function pathStr(CMD, x, y, invert) {
    if (invert) {
      return CMD + y + ' ' + x;
    }
    return CMD + x + ' ' + y;
  }
  function pathArray(arr, invert) {
    if (invert) {
      var tmp = arr[1];
      arr[1] = arr[2];
      arr[2] = tmp;
    }
    return arr;
  }
  var Area = function (cfg) {
    Area.superclass.constructor.call(this, cfg);
  };
  Area.ATTRS = {
    elCls: 'x-chart-area-series',
    area: {
      stroke: '',
      'fill-opacity': '0.70'
    }
  };
  Util.extend(Area, Line);
  Util.mixin(Area, [Stacked]);
  Util.augment(Area, {
    processColor: function () {
      Area.superclass.processColor.call(this);
      var _self = this, color = _self.get('color'), area = _self.get('area');
      trySet(area, 'fill', color);
    },
    renderUI: function () {
      Area.superclass.renderUI.call(this);
      var _self = this, canvas = _self.get('canvas'), markersGroup = _self.get('markersGroup');
      _self.on('afterpaint', function () {
        if (markersGroup && _self.isStacked()) {
          canvas.get('node').appendChild(markersGroup.get('node'));
        }
      });
    },
    hide: function () {
      Area.superclass.hide.call(this);
      var _self = this, markersGroup = _self.get('markersGroup');
      markersGroup && markersGroup.hide();
    },
    show: function () {
      Area.superclass.show.call(this);
      var _self = this, markersGroup = _self.get('markersGroup');
      markersGroup && markersGroup.show();
    },
    drawInner: function (points) {
      var _self = this, areaShape = _self.get('areaShape');
      if (!areaShape) {
        _self.drawArea(points);
      } else {
        var path = _self._getAreaPath(points);
        areaShape.attr('path', path);
      }
    },
    _getAreaPath: function (points) {
      var _self = this, stackType = _self.get('stackType'), path;
      if (stackType && stackType != 'none') {
        path = _self.points2StackArea(points);
      } else {
        path = _self.points2area(points);
      }
      return path;
    },
    changeShapes: function () {
      Area.superclass.changeShapes.call(this);
      var _self = this, areaShape = _self.get('areaShape'), points = _self.getPoints(), path = _self._getAreaPath(points);
      if (_self.get('animate')) {
        Util.animPath(areaShape, path);
      } else {
        areaShape.attr('path', path);
      }
    },
    drawArea: function (points) {
      var _self = this, area = _self.get('area'), path = _self.isStacked() ? _self.points2StackArea(points) : _self.points2area(points), cfg = Util.mix({ path: path }, area), areaShape;
      areaShape = _self.addShape('path', cfg);
      _self.set('areaShape', areaShape);
    },
    processPoint: function (point, index) {
      var _self = this, stackType = _self.get('stackType');
      if (stackType && stackType != 'none') {
        _self.processStackedPoint(point, index);
      }
    },
    points2StackArea: function (points) {
      var _self = this, length = points.length, value0 = _self.getBaseValue(), first = points[0], last = points[length - 1], linePath, isInCircle = _self.isInCircle(), path = '', invert = _self.get('invert'), xName = _self.getXName(), yName = _self.getYName(), pre;
      if (length) {
        pre = _self.getVisiblePrev();
        linePath = _self.points2path(points);
        path = linePath;
        if (pre) {
          var prePoints = pre.getPoints().slice(0, points.length), preFirst = prePoints[0], prePath = _self.points2path(prePoints.reverse());
          prePath = prePath.replace('M', 'L');
          if (isInCircle) {
            path = linePath + 'L' + preFirst.x + ' ' + preFirst.y + prePath;
          } else {
            path = linePath + prePath;
          }
        } else {
          if (!isInCircle) {
            path = pathStr('M ', first[xName], value0, invert) + linePath.replace('M', 'L');
            path = path + pathStr('L ', last[xName], value0, invert) + '';
          }
        }
        if (path && !isInCircle) {
          path = path + 'z';
        }
      }
      return path;
    },
    _getFirstPoint: function (points) {
      var rst = null;
      Util.each(points, function (point) {
        if (point.value != null) {
          rst = point;
          return false;
        }
      });
      return rst;
    },
    _getLastPoint: function (points) {
      var rst = null;
      for (var i = points.length - 1; i >= 0; i--) {
        var point = points[i];
        if (point.value != null) {
          rst = point;
          break;
        }
      }
      return rst;
    },
    points2area: function (points) {
      var _self = this, length = points.length, value0 = _self.getBaseValue(), first = _self._getFirstPoint(points) || points[0], last = _self._getLastPoint(points) || points[length - 1], isInCircle = _self.isInCircle(), linePath, invert = _self.get('invert'), xName = _self.getXName(), yName = _self.getYName(), path = '';
      if (length) {
        linePath = _self.points2path(points);
        if (isInCircle) {
          var center = _self.getCircleCenter();
          path = linePath;
        } else {
          path = pathStr('M', first[xName], value0, invert);
          path = path + linePath.replace('M', 'L');
          if (REGEX_MOVE.test(path)) {
            path = Util.parsePathString(path);
            var temp = [], preBreak = path[0];
            Util.each(path, function (item, index) {
              if (index !== 0 && item[0] == 'M') {
                var n1 = [], n0 = [], n2 = [], preItem = path[index - 1];
                n1[0] = 'L';
                n1[1] = preItem[1];
                n1[2] = value0;
                n0[0] = 'L';
                n0[1] = preBreak[1];
                n0[2] = value0;
                n2[0] = 'M';
                n2[1] = item[1];
                n2[2] = value0;
                if (preItem[0] == 'R') {
                  preItem[0] = 'L';
                  item[0] = 'R';
                } else {
                  item[0] = 'L';
                }
                temp.push(pathArray(n1, invert));
                temp.push(pathArray(n0, invert));
                temp.push(pathArray(n2, invert));
                preBreak = item;
              }
              temp.push(pathArray(item));
            });
            path = temp;
            path.push(pathArray([
              'L',
              last.x,
              value0
            ], invert));
            if (Util.svg) {
              path.push(['Z']);
            }
          } else {
            path = path + pathStr('L', last[xName], value0, invert) + 'z';
          }
        }
      }
      return path;
    }
  });
  exports = Area;
  return exports;
}();
achart_series_107_src_pie_debug = function (exports) {
  var ItemGroup = achart_series_107_src_itemgroup_debug, ActiveGroup = achart_actived_102_index_debug.Group, Util = achart_util_110_index_debug, Legend = achart_legend_103_index_debug, Base = achart_series_107_src_base_debug;
  function ensureX(self, x) {
    if (Util.isNumber(x)) {
      return x;
    }
    var plotRange = getPlotRange(self), xPercent = parsePercent(x), width = plotRange.getWidth();
    return plotRange.tl.x + width * xPercent;
  }
  function ensureY(self, y) {
    if (Util.isNumber(y)) {
      return y;
    }
    var plotRange = getPlotRange(self), yPercent = parsePercent(y), height = plotRange.getHeight();
    return plotRange.tl.y + height * yPercent;
  }
  function parsePercent(v) {
    return parseFloat(v) * 0.01;
  }
  function getPlotRange(self) {
    return self.get('parent').get('plotRange');
  }
  function resetItem(item, h, endAngle, r, center, isStart, lineHeight) {
    var innerAngle = Math.acos((r - h) / r) / Math.PI * 180, angle = isStart ? endAngle - 180 + innerAngle : endAngle - innerAngle;
    item.orignAngle = item.angle;
    item.angle = angle;
    item.orignX = item.x;
    item.orignY = item.y;
    item.x = center.x + (r + 5) * Math.cos(item.angle * RAD);
    item.y = center.y + (r + 5) * Math.sin(item.angle * RAD);
  }
  function alignLables(center, r, arr, endAngle, factor, lineHeight) {
    var count = parseInt(r * 2 / lineHeight, 10), maxY = center.y + r, minY = center.y - r, startAngle = endAngle - 180;
    if (count < arr.length) {
      arr.splice(count, arr.length - count);
    }
    var conflictIndex = 0, length = arr.length, leftAvg, leftCount, preAvg = 0, preConflictIndex;
    for (var i = 0; i < length; i++) {
      var label = arr[i], angle = label.angle, y = label.y;
      leftCount = length - i;
      leftAvg = factor > 0 ? (maxY - y) / leftCount : (y - minY) / leftCount;
      if (i > 0) {
        preAvg = factor > 0 ? (y - minY) / i : (maxY - y) / i;
      }
      conflictIndex = i;
      if (leftAvg < lineHeight) {
        if (conflictIndex != 0) {
          conflictIndex = i + 1;
        }
        break;
      }
      if (preAvg > 0 && preAvg < lineHeight) {
        preConflictIndex = i;
      }
    }
    if (preConflictIndex) {
      for (var i = 0; i <= preConflictIndex; i++) {
        var h = i * lineHeight;
        resetItem(arr[i], h, endAngle, r, center, true, lineHeight);
      }
    }
    if (conflictIndex < length - 1) {
      var start = conflictIndex == 0 ? 0 : conflictIndex - 1, startLabel = arr[start], y = startLabel.y, endY = factor > 0 ? maxY : minY;
      leftCount = length - start - 1;
      leftAvg = Math.abs(endY - y) / leftCount;
      if (leftAvg < lineHeight) {
        leftAvg = lineHeight;
      }
      for (var i = length - 1; i >= start; i--) {
        var h = (length - 1 - i) * leftAvg;
        resetItem(arr[i], h, endAngle, r, center);
      }
      var startY = factor > 0 ? minY : maxY, adjust = false;
      for (var i = start - 1; i > 0; i--) {
        var item = arr[i];
        if (!adjust && Math.abs(startY - item.y) / (i + 1) < lineHeight) {
          adjust = true;
        }
        if (adjust) {
          var h = Math.abs(arr[i + 1].y - endY) + lineHeight;
          resetItem(arr[i], h, endAngle, r, center);
        }
      }
    }
  }
  var RAD = Math.PI / 180, MARGIN = 5;
  var Pie = function (cfg) {
    Pie.superclass.constructor.call(this, cfg);
  };
  Pie.ATTRS = {
    size: '80%',
    innerSize: null,
    center: [
      '50%',
      '50%'
    ],
    colors: null,
    colorHighlight: 0,
    radius: null,
    innerRadius: null,
    startAngle: -90,
    endAngle: 270,
    labelHeight: 16,
    labelLine: true,
    item: { 'stroke': '#fff' },
    visibleCache: {},
    cancelSelect: true,
    xField: 'name',
    stickyTracking: false,
    animate: true,
    duration: 1000
  };
  Util.extend(Pie, Base);
  Util.mixin(Pie, [
    ItemGroup,
    ActiveGroup,
    Legend.UseLegend
  ]);
  Util.augment(Pie, {
    draw: function (points) {
      var _self = this, selectedPoint;
      Util.each(points, function (point, index) {
        _self.formatPoint(point, index);
        var item = _self.addItem(point, index);
        if (point.obj && point.obj.selected) {
          selectedPoint = item;
        }
      });
      if (_self.get('animate')) {
        _self.animateItems(after);
      } else {
        after();
      }
      if (_self.get('labelsGroup')) {
        _self.processLabels(points);
        _self.get('labelsGroup').toFront();
      }
      function after() {
        if (selectedPoint) {
          _self.setSelected(selectedPoint);
        }
      }
      if (!this.get('legedGroup')) {
        this.renderLegend();
      }
    },
    changeShapes: function (points, animate) {
      var _self = this;
      points = points || _self.getPoints();
      Util.each(points, function (point, index) {
        _self.formatPoint(point, index);
      });
      this.clearSelected();
      _self.changePoints(points);
    },
    repaint: function () {
      var _self = this;
      Pie.superclass.repaint.call(this);
      if (_self.get('legend')) {
        _self.resetLegendItems();
      }
    },
    processLabels: function (points) {
      var _self = this, labelsGroup = _self.get('labelsGroup'), distance = labelsGroup.get('distance'), leftArray = [], center = _self.getCenter(), r = _self.getRadius(), rAppend = r + distance, startAngle = _self.get('startAngle'), endAngle = _self.get('endAngle'), lineHeight = _self.get('labelHeight'), labelLine = _self.get('labelLine'), rightArray = [];
      Util.each(points, function (point) {
        if (point.visible) {
          var cfg = _self._getLabelCfg(point, distance, rAppend);
          if (distance < 0) {
            labelsGroup.addLabel(cfg);
          } else {
            if (cfg.factor > 0) {
              rightArray.push(cfg);
            } else {
              leftArray.push(cfg);
            }
          }
        }
      });
      if (leftArray.length) {
        var end;
        if (startAngle >= -90) {
          end = 270;
        } else {
          end = -90;
        }
        alignLables(center, rAppend, leftArray, end, -1, lineHeight);
        Util.each(leftArray, function (label) {
          labelsGroup.addLabel(label);
          labelLine && _self.lineToLabel(label, r, distance);
        });
      }
      if (rightArray.length) {
        alignLables(center, rAppend, rightArray, 90, 1, lineHeight);
        Util.each(rightArray, function (label) {
          labelsGroup.addLabel(label);
          labelLine && _self.lineToLabel(label, r, distance);
        });
      }
    },
    getLengendItems: function () {
      var _self = this, children = _self.getItems(), legendType = _self.get('legendType') || 'rect', items = [];
      Util.each(children, function (child, i) {
        var item = {
            name: child.get('point').xValue,
            color: child.attr('fill'),
            type: legendType,
            item: child
          };
        items.push(item);
      });
      return items;
    },
    resetLabels: function () {
      var _self = this, labelsGroup = _self.get('labelsGroup'), lineGroup = _self.get('lineGroup');
      if (labelsGroup) {
        labelsGroup.clear();
        lineGroup && lineGroup.clear();
        _self.processLabels(_self.getPoints());
      }
    },
    lineToLabel: function (label, r, distance) {
      var _self = this, angle = label.orignAngle || label.angle, center = _self.getCenter(), start = _self._getOffset(angle, r + MARGIN / 2), inner, lineHeight = _self.get('labelHeight'), lineGroup = _self.get('lineGroup'), path = [];
      if (label.angle == -90) {
        distance = distance - lineHeight / 2;
      }
      path.push([
        'M',
        center.x + start.x,
        center.y + start.y
      ]);
      if (label.orignX != null) {
        inner = _self._getOffset(angle, r + distance / 2);
        var toy = label.angle == -90 ? label.y + lineHeight / 2 : label.y;
        path.push([
          'R',
          center.x + inner.x,
          center.y + inner.y,
          label.x,
          toy
        ]);
      } else {
        path.push([
          'L',
          label.x,
          label.y
        ]);
      }
      if (!lineGroup) {
        lineGroup = _self.addGroup({ elCls: 'x-line-group' });
        _self.set('lineGroup', lineGroup);
      }
      lineGroup.addShape('path', {
        path: path,
        fill: null,
        stroke: label.color
      });
    },
    bindUI: function () {
      Pie.superclass.bindUI.call(this);
      this.bindItemClick();
    },
    bindMouseOver: function () {
      var _self = this;
      _self.on('mouseover', function (ev) {
        var target = ev.target, shape = target.shape;
        shape && _self.setActivedItem(shape);
      });
    },
    _getLabelCfg: function (point, distance, rAppend) {
      var _self = this, middleAngle = point.startAngle + (point.endAngle - point.startAngle) / 2, center = _self.getCenter(), x = center.x + (rAppend + MARGIN) * Math.cos(middleAngle * RAD), y = center.y + (rAppend + MARGIN) * Math.sin(middleAngle * RAD), rst = {}, factor = 1;
      rst.x = x;
      rst.y = y;
      if (distance < 0) {
        if (middleAngle > -90 && middleAngle <= 90) {
          rst['text-anchor'] = 'end';
          rst.rotate = middleAngle;
        } else {
          rst['text-anchor'] = 'start';
          rst.rotate = middleAngle - 180;
        }
      } else {
        if (middleAngle > -90 && middleAngle <= 90) {
          rst['text-anchor'] = 'start';
          factor = 1;
        } else {
          factor = -1;
          rst['text-anchor'] = 'end';
        }
      }
      rst.factor = factor;
      rst.angle = middleAngle;
      rst.color = point.color;
      rst.point = point;
      rst.text = point.xValue;
      return rst;
    },
    getActiveItems: function () {
      return this.getItems();
    },
    isPlaceHolder: function (item) {
      var point = item.get('point');
      return point && point.obj && point.obj.placeHolder;
    },
    setItemActived: function (item, actived) {
      var _self = this, color = item.getCfgAttr('attrs').fill || item.getCfgAttr('attrs').color;
      if (_self.isPlaceHolder(item)) {
        return;
      }
      if (actived) {
        item.attr({ fill: Util.highlight(color, 0.1) });
        item.set('actived', true);
      } else {
        item.attr({ fill: color });
        item.set('actived', false);
      }
    },
    getTrackingInfo: function () {
      var _self = this, item = _self.getActived();
      return item && item.get('point');
    },
    isItemActived: function (item) {
      return item.get('actived');
    },
    getRadius: function () {
      var _self = this, radius = _self.get('radius');
      if (!radius) {
        radius = _self.calculateRadius(_self.get('size'));
        _self.set('radius', radius);
      }
      return radius;
    },
    getInnerRadius: function () {
      var _self = this, innerRadius = _self.get('innerRadius'), innerSize = _self.get('innerSize');
      if (!innerRadius && innerSize) {
        innerRadius = _self.calculateRadius(innerSize);
        _self.set('innerRadius', innerRadius);
      }
      return innerRadius;
    },
    calculateRadius: function (size) {
      var _self = this, plotRange = _self.get('parent').get('plotRange'), percent = parsePercent(size);
      return Math.min(plotRange.getWidth(), plotRange.getHeight()) / 2 * percent;
    },
    getCenter: function () {
      var _self = this, centerPoint = _self.get('centerPoint'), center;
      if (!centerPoint) {
        centerPoint = {};
        center = _self.get('center');
        centerPoint.x = ensureX(_self, center[0]);
        centerPoint.y = ensureY(_self, center[1]);
        _self.set('centerPoint', centerPoint);
      }
      return centerPoint;
    },
    getItemCfg: function (point, index) {
      var _self = this, item = _self.get('item'), cfg = point.obj, rst = {};
      Util.mix(rst, item);
      if (cfg && cfg.attrs) {
        Util.mix(rst, cfg.attrs);
      }
      rst.fill = point.color;
      if (_self.get('allowPointSelect')) {
        rst.cursor = 'pointer';
      }
      return rst;
    },
    _getColor: function (index) {
      var _self = this, colors = _self.get('colors'), colorHighlight = _self.get('colorHighlight'), color;
      index = index % colors.length;
      color = colors[index];
      if (colorHighlight) {
        color = Util.highlight(colorHighlight);
      }
      return color;
    },
    formatPoint: function (point, index) {
      var _self = this, points = _self.getVisiblePoints(), visible = false;
      point.index = index;
      Util.each(points, function (item) {
        if (point.index == item.index || point == item) {
          visible = true;
        }
      });
      point.visible = visible;
      if (!visible) {
        return;
      }
      var percent = _self._getPiePercent(point, points), startAngle = _self.get('startAngle'), endAngle = _self.get('endAngle'), totalAngle = endAngle - startAngle, rst = {};
      point.percent = percent.percent;
      if (point.obj && point.obj.attrs) {
        point.color = point.obj.attrs.fill;
      }
      point.color = point.color || _self._getColor(index);
      point.prePercent = percent.prePercent;
      point.startAngle = startAngle + totalAngle * percent.prePercent;
      point.endAngle = startAngle + totalAngle * (point.prePercent + point.percent);
    },
    getPointByValue: function (xValue, value) {
      return {
        xValue: xValue,
        value: value
      };
    },
    _getPiePercent: function (point, points) {
      var _self = this, total = 0, pre = 0, curIndex = null, rst = {};
      Util.each(points, function (item, index) {
        if (point.index == item.index || point == item) {
          curIndex = index;
        }
      });
      Util.each(points, function (item, index) {
        if (index < curIndex) {
          pre += item.value;
        }
        total += item.value;
      });
      rst.percent = point.value / total;
      rst.prePercent = pre / total;
      return rst;
    },
    getVisiblePoints: function () {
      var _self = this, visiblePoints, points = [], items = _self.getItems();
      if (!_self.get('isPaint') || items.length == 0 || _self.get('repainting')) {
        return _self.getPoints();
      }
      visiblePoints = _self.get('visiblePoints');
      if (visiblePoints) {
        return visiblePoints;
      }
      Util.each(items, function (item) {
        if (item.get('visible')) {
          points.push(item.get('point'));
        }
      });
      _self.set('visiblePoints', points);
      return points;
    },
    animateItem: function (item, prePoint) {
      var _self = this, curPoint = item.get('point'), startAngle = curPoint.startAngle, endAngle = curPoint.endAngle, isPre = prePoint == item.get('prePoint'), preStart = isPre ? prePoint.startAngle : prePoint.endAngle, preEnd = isPre ? prePoint.endAngle : prePoint.endAngle;
      var animHadler = item.get('animHadler');
      if (animHadler) {
        Util.stopStep(animHadler);
      }
      animHadler = Util.animStep(_self.get('changeDuration'), function (factor) {
        var path, curStart, curEnd;
        if (isPre) {
          curStart = preStart + (startAngle - preStart) * factor;
          curEnd = preEnd + (endAngle - preEnd) * factor;
        } else {
          curStart = preStart - (preStart - startAngle) * factor;
          curEnd = preEnd - (preEnd - endAngle) * factor;
        }
        path = _self._getPiePath(curStart, curEnd);
        item.attr('path', path);
        if (_self.isSelected(item)) {
          var offset = _self._getOffset(curStart, curEnd, 10);
          item.attr('transform', 't' + offset.x + ' ' + offset.y);
        }
      });
      item.set('animHadler', animHadler);
    },
    pointToFactorPath: function (point, factor) {
      var _self = this, startAngle = _self.get('startAngle'), pStart, pEnd;
      pStart = point.startAngle;
      pEnd = point.endAngle;
      return _self._getPiePath(startAngle + (pStart - startAngle) * factor, startAngle + (pEnd - startAngle) * factor);
    },
    _getPiePath: function (startAngle, endAngle) {
      var _self = this, center = _self.getCenter(), path, cx = center.x, cy = center.y, r = _self.getRadius(), ir = _self.getInnerRadius(), x1 = cx + r * Math.cos(startAngle * RAD), x2 = cx + r * Math.cos(endAngle * RAD), y1 = cy + r * Math.sin(startAngle * RAD), y2 = cy + r * Math.sin(endAngle * RAD);
      if (!ir) {
        if (endAngle - startAngle == 360) {
          path = [
            [
              'M',
              cx,
              cy - r
            ],
            [
              'a',
              r,
              r,
              0,
              1,
              1,
              0,
              2 * r
            ],
            [
              'a',
              r,
              r,
              0,
              1,
              1,
              0,
              -2 * r
            ],
            ['z']
          ];
        } else {
          path = [
            'M',
            cx,
            cy,
            'L',
            x1,
            y1,
            'A',
            r,
            r,
            0,
            +(endAngle - startAngle > 180),
            1,
            x2,
            y2,
            'z'
          ];
        }
      } else {
        var ix1 = cx + ir * Math.cos(startAngle * RAD), ix2 = cx + ir * Math.cos(endAngle * RAD), iy1 = cy + ir * Math.sin(startAngle * RAD), iy2 = cy + ir * Math.sin(endAngle * RAD);
        path = [];
        if (endAngle - startAngle == 360) {
          path.push([
            'M',
            cx,
            cy - r
          ]);
          path.push([
            'a',
            r,
            r,
            0,
            1,
            1,
            0,
            2 * r
          ]);
          path.push([
            'a',
            r,
            r,
            0,
            1,
            1,
            0,
            -2 * r
          ]);
          path.push([
            'M',
            cx,
            cy - ir
          ]);
          path.push([
            'a',
            ir,
            ir,
            0,
            1,
            0,
            0,
            2 * ir
          ]);
          path.push([
            'a',
            ir,
            ir,
            0,
            1,
            0,
            0,
            -2 * ir
          ]);
          path.push(['z']);
        } else {
          path.push([
            'M',
            ix1,
            iy1
          ]);
          path.push([
            'L',
            x1,
            y1
          ]);
          path.push([
            'A',
            r,
            r,
            0,
            +(endAngle - startAngle > 180),
            1,
            x2,
            y2
          ]);
          path.push([
            'L',
            ix2,
            iy2
          ]);
          path.push([
            'A',
            ir,
            ir,
            0,
            +(endAngle - startAngle > 180),
            0,
            ix1,
            iy1
          ]);
          path.push(['z']);
        }
      }
      return path;
    },
    _getOffset: function (startAngle, endAngle, distance) {
      var _self = this, middleAngle, rst = {};
      if (distance == null) {
        middleAngle = startAngle;
        distance = endAngle;
      } else {
        middleAngle = startAngle + (endAngle - startAngle) / 2;
      }
      rst.x = distance * Math.cos(middleAngle * RAD);
      rst.y = distance * Math.sin(middleAngle * RAD);
      return rst;
    },
    setItemSelected: function (item, selected) {
      var _self = this, point = item.get('point'), duration = _self.get('changeDuration'), offset;
      if (selected) {
        offset = _self._getOffset(point.startAngle, point.endAngle, 10);
        item.animate({ transform: 't' + offset.x + ' ' + offset.y }, duration);
      } else {
        item.animate({ transform: 't0 0' }, duration);
      }
      item.set('selected', selected);
    },
    _onVisibleChange: function () {
      var _self = this;
      _self.set('points', null);
      this.set('visiblePoints', null);
      this.changeShapes();
      _self.resetLabels();
    },
    showChild: function (item) {
      Pie.superclass.showChild.call(this, item);
      this._onVisibleChange();
    },
    hideChild: function (item) {
      Pie.superclass.hideChild.call(this, item);
      this._onVisibleChange();
    },
    remove: function () {
      this.removeLegend();
      Pie.superclass.remove.call(this);
    }
  });
  exports = Pie;
  return exports;
}();
achart_flags_101_index_debug = function (exports) {
  var achartFlags = achart_flags_101_src_flags_debug;
  exports = achartFlags;
  return exports;
}();
achart_candlesticks_101_index_debug = function (exports) {
  var achartCandlesticks = achart_candlesticks_101_src_candlesticks_debug;
  exports = achartCandlesticks;
  return exports;
}();
achart_axis_113_src_base_debug = function (exports) {
  var Abstract = achart_axis_113_src_abstract_debug, Util = achart_util_110_index_debug, CLS_AXIS = 'x-chart-axis';
  function isBetween(x, x1, x2) {
    if (x1 > x2) {
      var temp = x2;
      x2 = x1;
      x1 = temp;
    }
    return x >= x1 && x <= x2;
  }
  function Axis(cfg) {
    Axis.superclass.constructor.call(this, cfg);
  }
  Axis.ATTRS = {
    zIndex: 4,
    x: null,
    y: null,
    start: null,
    end: null,
    tickOffset: 0,
    elCls: CLS_AXIS,
    position: 'bottom',
    line: {
      'stroke-width': 1,
      'stroke': '#C0D0E0'
    },
    tickLine: {
      'stroke-width': 1,
      'stroke': '#C0D0E0',
      value: 5
    }
  };
  Util.extend(Axis, Abstract);
  Util.augment(Axis, {
    beforeRenderUI: function () {
      var _self = this, plotRange;
      Axis.superclass.beforeRenderUI.call(_self);
      plotRange = _self.get('plotRange');
      if (plotRange) {
        var info = _self.getRangeInfo();
        _self.set('start', info.start);
        _self.set('end', info.end);
        _self.set('orthoEnd', _self._getOrthoEnd());
      }
      _self.set('indexCache', {});
      _self.set('pointCache', []);
    },
    getRangeInfo: function () {
      var _self = this, plotRange = _self.get('plotRange'), rst = {};
      if (plotRange) {
        var start = plotRange.start, position = _self.get('position'), end = {};
        if (_self.isVertical()) {
          if (position == 'left') {
            end.y = plotRange.end.y;
            end.x = start.x;
          } else {
            start = {};
            end = plotRange.end;
            start.x = plotRange.end.x;
            start.y = plotRange.start.y;
          }
        } else {
          if (position == 'top') {
            start = {};
            start.x = plotRange.start.x;
            start.y = plotRange.end.y;
            end = plotRange.end;
          } else {
            end.x = plotRange.end.x;
            end.y = start.y;
          }
        }
        rst.start = start;
        rst.end = end;
      }
      return rst;
    },
    change: function (info) {
      var _self = this;
      if (_self.isChange(info.ticks)) {
        _self.fire('beforechange', { info: info });
        _self._resetRange();
        _self._clearTicksInfo();
        _self.changeInfo(info);
        _self._processTicks(null, true);
        _self._changeLine();
        _self._changeTicks();
        _self._changeGrid();
        _self.resetLabels();
        _self.fire('afterchange');
      }
    },
    _resetRange: function () {
      var _self = this, range = _self.getRangeInfo();
      _self.set('start', range.start);
      _self.set('end', range.end);
      _self.set('orthoEnd', _self._getOrthoEnd());
    },
    isRangeChange: function () {
      var _self = this, info = _self.getRangeInfo(), start = _self.get('start'), end = _self.get('end');
      if (info.start.x != start.x || info.start.y != start.y || info.end.x != end.x || info.end.y != end.y) {
        return true;
      }
      if (_self.get('orthoEnd') !== _self._getOrthoEnd()) {
        return true;
      }
      return false;
    },
    isChange: function (ticks) {
      var _self = this, preTicks = _self.get('ticks');
      return _self.isRangeChange() || !Util.equalsArray(ticks, preTicks);
    },
    changeInfo: function (info) {
      var _self = this;
      _self.set('ticks', info.ticks);
    },
    _clearTicksInfo: function () {
      var _self = this, grid = _self.get('grid'), labels = _self.get('labels');
      _self.set('pointCache', []);
      _self.set('indexCache', []);
      _self.set('tickItems', []);
      if (grid) {
        grid.items = [];
      }
      if (labels) {
        labels.items = [];
      }
    },
    paint: function () {
      var _self = this;
      _self.fire('beforepaint');
      _self._drawLines();
      _self._renderTicks();
      _self._renderGrid();
      _self.fire('afterpaint');
    },
    _changeLine: function () {
      var _self = this, lineShape = _self.get('lineShape'), path;
      if (lineShape) {
        path = _self.getLinePath();
        lineShape.attr('path', path);
      }
    },
    isVertical: function () {
      var _self = this, isVertical = _self.get('isVertical'), position;
      if (isVertical != null) {
        return isVertical;
      }
      position = _self.get('position');
      if (position == 'bottom' || position == 'top') {
        isVertical = false;
      } else {
        isVertical = true;
      }
      _self.set('isVertical', isVertical);
      return isVertical;
    },
    getOffset: function (value) {
      var _self = this, ticks = _self.get('ticks'), index = Util.indexOf(ticks, value);
      return _self.getOffsetByIndex(index);
    },
    getStartOffset: function () {
      return this._getStartCoord();
    },
    getEndOffset: function () {
      return this._getEndCoord();
    },
    getValue: function (offset) {
      var _self = this, startCoord = _self._getStartCoord(), endCoord = _self._getEndCoord();
      if (offset < startCoord || offset > endCoord) {
        return NaN;
      }
      return _self.parseOffsetValue(offset);
    },
    getStartValue: function () {
      var _self = this, ticks = _self.get('ticks');
      return ticks[0];
    },
    getEndValue: function () {
      var _self = this, ticks = _self.get('ticks');
      return ticks[ticks.length - 1];
    },
    getSnapIndex: function (offset) {
      var _self = this, pointCache = _self.get('pointCache'), temp = [].concat(pointCache).sort(function (v1, v2) {
          return v1 - v2;
        }), snap = Util.snapTo(temp, offset);
      return Util.indexOf(pointCache, snap);
    },
    _appendEndOffset: function (offset) {
      var _self = this, tickOffset = _self.get('tickOffset'), directfactor;
      if (typeof tickOffset !== 'number') {
        tickOffset = tickOffset[0];
      }
      if (tickOffset) {
        directfactor = _self._getDirectFactor();
        if (offset == 0) {
          offset = offset + tickOffset * directfactor;
        } else if (directfactor > 0) {
          offset = offset + tickOffset;
        } else {
          offset = offset - tickOffset;
        }
      }
      return offset;
    },
    getOffsetByIndex: function (index) {
      var _self = this, length = _self._getLength(), ticks = _self.get('ticks'), count = ticks.length, offset = length / (count - 1) * index;
      return _self._appendEndOffset(offset) + _self._getStartCoord();
    },
    getOffsetPoint: function (index, current) {
      var _self = this, ortho = _self._getOrthoCoord(), indexCache = _self.get('indexCache');
      if (!current) {
        if (indexCache[index] !== undefined) {
          current = indexCache[index];
        } else {
          current = _self.getOffsetByIndex(index);
          indexCache[index] = current;
        }
      }
      if (_self.isVertical()) {
        return {
          x: ortho,
          y: current
        };
      }
      return {
        x: current,
        y: ortho
      };
    },
    getTickOffsetPoint: function (index) {
      return this.getOffsetPoint(index);
    },
    _getStartCoord: function () {
      var _self = this, start = _self.get('start');
      if (_self.isVertical()) {
        return start.y;
      } else {
        return start.x;
      }
    },
    _getOrthoCoord: function () {
      var _self = this, start = _self.get('start');
      if (_self.isVertical()) {
        return start.x;
      } else {
        return start.y;
      }
    },
    _getEndCoord: function () {
      var _self = this, end = _self.get('end');
      if (_self.isVertical()) {
        return end.y;
      } else {
        return end.x;
      }
    },
    _getOrthoEnd: function () {
      var _self = this, plotRange = _self.get('plotRange'), rst;
      if (_self.isVertical()) {
        rst = plotRange.end.x;
      } else {
        rst = plotRange.end.y;
      }
      return rst;
    },
    _getMiddleCoord: function () {
      var _self = this, start = _self._getStartCoord(), length = _self._getLength();
      return start + _self._appendEndOffset(length / 2);
    },
    getLength: function () {
      return Math.abs(this._getLength());
    },
    getTickAvgLength: function () {
      var _self = this, ticks = _self.get('ticks');
      return _self.getLength() / (ticks.length - 1);
    },
    _getLength: function () {
      var _self = this, start = _self.get('start'), offset = _self.get('tickOffset'), end = _self.get('end'), length;
      if (typeof offset !== 'number') {
        offset = offset[0] + offset[1];
      } else {
        offset = offset * 2;
      }
      if (_self.isVertical()) {
        length = end.y - start.y;
      } else {
        length = end.x - start.x;
      }
      if (length > 0) {
        length = length - offset;
      } else {
        length = length + offset;
      }
      return length;
    },
    getLinePath: function () {
      var _self = this, start = _self.get('start'), end = _self.get('end'), path = [];
      path.push([
        'M',
        start.x,
        start.y
      ]);
      path.push([
        'L',
        end.x,
        end.y
      ]);
      return path;
    },
    getTickEnd: function (start) {
      var _self = this, lineAttrs = _self.get('tickLine'), factor = _self._getAlignFactor(), value = lineAttrs.value, rst = {};
      if (_self.isVertical()) {
        rst.x2 = start.x1 + value * factor;
        rst.y2 = start.y1;
      } else {
        rst.x2 = start.x1;
        rst.y2 = start.y1 + value * factor;
      }
      return rst;
    },
    _changeTicks: function () {
      var _self = this, tickShape = _self.get('tickShape'), tickItems = _self.get('tickItems'), path = '';
      if (!tickShape) {
        if (tickItems && tickItems.length) {
          _self._renderTicks();
        }
        return;
      }
      Util.each(tickItems, function (item) {
        var subPath = Util.substitute('M{x1} {y1}L{x2} {y2}', item);
        path += subPath;
      });
      if (_self.get('animate')) {
        Util.animPath(tickShape, path, 2);
      } else {
        tickShape.attr('path', path);
      }
    },
    _getDirectFactor: function () {
      var _self = this, directfactor = _self.get('directfactor'), position, start, end;
      if (directfactor) {
        return directfactor;
      }
      directfactor = 1;
      position = _self.get('position');
      start = _self.get('start');
      end = _self.get('end');
      if (position == 'bottom' || position == 'top') {
        if (start.x > end.x) {
          directfactor = -1;
        }
      } else {
        if (start.y > end.y) {
          directfactor = -1;
        }
      }
      _self.set('directfactor', directfactor);
      return directfactor;
    },
    _getAlignFactor: function () {
      var _self = this, factor = _self.get('factor'), position;
      if (factor) {
        return factor;
      }
      position = _self.get('position');
      if (position == 'bottom' || position == 'right') {
        factor = 1;
      } else {
        factor = -1;
      }
      _self.set('factor', factor);
      return factor;
    },
    _renderTitle: function () {
      var _self = this, title = _self.get('title'), middle = _self._getMiddleCoord(), offsetPoint = _self.getOffsetPoint(null, middle), cfg = Util.mix({}, title);
      if (title.text) {
        cfg.x = offsetPoint.x + (title.x || 0);
        cfg.y = offsetPoint.y + (title.y || 0);
        _self.addShape({
          type: 'label',
          elCls: CLS_AXIS + '-title',
          attrs: cfg
        });
      }
    },
    getGridItemCfg: function (offsetPoint) {
      var _self = this, item = {}, plotRange = _self.get('plotRange');
      item.x1 = offsetPoint.x;
      item.y1 = offsetPoint.y;
      if (_self.isVertical()) {
        item.y2 = item.y1;
        item.x2 = plotRange.end.x;
      } else {
        item.x2 = item.x1;
        item.y2 = plotRange.end.y;
      }
      return item;
    },
    _changeGrid: function () {
      var _self = this, grid = _self.get('grid'), gridGroup;
      if (!grid) {
        return;
      }
      gridGroup = _self.get('gridGroup');
      gridGroup && gridGroup.change(grid.items);
    },
    remove: function () {
      var _self = this, gridGroup = _self.get('gridGroup'), labelsGroup = _self.get('labelsGroup');
      gridGroup && gridGroup.remove();
      _self.removeLabels();
      Axis.superclass.remove.call(this);
    }
  });
  exports = Axis;
  return exports;
}();
achart_axis_113_src_category_debug = function (exports) {
  var Util = achart_util_110_index_debug, Axis = achart_axis_113_src_base_debug;
  function Category(cfg) {
    Category.superclass.constructor.call(this, cfg);
  }
  Util.extend(Category, Axis);
  Category.ATTRS = {
    categories: null,
    type: 'category',
    tickAlignCenter: true
  };
  Util.augment(Category, {
    beforeRenderUI: function () {
      var _self = this;
      Category.superclass.beforeRenderUI.call(_self);
      if (!_self.get('ticks')) {
        var categories = _self.get('categories'), ticks = [];
        ticks = ticks.concat(categories);
        if (_self.get('tickAlignCenter')) {
          if (ticks[ticks.length - 1] != ' ') {
            ticks.push(' ');
          }
        }
        _self.set('ticks', ticks);
      } else if (!_self.get('categories')) {
        var categories = [];
        categories.concat(_self.get('ticks'));
        _self.set('categories', categories);
      }
    },
    changeInfo: function (info) {
      var _self = this, ticks = info.ticks;
      if (!ticks) {
        ticks = [].concat(info.categories);
        if (_self.get('tickAlignCenter') && ticks.length && ticks[ticks.length - 1] != ' ') {
          ticks.push(' ');
        }
      } else if (!info.categories) {
        info.categories = [].concat(info.ticks);
        Util.remove(info.categories, ' ');
      }
      _self.set('categories', info.categories);
      _self.set('ticks', ticks);
    },
    getOffsetByIndex: function (index) {
      return this._getOffsetByTicks(index);
    },
    getValue: function (offset) {
      var _self = this, ticks = _self.get('ticks'), categories = _self.get('categories'), pointCache = _self.get('pointCache'), index;
      if (categories.length <= ticks.length) {
        index = _self.getSnapIndex(offset);
      } else {
        var start = pointCache[0], distancd = offset - start, count = _self.get('tickAlignCenter') ? categories.length + 1 : categories.length, avg = _self._getAvgLength(count);
        index = Math.round(distancd / avg);
      }
      return categories[index];
    },
    getOffset: function (value) {
      var _self = this, categories = _self.get('categories'), index = Util.indexOf(categories, value);
      return _self._getOffsetByCategories(index);
    },
    _getOffsetByIndex: function (index, count) {
      var _self = this, avg = _self._getAvgLength(count), offset = avg * index;
      if (_self.get('tickAlignCenter')) {
        offset += avg / 2;
      }
      return _self._appendEndOffset(offset) + _self._getStartCoord();
    },
    _getOffsetByCategories: function (index) {
      var _self = this, categories = _self.get('categories'), count = _self.get('tickAlignCenter') ? categories.length + 1 : categories.length;
      return _self._getOffsetByIndex(index, count);
    },
    _getOffsetByTicks: function (index) {
      var _self = this, ticks = _self.get('ticks'), categories = _self.get('categories'), tick = ticks[index], tickIndex = Util.indexOf(categories, tick);
      if (tickIndex != -1) {
        return _self._getOffsetByCategories(tickIndex);
      }
      return _self._getOffsetByIndex(index);
    },
    _getAvgLength: function (count) {
      var _self = this, length = _self._getLength(), count = count || _self.get('ticks').length, avg = length / (count - 1);
      return avg;
    },
    getTickOffsetPoint: function (index) {
      var _self = this, ortho = _self._getOrthoCoord(), avg = _self._getAvgLength(), current = _self.getOffsetByIndex(index);
      if (_self.get('tickAlignCenter')) {
        current -= avg / 2;
      }
      if (_self.isVertical()) {
        return {
          x: ortho,
          y: current
        };
      }
      return {
        x: current,
        y: ortho
      };
    }
  });
  exports = Category;
  return exports;
}();
achart_axis_113_src_number_debug = function (exports) {
  var Axis = achart_axis_113_src_base_debug, Util = achart_util_110_index_debug, abbrs = [
      'k',
      'm',
      'g',
      't'
    ], APPEND = 5, NAN = NaN;
  var floor = Util.snapFloor, ceiling = Util.snapCeiling;
  function between(v1, v2, value) {
    var min = Math.min(v1, v2), max = Math.max(v1, v2);
    return (value >= min || min - value < 2) && (value <= max || value - max < 2);
  }
  function NumberAxis(cfg) {
    NumberAxis.superclass.constructor.call(this, cfg);
  }
  Util.extend(NumberAxis, Axis);
  NumberAxis.ATTRS = {
    min: null,
    max: null,
    tickInterval: null,
    autoOffset: false,
    autoAppend: 5,
    type: 'number',
    formatter: function (value) {
      if (value == null || isNaN(value)) {
        return '';
      }
      if (value < 1000) {
        return value;
      }
      var interval = this.get('tickInterval');
      if (interval % 1000 !== 0) {
        return value;
      }
      var base = 1000;
      for (var i = 1; i <= abbrs.length; i++) {
        if (value >= base && value < base * 1000) {
          return value / base + abbrs[i - 1];
        }
        base = base * 1000;
      }
      return value / 1000000000000 + 't';
    }
  };
  Util.augment(NumberAxis, {
    beforeRenderUI: function () {
      var _self = this;
      NumberAxis.superclass.beforeRenderUI.call(_self);
      var ticks = _self.get('ticks');
      if (_self.get('autoOffset') && ticks) {
        _self._setAutoOffset({
          ticks: ticks,
          min: _self.get('min'),
          max: _self.get('max')
        });
      }
      if (!ticks) {
        ticks = _self._getTicks(_self.get('max'), _self.get('min'), _self.get('tickInterval'));
        _self.set('ticks', ticks);
      }
    },
    _getTicks: function (max, min, tickInterval) {
      var ticks = [], count = (max - min) / tickInterval, cur;
      if (!(max > min) || isNaN(max) || max == null || isNaN(min) || min == null || isNaN(tickInterval) || tickInterval == null) {
        return [];
      }
      ticks.push(min);
      for (var i = 1; i <= count; i++) {
        cur = tickInterval * i + min;
        ticks.push(cur);
      }
      return ticks;
    },
    changeInfo: function (info) {
      var _self = this;
      if (info.interval) {
        info.tickInterval = info.interval;
      }
      if (_self.get('autoOffset')) {
        _self._setAutoOffset(info);
      }
      if (info.ticks) {
        _self.set('ticks', info.ticks);
      } else {
        var ticks = _self._getTicks(info.max, info.min, info.tickInterval);
        _self.set('ticks', ticks);
      }
      _self.set('tickInterval', info.tickInterval);
    },
    _setAutoOffset: function (info) {
      var _self = this, ticks = info.ticks, percentStart = 0, percentEnd = 0, offset = [], avg, append = _self.get('autoAppend'), length = _self.getEndOffset() - _self.getStartOffset();
      if (info.min != null && info.min > ticks[0]) {
        while (info.min > ticks[1]) {
          ticks.shift();
        }
        percentStart = (ticks[1] - info.min) / (ticks[1] - ticks[0]);
        if (percentStart < 0.8) {
          ticks.shift();
        } else {
          percentStart = 0;
        }
      }
      var count = ticks.length;
      if (info.max != null && info.max < ticks[count - 1]) {
        while (info.max < ticks[count - 2]) {
          ticks.pop();
          count = ticks.length;
        }
        percentEnd = (info.max - ticks[count - 2]) / (ticks[count - 1] - ticks[count - 2]);
        ticks.pop();
      }
      avg = length / (ticks.length - 1 + percentStart + percentEnd);
      offset[0] = avg * percentStart + append;
      offset[1] = avg * percentEnd + append;
      _self.set('tickOffset', offset);
    },
    getOffset: function (value) {
      value = parseFloat(value);
      var _self = this, offset = _self.getRelativeOffset(value), start = _self._getStartCoord(), end = _self._getEndCoord();
      offset = _self._appendEndOffset(offset) + _self._getStartCoord();
      if (!between(start, end, offset)) {
        return NAN;
      }
      return offset;
    },
    getValue: function (offset) {
      var _self = this, startCoord = _self._getStartCoord(), endCoord = _self._getEndCoord(), vertical = _self.isVertical(), pointCache, floorVal, floorIndex, baseVal, baseIndex, ceilingVal, tickInterval, ticks;
      pointCache = _self.get('pointCache');
      var max = Math.max(startCoord, endCoord), min = Math.min(startCoord, endCoord);
      if (offset < min || offset > max) {
        return NaN;
      }
      var tmpCache = pointCache.slice(0).sort(function (v1, v2) {
          return v1 - v2;
        });
      floorVal = vertical ? ceiling(tmpCache, offset) : floor(tmpCache, offset);
      if (isNaN(floorVal)) {
        floorVal = tmpCache[0];
        ceilingVal = tmpCache[1];
      }
      baseVal = floorVal;
      floorIndex = Util.indexOf(pointCache, floorVal);
      baseIndex = floorIndex;
      ticks = _self.get('ticks');
      tickInterval = _self.get('tickInterval');
      avg = _self._getAvgLength(ticks.length);
      if (floorVal == offset) {
        return ticks[floorIndex];
      }
      if (tickInterval) {
        return ticks[floorIndex] + (offset - baseVal) / avg * tickInterval;
      }
      if (ceilingVal == null) {
        ceilingVal = ceiling(tmpCache, offset);
        if (isNaN(ceilingVal)) {
          var count = tmpCache.length;
          floorIndex = count - 2;
          baseIndex = count - 1;
          baseVal = tmpCache[count - 1];
        }
      }
      return ticks[baseIndex] + (offset - baseVal) / avg * (ticks[floorIndex + 1] - ticks[floorIndex]);
    },
    _getAvgLength: function (count) {
      var _self = this, length = _self._getLength();
      return length / (count - 1);
    },
    getRelativeOffset: function (value) {
      var _self = this, ticks = _self.get('ticks'), index = Util.indexOf(ticks, value), tickInterval = _self.get('tickInterval'), count = ticks.length, floorVal, ceilingVal, baseVal, avg = _self._getAvgLength(ticks.length), offset;
      if (index !== -1) {
        return avg * index;
      }
      floorVal = floor(ticks, value);
      ceilingVal = ceiling(ticks, value);
      baseVal = floorVal;
      if (isNaN(floorVal)) {
        floorVal = ticks[0];
        ceilingVal = ticks[1];
        baseVal = floorVal;
        offset = 0;
      } else {
        index = Util.indexOf(ticks, floorVal);
        offset = avg * index;
      }
      if (isNaN(ceilingVal)) {
        floorVal = ticks[count - 2];
        ceilingVal = ticks[count - 1];
        baseVal = ceilingVal;
        offset = avg * (count - 1);
      }
      if (tickInterval) {
        offset = offset + (value - baseVal) / tickInterval * avg;
      } else {
        offset = offset + (value - baseVal) / (ceilingVal - floorVal) * avg;
      }
      return offset;
    }
  });
  exports = NumberAxis;
  return exports;
}();
achart_axis_113_src_time_debug = function (exports) {
  var Util = achart_util_110_index_debug, NAixs = achart_axis_113_src_number_debug;
  function parseTime(d) {
    if (d instanceof Date) {
      return d.getTime();
    }
    if (Util.isNumber(d)) {
      return d;
    }
    var date = d;
    if (Util.isString(d)) {
      date = d.replace('-', '/');
      date = new Date(date).getTime();
    }
    return date;
  }
  var Time = function (cfg) {
    Time.superclass.constructor.call(this, cfg);
  };
  Time.ATTRS = {
    type: 'time',
    startDate: null,
    autoOffset: true,
    endDate: null
  };
  Util.extend(Time, NAixs);
  Util.augment(Time, {
    beforeRenderUI: function () {
      var _self = this;
      var startTime = parseTime(_self.get('startDate')), endTime = parseTime(_self.get('endDate'));
      if (startTime && !_self.get('min')) {
        _self.set('min', startTime);
      }
      if (endTime && !_self.get('max')) {
        _self.set('max', endTime);
      }
      Time.superclass.beforeRenderUI.call(_self);
    }
  });
  exports = Time;
  return exports;
}();
achart_axis_113_src_timecategory_debug = function (exports) {
  var Util = achart_util_110_index_debug, CAxis = achart_axis_113_src_category_debug;
  var TimeCategory = function (cfg) {
    TimeCategory.superclass.constructor.call(this, cfg);
  };
  TimeCategory.ATTRS = {
    type: 'timeCategory',
    tickAlignCenter: false
  };
  Util.extend(TimeCategory, CAxis);
  exports = TimeCategory;
  return exports;
}();
achart_axis_113_src_numbercategory_debug = function (exports) {
  var Util = achart_util_110_index_debug, CAxis = achart_axis_113_src_category_debug;
  var NumberCategory = function (cfg) {
    NumberCategory.superclass.constructor.call(this, cfg);
  };
  NumberCategory.ATTRS = {
    type: 'numberCategory',
    tickAlignCenter: false
  };
  Util.extend(NumberCategory, CAxis);
  exports = NumberCategory;
  return exports;
}();
achart_axis_113_src_radius_debug = function (exports) {
  var Util = achart_util_110_index_debug, NumberAxis = achart_axis_113_src_number_debug;
  var Radius = function (cfg) {
    Radius.superclass.constructor.call(this, cfg);
  };
  Radius.ATTRS = {
    circle: null,
    position: 'left',
    type: 'radius'
  };
  Util.extend(Radius, NumberAxis);
  Util.augment(Radius, {
    beforeRenderUI: function () {
      Radius.superclass.beforeRenderUI.call(this);
      var _self = this, circle = _self.get('circle');
      if (circle) {
        _self.set('start', circle.getCenter());
        _self.set('end', circle.getCirclePoint(0));
      }
    },
    getGridItemCfg: function (offsetPoint) {
      var _self = this, item = {}, points = [], circle = _self.get('circle'), center = circle.getCenter(), count = circle.getTicksCount(), r = Math.abs(offsetPoint.y - center.y);
      for (var i = 0; i < count; i++) {
        var angle = circle.getOffsetByIndex(i), point = circle.getCirclePoint(angle, r);
        points.push(point);
      }
      item.points = points;
      item.r = r;
      item.center = center;
      return item;
    },
    getPointByAngle: function (angle, value) {
      var _self = this, circle = _self.get('circle'), center = circle.getCenter(), offset = _self.getOffset(value);
      return circle.getCirclePoint(angle, Math.abs(offset - center.y));
    },
    _resetRange: function () {
    },
    isRangeChange: function () {
      return false;
    },
    getValueByPoint: function (x, y) {
      var _self = this, circle = _self.get('circle'), center = circle.getCenter(), distance = circle.getDistance(x, y);
      return _self.getValue(center.y - distance);
    }
  });
  exports = Radius;
  return exports;
}();
achart_series_107_src_column_debug = function (exports) {
  var Util = achart_util_110_index_debug, Cartesian = achart_series_107_src_cartesian_debug, ActiveGroup = achart_actived_102_index_debug.Group, Stacked = achart_series_107_src_stacked_debug, Group = achart_series_107_src_itemgroup_debug;
  function highlight(c, percent) {
    var color = Raphael.color(c), l = color.l * (1 + percent);
    return Raphael.hsl2rgb(color.h, color.s, l).hex;
  }
  function getPiePath(startAngle, endAngle, r, ir, circle) {
    var center = circle.getCenter(), path, cx = center.x, cy = center.y, start = circle.getCirclePoint(startAngle, r), end = circle.getCirclePoint(endAngle, r);
    if (!ir) {
      path = [
        'M',
        cx,
        cy,
        'L',
        start.x,
        start.y,
        'A',
        r,
        r,
        0,
        +(endAngle - startAngle > 180),
        1,
        end.x,
        end.y,
        'z'
      ];
    } else {
      var iStart = circle.getCirclePoint(startAngle, ir), iEnd = circle.getCirclePoint(endAngle, ir);
      path = [];
      path.push([
        'M',
        iStart.x,
        iStart.y
      ]);
      path.push([
        'L',
        start.x,
        start.y
      ]);
      path.push([
        'A',
        r,
        r,
        0,
        +(endAngle - startAngle > 180),
        1,
        end.x,
        end.y
      ]);
      path.push([
        'L',
        iEnd.x,
        iEnd.y
      ]);
      path.push([
        'A',
        ir,
        ir,
        0,
        +(endAngle - startAngle > 180),
        0,
        iStart.x,
        iStart.y
      ]);
      path.push(['z']);
    }
    return path;
  }
  var Column = function (cfg) {
    Column.superclass.constructor.call(this, cfg);
  };
  Column.ATTRS = {
    type: 'column',
    elCls: 'x-chart-column',
    columnWidth: null,
    autoWidth: true,
    columnOffset: 0,
    cancelSelect: false,
    stackPadding: 1,
    animate: true,
    duration: 1000,
    item: {
      'stroke': 'none',
      'stroke-width': 1,
      'fill-opacity': 0.75
    }
  };
  Util.extend(Column, Cartesian);
  Util.mixin(Column, [
    Group,
    ActiveGroup,
    Stacked
  ]);
  Util.augment(Column, {
    processColor: function () {
      var _self = this, color = _self.get('color');
      if (color) {
        var item = _self.get('item');
        if (!item.fill) {
          item.fill = color;
        }
      }
    },
    bindUI: function () {
      Column.superclass.bindUI.call(this);
      this.bindItemClick();
    },
    draw: function (points) {
      var _self = this;
      _self.resetWidth();
      Util.each(points, function (point, index) {
        _self._drawPoint(point, index);
      });
      if (_self.get('animate')) {
        _self.animateItems();
      }
      _self.sort();
    },
    _drawPoint: function (point, index) {
      var _self = this, shape = _self.addItem(point, index);
      if (_self.get('labels')) {
        var label = _self.addLabel(point.value, point);
        shape.set('label', label);
      }
    },
    addPoint: function (point, shift, redraw) {
      var _self = this, data = _self.get('data');
      data.push(point);
      if (shift) {
        data.shift();
        redraw && _self.shiftPoint();
      }
      _self.changeData(data, redraw);
    },
    shiftPoint: function () {
      var _self = this, firstItem = _self.getItems()[0];
      firstItem && firstItem.remove();
      Column.superclass.shiftPoint.call(this);
    },
    resetWidth: function () {
      if (!this.get('autoWidth')) {
        return;
      }
      if (this.isInCircle()) {
        this.resetCircleWidth();
        return;
      }
      var _self = this, curIndex, xAxis = _self.get('xAxis'), tickLength = _self._getAvgLength(), count, margin = 10, width, offset, info = _self._getIndexInfo();
      count = info.count;
      curIndex = info.curIndex;
      width = tickLength / 2 / count;
      margin = 1 / 2 * width;
      offset = 1 / 2 * (tickLength - count * width - (count - 1) * margin) + ((curIndex + 1) * width + curIndex * margin) - 1 / 2 * width - 1 / 2 * tickLength;
      _self.set('columnWidth', width);
      _self.set('columnOffset', offset);
    },
    _getAvgLength: function () {
      var _self = this, xAxis = _self.get('xAxis'), type = xAxis.get('type'), avgLength, data = _self.get('data');
      if (type != 'time' && type != 'number' && type != 'timeCategory') {
        avgLength = xAxis.getTickAvgLength();
      } else {
        var length = xAxis.getLength();
        avgLength = length / data.length;
      }
      return avgLength;
    },
    _getIndexInfo: function () {
      var _self = this, parent = _self.get('parent'), series = parent.getSeries ? parent.getSeries() : parent.get('children'), curIndex, count, columns = [];
      if (!_self.isStacked()) {
        Util.each(series, function (item) {
          if (item.get('visible') && item.get('type') == 'column') {
            columns.push(item);
          }
        });
        count = columns.length;
        curIndex = Util.indexOf(columns, _self);
      } else {
        count = 1;
        curIndex = 0;
      }
      return {
        curIndex: curIndex,
        count: count
      };
    },
    resetCircleWidth: function () {
      var _self = this, curIndex, xAxis = _self.get('xAxis'), avgAngle = xAxis.getTickAvgAngle(), count, width, offset;
      info = _self._getIndexInfo();
      count = info.count;
      curIndex = info.curIndex;
      width = avgAngle / count;
      offset = curIndex * width;
      _self.set('columnWidth', width);
      _self.set('columnOffset', offset);
    },
    changeShapes: function (points) {
      var _self = this;
      _self.resetWidth();
      _self.changePoints(points);
    },
    getActiveItems: function () {
      return this.getItems();
    },
    isItemActived: function (item) {
      return item.get('actived');
    },
    setItemActived: function (item, actived) {
      var _self = this, color = item.getCfgAttr('attrs').fill;
      if (actived) {
        item.attr('fill', highlight(color, 0.2));
        item.set('actived', true);
      } else {
        item.attr('fill', color);
        item.set('actived', false);
      }
    },
    setItemSelected: function (item, selected) {
      var _self = this, attrs = item.getCfgAttr('attrs'), color = attrs.fill, stroke = attrs.stroke, strokeWidth = attrs['stroke-width'];
      if (selected) {
        item.attr({
          'stroke': Util.dark(color, 0.3),
          'stroke-width': 2
        });
        item.set('selected', true);
      } else {
        item.attr({
          'stroke': stroke,
          'stroke-width': strokeWidth
        });
        item.set('selected', false);
      }
    },
    onStickyTracking: function (ev) {
      var _self = this, point = _self.getTrackingInfo(ev.point), items = _self.getItems();
      if (point) {
        Util.each(items, function (item) {
          if (item.get('point').x == point.x && item.get('point').y == point.y) {
            _self.setActivedItem(item);
          }
        });
      }
    },
    pointToFactorPath: function (point, factor) {
      var _self = this, item = _self.get('item'), width = _self.get('columnWidth'), offset = _self.get('columnOffset'), xName = _self.getXName(), yName = _self.getYName(), invert = _self.get('invert'), V = invert ? 'h' : 'v', H = invert ? 'v' : 'h', height, value0, stackPadding = 0, baseValue = _self.getBaseValue(), isInCircle = _self.isInCircle(), path = [];
      if (isInCircle) {
        var xAxis = _self.get('xAxis'), angle = point.xValue, startAngle = offset + angle, endAngle = offset + angle + width, r = point.r || xAxis.getDistance(point.x, point.y), ir = point.ir || 0;
        r = r * factor;
        ir = ir * factor;
        path = getPiePath(startAngle, endAngle, r, ir, xAxis);
      } else {
        if (_self.isStacked() && point.lowY) {
          value0 = point.lowY;
          stackPadding = _self.get('stackPadding');
        } else {
          value0 = baseValue;
        }
        value0 = value0 - stackPadding;
        height = point[yName] - value0;
        var xValue = point[xName] + offset - width / 2, yValue = baseValue + (value0 - baseValue) * factor;
        if (invert) {
          path.push([
            'M',
            yValue,
            xValue
          ]);
        } else {
          path.push([
            'M',
            xValue,
            yValue
          ]);
        }
        path.push([
          V,
          height * factor
        ]);
        path.push([
          H,
          width
        ]);
        path.push([
          V,
          -1 * height * factor
        ]);
        path.push(['z']);
      }
      return path;
    },
    processPoint: function (point, index) {
      var _self = this, stackType = _self.get('stackType');
      if (stackType && stackType != 'none') {
        _self.processStackedPoint(point, index);
      }
    }
  });
  exports = Column;
  return exports;
}();
achart_axis_113_index_debug = function (exports) {
  var Axis = achart_axis_113_src_base_debug;
  Axis.Category = achart_axis_113_src_category_debug;
  Axis.Number = achart_axis_113_src_number_debug;
  Axis.Time = achart_axis_113_src_time_debug;
  Axis.TimeCategory = achart_axis_113_src_timecategory_debug;
  Axis.NumberCategory = achart_axis_113_src_numbercategory_debug;
  Axis.Auto = achart_auto_103_index_debug;
  Axis.Circle = achart_axis_113_src_circle_debug;
  Axis.Radius = achart_axis_113_src_radius_debug;
  exports = Axis;
  return exports;
}();
achart_series_107_index_debug = function (exports) {
  var Series = achart_series_107_src_base_debug;
  Series.Cartesian = achart_series_107_src_cartesian_debug;
  Series.Line = achart_series_107_src_line_debug;
  Series.Column = achart_series_107_src_column_debug;
  Series.Area = achart_series_107_src_area_debug;
  Series.Pie = achart_series_107_src_pie_debug;
  Series.Stacked = achart_series_107_src_stacked_debug;
  Series.ItemGroup = achart_series_107_src_itemgroup_debug;
  exports = Series;
  return exports;
}();
achart_arearange_102_src_arearange_debug = function (exports) {
  var Series = achart_series_107_index_debug, Util = achart_util_110_index_debug;
  var Arearange = function (cfg) {
    Arearange.superclass.constructor.call(this, cfg);
  };
  Util.extend(Arearange, Series.Cartesian);
  Arearange.ATTRS = {
    elCls: 'x-chart-arearange-series',
    connectNulls: false,
    area: {},
    line: {},
    lineActived: {},
    areaActived: {}
  };
  Util.augment(Arearange, {
    processColor: function (color) {
      var _self = this, line = _self.get('line'), area = _self.get('area');
      if (!line.stroke) {
        line.stroke = color;
      }
      if (!area.fill) {
        area.fill = color;
      }
    },
    draw: function (points, callback) {
      var _self = this;
      if (_self.get('animate')) {
        _self.animateClip(function () {
          _self._drawArea(points);
          _self._drawLine(points);
        }, callback);
      } else {
        _self._drawArea(points);
        _self._drawLine(points);
      }
    },
    getTipInfo: function (point) {
      return point.lowValue + ' ~ ' + point.highValue;
    },
    getData: function (type) {
      var _self = this, data = _self.get('data'), rst = [];
      if (type == 'xAxis') {
        rst = Util.map(data, function (item) {
          return item[0];
        });
      } else {
        Util.each(data, function (item) {
          var tmp = item.slice(1, 3);
          rst.push(Math.max.apply(null, tmp));
          rst.push(Math.min.apply(null, tmp));
        });
      }
      return rst;
    },
    processPoint: function (point) {
      var _self = this, arr = point.arr, length = arr.length, yAxis = _self.get('yAxis');
      point.lowY = point.y;
      point.lowValue = arr[length - 2];
      point.highY = yAxis.getOffset(arr[length - 1]);
      point.highValue = arr[length - 1];
      return point;
    },
    _drawLine: function (points) {
      var _self = this, line = _self.get('line'), cfg = Util.mix({}, line);
      cfg.path = _self.point2path(points);
      lineShape = _self.addShape('path', cfg);
      _self.set('lineShape', lineShape);
    },
    _drawArea: function (points) {
      var _self = this, area = _self.get('area'), cfg = Util.mix({}, area);
      cfg.path = _self.point2Area(points);
      var areaShape = _self.addShape('path', cfg);
      _self.set('areaShape', areaShape);
    },
    _getFirstPoint: function (points) {
      var rst = null;
      Util.each(points, function (point, index) {
        if (point.value != null) {
          rst = point;
          rst.index = index;
          return false;
        }
      });
      return rst;
    },
    _getLastPoint: function (points) {
      var rst = null;
      for (var i = points.length - 1; i >= 0; i--) {
        var point = points[i];
        if (point.value != null) {
          rst = point;
          rst.index = i;
          break;
        }
      }
      return rst;
    },
    _getNextPoint: function (points, index) {
      var rst = null;
      for (var i = index; i < points.length; i++) {
        var point = points[i];
        if (point.value != null) {
          rst = point;
          rst.index = i;
          break;
        }
      }
      return rst;
    },
    getLinePath: function (points) {
      var _self = this, connectNulls = _self.get('connectNulls'), count = points.length, firstPoint = _self._getFirstPoint(points) || points[0], lastPoint = _self._getLastPoint(points) || points[count - 1], path = [];
      var linePath = {
          lowPath: [],
          highPath: []
        }, notNullArray = [], lineRange = [];
      for (var index = 0; index < count; index++) {
        var item = points[index];
        if (item.value != null) {
          notNullArray.push(index);
        }
      }
      var preIndex, startIndex, endIndex;
      Util.each(notNullArray, function (index, i) {
        if (i == 0) {
          startIndex = index;
        } else if (preIndex + 1 != index) {
          lineRange.push({
            startIndex: startIndex,
            endIndex: preIndex
          });
          startIndex = index;
          if (i == notNullArray.length - 1) {
            lineRange.push({
              startIndex: index,
              endIndex: index
            });
          }
        } else if (i == notNullArray.length - 1) {
          lineRange.push({
            startIndex: startIndex,
            endIndex: notNullArray[i]
          });
        }
        preIndex = index;
      });
      Util.each(lineRange, function (item, index) {
        var highArr = [], lowArr = [], startIndex = item.startIndex, endIndex = item.endIndex;
        highArr.push([
          'M',
          points[startIndex].x,
          points[startIndex].highY
        ]);
        if (startIndex == endIndex) {
          highArr.push([
            'L',
            points[endIndex].x,
            points[endIndex].highY
          ]);
        }
        for (var i = startIndex + 1; i <= endIndex; i++) {
          var item = [
              'L',
              points[i].x,
              points[i].highY
            ];
          highArr.push(item);
        }
        lowArr.push([
          'M',
          points[endIndex].x,
          points[endIndex].lowY
        ]);
        if (startIndex == endIndex) {
          lowArr.push([
            'L',
            points[endIndex].x,
            points[endIndex].highY
          ]);
        }
        for (var i = endIndex - 1; i >= startIndex; i--) {
          var item = [
              'L',
              points[i].x,
              points[i].lowY
            ];
          lowArr.push(item);
        }
        linePath.highPath.push(highArr);
        linePath.lowPath.push(lowArr);
      });
      if (connectNulls) {
        var newHigh = [], newLow = [], len = linePath.highPath.length;
        for (var i = 0; i < len; i++) {
          var highPath = linePath.highPath[i], lowPath = linePath.lowPath[len - i - 1];
          if (i > 0) {
            highPath[0][0] = 'L';
            lowPath[0][0] = 'L';
          }
          for (var j = 0; j < highPath.length; j++) {
            newHigh.push(highPath[j]);
          }
          for (var j = 0; j < lowPath.length; j++) {
            newLow.push(lowPath[j]);
          }
        }
        linePath = {
          lowPath: [newLow],
          highPath: [newHigh]
        };
      }
      return linePath;
    },
    point2path: function (points) {
      var _self = this, connectNulls = _self.get('connectNulls'), linePath = _self.getLinePath(points), path = [], highPath = [], lowPath = [];
      Util.each(linePath.highPath, function (item, index) {
        highPath = highPath.concat(item);
      });
      Util.each(linePath.lowPath, function (item, index) {
        lowPath = lowPath.concat(item);
      });
      path = highPath.concat(lowPath);
      return path;
    },
    point2Area: function (points) {
      var _self = this, linePath = _self.getLinePath(points), pathArrs = [], path = [];
      Util.each(linePath.lowPath, function (item, index) {
        var currHigh = linePath.highPath[index], currPath = [];
        item[0][0] = 'L';
        currPath = currHigh.concat(item);
        currPath.push(['z']);
        pathArrs.push(currPath);
      });
      path = pathArrs.join();
      return path;
    },
    changeShapes: function (points) {
      var _self = this, lineShape = _self.get('lineShape'), areaShape = _self.get('areaShape'), linePath = _self.point2path(points), areaPath = _self.point2Area(points);
      if (_self.get('animate')) {
        Util.animPath(areaShape, areaPath);
        Util.animPath(lineShape, linePath);
      } else {
        lineShape.attr('path', linePath);
        areaShape.attr('path', areaPath);
      }
    },
    setActiveStatus: function (actived) {
      var _self = this, line = _self.get('line'), area = _self.get('area'), lineShape = _self.get('lineShape'), areaShape = _self.get('areaShape'), lineActived = _self.get('lineActived'), areaActived = _self.get('areaActived');
      if (actived) {
        lineActived && lineShape.attr(lineActived);
        areaActived && areaShape.attr(areaActived);
      } else {
        line && lineShape.attr(line);
        area && areaShape.attr(area);
      }
    }
  });
  exports = Arearange;
  return exports;
}();
achart_series_other_104_src_bubble_debug = function (exports) {
  /**
   * @fileOverview 气泡图
   * @ignore
   */
  var Cartesian = achart_series_107_index_debug.Cartesian, ActiveGroup = achart_actived_102_index_debug.Group, Util = achart_util_110_index_debug;
  /**
   * @class Chart.Series.Bubble
   * 冒泡图
   */
  var Bubble = function (cfg) {
    Bubble.superclass.constructor.call(this, cfg);
  };
  Bubble.ATTRS = {
    elCls: 'x-chart-bubble',
    type: 'bubble',
    /**
     * 气泡的配置信息
     * @type {Object}
     */
    circle: {},
    /**
     * 激活气泡的状态
     * @type {Object}
     */
    activeCircle: {},
    legendType: 'circle',
    /**
     * 如果传入的数据是对象那么这个字段标示半径代表的字段
     * @type {String}
     */
    radiusField: 'r',
    animate: true,
    /**
     * 格式化半径函数
     */
    radiusFormatter: function (r) {
      return Math.pow(r, 0.75);
    },
    autoPaint: false,
    stickyTracking: false
  };
  Util.extend(Bubble, Cartesian);
  Util.mixin(Bubble, [ActiveGroup]);
  Util.augment(Bubble, {
    /**
     * @protected
     * 处理颜色
     */
    processColor: function () {
      var _self = this, color = _self.get('color');
      if (color) {
        var circle = _self.get('circle');
        if (circle) {
          Util.trySet(circle, 'stroke', color);
          Util.trySet(circle, 'fill', color);
        }
      }
    },
    renderUI: function () {
      Bubble.superclass.renderUI.call(this);
      this._renderGroup();
    },
    //渲染圆
    draw: function (points) {
      var _self = this;
      Util.each(points, function (point) {
        _self.addBubble(point);
      });
    },
    /**
     * @protected
     * 内部图形发生改变
     */
    changeShapes: function () {
      var _self = this, points = _self.getPoints(), items = _self.getItems();
      Util.each(items, function (item, index) {
        var point = points[index];
        if (point) {
          item.animate({
            cx: point.x,
            cy: point.y
          }, _self.get('changeDuration'));
          item.set('point', point);
        }
      });
      var count = items.length;
      if (points.length < count) {
        for (var i = count - 1; i >= points.length; i--) {
          items[i].remove();
        }
      }
      if (points.length > count) {
        for (var i = count; i < points.length; i++) {
          _self.addBubble(points[i]);
        }
      }
    },
    /**
     * 获取内部的圆
     * @return {Array} 图形圆的集合
     */
    getItems: function () {
      return this.get('group').get('children');
    },
    /**
     * @protected
     * 获取可以被激活的元素
     * @return {Chart.Actived[]} 可以被激活的元素集合
     */
    getActiveItems: function () {
      return this.getItems();
    },
    _renderGroup: function () {
      var _self = this, group = _self.addGroup();
      _self.set('group', group);
    },
    //设置激活状态
    setItemActived: function (item, actived) {
      var _self = this, circle = _self.get('circle'), activedCfg = _self.get('activeCircle');
      if (actived) {
        item.attr(activedCfg);
        item.set('actived', true);
      } else {
        item.attr(circle);
        item.set('actived', false);
      }
    },
    //获取当前定位的点
    getTrackingInfo: function () {
      var _self = this, activedCircle = _self.getActived();
      return activedCircle && activedCircle.get('point');
    },
    /**
     * @protected
     * 是否激活
     * @param {Chart.Actived} item 可以被激活的元素
     * @return {Chart.Actived[]} 可以被激活的元素集合
     */
    isItemActived: function (item) {
      return item.get('actived');
    },
    //添加冒泡
    addBubble: function (point) {
      var _self = this, circle = _self.get('circle'), r = 5,
        //默认5
        radius, radiusField = _self.get('radiusField'), cfg = Util.mix({}, circle), shape;
      if (point.obj) {
        r = point.obj[radiusField];
      }
      if (point.arr) {
        r = point.arr[2];
        if (r == null) {
          r = point.arr[1];
        }
      }
      radius = _self._getRadius(r);
      cfg.cx = point.x;
      cfg.cy = point.y;
      if (_self.get('animate') && Util.svg) {
        cfg.r = 0;
        shape = _self.get('group').addShape('circle', cfg);
        shape.animate({ r: radius }, _self.get('duration'));
      } else {
        cfg.r = radius;
        shape = _self.get('group').addShape('circle', cfg);
      }
      if (_self.get('labels')) {
        _self.addLabel(point.value, point);
      }
      shape.set('point', point);
    },
    _getRadius: function (r) {
      var _self = this, radiusFormatter = _self.get('radiusFormatter');
      if (radiusFormatter) {
        return radiusFormatter(r);
      }
      return r;
    },
    //鼠标hover
    bindMouseOver: function () {
      var _self = this;
      _self.get('group').on('mouseover', function (ev) {
        var target = ev.target, shape = target.shape;
        _self.setItemActived(shape, true);
      });
    },
    //鼠标hover
    bindMouseOut: function () {
      var _self = this;
      _self.get('group').on('mouseout', function (ev) {
        var target = ev.target, shape = target.shape;
        _self.setItemActived(shape, false);
      });
    }
  });
  exports = Bubble;
  return exports;
}();
achart_series_other_104_src_scatter_debug = function (exports) {
  /**
   * @fileOverview 散列图,用于标示点的分步
   * @ignore
   */
  var Util = achart_util_110_index_debug, Cartesian = achart_series_107_index_debug.Cartesian, ActiveGroup = achart_actived_102_index_debug.Group;
  function trySet(obj, name, value) {
    if (obj && !obj[name]) {
      obj[name] = value;
    }
  }
  /**
   * @class Chart.Series.Scatter
   * 散点图序列
   * @extends Chart.Series.Cartesian
   */
  var Scatter = function (cfg) {
    Scatter.superclass.constructor.call(this, cfg);
  };
  Scatter.ATTRS = {
    elCls: 'x-chart-scatter',
    stickyTracking: false,
    autoPaint: false,
    /**
     * 生成时不执行动画
     * @type {Object}
     */
    animate: false,
    legendType: null
  };
  Util.extend(Scatter, Cartesian);
  Util.augment(Scatter, {
    /**
     * @protected
     * 处理颜色
     */
    processColor: function () {
      var _self = this, color = _self.get('color');
      if (color) {
        var markers = _self.get('markers');
        if (markers) {
          trySet(markers.marker, 'stroke', color);
          trySet(markers.marker, 'fill', color);
        }
      }
    },
    //绘制点
    draw: function (points) {
      var _self = this;
      Util.each(points, function (point) {
        _self.addMarker(point);
      });
    },
    //鼠标hover
    bindMouseOver: function () {
      var _self = this, markersGroup = _self.get('markersGroup');
      if (markersGroup) {
        markersGroup.on('mouseover', function (ev) {
          var target = ev.target, shape = target.shape;
          if (shape) {
            markersGroup.setActivedItem(shape);
          }
        });
      }
    },
    //获取当前定位的点
    getTrackingInfo: function () {
      var _self = this, markersGroup = _self.get('markersGroup'), activeMarker, rst, point;
      if (markersGroup) {
        activeMarker = markersGroup.getActived();
        if (activeMarker) {
          rst = activeMarker.get('point');
        }
      }
      return rst;
    },
    //鼠标移出
    bindMouseOut: function () {
      var _self = this, markersGroup = _self.get('markersGroup');
      if (markersGroup) {
        markersGroup.on('mouseout', function (ev) {
          var target = ev.target, shape = target.shape;
          if (shape) {
            markersGroup.clearActivedItem(shape);
          }
        });
      }
    }
  });
  exports = Scatter;
  return exports;
}();
achart_series_other_104_src_flag_debug = function (exports) {
  /*
   *
   * @line图的tag
   *
   * */
  var Cartesian = achart_series_107_index_debug.Cartesian, Flags = achart_flags_101_index_debug, Util = achart_util_110_index_debug;
  /**
   * @class Chart.Series.Flag
   * 图列上面的标识
   * @extends Chart.Series.Cartesian
   */
  function Flag(cfg) {
    Flag.superclass.constructor.call(this, cfg);
  }
  Util.extend(Flag, Cartesian);
  Flag.ATTRS = {
    type: 'flag',
    elCls: 'x-chart-flag-series',
    /**
     * flag 配置项
     * @type {Object}
     */
    flags: null,
    /**
     * 标记的series的Id
     * @type {String}
     */
    onSeries: null,
    zIndex: 6
  };
  Util.augment(Flag, {
    /**
     *  @private
     *  重写获取point函数
     */
    _getPoints: function () {
      var _self = this, data = _self.get('data'), xField = _self.get('xField'), yField = _self.get('yField'), onSeries = _self.get('onSeries') || '', parent = _self.get('parent'), series = parent.find(onSeries), flagAttrs = _self.get('flag'), lineAttrs = _self.get('line'), xAxis = _self.get('xAxis'), yAxis = _self.get('yAxis'), points = [];
      cfg = Util.mix({}, flagAttrs, lineAttrs);
      Util.each(data, function (item, index) {
        var point, sameNum = 0;
        if (Util.isObject(item)) {
          var xValue = item[xField];
          //不存在落点线条 则落到坐标轴上面
          if (!series || !series.get('visible')) {
            var _x = xAxis.getOffset(xValue), _y = yAxis.getStartOffset();
            point = {
              x: _x,
              y: _y,
              xValue: xValue
            };
          } else {
            point = series.findPointByValue(xValue);
          }
          if (!point)
            return true;
          //若存在坐标轴一样的flag  往上堆叠
          Util.each(data, function (newItem, newIndex) {
            if (newIndex < index && item[xField] == newItem[xField]) {
              sameNum++;
            }
          });
          point = Util.mix({}, point, {
            y: point.y,
            index: sameNum
          });
          item.tooltip = item.flag && item.flag.text ? item.flag.text : _self.get('flags').flag.text;
          point.obj = item;
        }
        _self.processPoint(point, index);
        points.push(point);
      });
      return points;
    },
    /**
     *  @private
     *  重写legend导致的画面变动
     */
    changeShapes: function (points, animate) {
      var _self = this, flagAttrs = _self.get('flag'), lineAttrs = _self.get('line'), cfg = Util.mix({}, flagAttrs, lineAttrs), flagGroup = _self.get('flagGroup');
      animate = animate || _self.get('animate');
      points = points || this._getPoints();
      var newItems = [];
      Util.each(points, function (item, index) {
        var cfg = _self.__getShapeCfg(item, index);
        newItems.push(cfg);
        flagGroup.changeStackCfg(index, cfg);
      });
      flagGroup.change(newItems, animate);
    },
    /**
     * 获取提示信息
     * @return {*} 返回显示在上面的文本
     */
    getTipInfo: function (point) {
      return point.obj.tooltip ? point.obj.tooltip : point.value;
    },
    //根据points画出标记
    draw: function (points, callback) {
      var _self = this, animate = _self.get('animate'), duration = _self.get('duration');
      //添加Flags
      _self.set('flagGroup', _self.addGroup(Flags, _self.get('flags')));
      if (!animate) {
        Util.each(points, function (item, index) {
          _self._drawShape(item, index);
        });
        _after();
      } else {
        var onSeries = _self.get('onSeries'), parent = _self.get('parent');
        var seriesPoints = _self._getPoints();
        var cur = 0, sub = [], count = seriesPoints.length;
        //动画生成线和对应的点
        Util.animStep(duration, function (factor) {
          var pre = cur;
          cur = parseInt(factor * count, 10);
          if (cur > count - 1) {
            cur = count - 1;
          }
          if (cur != pre) {
            sub = points.slice(0, cur + 1);
            for (var i = pre; i < cur; i++) {
              _findFlagToDraw(seriesPoints[i]);
            }
          }
          if (factor == 1) {
            _findFlagToDraw(seriesPoints[cur]);
          }
        }, _after);
      }
      function _after() {
        callback && callback();
      }
      function _findFlagToDraw(currPoint) {
        Util.each(points, function (item, index) {
          if (item.x == currPoint.x && !item.isDraw) {
            _self._drawShape(item, index);
            item.isDraw = true;
          }
        });
      }
    },
    /**
     *  @private
     *  根据点绘制
     */
    _drawShape: function (point, index) {
      var _self = this, flagGroup = _self.get('flagGroup');
      var cfg = _self.__getShapeCfg(point, index);
      var flag = flagGroup.addFlag(cfg);
      return flag;
    },
    __getShapeCfg: function (point, index) {
      var _self = this, data = _self.get('data'), flagGroup = _self.get('flagGroup'), flagCfg = _self.get('flags');
      flagCfg.flag.point = point;
      var cfg = Util.mix({}, {}, { point: point });
      //合并data内容到cfg
      if (data && data[index] && data[index].flag) {
        Util.mix(cfg, data[index].flag);
      }
      //向上堆叠
      if (point.index > 0) {
        Util.each(flagGroup.get('children'), function (item, index) {
          var lastPoint = item.get('point');
          if (lastPoint.x == point.x && lastPoint.index + 1 == point.index) {
            var newY = cfg.distance || item.get('distance') <= 0 ? item.get('topY') : item.get('bottomY');
            if (newY) {
              cfg.point.y = newY;
            }
          }
        });
      }
      return cfg;
    }
  });
  exports = Flag;
  return exports;
}();
acharts_1018_src_seriesgroup_debug = function (exports) {
  var Util = achart_util_110_index_debug, ActivedGroup = achart_actived_102_index_debug.Group, PlotItem = achart_plot_111_index_debug.Item, Legend = achart_legend_103_index_debug, Tooltip = achart_tooltip_104_index_debug, Axis = achart_axis_113_index_debug, Series = achart_series_107_index_debug;
  function min(x, y) {
    return x > y ? y : x;
  }
  function max(x, y) {
    return x > y ? x : y;
  }
  function Group(cfg) {
    Group.superclass.constructor.call(this, cfg);
  }
  Group.ATTRS = {
    elCls: 'x-chart-series-group',
    zIndex: 5,
    plotRange: null,
    colors: [
      '#2f7ed8',
      '#0d233a',
      '#8bbc21',
      '#910000',
      '#1aadce',
      '#492970',
      '#f28f43',
      '#77a1e5',
      '#c42525',
      '#a6c96a'
    ],
    symbols: [
      'circle',
      'diamond',
      'square',
      'triangle',
      'triangle-down'
    ],
    seriesOptions: {},
    yTickCounts: [
      3,
      5
    ],
    xTickCounts: [
      5,
      10
    ],
    series: null,
    legend: null,
    xAxis: null,
    yAxis: null,
    tooltip: null,
    stackedData: null,
    data: null,
    itemName: 'series'
  };
  Util.extend(Group, PlotItem);
  Util.mixin(Group, [
    ActivedGroup,
    Legend.UseLegend
  ]);
  Util.augment(Group, {
    renderUI: function () {
      var _self = this;
      Group.superclass.renderUI.call(_self);
      _self._renderSeries();
      _self._renderAxis();
      _self._addSeriesAxis();
      _self._paintAxis(_self.get('xAxis'), 'xAxis');
      _self._paintAxis(_self.get('yAxis'), 'yAxis');
      _self._paintSeries();
      _self.renderLegend();
      _self._renderTooltip();
    },
    bindUI: function () {
      var _self = this;
      Group.superclass.bindUI.call(_self);
      _self.bindCanvasEvent();
      _self.bindChartEvent();
    },
    bindCanvasEvent: function () {
      var _self = this, tipGroup = _self.get('tipGroup'), triggerEvent = tipGroup ? tipGroup.get('triggerEvent') : '', canvas = _self.get('canvas');
      if (triggerEvent == 'click') {
        function __documentClick(ev) {
          if (!Util.contains(canvas.get('node'), ev.target) && canvas.get('node') != ev.target) {
            _self.onTriggerOut(ev);
            Util.removeEvent(document, 'click', __documentClick);
          }
        }
        canvas.on('click', function (ev) {
          _self.onCanvasMove(ev);
          setTimeout(function () {
            Util.removeEvent(document, 'click', __documentClick);
            Util.addEvent(document, 'click', __documentClick);
          });
        });
      } else {
        canvas.on('mousemove', Util.wrapBehavior(_self, 'onCanvasMove'));
        canvas.on('mouseout', Util.wrapBehavior(_self, 'onMouseOut'));
      }
    },
    bindChartEvent: function () {
      var _self = this, canvas = _self.get('canvas');
      function fireChartEvent(name, ev) {
        var point = canvas.getPoint(ev.clientX, ev.clientY), info = _self.getPointInfo(point, ev);
        _self.fireUp(name, info);
      }
      canvas.on('click', function (ev) {
        var point = canvas.getPoint(ev.clientX, ev.clientY);
        if (_self._isInAxis(point)) {
          var info = _self.getPointInfo(point, ev);
          _self.fireUp('plotclick', info);
        }
      });
      canvas.on('mousemove', function (ev) {
        var point = canvas.getPoint(ev.clientX, ev.clientY), isOver = _self.get('isOver');
        if (_self._isInAxis(point)) {
          var info = _self.getPointInfo(point, ev);
          _self.fireUp('plotmove', info);
          if (!isOver) {
            _self.fireUp('plotover', info);
            _self.set('isOver', true);
          }
        } else if (isOver) {
          _self.fireUp('plotout');
          _self.set('isOver', false);
        }
      });
      canvas.on('mouseout', function (ev) {
      });
    },
    getPointInfo: function (point, ev) {
      var _self = this, shape = ev.target.shape;
      return Util.mix({ shape: shape }, point);
    },
    onCanvasMove: function (ev) {
      var _self = this, canvas = _self.get('canvas'), tipGroup = _self.get('tipGroup'), point, tipInfo;
      if (!tipGroup) {
        return;
      }
      point = canvas.getPoint(ev.clientX, ev.clientY);
      if (_self._isInAxis(point)) {
        _self._processTracking(point, tipGroup);
      } else {
        _self.onMouseOut();
      }
    },
    onTriggerOut: function (ev) {
      var _self = this, tipGroup = _self.get('tipGroup');
      _self.clearActivedItem();
      if (tipGroup && tipGroup.get('visible')) {
        if (tipGroup.get('shared')) {
          Util.each(_self.getVisibleSeries(), function (series) {
            var markers = series.get('markersGroup');
            markers && markers.clearActivedItem();
            series.clearActivedItem && series.clearActivedItem();
          });
        }
        _self._hideTip();
      }
    },
    onMouseOut: function (ev) {
      var _self = this;
      var canvasNode = _self.get('canvas').get('node');
      if (ev && !Util.contains(canvasNode, ev.toElement)) {
        _self.onTriggerOut(ev);
      }
      if (ev && (Util.contains(canvasNode, ev.target) || canvasNode === ev.target)) {
        return;
      }
      _self.onTriggerOut(ev);
    },
    getSeries: function () {
      return this.get('children');
    },
    _processTracking: function (point, tipGroup) {
      var _self = this, sArray = [], tipInfo;
      if (!tipGroup.get('shared')) {
        var activedItem = _self.getActived();
        activedItem && sArray.push(activedItem);
      } else {
        sArray = _self.getSeries();
      }
      Util.each(sArray, function (series) {
        if (series && series.get('stickyTracking') && series.get('visible')) {
          series.onStickyTracking({ point: point });
        }
      });
      if (sArray.length) {
        tipInfo = _self._getTipInfo(sArray, point);
        if (tipInfo.items.length) {
          _self._showTooltip(tipInfo.title, tipInfo.point, tipInfo.items);
        }
      }
    },
    _getTipInfo: function (sArray, point) {
      var rst = {
          items: [],
          point: {}
        };
      var count = 0, renderer = this.get('tipGroup') && this.get('tipGroup').get('pointRenderer');
      Util.each(sArray, function (series, index) {
        var info = series.getTrackingInfo(point), item = {}, title, invert = series.get('invert'), xName = invert ? 'y' : 'x', yName = invert ? 'x' : 'y';
        if (info) {
          if (series.get('visible')) {
            var markersGroup = series.get('markersGroup');
            if (info.value != null) {
              var formatter = renderer;
              if (series.get('pointRenderer')) {
                formatter = series.get('pointRenderer');
              }
              count = count + 1;
              var tipInfo = series.getTipInfo(info);
              if (Util.isObject(tipInfo)) {
                rst.items.push(tipInfo);
              } else if (Util.isArray(tipInfo) && Util.isObject(tipInfo[0])) {
                rst.items = rst.items.concat(tipInfo);
              } else {
                item.name = series.get('name');
                item.value = formatter ? formatter(info, series) : tipInfo;
                item.color = info.color || series.get('color');
                item.suffix = series.get('suffix');
                rst.items.push(item);
              }
              if (markersGroup && markersGroup.get('single')) {
                markersGroup.show();
                var marker = markersGroup.getChildAt(0);
                marker && marker.attr({
                  x: info.x,
                  y: info.y
                });
              }
            } else {
              if (markersGroup && markersGroup.get('single')) {
                markersGroup.hide();
              }
            }
          }
          if (series.get('xAxis')) {
            title = series.get('xAxis').formatPoint(info.xValue);
          } else {
            title = info.xValue;
          }
          if (count == 1) {
            rst.title = title;
            rst.point.name = info.name;
            if (info[xName]) {
              rst.point[xName] = info[xName];
              if (sArray.length == 1) {
                rst.point[yName] = info[yName];
              } else {
                rst.point[yName] = point[yName];
              }
            } else {
              rst.point[xName] = point[xName];
              rst.point[yName] = point[yName];
            }
          }
        }
      });
      return rst;
    },
    _showTooltip: function (title, point, items) {
      var _self = this, tooltip = _self.get('tipGroup'), prePoint = _self.get('prePoint');
      if (!prePoint || (prePoint.x != point.x || prePoint.y != point.y) || point.name != prePoint.name) {
        tooltip.setPosition(point.x, point.y);
        _self.set('prePoint', point);
        if (!tooltip.get('visible')) {
          tooltip.show();
        }
        tooltip.setTitle(title);
        tooltip.setItems(items);
      }
    },
    _hideTip: function () {
      var _self = this, tipGroup = _self.get('tipGroup');
      if (tipGroup && tipGroup.get('visible')) {
        tipGroup.hide();
        _self.set('prePoint', null);
      }
    },
    _isInAxis: function (point) {
      var _self = this, plotRange = _self.get('plotRange');
      return plotRange.isInRange(point);
    },
    _renderSeries: function () {
      var _self = this, series = _self.get('series');
      Util.each(series, function (item, index) {
        _self.addSeries(item, index);
      });
    },
    getLengendItems: function () {
      var _self = this, series = _self.getSeries(), items = [];
      Util.each(series, function (item) {
        var markers = item.get('markers');
        var symbol = markers && markers.marker.symbol;
        var visible = item.get('visible');
        var item = {
            name: item.get('name'),
            color: item.get('color'),
            type: item.get('legendType'),
            symbol: symbol,
            item: item,
            checked: visible
          };
        items.push(item);
      });
      return items;
    },
    _renderTooltip: function () {
      var _self = this, tooltip = _self.get('tooltip'), tipGroup;
      if (tooltip) {
        tooltip.plotRange = _self.get('plotRange');
        tipGroup = _self.get('parent').addGroup(Tooltip, tooltip);
        _self.set('tipGroup', tipGroup);
      }
    },
    _renderAxis: function () {
      var _self = this, xAxis = _self.get('xAxis'), yAxis = _self.get('yAxis');
      if (xAxis && !xAxis.isGroup) {
        xAxis = _self._createAxis(xAxis);
        _self.set('xAxis', xAxis);
      }
      if (Util.isArray(yAxis) && !yAxis[0].isGroup) {
        var temp = [];
        Util.each(yAxis, function (item) {
          temp.push(_self._createAxis(item));
          _self.set('yAxis', temp);
        });
      } else if (yAxis && !yAxis.isGroup) {
        if (xAxis && xAxis.get('type') == 'circle') {
          yAxis.type = 'radius';
          yAxis.circle = xAxis;
        }
        yAxis = _self._createAxis(yAxis);
        _self.set('yAxis', yAxis);
      }
    },
    _createAxis: function (axis) {
      var _self = this, type = axis.type, C, name;
      if (!type && axis.categories) {
        type = 'category';
      }
      if (type == 'category' || type == 'timeCategory') {
        if (!axis.categories) {
          axis.autoTicks = true;
        }
      } else if (!axis.ticks && type != 'circle') {
        axis.autoTicks = true;
      }
      axis.plotRange = _self.get('plotRange');
      axis.autoPaint = false;
      type = type || 'number';
      name = Util.ucfirst(type);
      C = Axis[name];
      if (C) {
        return _self.get('parent').addGroup(C, axis);
      }
      return null;
    },
    _caculateAxisInfo: function (axis, name) {
      if (axis.get('type') == 'category') {
        return this._caculateCategories(axis, name);
      }
      var _self = this, data = [], type = axis.get('type'), length = axis.getLength(), stackType, series, min, max, interval, tickCounts = (name == 'xAxis' ? _self.get('xTickCounts') : _self.get('yTickCounts')) || [], autoUtil, rst;
      if (type == 'number' || type == 'radius') {
        min = axis.getCfgAttr('min');
        max = axis.getCfgAttr('max');
        autoUtil = Axis.Auto;
      } else if (type == 'time') {
        var startDate = axis.get('startDate'), endDate = axis.get('endDate');
        if (startDate) {
          min = startDate.getTime();
        }
        if (endDate) {
          max = endDate.getTime();
        }
        autoUtil = Axis.Auto.Time;
      } else if (type == 'timeCategory') {
        autoUtil = Axis.Auto.TimeCategory;
      }
      interval = axis.getCfgAttr('tickInterval');
      series = _self._getRelativeSeries(axis, name);
      var cfg = {
          min: min,
          max: max,
          minCount: tickCounts[0],
          maxCount: tickCounts[1],
          interval: interval
        };
      if (name == 'yAxis' && series.length) {
        stackType = series[0].get('stackType');
      }
      if (stackType && stackType != 'none') {
        data = _self.getStackedData(axis, name);
      } else {
        data = _self.getSeriesData(axis, name);
      }
      if (data.length) {
        cfg.data = data;
        rst = autoUtil.caculate(cfg, stackType);
      } else {
        rst = { ticks: [] };
      }
      return rst;
    },
    _caculateCategories: function (axis, name) {
      var _self = this, data = _self.getSeriesData(axis, name), categories = [];
      if (data.length) {
        categories = categories.concat(data[0]);
      }
      if (data.length > 1 && !_self.get('data')) {
        for (var i = 1; i < data.length; i++) {
          var arr = data[i];
          Util.each(arr, function (value) {
            if (Util.indexOf(categories, value) == -1) {
              categories.push(value);
            }
          });
        }
      }
      return { categories: categories };
    },
    getSeriesData: function (axis, name, stacked) {
      var _self = this, data = [], series = _self._getRelativeSeries(axis, name);
      axis = axis || _self.get('yAxis');
      name = name || 'yAxis';
      Util.each(series, function (item) {
        if (name == 'xAxis' || stacked && item.isStacked && item.isStacked() || !stacked && (!item.isStacked || !item.isStacked())) {
          if (item.get(name) == axis) {
            var arr = item.getData(name);
            if (arr.length) {
              data.push(arr);
            }
          }
        }
      });
      return data;
    },
    _parseData: function (obj, fields) {
      var rst = [];
      Util.each(fields, function (key) {
        rst.push(obj[key]);
      });
      return rst;
    },
    getStackedData: function (axis, name) {
      var _self = this, data, first;
      stackedData = _self.get('stackedData'), rst = [], arr = [];
      if (stackedData) {
        arr = stackedData;
      } else {
        data = _self.getSeriesData(axis, name, true);
        first = data[0], min = Math.min.apply(null, first);
        Util.each(first, function (value, index) {
          var temp = value;
          for (var i = 1; i < data.length; i++) {
            var val = data[i][index];
            temp += val;
            if (min == null || val < min) {
              min = val;
            }
          }
          arr.push(temp);
        });
        arr.push(min);
        _self.set('stackedData', arr);
      }
      var otherData = _self.getSeriesData(axis, name, false);
      if (otherData.length) {
        rst.push(arr);
        rst = rst.concat(otherData);
      } else {
        rst = arr;
      }
      return rst;
    },
    _paintAxis: function (axis, name) {
      var _self = this, arr;
      if (Util.isArray(axis)) {
        arr = axis;
      } else {
        arr = [axis];
      }
      Util.each(arr, function (item, index) {
        if (_self._hasRelativeSeries(item, name)) {
          if (item.get('autoTicks')) {
            var info = _self._caculateAxisInfo(item, name);
            item.changeInfo(info);
          }
          item.paint();
        }
      });
    },
    _getRelativeSeries: function (axis, name) {
      var _self = this, series = _self.getVisibleSeries(), rst = [];
      Util.each(series, function (item) {
        if (item.get(name) == axis) {
          rst.push(item);
        }
      });
      return rst;
    },
    _hasRelativeSeries: function (axis, name) {
      var _self = this, series = _self.getVisibleSeries(), rst = false;
      Util.each(series, function (item) {
        if (item.get(name) == axis) {
          rst = true;
          return false;
        }
      });
      return rst;
    },
    _resetAxis: function (axis, type) {
      if (!axis.get('autoTicks')) {
        if (axis.isRangeChange()) {
          axis.change({ ticks: axis.get('ticks') });
        }
        return;
      }
      type = type || 'yAxis';
      this.set('stackedData', null);
      var _self = this, info = _self._caculateAxisInfo(axis, type);
      axis.change(info);
    },
    _resetSeries: function () {
      var _self = this, series = _self.getSeries();
      Util.each(series, function (item) {
        if (item.get('visible')) {
          item.repaint();
        }
      });
    },
    repaint: function () {
      var _self = this, legendGroup = _self.get('legendGroup'), xAxis = _self.get('xAxis'), yAxis = _self.get('yAxis');
      xAxis && _self._resetAxis(xAxis, 'xAxis');
      if (yAxis) {
        if (Util.isArray(yAxis)) {
          Util.each(yAxis, function (axis) {
            _self._resetAxis(axis, 'yAxis');
          });
        } else {
          _self._resetAxis(yAxis, 'yAxis');
        }
      }
      _self._resetSeries();
      if (legendGroup) {
        legendGroup.resetPosition();
      }
    },
    changeData: function (data) {
      var _self = this, series = _self.getSeries(), fields = _self.get('fields');
      _self.set('data', data);
      Util.each(series, function (item, index) {
        if (fields) {
          var arr = _self._getSeriesData(item.get('name'), index);
          item.changeData(arr);
        } else {
          if (Util.isArray(data[0])) {
            item.changeData(data[index]);
          } else {
            item.changeData(data);
          }
        }
      });
      _self.repaint();
    },
    _getSeriesData: function (name, index) {
      var _self = this, data = _self.get('data'), fields = _self.get('fields'), obj = data[index];
      if (name) {
        Util.each(data, function (item) {
          if (item.name == name) {
            obj = item;
            return false;
          }
        });
      }
      return _self._parseData(obj, fields);
    },
    _getDefaultType: function () {
      var _self = this, seriesCfg = _self.get('seriesOptions'), rst = 'line';
      Util.each(seriesCfg, function (v, k) {
        rst = k.replace('Cfg', '');
        return false;
      });
      return rst;
    },
    getVisibleSeries: function () {
      var _self = this, series = _self.getSeries();
      return Util.filter(series, function (item) {
        return item.get('visible');
      });
    },
    addSeries: function (item, index) {
      var _self = this, type = item.type || _self._getDefaultType(), cons = _self._getSeriesClass(type), cfg = _self._getSeriesCfg(type, item, index), series;
      cfg.autoPaint = cfg.autoPaint || false;
      series = _self.addGroup(cons, cfg);
      return series;
    },
    _paintSeries: function () {
      var _self = this, series = _self.getSeries();
      Util.each(series, function (item) {
        item.paint();
      });
    },
    _addSeriesAxis: function () {
      var _self = this, series = _self.getSeries();
      Util.each(series, function (item) {
        if (!(item instanceof Series.Cartesian)) {
          return true;
        }
        if (!item.get('xAxis')) {
          item.set('xAxis', _self.get('xAxis'));
        }
        var yAxis = _self.get('yAxis');
        if (item.get('yAxis') == null) {
          if (Util.isArray(yAxis)) {
            item.set('yAxis', yAxis[0]);
          } else {
            item.set('yAxis', yAxis);
          }
        }
        if (Util.isNumber(item.get('yAxis'))) {
          item.set('yAxis', yAxis[item.get('yAxis')]);
        }
      });
    },
    showChild: function (series) {
      var _self = this, yAxis = series.get('yAxis');
      if (!series.get('visible')) {
        series.show();
        if (yAxis) {
          _self._resetAxis(yAxis);
          _self._resetSeries();
        }
      }
    },
    hideChild: function (series) {
      var _self = this, yAxis = series.get('yAxis');
      if (series.get('visible')) {
        series.hide();
        if (yAxis) {
          _self._resetAxis(yAxis);
          _self._resetSeries();
        }
      }
    },
    _getSeriesCfg: function (type, item, index) {
      var _self = this, seriesCfg = _self.get('seriesOptions'), colors = _self.get('colors'), data = _self.get('data'), fields = _self.get('fields'), symbols = _self.get('symbols');
      item = Util.mix(true, {}, seriesCfg[type + 'Cfg'], item);
      item.invert = _self.get('invert');
      if (!item.color && colors.length) {
        item.color = colors[index % colors.length];
      }
      if (item.markers && item.markers.marker && !item.markers.marker.symbol) {
        item.markers.marker.symbol = symbols[index % symbols.length];
      }
      if (data && !item.data) {
        if (fields) {
          item.data = _self._getSeriesData(item.name, index);
        } else {
          item.data = data;
        }
      }
      return item;
    },
    _getSeriesClass: function (type) {
      var name = Util.ucfirst(type), c = Series[name] || Series;
      return c;
    },
    remove: function () {
      var _self = this, canvas = _self.get('canvas');
      canvas.off('mousemove', Util.getWrapBehavior(_self, 'onCanvasMove'));
      canvas.off('mouseout', Util.getWrapBehavior(_self, 'onMouseOut'));
      Group.superclass.remove.call(_self);
    }
  });
  exports = Group;
  return exports;
}();
achart_arearange_102_index_debug = function (exports) {
  var Arearange = achart_arearange_102_src_arearange_debug;
  exports = Arearange;
  return exports;
}();
achart_series_other_104_index_debug = function (exports) {
  var Series = achart_series_107_index_debug;
  Series.Bubble = achart_series_other_104_src_bubble_debug;
  Series.Scatter = achart_series_other_104_src_scatter_debug;
  Series.Flag = achart_series_other_104_src_flag_debug;
  exports = Series;
  return exports;
}();
acharts_1018_src_chart_debug = function (exports) {
  var Util = achart_util_110_index_debug, Canvas = achart_canvas_112_index_debug, PlotBack = achart_plot_111_index_debug.Back, SeriesGroup = acharts_1018_src_seriesgroup_debug, Theme = achart_theme_101_index_debug;
  var Chart = function (cfg) {
    this._attrs = Util.mix({}, Chart.ATTRS, cfg);
    this.events = {};
  };
  Chart.ATTRS = {
    canvas: undefined,
    colors: undefined,
    data: undefined,
    yTickCounts: undefined,
    xTickCounts: undefined,
    width: null,
    height: null,
    legend: undefined,
    plotCfg: undefined,
    plotRange: undefined,
    series: undefined,
    invert: false,
    seriesOptions: undefined,
    subTitle: undefined,
    title: undefined,
    tooltip: undefined,
    xAxis: undefined,
    yAxis: undefined,
    forceFit: false,
    fitRatio: 0,
    fields: undefined,
    theme: Theme.SmoothBase
  };
  Util.augment(Chart, {
    get: function (name) {
      return this._attrs[name];
    },
    set: function (name, value) {
      this._attrs[name] = value;
      return this;
    },
    render: function () {
      var _self = this;
      if (!_self.get('id')) {
        throw 'You must assign id for the chart!';
      }
      _self.paint();
    },
    clear: function () {
      var _self = this, canvas = _self.get('canvas');
      canvas.destroy();
      _self.set('isPaint', false);
    },
    paint: function () {
      var _self = this;
      if (!_self.get('isPaint')) {
        _self._renderCanvas();
        _self._renderPlot();
        _self._renderTitle();
        _self._renderSeries();
        _self.get('canvas').sort();
        if (_self.get('forceFit')) {
          _self.bindFitEvent();
        }
      }
    },
    _getFitInfo: function () {
      var _self = this, el = _self.get('el'), fitRatio = _self.get('fitRatio'), width = Util.getWidth(el), height = _self.get('height') || Util.getHeight(el);
      if (fitRatio) {
        height = width * fitRatio;
      }
      return {
        width: width,
        height: height
      };
    },
    forceFit: function () {
      var _self = this, plotBack = _self.get('plotBack'), canvas = _self.get('canvas'), fitInfo = _self._getFitInfo(), seriesGroup = _self.get('seriesGroup');
      canvas.setSize(fitInfo.width, fitInfo.height);
      plotBack.repaint();
      _self._renderTitle();
      seriesGroup.repaint();
    },
    _renderCanvas: function () {
      var _self = this, id = _self.get('id') || _self.get('render') || '';
      id = id.replace('#', '');
      var el = document.getElementById(id), width, height, canvas;
      _self.set('el', el);
      if (_self.get('forceFit')) {
        var info = _self._getFitInfo();
        width = info.width;
        height = info.height;
      } else {
        width = _self.get('width') || Util.getWidth(el);
        height = _self.get('height') || Util.getHeight(el);
      }
      canvas = new Canvas({
        width: width,
        height: height,
        id: id
      });
      canvas.chart = _self;
      _self.set('canvas', canvas);
    },
    _renderPlot: function () {
      var _self = this, plotCfg = _self.get('plotCfg'), canvas = _self.get('canvas'), theme = _self.get('theme'), plotBack, plotRange;
      plotCfg = Util.mix({}, theme.plotCfg, plotCfg);
      plotBack = canvas.addGroup(PlotBack, plotCfg), plotRange = plotBack.get('plotRange');
      _self.set('plotBack', plotBack);
      _self.set('plotRange', plotRange);
    },
    _renderTitle: function (force) {
      var _self = this, title = _self.get('title'), subTitle = _self.get('subTitle'), theme = _self.get('theme'), canvas = _self.get('canvas'), tcfg = {}, scfg = {};
      if (title) {
        var titleShape = _self.get('titleShape');
        if (title.x == null) {
          tcfg.x = canvas.get('width') / 2;
          tcfg.y = title.y || 15;
        }
        if (!titleShape) {
          tcfg = Util.mix(tcfg, theme.title, title);
          titleShape = canvas.addShape('label', tcfg);
          _self.set('titleShape', titleShape);
        } else {
          titleShape.attr(tcfg);
        }
      }
      if (subTitle) {
        var subTitleShape = _self.get('subTitleShape');
        if (subTitle.x == null) {
          scfg.x = canvas.get('width') / 2;
          scfg.y = subTitle.y || 35;
        }
        if (!subTitleShape) {
          scfg = Util.mix(scfg, theme.subTitle, subTitle);
          subTitleShape = canvas.addShape('label', scfg);
          _self.set('subTitleShape', subTitleShape);
        } else {
          subTitleShape.attr(scfg);
        }
      }
    },
    _getDefaultType: function () {
      var _self = this, seriesOptions = _self.get('seriesOptions'), rst = 'line';
      Util.each(seriesOptions, function (v, k) {
        rst = k.replace('Cfg', '');
        return false;
      });
      return rst;
    },
    _renderSeries: function () {
      var _self = this, theme = _self.get('theme'), cfg = {}, attrs = _self._attrs, defaultType = _self._getDefaultType(), seriesGroup;
      Util.each(attrs.series, function (item) {
        if (!item.type) {
          item.type = defaultType;
        }
      });
      Util.mix(true, cfg, theme, {
        colors: attrs.colors,
        xTickCounts: attrs.xTickCounts,
        yTickCounts: attrs.yTickCounts,
        data: attrs.data,
        invert: _self.get('invert'),
        fields: attrs.fields,
        series: attrs.series,
        seriesOptions: attrs.seriesOptions,
        tooltip: attrs.tooltip,
        legend: attrs.legend,
        xAxis: attrs.xAxis
      });
      Util.mix(cfg, { plotRange: attrs.plotRange });
      if (Util.isObject(attrs.yAxis)) {
        Util.mix(true, cfg, { yAxis: attrs.yAxis });
      } else if (Util.isArray(attrs.yAxis)) {
        Util.each(attrs.yAxis, function (axis, indexs) {
          attrs.yAxis[indexs] = Util.mix(true, {}, theme.yAxis, axis);
        });
        cfg.yAxis = attrs.yAxis;
      }
      seriesGroup = _self.get('canvas').addGroup(SeriesGroup, cfg);
      _self.set('seriesGroup', seriesGroup);
    },
    bindFitEvent: function () {
      var _self = this, delay = null;
      function resize() {
        clearTimeout(delay);
        delay = setTimeout(function () {
          _self.forceFit();
        }, 200);
      }
      Util.addEvent(window, 'resize', resize);
    },
    repaint: function () {
      var _self = this;
      _self.get('seriesGroup').repaint();
    },
    getSeries: function () {
      return this.get('seriesGroup').getSeries();
    },
    getSerieByName: function (name) {
      return this.get('seriesGroup').findBy(function (item) {
        return item.get('name') == name;
      });
    },
    getXAxis: function (name) {
      var _self = this, series;
      if (name) {
        series = _self.getSerieByName(name);
      } else {
        series = _self.getSeries()[0];
      }
      return series.get('xAxis');
    },
    getYAxis: function (name) {
      var _self = this, series;
      if (name) {
        series = _self.getSerieByName(name);
      } else {
        series = _self.getSeries()[0];
      }
      return series.get('yAxis');
    },
    changeData: function (data) {
      var _self = this, group = _self.get('seriesGroup');
      if (data !== _self.get('data')) {
        _self.set('data', data);
      }
      group.changeData(data);
    },
    on: function (eventType, fn) {
      var _self = this, events = this.events, callbacks = events[eventType];
      if (!callbacks) {
        callbacks = events[eventType] = [];
      }
      callbacks.push(fn);
      return this;
    },
    fire: function (eventType, eventObj) {
      var _self = this, events = _self.events, callbacks = events[eventType];
      if (callbacks) {
        Util.each(callbacks, function (m) {
          m(eventObj);
        });
      }
    },
    off: function (eventType, fn) {
      var _self = this, node = _self.get('node'), events = this.events, callbacks = events[eventType];
      if (!eventType) {
        this.events = {};
        return this;
      }
      if (callbacks) {
        Util.remove(callbacks, fn);
      }
      return this;
    }
  });
  exports = Chart;
  return exports;
}();
acharts_1018_acharts_debug = function (exports) {
  var acharts = acharts_1018_src_chart_debug;
  acharts.Util = achart_util_110_index_debug;
  acharts.Canvas = achart_canvas_112_index_debug;
  acharts.Plot = achart_plot_111_index_debug;
  acharts.Actived = achart_actived_102_index_debug;
  acharts.Date = achart_date_100_index_debug;
  acharts.Theme = achart_theme_101_index_debug;
  acharts.Series = achart_series_107_index_debug;
  acharts.Series.Arearange = achart_arearange_102_index_debug;
  acharts.Legend = achart_legend_103_index_debug;
  acharts.Flags = achart_flags_101_index_debug;
  acharts.Candlesticks = achart_candlesticks_101_index_debug;
  acharts.Axis = achart_axis_113_index_debug;
  acharts.Tooltip = achart_tooltip_104_index_debug;
  achart_series_other_104_index_debug;
  window.Chart = acharts;
  window.AChart = acharts;
  exports = acharts;
  return exports;
}();
}());