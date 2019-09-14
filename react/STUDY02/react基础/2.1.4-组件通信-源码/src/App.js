import React,{Component} from 'react';
import './App.css';


class Clock extends Component {
	render() {
		let {
			onWakeup,
			onSleep,
			time
		} = this.props
		if(time === 9) {
			onWakeup()
		}
		if(time === 21) {
			onSleep()
		}

		return (
			<div>
				clock
			</div>
		);
	}
}


class Room extends React.Component{


	//接受 clock 组件穿过来的方法 传递给person组件
	render() {

		return (
			<div>
				<Clock
					time={12}
					onWakeup={() => {
						alert('wake up')
					}}

					onSleep={( ) => {
						alert("sleep")
					}}
				/>
				<Person/>
				<Bed/>
			</div>
		);
	}
}


export default App;
