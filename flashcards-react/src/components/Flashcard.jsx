import React, { Component } from 'react';
// import '../css/Flashcards.css'
import '../scss/Flashcards.scss';

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
        <div id = "definition" className="card" onClick={() => this.props.flip()}>
          <h3>{this.props.definition}</h3>
        </div>
        <div id = "term" className="card" onClick={() => this.props.flip()}>
          <h1 className="display-5">{this.props.term}</h1>
        </div>
        <div id = "complete" className="card d-none" onClick={() => this.props.onComplete()}>
          <h1 className="display-5">Congratulations, you finished learning all of the terms! Try again?</h1>
        </div>
      </React.Fragment>
    );
  }

}
    
    export default Flashcard;
    