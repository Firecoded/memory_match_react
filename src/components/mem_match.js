import React, { Component } from 'react';
import CardArea from './card_area';
import './mem_match.css';
import TypeWriter from './typewriter';
import helloMp3 from '../assets/sounds/welcomesounds/hello.mp3';
import injuriesMp3 from '../assets/sounds/welcomesounds/injuriesmayoccure.mp3';
import thankMp3 from '../assets/sounds/welcomesounds/thankyou.mp3';
import bakedMp3 from '../assets/sounds/welcomesounds/willbebaked.mp3';
import dontCareMp3 from '../assets/sounds/yourebadsounds/dontcare.mp3';
import turnBackMp3 from '../assets/sounds/yourebadsounds/turnback.mp3';
import youBrokeItMp3 from '../assets/sounds/yourebadsounds/broke.mp3';
import thirstMp3 from '../assets/sounds/yourebadsounds/thirst.mp3';



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
		this.welcomeSounds = [helloMp3, injuriesMp3, thankMp3, bakedMp3];
		this.adviceSounds = [turnBackMp3, youBrokeItMp3, thirstMp3]
		this.introAudioHasPlayed = false;
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
	
	addAttempt = () => {
		this.attempts++
		this.setState({
			attempts: this.attempts
		})
	}
	addMatch = () => {
		this.matches++
		this.setState({
			matches: this.matches
		})
	}
	handleKeyDown = (e) => {
		console.log(e)
		this.setState({
			gameOn: true,
			typeOn: false
		})
	}
	addHandler = () => {
		document.addEventListener("keydown", this.handleKeyDown);
	}
	enableAudio = () => {

		this.randomSoundIndex = Math.floor(Math.random() * 4)
		this.setState({
			audioOn: !this.state.audioOn
		})
		setTimeout(()=>{this.introAudioHasPlayed = true;}, 7000)
	}
	
	restartGame = () => {
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
	openNewWindow = (e) => {
		console.log(e, e.target.id)
		if(e.target.id === 'close' || e.target.id === 'min'){
			this.setState({
				windowShake: true
			})
			setTimeout(this.removeWindowShake, 3200)
		}
	}
	removeWindowShake = () =>{
		this.setState({
			windowShake: false
		})
	}
	render() {

		return (
			<div className = 'main-cont'>
				{this.state.attempts === 6 && this.state.audioOn ? <audio ref={e => this.audioPlayer = e} src = {this.adviceSounds[0]} autoPlay/> : ''}
				{this.state.attempts === 10 && this.state.audioOn ? <audio ref={e => this.audioPlayer = e} src = {this.adviceSounds[1]} autoPlay/> : ''}
				{this.state.audioOn && !this.state.windowShake && !this.introAudioHasPlayed ? <audio ref={e => this.audioPlayer = e} src = {this.welcomeSounds[this.randomSoundIndex]} autoPlay/> : ''}
				{this.state.audioOn && this.state.windowShake ? <audio ref={e => this.audioPlayer = e} src = {dontCareMp3} autoPlay/> : ''}
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
							<p>&gt; <span 
							className = 'underline-text' 
							onClick = {this.enableAudio}>
							Click here</span> to {this.state.audioOn ? 'disable' : 'enable'} audio &quot;assistance&quot;<br/>&gt; </p>

							{this.state.typeOn ? <TypeWriter text = '&gt; Cake and grief counseling will be available at the conclusion of this test' biggertext = 'press any key to begin'/> : '' }
						</div>
						{this.state.gameOn && this.state.restart ? <CardArea 
							restartCallback = {this.restartGame} 
							attemptCallback = {this.addAttempt} 
							matchCallback = {this.addMatch} 
							gameOn = {this.state.gameOn}/> : ''}
					</div>
				</div>
			</div>
		);
	}
}

export default MemMatch;
