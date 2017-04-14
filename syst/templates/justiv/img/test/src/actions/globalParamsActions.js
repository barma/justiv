'use strict';

import {CRM_PARAMS_REQUEST, CRM_PARAMS_RECEIVED} from './actionTypes';
import {HTTP_NOT_FOUND} from '../constants';
import axios from 'axios';
import apiClient from '../helpers/apiClient';
import _isArray from 'lodash/isArray';
import _each from 'lodash/each';
import _uniq from 'lodash/uniq';

export function globalParamsRequested() {
  return {
    type: CRM_PARAMS_REQUEST
  };
}

export function getGlobalParams(options, parameter) {
  let params = _isArray(parameter) ? _uniq(parameter) : [parameter];

  let config = {};
  if(options.sessionId) {
    config.headers = { 'SESSION_ID': options.sessionId };
  }

  return dispatch => {
    dispatch(globalParamsRequested());

      //let reqUrl = `${apiClient.defaults.baseURL}/global/crmparam?${column}=${param}`;
    let reqUrl = `${apiClient.defaults.baseURL}/global/crmparam?T001C016=ACCOUNT_TYPE,ACC_COUNTRY,ACC_LAN,ACC_GENDER,ACC_MARITAL,ACC_TITLE,ACCOUNT_FLAG,SOURCE,ARCHIVE,CLASSIFICATION,PREFERENCES,ACC_STATUS,COMPANY,CONTACT,ADDRESS,COMMUNICATION_TYPE,ACCOUNT_TYPE,EXTERNAL_ID&T001C017=UPDATE_LEAD`;

    if(options.localeId) {
      reqUrl += '&T004C001=' + options.localeId;
    }

    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch({
            type: CRM_PARAMS_RECEIVED,
            keys: response.data
          });
        }
      })
      .catch(err => {
        if(err.response.status === HTTP_NOT_FOUND) {
          console.log("Error: ", err.response);
        }
      });
  }
}


