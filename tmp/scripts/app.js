(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


({"..":({"controller":({"common":({"c404Ctrl":require("../controller/common/c404Ctrl.js")}),"demo":({"iconCtrl":require("../controller/demo/iconCtrl.js"),"indexCtrl":require("../controller/demo/indexCtrl.js"),"pageChange01Ctrl":require("../controller/demo/pageChange01Ctrl.js"),"pageChange02Ctrl":require("../controller/demo/pageChange02Ctrl.js"),"pageChange03Ctrl":require("../controller/demo/pageChange03Ctrl.js")}),"main":(function () {var f = require("../controller/main/index.js");f["index"]=require("../controller/main/index.js");return f;})()}),"servers":({"common":require("../servers/common.js")}),"plugin":({"backTop":require("../plugin/backTop.js"),"comment":require("../plugin/comment.js"),"dataExport":require("../plugin/dataExport.js"),"dialog":require("../plugin/dialog.js"),"flag":require("../plugin/flag.js"),"httpException":require("../plugin/httpException.js"),"loading":require("../plugin/loading.js"),"md5":require("../plugin/md5.js"),"menu":require("../plugin/menu.js"),"notifier":require("../plugin/notifier.js"),"query":require("../plugin/query.js"),"resize":require("../plugin/resize.js"),"routeAuthorize":require("../plugin/routeAuthorize.js"),"serverInject":require("../plugin/serverInject.js"),"session":require("../plugin/session.js"),"titleInject":require("../plugin/titleInject.js"),"tokenInject":require("../plugin/tokenInject.js")}),"directives":({"testZrender":require("../directives/testZrender.js")})})});

//require("../module/main.js");

module.exports={};


},{"../controller/common/c404Ctrl.js":9,"../controller/demo/iconCtrl.js":10,"../controller/demo/indexCtrl.js":11,"../controller/demo/pageChange01Ctrl.js":12,"../controller/demo/pageChange02Ctrl.js":13,"../controller/demo/pageChange03Ctrl.js":14,"../controller/main/index.js":15,"../directives/testZrender.js":16,"../plugin/backTop.js":20,"../plugin/comment.js":21,"../plugin/dataExport.js":22,"../plugin/dialog.js":23,"../plugin/flag.js":24,"../plugin/httpException.js":25,"../plugin/loading.js":26,"../plugin/md5.js":27,"../plugin/menu.js":28,"../plugin/notifier.js":29,"../plugin/query.js":30,"../plugin/resize.js":31,"../plugin/routeAuthorize.js":32,"../plugin/serverInject.js":33,"../plugin/session.js":34,"../plugin/titleInject.js":35,"../plugin/tokenInject.js":36,"../servers/common.js":37}],2:[function(require,module,exports){
(function (Buffer){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (typeof Buffer != 'undefined' &&
        typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

}).call(this,require("buffer").Buffer)
},{"buffer":5,"charenc":3,"crypt":4}],3:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],4:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],5:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  function Bar () {}
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    arr.constructor = Bar
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Bar && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":6,"ieee754":7,"isarray":8}],6:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],7:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],8:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],9:[function(require,module,exports){
var md = require("../../module/common");
md.controller("c404Ctrl", c404Ctrl);

c404Ctrl.$inject = ["$scope"];
function c404Ctrl($scope) {
	console.log("c404Ctrl");
}
},{"../../module/common":17}],10:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("demoIconCtrl", demoIconCtrl);

demoIconCtrl.$inject = ["$scope"];
function demoIconCtrl($scope) {
	console.log("demoIconCtrl");
}
},{"../../module/demo":18}],11:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("demoIndexCtrl", demoIndexCtrl);

demoIndexCtrl.$inject = ["$scope","$location"];
function demoIndexCtrl($scope,$location) {
    console.log("demoIndexCtrl");
    $scope.pageClass="dome_index"
    $scope.goTo=function(){
        $location.path("/404")
    }
}
},{"../../module/demo":18}],12:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("pageChang01Ctrl", pageChang01Ctrl);

pageChang01Ctrl.$inject = ["$scope","$location"];
function pageChang01Ctrl($scope,$location) {
    console.log("pageChang01Ctrl");
    $scope.pageClass="page_chang01";
}
},{"../../module/demo":18}],13:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("pageChang02Ctrl", pageChang02Ctrl);

pageChang02Ctrl.$inject = ["$scope","$location"];
function pageChang02Ctrl($scope,$location) {
    console.log("pageChang02Ctrl");
    $scope.pageClass="page_chang02";
}
},{"../../module/demo":18}],14:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("pageChang03Ctrl", pageChang03Ctrl);

pageChang03Ctrl.$inject = ["$scope","$location"];
function pageChang03Ctrl($scope,$location) {
    console.log("pageChang03Ctrl");
    $scope.pageClass="page_chang03";
}
},{"../../module/demo":18}],15:[function(require,module,exports){
var md = require("../../module/main");
md.controller("indexCtrl", indexCtrl);

indexCtrl.$inject = ["$scope","commonService"];
function indexCtrl($scope,commonService) {
	console.log("indexCtrl");
	commonService.classSearch.get({
			teacherId: "244445555555555"
		},
		function(datas) {
			//没有查询到年级
			console.log(datas);


		},
		function(err) {
		});
}
},{"../../module/main":19}],16:[function(require,module,exports){
var md = require("../module/common");
//最基本简单折线图在图表dome演示里有
md.directive("brokenLineChart", function () {
    var chart = "_chart_id_";
    var count = 0;
    return {
        restrict: 'A',
        replace: true,
        scope: {
            brokenLineChart: "="
        },
        link: function (scope, element) {


            count++;
            element.css({position: 'relative'});

            var child = angular.element("<div id=" + chart + count + "></div>").css({width: '100%', height: "100%"});
            element.append(child);

            var brokenLineChart = require("../../extends/chart/brokenLineChart");

            var config = {
                id: chart + count,
                data: scope.brokenLineChart,
                domain: [0, 120],
                margin: {top: 20, right: 20, bottom: 40, left: 40}
            };
            var line = new brokenLineChart(config);
            scope.$on("$destroy", function () {
                line.dispose();
            });
            scope.$on("resize", function () {
                line.dispose();
                line = new brokenLineChart(config);
            });
        }

    };
});

module.exports = md;
},{"../../extends/chart/brokenLineChart":38,"../module/common":17}],17:[function(require,module,exports){
var md=angular.module("web.common",[]);

md.config(["$routeProvider",config]);

function config(route){
    route.when("/404",{templateUrl:"./page/common/404.html",controller:"c404Ctrl",menu:"common.404"});
}

module.exports=md;
},{}],18:[function(require,module,exports){
var md=angular.module("web.demo",[]);

md.config(config);
config.$inject = ["$routeProvider"];
function config($routeProvider) {
    $routeProvider  
        .when("/demo",{templateUrl:"page/demo/index.html",controller:"demoIndexCtrl",menu:"demo.index"})
        .when("/demo/icon",{templateUrl:"page/demo/icon.html",controller:"demoIconCtrl",menu:"demo.icon"})
        .when("/demo/change01",{templateUrl:"page/demo/change01.html",controller:"pageChang01Ctrl",menu:"demo.change01"})
        .when("/demo/change02",{templateUrl:"page/demo/change02.html",controller:"pageChang02Ctrl",menu:"demo.change02"})
        .when("/demo/change03",{templateUrl:"page/demo/change03.html",controller:"pageChang03Ctrl",menu:"demo.change03"})

}

module.exports=md;
},{}],19:[function(require,module,exports){
var md=angular.module("web.main",[
    "ngRoute",
    "ngResource",
    "ngAnimate",
    "web.common",
    "web.demo",
    "httpException",
    "menu",
    "flag",
    "md5",
    "backTop",
    "loading",
    "query",
    "resize",
    "notifier",
    "dataExport",
    "routeAuthorize",
    "serverInject",
    "titleInject",
    "tokenInject",
    "dialog",
    "comment"
]);


/**
 *
 * **/
md.run(defaultRun);
defaultRun.$inject = ["$rootScope","$location","commonService","menu"];
function defaultRun($rootScope,$location,commonService,menu) {


    $rootScope.$on('$locationChangeStart',function(ev,p,n){
        //debugger;
    });

    //初始化回到顶部插件
    //backTop.init();
    //comment.init();
}



md.config(config);
config.$inject=["$routeProvider"];
function config($routeProvider) {

    $routeProvider
    //.when("/",{templateUrl:"./page/main/index.html",controller:"indexCtrl",})
        .when("/",{templateUrl:"./page/demo/index.html",controller:"demoIndexCtrl",menu:"index"})
        .otherwise({redirectTo: "404"});

}

module.exports=md;

},{}],20:[function(require,module,exports){
/**
 * @ngdoc module
 * @name backTop
 * @description
 * # backTop
 * 页面滚动一定距离，显示回到顶部按钮
 *
 * ## Example
 *backTop.init();
 */
var md = angular.module("backTop", []);
md.provider("backTop", backTop);

function isTouchDevice() {
    return /ANDROID|WEBOS|IPHONE|IPAD|IPOD|BLACKBERRY|IEMOBILE|OPERA MINI|NOKIA/i.test(window.navigator.userAgent.toUpperCase());
}

function backTop() {
    this.$get = ["$rootScope", "$timeout", function($rootScope, $timeout) {

        var img = angular.element("<img src='../../assets/image/common/rocket.png'/>");
        var img1 = angular.element("<img class='img1' src='../../assets/image/common/rocket.gif'/>");
        var oTop = angular.element("<div id='backTop'></div>");
        var root = angular.element(document.body).css("position", "relative");


        var createBackTop = {};
        createBackTop.init = function() {
            //判断页面是否有id为backTop的标签，是就删除掉
            if (document.getElementById("backTop")) document.getElementById("backTop").remove();

            oTop.append(img);
            oTop.append(img1);
            root.append(oTop);

            var windowWidth = document.body.clientWidth || window.innerWidth;
            //底部高度
            var marginBottom = 30;
            if (windowWidth < 768) marginBottom = 35;
            oTop.css({
                bottom: marginBottom + "px"
            });

            $rootScope.$on("scroll", pageScroll);

            function pageScroll() {
                var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                oTop.css({
                    bottom: marginBottom + "px"
                });
                if (scrolltop > 400) {
                    oTop.css({
                        display: "block"
                    });
                } else {
                    oTop.css({
                        display: "none"
                    });
                }
            }


            var c = 1,
                bottom = marginBottom;
            oTop[0].onclick = function() {
                var screenh = (document.documentElement.clientHeight || document.body.clientHeight) - 100;
                img.css({
                    display: "none"
                });
                img1.css({
                    display: "block"
                });

                // this.style.bottom = bottom + 400 + 'px';
                // this.style.opacity = 0;

                // $timeout(function() {
                //     oTop.css({display: "none"});
                //     document.documentElement.scrollTop = 0;
                //     document.body.scrollTop = 0;
                //     img.css({display: "block"});
                //     img1.css({display: "none"});
                //     oTop[0].style.opacity = 1;
                // }, 300);

                var time = setInterval(function() {
                    bottom += c;
                    c += 10;
                    oTop.css({
                        bottom: bottom + "px"
                    });
                    // alert(screenh + ':' + bottom);
                    if (screenh < bottom) {
                        clearInterval(time);
                        oTop.css({
                            display: "none"
                        });
                        document.documentElement.scrollTop = document.body.scrollTop = 0;
                        img.css({
                            display: "block"
                        });
                        img1.css({
                            display: "none"
                        });
                        c = 1;
                        bottom = marginBottom;
                    }
                }, 41);
            };
            if (!isTouchDevice) {
                oTop[0].onmouseover = function() {
                    img.css({
                        display: "none"
                    });
                    img1.css({
                        display: "block"
                    });
                };
                oTop[0].onmouseout = function() {
                    img.css({
                        display: "block"
                    });
                    img1.css({
                        display: "none"
                    });
                };
            }

        };
        return createBackTop;
    }];
}
},{}],21:[function(require,module,exports){
/**
 * @ngdoc module
 * @name backTop
 * @description
 * # backTop
 * 意见反馈
 *
 * ## Example
 *comment.init();
 */
var md = angular.module("comment", []);
md.provider("comment", comment);

function comment() {

    function search(key) { //从请求字符串里根据key找到value
        var value,search="";
        if(window.location.search.length > 0) {
            search = window.location.search;

        }else if(window.location.hash.length>0){
            var index=window.location.hash.indexOf("?");
            if(index!=-1){
                search=window.location.hash.substr(index);
            }
        }
        if(search.length > 0) {
            search = search.substr(1);
            var arr = search.split("&");
            for(var i = 0; i < arr.length; i++) {
                var tem = arr[i].split("=");
                if(tem.length > 1 && tem[0] === key) {
                    value = tem[1];
                }
            }
        }
        return value;
    }

	this.$get = ["$rootScope", "commonService", "query","$document", function ($rootScope, commonService, query,$document) {

		var oTop = angular.element("<div id='comment' class='comment'></div>");
		var changTab = angular.element("<div class='changTab'>意见反馈</div>");
		var close = angular.element("<div class='commentClose'><i class='icon icon-close'></i> </div>");
        var root = angular.element(document.body).css("position", "relative");
		var content = "<div class='commentContent'><h3>欢迎来到吐槽专区</h3><textarea id='commentTextarea'></textarea><div><button id='commentSubmit'>提交</button></div><div><div class='commentimg'>";
		if(!search("access_token")){
			content+="<a target='_blank' class='implant-client-hide' href='http://wpa.qq.com/msgrd?v=3&uin=690160918&site=qq&menu=yes'><img src='../../assets/image/common/qqcomment.png'/></a>";
		}
		content+="</div></div></div>";
		content=angular.element(content);

		var content = angular.element("<div class='commentContent'><h3>欢迎来到吐槽专区</h3><textarea id='commentTextarea'></textarea><div><button id='commentSubmit'>提交</button>" +
		"</div><div><div class='commentimg implant-client-hide'><a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=690160918&site=qq&menu=yes'><img src='../../assets/image/common/qqcomment.png'/></a></div></div></div>");

		var commentSuccess=angular.element("<div class='commentSuccess'><img src='../../assets/image/homework/noSubmit.png'><p>感谢您的意见和建议，准小星必将认真处理！</p></div>");

		var createBackTop = {};
		createBackTop.init = function () {
            if(document.getElementById('question-print')) return false;
			//判断页面是否有id为backTop的标签，是就删除掉
			if (document.getElementById("comment")) document.getElementById("comment").remove();
			oTop.append(commentSuccess);
			oTop.append(content);
			oTop.append(changTab);
			oTop.append(close);
			root.append(oTop);

			changTab[0].onclick = function () {
				commentSuccess.css({display:"none"});
				content.css({display:"block"});
				if (oTop.hasClass("commentShow")) {
					oTop.removeClass("commentShow");
				} else {
					oTop.addClass("commentShow");
				}
			};
			close[0].onclick = function () {
				oTop.removeClass("commentShow");
			};


			document.getElementById("commentSubmit").onclick = function () {
				var commentTextarea = document.getElementById("commentTextarea").value;

				if (!commentTextarea) return;

				var sourceType="web_home",name="web家庭版";
				if($rootScope.teacher){
					sourceType="web_school";
					name="web校园版";
				}

				//console.log($rootScope);
				
				var p = {};
				if($rootScope.student){
					p = {
						accountId: $rootScope.studentId,
					pageUrl: document.location.href,
						//pageName: query($document,".title").text(),
						pageName: name,
					adviceContent: commentTextarea,
					sourceType:sourceType,
						classId:$rootScope.student.currClassId,
						schoolId:$rootScope.student.currSchoolId,
					callName:$rootScope.name
				};
				}else{
					p = {
						accountId: $rootScope.teacherId,
						pageUrl: document.location.href,
						//pageName: query($document,".title").text(),
						pageName: name,
						adviceContent: commentTextarea,
						sourceType:sourceType,
						classId:"",
						schoolId:$rootScope.teacher.currSchoolId,
						callName:$rootScope.name
					};
				}




				commonService.feedback.save(p, function (data) {
					if(data.success){
						commentSuccess.css({display:"block"});
						content.css({display:"none"});
                        document.getElementById("commentTextarea").value = '';
					}
				});

			};
		};
		return createBackTop;
	}];
}






},{}],22:[function(require,module,exports){
/**
/* @module plugins
* change log
* version 0.0.1   2015-02-05
* 简单的数组、对象导出，期待添加表达式运算，路径回返
*/
var md=angular.module("dataExport",[]);
md.provider("dataExport",dataExport);

/**
 * 
 *  根据给定的规则，重新生成对象

 *
 *  @class dataExport 数据导出
 */
function dataExport(){

    this.$get=[function(){

        return{"exp":exportFn};
        /**
         *  var data={data:[{name:"jiang",size:"count",address:[{phone:"123456"}]},{name:"pp",size:"count",address:[{phone:"787897"}]}]};
         *
         *  eg.原式数据模拟的是一个api返回的数据,数组放在json的data键中，且每个数组中嵌套类一个address数组。如果现实情况下我们
         *  需要一个统一格式的数据比如[{name:"",phone:""}]
         *
         *  我们可以使用下面的配置首先声明我们要导出的是一个数组
         *  那么配置以数组[] 包围，数组的第一个是数组所要取的数据路径这里是取data
         *  ['data']
         *
         *  数组的第2个是数组下面对象的取值路径
         *
         *  ['data',{name:"name",phone:"address/0/phone"}]
         * 导出后的数据为
         * [{name:"jiang",phone:"123456"},{name:"pp",phone:"787897"}]
         * 
         * @method export 导出数据
         *
         * @param {Object} 输入数据
         * @param {Object} 配置
         */
        function exportFn(data,config){
            return travel(data,config);
        }

        //解析路径
        function parsePath(path,exp){
            var regExp=new RegExp("\\.\\/|(\\.\\./)+)[0-9,a-Z]+");
            if(regExp.math(exp)){
                exp.replace(".","/");
                if(exp.indexOf("./")===0){
                    exp=exp.substring(2);
                }
                while(exp.indexOf("../")==1||path.index("/")!=-1){
                    path=path.substring(0,path.lastIndexOf("/"));
                    exp=exp.substring(3);
                }
                return path+"/"+exp;

            }
        }

        function getValue(data,path){
            path=path.split("/");
            var current=data;
            for(var i=0;current&&i<path.length;i++){
                var p=path[i];
                if(p&&current[p]!==undefined){
                    current=current[p];
                }else if(p==="."){
                    current=current;
                }else if(p){
                    current=undefined;
                }
            }
            return current;
        }

        function travel(root,config,path){
            var current=root;
            var result={};
            if(angular.isArray(config)){
                result=[];
                //获取数组导出时，相对的路径的对应的值
                if(angular.isString(config[0])){
                    current=getValue(current,config[0]);
                }
                if(angular.isArray(current)){
                    result=[];
                    angular.forEach(current,function(v,i){
                        var dt=travel(v,config[1],path+i);
                        result.push(dt);
                    });
                }else if(angular.isObject(current)){

                    var dt=travel(current,config[1]);
                    result.push(dt);
                }else{
                    result.push(null);
                }
            }else if(angular.isObject(config)){
                angular.forEach(config,function(v,k){
                    current=root;
                    var path=v;
                    if(angular.isString(path)){
                        dt=getValue(current,path);
                        result[k]=dt;
                    }else if(angular.isObject(path)){
                        var dt=travel(current,path);
                        result[k]=dt;
                    }else if(angular.isFunction(path)){
                        result[k]=path.call(current,current);
                    }
                });
            }

            return result;

        }

    }];

}

module.exports=md;

},{}],23:[function(require,module,exports){
var md=angular.module("dialog",[]);

md.provider('dialog', dialogProvider);

function dialogProvider() {
	this.$get = dialogProviderGet;
	dialogProviderGet.$inject = ["$parse", "$http", "$rootScope", "$compile"];

	var isRendered = false;
	var $ = angular.element;
	var dialogHTML = null;
	var scope = null;

	function dialogProviderGet($parse, $http, $rootScope, $compile) {

		/**
			params example
			{
				title: 'some html label',
				info: 'some html to show',
				buttoms: [{
					label: 'some html label',
					click: 'some callback fuction'
				}]
			}
		*/
		function init(params) {
			if(!dialogHTML) {
				$http.get('template/dialog.html')
						.success(function(result) {
							dialogHTML = result;
							scope = $rootScope.$new();
							render(params);
						});
			} else {
				render(params);
			}
		}

		function render(params) {
			var ele = $(document.body);
			var res = $(dialogHTML);

			scope.data = params;
			scope.isShow = true;

			// Added by F.Zhu @ 2015/12/18
			scope.hideTitle = params.hideTitle;

			scope.hideDialog = function() {
				scope.isShow = false;
			};
			scope.onHandleClick = function($index) {
				scope.data.buttons[$index].click();
				scope.isShow = false;
			};

			$compile(res)(scope);

			if(!isRendered) {
				ele.append(res);
				isRendered = true;
			}
		}

		return {
			init: init
		}
	}


}
},{}],24:[function(require,module,exports){
/**
 * @ngdoc module
 * @name flag
 * @description
 * # flag
 * 返回浏览器类型版本
 * ## Example
 */

var md=angular.module("flag",[]);

md.provider("flag",flagProvider);



function flagProvider(){
    var agl = {};
    var ua  = navigator.userAgent;

    agl.ISFF     = ua.indexOf('Firefox') != -1;
    agl.ISOPERA  = ua.indexOf('Opera') != -1;
    agl.ISCHROME = ua.indexOf('Chrome') != -1;
    agl.ISSAFARI = ua.indexOf('Safari') != -1 && !agl.ISCHROME;
    agl.ISWEBKIT = ua.indexOf('WebKit') != -1;

    agl.ISIE   = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    agl.ISIE6  = ua.indexOf('MSIE 6') > 0;
    agl.ISIE7  = ua.indexOf('MSIE 7') > 0;
    agl.ISIE8  = ua.indexOf('MSIE 8') > 0;
    agl.ISIE9  = ua.indexOf('MSIE 9') > 0;
    agl.ISIE10 = ua.indexOf('MSIE 10') > 0;
    agl.ISOLD  = agl.ISIE6 || agl.ISIE7 || agl.ISIE8; // MUST be here
    agl.ISVERYOLD = agl.ISIE6 || agl.ISIE7;

    agl.ISIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
    agl.ISIE10UP = agl.ISIE10 || agl.ISIE11UP;
    agl.ISIE9UP  = agl.ISIE9 || agl.ISIE10UP;

    this.$get=[function(){
        return agl;
    }];
}
},{}],25:[function(require,module,exports){
/**
 * http拦截器
 * 处理response返回错误码处理
 * **/

var md=angular.module("httpException",[]);
md.provider("httpException",httpExceptionProvider);
md.config(["$httpProvider",httpConfig]);

function httpConfig($httpProvider){
    $httpProvider.interceptors.push('httpException');
}

function httpExceptionProvider(){
    this.$get=["$rootScope","$q",function($rootScope,$q){

        return {
            response:responseSuccess,
            responseError:responseError
        };
        function responseSuccess(resp){

            if(resp.data&&resp.data.code==10000){
                if(typeof(resp.data.data)=="string"){
                    resp.data=resp.data;
                }else{
                    resp.data=resp.data.data;
                }
                
            }else if(resp.data&&resp.data.code!=undefined&&resp.data.code!=10000){
                $rootScope.$broadcast("$httpException",{data:resp,status:resp.status});
                return $q.reject(resp);
            }
            return $q.all(resp);
        }
        function responseError(rejection){
            if(rejection.status!==200){
                $rootScope.$broadcast("$httpException",{data:rejection.data,status:rejection.status});
            }
            return $q.reject(rejection);
        }
    }];

}

module.exports=md;


},{}],26:[function(require,module,exports){

var md=angular.module("loading",[]);
md.provider("loading",loadingProvider);

function loadingProvider(){

    this.$get=["$rootScope","$location","flag",function($rootScope,$location,flag){

        var box=angular.element("<div class='no-select'></div>");
        var loadingEle=angular.element("<div><img src='assets/image/common/loading.gif' style='width:150px'></div>");
        box.append(loadingEle);
        var json={ height:"100%", width:"100%",top:0,left:0,position:"fixed","z-index":999,transition:"opacity 0.5s"};
        if(flag.ISOLD){
            json.filter="progid:DXImageTransform.Microsoft.gradient(startColorstr=#99FFFFFF, endColorstr=#99FFFFFF)";
        }else{
            json.background="#FFFFFF";
        }
        box.css(json);

        loadingEle.css({position:"fixed","left":"50%",top:"40%","margin-left":"-75px"});
        var root=angular.element(document.body).css("position","relative");

        $rootScope.$on("$locationChangeSuccess",onLocationChange);
        $rootScope.$on("loaded",function(){
            setTimeout(function(){
                box.remove();
            },200);
        });
        $rootScope.$on("loading",function(){

            root.append(box);
        });

        return {
            title:titleFunc
        };

        function titleFunc(value,usePrefix){
            if(value!==undefined){
                prefix=usePrefix===undefined?prefix:"";
                angular.element("title").html(prefix+value);
            }
        }

        function onLocationChange(){
            root.append(box);
        }

    }];
}

module.exports=md;
},{}],27:[function(require,module,exports){
var md=angular.module("md5",[]);
var md5=require("MD5");
var sc=this;

md.service('md5', [function(flag){
    return function(str){
        return md5(str); 
    }
}])

module.exports=md;
},{"MD5":2}],28:[function(require,module,exports){
/**
* @module plugins
*/
var md=angular.module("menu", []);
md.provider("menu", menuProvider);
md.directive("menu", menuDirective);


function menuProvider() {

    menuProviderGet.$inject = ["$route", "$rootScope", "$parse", "$window", "$location","$routeParams","$anchorScroll"];
    var config = {};
    this.root = config;

    this.$get = menuProviderGet;
    /**
    * 读取Routeconfig里面所有定义了menu的配置，系统将其识别为菜单项
    *
    * @class menu(菜单)
    */
    function menuProviderGet($route, $rootScope, $parse, $window, $location,$routeParams,$anchorScroll) {

        $rootScope.$on("$locationChangeSuccess", onLocationChanged);

        var result={
            all: getAllMenu,
            find: findMenu,
            scroll:scroll,
            to: navMenu,
            refresh:refresh
        };
        return result;

        function scroll(id){
                $location.hash(id);
                $anchorScroll();
        }

        function refresh(){
            $location.reload();
        }

        function onLocationChanged(evt,newUrl,oldUrl) {
            var old=$location.absUrl();
            if(oldUrl){
                $location.$$parse(oldUrl);
            }
            var oldPath=$location.path();
            if(newUrl){
                $location.$$parse(newUrl);
            }
            
            var newPath=$location.path();

            $location.$$parse(old);
            
            var menuNew = getCurrentMenu(newPath);
            var menuOld=getCurrentMenu(oldPath);
            $rootScope.currentMenu=menuNew;
            
            $rootScope.prevMenu=menuOld;

            result.current=menuNew;
            result.prev=menuOld;
            $rootScope.$broadcast("$menuChange", menuNew,menuOld,newUrl,oldUrl);
            $rootScope.$$time=new Date().getTime();
            
        }

        //get current route.
        function getCurrentMenu(rt) {
            var routes = $route.routes, result = "";

            for(var  i in $route.routes){
                var route=$route.routes[i];
                if (route.regexp && route.regexp.test(rt)) {
                    result = route;
                    break;
                }
            }

            return getMenuObject(result);
        }

        function getMenuObject(route) {
            var obj = {};
            if (angular.isString(route.menu)) {
                obj.name = route.menu;
                obj.title = route.title;
                obj.regex = route.originalPath;
                obj.templateUrl = route.templateUrl;
                obj.controller = route.controller;
                obj=angular.extend(obj,route.extend);
                obj.level = 0;
                return obj;
            } else if (angular.isObject(route.menu)) {
                obj.name = route.menu.name;
                obj.title = route.menu.title || route.menu.name;
                obj.regex = route.originalPath;
                obj.level = route.menu.level || 0;
                obj.templateUrl = route.menu.templateUrl;
                obj.controller = route.menu.controller;
                obj=angular.extend(obj,route.extend);
                return obj;
            }
        }

        /** 
        * 获取所有的菜单项
        *
        *@method all 
        */
        function getAllMenu() {
            var result = [];
            var routes = $route.routes;
            angular.forEach(routes, function (route) {
                var obj = getMenuObject(route);
                if (obj) {
                    result.push(obj);
                }
            });

            return result.sort(function (first, second) {
                return first.level - second.level;
            });
        }

        /** 
        * 根据菜单名查找菜单项
        *
        *@method all 
        */
        function findMenu(name) {
            var result = "", menus = getAllMenu();
            angular.forEach(menus, function (menu) {
                if (menu.name == name) {
                    result = menu;
                    return false;
                }
            });
            return result;
        }

        /** 
        * 根据菜单名跳转到对应的页面
        *
        *@method to
        */
        function fillParameter(path, params) {
            var splits = path.split("/");
            var tmpResult = [];
            for (var i = 0, count = 0, current, firstChar; i < splits.length; i++) {
                current = splits[i];
                firstChar = current[0];
                if (firstChar == ":" && params.length > count) {
                    var value = params[count];
                    tmpResult.push(value);
                    count++;
                } else if (firstChar == ":" && params.length < count + 1) {
                    break;
                } else {
                    tmpResult.push(current);
                }
            }
            return tmpResult.join("/");
        }


        //navigate to page.
        function navMenu(config) {

            if (angular.isString(config)) {
                var configNew = {};
                configNew.name = config;
                configNew.params = Array.prototype.slice.call(arguments, 1);
                config = configNew;
            }
            var name = config.name, target = config.target, params = config.params;
            var path;
            var menuCurrent = findMenu(name);
            if (menuCurrent) {
                path = fillParameter(menuCurrent.regex, params);
            }
            if (target && path) {
                var root=$location.absUrl();
                var currentPath=$location.path();
                var newPath;
                root=root.substring(0,root.length-currentPath.length);
                newPath=root+path;
                //console&&console.log("open:" + newPath);
                $window.open(newPath, target); 

            } else if (path) {
                //console&&console.log("nav to:" + path);
                $location.path(path);

            }
        }

    }
}



menuDirective.$inject = ["menu", "$parse"];

function menuDirective(menu, $parse) {
    return {
        restrict: "A",
        link: linkFn
    };


    function linkFn($scope, $ele, $attr) {
        if (!$attr.menu) {
            return;
        }
        var contents = $attr.menu.split(",");

        var menuName, params = [], target;
        if (contents.length > 0) {

            $ele.on("click",function () {
                menuName = $parse(contents[0])($scope);
                params = contents.slice(1);
                angular.forEach(params, function (v, i) {
                    params[i] = $parse(v)($scope);
                });
                target = $attr.target;
                menu.to({name: menuName, params: params, target: target});
                $scope.$apply();
            });
        }
    }
}

module.exports=md;

},{}],29:[function(require,module,exports){
var md=angular.module("notifier",[]);

md.provider("notifier",Notifier);



function Notifier(){

    this.$get=["$rootScope",function($rootScope){

        var box=angular.element("<div class='notifier'></div>");

        

        var css={position:"fixed",right:"0",bottom:"0"};
        var contentCss={}

        box.css(css);
        

        angular.element(document.body).append(box);

        $rootScope.$on("notify",function(evt,v){
            var content=angular.element("<div style='position:relative;bottom:-40px;'></div>");
            content.css(contentCss);
            if(v){
                content.html(v);
                box.append(content);
                
                setTimeout(function(){
                    content.addClass("item");
                },300)
                content.on("click",function(evt){
                    content.addClass("remove")
                    setTimeout(function(){
                        content.remove();
                    },300)
                    
                })
            }
            setTimeout(function(){
                    content.addClass("remove")
                    setTimeout(function(){
                        content.remove();
                    },500)
            },3000);
        })
        return {};

    }];

}
},{}],30:[function(require,module,exports){
var md=angular.module("query",[]);

md.service('query', ["flag",function(flag){
    return function query(ele,selectors){

        if(angular.isString(ele)){
            selectors=ele;
            ele=document;
        }else if(angular.isElement(ele)){
            ele=ele[0];
        }
        ele=ele||document;
        if(!flag.ISOLD){
            return angular.element(ele.querySelectorAll(selectors));
        }else if(Sizzle){
            return angular.element(Sizzle(selectors,ele));
        }
    };
}]);

module.exports=md;
},{}],31:[function(require,module,exports){
var md = angular.module("resize", []);
md.provider("resize", resizeProvider);

function resizeProvider() {
    var last;
    this.$get = ["$rootScope", "$window", "$document", function ($rootScope, $window, $document) {

        $window.onresize = function () {
            $rootScope.$broadcast("resize", document.body.clientWidth);
        };
        $window.onscroll = document.body.onscroll = function () {
            $rootScope.$broadcast("scroll", document.body.clientWidth);

        };




        /*setInterval(function(){
         if(last!==document.body.clientWidth){

         trigger();
         }
         last=document.body.clientWidth;
         },100);
         var tiggerTimeout;
         function trigger(){
         clearTimeout(tiggerTimeout);
         tiggerTimeout=setTimeout(function(){
         $rootScope.$broadcast("resize",document.body.clientWidth);
         },300);
         }
         */
    }];
}

module.exports = md;
},{}],32:[function(require,module,exports){

var md=angular.module("routeAuthorize",[]);
md.provider("routeAuthorize",routeAuthorizeProvider);

function routeAuthorizeProvider(){
    this.$get=["$rootScope","$route","$location","session",function($rootScope,$route,$location,session){
        $rootScope.$on('$locationChangeStart',onBeforeChange);


        function onBeforeChange(ev,prev,next){

            debugger;
            var result=$rootScope.$broadcast("$nav",prev,next,doNav)

            if(result.defaultPrevented){
                ev.defaultPrevented=true;
            }
            function doNav(){
                window.location.href=next;
            }
        }

        $rootScope.$on('$locationChangeStart',onLocationChange);


        function onLocationChange(ev){
            var currentRole=session.get("accountType");
            var result=validate(currentRole);
            if(!result){
                //console&&console.log("authorize failed.");

            }else{
                //console&&console.log("authorize success.");
            }
           var eventResult= $rootScope.$broadcast('$authorize', result).defaultPrevented;
            if(eventResult){
                ev.preventDefault();
            }
        }

        //get current route roles
        function getRoles(){
            var result=[];
            var routes=$route.routes;
            angular.forEach(routes,function(route,path){
                if(route.regexp&&route.regexp.test($location.path())){
                    result=route.role;
                    return false;
                }
                
            });
            return angular.isArray(result)?result:[result];
        }

        function validate(currentRole){
            currentRole=currentRole||"anonymous";
            var roles=getRoles(),result=false;

            angular.forEach(roles,function(r){
                r=r||"anonymous";
                if(r=="anonymous"||r==currentRole){
                    result=true;
                    return false;
                }
            });
            return result;
        }
    }];
}

module.exports=md;

},{}],33:[function(require,module,exports){
var md=angular.module("serverInject",[]);


md.provider("serverInject",serverInject);
md.config(["$httpProvider",httpConfig]);


function transformRequest(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}



function httpConfig($httpProvider){
    $httpProvider.interceptors.push('serverInject');
}

//保存服务器api地址
var server=""; 

function serverInject(){
    
    this.setServer=function(str){
            server=str;
    };
    this.$get=[getFn];
    function getFn(){
        return {
            getRoot:getRoot,
            request:onRequest
        };

        function getRoot(){
            return server;
        }

        function onRequest(config){

            if(config.form){
                config.transformRequest=transformRequest;
                config.headers=config.headers||{};
                config['Content-Type']='application/x-www-form-urlencoded';
            }
            //add timespan which disabled ie cache
            if(config.url.indexOf("rest")>-1){
                var timespan=new Date().getTime();
                config.url+=config.url.indexOf("?")==-1?("?t="+timespan):("&t="+timespan);
            }

            if(!config.server&&!/.*\.html$/.test(config.url)){
                config.url=server+config.url;
            }else if(config.server&&!/.*\.html$/.test(config.url)){
                config.url=config.server+config.url;
            }
            return config || $q.when(config);
        }
    }
}

module.exports=md;

},{}],34:[function(require,module,exports){
/**
* 在浏览器中保存会话值
* 
* @module plugins
*/
var md=angular.module("session",[]);


/**
* 在浏览器中保存会话值
* 
* @class session(浏览器会话)
*/
md.provider("session",sessionProvider);

var ifStorage=!!localStorage;
function setCookieValue(name,value,time){
    setCookie(name,value,time);
}


function getCookieValue(name){
    var pattern = RegExp(name + "=[^;]*");
    var matched = document.cookie.match(pattern);
    if(matched){
        var cookie = matched[0].split('=');
        var value=cookie[1]
        return value&&decodeURIComponent(value);
    }
    return false;
}

//将session值保存在cookie
function setCookieValue(name,value,time1,options){
    options=options||{};
    var time=parseTime(time1);
    var current=new Date().getTime(); 
    var x=[
        encodeURIComponent(name),
        "=",
        encodeURIComponent(value),
        time?";expires="+new Date(current+time).toUTCString():"",
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
    ].join("");
    document.cookie=x;
}
//如果没设置时间则将session值保存在sessionStorage
//若设置了时间则保存在localstorage中
function setStorageValue(name1,value1,time1){
    var time=parseTime(time1),
    name=encodeURIComponent(name1),
    value=encodeURIComponent(value1);

    if(!time){
        localStorage.setItem(name,value);
    }else{
        var expireTime=new Date().getTime()+parseTime(time);
        localStorage.setItem(name,expireTime+"#%#"+value);
    }
    
}
//获取storage中找到值，如果设置了过期时间，与当前时间匹配，如果超时返回空，并删除localstorage中的值
function getStorageValue(name){
    // var value=localStorage[name]||localStorage[name];
    var value=localStorage[name];
    if(value&&(value+"").indexOf("#%#")>0){
        var splits=(value+"").split("#%#");
        var time=splits[0];
        if(Number(time)>new Date().getTime()){
            value=splits[1];
        }else{
            value=undefined;
            localStorage.removeItem(name);
            localStorage.removeItem(name);
        }
    }
    return value&&decodeURIComponent(value);
}
function deleteStorageValue(name){
    localStorage.removeItem(name);
    localStorage.removeItem(name);
}

function deleteCookieValue(name){
    document.cookie=encodeURIComponent(name)+"=;'Thu, 01 Jan 1970 00:00:00 GMT'";
}
//TODO: support months and years. 
var timeRegx=/(([0-9]+)\s(seconds|minutes|hours|days|weeks))+/g;
function getTime(v,type){
    if(type==="seconds"){
        return v*1000;
    }else if(type==="minutes"){
        return v*60000;
    }else if(type==="hours"){
        return v*3600000; 
    }else if(type==="days"){
        return v*86400000;
    }else if(type=="weeks"){
        return v*604800000;
    }
}
function parseTime(v){
    var time=0; 
    if(typeof(v)==="number"){
        time=Math.floor(v);
    }else if(typeof(v)=="string"){
        v.replace(timeRegx,function(r,s,value,type){
            time+=getTime(value,type);
        });
    }
    return time;
}







function sessionProvider(){


    this.$get=[sessionGet];

    sessionGet.$inject=[];
    function sessionGet(){

        var getFn=ifStorage?getStorageValue:getCookieValue,
        setFn=ifStorage?setStorageValue:setCookieValue,
        deleteFn=ifStorage?deleteStorageValue:deleteCookieValue;
        /**
        * 获取session值 
        *
        * @method get
        * @param {String} 键值
        * @return {String} session中存储的字符串
        */
        function getValue(name){
            return getFn(name);
        }
        /**
        * 删除session中存储的值 
        *
        * @method remove
        * @param {String} 键值
        */
        function deleteValue(name){
            if(!angular.isArray(name)){
                name=[name];
            }
            angular.forEach(name,function(v){deleteFn(v);});
        }
        /**
        * 向session中存储字符串 时间格式支持"seconds minutes hours days weeks",比如 "2 days and 4 hours"
        *
        * @method set
        * @param {String} 键
        * @param {String} 值
        * @param {String} 过期时间 
        */
        function setValue(name,value,time){
            setFn(name,value,time);
        }



        return {
            get:getValue,
            set:setValue,
            remove:deleteValue
        };
    }

}
},{}],35:[function(require,module,exports){

var md=angular.module("titleInject",[]);
md.provider("routeInjectTitle",routeAuthorizeProvider);

function routeAuthorizeProvider(){
    var defaultTitle="";
    var prefix="SITE";
    this.setDefault=function(title){
        defaultTitle=title||defaultTitle;
    };
    this.setPrefix=function(value){
        prefix=value;
    };
    var titleTag=document.getElementsByTagName("title")[0];
    this.$get=["$route","$rootScope","$location","$window",function($route,$rootScope,$location, $window){

        $rootScope.$on("$locationChangeSuccess",onLocationChange);

        return {
            title:titleFunc
        };

        function titleFunc(value,usePrefix){
            if(value!==undefined){
                prefix=usePrefix===undefined?prefix:"";
                // angular.element("title").html(prefix+value);
                $window.document.title = prefix+title;
            }
        }

        function onLocationChange(){

            var title=getTitle();
            // titleTag.innerText=prefix+title;
            $window.document.title = prefix+title;
        }

        //get current route roles
        function getTitle(){
            var result=defaultTitle;
            var routes=$route.routes;
            debugger;
            angular.forEach(routes,function(route){
                if(route.regexp&&route.regexp.test($location.path())){
                    result=route.title||defaultTitle;
                    $rootScope.inportal=route.portal;
                    return false;
                }
            });
            return result;
        }

    }];
}

module.exports=md;
},{}],36:[function(require,module,exports){
var md=angular.module("tokenInject",[]);
md.provider("tokenInject",tokenInjectProvider);
md.config(["$httpProvider",httpConfig]);

httpConfig.$inject=["$httpProvider"];
function httpConfig($httpProvider){
    //$httpProvider.interceptors.push('tokenInject');
}

function transformRequest(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

function tokenInjectProvider(){
    var tokenKey="token"; //
    var from="cookie"; //from cookie,element,rootScope
    this.$get=["$q","$rootScope","session",function($q,$rootScope,session){
        return {
            request:onRequest
        };

        function onRequest(config){
            var token;

            if(config&&config.form){
                config.headers["Content-Type"]="application/x-www-form-urlencoded";
                //config.transformRequest=transformRequest;
            }

            if(config&&config.headers){
                if(from=="element"){
                    token=angular.element("#"+tokenKey).html();
                }else if(from=="scope"){
                    token=$rootScope[tokenKey];
                }else{
                    token = session.get(tokenKey);
                }
                config.headers.access_token=token;
            }
            return config || $q.when(config);

        }
    }];

}

module.exports=md;

},{}],37:[function(require,module,exports){
var md = require("../module/common");
md.service("commonService", commonService);

commonService.$inject = ["$resource"];

function commonService($resource) {
    //2.8.2.5.1查询章节布置作业情况/exerhome/question/sectiondetail
    this.detailSection = $resource("rest/exerhome/question/sectiondetail/:studentId/:sectionId/:pageNum/:pageSize");

    //2.8.2.4.1	新建作业/exerhome/create
    this.homeworkCreate = $resource("rest/exerhome/create", {}, {
        save: {
            method: "POST"
        }
    });

    //2.8.2.2.1	老师当前所教班级信息查询/class/search
    this.classSearch = $resource("rest/class/search");
}

},{"../module/common":17}],38:[function(require,module,exports){
/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var Polyline = require("./../zrender/shape/Polyline");
var CircleShape = require('./../zrender/shape/Circle');
var RectangleShape = require('./../zrender/shape/Rectangle');

var Scale = require('./tool/Scale');
var Axis = require('./tool/Axis');

/**
 * 折线图
 * @class brokenLineChart（折线图）
 * @constructor
 * @example
 *      var config = {
                id: "chartId",
                data: scope.brokenLineChart,
                domain: [0, 120],
                margin: {top: 20, right: 20, bottom: 40, left: 40}
            };
 var brokenLineChart=new BrokenLineChart(config);
 *
 *
 */
function BrokenLineChart(config) {


    var div = document.getElementById(config.id);
    var data = config.data;
    var margin = config.margin;

    //创建tab标签
    var tab = document.createElement("div");
    tab.className = "tab";
    tab.onmouseover = function () {
        this.style.display = "block";
    };

    if(div.parentNode.childNodes[1]) div.parentNode.childNodes[1].remove();
    div.parentNode.appendChild(tab);

    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;


    //初始化zrender对象
    var zr = zrender.init(div);

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(data.length)
        .setRange([0, width]);



    //data数据初始化
    var i = 0, arr = [], polyLineArr = [];
    for (i = 0; i < data.length; i++) {
        var ls = [];
        arr[i] = data[i].name;

        ls[0] = scaleX.getRange(i + 0.5);
        ls[1] = scaleY.getRange(data[i].coore);

        polyLineArr.push(ls);
    }


    //创建XY坐标
    var axisY = new Axis().createY(10, scaleY);
    var axisX = new Axis().createX(arr, scaleX);
    axisY.position = [margin.left, margin.top];
    axisX.position = [margin.left, margin.top + height];


    //创建折线
    var polyLine = new Polyline({
        style: {
            pointList: polyLineArr,
            strokeColor: 'rgba(150,190,90,0.9)',   // == color
            lineWidth: 2,
            lineCap: 'round',
            lineType: 'solid',
            lineJoin: 'round',
            miterLimit: 50,
            shadowBlur: 10,
            shadowColor: "rgba(150,190,90,1)",
            textPosition: 'end'
        },
        hoverable: false
    });
    polyLine.position = [margin.left, margin.top];

    //创建数据点
    var circleGroup = new Group();
    var rectGroup = new Group();
    for (i = 0; i < polyLineArr.length; i++) {

        circleGroup.addChild(new CircleShape({
            style: {
                x: polyLineArr[i][0],
                y: polyLineArr[i][1],
                r: 6,
                color: 'rgba(255, 206, 250, 1)'
            },
            hoverable: false
        }));

        //创建隐藏的矩形
        var rect = new RectangleShape({
            style: {
                x: scaleX.getRange(i),
                y: 0,
                width: scaleX.getRange(1),
                height: height,
                color: 'rgba(255, 255, 255, 0)'
            },
            hoverable: false,
            onmouseover: function () {

                if (this.data[2]) {
                    var top = margin.top + this.data[1];
                    var left = margin.left + this.data[0];
                    tab.style.display = 'block';
                    if (this.data[1] + tab.offsetHeight > height) top -= tab.offsetHeight;
                    if (this.data[0] + tab.offsetWidth > width) left -= tab.offsetWidth;
                    tab.style.top = top + "px";
                    tab.style.left = left + "px";
                    this.data[2] = 0;
                }
            },
            onmouseout: function () {
                tab.style.display = 'none';

                this.data[2] = 1;
            }
        });
        polyLineArr[i][2] = 1;
        rect.data = polyLineArr[i];

        rectGroup.addChild(rect);


    }
    circleGroup.position = [margin.left, margin.top];
    rectGroup.position = [margin.left, margin.top];


    zr.addGroup(axisY);
    zr.addGroup(axisX);
    zr.addGroup(polyLine);
    zr.addGroup(circleGroup);
    zr.addGroup(rectGroup);

    return zr;


}

module.exports = BrokenLineChart;
},{"./../zrender/Group":41,"./../zrender/shape/Circle":54,"./../zrender/shape/Polyline":58,"./../zrender/shape/Rectangle":59,"./../zrender/zrender":74,"./tool/Axis":39,"./tool/Scale":40}],39:[function(require,module,exports){
/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */

var Group = require('./../../zrender/Group');
var LineShape = require('./../../zrender/shape/Line');
var TextShape = require('./../../zrender/shape/Text');


/**
 * （坐标轴）Axis构造函数
 * @class Axis（坐标轴）
 * @constructor
 * @example
 *      var axisY = new Axis().createY(10, scaleY);
 *      var axisX = new Axis().createX(arr, scaleX);
 *      axisY.position = [margin.left, margin.top];
 *      axisX.position = [margin.left, margin.top + height];
 *
 *
 */
function Axis() {
    this.obj = new Group();
}
Axis.prototype = {
    /**
     *创建Y坐标
     * @method createY
     * **/
    createY: function (sum, scale) {
        this.sum = sum;

        //创建Y轴坐标线不包括坐标数据和点
        this.obj.addChild(new LineShape({
            style: {
                xStart: 0,
                yStart: 0,
                xEnd: 0,
                yEnd: scale.range.max,
                strokeColor: 'rgba(0,0,0,1)',
                lineWidth: 1,
                lineType: 'solid'
            }
        }));

        //section是定义域范围内分段的每一段的大小
        var i = 0, section = (scale.domain.max - scale.domain.min) / this.sum;

        //for循环Y轴分段数，创建对应shape
        for (; i <= this.sum; i++) {
            this.obj.addChild(new LineShape({
                style: {
                    xStart: -5,
                    yStart: scale.getRange(i * section),
                    xEnd: 0,
                    yEnd: scale.getRange(i * section),
                    strokeColor: 'rgba(0,0,0,1)',
                    lineWidth: 1,
                    lineType: 'solid'
                }
            }));
            this.obj.addChild(new TextShape({
                style: {
                    x: -20,
                    y: scale.getRange(i * section),
                    maxWidth: 15,
                    color: 'rgba(0, 0, 0, 1)',
                    text: i * section,
                    textFont: '12px 微软雅黑'
                }
            }));
        }
        return this.obj;
    },
    /**
     *创建X坐标
     * @method createX
     * **/
    createX: function (arr, scale) {
        this.sum = arr.length;

        //section是定义域范围内分段的每一段的大小
        var i = 0, section = (scale.range.max - scale.range.min) / this.sum;

        //创建Y轴坐标线不包括坐标数据和点
        this.obj.addChild(new LineShape({
            style: {
                xStart: 0,
                yStart: 0,
                xEnd: scale.range.max - scale.range.min,
                yEnd: 0,
                strokeColor: 'rgba(0,0,0,1)',
                lineWidth: 1,
                lineType: 'solid'
            }
        }));
        //for循环Y轴分段数，创建对应shape
        for (; i <= this.sum; i++) {
            this.obj.addChild(new LineShape({

                style: {
                    xStart: scale.getRange(i + 0.5),
                    yStart: 0,
                    xEnd: scale.getRange(i + 0.5),
                    yEnd: 5,
                    strokeColor: 'rgba(0,0,0,1)',
                    lineWidth: 1,
                    lineType: 'solid'
                }
            }));
            this.obj.addChild(new TextShape({
                style: {
                    x: scale.getRange(i + 0.5),
                    y: 15,
                    textAlign: 'center',
                    color: 'rgba(0, 0, 0, 1)',
                    text: arr[i],
                    textFont: '12px 微软雅黑'
                }
            }));

        }
        return this.obj;
    }
};

module.exports=Axis;
},{"./../../zrender/Group":41,"./../../zrender/shape/Line":56,"./../../zrender/shape/Text":60}],40:[function(require,module,exports){
/**
 * @module zrender
 * **/




/**
 * （比例尺）Scale构造函数
 * @class Scale（比例尺）
 * @constructor
 * @example
 *      var scaleY = new Scale()
 *          .setDomain([0, 120])
 *          .setRange([height, 0]);
 *      var scaleX = new Scale()
 *          .setDomain(data.length)
 *          .setRange([0, width]);
 */
function Scale() {
    this.domain = {};
    this.range = {};
}
Scale.prototype = {
    /**
     *设置坐标尺定义域,<br>
     * 如果第一个参数是数组定义域范围是数组两个值的中间范围,<br>
     * 如果第一个参数不是数组，是数字，定义域范围是（0-参数值）
     * @method setDomain
     */
    setDomain: function () {
        if (arguments[0] instanceof Array) {
            this.domain.start = arguments[0][0];
            this.domain.end = arguments[0][1];
            if (arguments[0][0] > arguments[0][1]) {
                this.domain.min = arguments[0][1];
                this.domain.max = arguments[0][0];
            } else {
                this.domain.min = arguments[0][0];
                this.domain.max = arguments[0][1];
            }
        } else {
            this.domain.start=this.domain.min = 0;
            this.domain.end=this.domain.max = arguments[0];
        }

        return this;
    },
    /**
     *设置坐标尺值域
     * @method setRange
     * **/
    setRange: function (start, end) {
        if (arguments[0] instanceof Array) {
            this.range.start = arguments[0][0];
            this.range.end = arguments[0][1];
            if (arguments[0][0] > arguments[0][1]) {
                this.range.min = arguments[0][1];
                this.range.max = arguments[0][0];
            } else {
                this.range.min = arguments[0][0];
                this.range.max = arguments[0][1];
            }
        }

        return this;
    },
    /**
     *输入定义域一个值，输出值域对应值
     * @method getDomain
     * **/
    getDomain: function (pargm) {
        var d = this.domain.end - this.domain.start;
        var r = this.range.end - this.range.start;
        if (!(this.range.max >= pargm && pargm >= this.range.min)) return "参数不在值域内";
        var b = d / r;
        if (d < 0) return this.domain.max + b * (pargm - this.range.start);
        return b * (pargm - this.range.start) + this.domain.min;
    },
    /**
     *输入定义域一个值，输出值域对应值
     * @method getRange
     * **/
    getRange: function (pargm) {
        var d = this.domain.end - this.domain.start;
        var r = this.range.end - this.range.start;
        if (!(this.domain.max >= pargm && pargm >= this.domain.min)) return "参数不在定义域内";
        var b = r / d;
        if (r < 0) return this.range.max + b * (pargm - this.domain.start);
        return b * (pargm - this.domain.start) + this.range.min;
    }
};
module.exports=Scale;
},{}],41:[function(require,module,exports){
/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/Group
 * @example
 *     var Group = require('zrender/Group');
 *     var Circle = require('zrender/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.addChild(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *             brushType: 'fill'
 *         }
 *     }));
 *     zr.addGroup(g);
 */


