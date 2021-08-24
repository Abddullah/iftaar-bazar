// import 'babel-polyfill';
import 'react-app-polyfill/ie9';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
// import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './service-worker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register();


if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
          console.log(err)
        });
      });
    } else {
      console.log('service worker is not supported');
    }