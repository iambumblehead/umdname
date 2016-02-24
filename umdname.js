// Filename: umdname.js  
// Timestamp: 2016.02.23-18:01:37 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// official umd templates,
//   https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
//
// sample boilerplate used by mustache.js
// (function (root, factory) {
//   if (typeof exports === "object" && exports) {
//     factory(exports); // CommonJS
//   } else {
//     var mustache = {};
//     factory(mustache);
//     if (typeof define === "function" && define.amd) {
//       define(mustache); // AMD
//     } else {
//       root.Mustache = mustache; // <script>
//     }
//   }
// }(this, function (mustache) {
// 
// }));


var estraverse = require('estraverse'),
    escodegen = require('escodegen'),
    esprima = require('esprima');

var umdname = module.exports = (function (o) {

  o = function (content, namespace) {
    return o.content_withnamespace(content, namespace);
  };

  o.template_with_namespace = function (umd_expression_ast, namespace) {
    var global = umd_expression_ast.params &&
                 umd_expression_ast.params[0].name || 'root';

    return estraverse.replace(umd_expression_ast, {
      leave: function leave(node, parent) {
        if (parent.type === 'AssignmentExpression' &&
            node.type === 'MemberExpression' &&
            node.property &&
            (node.object.name === global ||
             (parent.right &&
              parent.right.type === 'CallExpression' &&
              parent.right.callee.name === global))) {
          node.property.name = namespace;
        }
        
        return node;
      }
    });
  };
  
  o.content_withnamespace = function (content, namespace) {
    var ast = esprima.parse(content);
    
    // this expression and function expression as args
    for (var x = 0; x < ast.body.length; x++) {
      if (ast.body[x].type === 'ExpressionStatement' &&
          ast.body[x].expression.type === 'CallExpression') {
        ast.body[x].expression.callee =
          o.template_with_namespace(ast.body[x].expression.callee, namespace);
        break;
      }
    }
    
    return escodegen.generate(ast, {
      format: {
        indent: { style: '  ' },
        semicolons: true,
        compact: false
      }
    });
  };
  
  return o;

}({}));