var guid = require('./tool/guid');
var util = require('./tool/util');

var Transformable = require('./mixin/Transformable');
var Eventful = require('./mixin/Eventful');

/**
 * @alias module:zrender/Group
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @extends module:zrender/mixin/Eventful
 */
var Group = function (options) {

    options = options || {};

    /**
     * Group id
     * @type {string}
     */
    this.id = options.id || guid();

    for (var key in options) {
        this[key] = options[key];
    }

    /**
     * @type {string}
     */
    this.type = 'group';

    /**
     * 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪
     * 该图形会继承Group的变换
     * @type {module:zrender/shape/Base}
     * @see http://www.w3.org/TR/2dcontext/#clipping-region
     */
    this.clipShape = null;

    this._children = [];

    this._storage = null;

    this.__dirty = true;

    // Mixin
    Transformable.call(this);
    Eventful.call(this);
};

/**
 * 是否忽略该 Group 及其所有子节点
 * @type {boolean}
 * @default false
 */
Group.prototype.ignore = false;

/**
 * 复制并返回一份新的包含所有儿子节点的数组
 * @return {Array.<module:zrender/Group|module:zrender/shape/Base>}
 */
Group.prototype.children = function () {
    return this._children.slice();
};

/**
 * 获取指定 index 的儿子节点
 * @param  {number} idx
 * @return {module:zrender/Group|module:zrender/shape/Base}
 */
Group.prototype.childAt = function (idx) {
    return this._children[idx];
};

/**
 * 添加子节点，可以是Shape或者Group
 * @param {module:zrender/Group|module:zrender/shape/Base} child
 */
    // TODO Type Check
Group.prototype.addChild = function (child) {
    if (child == this) {
        return;
    }

    if (child.parent == this) {
        return;
    }
    if (child.parent) {
        child.parent.removeChild(child);
    }

    this._children.push(child);
    child.parent = this;

    if (this._storage && this._storage !== child._storage) {

        this._storage.addToMap(child);

        if (child instanceof Group) {
            child.addChildrenToStorage(this._storage);
        }
    }
};

/**
 * 移除子节点
 * @param {module:zrender/Group|module:zrender/shape/Base} child
 */
    // TODO Type Check
Group.prototype.removeChild = function (child) {
    var idx = util.indexOf(this._children, child);

    if (idx >= 0) {
        this._children.splice(idx, 1);
    }
    child.parent = null;

    if (this._storage) {

        this._storage.delFromMap(child.id);

        if (child instanceof Group) {
            child.delChildrenFromStorage(this._storage);
        }
    }
};

/**
 * 移除所有子节点
 */
Group.prototype.clearChildren = function () {
    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (this._storage) {
            this._storage.delFromMap(child.id);
            if (child instanceof Group) {
                child.delChildrenFromStorage(this._storage);
            }
        }
    }
    this._children.length = 0;
};

/**
 * 遍历所有子节点
 * @param  {Function} cb
 * @param  {}   context
 */
Group.prototype.eachChild = function (cb, context) {
    var haveContext = !!context;
    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (haveContext) {
            cb.call(context, child);
        } else {
            cb(child);
        }
    }
};

/**
 * 深度优先遍历所有子孙节点
 * @param  {Function} cb
 * @param  {}   context
 */
Group.prototype.traverse = function (cb, context) {
    var haveContext = !!context;
    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (haveContext) {
            cb.call(context, child);
        } else {
            cb(child);
        }

        if (child.type === 'group') {
            child.traverse(cb, context);
        }
    }
};

Group.prototype.addChildrenToStorage = function (storage) {
    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        storage.addToMap(child);
        if (child instanceof Group) {
            child.addChildrenToStorage(storage);
        }
    }
};

Group.prototype.delChildrenFromStorage = function (storage) {
    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        storage.delFromMap(child.id);
        if (child instanceof Group) {
            child.delChildrenFromStorage(storage);
        }
    }
};

Group.prototype.modSelf = function () {
    this.__dirty = true;
};

util.merge(Group.prototype, Transformable.prototype, true);
util.merge(Group.prototype, Eventful.prototype, true);

module.exports = Group;

},{"./mixin/Eventful":51,"./mixin/Transformable":52,"./tool/guid":69,"./tool/util":72}],42:[function(require,module,exports){
/**
 * Handler控制模块
 * @module zrender/Handler
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 *
 */
// TODO mouseover 只触发一次


var config = require('./config');
var env = require('./tool/env');
var eventTool = require('./tool/event');
var util = require('./tool/util');
var vec2 = require('./tool/vector');
var mat2d = require('./tool/matrix');
var EVENT = config.EVENT;

var Eventful = require('./mixin/Eventful');

var domHandlerNames = [
    'resize', 'click', 'dblclick',
    'mousewheel', 'mousemove', 'mouseout', 'mouseup', 'mousedown',
    'touchstart', 'touchend', 'touchmove'
];

var domHandlers = {
    /**
     * 窗口大小改变响应函数
     * @inner
     * @param {Event} event
     */
    resize: function (event) {
        event = event || window.event;
        this._lastHover = null;
        this._isMouseDown = 0;

        // 分发config.EVENT.RESIZE事件，global
        this.dispatch(EVENT.RESIZE, event);
    },

    /**
     * 点击响应函数
     * @inner
     * @param {Event} event
     */
    click: function (event) {
        event = this._zrenderEventFixed(event);

        // 分发config.EVENT.CLICK事件
        var _lastHover = this._lastHover;
        if ((_lastHover && _lastHover.clickable) || !_lastHover) {

            // 判断没有发生拖拽才触发click事件
            if (this._clickThreshold < 5) {
                this._dispatchAgency(_lastHover, EVENT.CLICK, event);
            }
        }

        this._mousemoveHandler(event);
    },

    /**
     * 双击响应函数
     * @inner
     * @param {Event} event
     */
    dblclick: function (event) {
        event = event || window.event;
        event = this._zrenderEventFixed(event);

        // 分发config.EVENT.DBLCLICK事件
        var _lastHover = this._lastHover;
        if ((_lastHover && _lastHover.clickable) || !_lastHover) {

            // 判断没有发生拖拽才触发dblclick事件
            if (this._clickThreshold < 5) {
                this._dispatchAgency(_lastHover, EVENT.DBLCLICK, event);
            }
        }

        this._mousemoveHandler(event);
    },


    /**
     * 鼠标滚轮响应函数
     * @inner
     * @param {Event} event
     */
    mousewheel: function (event) {
        event = this._zrenderEventFixed(event);

        // http://www.sitepoint.com/html5-javascript-mouse-wheel/
        // https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
        var delta = event.wheelDelta || -event.detail;// Webkit// Firefox
        var scale = delta > 0 ? 1.1 : 1 / 1.1;

        var needsRefresh = false;

        var mouseX = this._mouseX;
        var mouseY = this._mouseY;
        this.painter.eachBuildinLayer(function (layer) {
            var pos = layer.position;
            if (layer.zoomable) {
                layer.__zoom = layer.__zoom || 1;
                var newZoom = layer.__zoom;
                newZoom *= scale;
                newZoom = Math.max(
                    Math.min(layer.maxZoom, newZoom),
                    layer.minZoom
                );
                scale = newZoom / layer.__zoom;
                layer.__zoom = newZoom;
                // Keep the mouse center when scaling
                pos[0] -= (mouseX - pos[0]) * (scale - 1);
                pos[1] -= (mouseY - pos[1]) * (scale - 1);
                layer.scale[0] *= scale;
                layer.scale[1] *= scale;
                layer.dirty = true;
                needsRefresh = true;

                // Prevent browser default scroll action
                eventTool.stop(event);
            }
        });
        if (needsRefresh) {
            this.painter.refresh();
        }

        // 分发config.EVENT.MOUSEWHEEL事件
        this._dispatchAgency(this._lastHover, EVENT.MOUSEWHEEL, event);
        this._mousemoveHandler(event);
    },

    /**
     * 鼠标（手指）移动响应函数
     * @inner
     * @param {Event} event
     */
    mousemove: function (event) {
        if (this.painter.isLoading()) {
            return;
        }

        event = this._zrenderEventFixed(event);
        this._lastX = this._mouseX;
        this._lastY = this._mouseY;
        this._mouseX = eventTool.getX(event);
        this._mouseY = eventTool.getY(event);
        var dx = this._mouseX - this._lastX;
        var dy = this._mouseY - this._lastY;

        // 可能出现config.EVENT.DRAGSTART事件
        // 避免手抖点击误认为拖拽
        // if (this._mouseX - this._lastX > 1 || this._mouseY - this._lastY > 1) {
        this._processDragStart(event);
        // }
        this._hasfound = 0;
        this._event = event;

        this._iterateAndFindHover();

        // 找到的在迭代函数里做了处理，没找到得在迭代完后处理
        if (!this._hasfound) {
            // 过滤首次拖拽产生的mouseout和dragLeave
            if (!this._draggingTarget || (this._lastHover && this._lastHover != this._draggingTarget)
            ) {
                // 可能出现config.EVENT.MOUSEOUT事件
                this._processOutShape(event);

                // 可能出现config.EVENT.DRAGLEAVE事件
                this._processDragLeave(event);
            }

            this._lastHover = null;
            this.storage.delHover();
            this.painter.clearHover();
        }

        // set cursor for root element
        var cursor = 'default';

        // 如果存在拖拽中元素，被拖拽的图形元素最后addHover
        if (this._draggingTarget) {
            this.storage.drift(this._draggingTarget.id, dx, dy);
            this._draggingTarget.modSelf();
            this.storage.addHover(this._draggingTarget);

            // 拖拽不触发click事件
            this._clickThreshold++;
        }
        else if (this._isMouseDown) {
            var needsRefresh = false;
            // Layer dragging
            this.painter.eachBuildinLayer(function (layer) {
                if (layer.panable) {
                    // PENDING
                    cursor = 'move';
                    // Keep the mouse center when scaling
                    layer.position[0] += dx;
                    layer.position[1] += dy;
                    needsRefresh = true;
                    layer.dirty = true;
                }
            });
            if (needsRefresh) {
                this.painter.refresh();
            }
        }

        if (this._draggingTarget || (this._hasfound && this._lastHover.draggable)) {
            cursor = 'move';
        }
        else if (this._hasfound && this._lastHover.clickable) {
            cursor = 'pointer';
        }
        this.root.style.cursor = cursor;

        // 分发config.EVENT.MOUSEMOVE事件
        this._dispatchAgency(this._lastHover, EVENT.MOUSEMOVE, event);

        if (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) {
            this.painter.refreshHover();
        }
    },

    /**
     * 鼠标（手指）离开响应函数
     * @inner
     * @param {Event} event
     */
    mouseout: function (event) {
        event = this._zrenderEventFixed(event);

        var element = event.toElement || event.relatedTarget;
        if (element != this.root) {
            while (element && element.nodeType != 9) {
                // 忽略包含在root中的dom引起的mouseOut
                if (element == this.root) {
                    this._mousemoveHandler(event);
                    return;
                }

                element = element.parentNode;
            }
        }

        event.zrenderX = this._lastX;
        event.zrenderY = this._lastY;
        this.root.style.cursor = 'default';
        this._isMouseDown = 0;

        this._processOutShape(event);
        this._processDrop(event);
        this._processDragEnd(event);
        if (!this.painter.isLoading()) {
            this.painter.refreshHover();
        }

        this.dispatch(EVENT.GLOBALOUT, event);
    },

    /**
     * 鼠标（手指）按下响应函数
     * @inner
     * @param {Event} event
     */
    mousedown: function (event) {
        // 重置 clickThreshold
        this._clickThreshold = 0;

        if (this._lastDownButton == 2) {
            this._lastDownButton = event.button;
            this._mouseDownTarget = null;
            // 仅作为关闭右键菜单使用
            return;
        }

        this._lastMouseDownMoment = new Date();
        event = this._zrenderEventFixed(event);
        this._isMouseDown = 1;

        // 分发config.EVENT.MOUSEDOWN事件
        this._mouseDownTarget = this._lastHover;
        this._dispatchAgency(this._lastHover, EVENT.MOUSEDOWN, event);
        this._lastDownButton = event.button;
    },

    /**
     * 鼠标（手指）抬起响应函数
     * @inner
     * @param {Event} event
     */
    mouseup: function (event) {
        event = this._zrenderEventFixed(event);
        this.root.style.cursor = 'default';
        this._isMouseDown = 0;
        this._mouseDownTarget = null;

        // 分发config.EVENT.MOUSEUP事件
        this._dispatchAgency(this._lastHover, EVENT.MOUSEUP, event);
        this._processDrop(event);
        this._processDragEnd(event);
    },

    /**
     * Touch开始响应函数
     * @inner
     * @param {Event} event
     */
    touchstart: function (event) {
        // eventTool.stop(event);// 阻止浏览器默认事件，重要
        event = this._zrenderEventFixed(event, true);
        this._lastTouchMoment = new Date();

        // 平板补充一次findHover
        this._mobileFindFixed(event);
        this._mousedownHandler(event);
    },

    /**
     * Touch移动响应函数
     * @inner
     * @param {Event} event
     */
    touchmove: function (event) {
        event = this._zrenderEventFixed(event, true);
        this._mousemoveHandler(event);
        if (this._isDragging) {
            eventTool.stop(event);// 阻止浏览器默认事件，重要
        }
    },

    /**
     * Touch结束响应函数
     * @inner
     * @param {Event} event
     */
    touchend: function (event) {
        // eventTool.stop(event);// 阻止浏览器默认事件，重要
        event = this._zrenderEventFixed(event, true);
        this._mouseupHandler(event);

        var now = new Date();
        if (now - this._lastTouchMoment < EVENT.touchClickDelay) {
            this._mobileFindFixed(event);
            this._clickHandler(event);
            if (now - this._lastClickMoment < EVENT.touchClickDelay / 2) {
                this._dblclickHandler(event);
                if (this._lastHover && this._lastHover.clickable) {
                    eventTool.stop(event);// 阻止浏览器默认事件，重要
                }
            }
            this._lastClickMoment = now;
        }
        this.painter.clearHover();
    }
};

/**
 * bind一个参数的function
 *
 * @inner
 * @param {Function} handler 要bind的function
 * @param {Object} context 运行时this环境
 * @return {Function}
 */
function bind1Arg(handler, context) {
    return function (e) {
        return handler.call(context, e);
    };
}
/**function bind2Arg(handler, context) {
            return function (arg1, arg2) {
                return handler.call(context, arg1, arg2);
            };
        }*/

function bind3Arg(handler, context) {
    return function (arg1, arg2, arg3) {
        return handler.call(context, arg1, arg2, arg3);
    };
}
/**
 * 为控制类实例初始化dom 事件处理函数
 *
 * @inner
 * @param {module:zrender/Handler} instance 控制类实例
 */
function initDomHandler(instance) {
    var len = domHandlerNames.length;
    while (len--) {
        var name = domHandlerNames[len];
        instance['_' + name + 'Handler'] = bind1Arg(domHandlers[name], instance);
    }
}

/**
 * @alias module:zrender/Handler
 * @constructor
 * @extends module:zrender/mixin/Eventful
 * @param {HTMLElement} root 绘图区域
 * @param {module:zrender/Storage} storage Storage实例
 * @param {module:zrender/Painter} painter Painter实例
 */
var Handler = function (root, storage, painter) {
    // 添加事件分发器特性
    Eventful.call(this);

    this.root = root;
    this.storage = storage;
    this.painter = painter;

    // 各种事件标识的私有变量
    // this._hasfound = false;              //是否找到hover图形元素
    // this._lastHover = null;              //最后一个hover图形元素
    // this._mouseDownTarget = null;
    // this._draggingTarget = null;         //当前被拖拽的图形元素
    // this._isMouseDown = false;
    // this._isDragging = false;
    // this._lastMouseDownMoment;
    // this._lastTouchMoment;
    // this._lastDownButton;

    this._lastX =
        this._lastY =
            this._mouseX =
                this._mouseY = 0;

    this._findHover = bind3Arg(findHover, this);
    this._domHover = painter.getDomHover();
    initDomHandler(this);

    // 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
    if (window.addEventListener) {
        window.addEventListener('resize', this._resizeHandler);

        if (env.os.tablet || env.os.phone) {
            // mobile支持
            root.addEventListener('touchstart', this._touchstartHandler);
            root.addEventListener('touchmove', this._touchmoveHandler);
            root.addEventListener('touchend', this._touchendHandler);
        }
        else {
            // mobile的click/move/up/down自己模拟
            root.addEventListener('click', this._clickHandler);
            root.addEventListener('dblclick', this._dblclickHandler);
            root.addEventListener('mousewheel', this._mousewheelHandler);
            root.addEventListener('mousemove', this._mousemoveHandler);
            root.addEventListener('mousedown', this._mousedownHandler);
            root.addEventListener('mouseup', this._mouseupHandler);
        }
        root.addEventListener('DOMMouseScroll', this._mousewheelHandler);
        root.addEventListener('mouseout', this._mouseoutHandler);
    }
    else {
        window.attachEvent('onresize', this._resizeHandler);

        root.attachEvent('onclick', this._clickHandler);
        //root.attachEvent('ondblclick ', this._dblclickHandler);
        root.ondblclick = this._dblclickHandler;
        root.attachEvent('onmousewheel', this._mousewheelHandler);
        root.attachEvent('onmousemove', this._mousemoveHandler);
        root.attachEvent('onmouseout', this._mouseoutHandler);
        root.attachEvent('onmousedown', this._mousedownHandler);
        root.attachEvent('onmouseup', this._mouseupHandler);
    }
};

/**
 * 自定义事件绑定
 * @param {string} eventName 事件名称，resize，hover，drag，etc~
 * @param {Function} handler 响应函数
 * @param {Object} [context] 响应函数
 */
Handler.prototype.on = function (eventName, handler, context) {
    this.bind(eventName, handler, context);
    return this;
};

/**
 * 自定义事件解绑
 * @param {string} eventName 事件名称，resize，hover，drag，etc~
 * @param {Function} handler 响应函数
 */
Handler.prototype.un = function (eventName, handler) {
    this.unbind(eventName, handler);
    return this;
};

/**
 * 事件触发
 * @param {string} eventName 事件名称，resize，hover，drag，etc~
 * @param {event=} eventArgs event dom事件对象
 */
Handler.prototype.trigger = function (eventName, eventArgs) {
    switch (eventName) {
        case EVENT.RESIZE:
        case EVENT.CLICK:
        case EVENT.DBLCLICK:
        case EVENT.MOUSEWHEEL:
        case EVENT.MOUSEMOVE:
        case EVENT.MOUSEDOWN:
        case EVENT.MOUSEUP:
        case EVENT.MOUSEOUT:
            this['_' + eventName + 'Handler'](eventArgs);
            break;
    }
};

/**
 * 释放，解绑所有事件
 */
Handler.prototype.dispose = function () {
    var root = this.root;

    if (window.removeEventListener) {
        window.removeEventListener('resize', this._resizeHandler);

        if (env.os.tablet || env.os.phone) {
            // mobile支持
            root.removeEventListener('touchstart', this._touchstartHandler);
            root.removeEventListener('touchmove', this._touchmoveHandler);
            root.removeEventListener('touchend', this._touchendHandler);
        }
        else {
            // mobile的click自己模拟
            root.removeEventListener('click', this._clickHandler);
            root.removeEventListener('dblclick', this._dblclickHandler);
            root.removeEventListener('mousewheel', this._mousewheelHandler);
            root.removeEventListener('mousemove', this._mousemoveHandler);
            root.removeEventListener('mousedown', this._mousedownHandler);
            root.removeEventListener('mouseup', this._mouseupHandler);
        }
        root.removeEventListener('DOMMouseScroll', this._mousewheelHandler);
        root.removeEventListener('mouseout', this._mouseoutHandler);
    }
    else {
        window.detachEvent('onresize', this._resizeHandler);

        root.detachEvent('onclick', this._clickHandler);
        root.detachEvent('dblclick', this._dblclickHandler);
        root.detachEvent('onmousewheel', this._mousewheelHandler);
        root.detachEvent('onmousemove', this._mousemoveHandler);
        root.detachEvent('onmouseout', this._mouseoutHandler);
        root.detachEvent('onmousedown', this._mousedownHandler);
        root.detachEvent('onmouseup', this._mouseupHandler);
    }

    this.root =
        this._domHover =
            this.storage =
                this.painter = null;

    this.un();
};

/**
 * 拖拽开始
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDragStart = function (event) {
    var _lastHover = this._lastHover;

    if (this._isMouseDown && _lastHover && _lastHover.draggable && !this._draggingTarget && this._mouseDownTarget == _lastHover) {
        // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
        if (_lastHover.dragEnableTime &&
            new Date() - this._lastMouseDownMoment < _lastHover.dragEnableTime
        ) {
            return;
        }

        var _draggingTarget = _lastHover;
        this._draggingTarget = _draggingTarget;
        this._isDragging = 1;

        _draggingTarget.invisible = true;
        this.storage.mod(_draggingTarget.id);

        // 分发config.EVENT.DRAGSTART事件
        this._dispatchAgency(
            _draggingTarget,
            EVENT.DRAGSTART,
            event
        );
        this.painter.refresh();
    }
};

/**
 * 拖拽进入目标元素
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDragEnter = function (event) {
    if (this._draggingTarget) {
        // 分发config.EVENT.DRAGENTER事件
        this._dispatchAgency(
            this._lastHover,
            EVENT.DRAGENTER,
            event,
            this._draggingTarget
        );
    }
};

/**
 * 拖拽在目标元素上移动
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDragOver = function (event) {
    if (this._draggingTarget) {
        // 分发config.EVENT.DRAGOVER事件
        this._dispatchAgency(
            this._lastHover,
            EVENT.DRAGOVER,
            event,
            this._draggingTarget
        );
    }
};

/**
 * 拖拽离开目标元素
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDragLeave = function (event) {
    if (this._draggingTarget) {
        // 分发config.EVENT.DRAGLEAVE事件
        this._dispatchAgency(
            this._lastHover,
            EVENT.DRAGLEAVE,
            event,
            this._draggingTarget
        );
    }
};

/**
 * 拖拽在目标元素上完成
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDrop = function (event) {
    if (this._draggingTarget) {
        this._draggingTarget.invisible = false;
        this.storage.mod(this._draggingTarget.id);
        this.painter.refresh();

        // 分发config.EVENT.DROP事件
        this._dispatchAgency(
            this._lastHover,
            EVENT.DROP,
            event,
            this._draggingTarget
        );
    }
};

/**
 * 拖拽结束
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processDragEnd = function (event) {
    if (this._draggingTarget) {
        // 分发config.EVENT.DRAGEND事件
        this._dispatchAgency(
            this._draggingTarget,
            EVENT.DRAGEND,
            event
        );

        this._lastHover = null;
    }

    this._isDragging = 0;
    this._draggingTarget = null;
};

/**
 * 鼠标在某个图形元素上移动
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processOverShape = function (event) {
    // 分发config.EVENT.MOUSEOVER事件
    this._dispatchAgency(this._lastHover, EVENT.MOUSEOVER, event);
};

/**
 * 鼠标离开某个图形元素
 *
 * @private
 * @param {Object} event 事件对象
 */
Handler.prototype._processOutShape = function (event) {
    // 分发config.EVENT.MOUSEOUT事件
    this._dispatchAgency(this._lastHover, EVENT.MOUSEOUT, event);
};

/**
 * 事件分发代理
 *
 * @private
 * @param {Object} targetShape 目标图形元素
 * @param {string} eventName 事件名称
 * @param {Object} event 事件对象
 * @param {Object=} draggedShape 拖拽事件特有，当前被拖拽图形元素
 */
Handler.prototype._dispatchAgency = function (targetShape, eventName, event, draggedShape) {
    var eventHandler = 'on' + eventName;
    var eventPacket = {
        type: eventName,
        event: event,
        target: targetShape,
        cancelBubble: false
    };

    var el = targetShape;

    if (draggedShape) {
        eventPacket.dragged = draggedShape;
    }

    while (el) {
        if (el[eventHandler]) eventPacket.cancelBubble = el[eventHandler](eventPacket);
        el.dispatch(eventName, eventPacket);

        el = el.parent;

        if (eventPacket.cancelBubble) {
            break;
        }
    }

    if (targetShape) {
        // 冒泡到顶级 zrender 对象
        if (!eventPacket.cancelBubble) {
            this.dispatch(eventName, eventPacket);
        }
    }
    else if (!draggedShape) {
        // 无hover目标，无拖拽对象，原生事件分发
        var eveObj = {
            type: eventName,
            event: event
        };
        this.dispatch(eventName, eveObj);
        // 分发事件到用户自定义层
        this.painter.eachOtherLayer(function (layer) {
            if (typeof(layer[eventHandler]) == 'function') {
                layer[eventHandler](eveObj);
            }
            if (layer.dispatch) {
                layer.dispatch(eventName, eveObj);
            }
        });
    }
};

/**
 * 迭代寻找hover shape
 * @private
 * @method
 */
Handler.prototype._iterateAndFindHover = (function () {
    var invTransform = mat2d.create();
    return function () {
        var list = this.storage.getShapeList();
        var currentZLevel;
        var currentLayer;
        var tmp = [0, 0];
        for (var i = list.length - 1; i >= 0; i--) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                currentLayer = this.painter.getLayer(shape.zlevel, currentLayer);
                tmp[0] = this._mouseX;
                tmp[1] = this._mouseY;

                if (currentLayer.needTransform) {
                    mat2d.invert(invTransform, currentLayer.transform);
                    vec2.applyTransform(tmp, tmp, invTransform);
                }
            }

            if (this._findHover(shape, tmp[0], tmp[1])) {
                break;
            }
        }
    };
})();

