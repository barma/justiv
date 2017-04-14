'use strict';

import {
  CRM_PARAMS_PARAM_CATEGORY, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_TYPE, STATUS_ENABLED, CRM_PARAMS_STATUS, CRM_PARAMS_SORTING, ACCOUNT_ASSIGNED_ID, ACCOUNT_TYPE, ACCOUNT_CREATED_DATE,
  ACCOUNT_LAST_NAME, ACCOUNT_FIRST_NAME, ACCOUNT_COMPANY_NAME, ACCOUNT_CREATED_BY_USER, USER_NAME,
  ACCOUNT_ADDRESS_TABLE
  } from '../constants/db';
import {DATE_PATTERN_DAY_CREATED, DATE_PATTERN_TIME_CREATED, BIRTH_DATE_PATTERN} from '../constants/application';
import {ACCOUNT_TYPE_COMPANY, RECORD_STATUS_DEFAULT_ENABLED, HOME_ADDRESS_CODE, HOME_ADDRESS_PARAMETER} from '../constants/temp';
import timeHelpers from './timeHelpers';
import crmParams from './crmParams';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _each from 'lodash/each';
import _isArray from 'lodash/isArray';
import _sortBy from 'lodash/sortBy';
import _indexOf from 'lodash/indexOf';
import _isObject from 'lodash/isObject';

import _flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import sortBy from 'lodash/fp/sortBy';

export default {
  prepareAccountListToDelete,
  getAvailableAccountTypes,
  getListFlags,
  assignAccountToUser,
  validateAccount,
  findAccountInfo,
  sortAccountItems,
  getFullName,
  getCreatedDate,
  getCreatedBy,
  getAccountType,
  isAccountBlacklisted,
  getValueRate,
  getLeadStatus,
  updateCompanyType,
  addAddressType,
  getBlackListLabel,
  findAccountType,
  findCreatedBy,
  findSelectedValue,
  changeAccountInfo,
  saveUserImage,
  getUserImage,
  removeUserImage
};

/**
 * @param {String} ids
 * @returns {Array}
 * */
function prepareAccountListToDelete(ids) {
  if(!ids) throw Error("account id required");

  let idArray = ids.split(',');

  return _map(idArray, id => {
    return {
      [ACCOUNT_ASSIGNED_ID]: id
    };
  });

}

function findMainAccountInfo(account, control) {
  // show main account info
  let dataField = control.T006C017 + control.T006C018;
  if(dataField === ACCOUNT_CREATED_DATE) {
    return timeHelpers.formatTime(account[ACCOUNT_CREATED_DATE], DATE_PATTERN_DAY_CREATED + ' ' + DATE_PATTERN_TIME_CREATED);
  }
  return account[dataField];
}

function findCreatedBy(account) {
  let users = [];
  _each(account.T120, user => {
    users.push(user.T120C003.T012C002);
  });
  return users.join();
}

function findAccountType(account, params, control) {
  let types = [];

  let accTypes = account.T110;
  if(accTypes && accTypes.length) {
    _each(accTypes, type => {
      let accType = _find(params, {T001C003: type.T110C003.T001C003});
      if(accType) {
        types.push(accType.T001C005);
      }
    });
  }
  return types.join();
}

function findAccountStatus(account, params, control, aType) {
  let data = account.T110;
  if(data && data.length) {
    if(!data[0].T110C003) return;
    let accStatus = _find(params, {T001C003: data[0].T110C003.T001C003});
    if(accStatus) {
      return accStatus.T001C005;
    }
  }
}

function getHowDidYouHear(account, params, control) {
  let data = account.T115;

  if(data && data.length) {
    let accStatus = _find(params, {T001C003: 'HOWHEAR_1'});

    if(accStatus) {
      return accStatus.T001C005;
    }
  }
}

function showContactInfo(account, params, control) {
  let data = account.T102;

  let param;
  if(control.T001 && control.T001.length) {
    param = control.T001[0].T001C003;
    if(data && data.length) {
      let accStatus = _find(data, {T102C004: param});

      if(accStatus) {
        return accStatus.T102C005;
      }
    }
  }
}

