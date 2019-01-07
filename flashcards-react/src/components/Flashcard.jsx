import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css'

class Flashcard extends Component {
  render() {
    return (
        <div className="card" onClick={() => this.flipCard()}>
            <div id = "definition" className= "card-text">
                <h2 className="display-5">{this.props.term}</h2>
            </div>
            <div id = "term" className= "card-text d-none">
                <p>{this.props.definition}</p>
            </div>
        </div>
    );
  }
  
  //Helper Functions
    flipCard = () => {
      let cardDefinition = document.getElementById("definition");
      let cardTerm = document.getElementById("term");
      if(!cardDefinition.classList.contains("d-none")){
        cardDefinition.classList.add("d-none");
        cardTerm.classList.remove("d-none");
      }
      else if(!cardTerm.classList.contains("d-none")){
        cardDefinition.classList.remove("d-none");
        cardTerm.classList.add("d-none");
      }

    }

}
    
    export default Flashcard;
    