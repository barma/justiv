'use strict';

import {
  ACCOUNT_INFO_REQUEST, ACCOUNT_INFO_RECEIVED, ACCOUNT_INFO_NOT_FOUND, ACCOUNT_LIST_RECEIVED, ACCOUNT_LIST_SORT,
  ACCOUNT_INFO_SAVE, ACCOUNT_INFO_SAVE_DONE, ACCOUNT_INFO_UPDATE, ACCOUNT_INFO_UPDATE_DONE,
  ACCOUNT_DELETE, ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_LIST_SEARCH, ACCOUNT_LIST_MORE, ACCOUNT_LIST_MORE_REQUEST, ACCOUNT_LIST_CHANGE_SELECTION,
  ACCOUNT_LIST_UPDATE_SEARCH_QUERY, ACCOUNT_LIST_REQUEST
  } from './actionTypes.js';
import {
  HTTP_NOT_FOUND,
  DATE_PATTERN_DAY_CREATED, DATE_PATTERN_TIME_CREATED,
  SORT_DIRECTION_ASC, SORT_DIRECTION_DESC} from '../constants';
import {ACCOUNT_BIRTH_DATE, ACCOUNT_ASSIGNED_ID, ACCOUNTS_FIELDS_TO_SAVE, ACCOUNT_TYPE_TABLE} from '../constants/db';
import apiClient from '../helpers/apiClient';
import communicationsHelpers from '../helpers/communicationsHelpers';
import accountDetailsParser from '../helpers/responseParser/accountDetails';
import accountHelpers from '../helpers/account';
import crmParamsHelpers from '../helpers/crmParams';
import timeHelpers from '../helpers/timeHelpers';
import _orderBy from 'lodash/orderBy';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import _each from 'lodash/each';

export function accountInfoReceived(rawAccountData, accountId) {

  // prepare empty account object with enabled status
  if(_isEmpty(rawAccountData)) {
    return {
      type: ACCOUNT_INFO_RECEIVED,
      current: {
        T100C023: "1"
      }
    };
  }

  let sortedAcc = accountHelpers.sortAccountItems(rawAccountData);

  let current = Object.assign({}, sortedAcc, {
    notFound                    : false,
    // TODO rework this methods in future
    fullName                    : accountDetailsParser.getFullName(rawAccountData),
    createdDay                  : accountDetailsParser.getCreatedDate(rawAccountData, DATE_PATTERN_DAY_CREATED),
    createdTime                 : accountDetailsParser.getCreatedDate(rawAccountData, DATE_PATTERN_TIME_CREATED),
    createdBy                   : accountDetailsParser.getCreatedBy(rawAccountData),
    isBlacklisted               : accountDetailsParser.isBlacklisted(rawAccountData)
  });

  return {
    type: ACCOUNT_INFO_RECEIVED,
    current
  };
}

/**
 * @param {Array} rawAccountData
 * @param {Object} headers
 * */
export function accountListReceived(rawAccountData, headers) {

  let totalAmount = Number(headers['total-count']) || 0;

  return {
    type: ACCOUNT_LIST_RECEIVED,
    all: accountDetailsParser.formatAccountsList(rawAccountData),
    totalAmount
  };
}

export function updateAccountInfo(currentAccount, key, value) {

  // format birth date
  if(key === ACCOUNT_BIRTH_DATE) {
    //value = timeHelpers.parseTime(value, DATE_PATTERN_DAY_CREATED);
    //
    //if(!value) return {
    //  type: ACCOUNT_INFO_UPDATE_DONE,
    //  current: currentAccount
    //};
  }

  let current = Object.assign({}, currentAccount, {
    [key]: value
  });

  return {
    type: ACCOUNT_INFO_UPDATE_DONE,
    current
  };
}

/**
 * @param {String} session_id
 * @param {Object} account
 * @param {String} accountType
 * */
