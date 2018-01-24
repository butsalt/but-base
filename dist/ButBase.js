(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ButBase"] = factory();
	else
		root["ButBase"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(6)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(1);
var ctx = __webpack_require__(28);
var hide = __webpack_require__(30);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(31);
var toPrimitive = __webpack_require__(32);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(35);
var enumBugKeys = __webpack_require__(20);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = noop;
function noop() {}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export is */
/* harmony export (immutable) */ __webpack_exports__["a"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["b"] = isString;
/* unused harmony export isFunction */
/* unused harmony export isNumber */
function is(val, expectType) {
  return Object.prototype.toString.call(val) === '[object ' + expectType + ']';
}

function isObject(val) {
  return is(val, 'Object');
}

function isString(val) {
  return is(val, 'String');
}

function isFunction(val) {
  return is(val, 'Function');
}

function isNumber(val) {
  return is(val, 'Number');
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(16);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(37);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(42);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typeCheck__ = __webpack_require__(13);



var dataReg = /[dD]ata/;
function merge(target, src) {
  if (target == null) {
    return src;
  }
  var srcKeys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(src);
  srcKeys.forEach(function (srcKey) {
    var srcVal = src[srcKey];
    var targetVal = target[srcKey];
    if (Object(__WEBPACK_IMPORTED_MODULE_1__typeCheck__["a" /* isObject */])(targetVal) && Object(__WEBPACK_IMPORTED_MODULE_1__typeCheck__["a" /* isObject */])(srcVal) && !dataReg.test(srcKey)) {
      merge(targetVal, srcVal);
    } else {
      target[srcKey] = srcVal;
    }
  });
  return target;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25).default;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_features__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_lang_merge__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__statics_statics__ = __webpack_require__(71);







var ButBase = function () {
  function ButBase(config) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ButBase);

    this.init(config);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ButBase, [{
    key: 'init',
    value: function init(config) {
      if (config == null) {
        config = {};
      }
      var me = this;

      me.beforeInit();

      // 初始化所有功能
      __WEBPACK_IMPORTED_MODULE_3__features_features__["b" /* init */](me);

      var initConfig = me.inited() || {};

      config = Object(__WEBPACK_IMPORTED_MODULE_4__utils_lang_merge__["a" /* default */])(initConfig, config);

      // 初始化完毕，主动调用api

      // 获取挂载点
      var el = config.el;
      delete config.el;

      // 首次设置配置
      me.config(config);

      if (el) {
        // 存在挂载点就挂载
        me.mountTo(el);
      }
    }
  }, {
    key: 'beforeInit',
    value: function beforeInit() {}
  }, {
    key: 'inited',
    value: function inited() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      var me = this;

      me.beforeDestroy();

      __WEBPACK_IMPORTED_MODULE_3__features_features__["a" /* destroy */](me);

      me.destroyed();
    }
  }, {
    key: 'beforeDestroy',
    value: function beforeDestroy() {}
  }, {
    key: 'destroyed',
    value: function destroyed() {}
  }]);

  return ButBase;
}();

/* harmony default export */ __webpack_exports__["default"] = (ButBase);


__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(ButBase.prototype, __WEBPACK_IMPORTED_MODULE_3__features_features__["c" /* proto */]);

Object(__WEBPACK_IMPORTED_MODULE_5__statics_statics__["a" /* default */])(ButBase);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(34) });


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(29);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(6)(function () {
  return Object.defineProperty(__webpack_require__(14)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(11);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(44);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(16);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(6)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(36);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(38)(false);
var IE_PROTO = __webpack_require__(19)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(40);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(47);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(2), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = init;
/* harmony export (immutable) */ __webpack_exports__["a"] = destroy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return proto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_func_noop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__disable__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storable__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__listenable__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configurable_configurable__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__templatable_templatable__ = __webpack_require__(68);










var DATA_NAMESPACE = 'featuresData';

var features = [__WEBPACK_IMPORTED_MODULE_4__disable__, __WEBPACK_IMPORTED_MODULE_5__storable__, __WEBPACK_IMPORTED_MODULE_6__listenable__, __WEBPACK_IMPORTED_MODULE_7__configurable_configurable__, __WEBPACK_IMPORTED_MODULE_8__templatable_templatable__].map(function normalizeFeature(feature) {
  feature = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, feature);
  if (!feature.proto) {
    feature.proto = {};
  }
  if (!feature.init) {
    feature.init = __WEBPACK_IMPORTED_MODULE_3__utils_func_noop__["a" /* default */];
  }
  if (!feature.destroy) {
    feature.destroy = __WEBPACK_IMPORTED_MODULE_3__utils_func_noop__["a" /* default */];
  }
  return feature;
});

function init(instance) {
  instance[DATA_NAMESPACE] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);

  features.forEach(function initFeature(feature) {
    feature.init(instance);
  });
}

function destroy(instance) {
  features.forEach(function destroyFeature(feature) {
    feature.destroy(instance);
  });

  delete instance[DATA_NAMESPACE];
}

var proto = {
  createFeatureData: function createFeatureData(key) {
    return this[DATA_NAMESPACE][key] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
  },
  getFeatureData: function getFeatureData(key) {
    return this[DATA_NAMESPACE][key];
  },
  removeFeatureData: function removeFeatureData(key) {
    var data = this[DATA_NAMESPACE][key];
    delete this[DATA_NAMESPACE][key];
    return data;
  }
};

// 混合所有feature提供的原型链上的方法
features.forEach(function mergeProto(feature) {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(proto, feature.proto);
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(53) });


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(54);
var enumBugKeys = __webpack_require__(20);
var IE_PROTO = __webpack_require__(19)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(14)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(11);

module.exports = __webpack_require__(2) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_func_noop__ = __webpack_require__(12);


var proto = {
  enable: function enable(funcName) {
    delete this[funcName];
  },
  disable: function disable(funcName) {
    this[funcName] = __WEBPACK_IMPORTED_MODULE_0__utils_func_noop__["a" /* default */];
  }
};

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["destroy"] = destroy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
var DATA_NAMESPACE = 'storable';

function init(instance) {
  instance.createFeatureData(DATA_NAMESPACE);
}

function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE);
}

