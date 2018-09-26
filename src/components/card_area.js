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
		this.imagesArray;
		this.addAttempt = this.addAttempt.bind(this);
		this.addMatch = this.addMatch.bind(this);
	}
	componentDidMount() {
		let images = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
		this.imagesArray = this.duplicate(images);
		this.buildCardArr(this.imagesArray);	
	}
	importAll(r) {
  		return r.keys().map(r);
	}
	buildCardArr(array){
		let arr = array.map((item, index)=>{
			return {
				url: item,
				isFlipped: false,
				isMatched: false,
				switchCards: false
			}
		});
		this.setState({
			cards: arr
		})
	}
	duplicate(array){
		let copy = [];
		for(let i = 0; i<array.length; i++){
			copy.push(array[i], array[i])
		}
		return this.shuffle(copy);
	}
	shuffle(array){
		let shuffled = [];
		for(let i = 0; i < 18; i++){
			let randNum = Math.floor(Math.random() * array.length)
			let ranUrl = array[randNum];
			shuffled.push(ranUrl);
			array.splice(randNum, 1)
		}
		return shuffled;
	}
	handleClick(e){
		const currentCardIndex = e.target.name
		if(this.lastClicked === currentCardIndex || currentCardIndex === undefined) return;
		let newState = this.state
		if(!this.state.card1){
			this.lastClicked = currentCardIndex;
			newState.cards[currentCardIndex].isFlipped = true;
			newState.card1 = currentCardIndex;
			this.setState(newState)
			return;
		}
		if(!this.state.card2){
			newState.cards[currentCardIndex].isFlipped = true;
			newState.card2 = currentCardIndex;
			this.addAttempt();
			this.setState(newState)
			this.checkWinOrSwitch(this.lastClicked, currentCardIndex, newState);
			return;
		}
	}
	checkWinOrSwitch(index1, index2, newState){
		let card1 = newState.cards[index1];
		let card2 = newState.cards[index2];
		if(card1.url === card2.url){
			this.addMatch();
			setTimeout(()=>{	
				card1.isMatched = true;
				card2.isMatched = true;
				newState.card1 = '';
				newState.card2 = '';
				this.setState(newState);
				this.lastClicked = null;
			}, 1200)
			return;
		} else{
			setTimeout(()=>{
				let temp = card1.url
				newState.cards[index1] = {
					url: card2.url,
					isFlipped: true,
					isMatched: false,
					switchCards: true
				}
				newState.cards[index2]= {
					url: temp,
					isFlipped: true,
					isMatched: false,
					switchCards: true
				}
				this.setState(newState);
				newState.card1 = '';
				newState.card2 = '';
				setTimeout(()=>{
					newState.cards[index1].isFlipped = false;
					newState.cards[index2].isFlipped = false;
					newState.cards[index1].switchCards = false;
					newState.cards[index2].switchCards = false;
					this.lastClicked = null;
					this.setState(newState)
				}, 1000)	
			}, 1000)
		}	
	}
	addMatch(){
		this.props.matchCallback();
	}
	addAttempt(){
		this.props.attemptCallback();
	}
	buildDomElements(array){
		return array.map((item, index)=>{
			return ( <SingleCard 
				details = {array[index]}
				key = {index}
				id = {index}
				card1 = {this.state.card1}
				card2 = {this.state.card2}
				callBack = {this.handleClick.bind(this)}
				/>
			)
		})
	}
	
	render() {
		return (
			<div className={`game-cont ${this.props.gameOn ? 'terminal-appear' : ''}`}>
				{this.buildDomElements(this.state.cards)}
			</div>
		);
	}
}

export default CardArea;