function showAddressInfo(account, control) {
  let data = account.T101;

  if(data && data.length) {
    return data[0][control.T006C017 + control.T006C018];
  }
}

function showExternalId(account, control) {
  let data = account.T107;

  if(data && data.length) {
    return data[0][control.T006C017 + control.T006C018];
  }
}

function findAccountInfo(account, params, control, accountType) {
  if(!control) return;
  if(control.T006C017 === 'T100') {
    return findMainAccountInfo(account, control);
  }
  if(control.T006C017 === 'T120') {
    return findCreatedBy(account);
  }
  if(control.T006C017 === 'T110') {
    if(control.T006C018 === 'C003') {
      return findAccountType(account, params, control);
    } else if(control.T006C018 === 'C004') {
      return findAccountStatus(account, params, control, accountType);
    }
  }
  if(control.T006C017 === 'T115') {
    return getHowDidYouHear(account, params, control);

    // let tableData = account[control.T006C017];
    // if(tableData && tableData.length) {
    //   if(control.T006C018 === 'C003') {
    //     let data;
    //     for(let i = 0; i < tableData.length; i++) {
    //       if(_isObject(tableData[i][control.T006C017 + control.T006C018]) && tableData[i][control.T006C017 + control.T006C018].T001C003) {
    //         data = _find(params, {T001C003: tableData[i][control.T006C017 + control.T006C018].T001C003});
    //       } else {
    //         data = _find(params, {T001C003: tableData[i][control.T006C017 + control.T006C018]});
    //       }
    //       if(data) return data.T001C005;
    //     }
    //   } else {
    //     let data;
    //     for(let i = 0; i < params.length; i++) {
    //       data = _find(tableData, {[control.T006C017 + 'C003']: params[i].T001C003});
    //       if(data) return data[control.T006C017 + control.T006C018];
    //     }
    //   }
    // }
  }
  if(control.T006C017 === 'T102') {
    return showContactInfo(account, params, control);
  }
  if(control.T006C017 === 'T101') {
    return showAddressInfo(account, control);
  }
  if(control.T006C017 === 'T107') {
    return showExternalId(account, control);
  }
  // TEMPORARY WORKAROUND CHECK RESPONSE FROM SERVER
  if(control.T006C001 === 10103102) {
    return __getLeadStatus(account, params, 'T110', {T006C017: 'T110', T006C018: 'C004'}, 'T001C004', accountType);
  }

  if(account[control.T006C017] && account[control.T006C017].length) {
    if(control.T001 && control.T001.length) {

      let found = _find(account[control.T006C017], {[control.T006C017 + 'C003']: control.T001[0].T001C003});
      if(found) {
        return crmParams.getValueByCode(params, found[control.T006C017 + 'C003']);
      }

    }
  }
}

function __getLeadStatus(account, crmparams, table, accountType, field, aType) {
  let leadStatus;

  let defaultType = _find(account[table], accountData => {
    if(accountData[table + 'C003']) {
      return accountData[table + 'C003'].T001C003 === aType;
    }
  });
  if(defaultType && defaultType[table + 'C004']) {
    leadStatus = defaultType[table + 'C004'];
  }

  if(field && leadStatus) {
    return leadStatus[field];
  }
  return leadStatus;
}

function getLeadStatus(account, crmparams, table, accountType, field) {
  let leadStatus;

  let defaultType = _find(account[table], accountData => {
    if(accountData[table + 'C003']) {
      return accountData[table + 'C003'].T001C003 === getAccountType(account, crmparams, accountType, CRM_PARAMS_PARAM_CODE);
    }
  });
  if(defaultType && defaultType[table + 'C004']) {
    leadStatus = defaultType[table + 'C004'];
  }

  if(field && leadStatus) {
    return leadStatus[field];
  }
  return leadStatus;
}

function sortAccountItems(account) {
  let accCopy = Object.assign({}, account);
  _each(accCopy, (accountField, key) => {
    if(_isArray(accountField)) {
      accCopy[key] = _sortBy(accountField, key + 'C001');
    }
  });
  return accCopy;
}

function assignAccountToUser(account) {

}

