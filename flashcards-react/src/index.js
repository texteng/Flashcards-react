import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
// import App from './App';
import Flashcards from './components/Flashcards'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <div className= "container-fluid">
        <Flashcards />
    </div>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
