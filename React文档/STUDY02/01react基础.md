# 初始react

````javaScript
<script type="text/babel">
    class HelloWorld extends React.Component {
	    render() {
		    return (
			    <div>
                    hello world react
			    </div>
		    );
	    }
    }

	ReactDOM.render(
		<HelloWorld/>,
		document.getElementById('example')
	);
</script>
````

> ### React生态 awesome-react

**react脚手架=>数据管理=>各类UI组件库=>企业级解决方法**

> ### 开发规范
> #### standard.js
````javaScript
1 npm install standard --save-dev
2 npm install snazzy --save-dev
3 配置package.json 添加lint的 npm script "scripts
 {"lint":"standard --verbose|snazzy"}
 4 使用编辑器插件，实时检查代码规范
 5 git pre-commit钩子,在每次commit之前检查代码规范
````
> bem css 规范
````css
.person{}
.person_hand{}//元素
.person_female{}//状态
.person--female_hand{}
.person_hand--left{}
````
````javaScript
import React from "react"

import logo from "./logo.svg"

import "./App.css"

export default function App(){
    return (
        <div className="App">
            <header className="App_header">
                <img src={logo} className="App_logo" alt="logo" />
                <p className="App_header_content">
                </p>
            </header>
             <a
               className="App_link App_link--active"
            > Learn React</a>
        </div>
    )
}
````

# React 基础

> ## JSX语法
> ### ES6语法组件
````javaScript

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// import App from './demo2'

var list = <div>list</div>
class List extends Component{
  render () {
    return (
      <div>
        list {this.props.name}
      </div>
    )
  }

  componentDidMount () {
    console.log('list mount')
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('list update')
  }

  componentWillUnmount () {
    console.log('list update')
  }

}

class App extends Component {
  render () {
    return (
      <div>
        <List />
        <List/>
        {list}
        {list}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
````
> ### 函数式组件
````javaScript
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// import App from './demo2'
class App extends Component{
  render () {
    return (
      <div>
        app
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
````
> ## 虚拟DOM
> ### jsx语法使用
````javaScript
import React,{Component} from 'react'

class List extends Component{
  render () {
    const data = ['a','b','c','d']
    const nodes = [<div>a</div>,<div>b</div>]
    const a = 'a'
    const obj = {a:1,b:2}

    const showTitle = false
    return (
      <div>
        {data.map((item,index) => {
          if(index%2!==1){
            return null
          }

          return (
            <p>{item}</p>
          )
        })}

        {showTitle && <h3>title</h3>}
        {showTitle ? <h3>title</h3> : <p>no title</p>}
      </div>
    )
  }
}
export default List
````
> ### 原理 
````

````

> ## Tree-Diff 算法

> ### 标签发生变化
````javaScript
readerA:<div/>
renderB:<span/>
[removeNode<div/>],[insertNode<span/>]
````
> ### 组件发生变化

````javaScript
readerA:<Header/>
renderB:<Content/>
[removeNode<Header/>],[Content <span/>]
````
````javaScript
import React from 'react'

class Header extends React.Component {
  render () {
    return (
      <div>
        header
      </div>
    )
  }

  componentDidMount () {
    console.log('header mount')
  }

  componentWillUnmount () {
    console.log('header unmount')
  }
}

class Content extends React.Component {
  render () {
    return (
      <div>
        Content
      </div>
    )
  }

  componentDidMount () {
    console.log('Content mount')
  }

  componentWillUnmount () {
    console.log('Content unmount')
  }
}

class Demo1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      header: false
    }
  }
  render () {
    return (
      <div>
        {this.state.header ? <Header /> : <Content />}
      </div>
    )
  }
}
````
> ### key的优化
````javaScript
old:a,b,c,d
new:b,a,d,c

````


> # 生命周期与数据操作

````javaScript
import React,{Component} from 'react';

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			name: 'react'
		}
	}

	render() {
		console.log('App rerender')
		return (
			<div>
				{this.state.name}
				{this.state.name && <Son1 name={this.state.name + '-son'}/>}
			</div>
		);
	}

	componentDidMount() {
		window.app = this

		console.log('App mount')
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('App will update')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('App did update')
	}


}


class Son1 extends Component{
	render() {
		console.log('son1 rerender')
		return (
			<div>
				{this.props.name}
				<GrandSon1 name={this.props.name + '-grand'}/>
			</div>
		);
	}
	componentDidMount() {
		console.log('Son1 mount')
	}
	componentWillUpdate(nextProps, nextState) {
		console.log('son1 will update')
	}


	componentDidUpdate(prevProps, prevState) {
		console.log('son1 did update')
	}

	componentWillUnmount() {
		console.log('Son1 unmout')
	}

}

