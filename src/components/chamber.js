import React, { Component } from 'react';
import MemMatch from './mem_match';
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
      }, 2800);
      
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
    

    render() {
        return (
            <div className = 'chamber-cont fadeawayopp'>
                <div className = "mobile-modal">
                    <h3>It appears you are on a mobile device, this site is currently intended to be viewed on a desktop computer. Check back later for a mobile friendly version.</h3>
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
