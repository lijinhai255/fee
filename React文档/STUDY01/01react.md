# React_oneDay

## 资源

1. [react](https://zh-hans.reactjs.org/)
1. [create-react-app](https://create-react-app.dev/docs/getting-started)

## 起步

````
1. 安装官方脚手架: npm install -g create-react-app
2. 创建项目: create-react-app react-study
3. 启动项目: npm start
````

## 文件结构 

````
── README.md                     文档
├── public                        静态资源
│   ├── favicon.ico│   
|   ├── index.html│   
|   └── manifest.json
└── src                           源码    
    ├── App.css   
    ├── App.js                    根组件    
    ├── App.test.js                   
    ├── index.css                 全局样式    
    ├── index.js                  入口文件    
    ├── logo.svg    
    └── serviceWorker.js          pwa支持
├── package.json                  npm 依赖
````

### React-cli配置文件

**使用npm run eject 弹出项目真面目  会多出两个目录**


````
├── config                            
    ├── env.js 处理.env环境变量配置文件    
    ├── paths.js 提供各种路径    
    ├── webpack.config.js webpack配置文件    
    └── webpackDevServer.config.js 测试服务器配置文件
└── scripts    启动、打包和测试脚本    
    ├── build.js 打包脚本、    
    ├── start.js 启动脚本    
    └── test.js  测试脚本

````

**env.js用来处理.env文件中配置的环境变量**

````JavaScript
/ node运行环境：development、production、test等
const NODE_ENV = process.env.NODE_ENV;
// 要扫描的文件名数组
var dotenvFiles = [  
    `${paths.dotenv}.${NODE_ENV}.local`, // .env.development.local
    `${paths.dotenv}.${NODE_ENV}`,       // .env.development
    NODE_ENV !== 'test' && `${paths.dotenv}.local`, // .env.local
    paths.dotenv, // .env
].filter(Boolean);
// 从.env*文件加载环境变量
dotenvFiles.forEach(dotenvFile => {  
    if (fs.existsSync(dotenvFile)) {    
        require('dotenv-expand')(      
            require('dotenv').config({        
                path: dotenvFile,      
            })    
        ); 
}});

````

**修改默认的端口号**

`````JavaScript
PORT=8080
`````

**webpackConfig配置文件**
````JavaSCript
const useTypeScript = fs.existsSync(paths.appTsConfig);
// style files regexesconst 
cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
````

## React和ReactDom

````javaScript
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<h1>React真帅</h1>, document.querySelector('#root'));
````

> React负责逻辑控制, 数组=>vDom
> ReactDom 渲染实际Dom, VDOM->DOM ,如果换成移动端就用其他的库进行渲染
> React使用JSX来描述UI

>入口文件定义
````JavaScript
entry: [ // WebpackDevServer客户端，它实现开发时热更新功能 
isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'), // 应用程序入口：src/index 
paths.appIndexJs,
].filter(Boolean),
````

## JSX

JSX是一种JavaScript的语法扩展，其格式比较像模版语言，但事实上完全是在JavaScript内部实现的。JSX可以很好地描述UI，能够有效提高开发效率

### 使用JSX

表达式{}的使用，index.js

````javaScript
const name = "react study"
const jsx = <h2>{name}<h2>
````

函数也是合法表达式

````javaScript
const user = { firstName: "tom", lastName: "jerry" };
function formatName(user) {  
    return user.firstName + " " + user.lastName;
}
const jsx = <h2>{formatName(user)}</h2>
````
jsx是js对象，也是合法表达式
````javaScript
const green = <p>hellow,Jerry</p>
const jsx = <h2>{green}</h2>
````

条件语句

````JavaScript
const name = "React真帅";
const jsx = (
    <div>
    {name ? <h1>{name}</h1> : null}
    </div>
)
````
数组会被作为一组子元素对待，数组中存放一组jsx可用于显示列表数据

````javaScript 
const arr = [1, 2, 3].map(num => <li key={num}>{num}</li>);
const jsx = (
    <div>
    <ul>{arr}</ul>
    </div>
)
````
属性的使用
````javaScript
import logo from "../logo.svg";
const jsx =(
    <div>
    {/* 属性：静态值用双引号，动态值用花括号；class、for等要特殊处理。 */}
        <img
        src={logo}
        alt="logo"
        style={{ width: 100 }}
        className={style.img}
        />
    </div>
)
````
css模块化，创建index.module.css，index.js
````javaScript
import style from "./index.module.css";
<img className={style.img} />
````

## 组件
### 组件两种形式
#### class组件
class组件通常拥有**状态**和**生命周期**,继承**Component**,实现render方法
````JavaScript
import React, { Component } from "react";
import logo from "../logo.svg";
// import './index.css';
import style from "../index.module.css";

export default class JsxTest extends Component {
  render() {
    // React类负责逻辑控制，比如修改数据 -> vdom
    // ReactDOM类负责渲染，vdom -> dom
    // babel-loader可以转换jsx -> vdom,
    // <h1>React真帅</h1> => React.createElement('h1', 'React真帅')
    // 变量使用, 只要是合法js表达式
    const name = "React真帅";

    const user = { firstName: "tom", lastName: "jerry" };
    function formatName(user) {
      return user.firstName + " " + user.lastName;
    }

    const greet = <p>hello,jerry</p>;

    // 由于条件语句或者循环语句不是合法表达式
    // const title = name ? <h1>{name}</h1> : null;

    // 数组会作为一组子元素对待
    // 处理循环的方式
    const arr = [1, 2, 3].map(num => <li key={num}>{num}</li>);

    return (
      <div>
        {/* 条件语句 */}
        {name ? <h1>{name}</h1> : null}
        {/* 函数也是合法表达式 */}
        <p>{formatName(user)}</p>
        {/* jsx本身也是合法表达式 */}
        {greet}
        {/* 数组处理 */}
        {/* 显示列表 */}
        <ul>{arr}</ul>
        {/* 属性使用: 静态值用双引号，动态值用花括号 */}
        {/* class、for关键字要特殊处理 */}
        <img
          src={logo}
          alt="logo"
          style={{ width: 100 }}
          className={style.img}
        />
        {/* <label htmlFor=""></label> */}
      </div>
    );
  }
}
````
#### function组件
函数组件通常**无状态**,仅关注内容的展示,返回渲染结果即可
````JavaScript
import React from "react";
import JsxTest from "./components/JsxTest";
import StateMgt from "./components/StateMgt";
import EventHandle from "./components/EventHandle";

// 函数式组件
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <JsxTest />
//       </div>
//     );
//   }
// }
function App(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      {/* <JsxTest /> */}
      {/* 状态管理 */}
      <StateMgt />
      {/* 事件处理 */}
      {/* <EventHandle /> */}
    </div>
  );
}

