'use strict';

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_UNAUTHORIZED, SWITCH_KEEP_SESSION_ID} from '../actions/actionTypes';
import {auth} from './initialState';

export default function authReducer(state = auth, action = {}) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        session_id: action.session_id,
        user: action.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    case LOGIN_UNAUTHORIZED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.isAuthenticated,
        session_id: action.session_id
      });
    case SWITCH_KEEP_SESSION_ID:
      return Object.assign({}, state, {
        keep_session_id: action.keep_session_id
      });

    default:
      return state;
  }
}
