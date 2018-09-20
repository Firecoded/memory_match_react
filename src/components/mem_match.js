import React, { Component } from 'react';
import CardArea from './card_area';
import './mem_match.css';

class MemMatch extends Component {
	constructor(props){
		super(props)

	}
	

	


	render() {
		return (
			<div className = 'main-cont'>
				<h1 className = 'center main-logo'>Memory Enrichment Center</h1>
				<CardArea/>
			</div>
		);
	}
}

export default MemMatch;
