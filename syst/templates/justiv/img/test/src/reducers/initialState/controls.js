'use strict';

import {LEADS_OVERVIEW_SCREEN, ACCOUNTS_OVERVIEW_SCREEN} from '../../constants/controlTypes';

export default {
  isLoading: false,
  currentPages: [9000, 9001],
  isLocaleChanged: false,
  locales: {},
  header: {
    logo: {
      label: 'CRUISE CRM'
    },
    menuItems: [
      {label: 'Accounts', originalLabel: 'Accounts', id: 90001100, dropdown: true, children: [
        {label: 'Create Account'},
        {label: 'View Account'}
      ]},
      {label: 'Leads', originalLabel: 'Leads', id: 90002100, dropdown: true, children: []},
      {label: 'Customer', originalLabel: 'Customer', id: 90003100, dropdown: true, children: []},
      {label: 'Contacts', originalLabel: 'Contacts', id: 90004100, dropdown: true, children: []},
      {label: 'Companies', originalLabel: 'Companies', id: 90005100, dropdown: true, children: []},
      {label: 'Targets', originalLabel: 'Targets', id: 90006100, dropdown: true, children: []},
      {label: '...', id: 90007100},
      {label: '+', id: 90009100}
    ]
  },
  logInForm: {
    headerLabel: 'Log In',
    headerLine: 'Use your CRM User Account',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    logInButton: 'Log in',
    lnUnableAccessAccount: 'Unable to access your account?',
    labelAdminRequest: 'To request an account, please contact your administrator.',
    labelForPolicy: 'By logging in, you agree to the',
    txtboxUsername: 'Username',
    txtboxPassword: 'Password',
    labelKeepMeLoggedIn: 'Keep me logged in',
    lnPolicy: 'Privacy Policy.'
  },
  accountDetails: {
    cancelBtn: 'Cancel',
    saveBtn: 'Save',
    labelAccountCreated: 'Account created',
    labelCreatedBy: 'Created by',
    labelAccountId: 'Account ID',
    labelValueRating: 'Value Rating',
    sections: []
  },
  [ACCOUNTS_OVERVIEW_SCREEN]: {
    isReceived: false,
    accountSelectionDropdown: {
      items: []
    },
    searchAccountTypeDropdown: {
      items: []
    },
    filterByDropdown: {
      items: []
    },
    selectAllListBox: {
      items: []
    },
    searchTypeBtn: 'All',
    searchPlaceholder: 'Search by ID, Name'
  },
  [LEADS_OVERVIEW_SCREEN]: {
    isReceived: false
  }
};
