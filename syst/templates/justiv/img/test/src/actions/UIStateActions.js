'use strict';

import {SWITCH_SIDEBAR} from './actionTypes';

/**
 * @param {Boolean} isSidebarHidden
 * */
export function switchSidebar(isSidebarHidden) {

  return {
    type: SWITCH_SIDEBAR,
    isSidebarHidden: !isSidebarHidden
  };

}
