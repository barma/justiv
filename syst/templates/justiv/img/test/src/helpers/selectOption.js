'use strict';

import {
  CRM_PARAMS_DEFAULT_VALUE,
  SELECT_OPTION_SORT_ORDER
} from '../constants/db';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _each from 'lodash/each';
import _isUndefined from 'lodash/isUndefined';

export default {
  changeVisibility,
  getDefaultSelectOptionCode,
  getValueByCode,
  sortSelectOptions,
  updateSelectOptions,
  createSelectOption,
  findByControlId
};

function sortSelectOptions(rawData) {
  return _sortBy(rawData, SELECT_OPTION_SORT_ORDER);
}

/**
 * @param {Object} selectOption - selectOption to modify
 * @param {Object=} user
 * */
function changeVisibility(selectOption, user) {
  let updatedOption = Object.assign({}, selectOption, {
    T020C002: selectOption.T020C002,
    T020C007: {
      T006C001: selectOption.T020C007.T006C001
    }
  });
  if(user) {
    updatedOption.T020C006 = {
      T012C001: user.T012C001
    };
  }
  updatedOption.T020C003 = updatedOption.T020C003 ? 1 : 0;
  updatedOption.T020C004 = updatedOption.T020C004 ? 1 : 0;
  updatedOption.T020C005 = updatedOption.T020C005 ? 1 : 0;
  return updatedOption;
}

/**
 * @param {Array} selectOptions
 * @returns {String}
 * */
function getDefaultSelectOptionCode(selectOptions) {
  let defaultSelectOption = _find(selectOptions, selectOption => !_isUndefined(selectOption[CRM_PARAMS_DEFAULT_VALUE]) && selectOption[CRM_PARAMS_DEFAULT_VALUE].length);
  if(defaultSelectOption) {
    return defaultSelectOption[CRM_PARAMS_DEFAULT_VALUE];
  }

  return '';
}

function getValueByCode(selectOptions, code, field = 'T001C003') {
  let selectOption = _find(selectOptions, {[field]: code});
  if(selectOption) {
    return selectOption.T001C005;
  }
}

/**
 * @param {String} code
 * @param {String} controlId
 * @param {Object} user
 * @param {Object=} existingSelectOption
 * @param {Object=} meta
 * */
function createSelectOption(code, controlId, user, existingSelectOption, meta) {

  let selectOption = {
    T020C002: code,
    T020C003: 0,
    T020C004: 1,
    T020C005: 1,
    T020C006: {
      T012C001: user.T012C001
    },
    T020C007: {
      T006C001: controlId
    }
  };

  if(meta) {
    selectOption.T020C003 = meta.allowAddNew || undefined;
    selectOption.T020C005 = meta.display ? 1 : 0;
    selectOption.T020C008 = meta.sort || undefined;
  }

  if(existingSelectOption) {
    selectOption.T020C001 = existingSelectOption.T020C001;
  }

  return selectOption;
}

function findByControlId(selectOptions, controlId) {
  return _find(selectOptions, selectOption => {
    if(selectOption.T020C007) {
      return selectOption.T020C007.T006C001 == controlId;
    }
  })
}

function updateSelectOptions(selectOptions, user) {
  let updatedOptions = [];

  _each(selectOptions, (selectOption, index) => {
    let updatedSelectOption = {};

    if(selectOption.T020C004) {
      updatedSelectOption.T020C001 = selectOption.T020C001;
    }
    updatedSelectOption.T020C002 = selectOption.T020C002;
    updatedSelectOption.T020C003 = selectOption.T020C003 ? 1 : 0;
    updatedSelectOption.T020C004 = 1;
    updatedSelectOption.T020C005 = selectOption.T020C005 ? 1 : 0;
    updatedSelectOption.T020C006 = {
      T012C001: user.T012C001
    };
    updatedSelectOption.T020C007 = {
      T006C001: selectOption.T020C007.T006C001
    };
    updatedSelectOption.T020C008 = index + 1;

    updatedOptions.push(updatedSelectOption);
  });

  return updatedOptions;
}