function getListFlags(crmParams) {
  return _flow(
    filter(param => param[CRM_PARAMS_PARAM_TYPE] === 'LIST_FLAG' && param[CRM_PARAMS_STATUS] === STATUS_ENABLED),
    sortBy(CRM_PARAMS_SORTING)
  )(crmParams);
}

function getAvailableAccountTypes(crmParams) {
  return _flow(
    filter(param => param[CRM_PARAMS_PARAM_CATEGORY] === ACCOUNT_TYPE && param[CRM_PARAMS_STATUS] === STATUS_ENABLED),
    sortBy(CRM_PARAMS_SORTING)
  )(crmParams);
}

function isCompany(account) {
  let data = account.T110;
  if(data && data.length) {
    let accType = _find(data, {T110C003: ACCOUNT_TYPE_COMPANY});
    if(accType) return true;
  }
}

/**
 * @param {Object} account
 * @returns {String}
 * */
function validateAccount(account) {
  let errors = [];

  if(isCompany(account)) {
    if(!account[ACCOUNT_COMPANY_NAME]) {
      errors.push('Account name cannot be empty');
    }
  } else {
    if(!account[ACCOUNT_LAST_NAME]) {
      errors.push('Account name cannot be empty');
    }
  }

  return errors.join();
}

/**
 * @param {Object} account
 * @returns {String}
 * */
function getFullName(account) {
  if((!account[ACCOUNT_FIRST_NAME] && !account[ACCOUNT_LAST_NAME]) || isCompany(account)) {
    return account[ACCOUNT_COMPANY_NAME];
  }
  let fullName = '';
  if(account[ACCOUNT_FIRST_NAME]) {
    fullName += account[ACCOUNT_FIRST_NAME];
  }

  if(account[ACCOUNT_FIRST_NAME] && account[ACCOUNT_LAST_NAME]) fullName += ' ';

  if(account[ACCOUNT_LAST_NAME]) {
    fullName += account[ACCOUNT_LAST_NAME]
  }

  return fullName;
}

/**
 * @param {Object} rawAccountData - account instance received from REST API
 * @param {String=} pattern - format date with specific pattern
 * @returns {Date}
 * */
function getCreatedDate(rawAccountData, pattern) {
  return timeHelpers.formatTime(rawAccountData[ACCOUNT_CREATED_DATE], pattern);
}

/**
 * @param {Object} rawAccountData - account instance received from REST API
 * */
function getCreatedBy(rawAccountData) {
  if(rawAccountData[ACCOUNT_CREATED_BY_USER]) {
    return rawAccountData[ACCOUNT_CREATED_BY_USER][USER_NAME];
  }
}

/**
 * @param {Object} account
 * @param {Array} crmparams
 * @param {Object} meta
 * @param {String=} field
 * */
function getAccountType(account, crmparams, meta, field, def_type) {
  const {T006C017: accTypeTable, T006C018: column} = meta;

  let accType = account[accTypeTable];
  if(!accType || (accType && !accType.length)) return;

  let defaultType = _find(accType, type => type[accTypeTable + column].T001C003 === def_type);

  if(defaultType) {
    defaultType = defaultType[accTypeTable + column].T001C003;
  } else {
    defaultType = accType[0][accTypeTable + column].T001C003;
  }

  let foundAccType = _find(crmparams, {T001C003: defaultType});
  if(!foundAccType) return;

  if(field) {
    return foundAccType[field];
  }
  return foundAccType;
}

/**
 * @param {Object} account
 * */
function isAccountBlacklisted(account) {
  if(account && account.T113) {
    let blacklisted = _find(account.T113, {T113C004: 'LIST_FLAG'});
    if(blacklisted) return true;
  }
}

function getBlackListLabel(crmparams) {
  let blacklistObj = _find(crmparams, {T001C017: 'LIST_FLAG'});
  if(blacklistObj) {
    return blacklistObj.T001C005;
  }
}

/**
 * @param {Object} account
 * @returns {Number}
 * */
function getValueRate(account) {
  if(account.T112 && account.T112.length) {
    let valueRatingObject = _find(account.T112, {T112C004: 'VALUE_RATE'});
    if(!valueRatingObject) {
      return 0;
    }
    // TODO ?
    let valueRatingCode = valueRatingObject.T112C003;
    // just get last number from parameter code
    // need to optimize in future
    return Number(valueRatingCode.slice(-1));
  }
  return 0;
}

