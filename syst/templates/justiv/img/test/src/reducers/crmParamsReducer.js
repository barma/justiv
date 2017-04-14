'use strict';

import {CRM_PARAMS_REQUEST, CRM_PARAMS_RECEIVED} from '../actions/actionTypes';
import {crmParams} from './initialState';

export default function authReducer(state = crmParams, action ={}) {

  switch (action.type) {

    case CRM_PARAMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        keys: action.keys
      });

    case CRM_PARAMS_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        keys: action.keys
      });

    default:
      return state;
  }
}
