// Filename: umdname.spec.js  
// Timestamp: 2019.07.11-10:11:59 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var umdname = require('../');

var umd_mustache = [
  '(function (root, factory) {',
  '  if (typeof exports === "object" && exports) {',
  '    factory(exports); // CommonJS',
  '  } else {',
  '    var mustache = {};',
  '    factory(mustache);',
  '    if (typeof define === "function" && define.amd) {',
  '      define(mustache); // AMD',
  '    } else {',
  '      root.Mustache = mustache; // <script>',
  '    }',
  '  }',
  '}(this, function (mustache) {',
  '',
  '  mustache.hid = "hi";',
  '',
  '}));'
].join('\n');

var umd_rxall = [
  ';(function (undefined) {',
  '  var objectTypes = {',
  '    \'function\': true,',
  '    \'object\': true',
  '  };',
  '',
  '  function checkGlobal(value) {',
  '    return (value && value.Object === Object) ? value : null;',
  '  }',
  '',
  '  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;',
  '  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;',
  '  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === \'object\' && global);',
  '  var freeSelf = checkGlobal(objectTypes[typeof self] && self);',
  '  var freeWindow = checkGlobal(objectTypes[typeof window] && window);',
  '  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;',
  '  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);',
  '  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function(\'return this\')();',
  '',
  '  var Rx = {',
  '    internals: {},',
  '    config: {',
  '      Promise: root.Promise',
  '    },',
  '    helpers: { }',
  '  };',
  '',
  '  // Defaults',
  '  var noop = Rx.helpers.noop = function () { },',
  '    identity = Rx.helpers.identity = function (x) { return x; },',
  '    defaultNow = Rx.helpers.defaultNow = Date.now,',
  '    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },',
  '    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },',
  '    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },',
  '    defaultError = Rx.helpers.defaultError = function (err) { throw err; };',
  '',
  '  ',
  '  if (typeof define == \'function\' && typeof define.amd == \'object\' && define.amd) {',
  '    root.Rx = Rx;',
  '',
  '    define(function() {',
  '      return Rx;',
  '    });',
  '  } else if (freeExports && freeModule) {',
  '    // in Node.js or RingoJS',
  '    if (moduleExports) {',
  '      (freeModule.exports = Rx).Rx = Rx;',
  '    } else {',
  '      freeExports.Rx = Rx;',
  '    }',
  '  } else {',
  '    // in a browser or Rhino',
  '    root.Rx = Rx;',
  '  }',
  '',
  '  // All code before this point will be filtered from stack traces.',
  '  var rEndingLine = captureLine();',
  '',
  '}.call(this));'
].join('\n');

// `$ browserify src/index.js -s global-name > dist/global-name.js`
//
var umd_browserify = [
  '(function (f) {',
  '  if (typeof exports === \'object\' && typeof module !== \'undefined\') {',
  '    module.exports = f();',
  '  } else if (typeof define === \'function\' && define.amd) {',
  '    define([], f);',
  '  } else {',
  '    var g;',
  '    if (typeof window !== \'undefined\') {',
  '      g = window;',
  '    } else if (typeof global !== \'undefined\') {',
  '      g = global;',
  '    } else if (typeof self !== \'undefined\') {',
  '      g = self;',
  '    } else {',
  '      g = this;',
  '    }',
  '    g.browserifyglobalname = f();',
  '  }',
  '}(function () { }()));'
].join('\n');

var umd_numeral = [
    '(function () {',
    '    var numeral;',
    '    ',
    '    // CommonJS module is defined',
    '    if (hasModule) {',
    '        module.exports = numeral;',
    '    }',
    '',
    '    /*global ender:false */',
    '    if (typeof ender === \'undefined\') {',
    '        // here, `this` means `window` in the browser, or `global` on the server',
    '        // add `numeral` as a global object via a string identifier,',
    '        // for Closure Compiler \'advanced\' mode',
    '        this[\'numeralglobalname\'] = numeral;',
    '    }',
    '',
    '    /*global define:false */',
    '    if (typeof define === \'function\' && define.amd) {',
    '        define([], function () {',
    '            return numeral;',
    '        });',
    '    }',
    '}).call(this);',
].join('\n');

var umd_amplitude = [
  '(function umd(require){',
  '  if (\'object\' == typeof exports) {',
  '    module.exports = require(\'1\');',
  '  } else if (\'function\' == typeof define && define.amd) {',
  '    define(function(){ return require(\'1\'); });',
  '  } else {',
  '    window[\'amplitudeglobalname\'] = require(\'1\');',
  '  }',
  '})((function outer(modules, cache, entries){',
  '',
  '  /**',
  '   * Global',
  '   */',
  '',
  '  var global = (function(){ return this; })();',
  '',
  '})({  }));'
].join('\n');

var umd_js_sha_256 = `
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  /* ... */
    if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();
`;

describe("umdname", () => {
  it("should adapt the mustche.js UMD boilerplate to use namespace 'speedracer'", () => {
    var content = umdname(umd_mustache, 'speedracer');

    expect(/Promise: root.speedracer/gm.test(content)).toBe(false);
    expect(/Mustache/gm.test(content)).toBe(false);
    expect(/speedracer/gm.test(content)).toBe(true);     
  });
});

describe("rxjsname", () => {
  it("should adapt the rx-all.js UMD boilerplate to use namespace 'speedracer'", () => {
    var content = umdname(umd_rxall, 'speedracer');

    expect(/root.Rx/gm.test(content)).toBe(false);    
    expect(/root.speedracer/gm.test(content)).toBe(true);     
  });
});

describe("umdbrowserify", () => {
  it("should adapt the browserify UMD boilerplate to use namespace 'speedracer'", () => {
    var content = umdname(umd_browserify, 'speedracer');

    expect(/g.browserifyglobalname/gm.test(content)).toBe(false);    
    expect(/g.speedracer/gm.test(content)).toBe(true);     
  });
});

describe("umdnumeral", () => {
  it("should adapt the numeral UMD boilerplate to use namespace 'speedracer'", () => {
    var content = umdname(umd_numeral, 'speedracer');

    expect(/numeralglobalname/gm.test(content)).toBe(false);    
    expect(/speedracer/gm.test(content)).toBe(true);     
  });
});

describe("umdamplitude", () => {
  it("should adapt the amplitude UMD boilerplate to use namespace 'speedracer'", () => {
    var content = umdname(umd_amplitude, 'speedracer');

    expect(/amplitudeglobalname/gm.test(content)).toBe(false);    
    expect(/speedracer/gm.test(content)).toBe(true);     
  });
});

describe("umdsha256", () => {
  it("should adapt the js-sha256 UMD boilerplate to use namespace 'speedracer'", () => {
    const content = umdname(umd_js_sha_256, 'speedracer');

    expect(/speedracer/gm.test(content)).toBe(true);     
  });
});
