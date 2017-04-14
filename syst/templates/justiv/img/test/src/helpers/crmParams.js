'use strict';

import {CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_VALUE, CRM_PARAMS_PARAM_TYPE} from '../constants/db';
import _find from 'lodash/find';
import _filter from 'lodash/filter';

export default {
  getValueByCode,
  findByCode,
  findByType
};

/**
 * @param {Array} crmParams
 * @param {String} code
 * */
function getValueByCode(crmParams, code) {
  let crmParamObject = _find(crmParams, {[CRM_PARAMS_PARAM_CODE]: code});
  if(crmParamObject) {
    return crmParamObject[CRM_PARAMS_PARAM_VALUE];
  }
}

/**
 * @param {Array} crmParams
 * @param {String} code
 * */
function findByCode(crmParams, code) {
  return _find(crmParams, {[CRM_PARAMS_PARAM_CODE]: code});
}

function findByType(crmParams, type) {
  return _filter(crmParams, param => param[CRM_PARAMS_PARAM_TYPE] === type);
}
