import React, { Component, Fragment } from 'react';
import './typewriter.css';

class TypeWriter extends Component {
	constructor(props){
		super(props)

	}
		
	render(){
		return (
			<Fragment>
				<p className = "text-to-be-typed">{this.props.text}, <span className = 'bigger-text'>{this.props.biggertext}</span></p><span className='cursor'/>
			</Fragment>	
		)
	}	
}

export default TypeWriter;