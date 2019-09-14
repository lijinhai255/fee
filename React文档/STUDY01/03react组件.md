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
        <Button type="primary">Button</Button>
        </div>    
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
````javaScript
import React from 'react';
import { Form, Icon, Input, Button } from "antd";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // validateFields哪来的？
    // 全局校验怎么实现的
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    //  getFieldDecorator哪来的?
    // 做什么的？ 装饰器工厂，字段装饰器能够生成一个装饰器
    // 设置字段名称、校验规则、增强input使他可以校验
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
// 经过包装以后，我们表单拥有了额外能力：全局校验、输入控件包装器
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;

````

### 表单组件的设计思路

* 表单组件要求实现**数据收集，校验，提交**等特性，可通过高阶组件拓展
* 高阶组件给表单传递一个input组件**包装函数**接管输入事件并统一管理表单数据
* 高阶组件给表单组件传递一个**校验函数**使其具备数据校验功能

### 表单组件实现
* 表单基本结构
````javaScript
import React,{ Component} from 'react';
import { Input,Button} from "antd";
export default class KFormTest extends Component {
  render (){
    return (
      <div>
        <Input type="text">
        <Input type="password">
        <Button>登陆</Button>
      </div>
    )
  }
}
````
> 2 创建高阶组件
````javaScript
// 创建高阶组件
function kFormCreate(Comp) {
  return class extends Component {
    // 全局校验
    validateFields = cb => {
    };

    // 单项校验
    validateField = field => {
      // 校验规则
    };
    // 变更处理
    handleChange = e => {
    };
    render() {
      return (
        <Comp
          {...this.props}
          getFieldDec={this.getFieldDec}
          validateFields={this.validateFields}
        />
      );
    }
  };
}
````

> KFormTest 组件 
````javaScript
class KFormTest extends Component {
  onLogin = () => {
    // 校验
    this.props.validateFields((isValid, data) => {
      if (isValid) {
        console.log("登录！！！！");
      } else {
        alert("校验失败");
      }
    });
  };

  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {/* 接收两个参数返回一个装饰器 */}
        {getFieldDec("username", {
          rules: [{ required: true, message: "请输入用户名" }]
        })(<Input type="text" />)}

        {getFieldDec("password", {
          rules: [{ required: true, message: "请输入密码" }]
        })(<Input type="password" />)}
        <Button onClick={this.onLogin}>登录</Button>
      </div>
    );
  }
}

export default KFormTest;
````
> getFieldDec装饰器工厂函数 

````javaScript
import React, { Component } from "react";
import { Input, Button } from "antd";

// 创建高阶组件
function kFormCreate(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.options = {}; //表单配置项
      this.state = {
        //   usernameMessage: 'lalalala'
      }; // 表单值
    }

    // 全局校验
    validateFields = cb => {
      //   console.log(this.state);
      const rets = Object.keys(this.options).map(field => {
        return this.validateField(field);
      });
      const ret = rets.every(v => v);
      // 将校验结果传出去，并传递数据
      cb(ret, this.state);
    };

    // 单项校验
    validateField = field => {
      // 校验规则
      const { rules } = this.options[field];
      // 校验: ret如果是false校验失败
      const ret = !rules.some(rule => {
        if (rule.required) {
          // 获取校验项的值
          if (!this.state[field]) {
            // 必填项失败
            // 设置错误信息
            this.setState({
              [field + "Message"]: rule.message
            });
            return true;
          }
        }

        return false;
      });

      // 若校验成功,清理错误信息
      if (ret) {
        this.setState({
          [field + "Message"]: ""
        });
      }

      return ret;
    };

    // 变更处理
    handleChange = e => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value
        },
        () => {
          this.c(name);
        }
      );
    };

    getFieldDec = (field, option) => {
      this.options[field] = option;

      // 返回一个装饰器(高阶组件)
      return InputComp => {
        return (
          <div>
            {React.cloneElement(InputComp, {
              name: field, // 控件name
              value: this.state[field] || "",
              onChange: this.handleChange // 输入值变化监听回调
            })}
            {/* 校验错误信息 */}
            {this.state[field + "Message"] && (
              <p style={{ color: "red" }}>{this.state[field + "Message"]}</p>
            )}
          </div>
        );
      };
    };

    render() {
      return (
        <Comp
          {...this.props}
          getFieldDec={this.getFieldDec}
          cs={this.cs}
        />
      );
    }
  };
}

@kFormCreate
class KFormTest extends Component {
  onLogin = () => {
    // 校验
    this.props.cs((isValid, data) => {
      if (isValid) {
        console.log("登录！！！！");
      } else {
        alert("校验失败");
      }
    });
  };

  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {/* 接收两个参数返回一个装饰器 */}
        {getFieldDec("username", {
          rules: [{ required: true, message: "请输入用户名" }]
        })(<Input type="text" />)}