export function saveAccountInfo(session_id, account, accountType) {
  return (dispatch, getState) => {
    let store = getState();

    let config = {
      headers: {
        'SESSION_ID': session_id,
        'Content-Type':'application/json; charset=utf-8'
      }
    };

    let acc = Object.assign({}, account);
    let filteredAccount = _pick(acc, ACCOUNTS_FIELDS_TO_SAVE);
    filteredAccount = _omit(filteredAccount, _isUndefined);

    // TODO BRING THIS LOGIC INTO VALIDATE MODULE

    if(filteredAccount.T101 && filteredAccount.T101.length) {
      filteredAccount.T101 = _filter(filteredAccount.T101, address => {
        if(!(!address.T101C005 && !address.T101C006 && !address.T101C007 && !address.T101C008 && !address.T101C009 && !address.T101C010 && !address.T101C011)) return true;
      });
    }

    /**
     * Validate external Id without codes
     * */
    if(filteredAccount.T107) {
      if(filteredAccount.T107.length) {
        if(!filteredAccount.T107[0].T107C004 || !filteredAccount.T107[0].T107C005) {
          filteredAccount.T107 = [];
        }
      }
    }
    /**
     * This code will be deleted when menu for selecting account type will be implemented
     * */
    if(!filteredAccount[ACCOUNT_TYPE_TABLE]) {
      let type = crmParamsHelpers.findByCode(store.crmParams.keys, accountType);

      filteredAccount[ACCOUNT_TYPE_TABLE] = [{
        T110C003: {
          T001C001: type.T001C001,
          T001C003: accountType
        }
      }];
    }
    /**
     * workaround: remove util key from T110
     * */
    _each(filteredAccount.T110, accType => {
      if(accType._category) delete accType._category;
    });

    _each(filteredAccount, (value, tableNumber) => {
      if(tableNumber.indexOf('T100') !== -1) {
        if(filteredAccount[tableNumber] == null) {
          filteredAccount[tableNumber] = -1924992000000;
        }
      }
    });

    //dispatch(requestAccountInfo());

    let reqUrl = `${apiClient.defaults.baseURL}/account/save`;
    return apiClient.post(reqUrl, JSON.stringify(filteredAccount), config)
      .then(response => {
        if(response.data) {
          //dispatch(accountInfoSaved(response.data));
          //dispatch({
          //  type: ACCOUNT_INFO_SAVE_DONE,
          //  current: response.data
          //});
          return Promise.resolve(response.data);
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        dispatch({
          type: ACCOUNT_INFO_SAVE_DONE
        });
      });
  };
}

export function accountInfoSaved() {

}

export function accountNotFound() {
  return {
    type: ACCOUNT_INFO_NOT_FOUND,
    current: {
      notFound: true
    }
  };
}

export function requestAccountInfo() {
  return {
    type: ACCOUNT_LIST_REQUEST,
    current: {
      notFound: false
    },
    all: [],
    totalAmount: 0
  };
}

function getAccountRequest() {
  return {
    type: ACCOUNT_INFO_REQUEST,
    current: {
      notFound: false
    }
  };
}

export function getAccountInfo(accountId, session_id) {
  return dispatch => {

    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    dispatch(getAccountRequest());

    let reqUrl = `${apiClient.defaults.baseURL}/account/${accountId}`;
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(accountInfoReceived(response.data, accountId));
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        if(err.response && err.response.status === HTTP_NOT_FOUND) {
          //
        }
      });
  };
}

/**
 * @param {String} session_id
 * @param {String} [url] optional
 * */
export function getAccountList(session_id, accountCategory, url = '/account', code = '') {
  return (dispatch, getState) => {
    let state = getState();

    dispatch(requestAccountInfo());

    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    //let reqUrl = apiClient.defaults.baseURL + url;
    let reqUrl = `${apiClient.defaults.baseURL}${url}?${accountCategory}=${code}&fieldsSort=${state.accounts.sort.field}&directionsSort=${state.accounts.sort.direction}`;

    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(accountListReceived(response.data, response.headers));
        }
      })
      .catch(err => {
        console.log("ERROR: ", err);
        if(err.response && err.response.status === HTTP_NOT_FOUND) {
          //dispatch(accountNotFound());
        }
        throw new Error(err);
      });
  };
}