var proto = {
  data: function data(key, val) {
    var me = this;
    var data = me.getFeatureData(DATA_NAMESPACE);
    if (arguments.length === 1) {
      return data[key];
    }
    data[key] = val;
    return me;
  },
  removeData: function removeData(key) {
    var me = this;
    var data = me.getFeatureData(DATA_NAMESPACE);
    var deletedVal = data[key];
    delete data[key];
    return deletedVal;
  }
};

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["destroy"] = destroy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__);

var DATA_NAMESPACE = 'listenable';

function getDataByKey(instance, key, creatable) {
  var data = instance.getFeatureData(DATA_NAMESPACE);

  var handlersMap = data.handlersMap;
  var handlers = handlersMap[key];

  var scopesMap = data.scopesMap;
  var scopes = scopesMap[key];

  if (!handlers && creatable) {
    handlers = handlersMap[key] = [];
    scopes = scopesMap[key] = [];
  }

  return {
    handlers: handlers, scopes: scopes
  };
}

function init(instance) {
  var data = instance.createFeatureData(DATA_NAMESPACE);
  data.handlersMap = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default()(null);
  data.scopesMap = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default()(null);
}

function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE);
}

var proto = {
  un: function un(key, handler) {
    var me = this;

    var _getDataByKey = getDataByKey(me, key),
        handlers = _getDataByKey.handlers,
        scopes = _getDataByKey.scopes;

    if (handlers) {
      if (handler) {
        // 要求卸载指定的handler
        var index = handlers.indexOf(handler);
        if (index !== -1) {
          handlers.splice(index, 1);
          scopes.splice(index, 1);
        }
      } else {
        // 卸载指定key的所有handler
        handlers.length = 0;
        scopes.length = 0;
      }

      if (handlers.length === 0) {
        var data = me.getFeatureData(DATA_NAMESPACE);
        // 没有正在监听的handler了，删除key对应的数据空间
        delete data.handlersMap[key];
        delete data.scopesMap[key];
      }
    }

    return me;
  },
  on: function on(key, handler, scope) {
    var me = this;
    if (!scope) {
      // 默认对象本身
      scope = me;
    }

    var _getDataByKey2 = getDataByKey(me, key, true),
        handlers = _getDataByKey2.handlers,
        scopes = _getDataByKey2.scopes;

    handlers.push(handler);
    scopes.push(scope);

    return me;
  },
  once: function once(key, handler, scope) {
    var me = this;

    me.on(key, function disposableHandler() {
      // 执行一次后就解绑
      me.un(key, disposableHandler);
      handler.apply(this, [].concat(Array.prototype.slice.call(arguments)));
    }, scope);

    return me;
  },
  fire: function fire(key, args) {
    var me = this;

    var _getDataByKey3 = getDataByKey(me, key),
        handlers = _getDataByKey3.handlers,
        scopes = _getDataByKey3.scopes;

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        var handler = handlers[i];
        handler.apply(scopes[i], args);
        if (handler.name === 'disposableHandler') {
          // disposableHandler执行后就移除，游标需要向前移一位
          i--;
        }
      }
    }
  }
};

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["destroy"] = destroy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_lang_merge__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_str_upperCaseFirstLetter__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_lang_typeCheck__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__calcDeepDepMap__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__calcDescendantMap__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__calcFullTaskMap__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__calcExecOrder__ = __webpack_require__(67);










