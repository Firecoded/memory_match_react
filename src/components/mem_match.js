import React, { Component } from 'react';
import CardArea from './card_area';
import './mem_match.css';
import TypeWriter from './typewriter';


class MemMatch extends Component {
	constructor(props){
		super(props)

		this.state = {
			gameOn: false,
			appear: false,
			type: false,
			audioOn: false
		}
		this.testSubject = Math.floor(Math.random() * 100000);
	}
	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				appear: true
			}) 
			setTimeout(()=>{
				this.setState({
					typeOn: true
				})
				this.addHandler();
			}, 700)
		}, 1000)	
	}
	
	newDate(){
		return new Date().toLocaleString();
	}
	handleKeyDown(e){
		console.log(e)
		this.setState({
			gameOn: true,
			typeOn: false
		})
	}
	addHandler = () => {
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}
	enableAudio(){
		this.setState({
			audioOn: !this.state.audioOn
		})
	}
	restartGame(){
		this.setState({
			gameOn: false,
			typeOn: true
		})
	}

	render() {
		return (
			<div className = 'main-cont'>
				<div className = {this.state.appear ? 'mac-window' : 'hidden'}>
					<div className="win-buttons">
						<a id="close" className="button" href="#"></a>
						<a id="min" className="button" href="#"></a>
						<a id="max" className="button" href="#"></a>
					</div>
					<div className = {this.state.gameOn ? 'list-options appear' : 'hidden'}>
						<ul>
							<li onClick = {this.restartGame.bind(this)}>Restart</li>
							<li onClick = {this.enableAudio.bind(this)}>{this.state.audioOn ? 'Disable' : 'Enable'} Audio</li>
						</ul>
					</div>		
					<div className = {this.state.gameOn ? 'hidden' : 'window-text appear'}>
						<p>&gt; {this.newDate()}: Aperture Science Memory Enrichment Center - TEST SUBJECT #{this.testSubject}</p>
						<p>&gt; <span onClick = {this.enableAudio.bind(this)}>Click here</span> to {this.state.audioOn ? 'disable' : 'enable'} audio &quot;assistance&quot;<br/>&gt; </p>
						{this.state.typeOn ? <TypeWriter text = '&gt; Cake and grief counseling will be available at the conclusion of this test, press any key to begin'/> : '' }
					</div>
					{this.state.gameOn ? <CardArea gameOn = {this.state.gameOn}/> : ''}
				</div>
			</div>
		);
	}
}

export default MemMatch;
