'use strict';

/**
 * This file contains all constants except action names
 * probably will be divided into smaller files
 *
 * all constants will be moved into constants folder
 * */
// TODO remove this file and bring all constants into constants folder
export const apiAddress = process.env.NODE_ENV === 'production' ?
  window.PROD_API_ADDR || require('../app-config.prod.json').api :
  'http://localhost:8090';

// MD5 hash for encrypting Redux store.
export const secret = 'd41d8cd98f00b204e9800998ecf8427e';

// HTTP Status codes
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_NOT_FOUND = 404;

// Screens identifiers
export const BASE_SCREEN              = 9000;
export const LOGIN_SCREEN             = 9001;
export const ACCOUNTS_OVERVIEW_SCREEN = 1000;
export const ACCOUNT_DETAILS_SCREEN   = 1010;

export const GLOBAL_CRM_PARAMS_TABLE      = 'T001';
export const GLOBAL_CRM_PARAMETER_TYPE    = GLOBAL_CRM_PARAMS_TABLE + 'C017';

export const CONTROLS_TABLE               = 'T006';
export const CONTROL_NUMBER               = CONTROLS_TABLE + 'C001';
export const CONTROL_TEXT                 = CONTROLS_TABLE + 'C002';
export const CONTROLS_DESCRIPTION         = CONTROLS_TABLE + 'C013';

export const ACCOUNTS_TABLE               = 'T100';
export const ACCOUNT_ASSIGNED_ID          = ACCOUNTS_TABLE + 'C002';
export const ACCOUNT_CREATED_DATE         = ACCOUNTS_TABLE + 'C022';

export const ACCOUNT_ADDRESSES            = 'T101';
export const ACCOUNT_ADDRESS_TYPE_COLUMN  = ACCOUNT_ADDRESSES + 'C004';
export const ADDRESS_NAME                 = ACCOUNT_ADDRESSES + 'C005';
export const ADDRESS_STREET_1             = ACCOUNT_ADDRESSES + 'C006';
export const ADDRESS_STREET_2             = ACCOUNT_ADDRESSES + 'C007';
export const ADDRESS_POSTAL_ZIP           = ACCOUNT_ADDRESSES + 'C008';
export const ADDRESS_CITY                 = ACCOUNT_ADDRESSES + 'C009';
export const ADDRESS_COUNTRY              = ACCOUNT_ADDRESSES + 'C010';
export const ADDRESS_COUNTRY_STATE        = ACCOUNT_ADDRESSES + 'C011';

export const COMMUNICATION_TYPES          = 'T102';

export const COMMUNICATION_TYPE_CODE_COLUMN   = COMMUNICATION_TYPES + 'C004';
export const COMMUNICATION_TYPE_VALUE         = COMMUNICATION_TYPES + 'C005';

// control types
export const CONTROL_TYPE_PANEL           = 'panel';

// Global params

/**
 * Helper constants for sorting controls
 * */
export const SELECT_OPTION_PANEL          = 'Select Option panel';

/**
 * Language parameter that is passing in query string
 * */
export const LANG_PARAM = 'T004C001';

//categories
export const CATEGORY_COLUMN  = 'T001C016';

export const PARAMETER_TYPE     = 'Parameter Type';
export const PARAMETER_CATEGORY = 'Parameter Category';

/**
 * CRM params categories
 * */

export const ACCOUNT_TYPE     = 'ACCOUNT_TYPE';
// types
export const VALUE_RATE = 'VALUE_RATE';
export const LIST_FLAG = 'LIST_FLAG';

export const ADDRESS_HOME     = 'ADR_HOME';
export const ADDRESS_BUSINESS = 'ADR_BUSINESS';

export const COMMUNICATION_PHONE_HOME     = 'PHONE1';
export const COMMUNICATION_PHONE_OFFICE   = 'PHONE2';
export const COMMUNICATION_PHONE_MOBILE   = 'PHONE3';
export const COMMUNICATION_MAIL_PRIVATE   = 'MAIL1';
export const COMMUNICATION_MAIL_BUSINESS  = 'MAIL2';
export const COMMUNICATION_WEB_PRIVATE    = 'WEB_1';
export const COMMUNICATION_WEB_BUSINESS   = 'WEB_2';

export const COUNTRY_DE       = 'CTRY_DE';
export const COUNTRY_AT       = 'CTRY_AT';
export const COUNTRY_US       = 'CTRY_US';

/**
 * Accounts overview controls
 * */
export const ACCOUNTS_COUNT                       = 10001111;
export const ACCOUNTS_SELECTION_DROPDOWN_BOX      = 10001120;
export const SEARCH_ACCOUNT_TYPE_LIST_BOX         = 10001222;
export const SEARCH_BOX_PLACEHOLDER               = 10001230;
export const ACCOUNT_FILTER_BY_LIST_BOX           = 10001322;
export const SELECT_ALL_LIST_BOX                  = 10002020;

// Sort directions
export const SORT_DIRECTION_ASC   = 'asc';
export const SORT_DIRECTION_DESC  = 'desc';

// Date patterns using with Moment.js library
export const DATE_PATTERN_DAY_CREATED   = 'DD-MMM-YYYY';
export const DATE_PATTERN_TIME_CREATED  = 'HH:mm:ss';
