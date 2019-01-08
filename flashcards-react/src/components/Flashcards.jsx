import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css';
import Flashcard from './Flashcard';

class Flashcards extends Component {
    state = {
        vocabItem: [
            // {id: 1, term: "Chicken", definition: "Cluck, Cluck"},
            // {id: 2, term: "Duck", definition: "Quack, Quack"},
            // {id: 3, term: "Cow", definition: "Moo!"},
            // {id: 4, term: "Pig", definition: "Oink"},
            // {id: 5, term: "Horse", definition: "Nay"},
            {id: 1, term: "1", definition: "Cluck, Cluck"},
            {id: 2, term: "2", definition: "Quack, Quack"},
            {id: 3, term: "3", definition: "Moo!"},
            {id: 4, term: "4", definition: "Oink"},
            {id: 5, term: "5", definition: "Nay"},
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
            let previousTermIndex = (termIndex) => termIndex  === 0 ? this.state.vocabItem.length - 1 : termIndex - 1;
            this.switchCards(previousTermIndex);
        }
        
        movetoNextTerm = () => {
            let nextTermIndex = (termIndex) => (termIndex + 1) >= this.state.vocabItem.length ? 0 : termIndex + 1;
            this.switchCards(nextTermIndex);
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
        
        switchCards = (findNewIndex) => {
            let currentState = this.state;
            let newIndex = findNewIndex(currentState.wordDisplayIndex);
            if(currentState.learnedItems.length < currentState.vocabItem.length){
                for(var i = 0; i < currentState.learnedItems.length; i++){
                    if(currentState.learnedItems[i] === currentState.vocabItem[newIndex].id){
                        newIndex = findNewIndex(newIndex);
                        i = -1;
                    }
                }
                currentState.wordDisplayIndex = newIndex;
                setTimeout(() => {
                    this.setState(currentState);
                }, 
                    this.flipOnMove() ? 200 : 0
                );
            }
            else{
                console.log("All cards learned!")
            }
        }
        
    }
    export default Flashcards;
    