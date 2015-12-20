// Filename: umdname.spec.js  
// Timestamp: 2015.12.19-15:42:30 (last modified)
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


describe("umdname", function () {
  it("should adapt the mustche.js UMD boilerplate to use namespace 'speedracer'", function () {
    var content = umdname(umd_mustache, 'speedracer');

     expect(/Mustache/gm.test(content)).toBe(false);
     expect(/speedracer/gm.test(content)).toBe(true);     
  });
});
