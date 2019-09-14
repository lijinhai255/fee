# React全家桶

## 目标

* 掌握redux

* 掌握redux中间件

* 实现redux react-redux及其中间件原理

* 掌握react-router

* 掌握react-router的原理


[redux](https://redux.js.org/)

[react-redux](https://github.com/reduxjs/react-redux)

[react-router](https://reacttraining.com/react-router/web/guides/quick-start)

## 安装redux
```
npm install redux --save
```

## redux上手

* 需要一个store来存储数据
* store里的reducer初始化state并定义state
* 通过dispatch一个action来提交对数据的修改
* action提交到reducer函数里，根据出入的action的type，返回新的state

> 创建store ./src/store.js

````JavaScript
import { createStore} from "redux"
 const counterReducer = function(state = 0, action) {
    const num = action.payload || 1;
    switch (action.type) {
      case "add":
        return state + num;
      case "minus":
        return state - num;
      default:
        return state;
    }
  };
const store = createStore(counterReducer)
export default store   
````
> 创建ReduxText.js

````JavaScript
import React,{ Component} from "react"
import store from "./store"
export default calss ReduxText extends Component {
  // componentDidMount() {
  //     // 订阅状态变更
  //     store.subscribe(() => {
  //         this.forceUpdate();
  //     })
  // }
    render(){
        return (
            <div>
                <p>{store.getState()}</p>
                <div>
                    <button onClick={()=>store.dispatch({type:add})}>+</button>
                    <button onClick={()=>store.dispatch({type:minus})}>-</button>
                </div>
            </div>
        )
    }
}

````

> 订阅状态变更 

````JavaScript 
import store form "./store"
const render =()=>{
    ReactDom.render(
        <App/>,
        document.getElementById("root")
    )
}
render()
store.subscribe(render)
````
## 检查点

* createStore 创建store
* reducer初始化 修改状态函数
* getState 获取状态值
* dispatch 提交更新
* subscribe 变更订阅



## react-redux

将redux整合到react中,需要react-redux的支持

````JavaScript
npm install react-redux --save
````
提供两个API
* Provider为后代组件提供store
* connect为组件提供数据和变更的方法 

> 提供全局store, index.js

````JavaScript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './store';
import {Provider} from 'react-redux'
// console.log(jsx);
ReactDOM.render(<Provider store={store}><App title="li5" /></Provider>, document.getElementById("root"));
````

> 在项目中获取状态数据 ReduxText.js

````JavaScript
import { connect} from "react-redux"
// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch => {return {add:()=>dispatch({type:'add'})}}
// connect两个任务：
// 1.自动渲染
// 2.映射到组件属性
@connect(
    state=>({num:state}),//映射
    {
        add:()=>({type:"add"}),
        minus:()=>({type:"minus"})
    }
)
class ReduxTest extends Component {
  // componentDidMount() {
  //     // 订阅状态变更
  //     store.subscribe(() => {
  //         this.forceUpdate();
  //     })
  // }
  render() {
    return (
      <div>
        {/* {store.getState()} */}
        {this.props.num}
        <div>
          <button onClick={() => this.props.add(2)}>+</button>
          <button onClick={this.props.minus}>-</button>
        </div>
      </div>
    );
  }
}
export default ReduxTest;
````

## 异步操作

>  react默认支持同步,实现异步任务血药中间间的支持
````JavaScript
npm install redux-thunk redux-loagger --save
````

> 应用中间件
// store.js
````JavaScript
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { counterReducer } from "./counter";

const store = createStore(
    combineReducers({counter: counterReducer}), 
    applyMiddleware(logger, thunk)
);

export default store;
````

> 使用异步操作时的变化 ReduxTest.js

````JavaScript
// import store from "../store";
import { connect } from "react-redux";
@connect(  state => ({ num: state }),// 状态映射  
{    add: () => ({ type: "add" }), // action creator 
   minus: () => ({ type: "minus" }) // action creator 
    })
class ReduxTest extends Component {  
    render() {    
        return (      
            <div>        
                <p>{this.props.num}</p>        
                <div>         
                    <button onClick={this.props.minus}>-
                    </button>        
                </div>      
            </div>    
        );  
    }
}
export default ReduxTest;

````
## 代码优化
> 抽离reducer和action 创建./store/counter.js

````JavaScript
export const add = num => ({ type: "add", payload: num }); // action creator
export const minus = () => ({ type: "minus" }); // action creator

// 异步的返回的是函数
export const asyncAdd = (dispatch, getState) => dispatch => {
  // 异步调用在这里
  setTimeout(() => {
    dispatch({ type: "add" });
  }, 1000);
};


export const counterReducer = function(state = 0, action) {
    const num = action.payload || 1;
    switch (action.type) {
      case "add":
        return state + num;
      case "minus":
        return state - num;
      default:
        return state;
    }
  };
````
> 移动action 并重名为index.js
````JavaScript
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { counterReducer } from "./counter";

const store = createStore(
    combineReducers({counter: counterReducer}), 
    applyMiddleware(logger, thunk)
);

export default store;
````
## 使用Redux 基本架构
> 1 ./store/counter
````javaScript
export const add = num => ({ type: "add", payload: num }); // action creator
export const minus = () => ({ type: "minus" }); // action creator

// 异步的返回的是函数
export const asyncAdd = (dispatch, getState) => dispatch => {
  // 异步调用在这里
  setTimeout(() => {
    dispatch({ type: "add" });
  }, 1000);
};
export const counterReducer = function(state = 0, action) {
    const num = action.payload || 1;
    switch (action.type) {
      case "add":
        return state + num;
      case "minus":
        return state - num;
      default:
        return state;
    }
  };
````
> 2ReduxText.js
````JavaScript
import React, { Component } from "react";
// import store from '../store';
import { connect } from "react-redux";
import { add, minus, asyncAdd } from "../store/counter";

// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch => {return {add:()=>dispatch({type:'add'})}}
// connect两个任务：
// 1.自动渲染
// 2.映射到组件属性
@connect(
  state => ({ num: state.counter }),
  {
    // 理解为vuex中的action
    add,
    minus,
    asyncAdd
  }
)
class ReduxTest extends Component {
  // componentDidMount() {
  //     // 订阅状态变更
  //     store.subscribe(() => {
  //         this.forceUpdate();
  //     })
  // }
  render() {
    return (
      <div>
        {/* {store.getState()} */}
        {this.props.num}
        <div>
          <button onClick={() => this.props.add(2)}>+</button>
          <button onClick={this.props.minus}>-</button>
          <button onClick={this.props.asyncAdd}>+</button>
        </div>
      </div>
    );
  }
}
export default ReduxTest;
````
> 3 store/index.js

````JavaScript
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { counterReducer } from "./counter";
const store = createStore(
    combineReducers({counter: counterReducer}), 
    applyMiddleware(logger, thunk)
);
export default store;
````
> 引出store
````javaScript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './store';
import {Provider} from 'react-redux'
// console.log(jsx);

ReactDOM.render(<Provider store={store}><App title="李金海真不错" /></Provider>, document.getElementById("root"));

````

## redux核心原理
#### 核心功能实现
* 存储state
* 获取状态getState
* 更新状态dispatch
* 变更订阅subscribe
### Redux的核心功能实现 ./MyReduxText
````javaScript
export function createStore(reducer, enhancer) {
  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  function getState() {
    return currentState;
  }
  // 更新状态
  function dispatch(action) {
    // 修改
    currentState = reducer(currentState, action);
    // 变更通知
    currentListeners.forEach(v => v());
    return action;
  }
  function subscribe(cb) {
    currentListeners.push(cb);
  }

  // 初始化状态
  dispatch({ type: "@IMOOC/KKB-REDUX" });

  return {
    getState,
    dispatch,
    subscribe
  };
}
````
> 使用MyRedux
````javaScript
import React, { Component } from "react";
import { createStore } from "../store/kredux";

const store = createStore(counterReducer);

export default class MyReduxTest extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    return (
      <div>
        {store.getState()}
        <button onClick={() => store.dispatch({ type: "add" })}>+</button>
      </div>
    );
  }
}
````
### 中间件实现
````javaScript
export function createStore(reducer, enhancer) {
  // 如果存在enhancer
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  function getState() {
    return currentState;
  }
  // 更新状态
  function dispatch(action) {
    // 修改
    currentState = reducer(currentState, action);
    // 变更通知
    currentListeners.forEach(v => v());
    return action;
  }
  function subscribe(cb) {
    currentListeners.push(cb);
  }

  // 初始化状态
  dispatch({ type: "@IMOOC/KKB-REDUX" });

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 完成之前createStore工作
    const store = createStore(...args);
    // 原先dispatch
    let dispatch = store.dispatch;
    // 传递给中间件函数的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    // 将来中间件函数签名如下： funtion ({}) {}
    //[fn1(dispatch),fn2(dispatch)] => fn(diaptch)
    const chain = middlewares.map(mw => mw(midApi));
    // 强化dispatch,让他可以按顺序执行中间件函数
    dispatch = compose(...chain)(store.dispatch);
    // 返回全新store，仅更新强化过的dispatch函数
    return {
      ...store,
      dispatch
    };
  };
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 聚合函数数组为一个函数 [fn1,fn2] => fn2(fn1())
  return funcs.reduce((left, right) => (...args) => right(left(...args)));
}
````
> logger thunk 中间件的实现原理
````javaScript
import React, { Component } from "react";
import { createStore, applyMiddleware } from "../store/kredux";

