'use strict';

import {PANEL, BUTTON, LISTBOX} from '../../constants/controlTypes';
import {CONTROL_PARENT, CONTROL_NUMBER, CONTROL_TEXT, CONTROL_ORDER_NUMBER_COLUMN, CONTROL_TYPE} from '../../constants/db';
import {MORE_TASKBAR_BUTTON_ID} from '../../constants/temp';
import pageControlsHelpers from './index';
import _filter from 'lodash/filter';
import _head from 'lodash/head';
import _each from 'lodash/each';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';

import _flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import sortBy from 'lodash/fp/sortBy';
import each from 'lodash/fp/each';

export default {
  formHeaderControls,
  formMenuTree
};

/**
 * @param {Array} rawControls
 * @returns {Object}
 * */
function formHeaderControls(rawControls) {
  let sortedControls = pageControlsHelpers.sortByTypes(rawControls);
  let headerItems = sortHeaderItems(sortedControls, rawControls);

  let firstMenuItemIndex = _findIndex(headerItems, item => item[CONTROL_TYPE] === Number(BUTTON));
  let lastMenuItemIndex = _findIndex(headerItems, item => item[CONTROL_TYPE] !== Number(BUTTON), firstMenuItemIndex);

  let primaryMenuItems = headerItems.slice(firstMenuItemIndex, lastMenuItemIndex);
  let authorizedNavigation = headerItems.slice(lastMenuItemIndex);

  let menuItems = [];
  _each(primaryMenuItems, rawPrimaryMenuItem => menuItems.push(formMenuItem(sortedControls, rawPrimaryMenuItem)));

  return {
    logo: { label: pageControlsHelpers.getPrimaryLabel(sortedControls) },
    menuItems,
    authorizedNavigation // avatar and + button
  };
}

/**
 * @param {Object} sortedControls
 * @param {Array} rawItems
 *
 * @returns {Array} all header items (logo, label, navigation items etc.) in right order
 * */
function sortHeaderItems(sortedControls, rawItems) {
  let panelId = pageControlsHelpers.getRootPanelId(sortedControls);

  return _flow(
    filter(item => item[CONTROL_PARENT] === panelId),
    sortBy(CONTROL_ORDER_NUMBER_COLUMN)
  )(rawItems);
}

/**
 * @param {Object} sortedControls
 * */
function formMenuTree(sortedControls) {
  let formattedMenuItems = [],
      parentContainerId = _head(sortedControls[PANEL])[CONTROL_NUMBER];

  _flow(
    filter(button => button[CONTROL_PARENT] === parentContainerId),
    sortBy(CONTROL_ORDER_NUMBER_COLUMN),
    each(sortedItem => {
      formattedMenuItems.push(formMenuItem(sortedControls, sortedItem));
    })
  )(sortedControls[BUTTON]);

  return formattedMenuItems;
}

/**
 * Form object for specific menu item
 * @param {Object} sortedControls
 * @param {Object} menuItem
 * */
function formMenuItem(sortedControls, menuItem) {

  let dropdown = getDropdownContainer(sortedControls, menuItem),
      children = findChildMenuItems(sortedControls, dropdown);

  return {
    label: menuItem[CONTROL_TEXT],
    id: menuItem[CONTROL_NUMBER],
    dropdown: !_isEmpty(dropdown),
    children: children
  };
}

/**
 * Get dropdown box for menu item
 * @param {Object} sortedControls
 * @param {Object} menuItem
 * */
function getDropdownContainer(sortedControls, menuItem) {
  let elementId = menuItem[CONTROL_NUMBER];

  let listbox = _head(_filter(sortedControls[LISTBOX], {[CONTROL_PARENT]: elementId}));
  if(!listbox) return {};
  // do not show dropdown for 'More' taskbar button
  if(listbox[CONTROL_PARENT] === MORE_TASKBAR_BUTTON_ID) return {};

  return listbox;
}

/**
 * @param {Object} sortedControls
 * @param {Object} dropDownContainer
 * @return {Array}
 * */
function findChildMenuItems(sortedControls, dropDownContainer) {
  let childItems = [];
  if(_isEmpty(dropDownContainer)) return childItems;

  let dropdownContainerId = dropDownContainer[CONTROL_NUMBER];
  let rawChildMenuItems = _filter(sortedControls[BUTTON], button => button[CONTROL_PARENT] === dropdownContainerId);

  return formatRawChildItems(rawChildMenuItems);
}

/**
 * @param {Array} rawChildMenuItems
 * @return {Array}
 * */
// TODO need to unify formatting functions for child and primary menu items
function formatRawChildItems(rawChildMenuItems) {
  let formattedItems = [];
  if(!rawChildMenuItems.length) return formattedItems;

  _each(rawChildMenuItems, rawChildMenuItem => {
    formattedItems.push({label: rawChildMenuItem[CONTROL_TEXT], id: rawChildMenuItem[CONTROL_NUMBER]});
  });

  return formattedItems;
}
