// Filename: umdname.spec.js  
// Timestamp: 2016.02.23-17:40:11 (last modified)
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

describe("umdname", function () {
  it("should adapt the mustche.js UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_mustache, 'speedracer');

    expect(/Promise: root.speedracer/gm.test(content)).toBe(false);
    expect(/Mustache/gm.test(content)).toBe(false);
    expect(/speedracer/gm.test(content)).toBe(true);     
  });
});

describe("rxjsname", function () {
  it("should adapt the rx-all.js UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_rxall, 'speedracer');

    expect(/root.Rx/gm.test(content)).toBe(false);    
    expect(/root.speedracer/gm.test(content)).toBe(true);     
  });
});

describe("umdbrowserify", function () {
  it("should adapt the browserify UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_browserify, 'speedracer');
    
    expect(/g.browserifyglobalname/gm.test(content)).toBe(false);    
    expect(/g.speedracer/gm.test(content)).toBe(true);     
  });
});