function updateCompanyType(account, table, value, meta) {
  // find data in account by table number
  let companyTypes = account[table];

  if(meta.unset) {
    let data = _find(companyTypes, {[table + 'C003']: meta.oldValue});
    let i = _indexOf(companyTypes, data);
    if(i !== -1) {
      companyTypes.splice(i, 1);
      return companyTypes;
    }
  }

  if(!companyTypes) {
    companyTypes = [{
      [table + 'C003']: value,
      [table + 'C004']: meta.parameter
    }];

  } else {
    let foundData = _find(companyTypes, {[table + 'C003']: meta.oldValue});
    let index = _indexOf(companyTypes, foundData);
    if(index !== -1) {
      foundData[table + 'C003'] = value;
      foundData[table + 'C004'] = meta.parameter;
      // replace object in array
      companyTypes.splice(index, 1, foundData);
    } else {
      companyTypes.push({
        [table + 'C003']: value,
        [table + 'C004']: meta.parameter
      });
    }
  }

  return companyTypes;
}

/**
 * @param {Object} account
 * @param {Object} meta
 * @returns {Array}
 * */
function addAddressType(account, meta) {
  let addressTypes = account[ACCOUNT_ADDRESS_TABLE];

  let addressType = {
    [ACCOUNT_ADDRESS_TABLE + 'C003']: meta.code,
    [ACCOUNT_ADDRESS_TABLE + 'C004']: meta.parameter
  };

  if(addressTypes && addressTypes.length) {
    addressTypes.push(addressType);
  } else {
    addressTypes = [addressType];
  }
  return addressTypes;
}

function saveUserImage(account, blob) {
  let data = account.T106;
  if(!data || (data && !data.length)) {
    data = [{
      T106C003: 'ARCHIVE',
      T106C004: 'ACCOUNT_IMAGE',
      T106C006: blob
    }];
  } else {
    data[0].T106C006 = blob;
  }
  return data;
}

function removeUserImage(account) {
  let data = account.T106;
  if(data && data.length) {
    let index = _findIndex(data, {T106C004: 'ACCOUNT_IMAGE'});
    if(index !== -1) {
      data.splice(index, 1);
    }
    return data;
  }
  return [];
}

function getUserImage(account) {
  let data = account.T106;
  if(data && data.length) {
    if(data[0].T106C006) {
      return window.atob(data[0].T106C006);
    }
  }
}

function findSelectedValue(account, table, column, params, field) {
  switch(table) {

    case 'T100':
      // if(params.length) {
      //   let accData = _find(params, param => param.T001C003 == account[table + column]);
      //   if(accData) info = accData.T001C005;
      //   break;
      // }
      if(column === 'C023') {
        if(!params.length) {
          return RECORD_STATUS_DEFAULT_ENABLED;
        }
        return String(account[table + column]);
      }
      return account[table + column];

    // case 'T110':
    //   if(column === 'C004') {
    //     info = getLeadStatus(account, crmparams, input.table, detailsControls.accountType.input, 'T001C004');
    //   }
    //   break;
    //
    // // do not do anything for address table
    // case 'T101':
    //   break;

    // case 'T107':
    //   if(account[table] && account[table].length && column === 'C004') {
    //     let idType = _find(params, param => param.T001C017 == account[table][0][table + 'C005']);
    //
    //     if(idType) {
    //       info = idType.T001C005 + ' ' + account[table][0].T107C003;
    //     }
    //   }
    //
    //   break;

    // case 'T120':
    //   info = accountHelpers.findCreatedBy(account);
    //   break;

    case 'T102': {
      let tableData = account[table];
      if(tableData && tableData.length) {
        let data;
        for(let i = 0; i < params.length; i++) {
          data = _find(tableData, {[table + 'C004']: params[i].T001C003});
          if(data) return data[table + column];
        }
      }
      break;
    }

    case 'T107': {
      let tableData = account[table];
      for(let i = 0; i < params.length; i++) {
        let found = _find(tableData, accData => {
          if(accData) {
            return accData[table + 'C004'] === params[i][CRM_PARAMS_PARAM_CODE];
          }
        });
        if(found) return found[table + 'C004'];
      }

      break;
    }

    case 'T115': {
      let tableData = account[table];
      for(let i = 0; i < params.length; i++) {
        let found = _find(tableData, accData => {
          if(accData) {
            return accData[table + 'C003'].T001C003 === params[i][CRM_PARAMS_PARAM_CODE];
          }
        });
        if(found) return found[table + 'C003'].T001C003;
      }

      break;
    }

    default: {
      let tableData = account[table];
      if(tableData && tableData.length) {
        //if(column === 'C003') {
        let data;
        for(let i = 0; i < tableData.length; i++) {
          if(_isObject(tableData[i][table + column]) && tableData[i][table + column].T001C003) {
            data = _find(params, {T001C003: tableData[i][table + column].T001C003});
          } else {
            data = _find(params, {T001C003: tableData[i][table + column]});
          }
          if(data) return data.T001C003;
        }
        // } else {
        //   let data;
        //   for(let i = 0; i < params.length; i++) {
        //     if(table === 'T102') {
        //       data = _find(tableData, {[table + 'C004']: params[i].T001C003});
        //     } else {
        //       data = _find(tableData, {[table + 'C003']: params[i].T001C003});
        //     }
        //     if(data) return data[table + column];
        //   }
        // }
      }
    }
  }
}

