'use strict';

import timeHelpers from '../timeHelpers';
import addressesHelpers from '../addressesHelpers';
import accountHelpers from '../account';
import communicationsHelpers from '../communicationsHelpers';
import {
  DATE_PATTERN_DAY_CREATED, DATE_PATTERN_TIME_CREATED,
  ACCOUNT_ASSIGNED_ID,
  ACCOUNT_CREATED_DATE,
  ACCOUNT_ADDRESS_TYPE_COLUMN,
  ADDRESS_HOME,
  ADDRESS_BUSINESS,
  COMMUNICATION_PHONE_MOBILE,
  COMMUNICATION_PHONE_HOME,
  COMMUNICATION_PHONE_OFFICE,
  COMMUNICATION_MAIL_PRIVATE,
  COMMUNICATION_MAIL_BUSINESS,
  COMMUNICATION_WEB_PRIVATE,
  COMMUNICATION_WEB_BUSINESS
  } from '../../constants';

import {ACCOUNT_CLASSIFICATION_TABLE, ACCOUNT_STATUS, STATUS_ENABLED, STATUS_DELETED} from '../../constants/db';

export default {
  getFullName,
  getCreatedDate,
  getCreatedBy,
  getValueRate,
  isBlacklisted,
  getAccountType,
  formatAccountsList
};

/**
 * @param {Object} rawAccountData
 * @returns {String}
 * */
function getFullName(rawAccountData) {
  let accountType = getAccountType(rawAccountData);
  if(!rawAccountData.T100C004 && !rawAccountData.T100C003) {
    return rawAccountData.T100C009;
  }
  if(accountType === 'Partner') {
    return rawAccountData.T100C009;
  }
  return `${rawAccountData.T100C004} ${rawAccountData.T100C003}`;
}

/**
 * @param {Object} rawAccountData - account instance received from REST API
 * @param {String=} pattern - format date with specific pattern
 * @returns {Date}
 * */
function getCreatedDate(rawAccountData, pattern) {
  return timeHelpers.formatTime(rawAccountData[ACCOUNT_CREATED_DATE], pattern);
}

function getCreatedBy(rawAccountData) {
  if(rawAccountData.T100C021) {
    return rawAccountData.T100C021.T012C002;
  }
}

// this logic will be changed in future
/**
 * @param {Object} rawAccountData
 * */
function getValueRate(rawAccountData) {
  if(rawAccountData[ACCOUNT_CLASSIFICATION_TABLE] && rawAccountData[ACCOUNT_CLASSIFICATION_TABLE].length) {
    let valueRatingObject = rawAccountData[ACCOUNT_CLASSIFICATION_TABLE][0];
    let valueRatingCode = valueRatingObject[ACCOUNT_CLASSIFICATION_TABLE + 'C003'];
    // just get last number from parameter code
    // need to optimize in future
    return Number(valueRatingCode.slice(-1));
  }
  return 0;
}

function isBlacklisted(rawAccountData) {
  if(!rawAccountData.T113) {
    return false;
  }
  if(!rawAccountData.T113.length) {
    return false;
  }

  return rawAccountData.T113[0].T113C003 === 'LIST1';
}
function getAccountType(rawAccountData) {
  let isCustomer = (type) => {
    return ['ATYPE1', 'ATYPE2', 'ATYPE3'].indexOf(type) !== -1;
  };
  let isPartner = (type) => {
    return ['ATYPE4', 'ATYPE5'].indexOf(type) !== -1;
  };
  let isEmergencyContact = (type) => {
    return 'ATYPE6' === type;
  };

  if(!rawAccountData.T110) {
    return false;
  }
  if(!rawAccountData.T110.length) {
    return;
  }

  let type;
  if(rawAccountData.T110[1]) {
    type = rawAccountData.T110[1].T110C003;
  } else {
    type = rawAccountData.T110[0].T110C003;
  }
  if(isCustomer(type)) {
    return "Customer";
  } else if(isPartner(type)) {
    return "Partner";
  } else if(isEmergencyContact(type)) {
    return "Emergency Contact";
  } else {
    return "System user";
  }
}
// ===============

// Bring That logic to specific file or rename existing
/**
 * @param {Array} rawAccountsList
 * */
function formatAccountsList(rawAccountsList) {
  let formattedAccountsList = [];

  for(let i = 0; i < rawAccountsList.length; i++) {

    // do not show accounts disabled/deleted accounts
    if(rawAccountsList[i][ACCOUNT_STATUS] === STATUS_DELETED) continue;

    let sortedAcc = accountHelpers.sortAccountItems(rawAccountsList[i]);

    if(sortedAcc.T106) {
      sortedAcc.T106 = [];
    }

    let account = Object.assign({}, sortedAcc, {
      fullName: getFullName(rawAccountsList[i]),
      accountType: getAccountType(rawAccountsList[i]),
      [ACCOUNT_ASSIGNED_ID]:   rawAccountsList[i][ACCOUNT_ASSIGNED_ID],
      city: rawAccountsList[i].T100C012,
      createdDate: getCreatedDate(rawAccountsList[i], DATE_PATTERN_DAY_CREATED + ' ' + DATE_PATTERN_TIME_CREATED),
      valueRate: getValueRate(rawAccountsList[i]),
      phone_mobile: communicationsHelpers.getCommunicationByType(rawAccountsList[i], COMMUNICATION_PHONE_MOBILE),
      phone_home: communicationsHelpers.getCommunicationByType(rawAccountsList[i], COMMUNICATION_PHONE_HOME),
      phone_office: communicationsHelpers.getCommunicationByType(rawAccountsList[i], COMMUNICATION_PHONE_OFFICE),
      email: communicationsHelpers.getOneOfCommunications(rawAccountsList[i], [COMMUNICATION_MAIL_PRIVATE, COMMUNICATION_MAIL_BUSINESS]),
      //[COMMUNICATION_MAIL_PRIVATE]: communicationsHelpers.getCommunicationByType(rawAccountsList[i], COMMUNICATION_MAIL_PRIVATE),
      //[COMMUNICATION_MAIL_BUSINESS]: communicationsHelpers.getCommunicationByType(rawAccountsList[i], COMMUNICATION_MAIL_BUSINESS),
      website: communicationsHelpers.getOneOfCommunications(rawAccountsList[i], [COMMUNICATION_WEB_PRIVATE, COMMUNICATION_WEB_BUSINESS]),
      isBlacklisted: isBlacklisted(rawAccountsList[i]),
      homeAddress: addressesHelpers.getAddressByType(rawAccountsList[i], ADDRESS_HOME),
      businessAddress: addressesHelpers.getAddressByType(rawAccountsList[i], ADDRESS_BUSINESS)
    });
    formattedAccountsList.push(account);
  }

  return formattedAccountsList;
}
