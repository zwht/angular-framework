(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


({"..":({"controller":({"common":({"c404Ctrl":require("../controller/common/c404Ctrl.js")}),"demo":({"iconCtrl":require("../controller/demo/iconCtrl.js"),"indexCtrl":require("../controller/demo/indexCtrl.js")}),"main":(function () {var f = require("../controller/main/index.js");f["index"]=require("../controller/main/index.js");return f;})()}),"servers":({"common":require("../servers/common.js")}),"plugin":({"backTop":require("../plugin/backTop.js"),"comment":require("../plugin/comment.js"),"dataExport":require("../plugin/dataExport.js"),"dialog":require("../plugin/dialog.js"),"flag":require("../plugin/flag.js"),"httpException":require("../plugin/httpException.js"),"loading":require("../plugin/loading.js"),"md5":require("../plugin/md5.js"),"menu":require("../plugin/menu.js"),"notifier":require("../plugin/notifier.js"),"query":require("../plugin/query.js"),"resize":require("../plugin/resize.js"),"routeAuthorize":require("../plugin/routeAuthorize.js"),"serverInject":require("../plugin/serverInject.js"),"session":require("../plugin/session.js"),"titleInject":require("../plugin/titleInject.js"),"tokenInject":require("../plugin/tokenInject.js")})})});

//require("../module/main.js");

module.exports={};


},{"../controller/common/c404Ctrl.js":9,"../controller/demo/iconCtrl.js":10,"../controller/demo/indexCtrl.js":11,"../controller/main/index.js":12,"../plugin/backTop.js":16,"../plugin/comment.js":17,"../plugin/dataExport.js":18,"../plugin/dialog.js":19,"../plugin/flag.js":20,"../plugin/httpException.js":21,"../plugin/loading.js":22,"../plugin/md5.js":23,"../plugin/menu.js":24,"../plugin/notifier.js":25,"../plugin/query.js":26,"../plugin/resize.js":27,"../plugin/routeAuthorize.js":28,"../plugin/serverInject.js":29,"../plugin/session.js":30,"../plugin/titleInject.js":31,"../plugin/tokenInject.js":32,"../servers/common.js":33}],2:[function(require,module,exports){
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
},{"../../module/common":13}],10:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("demoIconCtrl", demoIconCtrl);

demoIconCtrl.$inject = ["$scope"];
function demoIconCtrl($scope) {
	console.log("demoIconCtrl");
}
},{"../../module/demo":14}],11:[function(require,module,exports){
var md = require("../../module/demo");
md.controller("demoIndexCtrl", demoIndexCtrl);

demoIndexCtrl.$inject = ["$scope","$location"];
function demoIndexCtrl($scope,$location) {
    console.log("demoIndexCtrl");
    $scope.goTo=function(){
        $location.path("/404")
    }
}
},{"../../module/demo":14}],12:[function(require,module,exports){
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
},{"../../module/main":15}],13:[function(require,module,exports){
var md=angular.module("web.common",[]);

md.config(["$routeProvider",config]);

function config(route){
    route.when("/404",{templateUrl:"./page/common/404.html",controller:"c404Ctrl",menu:"common.404"});
}

module.exports=md;
},{}],14:[function(require,module,exports){
var md=angular.module("web.demo",[]);

md.config(config);
config.$inject = ["$routeProvider"];
function config($routeProvider) {
    $routeProvider  
        .when("/demo",{templateUrl:"page/demo/index.html",controller:"demoIndexCtrl",menu:"demo.index"})
        .when("/demo/icon",{templateUrl:"page/demo/icon.html",controller:"demoIconCtrl",menu:"demo.icon"})

}

module.exports=md;
},{}],15:[function(require,module,exports){
var md=angular.module("web.main",[
    "ngRoute",
    "ngResource",
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

},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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






},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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


},{}],22:[function(require,module,exports){

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
},{}],23:[function(require,module,exports){
var md=angular.module("md5",[]);
var md5=require("MD5");
var sc=this;

md.service('md5', [function(flag){
    return function(str){
        return md5(str); 
    }
}])

module.exports=md;
},{"MD5":2}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){

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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){

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
},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"../module/common":13}]},{},[1]);
