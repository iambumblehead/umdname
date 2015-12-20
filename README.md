umdname
=======
**(c)[Bumblehead][0], 2016** [MIT-license](#license)

### overview

umdname changes the global name a umd module will define. For example, this umd boilerplate is found in mustache.js:

```javascript
(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {
  /* ... mustache.js ... */
}));
```

umdname can return this content with `Mustache` changed to `speedracer` using `umdname(mustachecontent, 'speedracer')`

```javascript
(function (root, factory) {
  if (typeof exports === 'object' && exports) {
    factory(exports);
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === 'function' && define.amd) {
      define(mustache);
    } else {
      root.speedracer = mustache;
    }
  }
}(this, function (mustache) {
  /* ... mustache.js ... */
}));
```

The adaptation is useful for browser build tools that must define the name of a module to a predefined name referenced by other files.

It is assumed that content passed to umdname consists of a single valid umd-wrapped expression following the official [umd boilerplate template][1]. Currently no error-check is performed.

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js "umd boilerplate"

---------------------------------------------------------
#### <a id="license">license

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2016 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
