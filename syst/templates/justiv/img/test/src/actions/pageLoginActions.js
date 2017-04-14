'use strict';

import {PAGE_CONTROLS_REQUEST, PAGE_LOGIN_CONTROLS_SUCCESS} from './actionTypes';
import axios from 'axios';
import {apiAddress} from '../constants';
import pageControlsHelpers from '../helpers/pageControlsHelpers/index';
import {LABEL, TEXTBOX, BUTTON, HYPERLINK} from '../constants/controlTypes';

export function LoginControlReceived(rawItems) {

  let items = pageControlsHelpers.sortByTypes(rawItems);

  return {
    type: PAGE_LOGIN_CONTROLS_SUCCESS,
    logInForm: {
      headerLabel:          pageControlsHelpers.getPrimaryLabel(items),
      headerLine:           pageControlsHelpers.getElement(items, LABEL, 'Header line').T006C002,
      usernameLabel:        pageControlsHelpers.getElement(items, LABEL, 'Username label').T006C002,
      passwordLabel:        pageControlsHelpers.getElement(items, LABEL, 'Password label').T006C002,
      logInButton:          pageControlsHelpers.getElement(items, BUTTON, 'Log in button').T006C002,
      lnUnableAccessAccount:pageControlsHelpers.getElement(items, HYPERLINK, 'Hyperlink for unable to access your account').T006C002,
      labelAdminRequest:    pageControlsHelpers.getElement(items, LABEL, 'Label for administrator request').T006C002,
      labelForPolicy:       pageControlsHelpers.getElement(items, LABEL, 'Label for policy').T006C002,
      txtboxUsername:       pageControlsHelpers.getElement(items, TEXTBOX, 'Textbox for input username').T006C002,
      txtboxPassword:       pageControlsHelpers.getElement(items, TEXTBOX, 'Textbox for input password').T006C002,
      labelKeepMeLoggedIn:  pageControlsHelpers.getElement(items, LABEL, 'Label for Keep me logged in').T006C002,
      lnPolicy:             pageControlsHelpers.getElement(items, HYPERLINK, 'Hyperlink for policy').T006C002
    }
  };
}