// touch指尖错觉的尝试偏移量配置
var MOBILE_TOUCH_OFFSETS = [
    {x: 10},
    {x: -20},
    {x: 10, y: 10},
    {y: -20}
];

// touch有指尖错觉，四向尝试，让touch上的点击更好触发事件
Handler.prototype._mobileFindFixed = function (event) {
    this._lastHover = null;
    this._mouseX = event.zrenderX;
    this._mouseY = event.zrenderY;

    this._event = event;

    this._iterateAndFindHover();
    for (var i = 0; !this._lastHover && i < MOBILE_TOUCH_OFFSETS.length; i++) {
        var offset = MOBILE_TOUCH_OFFSETS[i];
        if (offset.x) (this._mouseX += offset.x);
        if (offset.y) (this._mouseY += offset.y);

        this._iterateAndFindHover();
    }

    if (this._lastHover) {
        event.zrenderX = this._mouseX;
        event.zrenderY = this._mouseY;
    }
};

/**
 * 迭代函数，查找hover到的图形元素并即时做些事件分发
 *
 * @inner
 * @param {Object} shape 图形元素
 * @param {number} x
 * @param {number} y
 */
function findHover(shape, x, y) {
    if (
        (this._draggingTarget && this._draggingTarget.id == shape.id) || shape.isSilent() // 迭代到当前拖拽的图形上// 打酱油的路过，啥都不响应的shape~
    ) {
        return false;
    }

    var event = this._event;
    if (shape.isCover(x, y)) {
        if (shape.hoverable) {
            this.storage.addHover(shape);
        }
        // 查找是否在 clipShape 中
        var p = shape.parent;
        while (p) {
            if (p.clipShape && !p.clipShape.isCover(this._mouseX, this._mouseY)) {
                // 已经被祖先 clip 掉了
                return false;
            }
            p = p.parent;
        }

        if (this._lastHover != shape) {
            this._processOutShape(event);

            // 可能出现config.EVENT.DRAGLEAVE事件
            this._processDragLeave(event);

            this._lastHover = shape;

            // 可能出现config.EVENT.DRAGENTER事件
            this._processDragEnter(event);
        }

        this._processOverShape(event);

        // 可能出现config.EVENT.DRAGOVER
        this._processDragOver(event);

        this._hasfound = 1;

        return true;    // 找到则中断迭代查找
    }

    return false;
}

/**
 * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标
 *
 * @private
 */
Handler.prototype._zrenderEventFixed = function (event, isTouch) {
    if (event.zrenderFixed) {
        return event;
    }

    if (!isTouch) {
        event = event || window.event;
        // 进入对象优先~
        var target = event.toElement || event.relatedTarget || event.srcElement || event.target;

        if (target && target != this._domHover) {
            event.zrenderX = (typeof event.offsetX != 'undefined' ? event.offsetX : event.layerX) + target.offsetLeft;
            event.zrenderY = (typeof event.offsetY != 'undefined' ? event.offsetY : event.layerY) + target.offsetTop;
        }
    }
    else {
        var touch = event.type != 'touchend' ? event.targetTouches[0] : event.changedTouches[0];
        if (touch) {
            var rBounding = this.painter._domRoot.getBoundingClientRect();
            // touch事件坐标是全屏的~
            event.zrenderX = touch.clientX - rBounding.left;
            event.zrenderY = touch.clientY - rBounding.top;
        }
    }

    event.zrenderFixed = 1;
    return event;
};

util.merge(Handler.prototype, Eventful.prototype, true);

module.exports = Handler;

},{"./config":49,"./mixin/Eventful":51,"./tool/env":67,"./tool/event":68,"./tool/matrix":71,"./tool/util":72,"./tool/vector":73}],43:[function(require,module,exports){
/**
 * @module zrender/Layer
 * @author pissang(https://www.github.com/pissang)
 */


var Transformable = require('./mixin/Transformable');
var util = require('./tool/util');
var vmlCanvasManager = window['G_vmlCanvasManager'];
var config = require('./config');

function returnFalse() {
    return false;
}

/**
 * 创建dom
 *
 * @inner
 * @param {string} id dom id 待用
 * @param {string} type dom type，such as canvas, div etc.
 * @param {Painter} painter painter instance
 */
function createDom(id, type, painter) {
    var newDom = document.createElement(type);
    var width = painter.getWidth();
    var height = painter.getHeight();

    // 没append呢，请原谅我这样写，清晰~
    newDom.style.position = 'absolute';
    newDom.style.left = 0;
    newDom.style.top = 0;
    newDom.style.width = width + 'px';
    newDom.style.height = height + 'px';
    newDom.width = width * config.devicePixelRatio;
    newDom.height = height * config.devicePixelRatio;

    // id不作为索引用，避免可能造成的重名，定义为私有属性
    newDom.setAttribute('data-zr-dom-id', id);
    return newDom;
}

/**
 * @alias module:zrender/Layer
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @param {string} id
 * @param {module:zrender/Painter} painter
 */
var Layer = function (id, painter) {

    this.id = id;

    this.dom = createDom(id, 'canvas', painter);
    this.dom.onselectstart = returnFalse; // 避免页面选中的尴尬
    this.dom.style['-webkit-user-select'] = 'none';
    this.dom.style['user-select'] = 'none';
    this.dom.style['-webkit-touch-callout'] = 'none';
    this.dom.style['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';

    vmlCanvasManager && vmlCanvasManager.initElement(this.dom);

    this.domBack = null;
    this.ctxBack = null;

    this.painter = painter;

    this.unusedCount = 0;

    this.config = null;

    this.dirty = true;

    this.elCount = 0;

    // Configs
    /**
     * 每次清空画布的颜色
     * @type {string}
     * @default 0
     */
    this.clearColor = 0;
    /**
     * 是否开启动态模糊
     * @type {boolean}
     * @default false
     */
    this.motionBlur = false;
    /**
     * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
     * @type {number}
     * @default 0.7
     */
    this.lastFrameAlpha = 0.7;
    /**
     * 层是否支持鼠标平移操作
     * @type {boolean}
     * @default false
     */
    this.zoomable = false;
    /**
     * 层是否支持鼠标缩放操作
     * @type {boolean}
     * @default false
     */
    this.panable = false;

    this.maxZoom = Infinity;
    this.minZoom = 0;

    Transformable.call(this);
};

Layer.prototype.initContext = function () {
    this.ctx = this.dom.getContext('2d');

    var dpr = config.devicePixelRatio;
    if (dpr != 1) {
        this.ctx.scale(dpr, dpr);
    }
};

Layer.prototype.createBackBuffer = function () {
    if (vmlCanvasManager) { // IE 8- should not support back buffer
        return;
    }
    this.domBack = createDom('back-' + this.id, 'canvas', this.painter);
    this.ctxBack = this.domBack.getContext('2d');

    var dpr = config.devicePixelRatio;

    if (dpr != 1) {
        this.ctxBack.scale(dpr, dpr);
    }
};

/**
 * @param  {number} width
 * @param  {number} height
 */
Layer.prototype.resize = function (width, height) {
    var dpr = config.devicePixelRatio;

    this.dom.style.width = width + 'px';
    this.dom.style.height = height + 'px';

    this.dom.setAttribute('width', width * dpr);
    this.dom.setAttribute('height', height * dpr);

    if (dpr != 1) {
        this.ctx.scale(dpr, dpr);
    }

    if (this.domBack) {
        this.domBack.setAttribute('width', width * dpr);
        this.domBack.setAttribute('height', height * dpr);

        if (dpr != 1) {
            this.ctxBack.scale(dpr, dpr);
        }
    }
};

/**
 * 清空该层画布
 */
Layer.prototype.clear = function () {
    var dom = this.dom;
    var ctx = this.ctx;
    var width = dom.width;
    var height = dom.height;

    var haveClearColor = this.clearColor && !vmlCanvasManager;
    var haveMotionBLur = this.motionBlur && !vmlCanvasManager;
    var lastFrameAlpha = this.lastFrameAlpha;

    var dpr = config.devicePixelRatio;

    if (haveMotionBLur) {
        if (!this.domBack) {
            this.createBackBuffer();
        }

        this.ctxBack.globalCompositeOperation = 'copy';
        this.ctxBack.drawImage(
            dom, 0, 0,
            width / dpr,
            height / dpr
        );
    }

    ctx.clearRect(0, 0, width / dpr, height / dpr);
    if (haveClearColor) {
        ctx.save();
        ctx.fillStyle = this.clearColor;
        ctx.fillRect(0, 0, width / dpr, height / dpr);
        ctx.restore();
    }

    if (haveMotionBLur) {
        var domBack = this.domBack;
        ctx.save();
        ctx.globalAlpha = lastFrameAlpha;
        ctx.drawImage(domBack, 0, 0, width / dpr, height / dpr);
        ctx.restore();
    }
};

util.merge(Layer.prototype, Transformable.prototype);

module.exports = Layer;

},{"./config":49,"./mixin/Transformable":52,"./tool/util":72}],44:[function(require,module,exports){
/**
 * Painter绘图模块
 * @module zrender/Painter
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */

var config = require('./config');
var util = require('./tool/util');
// var vec2 = require('./tool/vector');
var log = require('./tool/log');
// var matrix = require('./tool/matrix');
var BaseLoadingEffect = require('./loadingEffect/Base');

var Layer = require('./Layer');

// 返回false的方法，用于避免页面被选中
function returnFalse() {
    return false;
}

// 什么都不干的空方法
function doNothing() {
}

function isLayerValid(layer) {
    if (!layer) {
        return false;
    }

    if (layer.isBuildin) {
        return true;
    }

    if (typeof(layer.resize) !== 'function' || typeof(layer.refresh) !== 'function'
    ) {
        return false;
    }

    return true;
}

/**
 * @alias module:zrender/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 */
var Painter = function (root, storage) {
    /**
     * 绘图容器
     * @type {HTMLElement}
     */
    this.root = root;
    root.style['-webkit-tap-highlight-color'] = 'transparent';
    root.style['-webkit-user-select'] = 'none';
    root.style['user-select'] = 'none';
    root.style['-webkit-touch-callout'] = 'none';

    /**
     * @type {module:zrender/Storage}
     */
    this.storage = storage;

    root.innerHTML = '';
    this._width = this._getWidth(); // 宽，缓存记录
    this._height = this._getHeight(); // 高，缓存记录

    var domRoot = document.createElement('div');
    this._domRoot = domRoot;

    // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
    domRoot.style.position = 'relative';
    domRoot.style.overflow = 'hidden';
    domRoot.style.width = this._width + 'px';
    domRoot.style.height = this._height + 'px';
    root.appendChild(domRoot);

    this._layers = {};

    this._zlevelList = [];

    this._layerConfig = {};

    this._loadingEffect = new BaseLoadingEffect({});
    this.shapeToImage = this._createShapeToImageProcessor();

    // 创建各层canvas
    // 背景
    this._bgDom = document.createElement('div');
    this._bgDom.style.cssText = [
        'position:absolute;left:0px;top:0px;width:',
        this._width, 'px;height:', this._height + 'px;',
        '-webkit-user-select:none;user-select;none;',
        '-webkit-touch-callout:none;'
    ].join('');
    this._bgDom.setAttribute('data-zr-dom-id', 'bg');

    domRoot.appendChild(this._bgDom);
    this._bgDom.onselectstart = returnFalse;

    // 高亮
    var hoverLayer = new Layer('_zrender_hover_', this);
    this._layers.hover = hoverLayer;
    domRoot.appendChild(hoverLayer.dom);
    hoverLayer.initContext();

    hoverLayer.dom.onselectstart = returnFalse;
    hoverLayer.dom.style['-webkit-user-select'] = 'none';
    hoverLayer.dom.style['user-select'] = 'none';
    hoverLayer.dom.style['-webkit-touch-callout'] = 'none';

    // Will be injected by zrender instance
    this.refreshNextFrame = null;
};

/**
 * 首次绘图，创建各种dom和context
 *
 * @param {Function} callback 绘画结束后的回调函数
 */
Painter.prototype.render = function (callback) {
    if (this.isLoading()) {
        this.hideLoading();
    }
    // TODO
    this.refresh(callback, true);

    return this;
};

/**
 * 刷新
 * @param {Function} callback 刷新结束后的回调函数
 * @param {boolean} paintAll 强制绘制所有shape
 */
Painter.prototype.refresh = function (callback, paintAll) {
    var list = this.storage.getShapeList(true);
    this._paintList(list, paintAll);

    // Paint custum layers
    for (var i = 0; i < this._zlevelList.length; i++) {
        var z = this._zlevelList[i];
        var layer = this._layers[z];
        if (!layer.isBuildin && layer.refresh) {
            layer.refresh();
        }
    }

    if (typeof callback == 'function') {
        callback();
    }

    return this;
};

Painter.prototype._preProcessLayer = function (layer) {
    layer.unusedCount++;
    layer.updateTransform();
};

Painter.prototype._postProcessLayer = function (layer) {
    layer.dirty = false;
    // 删除过期的层
    // PENDING
    // if (layer.unusedCount >= 500) {
    //     this.delLayer(z);
    // }
    if (layer.unusedCount == 1) {
        layer.clear();
    }
};

Painter.prototype._paintList = function (list, paintAll) {

    if (typeof(paintAll) == 'undefined') {
        paintAll = false;
    }

    this._updateLayerStatus(list);

    var currentLayer;
    var currentZLevel;
    var ctx;

    this.eachBuildinLayer(this._preProcessLayer);

    // var invTransform = [];

    for (var i = 0, l = list.length; i < l; i++) {
        var shape = list[i];

        // Change draw layer
        if (currentZLevel !== shape.zlevel) {
            if (currentLayer) {
                if (currentLayer.needTransform) {
                    ctx.restore();
                }
                if (ctx.flush) ctx.flush();
            }

            currentZLevel = shape.zlevel;
            currentLayer = this.getLayer(currentZLevel);

            if (!currentLayer.isBuildin) {
                log(
                    'ZLevel ' + currentZLevel + ' has been used by unkown layer ' + currentLayer.id
                );
            }

            ctx = currentLayer.ctx;

            // Reset the count
            currentLayer.unusedCount = 0;

            if (currentLayer.dirty || paintAll) {
                currentLayer.clear();
            }

            if (currentLayer.needTransform) {
                ctx.save();
                currentLayer.setTransform(ctx);
            }
        }

        if ((currentLayer.dirty || paintAll) && !shape.invisible) {
            if (
                !shape.onbrush || (shape.onbrush && !shape.onbrush(ctx, false))
            ) {
                if (config.catchBrushException) {
                    try {
                        shape.brush(ctx, false, this.refreshNextFrame);
                    }
                    catch (error) {
                        log(
                            error,
                            'brush error of ' + shape.type,
                            shape
                        );
                    }
                }
                else {
                    shape.brush(ctx, false, this.refreshNextFrame);
                }
            }
        }

        shape.__dirty = false;
    }

    if (currentLayer) {
        if (currentLayer.needTransform) {
            ctx.restore();
        }
        if (ctx.flush) ctx.flush();
    }

    this.eachBuildinLayer(this._postProcessLayer);
};

/**
 * 获取 zlevel 所在层，如果不存在则会创建一个新的层
 * @param {number} zlevel
 * @return {module:zrender/Layer}
 */
Painter.prototype.getLayer = function (zlevel) {
    var layer = this._layers[zlevel];
    if (!layer) {
        // Create a new layer
        layer = new Layer(zlevel, this);
        layer.isBuildin = true;

        if (this._layerConfig[zlevel]) {
            util.merge(layer, this._layerConfig[zlevel], true);
        }

        layer.updateTransform();

        this.insertLayer(zlevel, layer);

        // Context is created after dom inserted to document
        // Or excanvas will get 0px clientWidth and clientHeight
        layer.initContext();
    }

    return layer;
};

Painter.prototype.insertLayer = function (zlevel, layer) {
    if (this._layers[zlevel]) {
        log('ZLevel ' + zlevel + ' has been used already');
        return;
    }
    // Check if is a valid layer
    if (!isLayerValid(layer)) {
        log('Layer of zlevel ' + zlevel + ' is not valid');
        return;
    }

    var len = this._zlevelList.length;
    var prevLayer = null;
    var i = -1;
    if (len > 0 && zlevel > this._zlevelList[0]) {
        for (i = 0; i < len - 1; i++) {
            if (
                this._zlevelList[i] < zlevel && this._zlevelList[i + 1] > zlevel
            ) {
                break;
            }
        }
        prevLayer = this._layers[this._zlevelList[i]];
    }
    this._zlevelList.splice(i + 1, 0, zlevel);

    var prevDom = prevLayer ? prevLayer.dom : this._bgDom;
    if (prevDom.nextSibling) {
        prevDom.parentNode.insertBefore(
            layer.dom,
            prevDom.nextSibling
        );
    }
    else {
        if(prevDom&&prevDom.parentNode) prevDom.parentNode.appendChild(layer.dom);
    }

    this._layers[zlevel] = layer;
};

// Iterate each layer
Painter.prototype.eachLayer = function (cb, context) {
    for (var i = 0; i < this._zlevelList.length; i++) {
        var z = this._zlevelList[i];
        cb.call(context, this._layers[z], z);
    }
};

// Iterate each buildin layer
Painter.prototype.eachBuildinLayer = function (cb, context) {
    for (var i = 0; i < this._zlevelList.length; i++) {
        var z = this._zlevelList[i];
        var layer = this._layers[z];
        if (layer&&layer.isBuildin) {
            cb.call(context, layer, z);
        }
    }
};

// Iterate each other layer except buildin layer
Painter.prototype.eachOtherLayer = function (cb, context) {
    for (var i = 0; i < this._zlevelList.length; i++) {
        var z = this._zlevelList[i];
        var layer = this._layers[z];
        if (!layer.isBuildin) {
            cb.call(context, layer, z);
        }
    }
};

/**
 * 获取所有已创建的层
 * @param {Array.<module:zrender/Layer>} [prevLayer]
 */
Painter.prototype.getLayers = function () {
    return this._layers;
};

Painter.prototype._updateLayerStatus = function (list) {

    var layers = this._layers;

    var elCounts = {};

    this.eachBuildinLayer(function (layer, z) {
        elCounts[z] = layer.elCount;
        layer.elCount = 0;
    });

    for (var i = 0, l = list.length; i < l; i++) {
        var shape = list[i];
        var zlevel = shape.zlevel;
        var layer = layers[zlevel];
        if (layer) {
            layer.elCount++;
            // 已经被标记为需要刷新
            if (layer.dirty) {
                continue;
            }
            layer.dirty = shape.__dirty;
        }
    }

    // 层中的元素数量有发生变化
    this.eachBuildinLayer(function (layer, z) {
        if (elCounts[z] !== layer.elCount) {
            layer.dirty = true;
        }
    });
};

/**
 * 指定的图形列表
 * @param {Array.<module:zrender/shape/Base>} shapeList 需要更新的图形元素列表
 * @param {Function} [callback] 视图更新后回调函数
 */
Painter.prototype.refreshShapes = function (shapeList, callback) {
    for (var i = 0, l = shapeList.length; i < l; i++) {
        var shape = shapeList[i];
        shape.modSelf();
    }

    this.refresh(callback);
    return this;
};

/**
 * 设置loading特效
 *
 * @param {Object} loadingEffect loading特效
 * @return {Painter}
 */
Painter.prototype.setLoadingEffect = function (loadingEffect) {
    this._loadingEffect = loadingEffect;
    return this;
};

/**
 * 清除hover层外所有内容
 */
Painter.prototype.clear = function () {
    this.eachBuildinLayer(this._clearLayer);
    return this;
};

Painter.prototype._clearLayer = function (layer) {
    layer.clear();
};

/**
 * 修改指定zlevel的绘制参数
 *
 * @param {string} zlevel
 * @param {Object} config 配置对象
 * @param {string} [config.clearColor=0] 每次清空画布的颜色
 * @param {string} [config.motionBlur=false] 是否开启动态模糊
 * @param {number} [config.lastFrameAlpha=0.7]
 *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
 * @param {Array.<number>} [position] 层的平移
 * @param {Array.<number>} [rotation] 层的旋转
 * @param {Array.<number>} [scale] 层的缩放
 * @param {boolean} [zoomable=false] 层是否支持鼠标缩放操作
 * @param {boolean} [panable=false] 层是否支持鼠标平移操作
 */
Painter.prototype.modLayer = function (zlevel, config) {
    if (config) {
        if (!this._layerConfig[zlevel]) {
            this._layerConfig[zlevel] = config;
        }
        else {
            util.merge(this._layerConfig[zlevel], config, true);
        }

        var layer = this._layers[zlevel];

        if (layer) {
            util.merge(layer, this._layerConfig[zlevel], true);
        }
    }
};

/**
 * 删除指定层
 * @param {number} zlevel 层所在的zlevel
 */
Painter.prototype.delLayer = function (zlevel) {
    var layer = this._layers[zlevel];
    if (!layer) {
        return;
    }
    // Save config
    this.modLayer(zlevel, {
        position: layer.position,
        rotation: layer.rotation,
        scale: layer.scale
    });
    layer.dom.parentNode.removeChild(layer.dom);
    delete this._layers[zlevel];

    this._zlevelList.splice(util.indexOf(this._zlevelList, zlevel), 1);
};

/**
 * 刷新hover层
 */
Painter.prototype.refreshHover = function () {
    this.clearHover();
    var list = this.storage.getHoverShapes(true);
    for (var i = 0, l = list.length; i < l; i++) {
        this._brushHover(list[i]);
    }
    var ctx = this._layers.hover.ctx;
    if (ctx.flush) ctx.flush();

    this.storage.delHover();

    return this;
};

/**
 * 清除hover层所有内容
 */
Painter.prototype.clearHover = function () {
    var hover = this._layers.hover;
    if (hover) hover.clear();

    return this;
};

/**
 * 显示loading
 *
 * @param {Object=} loadingEffect loading效果对象
 */
Painter.prototype.showLoading = function (loadingEffect) {
    if (this._loadingEffect) this._loadingEffect.stop();
    if (loadingEffect) this.setLoadingEffect(loadingEffect);
    this._loadingEffect.start(this);
    this.loading = true;

    return this;
};

/**
 * loading结束
 */
Painter.prototype.hideLoading = function () {
    this._loadingEffect.stop();

    this.clearHover();
    this.loading = false;
    return this;
};

/**
 * loading结束判断
 */
Painter.prototype.isLoading = function () {
    return this.loading;
};

/**
 * 区域大小变化后重绘
 */
Painter.prototype.resize = function () {
    var domRoot = this._domRoot;
    domRoot.style.display = 'none';

    var width = this._getWidth();
    var height = this._getHeight();

    domRoot.style.display = '';

    // 优化没有实际改变的resize
    if (this._width != width || height != this._height) {
        this._width = width;
        this._height = height;

        domRoot.style.width = width + 'px';
        domRoot.style.height = height + 'px';

        for (var id in this._layers) {

            this._layers[id].resize(width, height);
        }

        this.refresh(null, true);
    }

    return this;
};

/**
 * 清除单独的一个层
 * @param {number} zLevel
 */
Painter.prototype.clearLayer = function (zLevel) {
    var layer = this._layers[zLevel];
    if (layer) {
        layer.clear();
    }
};

/**
 * 释放
 */
Painter.prototype.dispose = function () {
    if (this.isLoading()) {
        this.hideLoading();
    }

    this.root.innerHTML = '';

    this.root =
        this.storage =

            this._domRoot =
                this._layers = null;
};

Painter.prototype.getDomHover = function () {
    return this._layers.hover.dom;
};

/**
 * 图像导出
 * @param {string} type
 * @param {string} [backgroundColor='#fff'] 背景色
 * @return {string} 图片的Base64 url
 */
Painter.prototype.toDataURL = function (type, backgroundColor, args) {
    if (window.G_vmlCanvasManager) {
        return null;
    }

    var imageLayer = new Layer('image', this);
    this._bgDom.appendChild(imageLayer.dom);
    imageLayer.initContext();

    var ctx = imageLayer.ctx;
    imageLayer.clearColor = backgroundColor || '#fff';
    imageLayer.clear();

    var self = this;
    // 升序遍历，shape上的zlevel指定绘画图层的z轴层叠

    this.storage.iterShape(
        function (shape) {
            if (!shape.invisible) {
                if (!shape.onbrush || (shape.onbrush && !shape.onbrush(ctx, false))// 没有onbrush
                // 有onbrush并且调用执行返回false或undefined则继续粉刷

                ) {
                    if (config.catchBrushException) {
                        try {
                            shape.brush(ctx, false, self.refreshNextFrame);
                        }
                        catch (error) {
                            log(
                                error,
                                'brush error of ' + shape.type,
                                shape
                            );
                        }
                    }
                    else {
                        shape.brush(ctx, false, self.refreshNextFrame);
                    }
                }
            }
        },
        {normal: 'up', update: true}
    );
    var image = imageLayer.dom.toDataURL(type, args);
    ctx = null;
    this._bgDom.removeChild(imageLayer.dom);
    return image;
};

/**
 * 获取绘图区域宽度
 */
Painter.prototype.getWidth = function () {
    return this._width;
};

/**
 * 获取绘图区域高度
 */
Painter.prototype.getHeight = function () {
    return this._height;
};

Painter.prototype._getWidth = function () {
    var root = this.root;
    var stl = root.currentStyle || document.defaultView.getComputedStyle(root);

    return ((root.clientWidth || parseInt(stl.width, 10)) - parseInt(stl.paddingLeft, 10) - parseInt(stl.paddingRight, 10)).toFixed(0) - 0; // 请原谅我这比较粗暴

};

Painter.prototype._getHeight = function () {
    var root = this.root;
    var stl = root.currentStyle || document.defaultView.getComputedStyle(root);

    return ((root.clientHeight || parseInt(stl.height, 10)) - parseInt(stl.paddingTop, 10) - parseInt(stl.paddingBottom, 10)).toFixed(0) - 0; // 请原谅我这比较粗暴

};

Painter.prototype._brushHover = function (shape) {
    var ctx = this._layers.hover.ctx;

    if (!shape.onbrush || (shape.onbrush && !shape.onbrush(ctx, true))// 没有onbrush
    // 有onbrush并且调用执行返回false或undefined则继续粉刷

    ) {
        var layer = this.getLayer(shape.zlevel);
        if (layer.needTransform) {
            ctx.save();
            layer.setTransform(ctx);
        }
        // Retina 优化
        if (config.catchBrushException) {
            try {
                shape.brush(ctx, true, this.refreshNextFrame);
            }
            catch (error) {
                log(
                    error, 'hoverBrush error of ' + shape.type, shape
                );
            }
        }
        else {
            shape.brush(ctx, true, this.refreshNextFrame);
        }
        if (layer.needTransform) {
            ctx.restore();
        }
    }
};

Painter.prototype._shapeToImage = function (id, shape, width, height, devicePixelRatio) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.setAttribute('width', width * devicePixelRatio);
    canvas.setAttribute('height', height * devicePixelRatio);

    ctx.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);

    var shapeTransform = {
        position: shape.position,
        rotation: shape.rotation,
        scale: shape.scale
    };
    shape.position = [0, 0, 0];
    shape.rotation = 0;
    shape.scale = [1, 1];
    if (shape) {
        shape.brush(ctx, false);
    }

    var ImageShape = require('./shape/Image');
    var imgShape = new ImageShape({
        id: id,
        style: {
            x: 0,
            y: 0,
            image: canvas
        }
    });

    if (shapeTransform.position !== null) {
        imgShape.position = shape.position = shapeTransform.position;
    }

    if (shapeTransform.rotation !== null) {
        imgShape.rotation = shape.rotation = shapeTransform.rotation;
    }

    if (shapeTransform.scale !== null) {
        imgShape.scale = shape.scale = shapeTransform.scale;
    }

    return imgShape;
};

Painter.prototype._createShapeToImageProcessor = function () {
    if (window.G_vmlCanvasManager) {
        return doNothing;
    }

    var me = this;

    return function (id, e, width, height) {
        return me._shapeToImage(
            id, e, width, height, config.devicePixelRatio
        );
    };
};

module.exports = Painter;

},{"./Layer":43,"./config":49,"./loadingEffect/Base":50,"./shape/Image":55,"./tool/log":70,"./tool/util":72}],45:[function(require,module,exports){
/**
 * Storage内容仓库模块
 * @module zrender/Storage
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @author errorrik (errorrik@gmail.com)
 * @author pissang (https://github.com/pissang/)
 */

var util = require('./tool/util');
var Group = require('./Group');

var defaultIterateOption = {
    hover: false,
    normal: 'down',
    update: false
};

function shapeCompareFunc(a, b) {
    if (a.zlevel == b.zlevel) {
        if (a.z == b.z) {
            return a.__renderidx - b.__renderidx;
        }
        return a.z - b.z;
    }
    return a.zlevel - b.zlevel;
}
/**
 * 内容仓库 (M)
 * @alias module:zrender/Storage
 * @constructor
 */
var Storage = function () {
    // 所有常规形状，id索引的map
    this._elements = {};

    // 高亮层形状，不稳定，动态增删，数组位置也是z轴方向，靠前显示在下方
    this._hoverElements = [];

    this._roots = [];

    this._shapeList = [];

    this._shapeListOffset = 0;
};

/**
 * 遍历迭代器
 *
 * @param {Function} fun 迭代回调函数，return true终止迭代
 * @param {Object} [option] 迭代参数，缺省为仅降序遍历普通层图形
 * @param {boolean} [option.hover=true] 是否是高亮层图形
 * @param {string} [option.normal='up'] 是否是普通层图形，迭代时是否指定及z轴顺序
 * @param {boolean} [option.update=false] 是否在迭代前更新形状列表
 *
 */
Storage.prototype.iterShape = function (fun, option) {
    if (!option) {
        option = defaultIterateOption;
    }
    var i = 0, l = 0;
    if (option.hover) {
        // 高亮层数据遍历
        for (i = 0, l = this._hoverElements.length; i < l; i++) {
            var el = this._hoverElements[i];
            el.updateTransform();
            if (fun(el)) {
                return this;
            }
        }
    }

    if (option.update) {
        this.updateShapeList();
    }

    // 遍历: 'down' | 'up'
    switch (option.normal) {
        case 'down':
            // 降序遍历，高层优先
            l = this._shapeList.length;
            while (l--) {
                if (fun(this._shapeList[l])) {
                    return this;
                }
            }
            break;
        // case 'up':
        default:
            // 升序遍历，底层优先
            for (i = 0, l = this._shapeList.length; i < l; i++) {
                if (fun(this._shapeList[i])) {
                    return this;
                }
            }
            break;
    }

    return this;
};

/**
 * 返回hover层的形状数组
 * @param  {boolean} [update=false] 是否在返回前更新图形的变换
 * @return {Array.<module:zrender/shape/Base>}
 */
Storage.prototype.getHoverShapes = function (update) {
    // hoverConnect
    var hoverElements = [];
    for (var i = 0, l = this._hoverElements.length; i < l; i++) {
        hoverElements.push(this._hoverElements[i]);
        var target = this._hoverElements[i].hoverConnect;
        if (target) {
            var shape;
            target = target instanceof Array ? target : [target];
            for (var j = 0, k = target.length; j < k; j++) {
                shape = target[j].id ? target[j] : this.get(target[j]);
                if (shape) {
                    hoverElements.push(shape);
                }
            }
        }
    }
    hoverElements.sort(shapeCompareFunc);
    if (update) {
        for (i = 0, l = hoverElements.length; i < l; i++) {
            hoverElements[i].updateTransform();
        }
    }
    return hoverElements;
};

/**
 * 返回所有图形的绘制队列
 * @param  {boolean} [update=false] 是否在返回前更新该数组
 * 详见{@link module:zrender/shape/Base.prototype.updateShapeList}
 * @return {Array.<module:zrender/shape/Base>}
 */
Storage.prototype.getShapeList = function (update) {
    if (update) {
        this.updateShapeList();
    }
    return this._shapeList;
};

/**
 * 更新图形的绘制队列。
 * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
 * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
 */
Storage.prototype.updateShapeList = function () {
    this._shapeListOffset = 0;
    for (var i = 0, len = this._roots.length; i < len; i++) {
        var root = this._roots[i];
        this._updateAndAddShape(root);
    }
    this._shapeList.length = this._shapeListOffset;

    for (i = 0, len = this._shapeList.length; i < len; i++) {
        this._shapeList[i].__renderidx = i;
    }

    this._shapeList.sort(shapeCompareFunc);
};

Storage.prototype._updateAndAddShape = function (el, clipShapes) {

    if (el.ignore) {
        return;
    }

    el.updateTransform();

    if (el.type == 'group') {

        if (el.clipShape) {
            // clipShape 的变换是基于 group 的变换
            el.clipShape.parent = el;
            el.clipShape.updateTransform();

            // PENDING 效率影响
            if (clipShapes) {
                clipShapes = clipShapes.slice();
                clipShapes.push(el.clipShape);
            } else {
                clipShapes = [el.clipShape];
            }
        }

        for (var i = 0; i < el._children.length; i++) {
            var child = el._children[i];

            // Force to mark as dirty if group is dirty
            child.__dirty = el.__dirty || child.__dirty;

            this._updateAndAddShape(child, clipShapes);
        }

        // Mark group clean here
        el.__dirty = false;

    }
    else {
        el.__clipShapes = clipShapes;

        this._shapeList[this._shapeListOffset++] = el;
    }
};

/**
 * 修改图形(Shape)或者组(Group)
 *
 * @param {string|module:zrender/shape/Base|module:zrender/Group} el
 * @param {Object} [params] 参数
 */
Storage.prototype.mod = function (el, params) {
    if (typeof (el) === 'string') {
        el = this._elements[el];
    }
    if (el) {

        el.modSelf();

        if (params) {
            // 如果第二个参数直接使用 shape
            // parent, _storage, __clipShapes 三个属性会有循环引用
            // 主要为了向 1.x 版本兼容，2.x 版本不建议使用第二个参数
            if (params.parent || params._storage || params.__clipShapes) {
                var target = {};
                for (var name in params) {
                    if (
                        name === 'parent' || name === '_storage' || name === '__clipShapes'
                    ) {
                        continue;
                    }
                    if (params.hasOwnProperty(name)) {
                        target[name] = params[name];
                    }
                }
                util.merge(el, target, true);
            }
            else {
                util.merge(el, params, true);
            }
        }
    }

    return this;
};

/**
 * 移动指定的图形(Shape)或者组(Group)的位置
 * @param {string} shapeId 形状唯一标识
 * @param {number} dx
 * @param {number} dy
 */
Storage.prototype.drift = function (shapeId, dx, dy) {
    var shape = this._elements[shapeId];
    if (shape) {
        shape.needTransform = true;
        if (shape.draggable === 'horizontal') {
            dy = 0;
        }
        else if (shape.draggable === 'vertical') {
            dx = 0;
        }
        if (!shape.ondrift || (shape.ondrift && !shape.ondrift(dx, dy))
        // ondrift// 有onbrush并且调用执行返回false或undefined则继续
        ) {
            shape.drift(dx, dy);
        }
    }

    return this;
};

/**
 * 添加高亮层数据
 *
 * @param {module:zrender/shape/Base} shape
 */
Storage.prototype.addHover = function (shape) {
    shape.updateNeedTransform();
    this._hoverElements.push(shape);
    return this;
};

/**
 * 清空高亮层数据
 */
Storage.prototype.delHover = function () {
    this._hoverElements = [];
    return this;
};

/**
 * 是否有图形在高亮层里
 * @return {boolean}
 */
Storage.prototype.hasHoverShape = function () {
    return this._hoverElements.length > 0;
};

/**
 * 添加图形(Shape)或者组(Group)到根节点
 * @param {module:zrender/shape/Shape|module:zrender/Group} el
 */
Storage.prototype.addRoot = function (el) {
    // Element has been added
    if (this._elements[el.id]) {
        return;
    }

    if (el instanceof Group) {
        el.addChildrenToStorage(this);
    }

    this.addToMap(el);
    this._roots.push(el);
};

/**
 * 删除指定的图形(Shape)或者组(Group)
 * @param {string|Array.<string>} [elId] 如果为空清空整个Storage
 */
Storage.prototype.delRoot = function (elId) {
    var i = 0, l = 0;
    if (typeof(elId) == 'undefined') {
        // 不指定elId清空
        for (i = 0; i < this._roots.length; i++) {
            var root = this._roots[i];
            if (root instanceof Group) {
                root.delChildrenFromStorage(this);
            }
        }

        this._elements = {};
        this._hoverElements = [];
        this._roots = [];
        this._shapeList = [];
        this._shapeListOffset = 0;

        return;
    }

    if (elId instanceof Array) {
        for (i = 0, l = elId.length; i < l; i++) {
            this.delRoot(elId[i]);
        }
        return;
    }

    var el;
    if (typeof(elId) == 'string') {
        el = this._elements[elId];
    }
    else {
        el = elId;
    }

    var idx = util.indexOf(this._roots, el);
    if (idx >= 0) {
        this.delFromMap(el.id);
        this._roots.splice(idx, 1);
        if (el instanceof Group) {
            el.delChildrenFromStorage(this);
        }
    }
};

Storage.prototype.addToMap = function (el) {
    if (el instanceof Group) {
        el._storage = this;
    }
    el.modSelf();

    this._elements[el.id] = el;

    return this;
};

Storage.prototype.get = function (elId) {
    return this._elements[elId];
};

Storage.prototype.delFromMap = function (elId) {
    var el = this._elements[elId];
    if (el) {
        delete this._elements[elId];

        if (el instanceof Group) {
            el._storage = null;
        }
    }

    return this;
};

/**
 * 清空并且释放Storage
 */
Storage.prototype.dispose = function () {
    this._elements =
        this._renderList =
            this._roots =
                this._hoverElements = null;
};

module.exports = Storage;


},{"./Group":41,"./tool/util":72}],46:[function(require,module,exports){
/**
 * 动画主类, 调度和管理所有动画控制器
 *
 * @module zrender/animation/Animation
 * @author pissang(https://github.com/pissang)
 */


var Clip = require('./Clip');
var color = require('../tool/color');
var util = require('../tool/util');
var Dispatcher = require('../tool/event').Dispatcher;

var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (func) {
        setTimeout(func, 16);
    };

var arraySlice = Array.prototype.slice;

/**
 * @typedef {Object} IZRenderStage
 * @property {Function} update
 */

/**
 * @alias module:zrender/animation/Animation
 * @constructor
 * @param {Object} [options]
 * @param {Function} [options.onframe]
 * @param {IZRenderStage} [options.stage]
 * @example
 *     var animation = new Animation();
 *     var obj = {
         *         x: 100,
         *         y: 100
         *     };
 *     animation.animate(node.position)
 *         .when(1000, {
         *             x: 500,
         *             y: 500
         *         })
 *         .when(2000, {
         *             x: 100,
         *             y: 100
         *         })
 *         .start('spline');
 */
var Animation = function (options) {

    options = options || {};

    this.stage = options.stage || {};

    this.onframe = options.onframe || function () {
    };

    // private properties
    this._clips = [];

    this._running = false;

    this._time = 0;

    Dispatcher.call(this);
};

Animation.prototype = {
    /**
     * 添加动画片段
     * @param {module:zrender/animation/Clip} clip
     */
    add: function (clip) {
        this._clips.push(clip);
    },
    /**
     * 删除动画片段
     * @param {module:zrender/animation/Clip} clip
     */
    remove: function (clip) {
        var idx = util.indexOf(this._clips, clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    },
    _update: function () {
        var i = 0;
        var time = new Date().getTime();
        var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }

        // Remove the finished clip
        for (i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len - 1];
                clips.pop();
                len--;
            }
            else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe(delta);

        this.dispatch('frame', delta);

        if (this.stage.update) {
            this.stage.update();
        }
    },
    /**
     * 开始运行动画
     */
    start: function () {
        var self = this;

        this._running = true;

        function step() {
            if (self._running) {

                requestAnimationFrame(step);

                self._update();
            }
        }

        this._time = new Date().getTime();
        requestAnimationFrame(step);
    },
    /**
     * 停止运行动画
     */
    stop: function () {
        this._running = false;
    },
    /**
     * 清除所有动画片段
     */
    clear: function () {
        this._clips = [];
    },
    /**
     * 对一个目标创建一个animator对象，可以指定目标中的属性使用动画
     * @param  {Object} target
     * @param  {Object} options
     * @param  {boolean} [options.loop=false] 是否循环播放动画
     * @param  {Function} [options.getter=null]
     *         如果指定getter函数，会通过getter函数取属性值
     * @param  {Function} [options.setter=null]
     *         如果指定setter函数，会通过setter函数设置属性值
     * @return {module:zrender/animation/Animation~Animator}
     */
    animate: function (target, options) {
        options = options || {};
        var deferred = new Animator(
            target,
            options.loop,
            options.getter,
            options.setter
        );
        deferred.animation = this;
        return deferred;
    },
    constructor: Animation
};

util.merge(Animation.prototype, Dispatcher.prototype, true);

function _defaultGetter(target, key) {
    return target[key];
}

function _defaultSetter(target, key, value) {
    target[key] = value;
}

function _interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}

