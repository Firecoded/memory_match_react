import React, { Component } from 'react';
import './single_card.css';
import cardBack from '../assets/images/back.png';
import bluePortal from '../assets/images/backgrounds/backwithblueportal.png';
import orangePortal from '../assets/images/backgrounds/backwithorangeportal.png';

class SingleCard extends Component {
	constructor(props){
		super(props)
		this.state={
			card1: '',
			card2: ''
		}
	}
	handleCallback(e){
		this.props.callBack(e);
	}
	
	

	render() {
		const {url, id} = this.props
		return (
			<div onClick = {this.handleCallback.bind(this)} name = "card1" className = ' single-card-cont'>
				<div className = 'front'>
					{this.props.card1 === id || this.props.card2 === id ? '' : <img name = {id} src = {cardBack}/>}
				</div>
				<div className = 'portal'>
					<img src = {orangePortal} className = {this.props.card2 === id ? '' : 'hidden'}/>
					<img src = {bluePortal} className = {this.props.card1 === id ? '' : 'hidden'}/>
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