        {getFieldDec("password", {
          rules: [{ required: true, message: "请输入密码" }]
        })(<Input type="password" />)}
        <Button onClick={this.onLogin}>登录</Button>
      </div>
    );
  }
}

export default KFormTest;

````
## 弹窗类组件设计与实现

### 方案1：Portal
````javaScript
import React, { Component } from "react";
import {
  createPortal,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer
} from "react-dom";
export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }

  render() {
    // 将createPortal参数1声明的jsx挂载到node上
    return createPortal(<div>{this.props.children}</div>, this.node);
  }

  // 清理div
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
}
````

### 方案2：unstable_renderSubtreeIntoContainer
````javascript
export class Dialog2 extends React.Component {
  // render一个null，目的什么内容都不渲染
  render() {
    return null;
  }

  componentDidMount() {
    // 首次挂载时候创建宿主div
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);

    this.createPortal(this.props);
  }

  componentDidUpdate() {
    this.createPortal(this.props);
  }

  componentWillUnmount() {
    // 清理节点
    unmountComponentAtNode(this.node);
    //   清理宿主div
    window.document.body.removeChild(this.node);
  }

  createPortal(props) {
    unstable_renderSubtreeIntoContainer(
      this, //当前组件
      <div className="dialog">{props.children}</div>, // 塞进传送门的JSX
      this.node // 传送门另一端的DOM node
    );
  }
}
````
## 树形组件设计与实现
###  设计思路
 ***react中实现递归组件更加纯粹，就是组件递归渲染即可。***
````javaScript
import React, { Component } from "react";

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  //   判断是否有子元素
  get isFolder() {
    return this.props.model.children && this.props.model.children.length;
  }
  //   切换打开状态
  toggle = () => {
    if (this.isFolder) {
      this.setState({
        open: !this.state.open
      });
    }
  };
  render() {
    return (
      <ul>
        <li>
          {/* 内容显示 */}
          <div onClick={this.toggle}>
            {/* 标题 */}
            {this.props.model.title}
            {/* 有可能显示＋-号 */}
            {this.isFolder ? <span>{this.state.open ? "-" : "+"}</span> : null}
          </div>
          {/* 可能存在子树 */}
          {this.isFolder ? (
            <div style={{ display: this.state.open ? "block" : "none" }}>
              {this.props.model.children.map(model => (
                <TreeNode model={model} key={model.title} />
              ))}
            </div>
          ) : null}
        </li>
      </ul>
    );
  }
}

export default class Tree extends Component {
  treeData = {
    title: "Web全栈架构师",
    children: [
      {
        title: "Java架构师"
      },
      {
        title: "JS高级",
        children: [
          {
            title: "ES6"
          },
          {
            title: "动效"
          }
        ]
      },
      {
        title: "Web全栈",
        children: [
          {
            title: "Vue训练营",
            expand: true,
            children: [
              {
                title: "组件化"
              },
              {
                title: "源码"
              },
              {
                title: "docker部署"
              }
            ]
          },
          {
            title: "React",
            children: [
              {
                title: "JSX"
              },
              {
                title: "虚拟DOM"
              }
            ]
          },
          {
            title: "Node"
          }
        ]
      }
    ]
  };
  render() {
    return (
      <div>
        <TreeNode model={this.treeData} />
      </div>
    );
  }
}

````
## 代码优化 
> PureComponent 
> shouldComponentUpdate
>  React.memo() React v16.6之后的版本 使用React.memo来完美的实现函数组件也有的 PureComponent的功能
> immutable.js
````javaScript
import React, { Component, PureComponent } from "react";

// 容器组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          { body: "react is very good", author: "facebook" },
          { body: "vue is very good", author: "youyuxi" }
        ]
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} {...c} />
        ))}
      </div>
    );
  }
}
// class Comment extends PureComponent {
//     // 参数是将要变更属性
// //   shouldComponentUpdate({ data: { body, author } }) {
// //     if (body === this.props.data.body && author === this.props.data.author) {
// //       return false; // 不渲染
// //     }

// //     return true;
// //   }
//   render() {
//     console.log("lala");

//     return (
//       <div>
//         <p>{this.props.body}</p>
//         <p> --- {this.props.author}</p>
//       </div>
//     );
//   }
// }
const Comment = React.memo(function({ body, author }) {
    console.log("render");
  
    return (
      <div>
        <p>{body}</p>
        <p> --- {author}</p>
      </div>
    );
  });
````