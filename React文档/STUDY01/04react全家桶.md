# React全家桶

[redux](https://redux.js.org/)

[react-redux](https://github.com/reduxjs/react-redux)

[react-router](https://reacttraining.com/react-router/web/guides/quick-start)

## 安装redux
```
npm install redux --save
```

## redux上手

> 创建store ./src/store.js

````JavaScript
import { createStore} from "redux"
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
const store = createStore(counterReducer)
export default store   
````
> 创建ReduxText.js

````JavaScript
import React,{ Component} from "react"
import store from "./store"
export default calss ReduxText extends Component {
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


## react-redux

将redux整合到react中,需要react-redux的支持

````JavaScript
npm install react-redux --save
````

> 提供全局store, index.js

````JavaScript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './store';
import {Provider} from 'react-redux'
// console.log(jsx);
ReactDOM.render(<Provider store={store}><App title="lijinhai255" /></Provider>, document.getElementById("root"));
````

> 在项目中获取状态数据 ReduxText.js

````JavaScript
import { connect} from "react-redux"
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
> ReduxText.js
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
> 模块化
> store/index.js

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

