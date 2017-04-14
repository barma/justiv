'use strict';

import {USER_LIST_REQUEST, USER_LIST_SUCCESS} from './actionTypes';
import apiClient from '../helpers/apiClient';

export function userListRequest() {
  return {
    type: USER_LIST_REQUEST,
    isFetching: true
  };
}

export function userListSuccess(rawUsers) {
  return {
    type: USER_LIST_SUCCESS,
    users: rawUsers
  };
}

export function getUsersList(session_id) {
  return dispatch => {

    dispatch(userListRequest());

    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    let reqUrl = `${apiClient.defaults.baseURL}/user`;
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(userListSuccess(response.data));
        }
      })
      .catch(err => {
        console.log("ERROR: ", err);
        if(err.response && err.response.status === HTTP_NOT_FOUND) {
          //dispatch(accountNotFound());
        }
      });
  };
}
