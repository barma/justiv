'use strict';

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_UNAUTHORIZED, SWITCH_KEEP_SESSION_ID } from './actionTypes.js';
import { changeLocale } from './localeActions';
import axios from 'axios';
import {USER_NAME, USER_PASSWORD, USER_DEFAULT_LANGUAGE, LANGUAGE_ID} from '../constants/db';
import {apiAddress} from '../constants';
import userHelpers from '../helpers/user';

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

export function receiveLogin(user, headers) {
  return (dispatch, getState) => {
    let state = getState();

    if(!state.pageControls.isLocaleChanged) {
      dispatch(changeLocale(userHelpers.getUserLocaleId(user)));
    }

    return dispatch({
      type: LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      session_id: headers.session_id,
      user
    });
  };
}

export function loginError() {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false
  };
}

export function loginUser(creds) {

  let body = {
    [USER_NAME]: creds.username,
    [USER_PASSWORD]: creds.password,
    [USER_DEFAULT_LANGUAGE]: {
      [LANGUAGE_ID]: creds.activeLocale
    }
  };

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json; charset=utf-8' }
  };
  if(creds.remember) {
    config.headers['Authorization-Remember'] = true;
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return axios.post(`${apiAddress}/authentication`, JSON.stringify(body), config)
      .then(response => {
        dispatch(receiveLogin(response.data, response.headers));
      })
      .catch(err => {
        dispatch(loginError());
        if(!err.response) {
          throw new Error('Server doesn\'t respond');
        }
        if(err.response.status >= 500) {
          throw new Error('Internal server error');
        }
        // need to display error message in form, so this error must be catch inside LoginForm element
        throw new Error(err.response.data.message || 'User not found');
      });
  };
}

export function loginUnauthorized() {

  // remove all auth data from store
  return {
    type: LOGIN_UNAUTHORIZED,
    isFetching: false,
    isAuthenticated: false,
    session_id: ''
  };
}

/**
 * @param {Boolean} isKeepSessionId
 * */
export function switchKeepSessionId(isKeepSessionId) {

  return {
    type: SWITCH_KEEP_SESSION_ID,
    keep_session_id: isKeepSessionId
  };

}

