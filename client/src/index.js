import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { receiveUnauthenticated, receiveAuthenticated } from './actions/authCheck';
import './normalize.css';
import './App.css';

fetch('/api/auth/check', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json"
  },
  credentials: 'same-origin'
}).then(response => {
  if(response.status !== 200) {
    store.dispatch(receiveUnauthenticated());
  }else {
    store.dispatch(receiveAuthenticated());
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}).catch(err => {
  //render 500 page?
});
