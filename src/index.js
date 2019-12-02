import React from 'react';
import ReactDOM from 'react-dom';
import StatList from './components/StatList';
import App from './App';
import './index.css';
import store from "./js/store/index";
import { Provider } from "react-redux";




ReactDOM.render(
  <Provider store={store}>
     <App/>
  </Provider>,
 
  document.getElementById('root')

);
