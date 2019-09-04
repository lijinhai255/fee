# React组件化

[Context参考](https://zh-hans.reactjs.org/docs/context.html)
[HOC参考](https://zh-hans.reactjs.org/docs/higher-order-components.html#use-hocs-for-crossing-cutting-concerns)
[hook](https://zh-hans.reactjs.org/docs/hooks-intro.html#___gatsby)

## 组件跨层级通信 - Context

> 模拟Redux 存放全局状态, 在组件间共享

````JavaScript
import React from "react";

// 1.创建上下文
const Context = React.createContext();
// 2.获取Provider和Consumer
const Provider = Context.Provider;
const Consumer = Context.Consumer;
//child显示计数器 并能修改它,多个child之间需要共享数据
function Child(props){
    return <div onClick={() => props.add()}>{props.counter}</div>;
}
//定义Context组件 传递事件和属性
export default class ContextTest extends React.Component {
  state = {
    counter: 0
  };

  add = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        <Consumer>{value => <Child {...value} />}</Consumer>
      </Provider>
    );
  }
}
````

## 高阶组件 
> 范例: 展示组件添加获取数据能力
````JavaScript
import React from "react";

// Lesson保证功能单一，它不关心数据来源，只负责显示
function Lesson(props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  );
}

// 模拟数据
const lessons = [
  { stage: "React", title: "核心API" },
  { stage: "React", title: "组件化1" },
  { stage: "React", title: "组件化2" }
];

// 定义高阶组件withContent
// 包装后的组件传入参数，根据改参数获取显示数据
// function withContent(Comp) {
//     return function(props) {
//         const content = lessons[props.idx];
//         return <Comp {...content} />;
//       };
// }
// 高阶组件withContext负责 包裹传入组件Comp
// 包装后组件 能够根据传入索引获取课程数 
const withContent = Comp => props => {
  const content = lessons[props.idx];
  return <Comp {...content} />;
};
// 包装LessonwithContent是包装后的组件
const LessonWithContent = withLog(withContent(Lesson));
export default function HocTest() {
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
         <LessonWithContent key={idx} idx={idx} />
      ))}
    </div>
  );
}
````

> 范例: 使用高阶组件修改Context

````JavaScript
// withConsumer高阶组件，它根据配置返回一个高阶组件
function withConsumer(Consumer) {
  return Comp => props => {
    return <Consumer>{value => <Comp {...value} />}</Consumer>;
  };
}
// 经过withConsumer(Consumer)返回的高阶组件包装，Child获得了上下文中的值
const Child = withConsumer(Consumer)(function(props) {
  return <div onClick={() => props.add()}>{props.counter}</div>;
});
export default class ContextTest extends React.Component {
  state = {
    counter: 0
  };

  add = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        <Child />
        <Child />
        <Child />
      </Provider>
    );
  }
}
````

### 链式调用
````JavaScript
//高阶组件 withLog 负责包装传入钻剑Comp
//包装后组件在挂在是可以输出日志
// withLog高阶组件，能够在组件挂载时输出日志
const withLog = Comp => {
  return class extends React.Component {
    componentDidMount() {
      console.log('didMount', this.props);
    }

    render() {
      return <Comp {...this.props}></Comp>
    }
  }
}
// 包装
const LessonWithContent = withLog(withContent(Lesson));
````

### 装饰器写法
````JavaScript
@withLog
@withContent
class Lesson2 extends React.Component {
  render() {
    return (
      <div>
        {this.props.stage} - {this.props.title}
      </div>
    );
  }
}
export default function HocTest() {
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
        // <LessonWithContent key={idx} idx={idx} />
        <Lesson2 key={idx} idx={idx} />
      ))}
    </div>
  );
}
````
## 组件复合 - Composition
> 自定义组件的外观和行为

````JavaScript
import React from "react";// Dialog定义组件外观和行为
function Dialog(props) {  
    return <div style={{ border: "1px solid blue" }}>{props.children}</div>;
    }
