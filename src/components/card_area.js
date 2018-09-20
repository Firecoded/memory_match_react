import React, { Component } from 'react';
import SingleCard from './single_card';
import './single_card.css';
import cardBack from '../assets/images/back.png';
import bluePortal from '../assets/images/backgrounds/backwithblueportal.png';
import orangePortal from '../assets/images/backgrounds/backwithorangeportal.png';

class CardArea extends Component {
	constructor(props){
		super(props)

		this.state={
			cards: [],
			card1: '',
			card2: ''
		}
		this.lastClicked;
		this.cardArray = [];
	}
	componentDidMount() {
		const images = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
		this.setState({
			cards: images
		})
	}
	importAll(r) {
  		return r.keys().map(r);
	}

	handleClick(e){
		console.log(e.target.name)
		if(this.lastClicked === e.target.name || e.target.name === undefined){
			return;
		}
		if(!this.state.card1){
			this.lastClicked = e.target.name;
			this.setState({
				card1: e.target.name
			})
			return;
		}
		if(!this.state.card2){
			this.setState({
				card2: e.target.name
			})
			this.lastClicked = null;
			setTimeout(()=>{this.setState({
				card1: '',
				card2: ''
			})}, 1500)
			return;
		}
	}
	buildArray(){
		let arr = [];
		for(let i = 0; i< this.state.cards; i++){
			let temp = 'card' + i;
			let element = (
				<div onClick = {this.handleClick.bind(this)} name = {temp} className = ' single-card-cont'>
					<div className = 'front'>
						{this.state.click1 && (this.state.card1 === {temp} || this.state.card2 === {temp})? '' : <img name = {temp} src = {cardBack}/>}
					</div>
					<div className = 'portal'>
						<img src = {bluePortal} className = {this.state.card1 === {temp} ? '' : 'hidden'}/>
						<img src = {orangePortal} className = {this.state.card1 === {temp} ? 'hidden' : ''}/>
					</div>
					<div className = 'back'>
						<img className = 'card-img' src = {this.state.cards[i]}/>
						<div className = 'background-div grey lighten-2'></div>
					</div>
				</div>
			)
			arr.push(element)
		}
		this.setState({

		})
	}
	

	render() {
		console.log(this.state)
		return (
			<div className="game-cont">
				<div onClick = {this.handleClick.bind(this)} name = "card1" className = ' single-card-cont'>
					<div className = 'front'>
						{this.state.card1 === 'card1' || this.state.card2 === 'card1' ? '' : <img name = "card1" src = {cardBack}/>}
					</div>
					<div className = 'portal'>
						<img src = {orangePortal} className = {this.state.card2 === 'card1' ? '' : 'hidden'}/>
						<img src = {bluePortal} className = {this.state.card1 === 'card1' ? '' : 'hidden'}/>
					</div>
					<div className = 'back'>
						<img className = 'card-img' src = {this.state.cards[0]}/>
						<div className = 'background-div grey lighten-2'></div>
					</div>
				</div>
				<div onClick = {this.handleClick.bind(this)} name = "card2" className = ' single-card-cont'>
					<div className = 'front'>
						{this.state.card1 === 'card2' || this.state.card2 === 'card2' ? '' : <img name = "card2" src = {cardBack}/>}
					</div>
					<div className = 'portal'>
						<img src = {orangePortal} className = {this.state.card2 === 'card2' ? '' : 'hidden'}/>
						<img src = {bluePortal} className = {this.state.card1 === 'card2' ? '' : 'hidden'}/>
					</div>
					<div className = 'back'>
						<img className = 'card-img' src = {this.state.cards[1]}/>
						<div className = 'background-div grey lighten-2'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default CardArea;