export default App;

````

## 组件状态管理
### 类组件中状态管理

创建函数组件 只用来展示内容
````JavaScript
export default function StateMgt() {
  return (
    <div>
      <Clock change={date => console.log(date.toLocaleTimeString())} />
      <ClockFunc />
    </div>
  );
}
````
创建Clock组件用来管理状态
````javaScript 
class Clock extends React.Component {  constructor(props) {    
    super(props);    // 使用state属性维护状态，在构造函数中初始化状态    
    this.state = { date: new Date() };  }  
    componentDidMount() {    // 组件挂载时启动定时器每秒更新状态    
        this.timerID = setInterval(() => {      // 使用setState方法更新状态      
        this.setState({        
            date: new Date()      
            });    
    }, 1000);  
    }  
    componentWillUnmount() {    // 组件卸载时停止定时器
        clearInterval(this.timerID);  
    }  
    render() {    
        return <div>{this.state.date.toLocaleTimeString()}</div>;  
    }
}
````
> 拓展: setState特性的讨论


### 函数组件中的状态管理

````javaScript
import React, { Component, useState, useEffect } from "react";

// 函数组件状态管理：useState, useEffect
// hooks 只能在16.8.x以后使用
function ClockFunc() {
  // 创建状态, useState返回状态和修改状态的函数所组成的数组
  const [date, setDate] = useState(new Date());

  // 定时器是副作用，需要用到useEffect
  useEffect(() => {
    const timerId = setInterval(() => {
      // 通过setState更新状态
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []); // 参数2指的是依赖状态，本例中没有依赖而且仅执行一次，放一个空数组

  return <div>{date.toLocaleTimeString()}</div>;
}
````

## 事件处理

React中使用onXX写法来监听事件
范例: 用户输入事件
````javaScript
// 用户事件处理
import React, { Component } from "react";

export default class EventHandle extends Component {
  

  constructor(props) {
    super(props)

    this.state = {
        name: ""
      };

    //   this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  handleChange1(){
      this.setState({
          name:e.target.value
      })
  }

  render() {
    return (
      <div>
      {/* 使用箭头函数，不需要指定回调函数this，且便于传递参数 */}
        <input
          type="text"
          value={this.state.name}
          onChange={e=>this.handleChange1(e)}
        />
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
         {/* 直接指定回调函数，需要指定其this指向，或者将回调设置为箭头函数属性 */}
        <p>{this.state.name}</p>
      </div>
    );
  }
}
````
## 组件通信

Props属性传递可用于父组件组件相互通信

````JavaScript
//index.js
ReactDOM.render(<App title="lijinhai" />, document.getElementById("root"));
//App.js
<h1>{props.title}</h1>
````
如果父组件传递时函数,则可以把子组件信息传递给父组件,称为状态的提升


## context

跨层级组件间通信

## redux

类似vuex 

组件生命周期
