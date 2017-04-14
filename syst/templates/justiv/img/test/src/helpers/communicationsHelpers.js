'use strict';

import _find from 'lodash/find';
import _filter from 'lodash/filter';
import {
  COMMUNICATION_TYPES,
  COMMUNICATION_TYPE_CODE_COLUMN,
  COMMUNICATION_TYPE_VALUE
} from '../constants';

export default {
  getCommunicationByType,
  getOneOfCommunications
};

/**
 * @param {Object} rawAccountData
 * @param {string} communicationType
 * @returns {string}
 * */
function getCommunicationByType(rawAccountData, communicationType) {
  let comm_type = _find(rawAccountData[COMMUNICATION_TYPES], {
    [COMMUNICATION_TYPE_CODE_COLUMN]: communicationType
  });

  return comm_type ? comm_type[COMMUNICATION_TYPE_VALUE] : '';
}

/**
 * @param {object} rawAccountData
 * @param {string[]} values
 * @returns {string}
 * */
function getOneOfCommunications(rawAccountData, values) {
  let filteredData = _filter(rawAccountData[COMMUNICATION_TYPES], communication_type => {
    return values.indexOf(communication_type[COMMUNICATION_TYPE_CODE_COLUMN]) !== -1;
  });
  return filteredData.length > 0 ? filteredData[0][COMMUNICATION_TYPE_VALUE] : '';
}