function _interpolateArray(p0, p1, percent, out, arrDim) {
    var len = p0.length, i = 0;
    if (arrDim == 1) {
        for (i = 0; i < len; i++) {
            out[i] = _interpolateNumber(p0[i], p1[i], percent);
        }
    }
    else {
        var len2 = p0[0].length;
        for (i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = _interpolateNumber(
                    p0[i][j], p1[i][j], percent
                );
            }
        }
    }
}

function _isArrayLike(data) {
    switch (typeof data) {
        case 'undefined':
        case 'string':
            return false;
    }

    return typeof data.length !== 'undefined';
}

function _catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
    var len = p0.length, i = 0;
    if (arrDim == 1) {
        for (i = 0; i < len; i++) {
            out[i] = _catmullRomInterpolate(
                p0[i], p1[i], p2[i], p3[i], t, t2, t3
            );
        }
    }
    else {
        var len2 = p0[0].length;
        for (i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = _catmullRomInterpolate(
                    p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                    t, t2, t3
                );
            }
        }
    }
}

function _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

function _cloneValue(value) {
    if (_isArrayLike(value)) {
        var len = value.length;
        if (_isArrayLike(value[0])) {
            var ret = [];
            for (var i = 0; i < len; i++) {
                ret.push(arraySlice.call(value[i]));
            }
            return ret;
        }
        else {
            return arraySlice.call(value);
        }
    }
    else {
        return value;
    }
}

function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]);
    rgba[1] = Math.floor(rgba[1]);
    rgba[2] = Math.floor(rgba[2]);

    return 'rgba(' + rgba.join(',') + ')';
}

/**
 * @alias module:zrender/animation/Animation~Animator
 * @constructor
 * @param {Object} target
 * @param {boolean} loop
 * @param {Function} getter
 * @param {Function} setter
 */
var Animator = function (target, loop, getter, setter) {
    this._tracks = {};
    this._target = target;

    this._loop = loop || false;

    this._getter = getter || _defaultGetter;
    this._setter = setter || _defaultSetter;

    this._clipCount = 0;

    this._delay = 0;

    this._doneList = [];

    this._onframeList = [];

    this._clipList = [];
};

Animator.prototype = {
    /**
     * 设置动画关键帧
     * @param  {number} time 关键帧时间，单位是ms
     * @param  {Object} props 关键帧的属性值，key-value表示
     * @return {module:zrender/animation/Animation~Animator}
     */
    when: function (time /* ms */, props) {
        for (var propName in props) {
            if (!this._tracks[propName]) {
                this._tracks[propName] = [];
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    this._tracks[propName].push({
                        time: 0,
                        value: _cloneValue(
                            this._getter(this._target, propName)
                        )
                    });
                }
            }
            this._tracks[propName].push({
                time: parseInt(time, 10),
                value: props[propName]
            });
        }
        return this;
    },
    /**
     * 添加动画每一帧的回调函数
     * @param  {Function} callback
     * @return {module:zrender/animation/Animation~Animator}
     */
    during: function (callback) {
        this._onframeList.push(callback);
        return this;
    },
    /**
     * 开始执行动画
     * @param  {string|Function} easing
     *         动画缓动函数，详见{@link module:zrender/animation/easing}
     * @return {module:zrender/animation/Animation~Animator}
     */
    start: function (easing) {

        var self = this;
        var setter = this._setter;
        var getter = this._getter;
        var useSpline = easing === 'spline';

        var ondestroy = function () {
            self._clipCount--;
            if (self._clipCount === 0) {
                // Clear all tracks
                self._tracks = {};

                var len = self._doneList.length;
                for (var i = 0; i < len; i++) {
                    self._doneList[i].call(self);
                }
            }
        };

        var createTrackClip = function (keyframes, propName) {
            var trackLen = keyframes.length;
            if (!trackLen) {
                return;
            }
            // Guess data type
            var firstVal = keyframes[0].value;
            var isValueArray = _isArrayLike(firstVal);
            var isValueColor = false;

            // For vertices morphing
            var arrDim = (isValueArray && _isArrayLike(firstVal[0])) ? 2 : 1;
            // Sort keyframe as ascending
            keyframes.sort(function (a, b) {
                return a.time - b.time;
            });
            var trackMaxTime;
            if (trackLen) {
                trackMaxTime = keyframes[trackLen - 1].time;
            }
            else {
                return;
            }
            // Percents of each keyframe
            var kfPercents = [];
            // Value of each keyframe
            var kfValues = [];
            var i = 0;
            for (i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                // Assume value is a color when it is a string
                var value = keyframes[i].value;
                if (typeof(value) == 'string') {
                    value = color.toArray(value);
                    if (value.length === 0) {    // Invalid color
                        value[0] = value[1] = value[2] = 0;
                        value[3] = 1;
                    }
                    isValueColor = true;
                }
                kfValues.push(value);
            }

            // Cache the key of last frame to speed up when
            // animation playback is sequency
            var cacheKey = 0;
            var cachePercent = 0;
            var start;
            var w;
            var p0;
            var p1;
            var p2;
            var p3;


            if (isValueColor) {
                var rgba = [0, 0, 0, 0];
            }

            var onframe = function (target, percent) {
                // Find the range keyframes
                // kf1-----kf2---------current--------kf3
                // find kf2 and kf3 and do interpolation
                if (percent < cachePercent) {
                    // Start from next key
                    start = Math.min(cacheKey + 1, trackLen - 1);
                    for (i = start; i >= 0; i--) {
                        if (kfPercents[i] <= percent) {
                            break;
                        }
                    }
                    i = Math.min(i, trackLen - 2);
                }
                else {
                    for (i = cacheKey; i < trackLen; i++) {
                        if (kfPercents[i] > percent) {
                            break;
                        }
                    }
                    i = Math.min(i - 1, trackLen - 2);
                }
                cacheKey = i;
                cachePercent = percent;

                var range = (kfPercents[i + 1] - kfPercents[i]);
                if (range === 0) {
                    return;
                }
                else {
                    w = (percent - kfPercents[i]) / range;
                }
                var value;
                if (useSpline) {
                    p1 = kfValues[i];
                    p0 = kfValues[i === 0 ? i : i - 1];
                    p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                    p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                    if (isValueArray) {
                        _catmullRomInterpolateArray(
                            p0, p1, p2, p3, w, w * w, w * w * w,
                            getter(target, propName),
                            arrDim
                        );
                    }
                    else {

                        if (isValueColor) {
                            value = _catmullRomInterpolateArray(
                                p0, p1, p2, p3, w, w * w, w * w * w,
                                rgba, 1
                            );
                            value = rgba2String(rgba);
                        }
                        else {
                            value = _catmullRomInterpolate(
                                p0, p1, p2, p3, w, w * w, w * w * w
                            );
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                }
                else {
                    if (isValueArray) {
                        _interpolateArray(
                            kfValues[i], kfValues[i + 1], w,
                            getter(target, propName),
                            arrDim
                        );
                    }
                    else {

                        if (isValueColor) {
                            _interpolateArray(
                                kfValues[i], kfValues[i + 1], w,
                                rgba, 1
                            );
                            value = rgba2String(rgba);
                        }
                        else {
                            value = _interpolateNumber(kfValues[i], kfValues[i + 1], w);
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                }

                for (i = 0; i < self._onframeList.length; i++) {
                    self._onframeList[i](target, percent);
                }
            };

            var clip = new Clip({
                target: self._target,
                life: trackMaxTime,
                loop: self._loop,
                delay: self._delay,
                onframe: onframe,
                ondestroy: ondestroy
            });

            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
            self._clipList.push(clip);
            self._clipCount++;
            self.animation.add(clip);
        };

        for (var propName in this._tracks) {
            createTrackClip(this._tracks[propName], propName);
        }
        return this;
    },
    /**
     * 停止动画
     */
    stop: function () {
        for (var i = 0; i < this._clipList.length; i++) {
            var clip = this._clipList[i];
            this.animation.remove(clip);
        }
        this._clipList = [];
    },
    /**
     * 设置动画延迟开始的时间
     * @param  {number} time 单位ms
     * @return {module:zrender/animation/Animation~Animator}
     */
    delay: function (time) {
        this._delay = time;
        return this;
    },
    /**
     * 添加动画结束的回调
     * @param  {Function} cb
     * @return {module:zrender/animation/Animation~Animator}
     */
    done: function (cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    }
};

module.exports = Animation;


},{"../tool/color":65,"../tool/event":68,"../tool/util":72,"./Clip":47}],47:[function(require,module,exports){
/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 */


var Easing = require('./easing');

function Clip(options) {

    this._targetPool = options.target || {};
    if (!(this._targetPool instanceof Array)) {
        this._targetPool = [this._targetPool];
    }

    // 生命周期
    this._life = options.life || 1000;
    // 延时
    this._delay = options.delay || 0;
    // 开始时间
    this._startTime = new Date().getTime() + this._delay;// 单位毫秒

    // 结束时间
    this._endTime = this._startTime + this._life * 1000;

    // 是否循环
    this.loop = typeof options.loop == 'undefined' ? false : options.loop;

    this.gap = options.gap || 0;

    this.easing = options.easing || 'Linear';

    this.onframe = options.onframe;
    this.ondestroy = options.ondestroy;
    this.onrestart = options.onrestart;
}

Clip.prototype = {
    step: function (time) {
        var percent = (time - this._startTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easingFunc = typeof this.easing == 'string' ? Easing[this.easing] : this.easing;
        var schedule = typeof easingFunc === 'function' ? easingFunc(percent) : percent;

        this.fire('frame', schedule);

        // 结束
        if (percent == 1) {
            if (this.loop) {
                this.restart();
                // 重新开始周期
                // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                return 'restart';
            }

            // 动画完成将这个控制器标识为待删除
            // 在Animation.update中进行批量删除
            this._needsRemove = true;
            return 'destroy';
        }

        return null;
    },
    restart: function () {
        var time = new Date().getTime();
        var remainder = (time - this._startTime) % this._life;
        this._startTime = new Date().getTime() - remainder + this.gap;

        this._needsRemove = false;
    },
    fire: function (eventType, arg) {
        for (var i = 0, len = this._targetPool.length; i < len; i++) {
            if (this['on' + eventType]) {
                this['on' + eventType](this._targetPool[i], arg);
            }
        }
    },
    constructor: Clip
};

module.exports = Clip;


},{"./easing":48}],48:[function(require,module,exports){
/**
 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
 * @see http://sole.github.io/tween.js/examples/03_graphs.html
 * @exports zrender/animation/easing
 */
var easing = {
    // 线性
    /**
     * @param {number} k
     * @return {number}
     */
    Linear: function (k) {
        return k;
    },

    // 二次方的缓动（t^2）
    /**
     * @param {number} k
     * @return {number}
     */
    QuadraticIn: function (k) {
        return k * k;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuadraticOut: function (k) {
        return k * (2 - k);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuadraticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },

    // 三次方的缓动（t^3）
    /**
     * @param {number} k
     * @return {number}
     */
    CubicIn: function (k) {
        return k * k * k;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    CubicOut: function (k) {
        return --k * k * k + 1;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    CubicInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },

    // 四次方的缓动（t^4）
    /**
     * @param {number} k
     * @return {number}
     */
    QuarticIn: function (k) {
        return k * k * k * k;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuarticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },

    // 五次方的缓动（t^5）
    /**
     * @param {number} k
     * @return {number}
     */
    QuinticIn: function (k) {
        return k * k * k * k * k;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    QuinticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },

    // 正弦曲线的缓动（sin(t)）
    /**
     * @param {number} k
     * @return {number}
     */
    SinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    SinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    SinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },

    // 指数曲线的缓动（2^t）
    /**
     * @param {number} k
     * @return {number}
     */
    ExponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    ExponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    ExponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },

    // 圆形曲线的缓动（sqrt(1-t^2)）
    /**
     * @param {number} k
     * @return {number}
     */
    CircularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    CircularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    /**
     * @param {number} k
     * @return {number}
     */
    CircularInOut: function (k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },

    // 创建类似于弹簧在停止前来回振荡的动画
    /**
     * @param {number} k
     * @return {number}
     */
    ElasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1)) *
        Math.sin((k - s) * (2 * Math.PI) / p));
    },
    /**
     * @param {number} k
     * @return {number}
     */
    ElasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k) *
        Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    ElasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    },

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    /**
     * @param {number} k
     * @return {number}
     */
    BackIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    BackOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    /**
     * @param {number} k
     * @return {number}
     */
    BackInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    // 创建弹跳效果
    /**
     * @param {number} k
     * @return {number}
     */
    BounceIn: function (k) {
        return 1 - easing.BounceOut(1 - k);
    },
    /**
     * @param {number} k
     * @return {number}
     */
    BounceOut: function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    /**
     * @param {number} k
     * @return {number}
     */
    BounceInOut: function (k) {
        if (k < 0.5) {
            return easing.BounceIn(k * 2) * 0.5;
        }
        return easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};

