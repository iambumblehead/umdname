// Filename: umdname.spec.js  
// Timestamp: 2016.02.11-01:54:15 (last modified)
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

describe("umdname", function () {
  it("should adapt the mustche.js UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_mustache, 'speedracer');

     expect(/Mustache/gm.test(content)).toBe(false);
     expect(/speedracer/gm.test(content)).toBe(true);     
  });
});

describe("rxjsname", function () {
  it("should adapt the rx-all.js UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_rxall, 'speedracer');

    console.log('content is ', content);
    
     expect(/root.Rx/gm.test(content)).toBe(false);
     expect(/root.speedracer/gm.test(content)).toBe(true);     
  });
});
