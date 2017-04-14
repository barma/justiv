'use strict';

import {PAGE_CONTROLS_REQUEST, PAGE_CONTROLS_SUCCESS, PAGE_ACCOUNT_DETAILS_CONTROLS_SUCCESS, PAGE_ACCOUNTS_OVERVIEW_CONTROLS_SUCCESS, PAGE_LEADS_OVERVIEW_CONTROLS_SUCCESS,
  PAGE_OVERVIEW_CONTROLS_SUCCESS
  } from './actionTypes';
import {
  GLOBAL_CRM_PARAMS_TABLE,
  ACCOUNTS_COUNT, ACCOUNTS_SELECTION_DROPDOWN_BOX, SEARCH_ACCOUNT_TYPE_LIST_BOX, SEARCH_BOX_PLACEHOLDER, ACCOUNT_FILTER_BY_LIST_BOX,
  SELECT_ALL_LIST_BOX,
  LANG_PARAM, ACCOUNTS_OVERVIEW_SCREEN, CONTROL_TEXT
  } from '../constants';
import {LEADS_OVERVIEW_SCREEN,
  BUTTON, LABEL, ALERT, LISTBOX
  } from '../constants/controlTypes';
import {ACCOUNT_DETAILS_ACCOUNT_TYPE_LABEL} from '../constants/db';
import axios from 'axios';
import apiClient from '../helpers/apiClient';
import {LoginControlReceived} from './pageLoginActions';
import pageControlsHelpers from '../helpers/pageControlsHelpers/index';
import headerControlsHelpers from '../helpers/pageControlsHelpers/header';
import accountDetailsControlsHelpers from '../helpers/pageControlsHelpers/accountDetails';

import {selectOptionReceived} from './selectOptionsActions';
import _filter from 'lodash/filter';

export function HeaderControlReceived(rawItems) {

  let sortedItems = pageControlsHelpers.sortByTypes(rawItems);
  let menuItems = headerControlsHelpers.formMenuTree(sortedItems);
  let logoLabel = pageControlsHelpers.getPrimaryLabel(sortedItems);

  let headerControls = headerControlsHelpers.formHeaderControls(rawItems);

  return {
    type: PAGE_CONTROLS_SUCCESS,
    header: {
      logo: { label: logoLabel },
      menuItems: menuItems,
      authorizedNavigation: '' // avatar and + button
    },
    isLoading: false
  };
}

function AccountDetailsControlReceived(rawItems) {
  //console.log(JSON.stringify(rawItems));

  let sortedItems = pageControlsHelpers.sortByTypes(rawItems);

  let panels = accountDetailsControlsHelpers.formPanels(sortedItems);

  let accountType = pageControlsHelpers.getElementByNumber(sortedItems, LISTBOX, 10101018);

  return {
    type: PAGE_ACCOUNT_DETAILS_CONTROLS_SUCCESS,
    accountDetails: {
      cancelBtn:            pageControlsHelpers.getElement(sortedItems, BUTTON, 'Cancel Button')[CONTROL_TEXT],
      saveBtn:              pageControlsHelpers.getElement(sortedItems, BUTTON, 'Save Button')[CONTROL_TEXT],
      labelAccountCreated:  pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1014')[CONTROL_TEXT],
      labelCreatedBy:       pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1015')[CONTROL_TEXT],
      labelAccountId:       pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1017')[CONTROL_TEXT],
      labelValueRating:     pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1030')[CONTROL_TEXT],
      cancelPopupMessage:   pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101901)[CONTROL_TEXT],
      savePopupMessage:     pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101902)[CONTROL_TEXT],
      nameInsertPopup:      pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101903)[CONTROL_TEXT],
      accountType: {
        label: accountType[CONTROL_TEXT],
        input: accountType
      },
      sections: panels
    },
    isLoading: false
  };
}

function detailsControlReceived(rawControls, rawSelectOptions) {
  let sortedItems = pageControlsHelpers.sortByTypes(rawControls);

  let panels = accountDetailsControlsHelpers.formPanels(sortedItems, rawSelectOptions);

  let accountType = pageControlsHelpers.getElementByNumber(sortedItems, LISTBOX, 10101018);

  return {
    type: PAGE_ACCOUNT_DETAILS_CONTROLS_SUCCESS,
    accountDetails: {
      cancelBtn:            pageControlsHelpers.getElement(sortedItems, BUTTON, 'Cancel Button')[CONTROL_TEXT],
      saveBtn:              pageControlsHelpers.getElement(sortedItems, BUTTON, 'Save Button')[CONTROL_TEXT],
      labelAccountCreated:  pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1014')[CONTROL_TEXT],
      labelCreatedBy:       pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1015')[CONTROL_TEXT],
      labelAccountId:       pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1017')[CONTROL_TEXT],
      labelValueRating:     pageControlsHelpers.getElement(sortedItems, LABEL, 'Label for 1010 1030')[CONTROL_TEXT],
      cancelPopupMessage:   pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101901)[CONTROL_TEXT],
      savePopupMessage:     pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101902)[CONTROL_TEXT],
      nameInsertPopup:      pageControlsHelpers.getElementByNumber(sortedItems, ALERT, 10101903)[CONTROL_TEXT],
      accountType: {
        label: accountType[CONTROL_TEXT],
        input: accountType
      },
      sections: panels
    },
    isLoading: false
  };
}

function LeadsOverviewPageControlsReceived(rawItems) {
  return {
    type: PAGE_LEADS_OVERVIEW_CONTROLS_SUCCESS
  };
}