module.exports = easing;



},{}],49:[function(require,module,exports){
/**
 * config默认配置项
 * @exports zrender/config
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */
var config = {
    /**
     * @namespace module:zrender/config.EVENT
     */
    EVENT: {
        /**
         * 窗口大小变化
         * @type {string}
         */
        RESIZE: 'resize',
        /**
         * 鼠标按钮被（手指）按下，事件对象是：目标图形元素或空
         * @type {string}
         */
        CLICK: 'click',
        /**
         * 双击事件
         * @type {string}
         */
        DBLCLICK: 'dblclick',
        /**
         * 鼠标滚轮变化，事件对象是：目标图形元素或空
         * @type {string}
         */
        MOUSEWHEEL: 'mousewheel',
        /**
         * 鼠标（手指）被移动，事件对象是：目标图形元素或空
         * @type {string}
         */
        MOUSEMOVE: 'mousemove',
        /**
         * 鼠标移到某图形元素之上，事件对象是：目标图形元素
         * @type {string}
         */
        MOUSEOVER: 'mouseover',
        /**
         * 鼠标从某图形元素移开，事件对象是：目标图形元素
         * @type {string}
         */
        MOUSEOUT: 'mouseout',
        /**
         * 鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
         * @type {string}
         */
        MOUSEDOWN: 'mousedown',
        /**
         * 鼠标按键（手指）被松开，事件对象是：目标图形元素或空
         * @type {string}
         */
        MOUSEUP: 'mouseup',
        /**
         * 全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定
         * @type {string}
         */
        GLOBALOUT: 'globalout',    //

        // 一次成功元素拖拽的行为事件过程是：
        // dragstart > dragenter > dragover [> dragleave] > drop > dragend
        /**
         * 开始拖拽时触发，事件对象是：被拖拽图形元素
         * @type {string}
         */
        DRAGSTART: 'dragstart',
        /**
         * 拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
         * @type {string}
         */
        DRAGEND: 'dragend',
        /**
         * 拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DRAGENTER: 'dragenter',
        /**
         * 拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DRAGOVER: 'dragover',
        /**
         * 拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DRAGLEAVE: 'dragleave',
        /**
         * 拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DROP: 'drop',
        /**
         * touch end - start < delay is click
         * @type {number}
         */
        touchClickDelay: 300
    },

    // 是否异常捕获
    catchBrushException: false,

    /**
     * debug日志选项：catchBrushException为true下有效
     * 0 : 不生成debug数据，发布用
     * 1 : 异常抛出，调试用
     * 2 : 控制台输出，调试用
     */
    debugMode: 0,

    // retina 屏幕优化
    devicePixelRatio: Math.max(window.devicePixelRatio || 1, 1)
};
module.exports = config;


},{}],50:[function(require,module,exports){
/**
 * zrender: loading特效类
 *
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */


var util = require('../tool/util');
var TextShape = require('../shape/Text');
var RectangleShape = require('../shape/Rectangle');


var DEFAULT_TEXT = 'Loading...';
var DEFAULT_TEXT_FONT = 'normal 16px Arial';

/**
 * @constructor
 *
 * @param {Object} options 选项
 * @param {color} options.backgroundColor 背景颜色
 * @param {Object} options.textStyle 文字样式，同shape/text.style
 * @param {number=} options.progress 进度参数，部分特效有用
 * @param {Object=} options.effect 特效参数，部分特效有用
 *
 * {
         *     effect,
         *     //loading话术
         *     text:'',
         *     // 水平安放位置，默认为 'center'，可指定x坐标
         *     x:'center' || 'left' || 'right' || {number},
         *     // 垂直安放位置，默认为'top'，可指定y坐标
         *     y:'top' || 'bottom' || {number},
         *
         *     textStyle:{
         *         textFont: 'normal 20px Arial' || {textFont}, //文本字体
         *         color: {color}
         *     }
         * }
 */
function Base(options) {
    this.setOptions(options);
}

/**
 * 创建loading文字图形
 *
 * @param {Object} textStyle 文字style，同shape/text.style
 */
Base.prototype.createTextShape = function (textStyle) {
    return new TextShape({
        highlightStyle: util.merge(
            {
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 2,
                text: DEFAULT_TEXT,
                textAlign: 'center',
                textBaseline: 'middle',
                textFont: DEFAULT_TEXT_FONT,
                color: '#333',
                brushType: 'fill'
            },
            textStyle,
            true
        )
    });
};

/**
 * 获取loading背景图形
 *
 * @param {color} color 背景颜色
 */
Base.prototype.createBackgroundShape = function (color) {
    return new RectangleShape({
        highlightStyle: {
            x: 0,
            y: 0,
            width: this.canvasWidth,
            height: this.canvasHeight,
            brushType: 'fill',
            color: color
        }
    });
};

Base.prototype.start = function (painter) {
    this.canvasWidth = painter._width;
    this.canvasHeight = painter._height;

    function addShapeHandle(param) {
        painter.storage.addHover(param);
    }

    function refreshHandle() {
        painter.refreshHover();
    }

    this.loadingTimer = this._start(addShapeHandle, refreshHandle);
};

Base.prototype._start = function (/*addShapeHandle, refreshHandle*/) {
    return setInterval(function () {
    }, 10000);
};

Base.prototype.stop = function () {
    clearInterval(this.loadingTimer);
};

Base.prototype.setOptions = function (options) {
    this.options = options || {};
};

Base.prototype.adjust = function (value, region) {
    if (value <= region[0]) {
        value = region[0];
    }
    else if (value >= region[1]) {
        value = region[1];
    }
    return value;
};

Base.prototype.getLocation = function (loc, totalWidth, totalHeight) {
    var x = loc.x !== null ? loc.x : 'center';
    switch (x) {
        case 'center' :
            x = Math.floor((this.canvasWidth - totalWidth) / 2);
            break;
        case 'left' :
            x = 0;
            break;
        case 'right' :
            x = this.canvasWidth - totalWidth;
            break;
    }
    var y = loc.y !== null ? loc.y : 'center';
    switch (y) {
        case 'center' :
            y = Math.floor((this.canvasHeight - totalHeight) / 2);
            break;
        case 'top' :
            y = 0;
            break;
        case 'bottom' :
            y = this.canvasHeight - totalHeight;
            break;
    }
    return {
        x: x,
        y: y,
        width: totalWidth,
        height: totalHeight
    };
};

module.exports = Base;


},{"../shape/Rectangle":59,"../shape/Text":60,"../tool/util":72}],51:[function(require,module,exports){
/**
 * 事件扩展
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */


/**
 * 事件分发器
 * @alias module:zrender/mixin/Eventful
 * @constructor
 */
var Eventful = function () {
    this._handlers = {};
};
/**
 * 单次触发绑定，dispatch后销毁
 *
 * @param {string} event 事件名
 * @param {Function} handler 响应函数
 * @param {Object} context
 */
Eventful.prototype.one = function (event, handler, context) {
    var _h = this._handlers;

    if (!handler || !event) {
        return this;
    }

    if (!_h[event]) {
        _h[event] = [];
    }

    _h[event].push({
        h: handler,
        one: true,
        ctx: context || this
    });

    return this;
};

/**
 * 绑定事件
 * @param {string} event 事件名
 * @param {Function} handler 事件处理函数
 * @param {Object} [context]
 */
Eventful.prototype.bind = function (event, handler, context) {
    var _h = this._handlers;

    if (!handler || !event) {
        return this;
    }

    if (!_h[event]) {
        _h[event] = [];
    }

    _h[event].push({
        h: handler,
        one: false,
        ctx: context || this
    });

    return this;
};

/**
 * 解绑事件
 * @param {string} event 事件名
 * @param {Function} [handler] 事件处理函数
 */
Eventful.prototype.unbind = function (event, handler) {
    var _h = this._handlers;

    if (!event) {
        this._handlers = {};
        return this;
    }

    if (handler) {
        if (_h[event]) {
            var newList = [];
            for (var i = 0, l = _h[event].length; i < l; i++) {
                if (_h[event][i].h != handler) {
                    newList.push(_h[event][i]);
                }
            }
            _h[event] = newList;
        }

        if (_h[event] && _h[event].length === 0) {
            delete _h[event];
        }
    }
    else {
        delete _h[event];
    }

    return this;
};

/**
 * 事件分发
 *
 * @param {string} type 事件类型
 */
Eventful.prototype.dispatch = function (type) {
    if (this._handlers[type]) {
        var args = arguments;
        var argLen = args.length;

        if (argLen > 3) {
            args = Array.prototype.slice.call(args, 1);
        }

        var _h = this._handlers[type];
        var len = _h.length;
        for (var i = 0; i < len;) {
            // Optimize advise from backbone
            switch (argLen) {
                case 1:
                    _h[i].h.call(_h[i].ctx);
                    break;
                case 2:
                    _h[i].h.call(_h[i].ctx, args[1]);
                    break;
                case 3:
                    _h[i].h.call(_h[i].ctx, args[1], args[2]);
                    break;
                default:
                    // have more than 2 given arguments
                    _h[i].h.apply(_h[i].ctx, args);
                    break;
            }

            if (_h[i].one) {
                _h.splice(i, 1);
                len--;
            }
            else {
                i++;
            }
        }
    }

    return this;
};

/**
 * 带有context的事件分发, 最后一个参数是事件回调的context
 * @param {string} type 事件类型
 */
Eventful.prototype.dispatchWithContext = function (type) {
    if (this._handlers[type]) {
        var args = arguments;
        var argLen = args.length;

        if (argLen > 4) {
            args = Array.prototype.slice.call(args, 1, args.length - 1);
        }
        var ctx = args[args.length - 1];

        var _h = this._handlers[type];
        var len = _h.length;
        for (var i = 0; i < len;) {
            // Optimize advise from backbone
            switch (argLen) {
                case 1:
                    _h[i].h.call(ctx);
                    break;
                case 2:
                    _h[i].h.call(ctx, args[1]);
                    break;
                case 3:
                    _h[i].h.call(ctx, args[1], args[2]);
                    break;
                default:
                    // have more than 2 given arguments
                    _h[i].h.apply(ctx, args);
                    break;
            }

            if (_h[i].one) {
                _h.splice(i, 1);
                len--;
            }
            else {
                i++;
            }
        }
    }

    return this;
};

// 对象可以通过 onxxxx 绑定事件
/**
 * @event module:zrender/mixin/Eventful#onclick
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmouseover
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmouseout
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmousemove
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmousewheel
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmousedown
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#onmouseup
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondragstart
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondragend
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondragenter
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondragleave
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondragover
 * @type {Function}
 * @default null
 */
/**
 * @event module:zrender/mixin/Eventful#ondrop
 * @type {Function}
 * @default null
 */

module.exports = Eventful;

},{}],52:[function(require,module,exports){
/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */

var matrix = require('../tool/matrix');
var vector = require('../tool/vector');
var origin = [0, 0];

var mTranslate = matrix.translate;

var EPSILON = 5e-5;

function isAroundZero(val) {
    return val > -EPSILON && val < EPSILON;
}
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}

/**
 * @alias module:zrender/mixin/Transformable
 * @constructor
 */
var Transformable = function () {

    if (!this.position) {
        /**
         * 平移
         * @type {Array.<number>}
         * @default [0, 0]
         */
        this.position = [0, 0];
    }
    if (typeof(this.rotation) == 'undefined') {
        /**
         * 旋转，可以通过数组二三项指定旋转的原点
         * @type {Array.<number>}
         * @default [0, 0, 0]
         */
        this.rotation = [0, 0, 0];
    }
    if (!this.scale) {
        /**
         * 缩放，可以通过数组三四项指定缩放的原点
         * @type {Array.<number>}
         * @default [1, 1, 0, 0]
         */
        this.scale = [1, 1, 0, 0];
    }

    this.needLocalTransform = false;

    /**
     * 是否有坐标变换
     * @type {boolean}
     * @readOnly
     */
    this.needTransform = false;
};

Transformable.prototype = {

    constructor: Transformable,

    updateNeedTransform: function () {
        this.needLocalTransform = isNotAroundZero(this.rotation[0]) || isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1]) || isNotAroundZero(this.scale[0] - 1) || isNotAroundZero(this.scale[1] - 1);
    },

    /**
     * 判断是否需要有坐标变换，更新needTransform属性。
     * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
     */
    updateTransform: function () {

        this.updateNeedTransform();

        var parentHasTransform = this.parent && this.parent.needTransform;
        this.needTransform = this.needLocalTransform || parentHasTransform;

        if (!this.needTransform) {
            return;
        }

        var m = this.transform || matrix.create();
        matrix.identity(m);

        var haveOrigin;
        if (this.needLocalTransform) {
            var scale = this.scale;
            if (
                isNotAroundZero(scale[0]) || isNotAroundZero(scale[1])
            ) {
                origin[0] = -scale[2] || 0;
                origin[1] = -scale[3] || 0;
                 haveOrigin = isNotAroundZero(origin[0]) || isNotAroundZero(origin[1]);
                if (haveOrigin) {
                    mTranslate(m, m, origin);
                }
                matrix.scale(m, m, scale);
                if (haveOrigin) {
                    origin[0] = -origin[0];
                    origin[1] = -origin[1];
                    mTranslate(m, m, origin);
                }
            }

            if (this.rotation instanceof Array) {
                if (this.rotation[0] !== 0) {
                    origin[0] = -this.rotation[1] || 0;
                    origin[1] = -this.rotation[2] || 0;
                     haveOrigin = isNotAroundZero(origin[0]) || isNotAroundZero(origin[1]);
                    if (haveOrigin) {
                        mTranslate(m, m, origin);
                    }
                    matrix.rotate(m, m, this.rotation[0]);
                    if (haveOrigin) {
                        origin[0] = -origin[0];
                        origin[1] = -origin[1];
                        mTranslate(m, m, origin);
                    }
                }
            }
            else {
                if (this.rotation !== 0) {
                    matrix.rotate(m, m, this.rotation);
                }
            }

            if (
                isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1])
            ) {
                mTranslate(m, m, this.position);
            }
        }

        // 应用父节点变换
        if (parentHasTransform) {
            if (this.needLocalTransform) {
                matrix.mul(m, this.parent.transform, m);
            }
            else {
                matrix.copy(m, this.parent.transform);
            }
        }
        // 保存这个变换矩阵
        this.transform = m;

        this.invTransform = this.invTransform || matrix.create();
        matrix.invert(this.invTransform, m);
    },
    /**
     * 将自己的transform应用到context上
     * @param {Context2D} ctx
     */
    setTransform: function (ctx) {
        if (this.needTransform) {
            var m = this.transform;
            ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
    },
    /**
     * 设置图形的朝向
     * @param  {Array.<number>|Float32Array} target
     * @method
     */
    lookAt: (function () {
        var v = vector.create();
        return function (target) {
            if (!this.transform) {
                this.transform = matrix.create();
            }
            var m = this.transform;
            vector.sub(v, target, this.position);
            if (isAroundZero(v[0]) && isAroundZero(v[1])) {
                return;
            }
            vector.normalize(v, v);
            var scale = this.scale;
            // Y Axis
            // TODO Scale origin ?
            m[2] = v[0] * scale[1];
            m[3] = v[1] * scale[1];
            // X Axis
            m[0] = v[1] * scale[0];
            m[1] = -v[0] * scale[0];
            // Position
            m[4] = this.position[0];
            m[5] = this.position[1];

            this.decomposeTransform();
        };
    })(),
    /**
     * 分解`transform`矩阵到`position`, `rotation`, `scale`
     */
    decomposeTransform: function () {
        if (!this.transform) {
            return;
        }
        var m = this.transform;
        var sx = m[0] * m[0] + m[1] * m[1];
        var position = this.position;
        var scale = this.scale;
        var rotation = this.rotation;
        if (isNotAroundZero(sx - 1)) {
            sx = Math.sqrt(sx);
        }
        var sy = m[2] * m[2] + m[3] * m[3];
        if (isNotAroundZero(sy - 1)) {
            sy = Math.sqrt(sy);
        }
        position[0] = m[4];
        position[1] = m[5];
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = scale[3] = 0;
        rotation[0] = Math.atan2(-m[1] / sy, m[0] / sx);
        rotation[1] = rotation[2] = 0;
    },

    /**
     * 变换坐标位置到 shape 的局部坐标空间
     * @method
     * @param {number} x
     * @param {number} y
     * @return {Array.<number>}
     */
    transformCoordToLocal: function (x, y) {
        var v2 = [x, y];
        if (this.needTransform && this.invTransform) {
            matrix.mulVector(v2, this.invTransform, v2);
        }
        return v2;
    }
};

module.exports = Transformable;

},{"../tool/matrix":71,"../tool/vector":73}],53:[function(require,module,exports){
/**
 * shape基类
 * @module zrender/shape/Base
 * @author  Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *          errorrik (errorrik@gmail.com)
 */

/**
 * @typedef {Object} IBaseShapeStyle
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

/**
 * @typedef {Object} module:zrender/shape/Base~IBoundingRect
 * @property {number} x 左上角顶点x轴坐标
 * @property {number} y 左上角顶点y轴坐标
 * @property {number} width 包围盒矩形宽度
 * @property {number} height 包围盒矩形高度
 */


var vmlCanvasManager = window['G_vmlCanvasManager'];

var matrix = require('../tool/matrix');
var guid = require('../tool/guid');
var util = require('../tool/util');
var log = require('../tool/log');

var Transformable = require('../mixin/Transformable');
var Eventful = require('../mixin/Eventful');

function _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
    if (textFont) {
        ctx.font = textFont;
    }
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    var rect = _getTextRect(
        text, x, y, textFont, textAlign, textBaseline
    );

    text = (text + '').split('\n');
    var lineHeight = require('../tool/area').getTextHeight('国', textFont);

    switch (textBaseline) {
        case 'top':
            y = rect.y;
            break;
        case 'bottom':
            y = rect.y + lineHeight;
            break;
        default:
            y = rect.y + lineHeight / 2;
    }

    for (var i = 0, l = text.length; i < l; i++) {
        ctx.fillText(text[i], x, y);
        y += lineHeight;
    }
}

/**
 * 返回矩形区域，用于局部刷新和文字定位
 * @inner
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {string} textFont
 * @param {string} textAlign
 * @param {string} textBaseline
 */
function _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
    var area = require('../tool/area');
    var width = area.getTextWidth(text, textFont);
    var lineHeight = area.getTextHeight('国', textFont);

    text = (text + '').split('\n');

    switch (textAlign) {
        case 'end':
        case 'right':
            x -= width;
            break;
        case 'center':
            x -= (width / 2);
            break;
    }

    switch (textBaseline) {
        case 'top':
            break;
        case 'bottom':
            y -= lineHeight * text.length;
            break;
        default:
            y -= lineHeight * text.length / 2;
    }

    return {
        x: x,
        y: y,
        width: width,
        height: lineHeight * text.length
    };
}

/**
 * @alias module:zrender/shape/Base
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @extends module:zrender/mixin/Eventful
 * @param {Object} options 关于shape的配置项，可以是shape的自有属性，也可以是自定义的属性。
 */
var Base = function (options) {

    options = options || {};

    /**
     * Shape id, 全局唯一
     * @type {string}
     */
    this.id = options.id || guid();

    for (var key in options) {
        this[key] = options[key];
    }

    /**
     * 基础绘制样式
     * @type {module:zrender/shape/Base~IBaseShapeStyle}
     */
    this.style = this.style || {};

    /**
     * 高亮样式
     * @type {module:zrender/shape/Base~IBaseShapeStyle}
     */
    this.highlightStyle = this.highlightStyle || null;

    /**
     * 父节点
     * @readonly
     * @type {module:zrender/Group}
     * @default null
     */
    this.parent = null;

    this.__dirty = true;

    this.__clipShapes = [];

    Transformable.call(this);
    Eventful.call(this);
};
/**
 * 图形是否可见，为true时不绘制图形，但是仍能触发鼠标事件
 * @name module:zrender/shape/Base#invisible
 * @type {boolean}
 * @default false
 */
Base.prototype.invisible = false;

/**
 * 图形是否忽略，为true时忽略图形的绘制以及事件触发
 * @name module:zrender/shape/Base#ignore
 * @type {boolean}
 * @default false
 */
Base.prototype.ignore = false;

/**
 * z层level，决定绘画在哪层canvas中
 * @name module:zrender/shape/Base#zlevel
 * @type {number}
 * @default 0
 */
Base.prototype.zlevel = 0;

/**
 * 是否可拖拽
 * @name module:zrender/shape/Base#draggable
 * @type {boolean}
 * @default false
 */
Base.prototype.draggable = false;

/**
 * 是否可点击
 * @name module:zrender/shape/Base#clickable
 * @type {boolean}
 * @default false
 */
Base.prototype.clickable = false;

/**
 * 是否可以hover
 * @name module:zrender/shape/Base#hoverable
 * @type {boolean}
 * @default true
 */
Base.prototype.hoverable = true;

/**
 * z值，跟zlevel一样影响shape绘制的前后顺序，z值大的shape会覆盖在z值小的上面，
 * 但是并不会创建新的canvas，所以优先级低于zlevel，而且频繁改动的开销比zlevel小很多。
 *
 * @name module:zrender/shape/Base#z
 * @type {number}
 * @default 0
 */
Base.prototype.z = 0;

/**
 * 绘制图形
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {boolean} [isHighlight=false] 是否使用高亮属性
 * @param {Function} [updateCallback]
 *        需要异步加载资源的shape可以通过这个callback(e),
 *        让painter更新视图，base.brush没用，需要的话重载brush
 */
Base.prototype.brush = function (ctx, isHighlight) {

    var style = this.beforeBrush(ctx, isHighlight);

    ctx.beginPath();
    this.buildPath(ctx, style);

    switch (style.brushType) {
        /* jshint ignore:start */
        case 'both':
            ctx.fill();
        case 'stroke':
            style.lineWidth > 0 && ctx.stroke();
            break;
        /* jshint ignore:end */
        default:
            ctx.fill();
    }

    this.drawText(ctx, style, this.style);

    this.afterBrush(ctx);
};

/**
 * 具体绘制操作前的一些公共操作
 * @param {CanvasRenderingContext2D} ctx
 * @param {boolean} [isHighlight=false] 是否使用高亮属性
 * @return {Object} 处理后的样式
 */
Base.prototype.beforeBrush = function (ctx, isHighlight) {
    var style = this.style;

    if (this.brushTypeOnly) {
        style.brushType = this.brushTypeOnly;
    }

    if (isHighlight) {
        // 根据style扩展默认高亮样式
        style = this.getHighlightStyle(
            style,
            this.highlightStyle || {},
            this.brushTypeOnly
        );
    }

    if (this.brushTypeOnly == 'stroke') {
        style.strokeColor = style.strokeColor || style.color;
    }

    ctx.save();

    this.doClip(ctx);

    this.setContext(ctx, style);

    // 设置transform
    this.setTransform(ctx);

    return style;
};

/**
 * 绘制后的处理
 * @param {CanvasRenderingContext2D} ctx
 */
Base.prototype.afterBrush = function (ctx) {
    ctx.restore();
};

var STYLE_CTX_MAP = [
    ['color', 'fillStyle'],
    ['strokeColor', 'strokeStyle'],
    ['opacity', 'globalAlpha'],
    ['lineCap', 'lineCap'],
    ['lineJoin', 'lineJoin'],
    ['miterLimit', 'miterLimit'],
    ['lineWidth', 'lineWidth'],
    ['shadowBlur', 'shadowBlur'],
    ['shadowColor', 'shadowColor'],
    ['shadowOffsetX', 'shadowOffsetX'],
    ['shadowOffsetY', 'shadowOffsetY']
];

/**
 * 设置 fillStyle, strokeStyle, shadow 等通用绘制样式
 * @param {CanvasRenderingContext2D} ctx
 * @param {module:zrender/shape/Base~IBaseShapeStyle} style
 */
Base.prototype.setContext = function (ctx, style) {
    for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
        var styleProp = STYLE_CTX_MAP[i][0];
        var styleValue = style[styleProp];
        var ctxProp = STYLE_CTX_MAP[i][1];

        if (typeof styleValue != 'undefined') {
            ctx[ctxProp] = styleValue;
        }
    }
};

var clipShapeInvTransform = matrix.create();
Base.prototype.doClip = function (ctx) {
    if (this.__clipShapes && !vmlCanvasManager) {
        for (var i = 0; i < this.__clipShapes.length; i++) {
            var m = 0;
            var clipShape = this.__clipShapes[i];
            if (clipShape.needTransform) {
                m = clipShape.transform;
                matrix.invert(clipShapeInvTransform, m);
                ctx.transform(
                    m[0], m[1],
                    m[2], m[3],
                    m[4], m[5]
                );
            }
            ctx.beginPath();
            clipShape.buildPath(ctx, clipShape.style);
            ctx.clip();
            // Transform back
            if (clipShape.needTransform) {
                m = clipShapeInvTransform;
                ctx.transform(
                    m[0], m[1],
                    m[2], m[3],
                    m[4], m[5]
                );
            }
        }
    }
};

/**
 * 根据默认样式扩展高亮样式
 *
 * @param {module:zrender/shape/Base~IBaseShapeStyle} style 默认样式
 * @param {module:zrender/shape/Base~IBaseShapeStyle} highlightStyle 高亮样式
 * @param {string} brushTypeOnly
 */
Base.prototype.getHighlightStyle = function (style, highlightStyle, brushTypeOnly) {
    var newStyle = {}, k;
    for (k in style) {
        newStyle[k] = style[k];
    }

    var color = require('../tool/color');
    var highlightColor = color.getHighlightColor();
    // 根据highlightStyle扩展
    if (style.brushType != 'stroke') {
        // 带填充则用高亮色加粗边线
        newStyle.strokeColor = highlightColor;
        newStyle.lineWidth = (style.lineWidth || 1) + this.getHighlightZoom();
        newStyle.brushType = 'both';
    }
    else {
        if (brushTypeOnly != 'stroke') {
            // 描边型的则用原色加工高亮
            newStyle.strokeColor = highlightColor;
            newStyle.lineWidth = (style.lineWidth || 1) + this.getHighlightZoom();
        }
        else {
            // 线型的则用原色加工高亮
            newStyle.strokeColor = highlightStyle.strokeColor || color.mix(
                style.strokeColor,
                color.toRGB(highlightColor)
            );
        }
    }

    // 可自定义覆盖默认值
    for (k in highlightStyle) {
        if (typeof highlightStyle[k] != 'undefined') {
            newStyle[k] = highlightStyle[k];
        }
    }

    return newStyle;
};

// 高亮放大效果参数
// 当前统一设置为6，如有需要差异设置，通过this.type判断实例类型
Base.prototype.getHighlightZoom = function () {
    return this.type != 'text' ? 6 : 2;
};

/**
 * 移动位置
 * @param {number} dx 横坐标变化
 * @param {number} dy 纵坐标变化
 */
Base.prototype.drift = function (dx, dy) {
    this.position[0] += dx;
    this.position[1] += dy;
};

/**
 * 构建绘制的Path
 * @param {CanvasRenderingContext2D} ctx
 * @param {module:zrender/shape/Base~IBaseShapeStyle} style
 */
Base.prototype.buildPath = function (ctx, style) {
    log('buildPath not implemented in ' + this.type);
};

/**
 * 计算返回包围盒矩形
 * @param {module:zrender/shape/Base~IBaseShapeStyle} style
 * @return {module:zrender/shape/Base~IBoundingRect}
 */
Base.prototype.getRect = function (style) {
    log('getRect not implemented in ' + this.type);
};

/**
 * 判断鼠标位置是否在图形内
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
Base.prototype.isCover = function (x, y) {
    var originPos = this.transformCoordToLocal(x, y);
    x = originPos[0];
    y = originPos[1];

    // 快速预判并保留判断矩形
    if (this.isCoverRect(x, y)) {
        // 矩形内
        return require('../tool/area').isInside(this, this.style, x, y);
    }

    return false;
};

Base.prototype.isCoverRect = function (x, y) {
    // 快速预判并保留判断矩形
    var rect = this.style.__rect;
    if (!rect) {
        rect = this.style.__rect = this.getRect(this.style);
    }
    return x >= rect.x && x <= (rect.x + rect.width) && y >= rect.y && y <= (rect.y + rect.height);
};

/**
 * 绘制附加文本
 * @param {CanvasRenderingContext2D} ctx
 * @param {module:zrender/shape/Base~IBaseShapeStyle} style 样式
 * @param {module:zrender/shape/Base~IBaseShapeStyle} normalStyle 默认样式，用于定位文字显示
 */
Base.prototype.drawText = function (ctx, style, normalStyle) {
    if (typeof(style.text) == 'undefined' || style.text === false) {
        return;
    }
    // 字体颜色策略
    var textColor = style.textColor || style.color || style.strokeColor;
    ctx.fillStyle = textColor;

    // 文本与图形间空白间隙
    var dd = 10;
    var al;         // 文本水平对齐
    var bl;         // 文本垂直对齐
    var tx;         // 文本横坐标
    var ty;         // 文本纵坐标

    var textPosition = style.textPosition || this.textPosition || 'top';      // 用户定义// shape默认// 全局默认

    switch (textPosition) {
        case 'inside':
        case 'top':
        case 'bottom':
        case 'left':
        case 'right':
            if (this.getRect) {
                var rect = (normalStyle || style).__rect || this.getRect(normalStyle || style);

                switch (textPosition) {
                    case 'inside':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height / 2;
                        al = 'center';
                        bl = 'middle';
                        if (style.brushType != 'stroke' && textColor == style.color) {
                            ctx.fillStyle = '#fff';
                        }
                        break;
                    case 'left':
                        tx = rect.x - dd;
                        ty = rect.y + rect.height / 2;
                        al = 'end';
                        bl = 'middle';
                        break;
                    case 'right':
                        tx = rect.x + rect.width + dd;
                        ty = rect.y + rect.height / 2;
                        al = 'start';
                        bl = 'middle';
                        break;
                    case 'top':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y - dd;
                        al = 'center';
                        bl = 'bottom';
                        break;
                    case 'bottom':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height + dd;
                        al = 'center';
                        bl = 'top';
                        break;
                }
            }
            break;
        case 'start':
        case 'end':
            var pointList = style.pointList || [
                    [style.xStart || 0, style.yStart || 0],
                    [style.xEnd || 0, style.yEnd || 0]
                ];
            var length = pointList.length;
            if (length < 2) {
                // 少于2个点就不画了~
                return;
            }
            var xStart;
            var xEnd;
            var yStart;
            var yEnd;
            switch (textPosition) {
                case 'start':
                    xStart = pointList[1][0];
                    xEnd = pointList[0][0];
                    yStart = pointList[1][1];
                    yEnd = pointList[0][1];
                    break;
                case 'end':
                    xStart = pointList[length - 2][0];
                    xEnd = pointList[length - 1][0];
                    yStart = pointList[length - 2][1];
                    yEnd = pointList[length - 1][1];
                    break;
            }
            tx = xEnd;
            ty = yEnd;

            var angle = Math.atan((yStart - yEnd) / (xEnd - xStart)) / Math.PI * 180;
            if ((xEnd - xStart) < 0) {
                angle += 180;
            }
            else if ((yStart - yEnd) < 0) {
                angle += 360;
            }

            dd = 5;
            if (angle >= 30 && angle <= 150) {
                al = 'center';
                bl = 'bottom';
                ty -= dd;
            }
            else if (angle > 150 && angle < 210) {
                al = 'right';
                bl = 'middle';
                tx -= dd;
            }
            else if (angle >= 210 && angle <= 330) {
                al = 'center';
                bl = 'top';
                ty += dd;
            }
            else {
                al = 'left';
                bl = 'middle';
                tx += dd;
            }
            break;
        case 'specific':
            tx = style.textX || 0;
            ty = style.textY || 0;
            al = 'start';
            bl = 'middle';
            break;
    }

    if (tx !== null && ty !== null) {
        _fillText(
            ctx,
            style.text,
            tx, ty,
            style.textFont,
            style.textAlign || al,
            style.textBaseline || bl
        );
    }
};

Base.prototype.modSelf = function () {
    this.__dirty = true;
    if (this.style) {
        this.style.__rect = null;
    }
    if (this.highlightStyle) {
        this.highlightStyle.__rect = null;
    }
};

/**
 * 图形是否会触发事件
 * @return {boolean}
 */
    // TODO, 通过 bind 绑定的事件
Base.prototype.isSilent = function () {
    return !(
    this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop
    );
};

util.merge(Base.prototype, Transformable.prototype, true);
util.merge(Base.prototype, Eventful.prototype, true);

