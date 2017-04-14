'use strict';

import _find from 'lodash/find';
import _pick from 'lodash/pick';
import _values from 'lodash/values';
import {
  ACCOUNT_ADDRESS_TYPE_COLUMN,
  ACCOUNT_ADDRESSES,
  ADDRESS_NAME,
  ADDRESS_STREET_1,
  ADDRESS_STREET_2,
  ADDRESS_POSTAL_ZIP,
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_COUNTRY_STATE,
  COUNTRY_DE,
  COUNTRY_AT,
  COUNTRY_US
} from '../constants';

export default {
  getAddressByType
};

/**
 * @param {Object} rawAccountData
 * @param {String} addressType
 * @returns {String}
 * */
function getAddressByType(rawAccountData, addressType) {
  return getAddressAsString(_find(rawAccountData[ACCOUNT_ADDRESSES], {
    [ACCOUNT_ADDRESS_TYPE_COLUMN]: addressType
  }));
}

/**
 * @private
 * @param {Object} address
 * @returns {String}
 * */
function getAddressAsString(address) {
  if(!address) return '';

  if(address[ADDRESS_COUNTRY_STATE]) {
    address[ADDRESS_COUNTRY_STATE] = getCountryName(address[ADDRESS_COUNTRY_STATE]);
  }

  // set sequence for address components
  let addressComponents = [ADDRESS_NAME, ADDRESS_STREET_1, ADDRESS_STREET_2, ADDRESS_POSTAL_ZIP, ADDRESS_CITY, ADDRESS_COUNTRY, ADDRESS_COUNTRY_STATE];
  return _values(_pick(address, addressComponents)).join();
}

/**
 * @private
 * @returns {String}
 * */
function getCountryName(countryState) {
  switch(countryState) {
    case COUNTRY_DE:
      return 'Germany';
    case COUNTRY_AT:
      return 'Austria';
    case COUNTRY_US:
      return 'United States';
    default:
      return '';
  }
}
