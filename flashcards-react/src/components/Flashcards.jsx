import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css';
import Flashcard from './Flashcard';

class Flashcards extends Component {
    state = {
        vocabItem: [
            {term: "Chicken", defintion: "Cluck, Cluck"},
            {term: "Duck", defintion: "Quack, Quack"},
            {term: "Cow", defintion: "Moo!"},
            {term: "Pig", defintion: "Oink"},
            {term: "Horse", defintion: "Nay"},
        ],
        wordDisplayIndex : 0
    }

  render() {
    return (
    <React.Fragment>
      <div id="flashcard_header" className="row">
        <div className="col-12">
            Flashcards App
        </div>
      </div>
      <div id="flashcards" className="row">
        <div id="flashcard_display" className = "col col-sm-8 offset-sm-2">
            <Flashcard 
                term= {this.state.vocabItem[this.state.wordDisplayIndex].term}
                definition= {this.state.vocabItem[this.state.wordDisplayIndex].defintion}
            />
        </div>
        <div className="navigation col-12">
            <button className="btn btn-success" onClick={this.movetoPreviousTerm}>Previous Term</button>
            <button className="btn btn-success" onClick={this.movetoNextTerm}>Next Term</button>
        </div>
      </div>
    </React.Fragment>
    );
  }

movetoPreviousTerm = () => {
    let currentState = this.state;
    (currentState.wordDisplayIndex !== 0) ? currentState.wordDisplayIndex-- : currentState.wordDisplayIndex = currentState.vocabItem.length-1;
    
    this.setState(currentState);
}

movetoNextTerm = () => {
    let currentState = this.state;
    (currentState.wordDisplayIndex < currentState.vocabItem.length-1) ? currentState.wordDisplayIndex++ : currentState.wordDisplayIndex = 0;

    this.setState(currentState);
}


}
export default Flashcards;
