'use strict';

import {
  SELECT_OPTIONS_REQUEST, SELECT_OPTIONS_RECEIVED,
  SELECT_OPTION_REQUEST, SELECT_OPTION_RECEIVED,
  SELECT_OPTION_LIST_UPDATE, SELECT_OPTIONS_UPDATE_SUCCESS
  } from './actionTypes';
import {
  GLOBAL_CRM_PARAMETER_TYPE
  } from '../constants';
import apiClient from '../helpers/apiClient';
import selectOptionHelpers from '../helpers/selectOption';

/**
 * @param {Array} rawData
 * @param {String} type
 * */
export function selectOptionReceived(rawData, type) {

  return {
    type: SELECT_OPTIONS_RECEIVED,
    data: {
      type,
      selectOptions: selectOptionHelpers.sortSelectOptions(rawData)
    },
    isFetching: false
  };
}

/**
 * @param {String} session_id
 * @param {String} type
 * */
export function getSelectOption(session_id, type) {
  return dispatch => {

    let config = {
      headers: {
        'SESSION_ID': session_id,
        'Content-Type':'application/json; charset=utf-8'
      }
    };

    let reqUrl = `${apiClient.defaults.baseURL}/selectoption?${GLOBAL_CRM_PARAMETER_TYPE}=${type}`;

    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(selectOptionReceived(response.data, type));
        }
      })
      .catch(err => {
        console.log("Error", err);
        throw new Error("Error on requesting select options");
        // If there was a problem, we want to
        // dispatch the error condition
        //dispatch();
      });
  };
}

function singleSelectOptionRequested(selectOption, type) {
  return {
    type: SELECT_OPTION_REQUEST,
    data: {
      selectOption,
      type
    }
  };
}

function singleSelectOptionSuccess(selectOption, type, existingSelectOption) {
  return {
    type: SELECT_OPTION_RECEIVED,
    data: {
      selectOption,
      type,
      existingSelectOption
    }
  };
}

/**
 * @param {String} session_id
 * @param {Object} selectOption
 * @param {String} selectOptionsType
 * @param {Object=} existingSelectOption
 * */
export function modifySelectOption(session_id, selectOption, selectOptionsType, existingSelectOption) {
  return dispatch => {

    //dispatch(singleSelectOptionRequested(selectOption[0], selectOptionsType));

    let config = {
      headers: {
        'SESSION_ID': session_id,
        'Content-Type':'application/json; charset=utf-8'
      }
    };

    let reqUrl = `${apiClient.defaults.baseURL}/selectoption/save`;

    return apiClient.post(reqUrl, JSON.stringify(selectOption), config)
      .then(response => {
        if(response.data) {
          if(selectOptionsType) {
            dispatch(singleSelectOptionSuccess(response.data[0], selectOptionsType, existingSelectOption));
          }
        }
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
        // If there was a problem, we want to
        // dispatch the error condition
        //dispatch();
      });
  };
}

export function modifySelectOptionList(session_id, selectOption, selectOptionsType) {
  return dispatch => {

    let config = {
      headers: {
        'SESSION_ID': session_id,
        'Content-Type':'application/json; charset=utf-8'
      }
    };

    let reqUrl = `${apiClient.defaults.baseURL}/selectoption/save`;

    return apiClient.post(reqUrl, JSON.stringify(selectOption), config)
      .then(response => {
        if(response.data) {
          dispatch(updateSelectOptionListSuccess(response.data, selectOptionsType));
        }
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
        // If there was a problem, we want to
        // dispatch the error condition
        //dispatch();
      });
  };
}

export function updateSelectOptionList(selectOption, selectOptionType) {
  return {
    type: SELECT_OPTION_LIST_UPDATE,
    data: {
      selectOption,
      type: selectOptionType
    }
  };
}

export function updateSelectOptionListSuccess(selectOptions, selectOptionType) {
  return {
    type: SELECT_OPTIONS_UPDATE_SUCCESS,
    data: {
      selectOptions,
      type: selectOptionType
    }
  };
}
