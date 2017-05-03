import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './normalize.css';
import './App.css';

import { receiveUnauthenticated, receiveAuthenticated } from './actions/authCheck';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


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
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );

}).catch(err => {
  //render 500 page?
});
















//fill reducer with default authentication state

// ReactDOM.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>,
//   document.getElementById('root')
// );
