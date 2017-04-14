'use strict';

import {
  LOCALE_LIST_REQUEST, LOCALE_LIST_SUCCESS, LOCALE_CHANGE,
  PAGE_CONTROLS_REQUEST, PAGE_CONTROLS_SUCCESS,
  PAGE_LOGIN_CONTROLS_SUCCESS,
  PAGE_ACCOUNT_DETAILS_CONTROLS_SUCCESS,
  PAGE_ACCOUNTS_OVERVIEW_CONTROLS_SUCCESS,
  PAGE_OVERVIEW_CONTROLS_SUCCESS
  } from '../actions/actionTypes';
import {ACCOUNTS_OVERVIEW_SCREEN} from '../constants';
import controls from './initialState/controls';
import localeHelpers from '../helpers/localesHelpers';
import _each from 'lodash/each';
import _find from 'lodash/find';

export default function pageControlsReducer(state = controls, action = {}) {

  switch (action.type) {

    case LOCALE_LIST_REQUEST:
      return Object.assign({}, state);

    case LOCALE_LIST_SUCCESS:
      return Object.assign({}, state, {
        locales: action.locales
      });

    case LOCALE_CHANGE:
      return Object.assign({}, state, {
        isLocaleChanged: true,
        locales: action.locales
      });

    case PAGE_CONTROLS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case PAGE_CONTROLS_SUCCESS: {
      let menuItems = [];
      //if(!localeHelpers.isDefaultLocale(state.locales)) {
      _each(state.header.menuItems, item => {
        let newItem = Object.assign({}, item, _find(action.header.menuItems, {id: item.id}));
        // do not update menu Item in state if label is missing
        newItem.label ? menuItems.push(newItem) : menuItems.push(item);
      });
      //} else {
      //  menuItems = controls.header.menuItems;
      //}

      return Object.assign({}, state, {
        isLoading: false,
        header: {
          logo: {label: action.header.logo.label || state.header.logo.label} ,
          menuItems
        }
      });
    }

    case PAGE_LOGIN_CONTROLS_SUCCESS: {
      // TODO rework logical OR (||) operators
      let logInForm = {};
      //if(!localeHelpers.isDefaultLocale(state.locales)) {
      //  logInForm = {
      //    headerLabel:          action.logInForm.headerLabel          || state.logInForm.headerLabel,
      //    headerLine:           action.logInForm.headerLine           || state.logInForm.headerLine,
      //    usernameLabel:        action.logInForm.usernameLabel        || state.logInForm.usernameLabel,
      //    passwordLabel:        action.logInForm.passwordLabel        || state.logInForm.passwordLabel,
      //    logInButton:          action.logInForm.logInButton          || state.logInForm.logInButton,
      //    lnUnableAccessAccount:action.logInForm.lnUnableAccessAccount|| state.logInForm.lnUnableAccessAccount,
      //    labelAdminRequest:    action.logInForm.labelAdminRequest    || state.logInForm.labelAdminRequest,
      //    labelForPolicy:       action.logInForm.labelForPolicy       || state.logInForm.labelForPolicy,
      //    txtboxUsername:       action.logInForm.txtboxUsername       || state.logInForm.txtboxUsername,
      //    txtboxPassword:       action.logInForm.txtboxPassword       || state.logInForm.txtboxPassword,
      //    labelKeepMeLoggedIn:  action.logInForm.labelKeepMeLoggedIn  || state.logInForm.labelKeepMeLoggedIn,
      //    lnPolicy:             action.logInForm.lnPolicy             || state.logInForm.lnPolicy
      //  };
      //} else {
        //logInForm = controls.logInForm;
        logInForm = action.logInForm;
      //}

      return Object.assign({}, state, {
        isLoading: false,
        logInForm
      });
    }

    case PAGE_ACCOUNT_DETAILS_CONTROLS_SUCCESS: {
      // TODO rework logical OR (||) operators
      let accountDetails = {};
      //if(!localeHelpers.isDefaultLocale(state.locales)) {
      accountDetails = action.accountDetails;
      // } else {
      //   accountDetails = controls.accountDetails;
      //   accountDetails.sections = action.accountDetails.sections;
      // }

      return Object.assign({}, state, {
        isLoading: false,
        accountDetails
      });
    }

    case PAGE_ACCOUNTS_OVERVIEW_CONTROLS_SUCCESS:
      return Object.assign({}, state, {
        [ACCOUNTS_OVERVIEW_SCREEN]: action[ACCOUNTS_OVERVIEW_SCREEN]
      });

    case PAGE_OVERVIEW_CONTROLS_SUCCESS:
      return Object.assign({}, state, {
        [action.pageId]: action.controls
      });

    default:
      return state;
  }
}
