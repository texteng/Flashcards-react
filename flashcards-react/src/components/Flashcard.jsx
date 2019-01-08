import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css'

class Flashcard extends Component {
  render() {
    return (
      <React.Fragment>
        <div id = "definition" className="card" onClick={() => this.flipCard()}>
          <h2 className="display-5">{this.props.term}</h2>
        </div>
        <div id = "term" className="card flip" onClick={() => this.flipCard()}>
          <p>{this.props.definition}</p>
        </div>
      </React.Fragment>
    );
  }
  
  //Helper Functions
    flipCard = () => {
      let cardDefinition = document.getElementById("definition");
      let cardTerm = document.getElementById("term");
      if(!cardDefinition.classList.contains("flip")){
        cardDefinition.classList.add("flip");
        cardTerm.classList.remove("flip");
      }
      else if(!cardTerm.classList.contains("flip")){
        cardDefinition.classList.remove("flip");
        cardTerm.classList.add("flip");
      }

    }

}
    
    export default Flashcard;
    