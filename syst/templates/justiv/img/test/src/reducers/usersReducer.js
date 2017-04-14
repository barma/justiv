'use strict';

import {USER_LIST_SUCCESS} from '../actions/actionTypes';
import {users} from './initialState';

export default function accountsReducer(state = users, action = {}) {

  switch (action.type) {

    case USER_LIST_SUCCESS:
      return Object.assign({}, state, {
        users: action.users,
        isFetching: false
      });

    default:
      return state;
  }
}
