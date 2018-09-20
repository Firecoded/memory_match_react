import React, { Component } from 'react';
import './single_card.css';
import cardBack from '../assets/images/back.png';
import bluePortal from '../assets/images/backgrounds/backwithblueportal.png';
import orangePortal from '../assets/images/backgrounds/backwithorangeportal.png';

class SingleCard extends Component {
	constructor(props){
		super(props)
		this.state ={
			click1: false,
			click2: false
		}
	}

	componentDidMount() {
		console.log(this.props)
	}
	// handleClick(){
	// 	if(!this.state.click1){
	// 		this.setState({
	// 			click1: true
	// 		})
	// 		return;
	// 	}
	// 	this.setState({
	// 		click1: false,
	// 		click2: true
	// 	})
	// }
	handleClick(){
		this.props.click();
	}

	render() {
		const {url} = this.props
		return (
			<div onClick = {this.handleClick.bind(this)} className = "single-card-cont">
				<div className = 'front'>
					{this.props.click1 ? '' : <img src = {cardBack}/>}
				</div>
				<div className = 'portal'>
					{this.props.click1 ? this.props.click2 ? '' : <img src = {bluePortal}/> : ''}
				</div>
				<div className = 'portal'>
					{this.props.click2 ? <img src = {orangePortal}/> : ''}
				</div>
				<div className = 'back'>
					<img className = 'card-img' src = {url}/>
					<div className = 'background-div grey lighten-2'></div>
				</div>
			</div>
		);
	}
}

export default SingleCard;