export default function Composition() {
     return (    
        <div>      
        {/* 传入显示内容 */}      
        <Dialog>       
        <h1>组件复合</h1>        
        <p>复合组件给与你足够的敏捷去定义自定义组件的外观和行为</p>     
        </Dialog>    
        </div>  
           );
}
````

> 传递对象  key表示具名插槽
````JavaScript
import Ract from "react"
//获取相应的部分内容展示在指定的位置
function Dialog(props) {  
    return (    
        <div style={{ border: "1px solid blue" }}>      
        {props.children.default}      
        <div>{props.children.footer}</div>    
        </div>  
    );
}
export default function Composition() {  
    return (    
        <div>      
        {/* 传入显示内容 */}     
         <Dialog>        
         {{          
             default: (          
                   <>              
                   <h1>组件复合</h1>              
                   <p>复合组件给与你足够的敏捷去定义自定义组件的外观和行为</p>            
                   </>          
                   ),          
            footer: <button onClick={() => alert("react确实好")}>确定</button>        
            }}      
            </Dialog>    
            </div>  
    );
}
````

> 如果传入一个函数 可以实现作用域插槽

````JavaScript
// Dialog定义组件外观和行为
function Dialog(props) {
  // 这里props.children代表了标签内部内容
  //   children是什么？合法js表达式
  //   console.log(props.children);
  // 备选消息
  const messages = {
    foo: { title: "foo", content: "foo~" },
    bar: { title: "bar", content: "bar~" }
  };
  // 执行函数获得要显示的内容
  const { def, footer } = props.children(messages[props.msg]);

  return (
    <div style={{ border: "1px solid blue" }}>
      {def}
      <div>{footer}</div>
    </div>
  );
}
export default function Composition() {
  return (
    <div>
      <Dialog msg="foo">
        {({ title, content }) => ({
          def: (
            <>
              <h1>{title}</h1>
              <p>{content}</p>
            </>
          ),
          footer: <button onClick={() => alert("react真好")}>确定</button>
        })}
      </Dialog>
    </div>
  );
}

````

> 如果props.children 是JSX 此时它是不能修改的

````JavaScript
function RadioGroup(props) {
    return (
        <div>
            {React.Children.map(props.children, radio => {
                // 要修改虚拟dom 只能克隆它
                // 参数1是克隆对象
                // 参数2是设置的属性
                return React.cloneElement(radio, {name: props.name})
            })}
        </div>
    )
}
function Radio({children, ...abc}) {
    return (
        <label>
            <input type="radio" {...abc}/>
            {children}
        </label>
    )    
}
export default function Composition() {
  return (
    <div>
      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="ng">angular</Radio>
      </RadioGroup>

      {/* <div>
          <input type="radio" name="mvvm"/>vue
          <input type="radio" name="mvvm"/>react
          <input type="radio" name="mvvm"/>angular
      </div> */}
    </div>
  );
}
````

## Hooks

````JavaScript
npm i react react-dom -S
````

### 状态钩子 State Hook

* 初始化Hook

````JavaScript
import React, { useState, useEffect, useReducer, useContext } from "react";
export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState("");
  //   const [fruits, setFruits] = useState([]);
  return (
      {/* 提供上下文的值 */}
      <div>
        <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
        {/* 列表 */}
      </div>
  );
}
```` 

* 声明多个状态
````JavaScript
import React, { useState, useEffect, useReducer, useContext } from "react";
// 仅展示水果列表
export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruits, setFruits] = useState(["香蕉", "西瓜"]);
  //   const [fruits, setFruits] = useState([]);
  return (
    {/* 提供上下文的值 */ }
    <div>
      <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
      {/* 列表 */ }
      <FruitList fruits={fruits} onSetFruit={setFruit} />
    </div >
  );
}
````

* 用户处理

