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
			card2: '',
			domElements: []
		}
		this.checkMatchObj = {};
		this.lastClicked;
		this.flag = false; //flag that will make cards rerender on dom when selected
	}
	componentDidMount() {
		let images = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
		let imagesDoubled = this.dupAndShuffle(images);
		this.setState({
			cards: imagesDoubled
		}, this.buildDomElements(imagesDoubled))
	}
	importAll(r) {
  		return r.keys().map(r);
	}
	dupAndShuffle(array){
		let copy = [];
		for(let i = 0; i<array.length*2; i++){
			copy[i] = array[i<9 ? i : i-9]
		}
		let shuffled = [];
		for(let i = 0; i < 18; i++){
			let randNum = Math.floor(Math.random() * copy.length)
			let ranUrl = copy[randNum];
			this.checkMatchObj['card' + (i+1)] = ranUrl;
			shuffled.push(ranUrl);
			copy.splice(randNum, 1)
		}
		return shuffled;
	}
	handleClick(e){
		if(this.lastClicked === e.target.name || e.target.name === undefined) return;
		if(!this.state.card1){
			this.lastClicked = e.target.name;
			this.setState({card1: e.target.name});
			this.flag = true;
			return;
		}
		if(!this.state.card2){
			this.setState({card2: e.target.name})
			this.checkWinOrSwitch(this.lastClicked, e.target.name)
			this.lastClicked = null;
			return;
		}
	}
	checkWinOrSwitch(card1, card2){
		this.flag = true;
		if(this.checkMatchObj[card1] === this.checkMatchObj[card2]){
			this.checkMatchObj[card1] = null;
			this.checkMatchObj[card2] = null;
		}
		setTimeout(()=>{
			this.flag = true;
			this.setState({
				card1: '',
				card2: ''
		})}, 1500)
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.flag){
			this.buildDomElements(this.state.cards)
		}
	}

	buildDomElements(array){
		let arr =[];
		for(let i = 0; i< array.length; i++){
			let id = 'card' + (i + 1);
			let temp = <SingleCard isMatched = {this.checkMatchObj[id] ? false : true} key = {i} id = {id} card1 = {this.state.card1} card2 = {this.state.card2} url = {this.state.cards[i]} callBack = {this.handleClick.bind(this)}/>
			arr.push(temp)
		}
		this.setState({
			domElements: arr
		})
		this.flag = false;
	}
	

	render() {
		return (
			<div className="game-cont">
				{this.state.domElements}
			</div>
		);
	}
}

export default CardArea;