function AccountOverviewPageControlReceived(rawItems) {
  let sortedItems = pageControlsHelpers.sortByTypes(rawItems);

  return dispatch => {

    return dispatch({
      type: PAGE_ACCOUNTS_OVERVIEW_CONTROLS_SUCCESS,
      [ACCOUNTS_OVERVIEW_SCREEN]: {
        isReceived: true,
        accountSelectionDropdown: {
          items: pageControlsHelpers.getMenuItems(rawItems, ACCOUNTS_SELECTION_DROPDOWN_BOX, GLOBAL_CRM_PARAMS_TABLE)
        },
        searchAccountTypeDropdown: {
          items: pageControlsHelpers.getMenuItemsWithTags(rawItems, SEARCH_ACCOUNT_TYPE_LIST_BOX, GLOBAL_CRM_PARAMS_TABLE)
        },
        filterByDropdown: {
          header: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10001323)[CONTROL_TEXT],
          items: pageControlsHelpers.getMenuItems(rawItems, ACCOUNT_FILTER_BY_LIST_BOX, GLOBAL_CRM_PARAMS_TABLE)
        },
        accountsLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, ACCOUNTS_COUNT)[CONTROL_TEXT],
        searchTypeBtn: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10002010)[CONTROL_TEXT],
        searchPlaceholder: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, SEARCH_BOX_PLACEHOLDER)[CONTROL_TEXT],
        filterByLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10001321)[CONTROL_TEXT],
        allLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10002010)[CONTROL_TEXT],
        actionsTooltip: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10002012)[CONTROL_TEXT],
        columnsTooltip: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10002114)[CONTROL_TEXT],
        detailsControls: _filter(rawItems, item => item.T006C001 > 10100000),
        selectAllListBox: {
          items: pageControlsHelpers.getMenuItems(rawItems, SELECT_ALL_LIST_BOX, GLOBAL_CRM_PARAMS_TABLE)
        },
        columnSelectionLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, 10002121)[CONTROL_TEXT]
      }
    });
  };

}

export function loadDetailsPageControls(page_id, session_id, select_options_type) {

  let controlsRequestUrl = `${apiClient.defaults.baseURL}/control/${page_id}`;
  let selectOptionsRequestUrl = `${apiClient.defaults.baseURL}/selectoption?T001C017=${select_options_type}`;

  let config = {};
  if(session_id) {
    config.headers = { 'SESSION_ID': session_id };
  }
  return dispatch => {
    return axios.all([
      apiClient.get(controlsRequestUrl, config),
      apiClient.get(selectOptionsRequestUrl, config)
    ])
      .then(response => {
        let controls = response[0];
        let selectOptions = response[1];

        if(controls.data && selectOptions.data) {
          dispatch(detailsControlReceived(controls.data, selectOptions.data));
          dispatch(selectOptionReceived(selectOptions.data, select_options_type));
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

/**
 * @param {Number} pageId
 * @param {Number} lg
 * @param {String} session_id
 * @param {Object} meta
 * */
export function loadPageControls(pageId, lg, session_id, meta) {

  let reqUrl = `${apiClient.defaults.baseURL}/control/${pageId}`;

  if(lg !== null) {
    reqUrl += `?${LANG_PARAM}=${lg}`;
  }

  let config = {};

  if(session_id) {
    config.headers = { 'SESSION_ID': session_id };
  }

  return dispatch => {
    return apiClient.get(reqUrl, config)
      .then(response => {
        if(response.data) {
          dispatch(controlsMap[pageId](response.data, pageId, meta));
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

/**
 * @param {Array} rawItems
 * @param {Number} [pageId] optional
 * @param {Object} meta
 * */
function overviewControlsReceived(rawItems, pageId, meta) {
  let sortedItems = pageControlsHelpers.sortByTypes(rawItems);

  // workaround, need replace it on more elegant solution
  if(pageId) {
    pageId = String(pageId);
  }

  return dispatch => {

    return dispatch({
      type: PAGE_OVERVIEW_CONTROLS_SUCCESS,
      pageId,
      controls: {
        isReceived: true,
        accountSelectionDropdown: {
          id: pageId + 1120,
          items: pageControlsHelpers.getMenuItems(rawItems, pageId + 1120, GLOBAL_CRM_PARAMS_TABLE)
        },
        searchAccountTypeDropdown: {
          items: pageControlsHelpers.getMenuItemsWithTags(rawItems, pageId + 1222, GLOBAL_CRM_PARAMS_TABLE, meta)
        },
        filterByDropdown: {
          header: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 1323)[CONTROL_TEXT],
          items: pageControlsHelpers.getMenuItems(rawItems, pageId + 1322, GLOBAL_CRM_PARAMS_TABLE)
        },
        accountsLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 1111)[CONTROL_TEXT],
        searchTypeBtn: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 2010)[CONTROL_TEXT],
        searchPlaceholder: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 1230)[CONTROL_TEXT],
        filterByLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 1321)[CONTROL_TEXT],
        allLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 2010)[CONTROL_TEXT],
        actionsTooltip: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 2012)[CONTROL_TEXT],
        columnsTooltip: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 2114)[CONTROL_TEXT],
        detailsControls: _filter(rawItems, item => item.T006C001 > 10100000 && item.T006C001 < 11000000),
        selectAllListBox: {
          items: pageControlsHelpers.getMenuItems(rawItems, pageId + 2020, GLOBAL_CRM_PARAMS_TABLE)
        },
        columnSelectionLabel: pageControlsHelpers.getElementByNumber(sortedItems, LABEL, pageId + 2121)[CONTROL_TEXT]
      }
    });
  };
}

let controlsMap = {
  9000: HeaderControlReceived,
  9001: LoginControlReceived,
  [ACCOUNTS_OVERVIEW_SCREEN]: overviewControlsReceived,
  [LEADS_OVERVIEW_SCREEN]: overviewControlsReceived,
  1010: AccountDetailsControlReceived
};