class GrandSon1 extends Component{
	render() {
		console.log('GrandSon1 rerender')
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
	componentDidMount() {
		console.log('GrandSon1 mount')
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('GrandSon1 will update')
	}


	componentDidUpdate(prevProps, prevState) {
		console.log('GrandSon1 did update')
	}


	componentWillUnmount() {
		console.log('GrandSOn1 unmout')
	}
}
export default App

````

> 数据操作

> context 
````javaScript 
import React from 'react';
import PropTypes from 'prop-types'

class App extends React.Component {
	getChildContext() {
		return {color: "purple"};
	}
	constructor(props){
		super(props)
		this.state = {
			name: 'son'
		}
	}
	render() {
		console.log('App rerender')
		return (
			<div>
				{this.state.name && <Son1 name={this.state.name}/>}
			</div>
		);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('App did update')
	}

	componentWillUpdate(prevProps, prevState) {
		console.log('App will update')
	}
	componentDidMount() {
		console.log('app mount')
		window.app = this
	}

}
App.childContextTypes = {
	color: PropTypes.string
}
class Son1 extends React.Component{
	render() {
		console.log('Son1 rerender')
		return (
			<div>

				{this.props.name && <GrandSon1 name={this.props.name + '-grand'}/>}
			</div>
		);
	}
	componentWillUpdate(prevProps, prevState) {
		console.log('son will update')
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('son did update')
	}
	componentDidMount() {
		console.log('son mount')
	}

	componentWillUnmount() {
		console.log('son unmount')
	}

}

class GrandSon1 extends React.Component{
	render() {
		console.log('GrandSon1 rerender')
		return (
			<div>
				{this.props.name} - {this.context.color}
			</div>
		);
	}
	componentWillUpdate(prevProps, prevState) {
		console.log('son will update')
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('GrandSon1 did update')
	}
	componentDidMount() {
		console.log('grandson mount')
	}
	componentWillUnmount() {
		console.log('GrandSon1 unmount')
	}
}
GrandSon1.contextTypes = {
	color: PropTypes.string
};
export default App;

````

> # 组件间通信

[组件间的通信](../../image/)加张图片


> ## 父组件向子组件通信
````javaScript
import React,{Component} from 'react';
import './App.css';

class Action extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		return (
			<div>
				<input value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
				<button onClick={() => {
					this.props.onAdd(this.state.value)
					this.setState({
						value: ''
					})
				}}>提交</button>
			</div>
		);
	}
}

class List extends Component{
	render() {
		return (
			<div>
				{this.props.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}
}


class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
			value: ''
		}
	}


	render() {

		return (
			<div>
				 <Action
				    onAdd={(name) => {
				    	let {data} = this.state
					    data.push({
						    name,
						    id: name
					    })
					    this.setState({
						    data
					    })
				    }}
				 />

				 <List data={this.state.data}/>
			</div>
		);
	}
}


export default App;

````
> ## 子组件向父组件通信
````javaScript
import React,{Component} from 'react';
import './App.css';



class List extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
		}
	}
	render() {
		return (
			<div>
				{this.state.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}

	clear() {
		this.setState({
			data: []
		})
	}
}


class App extends React.Component{
	render() {
		return (
			<div>
				 <List ref='list'/>
			</div>
		);
	}

	componentDidMount() {

		window.app = this

		// this.refs.list.clear()
	}

}


export default App;

````
> ## 兄弟组件间通信

> ## 观察者模式
````javaScript
import React,{Component} from 'react';
import './App.css';

class EventComponent extends Component{
	cb = {}
	on(name,cb) {
		this.cb[name] = cb
	}
	off(name) {
		delete this.cb[name]
	}
	trigger(name,arg) {
		this.cb[name](arg)
	}
}

class List extends EventComponent{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
		}
	}
	render() {
		return (
			<div>
				{this.state.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}

	clear() {
		this.setState({
			data: []
		})
	}

	add(name) {
		let {
			data
		} = this.state
		data.push({
			name,
			id:name
		})
		this.setState({data})
	}
}

class Action extends EventComponent{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		return (
			<div>
				<input value={this.state.value} onChange={(e) => this.setState({value: e.target.value })}/>
				<button onClick={(e) =>{
					this.trigger('add', this.state.value)
				}}>add</button>
			</div>
		);
	}
}


class App extends EventComponent{
	render() {
		return (
			<div>
				 <List ref='list' />
				<Action ref='action'/>
			</div>
		);
	}

	componentDidMount() {
		let listInstance = this.refs.list
		let actionInstance = this.refs.action
		actionInstance.on('add',(name) => {
			listInstance.add(name)
		})
		window.app = this

		// this.refs.list.clear()
	}

}


export default App;

````