module.exports = Base;

},{"../mixin/Eventful":51,"../mixin/Transformable":52,"../tool/area":64,"../tool/color":65,"../tool/guid":69,"../tool/log":70,"../tool/matrix":71,"../tool/util":72}],54:[function(require,module,exports){
/**
 * 圆形
 * @module zrender/shape/Circle
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @example
 *   var Circle = require('zrender/shape/Circle');
 *   var shape = new Circle({
 *       style: {
 *           x: 100,
 *           y: 100,
 *           r: 40,
 *           brushType: 'both',
 *           color: 'blue',
 *           strokeColor: 'red',
 *           lineWidth: 3,
 *           text: 'Circle'
 *       }    
 *   });
 *   zr.addShape(shape);
 */

/**
 * @typedef {Object} ICircleStyle
 * @property {number} x 圆心x坐标
 * @property {number} y 圆心y坐标
 * @property {number} r 半径
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */


var Base = require('./Base');

/**
 * @alias module:zrender/shape/Circle
 * @constructor
 * @extends module:zrender/shape/Base
 * @param {Object} options
 */
var Circle = function (options) {
    Base.call(this, options);
    /**
     * 圆形绘制样式
     * @name module:zrender/shape/Circle#style
     * @type {module:zrender/shape/Circle~ICircleStyle}
     */
    /**
     * 圆形高亮绘制样式
     * @name module:zrender/shape/Circle#highlightStyle
     * @type {module:zrender/shape/Circle~ICircleStyle}
     */
};

Circle.prototype = {
    type: 'circle',
    /**
     * 创建圆形路径
     * @param {CanvasRenderingContext2D} ctx
     * @param {module:zrender/shape/Circle~ICircleStyle} style
     */
    buildPath: function (ctx, style) {
        // Better stroking in ShapeBundle
        ctx.moveTo(style.x + style.r, style.y);
        ctx.arc(style.x, style.y, style.r, 0, Math.PI * 2, true);
        return;
    },

    /**
     * 计算返回圆形的包围盒矩形
     * @param {module:zrender/shape/Circle~ICircleStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round(style.x - style.r - lineWidth / 2),
            y: Math.round(style.y - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }
};

require('../tool/util').inherits(Circle, Base);
module.exports = Circle;


},{"../tool/util":72,"./Base":53}],55:[function(require,module,exports){
/**
 * 图片绘制
 * @module zrender/shape/Image
 * @author pissang(https://www.github.com/pissang)
 * @example
 *     var ImageShape = require('zrender/shape/Image');
 *     var image = new ImageShape({
 *         style: {
 *             image: 'test.jpg',
 *             x: 100,
 *             y: 100
 *         }
 *     });
 *     zr.addShape(image);
 */

/**
 * @typedef {Object} IImageStyle
 * @property {string|HTMLImageElement|HTMLCanvasElement} image 图片url或者图片对象
 * @property {number} x 左上角横坐标
 * @property {number} y 左上角纵坐标
 * @property {number} [width] 绘制到画布上的宽度，默认为图片宽度
 * @property {number} [height] 绘制到画布上的高度，默认为图片高度
 * @property {number} [sx=0] 从图片中裁剪的左上角横坐标
 * @property {number} [sy=0] 从图片中裁剪的左上角纵坐标
 * @property {number} [sWidth] 从图片中裁剪的宽度，默认为图片高度
 * @property {number} [sHeight] 从图片中裁剪的高度，默认为图片高度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */


var Base = require('./Base');

/**
 * @alias zrender/shape/Image
 * @constructor
 * @extends module:zrender/shape/Base
 * @param {Object} options
 */
var ZImage = function (options) {
    Base.call(this, options);
    /**
     * 图片绘制样式
     * @name module:zrender/shape/Image#style
     * @type {module:zrender/shape/Image~IImageStyle}
     */
    /**
     * 图片高亮绘制样式
     * @name module:zrender/shape/Image#highlightStyle
     * @type {module:zrender/shape/Image~IImageStyle}
     */
};

ZImage.prototype = {

    type: 'image',

    brush: function (ctx, isHighlight, refreshNextFrame) {
        var style = this.style || {};

        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        var image = style.image;
        var self = this;

        if (!this._imageCache) {
            this._imageCache = {};
        }
        if (typeof(image) === 'string') {
            var src = image;
            if (this._imageCache[src]) {
                image = this._imageCache[src];
            } else {
                image = new Image();
                image.onload = function () {
                    image.onload = null;
                    self.modSelf();
                    refreshNextFrame();
                };

                image.src = src;
                this._imageCache[src] = image;
            }
        }
        if (image) {
            // 图片已经加载完成
            if (image.nodeName.toUpperCase() == 'IMG') {
                if (window.ActiveXObject) {
                    if (image.readyState != 'complete') {
                        return;
                    }
                }
                else {
                    if (!image.complete) {
                        return;
                    }
                }
            }
            // Else is canvas
            var width = style.width || image.width;
            var height = style.height || image.height;
            var x = style.x;
            var y = style.y;
            // 图片加载失败
            if (!image.width || !image.height) {
                return;
            }

            ctx.save();

            this.doClip(ctx);

            this.setContext(ctx, style);

            // 设置transform
            this.setTransform(ctx);

            var sx = 0, sy = 0;
            if (style.sWidth && style.sHeight) {
                sx = style.sx || 0;
                sy = style.sy || 0;
                ctx.drawImage(
                    image,
                    sx, sy, style.sWidth, style.sHeight,
                    x, y, width, height
                );
            }
            else if (style.sx && style.sy) {
                sx = style.sx;
                sy = style.sy;
                var sWidth = width - sx;
                var sHeight = height - sy;
                ctx.drawImage(
                    image,
                    sx, sy, sWidth, sHeight,
                    x, y, width, height
                );
            }
            else {
                ctx.drawImage(image, x, y, width, height);
            }
            // 如果没设置宽和高的话自动根据图片宽高设置
            if (!style.width) {
                style.width = width;
            }
            if (!style.height) {
                style.height = height;
            }
            if (!this.style.width) {
                this.style.width = width;
            }
            if (!this.style.height) {
                this.style.height = height;
            }

            this.drawText(ctx, style, this.style);

            ctx.restore();
        }
    },

    /**
     * 计算返回图片的包围盒矩形
     * @param {module:zrender/shape/Image~IImageStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        return {
            x: style.x,
            y: style.y,
            width: style.width,
            height: style.height
        };
    },

    clearCache: function () {
        this._imageCache = {};
    }
};

require('../tool/util').inherits(ZImage, Base);
module.exports = ZImage;

},{"../tool/util":72,"./Base":53}],56:[function(require,module,exports){
/**
 * 直线
 * @module zrender/shape/Line
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @example
 *   var Line = require('zrender/shape/Line');
 *   var shape = new Line({
 *       style: {
 *           xStart: 0,
 *           yStart: 0,
 *           xEnd: 100,
 *           yEnd: 100,
 *           strokeColor: '#000',
 *           lineWidth: 10
 *       }
 *   });
 *   zr.addShape(line);
 */
/**
 * @typedef {Object} ILineStyle
 * @property {number} xStart 起点x坐标
 * @property {number} yStart 起点y坐标
 * @property {number} xEnd 终止点x坐标
 * @property {number} yEnd 终止点y坐标
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

var Base = require('./Base');
var dashedLineTo = require('./util/dashedLineTo');

/**
 * @alias module:zrender/shape/Line
 * @param {Object} options
 * @constructor
 * @extends module:zrender/shape/Base
 */
var Line = function (options) {
    this.brushTypeOnly = 'stroke';  // 线条只能描边，填充后果自负
    this.textPosition = 'end';
    Base.call(this, options);

    /**
     * 直线绘制样式
     * @name module:zrender/shape/Line#style
     * @type {module:zrender/shape/Line~ILineStyle}
     */
    /**
     * 直线高亮绘制样式
     * @name module:zrender/shape/Line#highlightStyle
     * @type {module:zrender/shape/Line~ILineStyle}
     */
};

Line.prototype = {
    type: 'line',

    /**
     * 创建线条路径
     * @param {CanvasRenderingContext2D} ctx
     * @param {module:zrender/shape/Line~ILineStyle} style
     */
    buildPath: function (ctx, style) {
        if (!style.lineType || style.lineType == 'solid') {
            // 默认为实线
            ctx.moveTo(style.xStart, style.yStart);
            ctx.lineTo(style.xEnd, style.yEnd);
        }
        else if (style.lineType == 'dashed' || style.lineType == 'dotted'
        ) {
            var dashLength = (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
            dashedLineTo(
                ctx,
                style.xStart, style.yStart,
                style.xEnd, style.yEnd,
                dashLength
            );
        }
    },

    /**
     * 计算返回线条的包围盒矩形
     * @param {module:zrender/shape/Line~ILineStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth = style.lineWidth || 1;
        style.__rect = {
            x: Math.min(style.xStart, style.xEnd) - lineWidth,
            y: Math.min(style.yStart, style.yEnd) - lineWidth,
            width: Math.abs(style.xStart - style.xEnd) + lineWidth,
            height: Math.abs(style.yStart - style.yEnd) + lineWidth
        };

        return style.__rect;
    }
};

require('../tool/util').inherits(Line, Base);
module.exports = Line;


},{"../tool/util":72,"./Base":53,"./util/dashedLineTo":61}],57:[function(require,module,exports){
/**
 * 多边形
 * @module zrender/shape/Polygon
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @example
 *     var Polygon = require('zrender/shape/Polygon');
 *     var shape = new Polygon({
 *         style: {
 *             // 100x100的正方形
 *             pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
 *             color: 'blue'
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} IPolygonStyle
 * @property {string} pointList 多边形顶点数组
 * @property {string} [smooth=''] 是否做平滑插值, 平滑算法可以选择 bezier, spline
 * @property {number} [smoothConstraint] 平滑约束
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

var Base = require('./Base');
var smoothSpline = require('./util/smoothSpline');
var smoothBezier = require('./util/smoothBezier');
var dashedLineTo = require('./util/dashedLineTo');

/**
 * @alias module:zrender/shape/Polygon
 * @param {Object} options
 * @constructor
 * @extends module:zrender/shape/Base
 */
var Polygon = function (options) {
    Base.call(this, options);
    /**
     * 多边形绘制样式
     * @name module:zrender/shape/Polygon#style
     * @type {module:zrender/shape/Polygon~IPolygonStyle}
     */
    /**
     * 多边形高亮绘制样式
     * @name module:zrender/shape/Polygon#highlightStyle
     * @type {module:zrender/shape/Polygon~IPolygonStyle}
     */
};

Polygon.prototype = {
    type: 'polygon',

    /**
     * 创建多边形路径
     * @param {CanvasRenderingContext2D} ctx
     * @param {module:zrender/shape/Polygon~IPolygonStyle} style
     */
    buildPath: function (ctx, style) {
        // 虽然能重用brokenLine，但底层图形基于性能考虑，重复代码减少调用吧
        var pointList = style.pointList;
        // 开始点和结束点重复
        /*
         var start = pointList[0];
         var end = pointList[pointList.length-1];

         if (start && end) {
         if (start[0] == end[0] &&
         start[1] == end[1]) {
         // 移除最后一个点
         pointList.pop();
         }
         }
         */

        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var i = 0;
        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = smoothBezier(
                pointList, style.smooth, true, style.smoothConstraint
            );

            ctx.moveTo(pointList[0][0], pointList[0][1]);
            var cp1;
            var cp2;
            var p;
            var len = pointList.length;
            for (i = 0; i < len; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = pointList[(i + 1) % len];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        }
        else {
            if (style.smooth === 'spline') {
                pointList = smoothSpline(pointList, true);
            }

            if (!style.lineType || style.lineType == 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (i = 1, l = pointList.length; i < l; i++) {
                    ctx.lineTo(pointList[i][0], pointList[i][1]);
                }
                ctx.lineTo(pointList[0][0], pointList[0][1]);
            }
            else if (style.lineType == 'dashed' || style.lineType == 'dotted'
            ) {
                var dashLength =
                    style._dashLength || (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLength;
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (i = 1, l = pointList.length; i < l; i++) {
                    dashedLineTo(
                        ctx,
                        pointList[i - 1][0], pointList[i - 1][1],
                        pointList[i][0], pointList[i][1],
                        dashLength
                    );
                }
                dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0],
                    pointList[pointList.length - 1][1],
                    pointList[0][0],
                    pointList[0][1],
                    dashLength
                );
            }
        }

        ctx.closePath();
        return;
    },

    /**
     * 计算返回多边形包围盒矩阵
     * @param {module:zrender/shape/Polygon~IPolygonStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        var pointList = style.pointList;
        for (var i = 0, l = pointList.length; i < l; i++) {
            if (pointList[i][0] < minX) {
                minX = pointList[i][0];
            }
            if (pointList[i][0] > maxX) {
                maxX = pointList[i][0];
            }
            if (pointList[i][1] < minY) {
                minY = pointList[i][1];
            }
            if (pointList[i][1] > maxY) {
                maxY = pointList[i][1];
            }
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }

        style.__rect = {
            x: Math.round(minX - lineWidth / 2),
            y: Math.round(minY - lineWidth / 2),
            width: maxX - minX + lineWidth,
            height: maxY - minY + lineWidth
        };
        return style.__rect;
    }
};

require('../tool/util').inherits(Polygon, Base);
module.exports = Polygon;



},{"../tool/util":72,"./Base":53,"./util/dashedLineTo":61,"./util/smoothBezier":62,"./util/smoothSpline":63}],58:[function(require,module,exports){
/**
 * 折线
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @module zrender/shape/Polyline
 * @example
 *     var Polyline = require('zrender/shape/Polyline');
 *     var shape = new Polyline({
 *         style: {
 *             pointList: [[0, 0], [100, 100], [100, 0]],
 *             smooth: 'bezier',
 *             strokeColor: 'purple'
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} IPolylineStyle
 * @property {Array.<number>} pointList 顶点坐标数组
 * @property {string|number} [smooth='bezier'] 是否做平滑插值, 平滑算法可以选择 bezier, spline
 * @property {number} [smoothConstraint] 平滑约束
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {string} [lineJoin='miter'] 线段连接样式，可以是 miter, round, bevel
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

var Base = require('./Base');
var smoothSpline = require('./util/smoothSpline');
var smoothBezier = require('./util/smoothBezier');
var dashedLineTo = require('./util/dashedLineTo');

/**
 * @alias module:zrender/shape/Polyline
 * @constructor
 * @extends module:zrender/shape/Base
 * @param {Object} options
 */
var Polyline = function (options) {
    this.brushTypeOnly = 'stroke';  // 线条只能描边，填充后果自负
    this.textPosition = 'end';
    Base.call(this, options);
    /**
     * 贝赛尔曲线绘制样式
     * @name module:zrender/shape/Polyline#style
     * @type {module:zrender/shape/Polyline~IPolylineStyle}
     */
    /**
     * 贝赛尔曲线高亮绘制样式
     * @name module:zrender/shape/Polyline#highlightStyle
     * @type {module:zrender/shape/Polyline~IPolylineStyle}
     */
};

Polyline.prototype = {
    type: 'polyline',

    /**
     * 创建多边形路径
     * @param {CanvasRenderingContext2D} ctx
     * @param {module:zrender/shape/Polyline~IPolylineStyle} style
     */
    buildPath: function (ctx, style) {
        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var len = Math.min(
            style.pointList.length,
            Math.round(style.pointListLength || style.pointList.length)
        );

        var i = 0;
        if (style.smooth && style.smooth !== 'spline') {
            if (!style.controlPointList) {
                this.updateControlPoints(style);
            }
            var controlPointList = style.controlPointList;

            ctx.moveTo(pointList[0][0], pointList[0][1]);
            var cp1;
            var cp2;
            var p;
            for (i = 0; i < len - 1; i++) {
                cp1 = controlPointList[i * 2];
                cp2 = controlPointList[i * 2 + 1];
                p = pointList[i + 1];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        }
        else {
            if (style.smooth === 'spline') {
                pointList = smoothSpline(pointList);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType == 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (i = 1; i < len; i++) {
                    ctx.lineTo(pointList[i][0], pointList[i][1]);
                }
            }
            else if (style.lineType == 'dashed' || style.lineType == 'dotted'
            ) {
                var dashLength = (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (i = 1; i < len; i++) {
                    dashedLineTo(
                        ctx,
                        pointList[i - 1][0], pointList[i - 1][1],
                        pointList[i][0], pointList[i][1],
                        dashLength
                    );
                }
            }
        }
        return;
    },

    updateControlPoints: function (style) {
        style.controlPointList = smoothBezier(
            style.pointList, style.smooth, false, style.smoothConstraint
        );
    },

    /**
     * 计算返回折线包围盒矩形。
     * @param {IZRenderBezierCurveStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        return require('./Polygon').prototype.getRect(style);
    }
};

require('../tool/util').inherits(Polyline, Base);
module.exports = Polyline;


},{"../tool/util":72,"./Base":53,"./Polygon":57,"./util/dashedLineTo":61,"./util/smoothBezier":62,"./util/smoothSpline":63}],59:[function(require,module,exports){
/**
 * 矩形
 * @module zrender/shape/Rectangle
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com) ,
 *         strwind (@劲风FEI)
 * @example
 *     var Rectangle = require('zrender/shape/Rectangle');
 *     var shape = new Rectangle({
 *         style: {
 *             x: 0,
 *             y: 0,
 *             width: 100,
 *             height: 100,
 *             radius: 20
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} IRectangleStyle
 * @property {number} x 左上角x坐标
 * @property {number} y 左上角y坐标
 * @property {number} width 宽度
 * @property {number} height 高度
 * @property {number|Array.<number>} radius 矩形圆角，可以用数组分别指定四个角的圆角
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

var Base = require('./Base');

/**
 * @alias module:zrender/shape/Rectangle
 * @constructor
 * @extends module:zrender/shape/Base
 * @param {Object} options
 */
var Rectangle = function (options) {
    Base.call(this, options);
    /**
     * 矩形绘制样式
     * @name module:zrender/shape/Rectangle#style
     * @type {module:zrender/shape/Rectangle~IRectangleStyle}
     */
    /**
     * 矩形高亮绘制样式
     * @name module:zrender/shape/Rectangle#highlightStyle
     * @type {module:zrender/shape/Rectangle~IRectangleStyle}
     */
};

Rectangle.prototype = {
    type: 'rectangle',

    _buildRadiusPath: function (ctx, style) {
        // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
        // r缩写为1         相当于 [1, 1, 1, 1]
        // r缩写为[1]       相当于 [1, 1, 1, 1]
        // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
        // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
        var x = style.x;
        var y = style.y;
        var width = style.width;
        var height = style.height;
        var r = style.radius;
        var r1;
        var r2;
        var r3;
        var r4;

        if (typeof r === 'number') {
            r1 = r2 = r3 = r4 = r;
        }
        else if (r instanceof Array) {
            if (r.length === 1) {
                r1 = r2 = r3 = r4 = r[0];
            }
            else if (r.length === 2) {
                r1 = r3 = r[0];
                r2 = r4 = r[1];
            }
            else if (r.length === 3) {
                r1 = r[0];
                r2 = r4 = r[1];
                r3 = r[2];
            }
            else {
                r1 = r[0];
                r2 = r[1];
                r3 = r[2];
                r4 = r[3];
            }
        }
        else {
            r1 = r2 = r3 = r4 = 0;
        }

        var total;
        if (r1 + r2 > width) {
            total = r1 + r2;
            r1 *= width / total;
            r2 *= width / total;
        }
        if (r3 + r4 > width) {
            total = r3 + r4;
            r3 *= width / total;
            r4 *= width / total;
        }
        if (r2 + r3 > height) {
            total = r2 + r3;
            r2 *= height / total;
            r3 *= height / total;
        }
        if (r1 + r4 > height) {
            total = r1 + r4;
            r1 *= height / total;
            r4 *= height / total;
        }
        ctx.moveTo(x + r1, y);
        ctx.lineTo(x + width - r2, y);
        if (r2 !== 0) ctx.quadraticCurveTo(x + width, y, x + width, y + r2);
        ctx.lineTo(x + width, y + height - r3);
        if (r3 !== 0) ctx.quadraticCurveTo(
            x + width, y + height, x + width - r3, y + height
        );
        ctx.lineTo(x + r4, y + height);
        if (r4 !== 0) ctx.quadraticCurveTo(
            x, y + height, x, y + height - r4
        );
        ctx.lineTo(x, y + r1);
        if (r1 !== 0) ctx.quadraticCurveTo(x, y, x + r1, y);
    },

    /**
     * 创建矩形路径
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} style
     */
    buildPath: function (ctx, style) {
        if (!style.radius) {
            ctx.moveTo(style.x, style.y);
            ctx.lineTo(style.x + style.width, style.y);
            ctx.lineTo(style.x + style.width, style.y + style.height);
            ctx.lineTo(style.x, style.y + style.height);
            ctx.lineTo(style.x, style.y);
            // ctx.rect(style.x, style.y, style.width, style.height);
        }
        else {
            this._buildRadiusPath(ctx, style);
        }
        ctx.closePath();
        return;
    },

    /**
     * 计算返回矩形包围盒矩阵
     * @param {module:zrender/shape/Rectangle~IRectangleStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round(style.x - lineWidth / 2),
            y: Math.round(style.y - lineWidth / 2),
            width: style.width + lineWidth,
            height: style.height + lineWidth
        };

        return style.__rect;
    }
};

require('../tool/util').inherits(Rectangle, Base);
module.exports = Rectangle;

},{"../tool/util":72,"./Base":53}],60:[function(require,module,exports){
/**
 * @module zrender/shape/Text
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 * @example
 *     var Text = require('zrender/shape/Text');
 *     var shape = new Text({
 *         style: {
 *             text: 'Label',
 *             x: 100,
 *             y: 100,
 *             textFont: '14px Arial'
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} ITextStyle
 * @property {number} x 横坐标
 * @property {number} y 纵坐标
 * @property {string} text 文本内容
 * @property {number} [maxWidth=null] 最大宽度限制
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textAlign] 可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 */


var area = require('../tool/area');
var Base = require('./Base');

/**
 * @alias module:zrender/shape/Text
 * @constructor
 * @extends module:zrender/shape/Base
 * @param {Object} options
 */
var Text = function (options) {
    Base.call(this, options);
    /**
     * 文字绘制样式
     * @name module:zrender/shape/Text#style
     * @type {module:zrender/shape/Text~ITextStyle}
     */
    /**
     * 文字高亮绘制样式
     * @name module:zrender/shape/Text#highlightStyle
     * @type {module:zrender/shape/Text~ITextStyle}
     */
};

Text.prototype = {
    type: 'text',

    brush: function (ctx, isHighlight) {
        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }

        ctx.save();
        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        if (style.textFont) {
            ctx.font = style.textFont;
        }
        ctx.textAlign = style.textAlign || 'start';
        ctx.textBaseline = style.textBaseline || 'middle';

        var text = (style.text + '').split('\n');
        var lineHeight = area.getTextHeight('国', style.textFont);
        var rect = this.getRect(style);
        var x = style.x;
        var y;
        if (style.textBaseline == 'top') {
            y = rect.y;
        }
        else if (style.textBaseline == 'bottom') {
            y = rect.y + lineHeight;
        }
        else {
            y = rect.y + lineHeight / 2;
        }

        for (var i = 0, l = text.length; i < l; i++) {
            if (style.maxWidth) {
                switch (style.brushType) {
                    case 'fill':
                        ctx.fillText(
                            text[i],
                            x, y, style.maxWidth
                        );
                        break;
                    case 'stroke':
                        ctx.strokeText(
                            text[i],
                            x, y, style.maxWidth
                        );
                        break;
                    case 'both':
                        ctx.fillText(
                            text[i],
                            x, y, style.maxWidth
                        );
                        ctx.strokeText(
                            text[i],
                            x, y, style.maxWidth
                        );
                        break;
                    default:
                        ctx.fillText(
                            text[i],
                            x, y, style.maxWidth
                        );
                }
            }
            else {
                switch (style.brushType) {
                    case 'fill':
                        ctx.fillText(text[i], x, y);
                        break;
                    case 'stroke':
                        ctx.strokeText(text[i], x, y);
                        break;
                    case 'both':
                        ctx.fillText(text[i], x, y);
                        ctx.strokeText(text[i], x, y);
                        break;
                    default:
                        ctx.fillText(text[i], x, y);
                }
            }
            y += lineHeight;
        }

        ctx.restore();
        return;
    },

    /**
     * 返回文字包围盒矩形
     * @param {module:zrender/shape/Text~ITextStyle} style
     * @return {module:zrender/shape/Base~IBoundingRect}
     */
    getRect: function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        var width = area.getTextWidth(style.text, style.textFont);
        var height = area.getTextHeight(style.text, style.textFont);

        var textX = style.x;                 // 默认start == left
        if (style.textAlign == 'end' || style.textAlign == 'right') {
            textX -= width;
        }
        else if (style.textAlign == 'center') {
            textX -= (width / 2);
        }

        var textY;
        if (style.textBaseline == 'top') {
            textY = style.y;
        }
        else if (style.textBaseline == 'bottom') {
            textY = style.y - height;
        }
        else {
            // middle
            textY = style.y - height / 2;
        }

        style.__rect = {
            x: textX,
            y: textY,
            width: width,
            height: height
        };

        return style.__rect;
    }
};

require('../tool/util').inherits(Text, Base);
module.exports = Text;



},{"../tool/area":64,"../tool/util":72,"./Base":53}],61:[function(require,module,exports){
/**
 * 虚线lineTo
 *
 * author:  Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *          errorrik (errorrik@gmail.com)
 */


var dashPattern = [5, 5];
/**
 * 虚线lineTo
 */
module.exports = function (ctx, x1, y1, x2, y2, dashLength) {
    // http://msdn.microsoft.com/en-us/library/ie/dn265063(v=vs.85).aspx
    if (ctx.setLineDash) {
        dashPattern[0] = dashPattern[1] = dashLength;
        ctx.setLineDash(dashPattern);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        return;
    }

    dashLength = typeof dashLength != 'number' ? 5 : dashLength;

    var dx = x2 - x1;
    var dy = y2 - y1;
    var numDashes = Math.floor(
        Math.sqrt(dx * dx + dy * dy) / dashLength
    );
    dx = dx / numDashes;
    dy = dy / numDashes;
    var flag = true;
    for (var i = 0; i < numDashes; ++i) {
        if (flag) {
            ctx.moveTo(x1, y1);
        }
        else {
            ctx.lineTo(x1, y1);
        }
        flag = !flag;
        x1 += dx;
        y1 += dy;
    }
    ctx.lineTo(x2, y2);
};


},{}],62:[function(require,module,exports){
/**
 * 贝塞尔平滑曲线
 * @module zrender/shape/util/smoothBezier
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

var vector = require('../../tool/vector');

/**
 * 贝塞尔平滑曲线
 * @alias module:zrender/shape/util/smoothBezier
 * @param {Array} points 线段顶点数组
 * @param {number} smooth 平滑等级, 0-1
 * @param {boolean} isLoop
 * @param {Array} constraint 将计算出来的控制点约束在一个包围盒内
 *                           比如 [[0, 0], [100, 100]], 这个包围盒会与
 *                           整个折线的包围盒做一个并集用来约束控制点。
 * @param {Array} 计算出来的控制点数组
 */
module.exports = function (points, smooth, isLoop, constraint) {
    var cps = [];

    var v = [];
    var v1 = [];
    var v2 = [];
    var prevPoint;
    var nextPoint;

    var i=0;
    var hasConstraint = !!constraint;
    var min, max;
    if (hasConstraint) {
        min = [Infinity, Infinity];
        max = [-Infinity, -Infinity];
        for ( i = 0, len = points.length; i < len; i++) {
            vector.min(min, min, points[i]);
            vector.max(max, max, points[i]);
        }
        // 与指定的包围盒做并集
        vector.min(min, min, constraint[0]);
        vector.max(max, max, constraint[1]);
    }

    for ( i = 0, len = points.length; i < len; i++) {
        var point = points[i];

        if (isLoop) {
            prevPoint = points[i ? i - 1 : len - 1];
            nextPoint = points[(i + 1) % len];
        }
        else {
            if (i === 0 || i === len - 1) {
                cps.push(vector.clone(points[i]));
                continue;
            }
            else {
                prevPoint = points[i - 1];
                nextPoint = points[i + 1];
            }
        }

        vector.sub(v, nextPoint, prevPoint);

        // use degree to scale the handle length
        vector.scale(v, v, smooth);

        var d0 = vector.distance(point, prevPoint);
        var d1 = vector.distance(point, nextPoint);
        var sum = d0 + d1;
        if (sum !== 0) {
            d0 /= sum;
            d1 /= sum;
        }

        vector.scale(v1, v, -d0);
        vector.scale(v2, v, d1);


        var cp0 = vector.add([], point, v1);
        var cp1 = vector.add([], point, v2);
        if (hasConstraint) {
            vector.max(cp0, cp0, min);
            vector.min(cp0, cp0, max);
            vector.max(cp1, cp1, min);
            vector.min(cp1, cp1, max);
        }

        cps.push(cp0);
        cps.push(cp1);
    }

    if (isLoop) {
        cps.push(vector.clone(cps.shift()));
    }

    return cps;
};


},{"../../tool/vector":73}],63:[function(require,module,exports){
/**
 * Catmull-Rom spline 插值折线
 * @module zrender/shape/util/smoothSpline
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

var vector = require('../../tool/vector');

/**
 * @inner
 */
function interpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

/**
 * @alias module:zrender/shape/util/smoothSpline
 * @param {Array} points 线段顶点数组
 * @param {boolean} isLoop
 * @param {Array} constraint
 * @return {Array}
 */
module.exports = function (points, isLoop, constraint) {

    var i=0;
    var len = points.length;
    if(constraint) len-=constraint;
    var ret = [];

    var distance = 0;
    for ( i = 1; i < len; i++) {
        distance += vector.distance(points[i - 1], points[i]);
    }

    var segs = distance / 5;
    segs = segs < len ? len : segs;
    for ( i = 0; i < segs; i++) {
        var pos = i / (segs - 1) * (isLoop ? len : len - 1);
        var idx = Math.floor(pos);

        var w = pos - idx;

        var p0;
        var p1 = points[idx % len];
        var p2;
        var p3;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len - 2 ? len - 1 : idx + 1];
            p3 = points[idx > len - 3 ? len - 1 : idx + 2];
        }
        else {
            p0 = points[(idx - 1 + len) % len];
            p2 = points[(idx + 1) % len];
            p3 = points[(idx + 2) % len];
        }

        var w2 = w * w;
        var w3 = w * w2;

        ret.push([
            interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
            interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
        ]);
    }

    if(constraint){
        for(i=0;i<constraint;i++){
            ret.push(points[len+i]);
        }
    }


    return ret;
};


},{"../../tool/vector":73}],64:[function(require,module,exports){
/**
 * zrender: 图形空间辅助类
 *
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 *
 * isInside：是否在区域内部
 * isOutside：是否在区域外部
 * getTextWidth：测算单行文本宽度
 */




var util = require('./util');
var curve = require('./curve');

var _ctx;

var _textWidthCache = {};
var _textHeightCache = {};
var _textWidthCacheCounter = 0;
var _textHeightCacheCounter = 0;
var TEXT_CACHE_MAX = 5000;

var PI2 = Math.PI * 2;

function normalizeRadian(angle) {
    angle %= PI2;
    if (angle < 0) {
        angle += PI2;
    }
    return angle;
}
/**
 * 包含判断
 *
 * @param {Object} shape : 图形
 * @param {Object} area ： 目标区域
 * @param {number} x ： 横坐标
 * @param {number} y ： 纵坐标
 */
function isInside(shape, area, x, y) {
    if (!area || !shape) {
        // 无参数或不支持类型
        return false;
    }
    var zoneType = shape.type;

    _ctx = _ctx || util.getContext();

    // 未实现或不可用时(excanvas不支持)则数学运算，主要是line，polyline，ring
    var _mathReturn = _mathMethod(shape, area, x, y);
    if (typeof _mathReturn != 'undefined') {
        return _mathReturn;
    }

    if (shape.buildPath && _ctx.isPointInPath) {
        return _buildPathMethod(shape, _ctx, area, x, y);
    }

    // 上面的方法都行不通时
    switch (zoneType) {
        case 'ellipse': // Todo，不精确
            return true;
        // 旋轮曲线  不准确
        case 'trochoid':
            var _r = area.location == 'out' ? area.r1 + area.r2 + area.d : area.r1 - area.r2 + area.d;
            return isInsideCircle(area, x, y, _r);
        // 玫瑰线 不准确
        case 'rose' :
            return isInsideCircle(area, x, y, area.maxr);
        // 路径，椭圆，曲线等-----------------13
        default:
            return false;   // Todo，暂不支持
    }
}

/**
 * @param {Object} shape : 图形
 * @param {Object} area ：目标区域
 * @param {number} x ： 横坐标
 * @param {number} y ： 纵坐标
 * @return {boolean=} true表示坐标处在图形中
 */
function _mathMethod(shape, area, x, y) {
    var zoneType = shape.type;
    // 在矩形内则部分图形需要进一步判断
    switch (zoneType) {
        // 贝塞尔曲线
        case 'bezier-curve':
            if (typeof(area.cpX2) === 'undefined') {
                return isInsideQuadraticStroke(
                    area.xStart, area.yStart,
                    area.cpX1, area.cpY1,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
            }
            return isInsideCubicStroke(
                area.xStart, area.yStart,
                area.cpX1, area.cpY1,
                area.cpX2, area.cpY2,
                area.xEnd, area.yEnd,
                area.lineWidth, x, y
            );
        // 线
        case 'line':
            return isInsideLine(
                area.xStart, area.yStart,
                area.xEnd, area.yEnd,
                area.lineWidth, x, y
            );
        // 折线
        case 'polyline':
            return isInsidePolyline(
                area.pointList, area.lineWidth, x, y
            );
        // 圆环
        case 'ring':
            return isInsideRing(
                area.x, area.y, area.r0, area.r, x, y
            );
        // 圆形
        case 'circle':
            return isInsideCircle(
                area.x, area.y, area.r, x, y
            );
        // 扇形
        case 'sector':
            var startAngle = area.startAngle * Math.PI / 180;
            var endAngle = area.endAngle * Math.PI / 180;
            if (!area.clockWise) {
                startAngle = -startAngle;
                endAngle = -endAngle;
            }
            return isInsideSector(
                area.x, area.y, area.r0, area.r,
                startAngle, endAngle,
                !area.clockWise,
                x, y
            );
        // 多边形
        case 'path':
            return area.pathArray && isInsidePath(
                    area.pathArray, Math.max(area.lineWidth, 5),
                    area.brushType, x, y
                );
        case 'polygon':
        case 'star':
        case 'isogon':
            return isInsidePolygon(area.pointList, x, y);
        // 文本
        case 'text':
            var rect = area.__rect || shape.getRect(area);
            return isInsideRect(
                rect.x, rect.y, rect.width, rect.height, x, y
            );
        // 矩形
        case 'rectangle':
        // 图片
        case 'image':
            return isInsideRect(
                area.x, area.y, area.width, area.height, x, y
            );
    }
}

/**
 * 通过buildPath方法来判断，三个方法中较快，但是不支持线条类型的shape，
 * 而且excanvas不支持isPointInPath方法
 *
 * @param {Object} shape ： shape
 * @param {Object} context : 上下文
 * @param {Object} area ：目标区域
 * @param {number} x ： 横坐标
 * @param {number} y ： 纵坐标
 * @return {boolean} true表示坐标处在图形中
 */
function _buildPathMethod(shape, context, area, x, y) {
    // 图形类实现路径创建了则用类的path
    context.beginPath();
    shape.buildPath(context, area);
    context.closePath();
    return context.isPointInPath(x, y);
}

/**
 * !isInside
 */
function isOutside(shape, area, x, y) {
    return !isInside(shape, area, x, y);
}

/**
 * 线段包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function isInsideLine(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = Math.max(lineWidth, 5);
    var _a = 0;
    var _b = x0;
    // Quick reject
    if ((y > y0 + _l && y > y1 + _l) || (y < y0 - _l && y < y1 - _l) || (x > x0 + _l && x > x1 + _l) || (x < x0 - _l && x < x1 - _l)) {
        return false;
    }

    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    }
    else {
        return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
}

/**
 * 三次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  x3
 * @param  {number}  y3
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function isInsideCubicStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = Math.max(lineWidth, 5);
    // Quick reject
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l) || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l) || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l) || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)) {
        return false;
    }
    var d = curve.cubicProjectPoint(
        x0, y0, x1, y1, x2, y2, x3, y3,
        x, y, null
    );
    return d <= _l / 2;
}

/**
 * 二次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function isInsideQuadraticStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = Math.max(lineWidth, 5);
    // Quick reject
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l) || (y < y0 - _l && y < y1 - _l && y < y2 - _l) || (x > x0 + _l && x > x1 + _l && x > x2 + _l) || (x < x0 - _l && x < x1 - _l && x < x2 - _l)) {
        return false;
    }
    var d = curve.quadraticProjectPoint(
        x0, y0, x1, y1, x2, y2,
        x, y, null
    );
    return d <= _l / 2;
}

/**
 * 圆弧描边包含判断
 * @param  {number}  cx
 * @param  {number}  cy
 * @param  {number}  r
 * @param  {number}  startAngle
 * @param  {number}  endAngle
 * @param  {boolean}  anticlockwise
 * @param  {number} lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {Boolean}
 */
function isInsideArcStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = Math.max(lineWidth, 5);

    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);
    if ((d - _l > r) || (d + _l < r)) {
        return false;
    }
    if (Math.abs(startAngle - endAngle) >= PI2) {
        // Is a circle
        return true;
    }
    if (anticlockwise) {
        var tmp = startAngle;
        startAngle = normalizeRadian(endAngle);
        endAngle = normalizeRadian(tmp);
    } else {
        startAngle = normalizeRadian(startAngle);
        endAngle = normalizeRadian(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2;
    }

    var angle = Math.atan2(y, x);
    if (angle < 0) {
        angle += PI2;
    }
    return (angle >= startAngle && angle <= endAngle) || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
}

function isInsidePolyline(points, lineWidth, x, y) {
    lineWidth = Math.max(lineWidth, 10);
    for (var i = 0, l = points.length - 1; i < l; i++) {
        var x0 = points[i][0];
        var y0 = points[i][1];
        var x1 = points[i + 1][0];
        var y1 = points[i + 1][1];

        if (isInsideLine(x0, y0, x1, y1, lineWidth, x, y)) {
            return true;
        }
    }

    return false;
}

function isInsideRing(cx, cy, r0, r, x, y) {
    var d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return (d < r * r) && (d > r0 * r0);
}

/**
 * 矩形包含判断
 */
function isInsideRect(x0, y0, width, height, x, y) {
    return x >= x0 && x <= (x0 + width) && y >= y0 && y <= (y0 + height);
}

/**
 * 圆形包含判断
 */
function isInsideCircle(x0, y0, r, x, y) {
    return (x - x0) * (x - x0) + (y - y0) * (y - y0) < r * r;
}

/**
 * 扇形包含判断
 */
function isInsideSector(cx, cy, r0, r, startAngle, endAngle, anticlockwise, x, y) {
    return isInsideArcStroke(
        cx, cy, (r0 + r) / 2, startAngle, endAngle, anticlockwise,
        r - r0, x, y
    );
}

/**
 * 多边形包含判断
 * 与 canvas 一样采用 non-zero winding rule
 */
function isInsidePolygon(points, x, y) {
    var N = points.length;
    var w = 0;

    for (var i = 0, j = N - 1; i < N; i++) {
        var x0 = points[j][0];
        var y0 = points[j][1];
        var x1 = points[i][0];
        var y1 = points[i][1];
        w += windingLine(x0, y0, x1, y1, x, y);
        j = i;
    }
    return w !== 0;
}

function windingLine(x0, y0, x1, y1, x, y) {
    if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
        return 0;
    }
    if (y1 == y0) {
        return 0;
    }
    var dir = y1 < y0 ? 1 : -1;
    var t = (y - y0) / (y1 - y0);
    var x_ = t * (x1 - x0) + x0;

    return x_ > x ? dir : 0;
}

// 临时数组
var roots = [-1, -1, -1];
var extrema = [-1, -1];

function swapExtrema() {
    var tmp = extrema[0];
    extrema[0] = extrema[1];
    extrema[1] = tmp;
}
function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    // Quick reject
    if ((y > y0 && y > y1 && y > y2 && y > y3) || (y < y0 && y < y1 && y < y2 && y < y3)) {
        return 0;
    }
    var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var w = 0;
        var nExtrema = -1;
        var y0_, y1_;
        for (var i = 0; i < nRoots; i++) {
            var t = roots[i];
            var x_ = curve.cubicAt(x0, x1, x2, x3, t);
            if (x_ < x) { // Quick reject
                continue;
            }
            if (nExtrema < 0) {
                nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
                if (extrema[1] < extrema[0] && nExtrema > 1) {
                    swapExtrema();
                }
                y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
                if (nExtrema > 1) {
                    y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
                }
            }
            if (nExtrema == 2) {
                // 分成三段单调函数
                if (t < extrema[0]) {
                    w += y0_ < y0 ? 1 : -1;
                }
                else if (t < extrema[1]) {
                    w += y1_ < y0_ ? 1 : -1;
                }
                else {
                    w += y3 < y1_ ? 1 : -1;
                }
            }
            else {
                // 分成两段单调函数
                if (t < extrema[0]) {
                    w += y0_ < y0 ? 1 : -1;
                }
                else {
                    w += y3 < y0_ ? 1 : -1;
                }
            }
        }
        return w;
    }
}

function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
    // Quick reject
    if ((y > y0 && y > y1 && y > y2) || (y < y0 && y < y1 && y < y2)) {
        return 0;
    }
    var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var t = curve.quadraticExtremum(y0, y1, y2);
        if (t >= 0 && t <= 1) {
            var w = 0;
            var y_ = curve.quadraticAt(y0, y1, y2, t);
            for (var i = 0; i < nRoots; i++) {
                var x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                if (x_ > x) {
                    continue;
                }
                if (roots[i] < t) {
                    w += y_ < y0 ? 1 : -1;
                }
                else {
                    w += y2 < y_ ? 1 : -1;
                }
            }
            return w;
        }
        else {
            var x1_ = curve.quadraticAt(x0, x1, x2, roots[0]);
            if (x1_ > x) {
                return 0;
            }
            return y2 < y0 ? 1 : -1;
        }
    }
}

// TODO
// Arc 旋转
function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
    y -= cy;
    if (y > r || y < -r) {
        return 0;
    }
    var tmp = Math.sqrt(r * r - y * y);
    roots[0] = -tmp;
    roots[1] = tmp;
    var dir;
    if (Math.abs(startAngle - endAngle) >= PI2) {
        // Is a circle
        startAngle = 0;
        endAngle = PI2;
        dir = anticlockwise ? 1 : -1;
        if (x >= roots[0] + cx && x <= roots[1] + cx) {
            return dir;
        } else {
            return 0;
        }
    }

    if (anticlockwise) {
        tmp = startAngle;
        startAngle = normalizeRadian(endAngle);
        endAngle = normalizeRadian(tmp);
    } else {
        startAngle = normalizeRadian(startAngle);
        endAngle = normalizeRadian(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2;
    }

    var w = 0;
    for (var i = 0; i < 2; i++) {
        var x_ = roots[i];
        if (x_ + cx > x) {
            var angle = Math.atan2(y, x_);
            dir = anticlockwise ? 1 : -1;
            if (angle < 0) {
                angle = PI2 + angle;
            }
            if (
                (angle >= startAngle && angle <= endAngle) || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
            ) {
                if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                    dir = -dir;
                }
                w += dir;
            }
        }
    }
    return w;
}