const counterReducer = function(state = 0, action) {
  const num = action.payload || 1;
  switch (action.type) {
    case "add":
      return state + num;
    case "minus":
      return state - num;
    default:
      return state;
  }
};

// 自定义中间件
function logger() {
  // 返回真正中间件任务执行函数
  return dispatch => action => {
    // 执行中间件任务
    console.log(action.type + "执行了！！！");

    // 执行下一个中间件
    return dispatch(action);
  };
}
// thunk实现
const thunk = ({getState}) => dispatch => action => {
    // thunk逻辑：处理函数action
	if (typeof action == 'function') {
		return action(dispatch, getState)
    }
    // 不是函数直接跳过
	return dispatch(action)
}

const store = createStore(counterReducer, applyMiddleware(logger, thunk));

export default class MyReduxTest extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    return (
      <div>
        {store.getState()}
        <button onClick={() => store.dispatch({ type: "add" })}>+</button>
        <button onClick={() => store.dispatch(function(){
            setTimeout(() => {
                store.dispatch({ type: "add" })
            }, 1000);
        })}>+</button>
      </div>
    );
  }
}

````
## redux-thunk原理
````javaScript
// thunk实现
const thunk = ({getState}) => dispatch => action => {
    // thunk逻辑：处理函数action
	if (typeof action == 'function') {
		return action(dispatch, getState)
    }
    // 不是函数直接跳过
	return dispatch(action)
}
````
## react-redux原理
核心任务
* 实现一个高阶函数工厂connect，可以传入状态映射规则函数和派发器映射规则函数映射需要的属性，可以处理变更检测和刷新任务
* 实现一个Provider组件可以传递store
````javaScript
import React from 'react'
import PropTypes from 'prop-types' 
import {bindActionCreators} from './kkb-redux'
export const connect = (mapStateToProps = state=>state, mapDispatchToProps = {}) => 
(WrapComponent)=>{ 
  return class ConnectComponent extends React.Component{ 
    static contextTypes = { store: PropTypes.object }
    constructor(props, context){ 
      super(props, context) 
      this.state = { props:{} } 
      }
      componentDidMount(){ 
        const {store} = this.context 
        store.subscribe(()=>this.update()) 
        this.update() 
        }
        update(){ 
          const {store} = this.context 
          const stateProps = mapStateToProps(store.getState()) 
          const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch) 
          this.setState(
            { 
              props:{ 
                ...this.state.props,
                 ...stateProps, 
                 ...dispatchProps } }) }
                 render(){ 
                   return 
                   <WrapComponent {...this.state.props}>
                   </WrapComponent> } 
                   } 
             }
export class Provider extends React.Component{ 
  static childContextTypes = { store: PropTypes.object }getChildContext() { 
    return { store: this.store } 
    }
    constructor(props, context) { 
      super(props, context) 
      this.store = props.store }
      render() { 
        return this.props.children
      }
}             
````
## 实现bindActionCreators
````javaScript

````