function setAccountBirthDate(value) {
  return value.length > 0 ? timeHelpers.parseTime(value, BIRTH_DATE_PATTERN, {utc: true}) : null;
}

/**
 * Update account info where only C003 column needed
 * */
function setC003Info(account, table, value, meta) {
  // find data in account by table number
  let accountData = account[table];

  if(meta.unset) {
    let data = _find(accountData, {[table + 'C003']: meta.oldValue});
    let i = _indexOf(accountData, data);
    if(i !== -1) {
      accountData.splice(i, 1);
      return accountData;
    }
  }

  if(!accountData) {
    return [{
      [table + 'C003']: value
    }];
  }

  let foundData = _find(accountData, {[table + 'C003']: meta.oldValue});
  let index = _indexOf(accountData, foundData);
  if(index !== -1) {
    foundData[table + 'C003'] = value;
    // replace object in array
    accountData.splice(index, 1, foundData);
    return accountData;
  } else {
    accountData.push({
      [table + 'C003']: value
    });
    return accountData;
  }
}

/**
 * Update account info where C003 - code from CRM params and C004 - parameter type
 * */
function setAccountSource(account, table, value, meta, crmparams) {
  let crmParam = crmParams.findByCode(crmparams, value);

  // find data in account by table number
  let accountSources = account[table];

  if(meta.unset) {
    let data = _find(accountSources, accData => {
      if(accData[table + 'C003']) {
        return accData[table + 'C003'].T001C003 === meta.oldValue;
      }
    });
    let i = _indexOf(accountSources, data);
    if(i !== -1) {
      accountSources.splice(i, 1);
      return accountSources;
    }
  }

  if(!accountSources) {
    return [{
      [table + 'C003']: {
        T001C001: crmParam.T001C001,
        T001C003: crmParam.T001C003
      },
      [table + 'C004']: crmParam.T001C017
    }];
  }

  let foundData = _find(accountSources, accData => {
    if(accData[table + 'C004']) {
      return accData[table + 'C004'].T001C017 === meta.parameter;
    }
  });
  let index = _indexOf(accountSources, foundData);
  if(index !== -1) {
    foundData[table + 'C003'] = crmParam;
    // replace object in array
    accountSources.splice(index, 1, foundData);
    return accountSources;
  }
  accountSources.push({
    [table + 'C003']: {
      T001C001: crmParam.T001C001,
      T001C003: crmParam.T001C003
    },
    [table + 'C004']: crmParam.T001C017
  });
  return accountSources;
}

