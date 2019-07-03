import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import appReducer from '../src/reducers/index'
import thunk from 'redux-thunk'
const store = createStore(
    appReducer,
    applyMiddleware(thunk),
    
);
ReactDOM.render(
  <Provider store = {store}>
      <App />
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
