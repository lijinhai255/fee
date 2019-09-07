(function(graph){
    function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
            eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
    }
    require('./src/index.js')
  })({"./src/index.js":{"dependecies":{"./hello.js":"./src/hello.js","./word.js":"./src/word.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\nvar _word = require(\"./word.js\");\n\ndocument.write((0, _hello.say)(\"webpack\"));"},"./src/hello.js":{"dependecies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _word = require(\"./word.js\");\n\n//./src/word.js\nfunction say(name) {\n  return \"hello \" + name + (0, _word.say2)();\n}"},"./src/word.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say2 = say2;\n\nfunction say2() {\n  return \"xiix\";\n}"}})