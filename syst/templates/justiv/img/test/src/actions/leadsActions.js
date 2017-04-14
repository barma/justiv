'use strict';

import {LEADS_LIST_RECEIVED} from './actionTypes';
import accountDetailsParser from '../helpers/responseParser/accountDetails';
import apiClient from '../helpers/apiClient';

// TODO make fetching of accounts and leads list from one place
/**
 * @param {String} session_id
 * */
export function getLeadsList(session_id) {
  return dispatch => {

    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    let reqUrl = `${apiClient.defaults.baseURL}/account/lead`;
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(leadListReceived(response.data, response.headers));
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

export function leadListReceived(rawLeads, headers) {
  let totalAmount = Number(headers['total-count']) || 0;

  return {
    type: LEADS_LIST_RECEIVED,
    all: accountDetailsParser.formatAccountsList(rawLeads),
    totalAmount
  };
}
