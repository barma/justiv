'use strict';

import {SWITCH_SIDEBAR} from '../actions/actionTypes';
import UIState from './initialState/UIState';

export default function UIStateReducer(state = UIState, action = {}) {

  switch (action.type) {

    case SWITCH_SIDEBAR:
      return Object.assign({}, state, {
        isSidebarHidden: action.isSidebarHidden
      });

    default:
      return state;
  }
}
