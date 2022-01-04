import React from 'react';
import ReactDOM from 'react-dom';
import 'react-bootstrap'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { SocketContext,socket } from './contexts/SocketContext';
//CSS IMPORTS HERE
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.css'
import './assets/css/bootstrap-5.0.0-beta1.min.css'
import './assets/css/glightbox.min.css'
import './assets/css/LineIcons.2.0.css'
import './assets/css/main.css'
import './assets/css/main.css.map'
import './assets/css/tiny-slider.css'
import './css/taskmanagement.css'
import './css/board.css'
import 'react-bootstrap'


ReactDOM.render(
  <SocketContext.Provider value={socket}>
  <Provider store={store}>
    <App />
  </Provider>
  </SocketContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
