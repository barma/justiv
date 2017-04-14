'use strict';

import {
  ACCOUNT_INFO_REQUEST, ACCOUNT_INFO_RECEIVED, ACCOUNT_INFO_NOT_FOUND, ACCOUNT_LIST_RECEIVED, ACCOUNT_LIST_SORT,
  ACCOUNT_INFO_SAVE, ACCOUNT_INFO_UPDATE, ACCOUNT_INFO_UPDATE_DONE, ACCOUNT_LIST_MORE,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_LIST_SEARCH, ACCOUNT_LIST_MORE_REQUEST, ACCOUNT_LIST_CHANGE_SELECTION,
  ACCOUNT_LIST_UPDATE_SEARCH_QUERY, ACCOUNT_LIST_REQUEST
  } from '../actions/actionTypes';
import {accounts} from './initialState';
import _isUndefined from 'lodash/isUndefined';
import _uniqBy from 'lodash/uniqBy';

export default function accountsReducer(state = accounts, action = {}) {

  switch (action.type) {

    case ACCOUNT_INFO_REQUEST:
      return Object.assign({}, state, {
        current: action.current,
        isFetching: true
      });

    case ACCOUNT_LIST_REQUEST:
      return Object.assign({}, state, {
        current: action.current,
        isFetching: true,
        all: action.all,
        totalAmount: action.totalAmount
      });

    case ACCOUNT_INFO_RECEIVED:
      return Object.assign({}, state, {
        current: action.current,
        isFetching: false
      });

    case ACCOUNT_INFO_NOT_FOUND:
      return Object.assign({}, state, {
        current: action.current,
        isFetching: false
      });

    case ACCOUNT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        all: action.all,
        isFetching: false,
        totalAmount: state.totalAmount - action.deletedAmount
      });

    case ACCOUNT_LIST_RECEIVED:
      return Object.assign({}, state, {
        all: action.all,
        totalAmount: action.totalAmount,
        isFetching: false
      });

    case ACCOUNT_LIST_SORT:
      return Object.assign({}, state, {
        all: action.all
      });

    case ACCOUNT_INFO_UPDATE_DONE:
      return Object.assign({}, state, {
        current: action.current
      });

    case ACCOUNT_LIST_SEARCH:
      return Object.assign({}, state, {
        search: action.all
      });

    case ACCOUNT_LIST_MORE: {
      let currentAccounts = state.all.slice(0);
      currentAccounts = currentAccounts.concat(action.moreAccounts);

      currentAccounts = _uniqBy(currentAccounts, 'T100C001');

      return Object.assign({}, state, {
        all: currentAccounts,
        page: action.page || state.page,
        isMoreAccountsRequested: false,
        allReceived: action.allReceived
      });
    }

    case ACCOUNT_LIST_MORE_REQUEST:
      return Object.assign({}, state, {
        isMoreAccountsRequested: true
      });

    case ACCOUNT_LIST_CHANGE_SELECTION:
      return Object.assign({}, state, {
        accountSelection: action.accountSelection,
        allReceived: false,
        page: 0
      });

    case ACCOUNT_LIST_UPDATE_SEARCH_QUERY:
      let page = !_isUndefined(action.page) ? action.page : state.page;
      let sort = action.sort || {};

      if((action.accountTypes !== state.accountTypes) || (action.accountSelection !== state.accountSelection)) {
        page = 0;
      }
      // TODO optimize ternary operator
      return Object.assign({}, state, {
        searchQuery: !_isUndefined(action.searchQuery) ? action.searchQuery : state.searchQuery,
        accountTypes: !_isUndefined(action.accountTypes) ? action.accountTypes : state.accountTypes,
        accountSelection: !_isUndefined(action.accountSelection) ? action.accountSelection : state.accountSelection,
        page,
        allReceived: !_isUndefined(action.allReceived) ? action.allReceived : state.allReceived,
        sort: {
          field: sort.field || state.sort.field,
          direction: sort.direction || state.sort.direction
        }
      });

    default:
      return state;
  }
}
