import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css'

class Flashcard extends Component {
  componentDidMount(){
    this.side = {
      definition : document.getElementById("definition"),
      term : document.getElementById("term")
    }
    this.props.start ? this.side.definition.classList.add("flip") : this.side.term.classList.add("flip");
  }

  render() {
    return (
      <React.Fragment>
        <div id = "definition" className="card" onClick={() => this.flipCard()}>
          <h3>{this.props.definition}</h3>
        </div>
        <div id = "term" className="card" onClick={() => this.flipCard()}>
          <h1 className="display-5">{this.props.term}</h1>
        </div>
        {/* <div id = "complete" className="card" onClick={() => this.onComplete.resetLearned()}>
          <h1 className="display-5">Congratulations, you finished learning all of the terms! Try again?</h1>
        </div> */}
      </React.Fragment>
    );
  }
  
  //Helper Functions
    flipCard = () => {
      let {term, definition} = this.side;
      if(term.classList.contains("flip")){
        definition.classList.add("flip");
        term.classList.remove("flip");
      }
      else if(definition.classList.contains("flip")){
        definition.classList.remove("flip");
        term.classList.add("flip");
      }

    }

}
    
    export default Flashcard;
    