/**
 * 路径包含判断
 * 与 canvas 一样采用 non-zero winding rule
 */
function isInsidePath(pathArray, lineWidth, brushType, x, y) {
    var w = 0;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    var beginSubpath = true;
    var firstCmd = true;

    brushType = brushType || 'fill';

    var hasStroke = brushType === 'stroke' || brushType === 'both';
    var hasFill = brushType === 'fill' || brushType === 'both';

    // var roots = [-1, -1, -1];
    for (var i = 0; i < pathArray.length; i++) {
        var seg = pathArray[i];
        var p = seg.points;
        // Begin a new subpath
        if (beginSubpath || seg.command === 'M') {
            if (i > 0) {
                // Close previous subpath
                if (hasFill) {
                    w += windingLine(xi, yi, x0, y0, x, y);
                }
                if (w !== 0) {
                    return true;
                }
            }
            x0 = p[p.length - 2];
            y0 = p[p.length - 1];
            beginSubpath = false;
            if (firstCmd && seg.command !== 'A') {
                // 如果第一个命令不是M, 是lineTo, bezierCurveTo
                // 等绘制命令的话，是会从该绘制的起点开始算的
                // Arc 会在之后做单独处理所以这里忽略
                firstCmd = false;
                xi = x0;
                yi = y0;
            }
        }
        switch (seg.command) {
            case 'M':
                xi = p[0];
                yi = p[1];
                break;
            case 'L':
                if (hasStroke) {
                    if (isInsideLine(
                            xi, yi, p[0], p[1], lineWidth, x, y
                        )) {
                        return true;
                    }
                }
                if (hasFill) {
                    w += windingLine(xi, yi, p[0], p[1], x, y);
                }
                xi = p[0];
                yi = p[1];
                break;
            case 'C':
                if (hasStroke) {
                    if (isInsideCubicStroke(
                            xi, yi, p[0], p[1], p[2], p[3], p[4], p[5],
                            lineWidth, x, y
                        )) {
                        return true;
                    }
                }
                if (hasFill) {
                    w += windingCubic(
                        xi, yi, p[0], p[1], p[2], p[3], p[4], p[5], x, y
                    );
                }
                xi = p[4];
                yi = p[5];
                break;
            case 'Q':
                if (hasStroke) {
                    if (isInsideQuadraticStroke(
                            xi, yi, p[0], p[1], p[2], p[3],
                            lineWidth, x, y
                        )) {
                        return true;
                    }
                }
                if (hasFill) {
                    w += windingQuadratic(
                        xi, yi, p[0], p[1], p[2], p[3], x, y
                    );
                }
                xi = p[2];
                yi = p[3];
                break;
            case 'A':
                // TODO Arc 旋转
                // TODO Arc 判断的开销比较大
                var cx = p[0];
                var cy = p[1];
                var rx = p[2];
                var ry = p[3];
                var theta = p[4];
                var dTheta = p[5];
                var x1 = Math.cos(theta) * rx + cx;
                var y1 = Math.sin(theta) * ry + cy;
                // 不是直接使用 arc 命令
                if (!firstCmd) {
                    w += windingLine(xi, yi, x1, y1);
                } else {
                    firstCmd = false;
                    // 第一个命令起点还未定义
                    x0 = x1;
                    y0 = y1;
                }
                // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
                var _x = (x - cx) * ry / rx + cx;
                if (hasStroke) {
                    if (isInsideArcStroke(
                            cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                            lineWidth, _x, y
                        )) {
                        return true;
                    }
                }
                if (hasFill) {
                    w += windingArc(
                        cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                        _x, y
                    );
                }
                xi = Math.cos(theta + dTheta) * rx + cx;
                yi = Math.sin(theta + dTheta) * ry + cy;
                break;
            case 'z':
                if (hasStroke) {
                    if (isInsideLine(
                            xi, yi, x0, y0, lineWidth, x, y
                        )) {
                        return true;
                    }
                }
                beginSubpath = true;
                break;
        }
    }
    if (hasFill) {
        w += windingLine(xi, yi, x0, y0, x, y);
    }
    return w !== 0;
}

/**
 * 测算多行文本宽度
 * @param {Object} text
 * @param {Object} textFont
 */
function getTextWidth(text, textFont) {
    var key = text + ':' + textFont;
    if (_textWidthCache[key]) {
        return _textWidthCache[key];
    }
    _ctx = _ctx || util.getContext();
    _ctx.save();

    if (textFont) {
        _ctx.font = textFont;
    }

    text = (text + '').split('\n');
    var width = 0;
    for (var i = 0, l = text.length; i < l; i++) {
        width = Math.max(
            _ctx.measureText(text[i]).width,
            width
        );
    }
    _ctx.restore();

    _textWidthCache[key] = width;
    if (++_textWidthCacheCounter > TEXT_CACHE_MAX) {
        // 内存释放
        _textWidthCacheCounter = 0;
        _textWidthCache = {};
    }

    return width;
}

/**
 * 测算多行文本高度
 * @param {Object} text
 * @param {Object} textFont
 */
function getTextHeight(text, textFont) {
    var key = text + ':' + textFont;
    if (_textHeightCache[key]) {
        return _textHeightCache[key];
    }

    _ctx = _ctx || util.getContext();

    _ctx.save();
    if (textFont) {
        _ctx.font = textFont;
    }

    text = (text + '').split('\n');
    // 比较粗暴
    var height = (_ctx.measureText('国').width + 2) * text.length;

    _ctx.restore();

    _textHeightCache[key] = height;
    if (++_textHeightCacheCounter > TEXT_CACHE_MAX) {
        // 内存释放
        _textHeightCacheCounter = 0;
        _textHeightCache = {};
    }
    return height;
}

module.exports = {
    isInside: isInside,
    isOutside: isOutside,
    getTextWidth: getTextWidth,
    getTextHeight: getTextHeight,

    isInsidePath: isInsidePath,
    isInsidePolygon: isInsidePolygon,
    isInsideSector: isInsideSector,
    isInsideCircle: isInsideCircle,
    isInsideLine: isInsideLine,
    isInsideRect: isInsideRect,
    isInsidePolyline: isInsidePolyline,

    isInsideCubicStroke: isInsideCubicStroke,
    isInsideQuadraticStroke: isInsideQuadraticStroke
};

},{"./curve":66,"./util":72}],65:[function(require,module,exports){
/**
 * 颜色辅助模块
 * @module zrender/tool/color
 */

var util = require('../tool/util');

var _ctx;

// Color palette is an array containing the default colors for the chart's
// series.
// When all colors are used, new colors are selected from the start again.
// Defaults to:
// 默认色板
var palette = [
    '#f7b537', ' #bb4f4f', ' #6abb4f', ' #01addf', ' #557946',
    '#4f0e16', ' #871315', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
    '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
    '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
    '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
    '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
];
var _palette = palette;

var highlightColor = 'rgba(255,255,0,0.5)';
var _highlightColor = highlightColor;

// 颜色格式
/*jshint maxlen: 330 */
var colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

var _nameColors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#0ff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000',
    blanchedalmond: '#ffebcd',
    blue: '#00f',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#0ff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#f0f',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#789',
    lightslategrey: '#789',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#0f0',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#f0f',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#f00',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#fff',
    whitesmoke: '#f5f5f5',
    yellow: '#ff0',
    yellowgreen: '#9acd32'
};

/**
 * 自定义调色板
 */
function customPalette(userPalete) {
    palette = userPalete;
}

/**
 * 复位默认色板
 */
function resetPalette() {
    palette = _palette;
}

/**
 * 获取色板颜色
 * @memberOf module:zrender/tool/color
 * @param {number} idx 色板位置
 * @param {Array.<string>} [userPalete] 自定义色板
 * @return {string} 颜色
 */
function getColor(idx, userPalete) {
    idx = idx | 0;
    userPalete = userPalete || palette;
    return userPalete[idx % userPalete.length];
}

/**
 * 自定义默认高亮颜色
 */
function customHighlight(userHighlightColor) {
    highlightColor = userHighlightColor;
}

/**
 * 重置默认高亮颜色
 */
function resetHighlight() {
    _highlightColor = highlightColor;
}

/**
 * 获取默认高亮颜色
 */
function getHighlightColor() {
    return highlightColor;
}

/**
 * 径向渐变
 * @memberOf module:zrender/tool/color
 * @param {number} x0 渐变起点
 * @param {number} y0
 * @param {number} r0
 * @param {number} x1 渐变终点
 * @param {number} y1
 * @param {number} r1
 * @param {Array} colorList 颜色列表
 * @return {CanvasGradient}
 */
function getRadialGradient(x0, y0, r0, x1, y1, r1, colorList) {
    if (!_ctx) {
        _ctx = util.getContext();
    }
    var gradient = _ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    for (var i = 0, l = colorList.length; i < l; i++) {
        gradient.addColorStop(colorList[i][0], colorList[i][1]);
    }
    gradient.__nonRecursion = true;
    return gradient;
}

/**
 * 线性渐变
 * @param {Object} x0 渐变起点
 * @param {Object} y0
 * @param {Object} x1 渐变终点
 * @param {Object} y1
 * @param {Array} colorList 颜色列表
 */
function getLinearGradient(x0, y0, x1, y1, colorList) {
    if (!_ctx) {
        _ctx = util.getContext();
    }
    var gradient = _ctx.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0, l = colorList.length; i < l; i++) {
        gradient.addColorStop(colorList[i][0], colorList[i][1]);
    }
    gradient.__nonRecursion = true;
    return gradient;
}

/**
 * 获取两种颜色之间渐变颜色数组
 * @param {color} start 起始颜色
 * @param {color} end 结束颜色
 * @param {number} step 渐变级数
 * @return {Array}  颜色数组
 */
function getStepColors(start, end, step) {
    start = toRGBA(start);
    end = toRGBA(end);
    start = getData(start);
    end = getData(end);

    var colors = [];
    var stepR = (end[0] - start[0]) / step;
    var stepG = (end[1] - start[1]) / step;
    var stepB = (end[2] - start[2]) / step;
    var stepA = (end[3] - start[3]) / step;
    // 生成颜色集合
    // fix by linfeng 颜色堆积
    for (var i = 0, r = start[0], g = start[1], b = start[2], a = start[3]; i < step; i++) {
        colors[i] = toColor([
            adjust(Math.floor(r), [0, 255]),
            adjust(Math.floor(g), [0, 255]),
            adjust(Math.floor(b), [0, 255]),
            a.toFixed(4) - 0
        ], 'rgba');
        r += stepR;
        g += stepG;
        b += stepB;
        a += stepA;
    }
    r = end[0];
    g = end[1];
    b = end[2];
    a = end[3];
    colors[i] = toColor([r, g, b, a], 'rgba');
    return colors;
}

/**
 * 获取指定级数的渐变颜色数组
 * @memberOf module:zrender/tool/color
 * @param {Array.<string>} colors 颜色组
 * @param {number} [step=20] 渐变级数
 * @return {Array.<string>}  颜色数组
 */
function getGradientColors(colors, step) {
    var ret = [];
    var len = colors.length;
    if (step === undefined) {
        step = 20;
    }
    if (len === 1) {
        ret = getStepColors(colors[0], colors[0], step);
    }
    else if (len > 1) {
        for (var i = 0, n = len - 1; i < n; i++) {
            var steps = getStepColors(colors[i], colors[i + 1], step);
            if (i < n - 1) {
                steps.pop();
            }
            ret = ret.concat(steps);
        }
    }
    return ret;
}

/**
 * 颜色值数组转为指定格式颜色,例如:<br/>
 * data = [60,20,20,0.1] format = 'rgba'
 * 返回：rgba(60,20,20,0.1)
 * @param {Array} data 颜色值数组
 * @param {string} format 格式,默认rgb
 * @return {string} 颜色
 */
function toColor(data, format) {
    format = format || 'rgb';
    if (data && (data.length === 3 || data.length === 4)) {
        data = map(data,
            function (c) {
                return c > 1 ? Math.ceil(c) : c;
            }
        );

        if (format.indexOf('hex') > -1) {
            return '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + (+data[2])).toString(16).slice(1);
        }
        else if (format.indexOf('hs') > -1) {
            var sx = map(data.slice(1, 3),
                function (c) {
                    return c + '%';
                }
            );
            data[1] = sx[0];
            data[2] = sx[1];
        }

        if (format.indexOf('a') > -1) {
            if (data.length === 3) {
                data.push(1);
            }
            data[3] = adjust(data[3], [0, 1]);
            return format + '(' + data.slice(0, 4).join(',') + ')';
        }

        return format + '(' + data.slice(0, 3).join(',') + ')';
    }
}

/**
 * 颜色字符串转换为rgba数组
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {Array.<number>} 颜色值数组
 */
function toArray(color) {
    color = trim(color);
    if (color.indexOf('rgba') < 0) {
        color = toRGBA(color);
    }

    var data = [];
    var i = 0;
    color.replace(/[\d.]+/g, function (n) {
        if (i < 3) {
            n = n | 0;
        }
        else {
            // Alpha
            n = +n;
        }
        data[i++] = n;
    });
    return data;
}

/**
 * 颜色格式转化
 *
 * @param {string} color 颜色值数组
 * @param {string} format 格式,默认rgb
 * @return {string} 颜色
 */
function convert(color, format) {
    if (!isCalculableColor(color)) {
        return color;
    }
    var data = getData(color);
    var alpha = data[3];
    if (typeof alpha === 'undefined') {
        alpha = 1;
    }

    if (color.indexOf('hsb') > -1) {
        data = _HSV_2_RGB(data);
    }
    else if (color.indexOf('hsl') > -1) {
        data = _HSL_2_RGB(data);
    }

    if (format.indexOf('hsb') > -1 || format.indexOf('hsv') > -1) {
        data = _RGB_2_HSB(data);
    }
    else if (format.indexOf('hsl') > -1) {
        data = _RGB_2_HSL(data);
    }

    data[3] = alpha;

    return toColor(data, format);
}

/**
 * 转换为rgba格式的颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} rgba颜色，rgba(r,g,b,a)
 */
function toRGBA(color) {
    return convert(color, 'rgba');
}

/**
 * 转换为rgb数字格式的颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} rgb颜色，rgb(0,0,0)格式
 */
function toRGB(color) {
    return convert(color, 'rgb');
}

/**
 * 转换为16进制颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} 16进制颜色，#rrggbb格式
 */
function toHex(color) {
    return convert(color, 'hex');
}

/**
 * 转换为HSV颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSVA颜色，hsva(h,s,v,a)
 */
function toHSVA(color) {
    return convert(color, 'hsva');
}

/**
 * 转换为HSV颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSV颜色，hsv(h,s,v)
 */
function toHSV(color) {
    return convert(color, 'hsv');
}

/**
 * 转换为HSBA颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSBA颜色，hsba(h,s,b,a)
 */
function toHSBA(color) {
    return convert(color, 'hsba');
}

/**
 * 转换为HSB颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSB颜色，hsb(h,s,b)
 */
function toHSB(color) {
    return convert(color, 'hsb');
}

/**
 * 转换为HSLA颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSLA颜色，hsla(h,s,l,a)
 */
function toHSLA(color) {
    return convert(color, 'hsla');
}

/**
 * 转换为HSL颜色
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} HSL颜色，hsl(h,s,l)
 */
function toHSL(color) {
    return convert(color, 'hsl');
}

/**
 * 转换颜色名
 *
 * @param {string} color 颜色
 * @return {string} 颜色名
 */
function toName(color) {
    for (var key in _nameColors) {
        if (toHex(_nameColors[key]) === toHex(color)) {
            return key;
        }
    }
    return null;
}

/**
 * 移除颜色中多余空格
 *
 * @param {string} color 颜色
 * @return {string} 无空格颜色
 */
function trim(color) {
    return String(color).replace(/\s+/g, '');
}

/**
 * 颜色规范化
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} 规范化后的颜色
 */
function normalize(color) {
    // 颜色名
    if (_nameColors[color]) {
        color = _nameColors[color];
    }
    // 去掉空格
    color = trim(color);
    // hsv与hsb等价
    color = color.replace(/hsv/i, 'hsb');
    // rgb转为rrggbb
    if (/^#[\da-f]{3}$/i.test(color)) {
        color = parseInt(color.slice(1), 16);
        var r = (color & 0xf00) << 8;
        var g = (color & 0xf0) << 4;
        var b = color & 0xf;

        color = '#' + ((1 << 24) + (r << 4) + r + (g << 4) + g + (b << 4) + b).toString(16).slice(1);
    }
    // 或者使用以下正则替换，不过 chrome 下性能相对差点
    // color = color.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3');
    return color;
}

/**
 * 颜色加深或减淡，当level>0加深，当level<0减淡
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @param {number} level 升降程度,取值区间[-1,1]
 * @return {string} 加深或减淡后颜色值
 */
function lift(color, level) {
    if (!isCalculableColor(color)) {
        return color;
    }
    var direct = level > 0 ? 1 : -1;
    if (typeof level === 'undefined') {
        level = 0;
    }
    level = Math.abs(level) > 1 ? 1 : Math.abs(level);
    color = toRGB(color);
    var data = getData(color);
    for (var i = 0; i < 3; i++) {
        if (direct === 1) {
            data[i] = data[i] * (1 - level) | 0;
        }
        else {
            data[i] = ((255 - data[i]) * level + data[i]) | 0;
        }
    }
    return 'rgb(' + data.join(',') + ')';
}

/**
 * 颜色翻转,[255-r,255-g,255-b,1-a]
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @return {string} 翻转颜色
 */
function reverse(color) {
    if (!isCalculableColor(color)) {
        return color;
    }
    var data = getData(toRGBA(color));
    data = map(data,
        function (c) {
            return 255 - c;
        }
    );
    return toColor(data, 'rgb');
}

/**
 * 简单两种颜色混合
 * @memberOf module:zrender/tool/color
 * @param {string} color1 第一种颜色
 * @param {string} color2 第二种颜色
 * @param {number} weight 混合权重[0-1]
 * @return {string} 结果色,rgb(r,g,b)或rgba(r,g,b,a)
 */
function mix(color1, color2, weight) {
    if (!isCalculableColor(color1) || !isCalculableColor(color2)) {
        return color1;
    }

    if (typeof weight === 'undefined') {
        weight = 0.5;
    }
    weight = 1 - adjust(weight, [0, 1]);

    var w = weight * 2 - 1;
    var data1 = getData(toRGBA(color1));
    var data2 = getData(toRGBA(color2));

    var d = data1[3] - data2[3];

    var weight1 = (((w * d === -1) ? w : (w + d) / (1 + w * d)) + 1) / 2;
    var weight2 = 1 - weight1;

    var data = [];

    for (var i = 0; i < 3; i++) {
        data[i] = data1[i] * weight1 + data2[i] * weight2;
    }

    var alpha = data1[3] * weight + data2[3] * (1 - weight);
    alpha = Math.max(0, Math.min(1, alpha));

    if (data1[3] === 1 && data2[3] === 1) {// 不考虑透明度
        return toColor(data, 'rgb');
    }
    data[3] = alpha;
    return toColor(data, 'rgba');
}

/**
 * 随机颜色
 *
 * @return {string} 颜色值，#rrggbb格式
 */
function random() {
    return '#' + (Math.random().toString(16) + '0000').slice(2, 8);
}

/**
 * 获取颜色值数组,返回值范围： <br/>
 * RGB 范围[0-255] <br/>
 * HSL/HSV/HSB 范围[0-1]<br/>
 * A透明度范围[0-1]
 * 支持格式：
 * #rgb
 * #rrggbb
 * rgb(r,g,b)
 * rgb(r%,g%,b%)
 * rgba(r,g,b,a)
 * hsb(h,s,b) // hsv与hsb等价
 * hsb(h%,s%,b%)
 * hsba(h,s,b,a)
 * hsl(h,s,l)
 * hsl(h%,s%,l%)
 * hsla(h,s,l,a)
 *
 * @param {string} color 颜色
 * @return {Array.<number>} 颜色值数组或null
 */
function getData(color) {
    color = normalize(color);
    var r = color.match(colorRegExp);
    if (r === null) {
        throw new Error('The color format error'); // 颜色格式错误
    }
    var d;
    var a;
    var data = [];
    var rgb;

    if (r[2]) {
        // #rrggbb
        d = r[2].replace('#', '').split('');
        rgb = [d[0] + d[1], d[2] + d[3], d[4] + d[5]];
        data = map(rgb,
            function (c) {
                return adjust(parseInt(c, 16), [0, 255]);
            }
        );

    }
    else if (r[4]) {
        // rgb rgba
        var rgba = (r[4]).split(',');
        a = rgba[3];
        rgb = rgba.slice(0, 3);
        data = map(
            rgb,
            function (c) {
                c = Math.floor(
                    c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c
                );
                return adjust(c, [0, 255]);
            }
        );

        if (typeof a !== 'undefined') {
            data.push(adjust(parseFloat(a), [0, 1]));
        }
    }
    else if (r[5] || r[6]) {
        // hsb hsba hsl hsla
        var hsxa = (r[5] || r[6]).split(',');
        var h = parseInt(hsxa[0], 0) / 360;
        var s = hsxa[1];
        var x = hsxa[2];
        a = hsxa[3];
        data = map([s, x],
            function (c) {
                return adjust(parseFloat(c) / 100, [0, 1]);
            }
        );
        data.unshift(h);
        if (typeof a !== 'undefined') {
            data.push(adjust(parseFloat(a), [0, 1]));
        }
    }
    return data;
}

/**
 * 设置颜色透明度
 * @memberOf module:zrender/tool/color
 * @param {string} color 颜色
 * @param {number} a 透明度,区间[0,1]
 * @return {string} rgba颜色值
 */
function alpha(color, a) {
    if (!isCalculableColor(color)) {
        return color;
    }
    if (a === null) {
        a = 1;
    }
    var data = getData(toRGBA(color));
    data[3] = adjust(Number(a).toFixed(4), [0, 1]);

    return toColor(data, 'rgba');
}

// 数组映射
function map(array, fun) {
    if (typeof fun !== 'function') {
        throw new TypeError();
    }
    var len = array ? array.length : 0;
    for (var i = 0; i < len; i++) {
        array[i] = fun(array[i]);
    }
    return array;
}

// 调整值区间
function adjust(value, region) {
    // < to <= & > to >=
    // modify by linzhifeng 2014-05-25 because -0 == 0
    if (value <= region[0]) {
        value = region[0];
    }
    else if (value >= region[1]) {
        value = region[1];
    }
    return value;
}

function isCalculableColor(color) {
    return color instanceof Array || typeof color === 'string';
}

// 参见 http:// www.easyrgb.com/index.php?X=MATH
function _HSV_2_RGB(data) {
    var H = data[0];
    var S = data[1];
    var V = data[2];
    // HSV from 0 to 1
    var R;
    var G;
    var B;
    if (S === 0) {
        R = V * 255;
        G = V * 255;
        B = V * 255;
    }
    else {
        var h = H * 6;
        if (h === 6) {
            h = 0;
        }
        var i = h | 0;
        var v1 = V * (1 - S);
        var v2 = V * (1 - S * (h - i));
        var v3 = V * (1 - S * (1 - (h - i)));
        var r = 0;
        var g = 0;
        var b = 0;

        if (i === 0) {
            r = V;
            g = v3;
            b = v1;
        }
        else if (i === 1) {
            r = v2;
            g = V;
            b = v1;
        }
        else if (i === 2) {
            r = v1;
            g = V;
            b = v3;
        }
        else if (i === 3) {
            r = v1;
            g = v2;
            b = V;
        }
        else if (i === 4) {
            r = v3;
            g = v1;
            b = V;
        }
        else {
            r = V;
            g = v1;
            b = v2;
        }

        // RGB results from 0 to 255
        R = r * 255;
        G = g * 255;
        B = b * 255;
    }
    return [R, G, B];
}

function _HSL_2_RGB(data) {
    var H = data[0];
    var S = data[1];
    var L = data[2];
    // HSL from 0 to 1
    var R;
    var G;
    var B;
    if (S === 0) {
        R = L * 255;
        G = L * 255;
        B = L * 255;
    }
    else {
        var v2;
        if (L < 0.5) {
            v2 = L * (1 + S);
        }
        else {
            v2 = (L + S) - (S * L);
        }

        var v1 = 2 * L - v2;

        R = 255 * _HUE_2_RGB(v1, v2, H + (1 / 3));
        G = 255 * _HUE_2_RGB(v1, v2, H);
        B = 255 * _HUE_2_RGB(v1, v2, H - (1 / 3));
    }
    return [R, G, B];
}

function _HUE_2_RGB(v1, v2, vH) {
    if (vH < 0) {
        vH += 1;
    }
    if (vH > 1) {
        vH -= 1;
    }
    if ((6 * vH) < 1) {
        return (v1 + (v2 - v1) * 6 * vH);
    }
    if ((2 * vH) < 1) {
        return (v2);
    }
    if ((3 * vH) < 2) {
        return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
    }
    return v1;
}

function _RGB_2_HSB(data) {
    // RGB from 0 to 255
    var R = (data[0] / 255);
    var G = (data[1] / 255);
    var B = (data[2] / 255);

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax - vMin; // Delta RGB value
    var V = vMax;
    var H;
    var S;

    // HSV results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        S = delta / vMax;

        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }

        if (H < 0) {
            H += 1;
        }
        if (H > 1) {
            H -= 1;
        }
    }
    H = H * 360;
    S = S * 100;
    V = V * 100;
    return [H, S, V];
}

function _RGB_2_HSL(data) {
    // RGB from 0 to 255
    var R = (data[0] / 255);
    var G = (data[1] / 255);
    var B = (data[2] / 255);

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax - vMin; // Delta RGB value

    var L = (vMax + vMin) / 2;
    var H;
    var S;
    // HSL results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        if (L < 0.5) {
            S = delta / (vMax + vMin);
        }
        else {
            S = delta / (2 - vMax - vMin);
        }

        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }

        if (H < 0) {
            H += 1;
        }

        if (H > 1) {
            H -= 1;
        }
    }

    H = H * 360;
    S = S * 100;
    L = L * 100;

    return [H, S, L];
}

module.exports = {
    customPalette: customPalette,
    resetPalette: resetPalette,
    getColor: getColor,
    getHighlightColor: getHighlightColor,
    customHighlight: customHighlight,
    resetHighlight: resetHighlight,
    getRadialGradient: getRadialGradient,
    getLinearGradient: getLinearGradient,
    getGradientColors: getGradientColors,
    getStepColors: getStepColors,
    reverse: reverse,
    mix: mix,
    lift: lift,
    trim: trim,
    random: random,
    toRGB: toRGB,
    toRGBA: toRGBA,
    toHex: toHex,
    toHSL: toHSL,
    toHSLA: toHSLA,
    toHSB: toHSB,
    toHSBA: toHSBA,
    toHSV: toHSV,
    toHSVA: toHSVA,
    toName: toName,
    toColor: toColor,
    toArray: toArray,
    alpha: alpha,
    getData: getData
};


},{"../tool/util":72}],66:[function(require,module,exports){
/**
 * 曲线辅助模块
 * @module zrender/tool/curve
 * @author pissang(https://www.github.com/pissang)
 */


var vector = require('./vector');


var EPSILON = 1e-4;

var THREE_SQRT = Math.sqrt(3);
var ONE_THIRD = 1 / 3;

// 临时变量
var _v0 = vector.create();
var _v1 = vector.create();
var _v2 = vector.create();
// var _v3 = vector.create();

function isAroundZero(val) {
    return val > -EPSILON && val < EPSILON;
}
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}
/*
 function evalCubicCoeff(a, b, c, d, t) {
 return ((a * t + b) * t + c) * t + d;
 }
 */

/**
 * 计算三次贝塞尔值
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */
function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p0 + 3 * t * p1) + t * t * (t * p3 + 3 * onet * p2);
}

/**
 * 计算三次贝塞尔导数值
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */
function cubicDerivativeAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t);
}

/**
 * 计算三次贝塞尔方程根，使用盛金公式
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} val
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */
function cubicRootAt(p0, p1, p2, p3, val, roots) {
    // Evaluate roots of cubic functions
    var a = p3 + 3 * (p1 - p2) - p0;
    var b = 3 * (p2 - p1 * 2 + p0);
    var c = 3 * (p1 - p0);
    var d = p0 - val;

    var A = b * b - 3 * a * c;
    var B = b * c - 9 * a * d;
    var C = c * c - 3 * b * d;

    var n = 0;

    var t1 = 0, t2 = 0;
    if (isAroundZero(A) && isAroundZero(B)) {
        if (isAroundZero(b)) {
            roots[0] = 0;
        }
        else {
            t1 = -c / b;  //t1, t2, t3, b is not zero
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = B * B - 4 * A * C;

        if (isAroundZero(disc)) {
            var K = B / A;
            t1 = -b / a + K;  // t1, a is not zero
            t2 = -K / 2;  // t2, t3
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
        else if (disc > 0) {
            var discSqrt = Math.sqrt(disc);
            var Y1 = A * b + 1.5 * a * (-B + discSqrt);
            var Y2 = A * b + 1.5 * a * (-B - discSqrt);
            if (Y1 < 0) {
                Y1 = -Math.pow(-Y1, ONE_THIRD);
            }
            else {
                Y1 = Math.pow(Y1, ONE_THIRD);
            }
            if (Y2 < 0) {
                Y2 = -Math.pow(-Y2, ONE_THIRD);
            }
            else {
                Y2 = Math.pow(Y2, ONE_THIRD);
            }
            t1 = (-b - (Y1 + Y2)) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else {
            var T = (2 * A * b - 3 * a * B) / (2 * Math.sqrt(A * A * A));
            var theta = Math.acos(T) / 3;
            var ASqrt = Math.sqrt(A);
            var tmp = Math.cos(theta);

            t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
            t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
            var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
            if (t3 >= 0 && t3 <= 1) {
                roots[n++] = t3;
            }
        }
    }
    return n;
}

/**
 * 计算三次贝塞尔方程极限值的位置
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {Array.<number>} extrema
 * @return {number} 有效数目
 */
function cubicExtrema(p0, p1, p2, p3, extrema) {
    var b = 6 * p2 - 12 * p1 + 6 * p0;
    var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
    var c = 3 * p1 - 3 * p0;

    var n = 0, t1 = 0, t2 = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            extrema[0] = -b / (2 * a);
        }
        else if (disc > 0) {
            var discSqrt = Math.sqrt(disc);
            t1 = (-b + discSqrt) / (2 * a);
            t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                extrema[n++] = t2;
            }
        }
    }
    return n;
}

/**
 * 细分三次贝塞尔曲线
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {Array.<number>} out
 */
function cubicSubdivide(p0, p1, p2, p3, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p23 = (p3 - p2) * t + p2;

    var p012 = (p12 - p01) * t + p01;
    var p123 = (p23 - p12) * t + p12;

    var p0123 = (p123 - p012) * t + p012;
    // Seg0
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p0123;
    // Seg1
    out[4] = p0123;
    out[5] = p123;
    out[6] = p23;
    out[7] = p3;
}

/**
 * 投射点到三次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} [out] 投射点
 * @return {number}
 */
function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3,
                           x, y, out) {
    // http://pomax.github.io/bezierinfo/#projections
    var t;
    var interval = 0.005;
    var d = Infinity;

    _v0[0] = x;
    _v0[1] = y;

    // 先粗略估计一下可能的最小距离的 t 值
    // PENDING
    var d1 = 0;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = cubicAt(x0, x1, x2, x3, _t);
        _v1[1] = cubicAt(y0, y1, y2, y3, _t);
        d1 = vector.distSquare(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;

    // At most 32 iteration
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        // t - interval
        _v1[0] = cubicAt(x0, x1, x2, x3, prev);
        _v1[1] = cubicAt(y0, y1, y2, y3, prev);

        d1 = vector.distSquare(_v1, _v0);

        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            // t + interval
            _v2[0] = cubicAt(x0, x1, x2, x3, next);
            _v2[1] = cubicAt(y0, y1, y2, y3, next);
            var d2 = vector.distSquare(_v2, _v0);

            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    // t
    if (out) {
        out[0] = cubicAt(x0, x1, x2, x3, t);
        out[1] = cubicAt(y0, y1, y2, y3, t);
    }
    // console.log(interval, i);
    return Math.sqrt(d);
}

/**
 * 计算二次方贝塞尔值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */
function quadraticAt(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}

/**
 * 计算二次方贝塞尔导数值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}

/**
 * 计算二次方贝塞尔方程根
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */
function quadraticRootAt(p0, p1, p2, val, roots) {
    var a = p0 - 2 * p1 + p2;
    var b = 2 * (p1 - p0);
    var c = p0 - val;

    var n = 0, t1 = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            t1 = -b / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else if (disc > 0) {
            var discSqrt = Math.sqrt(disc);
            t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
    }
    return n;
}

/**
 * 计算二次贝塞尔方程极限值
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @return {number}
 */
function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
        // p1 is center of p0 and p2
        return 0.5;
    }
    else {
        return (p0 - p1) / divider;
    }
}

