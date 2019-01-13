import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../css/Flashcards.css';
import '../css/Flashcards.css';
import Flashcard from './Flashcard';
// import $ from 'jquery'

class Flashcards extends Component {
    state = {
        topic: "Animal Sounds",
        vocabularyTerms: [
            {id: 1, term: "Chicken", definition: "Cluck, Cluck"},
            {id: 2, term: "Duck", definition: "Quack, Quack"},
            {id: 3, term: "Cow", definition: "Moo!"},
            {id: 4, term: "Pig", definition: "Oink"},
            {id: 5, term: "Horse", definition: "Nay"},
        ],
        itemsLearned: [],
        wordDisplayIndex : 0,
        startWithTerm: true,
        complete: false
    }

    componentDidMount(){
        // const rightButton = document.getElementById("nav-right");
        this.side = {
          definition : document.getElementById("definition"),
          term : document.getElementById("term"),
          complete: document.getElementById("complete")
        }
        document.onkeydown = (event) =>{
            switch(event.keyCode) {
                case 37:
                    this.movetoPreviousTerm();
                  break;
                case 39:
                    this.movetoNextTerm();
                    // rightButton.click();
                    // $("nav-right").trigger('click');
                  break;
                case 40:
                case 38:
                    this.flipCard();
                break;
                case 13:
                    (this.state.itemsLearned.length < this.state.vocabularyTerms.length)? this.markAsLearned(): this.restart();
                break;
                default:
                console.log(event)
    }
    
        } 
    }
    //Right keycode 39
    //Left keycode 37
    //Enter keycode "Enter"
    
    render() {
        return (
            <React.Fragment>
            <div id="flashcard_header" className="row">
                <div className="col-12">
                    <h1>Flashcards: {this.state.topic}</h1>
                </div>
                <div className="col-12">
                    <h2>Words Learned: {this.state.itemsLearned.length}</h2>
            </div>
            </div>
            <div id="flashcards" className="row">
                <div id="flashcard_display" className = "col-10 col-sm-8 order-2">
                <Flashcard 
                    term= {this.state.vocabularyTerms[this.state.wordDisplayIndex].term}
                    definition= {this.state.vocabularyTerms[this.state.wordDisplayIndex].definition}
                        flip = {this.flipCard}
                    start = {this.state.startWithTerm}
                        onComplete = {this.restart}
                />
            </div>
                <div className="offset-sm-1 col-1 navigation order-sm-1">
                    <svg xmlns="http://www.w3.org/2000/svg" id="nav-left" viewBox="0 0 8 8" width= "4em" height= "4em" onClick={this.movetoPreviousTerm}>
                        <path d="M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z" transform="translate(1)" />
                    </svg>
            </div>
                <div className="col-1 navigation order-3">
                    <svg xmlns="http://www.w3.org/2000/svg" id="nav-right" viewBox="0 0 8 8" width= "4em" height= "4em" onClick={this.movetoNextTerm}>
                        <path d="M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" transform="translate(1)" />
                    </svg>
                </div>
            </div>
            <div className="row">
                <div className="bottomButtons col-12">
                <button className="btn btn-success" onClick={this.markAsLearned}>Mark as Learned</button>
                <button className="btn btn-success" onClick={this.resetLearned}>Reset Learned</button>
            </div>
                <div className="bottomButtons col-12">
                    <button id = "changeStartDirectionButton" 
                    className="btn btn-success" 
                    onClick={() => this.chooseDefaultSide()}>
                        Start With {this.state.startWithTerm ? "Definition" : "Term"}
                    </button>
            </div>
            </div>
            </React.Fragment>
            );
        }
        
          //Helper Functions
        flipCard = () => {
            const {term, definition} = this.side;
            if(term.classList.contains("flip")){
            definition.classList.add("flip");
            term.classList.remove("flip");
            }
            else if(definition.classList.contains("flip")){
            definition.classList.remove("flip");
            term.classList.add("flip");
        }
        
        }
        
        movetoPreviousTerm = () => {
            let previousTermIndex = (termIndex) => termIndex  === 0 ? this.state.vocabularyTerms.length - 1 : termIndex - 1;
            this.switchCards(previousTermIndex);
        }
        
        movetoNextTerm = () => {
            let nextTermIndex = (termIndex) => (termIndex + 1) >= this.state.vocabularyTerms.length ? 0 : termIndex + 1;
            this.switchCards(nextTermIndex);
        }

        switchCards = (findNewIndex) => {
            let currentState = this.state;
            const {itemsLearned, vocabularyTerms, wordDisplayIndex} = currentState;
            let newIndex = findNewIndex(wordDisplayIndex);
            if(itemsLearned.length < vocabularyTerms.length){
                for(var i = 0; i < itemsLearned.length; i++){
                    if(itemsLearned[i] === vocabularyTerms[newIndex].id){
                        newIndex = findNewIndex(newIndex);
                        i = -1;
                    }
                }
                currentState.wordDisplayIndex = newIndex;
                setTimeout(() => {this.setState(currentState)}, this.flipToDefaultSide() ? 400 : 0);
            }
            else{
                console.log("All cards learned!")
            }
        }
        
        flipToDefaultSide = () => {
            const {term, definition} = this.side;
            const {startWithTerm} = this.state;
            let defaultFront = startWithTerm ? term : definition;
            let defaultBack = startWithTerm ? definition : term; 
            if(defaultFront.classList.contains("flip")){
                defaultBack.classList.add("flip");
                defaultFront.classList.remove("flip");
                return true;
            }
            return false;
        }
        

        markAsLearned = () => {
            let currentState = this.state;
            const {term, definition, complete} = this.side;
            currentState.itemsLearned.push(this.state.vocabularyTerms[this.state.wordDisplayIndex].id);
            if(currentState.itemsLearned.length < currentState.vocabularyTerms.length){
                this.movetoNextTerm();
            }
            else{
                term.classList.add("d-none");
                definition.classList.add("d-none");
                complete.classList.remove("d-none");
                this.setState(currentState);
                    }
                }
        
        resetLearned = () => {
            let currentState = this.state;
            currentState.itemsLearned = [];
            currentState.wordDisplayIndex = 0;
            this.flipToDefaultSide();
                    this.setState(currentState);
            }

        chooseDefaultSide = () => {
            let currentState = this.state;
            currentState.startWithTerm = !currentState.startWithTerm;
            this.setState(currentState);
            this.flipToDefaultSide();
        }
        
        restart = () => {
            const {term, definition, complete} = this.side;
            this.resetLearned();

            term.classList.remove("d-none");
            definition.classList.remove("d-none");
            complete.classList.add("d-none");

        }
    }
    export default Flashcards;
    

    