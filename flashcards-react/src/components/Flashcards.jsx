import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css';
import Flashcard from './Flashcard';

class Flashcards extends Component {
    state = {
        vocabItem: [
            {id: 1, term: "Chicken", definition: "Cluck, Cluck"},
            {id: 2, term: "Duck", definition: "Quack, Quack"},
            {id: 3, term: "Cow", definition: "Moo!"},
            {id: 4, term: "Pig", definition: "Oink"},
            {id: 5, term: "Horse", definition: "Nay"},
        ],
        learnedItems: [],
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
            definition= {this.state.vocabItem[this.state.wordDisplayIndex].definition}
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
            <h2>Words Learned: {this.state.learnedItems.length}</h2>
            </div>
            <div className="navButton-left"></div>
            </div>
            </React.Fragment>
            );
        }
        
        markAsLearned = () => {
            let currentState = this.state;
            if(currentState.learnedItems.length < currentState.vocabItem.length){
                currentState.learnedItems.push(this.state.vocabItem[this.state.wordDisplayIndex].id);
            }
            this.movetoNextTerm();
            this.setState(currentState);
        }
        
        resetLearned = () => {
            let currentState = this.state;
            currentState.learnedItems = [];
            currentState.wordDisplayIndex = 0;
            this.setState(currentState);
        }
        
        movetoPreviousTerm = () => {
            let currentState = this.state;
            let previousTermIndex = (termIndex) => termIndex  === 0 ? currentState.vocabItem.length-1 : termIndex - 1;
            let prevTerm = previousTermIndex(currentState.wordDisplayIndex);
            this.switchCards(currentState, prevTerm, previousTermIndex);
        }
        
        movetoNextTerm = () => {
            let currentState = this.state;
            let nextTermIndex = (termIndex) => (termIndex + 1) >= currentState.vocabItem.length ? 0 : termIndex + 1;
            let nextTerm = nextTermIndex(currentState.wordDisplayIndex);
            this.switchCards(currentState, nextTerm, nextTermIndex);
        }
        
        flipOnMove = () => {
            let cardDefinition = document.getElementById("definition");
            let cardTerm = document.getElementById("term");
            if(!cardTerm.classList.contains("flip")){
                cardDefinition.classList.remove("flip");
                cardTerm.classList.add("flip");
                return true;
            }
            return false;
        }
        
        
        
        switchCards = (currentState, newIndex, findNewIndex) => {
            if(currentState.learnedItems.length < currentState.vocabItem.length){
                for(let i of currentState.learnedItems){
                    if(i === currentState.vocabItem[newIndex].id){
                        newIndex = findNewIndex(newIndex);
                    }
                }
                currentState.wordDisplayIndex = newIndex;
                if (this.flipOnMove()) {
                    setTimeout(() => {
                        this.flipOnMove();
                        this.setState(currentState);
                    }, 250);
                }
                else {
                    this.flipOnMove();
                    this.setState(currentState);
                }
            }
        }
        
    }
    export default Flashcards;
    