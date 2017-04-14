'use strict';

import {
  CONTROLS_DESCRIPTION, CONTROL_NUMBER, CONTROL_TEXT, PARAMETER_TYPE, PARAMETER_CATEGORY
  } from '../../constants';
import {CONTROL_ORDER_NUMBER_COLUMN, CONTROL_TYPE, CRM_PARAMS_STATUS, STATUS_ENABLED, STATUS_DELETED} from '../../constants/db';
import {LABEL, LISTBOX, PANEL} from '../../constants/controlTypes';

import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import _head from 'lodash/head';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import _last from 'lodash/last';
import _isArray from 'lodash/isArray';
import _find from 'lodash/find';

// lodash methods for chaining
import _flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import each from 'lodash/fp/each';

/**
 * This file contains common methods for filtering and sorting controls
 * */
export default {
  sortByTypes,
  getPrimaryLabel,
  getElement,
  expandDropdowns,
  getElementByNumber,
  hasDescription,
  getParameterType,
  getParameterCategory,
  getMenuItems,
  sortControls,
  isControlEnabled,
  getRootPanelId,
  getMenuItemsWithTags,
  getDefaultValueByLocale,
  getControlById
};

/**
 * Sort received controls by control types (T006C015 column)
 * @param {Array} rawControls
 * @return {Object}
 * */
function sortByTypes(rawControls) {
  return _groupBy(rawControls, CONTROL_TYPE);
}

function getRootPanelId(sortedControls) {
  return _head(sortedControls[PANEL])[CONTROL_NUMBER];
}

/**
 * Sort elements by order number column
 * @param {Array} elements
 * @returns {Array}
 * */
function sortControls(elements) {
  return _sortBy(elements, CONTROL_ORDER_NUMBER_COLUMN);
}

/**
 * @param {Object} controls
 * */
function getPrimaryLabel(controls) {
  return _head(sortControls(controls[LABEL]))[CONTROL_TEXT];
}

function getElement(sortedControls, typeElement, typeText) {
  return _head(_filter(sortedControls[typeElement], { [CONTROLS_DESCRIPTION]: typeText }));
}

function getControlById(controls, id) {
  let control = _find(controls, {T006C001: id});
  if(control) return control;
  return {};
}

function getElementByNumber(sortedControls, typeElement, number) {
  return _head(_filter(sortedControls[typeElement], { [CONTROL_NUMBER]: Number(number) })) || {};
}

/**
 * @param {Array} rawItems
 * @param {Number} boxNumber - number of parent dropdownbox
 * @param {String} key
 * @returns {Array}
 * */
function getMenuItems(rawItems, boxNumber, key) {

  let dropdown = _find(rawItems, {[CONTROL_NUMBER]: Number(boxNumber)});
  if(dropdown) {
    return dropdown[key];
  }
  return [];
}

function getMenuItemsWithTags(rawItems, boxNumber, key, meta) {
  let dropdown = _find(rawItems, {[CONTROL_NUMBER]: Number(boxNumber)});
  if(dropdown) {

    dropdown[key] = _flow(
      map(menuItem => {
        if(menuItem.T001C017 !== (meta.selection + '_SHORT')) {

          let selectOption = _find(dropdown[key], _item => _item.T001C003 === menuItem.T001C003 && _item.T001C017 === (meta.selection + '_SHORT'));

          if(selectOption) {
            menuItem._tag = selectOption.T001C005;
          }
        }
        return menuItem;
      }),
      filter(menuItem => menuItem.T001C017 !== (meta.selection + '_SHORT') && menuItem.T001C024 !== STATUS_DELETED),
      sortBy(CONTROL_ORDER_NUMBER_COLUMN)
    )(dropdown[key]);

    return dropdown[key];
  }
  return [];
}

/**
 * @param {Object} controlObj
 * @returns {Boolean}
 * */
function isControlEnabled(controlObj) {
  return controlObj[CRM_PARAMS_STATUS] === STATUS_ENABLED;
}

/**
 *
 * */
function expandDropdowns(sortedControls) {
  let exandedItems = [];
  _each(sortedControls[LISTBOX], label => {
    let controlsDescription = label[CONTROLS_DESCRIPTION];
    if(isContainParameters(controlsDescription)) {
      label.parameterType = getParameterType(controlsDescription);
    }
    exandedItems.push(label);
  });
  return exandedItems;
}

/**
 *
 * @param {object} controlsObject
 * @param {string} controlDescription
 * @returns {boolean}
 * */
function hasDescription(controlsObject, controlDescription) {
  return controlsObject[CONTROLS_DESCRIPTION] === controlDescription;
}

/**
 * @private
 * */
function isContainParameters(controlsDescription) {
  return controlsDescription.includes(PARAMETER_TYPE);
}

/**
 *
 * */
// TODO make one function instead
function getParameterType(controlsDescription) {
  let arr = controlsDescription.split(PARAMETER_TYPE);
  if(!_isArray(arr)) return '';

  return _last(arr).replace(/[^0-9a-z_,]/gi, '');
}
function getParameterCategory(controlsDescription) {
  let arr = controlsDescription.split(PARAMETER_CATEGORY);
  if(!_isArray(arr)) return '';

  let result = _last(arr).replace(/[^0-9A-Z_,]/g, '');
  return result.substring(0, result.indexOf(','));
}

function getDefaultValueByLocale(value, locale) {
  if(!value) return;
  let values = value.split('|');

  let defaultValue = _find(values, val => {
    return val.indexOf('#' + locale) !== -1;
  });
  if(defaultValue) {
    return defaultValue.substring(2);
  }
}
