'use strict';

import {
  LEADS_LIST_RECEIVED
  } from '../actions/actionTypes';

export default function leadsReducer(state = [], action = {}) {

  switch (action.type) {

    case LEADS_LIST_RECEIVED:
      return Object.assign({}, state, {
        all: action.all,
        totalAmount: action.totalAmount,
        isFetching: false
      });

    default:
      return state;
  }
}
