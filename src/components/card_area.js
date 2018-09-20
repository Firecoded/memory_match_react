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
		this.lastClicked;
		this.cardArray = [];
		this.flag = false; //flag that will make cards rerender on dom when selected
	}
	componentDidMount() {
		const images = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
		this.setState({
			cards: images
		}, this.buildDomElements(images))
		this.dupAndShuffle(images)
	}
	importAll(r) {
  		return r.keys().map(r);
	}
	dupAndShuffle(array){
		let copy = [];
		for(let i = 0; i<array.length*2; i++){
			copy[i] = array[i<9 ? i : i-9]
		}
		console.log(copy)
	}
	handleClick(e){
		if(this.lastClicked === e.target.name || e.target.name === undefined){
			return;
		}
		if(!this.state.card1){
			this.lastClicked = e.target.name;
			this.setState({
				card1: e.target.name
			})
			this.flag = true;
			return;
		}
		if(!this.state.card2){
			this.setState({
				card2: e.target.name
			})
			this.flag = true;
			this.lastClicked = null;
			setTimeout(()=>{
				this.flag = true;
				this.setState({
					card1: '',
					card2: ''
			})}, 1500)
			return;
		}
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
			let temp = <SingleCard key = {i} id = {id} card1 = {this.state.card1} card2 = {this.state.card2} url = {this.state.cards[i]} callBack = {this.handleClick.bind(this)}/>
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
