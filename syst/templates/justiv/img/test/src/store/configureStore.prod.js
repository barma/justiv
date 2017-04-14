'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const routingMiddleware = routerMiddleware(browserHistory);

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      autoRehydrate(),
      applyMiddleware(thunk, routingMiddleware)
    )
  );
}

const store = configureStore();

export default store;
