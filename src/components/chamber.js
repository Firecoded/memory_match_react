import React, { Component } from 'react';
import MemMatch from './mem_match';
import chamberPic from '../assets/images/backgrounds/chamber.jpg';
import './chamber.css';

class Chamber extends Component {
    constructor(props){
        super(props)

        this.state = {
            pan: false,
            panIsDone: false,
            fade: false,
            startGame: false
        }
    }
  
    componentDidMount = () => {
      setTimeout(()=>{
        this.setState({
            pan: true
        }, this.showDivs)
      }, 2500);
      
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
            pan: false
        })
        setTimeout(()=>{
            this.setState({
                startGame: true
            })
          }, 1200);
    }
    

    render() {
        return (
            <div className = 'chamber-cont'>
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
