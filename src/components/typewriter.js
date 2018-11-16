import React, { Component, Fragment } from 'react';
import './typewriter.css';

class TypeWriter extends Component {
	constructor(props){
		super(props)
		this.altText = "tap here to begin"
	}
	
	handleBeginTap = (e) =>{
		this.props.callback();
	}
	render(){
		return (
			<Fragment>
				<p className = "text-to-be-typed">{this.props.text}, <span className = 'bigger-text'>{this.props.biggertext}</span><span onClick = {this.handleBeginTap}className = 'bigger-text2'>{this.altText}</span></p><span className='cursor'/>
			</Fragment>	
		)
	}	
}

export default TypeWriter;