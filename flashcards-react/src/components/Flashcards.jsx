import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css';
import Flashcard from './Flashcard';

class Flashcards extends Component {
    state = {
        vocabularyTerms: [
            {id: 1, term: "Chicken", definition: "Cluck, Cluck"},
            {id: 2, term: "Duck", definition: "Quack, Quack"},
            {id: 3, term: "Cow", definition: "Moo!"},
            {id: 4, term: "Pig", definition: "Oink"},
            {id: 5, term: "Horse", definition: "Nay"},
        ],
        itemsLearned: [],
        wordDisplayIndex : 0,
        startWithTerm: false
    }

    componentDidMount(){
        this.side = {
          definition : document.getElementById("definition"),
          term : document.getElementById("term")
        }
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
                    term= {this.state.vocabularyTerms[this.state.wordDisplayIndex].term}
                    definition= {this.state.vocabularyTerms[this.state.wordDisplayIndex].definition}
                    start = {this.state.startWithTerm}
                    // onComplete = {this.resetLearned}
                />
            </div>
            <div className="navigation col-12">
                <button className="btn btn-success" onClick={this.movetoPreviousTerm}>Previous Term</button>
                <button className="btn btn-success" onClick={this.movetoNextTerm}>Next Term</button>
            </div>
            <div className="navigation col-12">
                <button className="btn btn-success" onClick={this.markAsLearned}>Mark as Learned</button>
                <button className="btn btn-success" onClick={this.resetLearned}>Reset Learned</button>
            </div>
            <div className="navigation col-12">
                <button id = "changeStartDirectionButton" className="btn btn-success" onClick={() => this.chooseStartingSide()}>Start With {this.state.startWithTerm ? "Term" : "Definition"}</button>
            </div>
            <div className="navigation col-12">
                <h2>Words Learned: {this.state.itemsLearned.length}</h2>
            </div>
                <div className="navButton-left"></div>
            </div>
            </React.Fragment>
            );
        }
        
        markAsLearned = () => {
            let currentState = this.state;
            if(currentState.itemsLearned.length < currentState.vocabularyTerms.length){
                currentState.itemsLearned.push(this.state.vocabularyTerms[this.state.wordDisplayIndex].id);
                this.movetoNextTerm();
            }
            else{
                console.log("You finished all the words!")
                // this.setState(currentState);
            }
        }
        
        resetLearned = () => {
            let currentState = this.state;
            currentState.itemsLearned = [];
            currentState.wordDisplayIndex = 0;
            this.setState(currentState);
        }
        
        movetoPreviousTerm = () => {
            let previousTermIndex = (termIndex) => termIndex  === 0 ? this.state.vocabularyTerms.length - 1 : termIndex - 1;
            this.switchCards(previousTermIndex);
        }
        
        movetoNextTerm = () => {
            let nextTermIndex = (termIndex) => (termIndex + 1) >= this.state.vocabularyTerms.length ? 0 : termIndex + 1;
            this.switchCards(nextTermIndex);
        }

        chooseStartingSide = () => {
            let currentState = this.state;
            currentState.startWithTerm = !currentState.startWithTerm;
            this.setState(currentState);
        }
        
        flipOnMove = () => {
            let defaultFront = this.state.startWithTerm? this.side.term : this.side.definition;
            let defaultBack = this.state.startWithTerm? this.side.definition : this.side.term; 
            if(defaultFront.classList.contains("flip")){
                defaultBack.classList.add("flip");
                defaultFront.classList.remove("flip");
                return true;
            }
            return false;
        }
        
        switchCards = (findNewIndex) => {
            let currentState = this.state;
            let newIndex = findNewIndex(currentState.wordDisplayIndex);
            if(currentState.itemsLearned.length < currentState.vocabularyTerms.length){
                for(var i = 0; i < currentState.itemsLearned.length; i++){
                    if(currentState.itemsLearned[i] === currentState.vocabularyTerms[newIndex].id){
                        newIndex = findNewIndex(newIndex);
                        i = -1;
                    }
                }
                currentState.wordDisplayIndex = newIndex;
                setTimeout(() => {
                    this.setState(currentState);
                }, 
                    this.flipOnMove() ? 400 : 0
                );
            }
            else{
                console.log("All cards learned!")
            }
        }
        
    }
    export default Flashcards;
    