````JavaScript
// 声明输入组件
function FruitAdd(props) {
  // 使用useContext获取上下文
  const { dispatch } = useContext(Context);

  // 输入内容状态及设置内容状态的方法
  const [pname, setPname] = useState("");
  // 键盘事件处理
  const onAddFruit = e => {
    if (e.key === "Enter") {
      //   props.onAddFruit(pname);
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  );
}


export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruits, setFruits] = useState(["香蕉", "西瓜"]);
  //   const [fruits, setFruits] = useState([]);
  return (
    {/* 提供上下文的值 */ }
    <div>
      <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
      {/* 列表 */ }
      <FruitList fruits={fruits} onSetFruit={setFruit} />
      <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} />
    </div >
  )
}
````

## 副作用钩子 Effect Hook
useEffect给函数组件增加了执行副作用操作的能力。
副作用（Side Effect）是指一个 function 做了和本身运算返回值无关的事，比如：修改了全局变量、修改了传入的参数、甚至是 console.log()，所以 ajax 操作，修改 dom 都是算作副作用

* 异步数据获取 

````JavaScript
import React, { useState, useEffect, useReducer, useContext } from "react";
  // 异步获取水果列表
  useEffect(() => {
    console.log("useEffect");
    setTimeout(() => {
      dispatch({ type: "init", payload: ["香蕉", "西瓜"] });
      //   setFruits(["香蕉", "西瓜"]);
    }, 1000);
  }, []); // 依赖为空表示只执行一次
````
* 清除工作：有一些副作用是需要清除的，清除工作非常重要的，可以防止引起内存泄露
````JavaScript
 // 异步获取水果列表
  useEffect(() => {
    console.log("useEffect");
    setTimeout(() => {
      dispatch({ type: "init", payload: ["香蕉", "西瓜"] });
      //   setFruits(["香蕉", "西瓜"]);
    }, 1000);
  }, []); // 依赖为空表示只执行一次

  useEffect(() => {
    document.title = fruit;

    // ajax
  }, [fruit]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("msg");
    }, 1000);
    //防止内存泄漏
 return function() {
      clearInterval(timer);
    };    
````

### useReducer
useReducer是useState的可选项，常用于组件有复杂状态逻辑时，类似于redux中reducer概念。
````JavaScript
import React, { useState, useEffect, useReducer, useContext } from "react";

// 仅展示水果列表
function FruitList({ fruits, onSetFruit }) {
  return (
    <ul>
      {fruits.map(f => (
        <li key={f} onClick={() => onSetFruit(f)}>
          {f}
        </li>
      ))}
    </ul>
  );
}
// 声明输入组件
function FruitAdd(props) {
  // 使用useContext获取上下文
  const { dispatch } = useContext(Context);

  // 输入内容状态及设置内容状态的方法
  const [pname, setPname] = useState("");
  // 键盘事件处理
  const onAddFruit = e => {
    if (e.key === "Enter") {
      //   props.onAddFruit(pname);
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  );
}

// 添加fruit状态维护fruitReducer
// 理解为vuex里面mutations
function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}

// 创建上下文
const Context = React.createContext();

export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState("");
  //   const [fruits, setFruits] = useState([]);

  // 参数1是reducer
  // 参数2是初始值
  const [fruits, dispatch] = useReducer(fruitReducer, []);

  // 异步获取水果列表
  useEffect(() => {
    console.log("useEffect");
    setTimeout(() => {
      dispatch({ type: "init", payload: ["香蕉", "西瓜"] });
      //   setFruits(["香蕉", "西瓜"]);
    }, 1000);
  }, []); // 依赖为空表示只执行一次

  useEffect(() => {
    document.title = fruit;

    // ajax
  }, [fruit]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("msg");
    }, 1000);

    return function() {
      clearInterval(timer);
    };
  }, []);

  return (
    <Context.Provider value={{ fruits, dispatch }}>
      {/* 提供上下文的值 */}
      <div>
        <FruitAdd />
        <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
        {/* 列表 */}
        <FruitList fruits={fruits} onSetFruit={setFruit} />
      </div>
    </Context.Provider>
  );
}

````
