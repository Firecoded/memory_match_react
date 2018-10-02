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
			audioOn: false,
			attempts: 0,
			matches: 0,
			restart: true,
			windowShake: false
		}
		this.attempts = 0;
		this.matches = 0;
		this.testSubject = Math.floor(Math.random() * 100000);
		this.openNewWindow = this.openNewWindow.bind(this);
		this.enableAudio = this.enableAudio.bind(this);
		this.restartGame = this.restartGame.bind(this);
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
	addAttempt(){
		this.attempts++
		this.setState({
			attempts: this.attempts
		})
	}
	addMatch(){
		this.matches++
		this.setState({
			matches: this.matches
		})
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
		this.matches = 0;
		this.attempts = 0;
		this.setState({
			restart: !this.state.restart,
			matches: 0,
			attempts: 0
		}, ()=>{this.state.restart ? '' : this.restartGame();}
		)
	}
	calculateAccuracy = () => {	
		return Math.floor((this.state.matches/this.state.attempts)*100)
	}
	openNewWindow(e){
		console.log(e, e.target.id)
		if(e.target.id === 'close'){
			this.setState({
				windowShake: true
			})
			setTimeout(this.removeWindowShake, 500)
		}
	}
	removeWindowShake = () =>{
		this.setState({
			windowShake: false
		})
	}
	render() {
		console.log(this.state)
		return (
			<div className = 'main-cont'>
				<div className = {this.state.appear ? this.state.windowShake ? 'window-shake mac-window2' : 'mac-window2' : 'mac-window2'}>
					<div className = {this.state.appear ? 'mac-window ' : 'hidden '}>
						<div className = 'top-window'>
							<div className="win-buttons">
								<a id="close" className="button" onClick = {this.openNewWindow}></a>
								<a id="min" className="button" onClick = {this.openNewWindow}></a>
								<a id="max" className="button" onClick = {this.openNewWindow}></a>
							</div>
							<span className = 'top-window-text'>Memory Enrichment Center - TEST SUBJECT #{this.testSubject}</span>
							<div className = {this.state.gameOn ? 'list-options appear' : 'hidden'}>
								<span onClick = {this.restartGame}>Restart</span>
								<span onClick = {this.enableAudio}>{this.state.audioOn ? 'Disable' : 'Enable'} Audio</span>
							</div>
						</div>	
						<div className = {this.state.gameOn ? 'stats-cont appear' : 'hidden'}>
							<p>&gt; Attempts - {this.state.attempts}</p>
							<p>&gt; Matches - {this.state.matches}</p>
							<p>&gt; Accuracy - {this.state.matches ? this.calculateAccuracy() : '0'}%</p>
						</div>		
						<div className = {this.state.gameOn ? 'hidden' : 'window-text appear'}>
							<p>&gt; <span className = 'underline-text' onClick = {this.enableAudio.bind(this)}>Click here</span> to {this.state.audioOn ? 'disable' : 'enable'} audio &quot;assistance&quot;<br/>&gt; </p>
							{this.state.typeOn ? <TypeWriter text = '&gt; Cake and grief counseling will be available at the conclusion of this test' biggertext = 'press any key to begin'/> : '' }
						</div>
						{this.state.gameOn && this.state.restart ? <CardArea restartCallback = {this.restartGame.bind(this)} attemptCallback = {this.addAttempt.bind(this)} matchCallback = {this.addMatch.bind(this)} gameOn = {this.state.gameOn}/> : ''}
					</div>
				</div>
			</div>
		);
	}
}

export default MemMatch;