function setCommunicationInfo(account, table, column, value, meta) {
// find data in account by table number
  let accountData = account[table];

  if(!accountData) {
    return [{
      [table + column]: value,
      [table + 'C004']: meta.T001C003
    }];
  }

  let foundData = _find(accountData, {[table + 'C004']: meta.T001C003});
  let index = _indexOf(accountData, foundData);
  if(index !== -1) {
    foundData[table + column] = value;
    // replace object in array
    accountData.splice(index, 1, foundData);
    return accountData;
  } else {
    accountData.push({
      [table + column]: value,
      [table + 'C004']: meta.T001C003
    });
    return accountData;
  }
}

function setAddressInfo(account, table, column, value, meta) {
  let addresses = account[table];

  if(addresses) {
    let addr;
    if(meta._addressTypeNumber) {
      addr = addresses[meta._addressTypeNumber];
    } else {
      addr = addresses[0];
      if(!addr) addr = {
        [table + 'C003']: HOME_ADDRESS_CODE,
        [table + 'C004']: HOME_ADDRESS_PARAMETER
      };
    }
    addr[table + column] = value;
    addresses.splice(meta._addressTypeNumber, 1, addr);
    return addresses;
  }

  return [{
    [table + 'C003']: HOME_ADDRESS_CODE,
    [table + 'C004']: HOME_ADDRESS_PARAMETER,
    [table + column]: value
  }];
}

function setExternalId(account, table, column, value, meta) {
  let data = account[table];

  if(meta && meta.unset) {
    let extId = account[table];
    if(extId && extId.length) {
      delete extId[0][table + 'C004'];
      delete extId[0][table + 'C005'];
    }
    return extId;
  }

  if(column === 'C003') {
    if (!data || (data && !data.length)) {
      return [{
        [table + column]: value
      }];
    }
    data[0][table + column] = value;
    return data;
  }

  if(!data || (data && !data.length)) {
    return [{
      [table + column]: value,
      [table + 'C005']: meta.parameter
    }];
  }
  // update first external id
  data[0][table + column] = value;
  data[0][table + 'C005'] = meta.parameter;
  return data;
}

function setNationality(account, table, value, meta) {
// find data in account by table number
  let accountData = account[table];

  if(meta.unset) {
    let data = _find(accountData, {[table + 'C003']: meta.oldValue});
    let i = _indexOf(accountData, data);
    if(i !== -1) {
      accountData.splice(i, 1);
      return accountData;
    }
  }

  if(!accountData) {
    return [{
      [table + 'C003']: value,
      [table + 'C004']: meta.parameter
    }];
  }

  let foundData = _find(accountData, {[table + 'C003']: meta.oldValue});
  let index = _indexOf(accountData, foundData);
  if(index !== -1) {
    foundData[table + 'C003'] = value;
    // replace object in array
    accountData.splice(index, 1, foundData);
    return accountData;
  } else {
    accountData.push({
      [table + 'C003']: value,
      [table + 'C004']: meta.parameter
    });
    return accountData;
  }
}

// TODO optimize function parameters
function changeAccountInfo(account, table, column, value, meta, crmparams, users) {
  let newData;

  switch(table) {
    case 'T100': {
      if(column === 'C011') {
        newData = setAccountBirthDate(value);
      } else if(meta && meta.unset && (column === 'C014' || column === 'C015')) {
        newData = null;
      } else {
        newData = value;
      }
      break;
    }
    case 'T101': {
      newData = setAddressInfo(account, table, column, value, meta);
      break;
    }
    case 'T102': {
      newData = setCommunicationInfo(account, table, column, value, meta);
      break;
    }
    case 'T103': {
      newData = setC003Info(account, table, value, meta);
      break;
    }
    case 'T104': {
      newData = setC003Info(account, table, value, meta);
      break;
    }
    case 'T105': {
      newData = setNationality(account, table, value, meta);
      break;
    }
    case 'T107': {
      newData = setExternalId(account, table, column, value, meta);
      break;
    }
    case 'T112': {
      newData = updateCompanyType(account, table, value, meta);
      break;
    }
    case 'T114': {
      newData = updateCompanyType(account, table, value, meta);
      break;
    }
    case 'T115': {
      newData = setAccountSource(account, table, value, meta, crmparams);
      break;
    }
    case 'T118': {
      newData = updateCompanyType(account, table, value, meta);
      break;
    }
  }

  return newData;
}
