'use strict';

import { LOCALE_LIST_REQUEST, LOCALE_LIST_SUCCESS, LOCALE_CHANGE } from './actionTypes.js';
import axios from 'axios';
import { apiAddress } from '../constants';
import localeHelpers from '../helpers/localesHelpers';

import { loadPageControls } from './pageControlsActions';
import { getGlobalParams } from './globalParamsActions';

export function localesListReceived(rawLocales) {
  let locales = localeHelpers.formatLocalesList(rawLocales);

  return {
    type: LOCALE_LIST_SUCCESS,
    locales
  };
}

export function changeLocale(localeId) {
  return (dispatch, getState) => {

    let state = getState();
    let locales = localeHelpers.setActiveLocale(state.pageControls.locales, Number(localeId));

    // fetch component with needed locale
    let currentPages = state.pageControls.currentPages;
    for(let i = 0; i < currentPages.length; i++) {
      dispatch(loadPageControls(currentPages[i], localeId));
      dispatch(getGlobalParams({
        localeId
      }))
    }

    return dispatch({
      type: LOCALE_CHANGE,
      locales
    });
  };
}

export function localesListRequest() {
  return dispatch => {
    return axios.get(`${apiAddress}/global/language`)
      .then(response => {
        if(response.data) {
          dispatch(localesListReceived(response.data));
        }
        //dispatch();
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

