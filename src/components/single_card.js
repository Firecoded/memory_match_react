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
		const {url, isMatched, isFlipped, switchCards} = this.props.details
		const {id, card1, card2} = this.props;
		return (
			<div onClick = {this.handleCallback.bind(this)} name = {id} className = 'single-card-cont'>
				<div className = 'front'>
					{isFlipped || isMatched ? '' : <img name = {id} src = {cardBack}/>}
				</div>
				<div className = 'portal'>
					<img src = {orangePortal} className = {parseInt(card2) === id ? '' : 'hidden'}/>
					<img src = {bluePortal} className = {parseInt(card1) == id ? '' : 'hidden'}/>
				</div>
				<div className = 'back'>
					<img className = {`card-img ${switchCards ? 'appear' : ''} ${isMatched ? 'disappear' : ''}`} id = {id} src = {url}/>
				</div>
			</div>
		);
	}
}

export default SingleCard;
