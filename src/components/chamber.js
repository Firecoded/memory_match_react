import React, { Component } from 'react';
import MemMatch from './mem_match';
import './chamber.css';
import rArrow from '../assets/images/rarrow.png';

class Chamber extends Component {
    constructor(props){
        super(props)

        this.state = {
            pan: false,
            panIsDone: false,
            fade: false,
            startGame: false,
            bounce: false
        }
    }
  
    componentDidMount = () => {
      this.setState({
          bounce: true
      })
      
    }
    showDivs = () => {
        setTimeout(()=>{
            this.setState({
                panIsDone: true
            })
          }, 4000);
    }

    handleDivClick = () =>{
        this.setState({
            fade: true,
        })
        setTimeout(()=>{
            this.setState({
                startGame: true
            })
          }, 1200);
    }
    startPan = () => {
        this.setState({
            pan: true,
            bounce: false
        }, this.showDivs)
    }
    

    render() {
        return (
            <div className = 'chamber-cont fadeawayopp'>
                <div className = "mobile-modal">
                    <h3>It appears you are on a mobile device, this site is currently intended to be viewed on a desktop computer. Check back later for a mobile friendly version.</h3>
                </div>
                <div className = {`explore-div ${this.state.bounce ? '' : 'fadeaway'}`}>
                    <img className = {`right-arrow ${this.state.bounce ? "arrow-bounce" : 'fadeaway'}`} 
                        onClick = {this.startPan}
                        src = {rArrow} 
                        alt = "arrow pointing right"/>
                </div>
                {this.state.startGame ? <MemMatch/> : null }
                <div className = {`test-chamber ${this.state.pan ? 'pan' : ''} ${this.state.fade ? "fadeaway" : ''}`}>
                    <div onClick = {this.handleDivClick} className = {`click-div1 ${this.state.panIsDone ? '' : 'displaynone'}`}></div>
                    <div onClick = {this.handleDivClick} className = {`click-div2 ${this.state.panIsDone ? '' : 'displaynone'}`}></div>
                </div>
                
            </div>    
        )
    }
}

export default Chamber;