var DATA_NAMESPACE = 'configurable';

function init(instance) {
  var data = instance.createFeatureData(DATA_NAMESPACE);
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true;
  // 默认的空配置
  data.config = {};

  // 设置更新依赖表
  var depMap = instance.getExecOrder();

  if (depMap) {
    var deepDepMap = data.depMap = Object(__WEBPACK_IMPORTED_MODULE_5__calcDeepDepMap__["a" /* default */])(depMap);
    data.descendantMap = Object(__WEBPACK_IMPORTED_MODULE_6__calcDescendantMap__["a" /* default */])(deepDepMap);
  }
}

function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE);
}

var proto = {
  config: function config(_config, silent) {
    var me = this;

    var data = me.getFeatureData(DATA_NAMESPACE);
    if (!_config) {
      return data.config;
    }

    if (silent === true) {
      me.disable('fire');
    }

    if (data.isFirstSet) {
      data.isFirstSet = false;
      _config = Object(__WEBPACK_IMPORTED_MODULE_2__utils_lang_merge__["a" /* default */])(me.getDefaultConfig(), _config);
    }
    data.config = Object(__WEBPACK_IMPORTED_MODULE_2__utils_lang_merge__["a" /* default */])(data.config, _config);

    var taskMap = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(_config).forEach(function (key) {
      taskMap['update' + Object(__WEBPACK_IMPORTED_MODULE_3__utils_str_upperCaseFirstLetter__["a" /* default */])(key)] = true;
    });
    var tasks = void 0;
    var depMap = data.depMap;
    if (depMap) {
      tasks = Object(__WEBPACK_IMPORTED_MODULE_8__calcExecOrder__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_7__calcFullTaskMap__["a" /* default */])(taskMap, data.descendantMap), depMap);
    } else {
      tasks = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(taskMap);
    }

    tasks.forEach(function (apiName) {
      if (me[apiName]) {
        me[apiName]();
      }
    });

    if (silent === true) {
      me.enable('fire');
    }

    return me;
  },
  getExecOrder: function getExecOrder() {
    return null;
  },
  getDefaultConfig: function getDefaultConfig() {
    return {};
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(1).Object.keys;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21);
var $keys = __webpack_require__(11);

__webpack_require__(62)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(1);
var fails = __webpack_require__(6);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = upperCaseFirstLetter;
function upperCaseFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calcDeepDepMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__);


function calcDeepDep(key, depMap, keyDeepDepMap) {
  var deps = depMap[key];
  if (!deps) {
    // 没有前置任务
    return keyDeepDepMap;
  }
  for (var i = 0, ii = deps.length; i < ii; i++) {
    var depKey = deps[i];
    if (keyDeepDepMap[depKey]) {
      // depKey已经是key的前置任务了，避免重复递归
      continue;
    }
    keyDeepDepMap[depKey] = true;
    calcDeepDep(depKey, depMap, keyDeepDepMap);
  }
  return keyDeepDepMap;
}

function calcDeepDepMap(depMap) {
  var map = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
  for (var key in depMap) {
    // 计算key的所有前置任务
    map[key] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(calcDeepDep(key, depMap, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null)));
  }
  return map;
}

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calcDescendantMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__);


function calcDescendantMap(depMap) {
  var map = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
  for (var key in depMap) {
    var deps = depMap[key];
    for (var i = 0, ii = deps.length; i < ii; i++) {
      var depKey = deps[i];
      var curMap = map[depKey];
      if (!curMap) {
        curMap = map[depKey] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
      }
      // 流向，depkey -> key
      curMap[key] = true;
    }
  }
  var descendantMap = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(null);
  for (var _key in map) {
    descendantMap[_key] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(map[_key]);
  }
  return descendantMap;
}

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calcFullTaskMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__);

function calcFullTaskMap(taskMap, descendantMap) {
  var fullTaskMap = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default()(null);
  for (var key in taskMap) {
    // taskMap中包含的key肯定要执行
    fullTaskMap[key] = true;
    // key之后的后置任务都要执行
    var descendants = descendantMap[key];
    if (descendants) {
      for (var i = 0, ii = descendants.length; i < ii; i++) {
        fullTaskMap[descendants[i]] = true;
      }
    }
  }
  return fullTaskMap;
}

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calcExecOrder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create__);

