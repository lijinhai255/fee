# React 组件

## 使用第三方组件
```
npm  install antd --save
```

> 使用ant-design组件库

````JavaScript
import React, { Component } from 'react'
import Button from 'antd/lib/button'
import "antd/dist/antd.css"
class App extends Component {  
    render() {    
        return (      
        <div className="App">        
        <Button type="primary">Button</Button>      </div>    
        )  
    }
}
export default App
````
> 简化引入方式: 安装react-app-resired取代react-script, 可以拓展webpack的配置

````
npm install react-app-rewired customize-cra babel-plugin-import -D
````
> 目录创建config-overrides.js

````JavaScript
const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

// override生成webpack配置对象
module.exports = override(
  fixBabelImports("import", { // antd按需加载
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addDecoratorsLegacy() // 配置装饰器
);
//修改package.json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
````

> 支持装饰器配置
````JavaScript
npm install -D @babel/plugin-proposal-decorators
````
````JavaScript
const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

// override生成webpack配置对象
module.exports = override(
  ....
  addDecoratorsLegacy() // 配置装饰器
);
````
## 表单组件设计与实现
antd表单使用