/**
 * @param {String} session_id
 * @param {Number} page
 * */
export function showMoreAccounts(session_id, page, url = '/account', accountType = 'ACC_SEARCH_A_TYPE', accountCategory = 'ACC_LISTBOX') {
  return (dispatch, getState) => {
    let state = getState();

    dispatch(moreAccountsRequest());

    // TODO bring accounts fetch logic into specific helper/service (check getAccountInfo method for repeat code)
    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    let reqUrl = `${apiClient.defaults.baseURL}${url}?page=${page}&search_line=${state.accounts.searchQuery}&${accountType}=${state.accounts.accountTypes}&${accountCategory}=${state.accounts.accountSelection}`;
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(moreAccountReceived(response.data, page));
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

function moreAccountReceived(rawAccountData, page) {

  let allReceived = false;
  if(!rawAccountData.length) {
    page = null;
    allReceived = true;
  }

  return {
    type: ACCOUNT_LIST_MORE,
    moreAccounts: accountDetailsParser.formatAccountsList(rawAccountData),
    page,
    allReceived
  };
}

function moreAccountsRequest() {
  return {
    type: ACCOUNT_LIST_MORE_REQUEST
  };
}

/**
 * @param {Array} accountsList
 * @param {String} key
 * @param {String} direction
 * */
export function sortAccountList(accountsList, direction, control) {
  if([SORT_DIRECTION_ASC, SORT_DIRECTION_DESC].indexOf(direction) === -1) {
    throw new Error("Wrong order direction");
  }

  /**
   * TEMPORARY WORKAROUND NEED TO DELETE THIS AFTER
   * SERVER SIDE SORTING WILL IMPLEMENTED
   * */
  let sorted = _orderBy(accountsList, (account) => {
    switch(control.T006C017) {
      case 'T100':
        return account[control.T006C017 + control.T006C018];
      case 'T102':
        return account[control.T006C017 + control.T006C018];
      case 'T107':
        data = account.T107[0];
        if(data) {
          return data.T107C003;
        }
        break;
      case 'T113':
        data = account.T113[0];
        if(data) {
          return data.T113C003;
        }
        break;
      case 'T114':
        data = account.T114[0];
        if(data) {
          return data.T114C003;
        }
        break;
      case 'T115':
        let data = account.T115[0];
        if(data && data.T115C003) {
          return data.T115C003.T001C004;
        }
        break;
      case 'T120':
        data = account.T120[0];
        if(data) {
          return data.T120C003.T012C002;
        }
    }
  }, [direction]);

  // if(table === 'T107') {
  //   sorted = _orderBy(accountsList, (account) => {
  //     let data = account.T107[0];
  //     if(data) {
  //       return data.T107C003;
  //     }
  //   }, [direction]);
  // } else if(table === 'T113') {
  //   sorted = _orderBy(accountsList, (account) => {
  //     let data = account.T113[0];
  //     if(data) {
  //       return data.T113C003;
  //     }
  //   }, [direction]);
  // } else if(table === 'T114') {
  //   sorted = _orderBy(accountsList, (account) => {
  //     let data = account.T114[0];
  //     if(data) {
  //       return data.T114C003;
  //     }
  //   }, [direction]);
  // } else if(table === 'T115') {
  //   sorted = _orderBy(accountsList, (account) => {
  //     let data = account.T115[0];
  //     if(data) {
  //       return data.T115C003;
  //     }
  //   }, [direction]);
  // } else if(table === 'T120') {
  //   sorted = _orderBy(accountsList, (account) => {
  //     let data = account.T120[0];
  //     if(data) {
  //       return data.T120C003.T012C002;
  //     }
  //   }, [direction]);
  // } else {
  //   sorted = _orderBy(accountsList, [key], [direction]);
  // }

  return {
    type: ACCOUNT_LIST_SORT,
    all: sorted
  };

}

// TODO remove unused actions and combine actions with repetitive functionality
export function sortAccounts(session_id, fieldsSort, direction, url = '/account', accountType = 'ACC_SEARCH_A_TYPE', accountCategory = 'ACC_LISTBOX') {
  return (dispatch, getState) => {
    let state = getState();

    // TODO bring accounts fetch logic into specific helper/service (check getAccountInfo method for repeat code)
    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    let reqUrl = `${apiClient.defaults.baseURL}${url}?page=${state.accounts.page}&search_line=${state.accounts.searchQuery}&${accountType}=${state.accounts.accountTypes}&${accountCategory}=${state.accounts.accountSelection}&fieldsSort=${fieldsSort}&directionsSort=${direction}`;
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(accountListReceived(response.data, response.headers));
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

/**
 * @param {String} session_id
 * @param {String} url
 * @param {String} accountType
 * @param {String} accountCategory
 * @param {Object} opts
 * */
export function searchAccounts(session_id, url, accountType, accountCategory, opts) {
  opts = opts || {};

  return (dispatch, getState) => {
    let state = getState();

    let config = {
      headers: { 'SESSION_ID': session_id }
    };

    let reqUrl;

    if(opts.amount) {
      reqUrl = `${apiClient.defaults.baseURL}${url}?pageSize=${opts.amount}&search_line=${state.accounts.searchQuery}&${accountType}=${state.accounts.accountTypes}&${accountCategory}=${state.accounts.accountSelection}`;
    } else {
      reqUrl = `${apiClient.defaults.baseURL}${url}?page=${state.accounts.page}&search_line=${state.accounts.searchQuery}&${accountType}=${state.accounts.accountTypes}&${accountCategory}=${state.accounts.accountSelection}&fieldsSort=${state.accounts.sort.field}&directionsSort=${state.accounts.sort.direction}`;
    }

    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          if(opts.newAccount) {
            response.data.push(opts.newAccount);
          }
          dispatch(accountListReceived(response.data, response.headers));
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

function saveNewAccountsSelection(code) {
  return {
    type: ACCOUNT_LIST_CHANGE_SELECTION,
    accountSelection: code
  };
}

export function updateSearchQuery(opts) {
  return {
    type: ACCOUNT_LIST_UPDATE_SEARCH_QUERY,
    searchQuery: opts.query,
    accountTypes: opts.types,
    accountSelection: opts.accountSelection,
    page: opts.page,
    sort: opts.sort
  };
}

export function resetSearchQuery() {
  return {
    type: ACCOUNT_LIST_UPDATE_SEARCH_QUERY,
    searchQuery: '',
    accountTypes: '',
    accountSelection: '',
    page: 0,
    allReceived: false
  };
}


/**
 * @param {String} session_id
 * @param {String} ids - one or comma separated multiple ids
 * */
export function accountDelete(session_id, ids) {
  return (dispatch, getState) => {

    let body = accountHelpers.prepareAccountListToDelete(ids);

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("DELETE", `${apiClient.defaults.baseURL}/account`);
    xmlhttp.setRequestHeader("SESSION_ID", session_id);
    xmlhttp.setRequestHeader("Content-Type", 'application/json');

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if(xmlhttp.status == 200){
          console.log('Response: ' + xmlhttp.responseText);

          let state = getState();
          dispatch(accountDeleteSuccess(ids, state.accounts.all));

        } else {
          console.log('Error: ' + xmlhttp.statusText );
        }
      }
    };

    xmlhttp.send(JSON.stringify(body));

    // dispatch request event after sending
    // dispatch(requestAccountInfo());
  };
}

function accountDeleteSuccess(ids, allAccounts) {
  let idArray = ids.split(',');
  let filteredAccounts = _filter(allAccounts, account => {
    return idArray.indexOf(account[ACCOUNT_ASSIGNED_ID]) === -1;
  });

  return {
    type: ACCOUNT_DELETE_SUCCESS,
    all: filteredAccounts,
    deletedAmount: idArray.length
  };
}

//export function setAccountDefaults(account) {
//  return {
//    type: ACCOUNT_INFO_UPDATE_DONE,
//    current: account
//  };
//}
