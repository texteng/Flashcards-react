import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css'

class Flashcards extends Component {
  render() {
    return (
    <React.Fragment>
      <div id="flashcard_header" className="row">
        <div className="col-12">
            Flashcards App
        </div>
      </div>
      <div id="flashcards" className="row">
        <div className = "col-8 offset-2">
            <div id="flashcard_display">Flashcards</div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default Flashcards;