function calcExecOrder(originTaskMap, depMap) {
  var tasks = [];
  var taskMap = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default()(null);
  var descendantMap = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_create___default()(null);
  for (var key in originTaskMap) {
    var task = {
      key: key,
      // 前置任务数量
      count: 0
    };
    tasks.push(task);
    taskMap[key] = task;
    var deps = depMap[key];
    if (deps) {
      // 存在前置任务
      for (var i = 0, ii = deps.length; i < ii; i++) {
        var depKey = deps[i];
        if (depKey in originTaskMap) {
          // 前置任务的key存在于config中，执行task前要先执行前置任务
          task.count++;

          var descendants = descendantMap[depKey];
          if (!descendants) {
            descendants = descendantMap[depKey] = [];
          }
          descendants.push(key);
        }
      }
    }
  }

  // 执行顺序队列
  var queue = [];
  while (true) {
    for (var _i = 0, _ii = tasks.length; _i < _ii; _i++) {
      var _task = tasks[_i];
      if (_task.count === 0) {
        // 当前任务的前置任务全部处理完毕，可以执行当前任务了
        var _key = _task.key;
        queue.push(_key);
        // 从任务列表中移除
        tasks.splice(_i, 1);
        _i--;
        // 任务列表长度减1
        _ii--;
        // 所有依赖当前任务的任务的前置任务count都减1
        var _descendants = descendantMap[_key];
        if (_descendants) {
          for (var j = 0, jj = _descendants.length; j < jj; j++) {
            taskMap[_descendants[j]].count--;
          }
        }
      }
    }
    if (tasks.length === 0) {
      // 所有任务执行完毕
      break;
    }
  }
  return queue;
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["destroy"] = destroy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__unwrap__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_func_noop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom_parse__ = __webpack_require__(70);




var DATA_NAMESPACE = 'templatable';

function init(instance) {
  var data = instance.createFeatureData(DATA_NAMESPACE);

  data.el = null;

  // 解析模板成DOM
  var elStr = instance.getTemplate();
  if (elStr != null) {
    data.el = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom_parse__["a" /* default */])(elStr);
  }
}

function destroy(instance) {
  // 从文档流中卸载
  instance.unmount();

  instance.removeFeatureData(DATA_NAMESPACE);
}

var proto = {
  getTemplate: __WEBPACK_IMPORTED_MODULE_1__utils_func_noop__["a" /* default */],
  mountTo: function mountTo(container) {
    var me = this;

    var el = me.getEl();

    Object(__WEBPACK_IMPORTED_MODULE_0__unwrap__["a" /* default */])(container).appendChild(el);
  },
  unmount: function unmount() {
    var me = this;

    var el = me.getEl();
    if (!el) {
      return;
    }

    var parentEl = el.parentElement;
    if (parentEl) {
      parentEl.removeChild(el);
    }
  },
  getEl: function getEl() {
    var me = this;
    return me.getFeatureData(DATA_NAMESPACE).el;
  }
};

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = unwrap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_typeCheck__ = __webpack_require__(13);


function unwrap(el) {
  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_lang_typeCheck__["b" /* isString */])(el)) {
    // el是选择器，查找选择器对应的元素
    el = document.querySelector(el);
  }
  return el;
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
var parser = new DOMParser();

var svgTags = 'animate|circle|clippath|cursor|defs|desc|ellipse|filter|font-face|' + 'foreignObject|g|glyph|image|line|marker|mask|missing-glyph|path|pattern|' + 'polygon|polyline|rect|switch|symbol|text|textpath|tspan|use|view';
var svgTagReg = new RegExp('^<(' + svgTags + ')(\\s|>)');
function isSvgTag(str) {
  return svgTagReg.test(str);
}

function parse(str) {
  var needSvgWrapper = isSvgTag(str);
  if (needSvgWrapper) {
    // svg元素先用svg包裹，然后再取出
    str = '<svg xmlns="http://www.w3.org/2000/svg">' + str + '</svg>';
  }
  var doc = parser.parseFromString(str, 'text/html');
  var el = doc.body.firstElementChild;
  if (needSvgWrapper) {
    return el.firstElementChild;
  }
  return el;
}

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = statics;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compilable_compilable__ = __webpack_require__(72);


function statics(ButBase) {
  ButBase.version = "1.4.2";

  ButBase.use = function use(mounter) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    mounter(this, config);
  };

  [__WEBPACK_IMPORTED_MODULE_0__compilable_compilable__["a" /* default */]].forEach(function (mounter) {
    ButBase.use(mounter);
  });
}

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compilableMounter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);



function compilableMounter(ButBase) {
  ButBase.compile = compile;
}

function compile(description) {
  var ButBase = this;

  description = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, description);

  var name = description.name;
  delete description.name;
  if (!name) {
    name = 'Component';
  }

  var cls = new Function('return function ' + name + '(config) {\n      this.init(config)\n    }')();

  var proto = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_create___default()(ButBase.prototype);

  proto.constructor = cls;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(description).forEach(function (key) {
    proto[key] = description[key];
  });

  cls.prototype = proto;

  return cls;
}

/***/ })
/******/ ]);
});