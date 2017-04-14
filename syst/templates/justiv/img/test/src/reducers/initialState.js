'use strict';

export const auth = {
  isFetching: false,
  isAuthenticated: false,
  user: {},
  session_id: '',
  keep_session_id: false
};

export const accounts = {
  totalAmount: 0,
  all: [],
  current: {},
  isFetching: false,
  // next keys responsible for searching accounts
  // TODO rework store structure for search params
  page: 0, // increment this key, when requesting next page from REST API
  isMoreAccountsRequested: false, // flag to display loader
  allReceived: false, // do not display 'show more' button when all data has been received
  accountSelection: '', // category of accounts (My Accounts, Created today etc.)
  accountTypes: '',
  searchQuery: '',
  sort: {
    field: '',
    direction: ''
  }
};

export const crmParams = {
  isFetching: false,
  keys: []
};

export const users = {
  isFetching: false,
  users: []
};