/**
 * 细分二次贝塞尔曲线
 * @memberOf module:zrender/tool/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} out
 */
function quadraticSubdivide(p0, p1, p2, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;

    // Seg0
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;

    // Seg1
    out[3] = p012;
    out[4] = p12;
    out[5] = p2;
}

/**
 * 投射点到二次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} out 投射点
 * @return {number}
 */
function quadraticProjectPoint(x0, y0, x1, y1, x2, y2,
                               x, y, out) {
    // http://pomax.github.io/bezierinfo/#projections
    var t;
    var interval = 0.005;
    var d = Infinity;

    _v0[0] = x;
    _v0[1] = y;

    // 先粗略估计一下可能的最小距离的 t 值
    // PENDING
    var d1 = 0;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = quadraticAt(x0, x1, x2, _t);
        _v1[1] = quadraticAt(y0, y1, y2, _t);
        d1 = vector.distSquare(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;

    // At most 32 iteration
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        // t - interval
        _v1[0] = quadraticAt(x0, x1, x2, prev);
        _v1[1] = quadraticAt(y0, y1, y2, prev);

        d1 = vector.distSquare(_v1, _v0);

        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            // t + interval
            _v2[0] = quadraticAt(x0, x1, x2, next);
            _v2[1] = quadraticAt(y0, y1, y2, next);
            var d2 = vector.distSquare(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    // t
    if (out) {
        out[0] = quadraticAt(x0, x1, x2, t);
        out[1] = quadraticAt(y0, y1, y2, t);
    }
    // console.log(interval, i);
    return Math.sqrt(d);
}

module.exports = {

    cubicAt: cubicAt,

    cubicDerivativeAt: cubicDerivativeAt,

    cubicRootAt: cubicRootAt,

    cubicExtrema: cubicExtrema,

    cubicSubdivide: cubicSubdivide,

    cubicProjectPoint: cubicProjectPoint,

    quadraticAt: quadraticAt,

    quadraticDerivativeAt: quadraticDerivativeAt,

    quadraticRootAt: quadraticRootAt,

    quadraticExtremum: quadraticExtremum,

    quadraticSubdivide: quadraticSubdivide,

    quadraticProjectPoint: quadraticProjectPoint
};

},{"./vector":73}],67:[function(require,module,exports){
/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */

// Zepto.js
// (c) 2010-2013 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.

function detect(ua) {
    var os = window.os = {};
    var browser = window.browser = {};
    var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
    var touchpad = webos && ua.match(/TouchPad/);
    var kindle = ua.match(/Kindle\/([\d.]+)/);
    var silk = ua.match(/Silk\/([\d._]+)/);
    var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
    var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
    var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
    var playbook = ua.match(/PlayBook/);
    var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    var safari = webkit && ua.match(/Mobile\//) && !chrome;
    var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
    var ie = ua.match(/MSIE\s([\d.]+)/);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit ===webkit) browser.version = webkit[1];

    if (android) {
        os.android = true;
        os.version = android[2];
    }
    if (iphone && !ipod) {
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
    }
    if (ipad) {
        os.ios = os.ipad = true;
        os.version = ipad[2].replace(/_/g, '.');
    }
    if (ipod) {
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    }
    if (webos) {
        os.webos = true;
        os.version = webos[2];
    }
    if (touchpad) os.touchpad = true;
    if (blackberry) {
        os.blackberry = true;
        os.version = blackberry[2];
    }
    if (bb10) {
        os.bb10 = true;
        os.version = bb10[2];
    }
    if (rimtabletos) {
        os.rimtabletos = true;
        os.version = rimtabletos[2];
    }
    if (playbook) browser.playbook = true;
    if (kindle) {
        os.kindle = true;
        os.version = kindle[1];
    }
    if (silk) {
        browser.silk = true;
        browser.version = silk[1];
    }
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (chrome) {
        browser.chrome = true;
        browser.version = chrome[1];
    }
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }
    if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
    if (webview) browser.webview = true;
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 || (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

    return {
        browser: browser,
        os: os,
        // 原生canvas支持，改极端点了
        // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
        canvasSupported: document.createElement('canvas').getContext ? true : false
    };
}

module.exports = detect(navigator.userAgent);

},{}],68:[function(require,module,exports){
/**
 * 事件辅助类
 * @module zrender/tool/event
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */



var Eventful = require('../mixin/Eventful');

/**
 * 提取鼠标（手指）x坐标
 * @memberOf module:zrender/tool/event
 * @param  {Event} e 事件.
 * @return {number} 鼠标（手指）x坐标.
 */
function getX(e) {
    return typeof e.zrenderX != 'undefined' && e.zrenderX || typeof e.offsetX != 'undefined' && e.offsetX || typeof e.layerX != 'undefined' && e.layerX || typeof e.clientX != 'undefined' && e.clientX;
}

/**
 * 提取鼠标y坐标
 * @memberOf module:zrender/tool/event
 * @param  {Event} e 事件.
 * @return {number} 鼠标（手指）y坐标.
 */
function getY(e) {
    return typeof e.zrenderY != 'undefined' && e.zrenderY || typeof e.offsetY != 'undefined' && e.offsetY || typeof e.layerY != 'undefined' && e.layerY || typeof e.clientY != 'undefined' && e.clientY;
}

/**
 * 提取鼠标滚轮变化
 * @memberOf module:zrender/tool/event
 * @param  {Event} e 事件.
 * @return {number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动
 */
function getDelta(e) {
    return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta || typeof e.wheelDelta != 'undefined' && e.wheelDelta || typeof e.detail != 'undefined' && -e.detail;
}

/**
 * 停止冒泡和阻止默认行为
 * @memberOf module:zrender/tool/event
 * @method
 * @param {Event} e : event对象
 */
var stop = typeof window.addEventListener === 'function' ? function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
}
    : function (e) {
    e.returnValue = false;
    e.cancelBubble = true;
};

module.exports = {
    getX: getX,
    getY: getY,
    getDelta: getDelta,
    stop: stop,
    // 做向上兼容
    Dispatcher: Eventful
};


},{"../mixin/Eventful":51}],69:[function(require,module,exports){
/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */


var idStart = 0x0907;

module.exports = function () {
    return 'zrender__' + (idStart++);
};


},{}],70:[function(require,module,exports){
var config = require('../config');

/**
 * @exports zrender/tool/log
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */
module.exports = function () {
    var k;
    if (config.debugMode === 0) {
        return;
    }
    else if (config.debugMode == 1) {
        for ( k in arguments) {
            throw new Error(arguments[k]);
        }
    }
    else if (config.debugMode > 1) {
        for ( k in arguments) {
            // console.log(arguments[k]);
        }
    }
};

/* for debug
 return function(mes) {
 document.getElementById('wrong-message').innerHTML =
 mes + ' ' + (new Date() - 0)
 + '<br/>'
 + document.getElementById('wrong-message').innerHTML;
 };
 */


},{"../config":49}],71:[function(require,module,exports){
var ArrayCtor = typeof Float32Array === 'undefined' ? Array : Float32Array;
/**
 * 3x2矩阵操作类
 * @exports zrender/tool/matrix
 */
var matrix = {
    /**
     * 创建一个单位矩阵
     * @return {Float32Array|Array.<number>}
     */
    create: function () {
        var out = new ArrayCtor(6);
        matrix.identity(out);

        return out;
    },
    /**
     * 设置矩阵为单位矩阵
     * @param {Float32Array|Array.<number>} out
     */
    identity: function (out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = 0;
        out[5] = 0;
        return out;
    },
    /**
     * 复制矩阵
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} m
     */
    copy: function (out, m) {
        out[0] = m[0];
        out[1] = m[1];
        out[2] = m[2];
        out[3] = m[3];
        out[4] = m[4];
        out[5] = m[5];
        return out;
    },
    /**
     * 矩阵相乘
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} m1
     * @param {Float32Array|Array.<number>} m2
     */
    mul: function (out, m1, m2) {
        out[0] = m1[0] * m2[0] + m1[2] * m2[1];
        out[1] = m1[1] * m2[0] + m1[3] * m2[1];
        out[2] = m1[0] * m2[2] + m1[2] * m2[3];
        out[3] = m1[1] * m2[2] + m1[3] * m2[3];
        out[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
        out[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
        return out;
    },
    /**
     * 平移变换
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} a
     * @param {Float32Array|Array.<number>} v
     */
    translate: function (out, a, v) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4] + v[0];
        out[5] = a[5] + v[1];
        return out;
    },
    /**
     * 旋转变换
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} a
     * @param {number} rad
     */
    rotate: function (out, a, rad) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];
        var st = Math.sin(rad);
        var ct = Math.cos(rad);

        out[0] = aa * ct + ab * st;
        out[1] = -aa * st + ab * ct;
        out[2] = ac * ct + ad * st;
        out[3] = -ac * st + ct * ad;
        out[4] = ct * atx + st * aty;
        out[5] = ct * aty - st * atx;
        return out;
    },
    /**
     * 缩放变换
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} a
     * @param {Float32Array|Array.<number>} v
     */
    scale: function (out, a, v) {
        var vx = v[0];
        var vy = v[1];
        out[0] = a[0] * vx;
        out[1] = a[1] * vy;
        out[2] = a[2] * vx;
        out[3] = a[3] * vy;
        out[4] = a[4] * vx;
        out[5] = a[5] * vy;
        return out;
    },
    /**
     * 求逆矩阵
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} a
     */
    invert: function (out, a) {

        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        var det = aa * ad - ab * ac;
        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty - ad * atx) * det;
        out[5] = (ab * atx - aa * aty) * det;
        return out;
    },

    /**
     * 矩阵左乘向量
     * @param {Float32Array|Array.<number>} out
     * @param {Float32Array|Array.<number>} a
     * @param {Float32Array|Array.<number>} v
     */
    mulVector: function (out, a, v) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        out[0] = v[0] * aa + v[1] * ac + atx;
        out[1] = v[0] * ab + v[1] * ad + aty;

        return out;
    }
};

module.exports = matrix;

},{}],72:[function(require,module,exports){
/**
 * zrender: 公共辅助函数
 *
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *
 * clone：深度克隆
 * merge：合并源对象的属性到目标对象
 * getContext：获取一个自由使用的canvas 2D context，使用原生方法，如isPointInPath，measureText等
 */

// 用于处理merge时无法遍历Date等对象的问题
var BUILTIN_OBJECT = {
    '[object Function]': 1,
    '[object RegExp]': 1,
    '[object Date]': 1,
    '[object Error]': 1,
    '[object CanvasGradient]': 1
};

var objToString = Object.prototype.toString;

function isDom(obj) {
    return obj && obj.nodeType === 1 && typeof(obj.nodeName) == 'string';
}

/**
 * 对一个object进行深度拷贝
 *
 * @param {Any} source 需要进行拷贝的对象
 * @return {Any} 拷贝后的新对象
 */
function clone(source) {
    if (typeof source == 'object' && source !== null) {
        var result = source;
        if (source instanceof Array) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
        else if (
            !BUILTIN_OBJECT[objToString.call(source)]&& !isDom(source)
                // 是否为 dom 对象

        ) {
            result = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = clone(source[key]);
                }
            }
        }

        return result;
    }

    return source;
}

function mergeItem(target, source, key, overwrite) {
    if (source.hasOwnProperty(key)) {
        var targetProp = target[key];
        if (typeof targetProp == 'object' && !BUILTIN_OBJECT[objToString.call(targetProp)]&& !isDom(targetProp)
                // 是否为 dom 对象

        ) {
            // 如果需要递归覆盖，就递归调用merge
            merge(
                target[key],
                source[key],
                overwrite
            );
        }
        else if (overwrite || !(key in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[key] = source[key];
        }
    }
}

/**
 * 合并源对象的属性到目标对象
 * modify from Tangram
 * @param {*} target 目标对象
 * @param {*} source 源对象
 * @param {boolean} overwrite 是否覆盖
 */
function merge(target, source, overwrite) {
    for (var i in source) {
        mergeItem(target, source, i, overwrite);
    }

    return target;
}

var _ctx;

function getContext() {
    if (!_ctx) {
        /* jshint ignore:start */
        if (window['G_vmlCanvasManager']) {
            var _div = document.createElement('div');
            _div.style.position = 'absolute';
            _div.style.top = '-1000px';
            document.body.appendChild(_div);

            _ctx = G_vmlCanvasManager.initElement(_div)
                .getContext('2d');
        }
        else {
            _ctx = document.createElement('canvas').getContext('2d');
        }
        /* jshint ignore:end */
    }
    return _ctx;
}

var _canvas;
var _pixelCtx;
var _width;
var _height;
var _offsetX = 0;
var _offsetY = 0;

/**
 * 获取像素拾取专用的上下文
 * @return {Object} 上下文
 */
function getPixelContext() {
    if (!_pixelCtx) {
        _canvas = document.createElement('canvas');
        _width = _canvas.width;
        _height = _canvas.height;
        _pixelCtx = _canvas.getContext('2d');
    }
    return _pixelCtx;
}

/**
 * 如果坐标处在_canvas外部，改变_canvas的大小
 * @param {number} x : 横坐标
 * @param {number} y : 纵坐标
 * 注意 修改canvas的大小 需要重新设置translate
 */
function adjustCanvasSize(x, y) {
    // 每次加的长度
    var _v = 100;
    var _flag;

    if (x + _offsetX > _width) {
        _width = x + _offsetX + _v;
        _canvas.width = _width;
        _flag = true;
    }

    if (y + _offsetY > _height) {
        _height = y + _offsetY + _v;
        _canvas.height = _height;
        _flag = true;
    }

    if (x < -_offsetX) {
        _offsetX = Math.ceil(-x / _v) * _v;
        _width += _offsetX;
        _canvas.width = _width;
        _flag = true;
    }

    if (y < -_offsetY) {
        _offsetY = Math.ceil(-y / _v) * _v;
        _height += _offsetY;
        _canvas.height = _height;
        _flag = true;
    }

    if (_flag) {
        _pixelCtx.translate(_offsetX, _offsetY);
    }
}

/**
 * 获取像素canvas的偏移量
 * @return {Object} 偏移量
 */
function getPixelOffset() {
    return {
        x: _offsetX,
        y: _offsetY
    };
}

/**
 * 查询数组中元素的index
 */
function indexOf(array, value) {
    if (array.indexOf) {
        return array.indexOf(value);
    }
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * 构造类继承关系
 *
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */
function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;

    function F() {
    }

    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();

    for (var prop in clazzPrototype) {
        clazz.prototype[prop] = clazzPrototype[prop];
    }
    clazz.constructor = clazz;
}

module.exports = {
    inherits: inherits,
    clone: clone,
    merge: merge,
    getContext: getContext,
    getPixelContext: getPixelContext,
    getPixelOffset: getPixelOffset,
    adjustCanvasSize: adjustCanvasSize,
    indexOf: indexOf
};


},{}],73:[function(require,module,exports){
var ArrayCtor = typeof Float32Array === 'undefined' ? Array : Float32Array;

/**
 * @typedef {Float32Array|Array.<number>} Vector2
 */
/**
 * 二维向量类
 * @exports zrender/tool/vector
 */
var vector = {
    /**
     * 创建一个向量
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @return {Vector2}
     */
    create: function (x, y) {
        var out = new ArrayCtor(2);
        out[0] = x || 0;
        out[1] = y || 0;
        return out;
    },

    /**
     * 复制向量数据
     * @param {Vector2} out
     * @param {Vector2} v
     * @return {Vector2}
     */
    copy: function (out, v) {
        out[0] = v[0];
        out[1] = v[1];
        return out;
    },

    /**
     * 克隆一个向量
     * @param {Vector2} v
     * @return {Vector2}
     */
    clone: function (v) {
        var out = new ArrayCtor(2);
        out[0] = v[0];
        out[1] = v[1];
        return out;
    },

    /**
     * 设置向量的两个项
     * @param {Vector2} out
     * @param {number} a
     * @param {number} b
     * @return {Vector2} 结果
     */
    set: function (out, a, b) {
        out[0] = a;
        out[1] = b;
        return out;
    },

    /**
     * 向量相加
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     */
    add: function (out, v1, v2) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    },

    /**
     * 向量缩放后相加
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @param {number} a
     */
    scaleAndAdd: function (out, v1, v2, a) {
        out[0] = v1[0] + v2[0] * a;
        out[1] = v1[1] + v2[1] * a;
        return out;
    },

    /**
     * 向量相减
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     */
    sub: function (out, v1, v2) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        return out;
    },

    /**
     * 向量长度
     * @param {Vector2} v
     * @return {number}
     */
    len: function (v) {
        return Math.sqrt(this.lenSquare(v));
    },

    /**
     * 向量长度平方
     * @param {Vector2} v
     * @return {number}
     */
    lenSquare: function (v) {
        return v[0] * v[0] + v[1] * v[1];
    },

    /**
     * 向量乘法
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     */
    mul: function (out, v1, v2) {
        out[0] = v1[0] * v2[0];
        out[1] = v1[1] * v2[1];
        return out;
    },

    /**
     * 向量除法
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     */
    div: function (out, v1, v2) {
        out[0] = v1[0] / v2[0];
        out[1] = v1[1] / v2[1];
        return out;
    },

    /**
     * 向量点乘
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @return {number}
     */
    dot: function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    },

    /**
     * 向量缩放
     * @param {Vector2} out
     * @param {Vector2} v
     * @param {number} s
     */
    scale: function (out, v, s) {
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    },

    /**
     * 向量归一化
     * @param {Vector2} out
     * @param {Vector2} v
     */
    normalize: function (out, v) {
        var d = vector.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        }
        else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    },

    /**
     * 计算向量间距离
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @return {number}
     */
    distance: function (v1, v2) {
        return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
    },

    /**
     * 向量距离平方
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @return {number}
     */
    distanceSquare: function (v1, v2) {
        return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
    },

    /**
     * 求负向量
     * @param {Vector2} out
     * @param {Vector2} v
     */
    negate: function (out, v) {
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    },

    /**
     * 插值两个点
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @param {number} t
     */
    lerp: function (out, v1, v2, t) {
        // var ax = v1[0];
        // var ay = v1[1];
        out[0] = v1[0] + t * (v2[0] - v1[0]);
        out[1] = v1[1] + t * (v2[1] - v1[1]);
        return out;
    },

    /**
     * 矩阵左乘向量
     * @param {Vector2} out
     * @param {Vector2} v
     * @param {Vector2} m
     */
    applyTransform: function (out, v, m) {
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    },
    /**
     * 求两个向量最小值
     * @param  {Vector2} out
     * @param  {Vector2} v1
     * @param  {Vector2} v2
     */
    min: function (out, v1, v2) {
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    },
    /**
     * 求两个向量最大值
     * @param  {Vector2} out
     * @param  {Vector2} v1
     * @param  {Vector2} v2
     */
    max: function (out, v1, v2) {
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    }
};

vector.length = vector.len;
vector.lengthSquare = vector.lenSquare;
vector.dist = vector.distance;
vector.distSquare = vector.distanceSquare;

module.exports = vector;


},{}],74:[function(require,module,exports){
/*!
 * ZRender, a high performance canvas library.
 *  
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 * 
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */

/*
 * HTML5 Canvas for Internet Explorer!
 * Modern browsers like Firefox, Safari, Chrome and Opera support
 * the HTML5 canvas tag to allow 2D command-based drawing.
 * ExplorerCanvas brings the same functionality to Internet Explorer.
 * To use, web developers only need to include a single script tag
 * in their existing web pages.
 *
 * https://code.google.com/p/explorercanvas/
 * http://explorercanvas.googlecode.com/svn/trunk/excanvas.js
 */
// 核心代码会生成一个全局变量 G_vmlCanvasManager，模块改造后借用于快速判断canvas支持
//require('./dep/excanvas');

var util = require('./tool/util');
var log = require('./tool/log');
var guid = require('./tool/guid');

var Handler = require('./Handler');
var Painter = require('./Painter');
var Storage = require('./Storage');
var Animation = require('./animation/Animation');

var _instances = {};    // ZRender实例map索引

/**
 * @exports zrender
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */
var zrender = {};
/**
 * @type {string}
 */
zrender.version = '2.0.8';

/**
 * 创建zrender实例
 *
 * @param {HTMLElement} dom 绘图容器
 * @return {module:zrender/ZRender} ZRender实例
 */
    // 不让外部直接new ZRender实例，为啥？
    // 不为啥，提供全局可控同时减少全局污染和降低命名冲突的风险！
zrender.init = function (dom) {
    var zr = new ZRender(guid(), dom);
    _instances[zr.id] = zr;
    return zr;
};

/**
 * zrender实例销毁
 * @param {module:zrender/ZRender} zr ZRender对象，不传则销毁全部
 */
    // 在_instances里的索引也会删除了
    // 管生就得管死，可以通过zrender.dispose(zr)销毁指定ZRender实例
    // 当然也可以直接zr.dispose()自己销毁
zrender.dispose = function (zr) {
    if (zr) {
        zr.dispose();
    }
    else {
        for (var key in _instances) {
            _instances[key].dispose();
        }
        _instances = {};
    }

    return zrender;
};

/**
 * 获取zrender实例
 * @param {string} id ZRender对象索引
 * @return {module:zrender/ZRender}
 */
zrender.getInstance = function (id) {
    return _instances[id];
};

/**
 * 删除zrender实例，ZRender实例dispose时会调用，
 * 删除后getInstance则返回undefined
 * ps: 仅是删除，删除的实例不代表已经dispose了~~
 *     这是一个摆脱全局zrender.dispose()自动销毁的后门，
 *     take care of yourself~
 *
 * @param {string} id ZRender对象索引
 */
zrender.delInstance = function (id) {
    delete _instances[id];
    return zrender;
};

function getFrameCallback(zrInstance) {
    return function () {
        var animatingElements = zrInstance.animatingElements;
        for (var i = 0, l = animatingElements.length; i < l; i++) {
            zrInstance.storage.mod(animatingElements[i].id);
        }
        if (animatingElements.length || zrInstance._needsRefreshNextFrame) {
            zrInstance.refresh();
        }
    };
}

/**
 * @module zrender/ZRender
 */
/**
 * ZRender接口类，对外可用的所有接口都在这里
 * 非get接口统一返回支持链式调用
 *
 * @constructor
 * @alias module:zrender/ZRender
 * @param {string} id 唯一标识
 * @param {HTMLElement} dom dom对象，不帮你做document.getElementById
 * @return {ZRender} ZRender实例
 */
var ZRender = function (id, dom) {
    /**
     * 实例 id
     * @type {string}
     */
    this.id = id;
    this.env = require('./tool/env');

    this.storage = new Storage();
    this.painter = new Painter(dom, this.storage);
    this.handler = new Handler(dom, this.storage, this.painter);

    // 动画控制
    this.animatingElements = [];
    /**
     * @type {module:zrender/animation/Animation}
     */
    this.animation = new Animation({
        stage: {
            update: getFrameCallback(this)
        }
    });
    this.animation.start();

    var self = this;
    this.painter.refreshNextFrame = function () {
        self.refreshNextFrame();
    };

    this._needsRefreshNextFrame = false;

    // 修改 storage.delFromMap, 每次删除元素之前删除动画
    // FIXME 有点ugly
    var storage = this.storage;
    var oldDelFromMap = storage.delFromMap;
    storage.delFromMap = function (elId) {
        var el = storage.get(elId);
        self.stopAnimation(el);
        oldDelFromMap.call(storage, elId);
    };
};

/**
 * 获取实例唯一标识
 * @return {string}
 */
ZRender.prototype.getId = function () {
    return this.id;
};

/**
 * 添加图形形状到根节点
 * @deprecated Use {@link module:zrender/ZRender.prototype.addElement} instead
 * @param {module:zrender/shape/Base} shape 形状对象，可用属性全集，详见各shape
 */
ZRender.prototype.addShape = function (shape) {
    this.addElement(shape);
    return this;
};

/**
 * 添加组到根节点
 * @deprecated Use {@link module:zrender/ZRender.prototype.addElement} instead
 * @param {module:zrender/Group} group
 */
ZRender.prototype.addGroup = function (group) {
    this.addElement(group);
    return this;
};

/**
 * 从根节点删除图形形状
 * @deprecated Use {@link module:zrender/ZRender.prototype.delElement} instead
 * @param {string} shapeId 形状对象唯一标识
 */
ZRender.prototype.delShape = function (shapeId) {
    this.delElement(shapeId);
    return this;
};

/**
 * 从根节点删除组
 * @deprecated Use {@link module:zrender/ZRender.prototype.delElement} instead
 * @param {string} groupId
 */
ZRender.prototype.delGroup = function (groupId) {
    this.delElement(groupId);
    return this;
};

/**
 * 修改图形形状
 * @deprecated Use {@link module:zrender/ZRender.prototype.modElement} instead
 * @param {string} shapeId 形状对象唯一标识
 * @param {Object} shape 形状对象
 */
ZRender.prototype.modShape = function (shapeId, shape) {
    this.modElement(shapeId, shape);
    return this;
};

/**
 * 修改组
 * @deprecated Use {@link module:zrender/ZRender.prototype.modElement} instead
 * @param {string} groupId
 * @param {Object} group
 */
ZRender.prototype.modGroup = function (groupId, group) {
    this.modElement(groupId, group);
    return this;
};

/**
 * 添加元素
 * @param  {string|module:zrender/Group|module:zrender/shape/Base} el
 */
ZRender.prototype.addElement = function (el) {
    this.storage.addRoot(el);
    this._needsRefreshNextFrame = true;
    return this;
};

/**
 * 删除元素
 * @param  {string|module:zrender/Group|module:zrender/shape/Base} el
 */
ZRender.prototype.delElement = function (el) {
    this.storage.delRoot(el);
    this._needsRefreshNextFrame = true;
    return this;
};

/**
 * 修改元素, 主要标记图形或者组需要在下一帧刷新。
 * 第二个参数为需要覆盖到元素上的参数，不建议使用。
 *
 * @example
 *     el.style.color = 'red';
 *     el.position = [10, 10];
 *     zr.modElement(el);
 * @param  {string|module:zrender/Group|module:zrender/shape/Base} el
 * @param {Object} [params]
 */
ZRender.prototype.modElement = function (el, params) {
    this.storage.mod(el, params);
    this._needsRefreshNextFrame = true;
    return this;
};

/**
 * 修改指定zlevel的绘制配置项
 *
 * @param {string} zLevel
 * @param {Object} config 配置对象
 * @param {string} [config.clearColor=0] 每次清空画布的颜色
 * @param {string} [config.motionBlur=false] 是否开启动态模糊
 * @param {number} [config.lastFrameAlpha=0.7]
 *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
 * @param {Array.<number>} [config.position] 层的平移
 * @param {Array.<number>} [config.rotation] 层的旋转
 * @param {Array.<number>} [config.scale] 层的缩放
 * @param {boolean} [config.zoomable=false] 层是否支持鼠标缩放操作
 * @param {boolean} [config.panable=false] 层是否支持鼠标平移操作
 */
ZRender.prototype.modLayer = function (zLevel, config) {
    this.painter.modLayer(zLevel, config);
    this._needsRefreshNextFrame = true;
    return this;
};

/**
 * 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空
 *
 * @param {Object} shape 形状对象
 */
ZRender.prototype.addHoverShape = function (shape) {
    this.storage.addHover(shape);
    return this;
};

/**
 * 渲染
 *
 * @param {Function} callback  渲染结束后回调函数
 */
ZRender.prototype.render = function (callback) {
    this.painter.render(callback);
    this._needsRefreshNextFrame = false;
    return this;
};

/**
 * 视图更新
 *
 * @param {Function} callback  视图更新后回调函数
 */
ZRender.prototype.refresh = function (callback) {
    this.painter.refresh(callback);
    this._needsRefreshNextFrame = false;
    return this;
};

/**
 * 标记视图在浏览器下一帧需要绘制
 */
ZRender.prototype.refreshNextFrame = function () {
    this._needsRefreshNextFrame = true;
    return this;
};

/**
 * 绘制高亮层
 * @param {Function} callback  视图更新后回调函数
 */
ZRender.prototype.refreshHover = function (callback) {
    this.painter.refreshHover(callback);
    return this;
};

/**
 * 视图更新
 *
 * @param {Array.<module:zrender/shape/Base>} shapeList 需要更新的图形列表
 * @param {Function} callback  视图更新后回调函数
 */
ZRender.prototype.refreshShapes = function (shapeList, callback) {
    this.painter.refreshShapes(shapeList, callback);
    return this;
};

/**
 * 调整视图大小
 */
ZRender.prototype.resize = function () {
    this.painter.resize();
    return this;
};

/**
 * 动画
 *
 * @param {string|module:zrender/Group|module:zrender/shape/Base} el 动画对象
 * @param {string} path 需要添加动画的属性获取路径，可以通过a.b.c来获取深层的属性
 * @param {boolean} [loop] 动画是否循环
 * @return {module:zrender/animation/Animation~Animator}
 * @example:
 *     zr.animate(circle.id, 'style', false)
 *         .when(1000, {x: 10} )
 *         .done(function(){ // Animation done })
 *         .start()
 */
ZRender.prototype.animate = function (el, path, loop) {
    if (typeof(el) === 'string') {
        el = this.storage.get(el);
    }
    if (el) {
        var target;
        if (path) {
            var pathSplitted = path.split('.');
            var prop = el;
            for (var i = 0, l = pathSplitted.length; i < l; i++) {
                if (!prop) {
                    continue;
                }
                prop = prop[pathSplitted[i]];
            }
            if (prop) {
                target = prop;
            }
        }
        else {
            target = el;
        }

        if (!target) {
            log(
                'Property "' + path + '" is not existed in element ' + el.id
            );
            return;
        }

        var animatingElements = this.animatingElements;
        if (!el.__animators) {
            // 正在进行的动画记数
            el.__animators = [];
        }
        var animators = el.__animators;

        if (animators.length === 0) {
            animatingElements.push(el);
        }

        var animator = this.animation.animate(target, {loop: loop})
            .done(function () {
                var idx = util.indexOf(el.__animators, animator);
                if (idx >= 0) {
                    animators.splice(idx, 1);
                }
                if (animators.length === 0) {
                    // 从animatingElements里移除
                    var idx1 = util.indexOf(animatingElements, el);
                    animatingElements.splice(idx1, 1);
                }
            });
        animators.push(animator);

        return animator;
    }
    else {
        log('Element not existed');
    }
};

/**
 * 停止动画对象的动画
 * @param  {string|module:zrender/Group|module:zrender/shape/Base} el
 */
ZRender.prototype.stopAnimation = function (el) {
    if (el.__animators) {
        var animators = el.__animators;
        var len = animators.length;
        for (var i = 0; i < len; i++) {
            animators[i].stop();
        }
        if (len > 0) {
            var animatingElements = this.animatingElements;
            var idx = util.indexOf(animatingElements, el);
            if (idx >= 0) {
                animatingElements.splice(idx, 1);
            }
        }

        animators.length = 0;
    }
    return this;
};

/**
 * 停止所有动画
 */
ZRender.prototype.clearAnimation = function () {
    this.animation.clear();
    this.animatingElements.length = 0;
    return this;
};

/**
 * loading显示
 *
 * @param {Object=} loadingEffect loading效果对象
 */
ZRender.prototype.showLoading = function (loadingEffect) {
    this.painter.showLoading(loadingEffect);
    return this;
};

/**
 * loading结束
 */
ZRender.prototype.hideLoading = function () {
    this.painter.hideLoading();
    return this;
};

/**
 * 获取视图宽度
 */
ZRender.prototype.getWidth = function () {
    return this.painter.getWidth();
};

/**
 * 获取视图高度
 */
ZRender.prototype.getHeight = function () {
    return this.painter.getHeight();
};

/**
 * 图像导出
 * @param {string} type
 * @param {string} [backgroundColor='#fff'] 背景色
 * @return {string} 图片的Base64 url
 */
ZRender.prototype.toDataURL = function (type, backgroundColor, args) {
    return this.painter.toDataURL(type, backgroundColor, args);
};

/**
 * 将常规shape转成image shape
 * @param {module:zrender/shape/Base} e
 * @param {number} width
 * @param {number} height
 */
ZRender.prototype.shapeToImage = function (e, width, height) {
    var id = guid();
    return this.painter.shapeToImage(id, e, width, height);
};

/**
 * 事件绑定
 *
 * @param {string} eventName 事件名称
 * @param {Function} eventHandler 响应函数
 * @param {Object} [context] 响应函数
 */
ZRender.prototype.on = function (eventName, eventHandler, context) {
    this.handler.on(eventName, eventHandler, context);
    return this;
};

/**
 * 事件解绑定，参数为空则解绑所有自定义事件
 *
 * @param {string} eventName 事件名称
 * @param {Function} eventHandler 响应函数
 */
ZRender.prototype.un = function (eventName, eventHandler) {
    this.handler.un(eventName, eventHandler);
    return this;
};

/**
 * 事件触发
 *
 * @param {string} eventName 事件名称，resize，hover，drag，etc
 * @param {event=} event event dom事件对象
 */
ZRender.prototype.trigger = function (eventName, event) {
    this.handler.trigger(eventName, event);
    return this;
};

/**
 * 清除当前ZRender下所有类图的数据和显示，clear后MVC和已绑定事件均还存在在，ZRender可用
 */
ZRender.prototype.clear = function () {
    this.storage.delRoot();
    this.painter.clear();
    return this;
};

/**
 * 释放当前ZR实例（删除包括dom，数据、显示和事件绑定），dispose后ZR不可用
 */
ZRender.prototype.dispose = function () {
    this.animation.stop();

    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();

    this.animation =
        this.animatingElements =
            this.storage =
                this.painter =
                    this.handler = null;

    // 释放后告诉全局删除对自己的索引，没想到啥好方法
    zrender.delInstance(this.id);
};

module.exports = zrender;


},{"./Handler":42,"./Painter":44,"./Storage":45,"./animation/Animation":46,"./tool/env":67,"./tool/guid":69,"./tool/log":70,"./tool/util":72}]},{},[1]);
