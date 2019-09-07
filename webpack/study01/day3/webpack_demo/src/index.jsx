import { domainToASCII } from "url";

// import { add } from "./counter";

// document.write(add(1, 2));
// import React, { Component } from "react";
// import ReactDom from "react-dom";

// //把公共库抽离出去，形成一个单一模块，因为业务代码要经常变动，公共库不会！

// class App extends Component {
//   render() {
//     return <div>hello world</div>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("app"));

// btn.onclick = function() {
//   import(/* webpackPrefetch: true */ "LoginModal");
// };
//当用户点击的时候才动态加载这个loginmodal模块，那么会不会这个模块开始的时候是没有内容的呢？

//当前网络清闲的时候，自己加载

//webpack推荐的代码方式就是异步的，这里面的异步是指动态加载，合理的使用模块组件

// prefetch 会在父 chunk 加载结束后开始加载。
