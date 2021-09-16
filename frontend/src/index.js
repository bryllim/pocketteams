import React from 'react';
import ReactDOM from 'react-dom';
import 'react-bootstrap'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
//CSS IMPORTS HERE
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets_pocketdevs/assets/css/animate.css'
import './assets_pocketdevs/assets/css/bootstrap-5.0.0-beta1.min.css'
import './assets_pocketdevs/assets/css/glightbox.min.css'
import './assets_pocketdevs/assets/css/LineIcons.2.0.css'
import './assets_pocketdevs/assets/css/main.css'
import './assets_pocketdevs/assets/css/main.css.map'
import './assets_pocketdevs/assets/css/tiny-slider.css'
//CSS IMPORTS HERE

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
