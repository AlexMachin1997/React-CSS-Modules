import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //AApp.js file componen 
import registerServiceWorker from './registerServiceWorker';

//REACTDOM then uses the APP component and then finds the ID root, which is on index.html
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
