/**
 * All constants will be moved to this files in future
 * */

/**
 * Probably API will be available for fetching all info about tables and columns
 * currently not available
 * */

// Statuses
export const STATUS_ENABLED                 = 1;
export const STATUS_DISABLED                = 0;
export const STATUS_DELETED                 = 2;

// Categories
export const ACCOUNT_TYPE                   = 'ACCOUNT_TYPE';

export const CRM_PARAMS_TABLE               = 'T001';
export const CRM_PARAMS_TABLE_INDEX         = CRM_PARAMS_TABLE + 'C001';
export const CRM_PARAMS_PARAM_CODE          = CRM_PARAMS_TABLE + 'C003';
export const CRM_PARAMS_PARAM_NAME          = CRM_PARAMS_TABLE + 'C004';
export const CRM_PARAMS_PARAM_VALUE         = CRM_PARAMS_TABLE + 'C005';
export const CRM_PARAMS_PARAM_CATEGORY      = CRM_PARAMS_TABLE + 'C016';
export const CRM_PARAMS_PARAM_TYPE          = CRM_PARAMS_TABLE + 'C017';
export const CRM_PARAMS_SORTING             = CRM_PARAMS_TABLE + 'C022';
export const CRM_PARAMS_DEFAULT_VALUE       = CRM_PARAMS_TABLE + 'C023';
export const CRM_PARAMS_STATUS              = CRM_PARAMS_TABLE + 'C024';

export const LANGUAGES_TABLE                = 'T004';
export const LANGUAGE_ID                    = LANGUAGES_TABLE + 'C001';

export const CONTROLS_TABLE                 = 'T006';
export const CONTROL_NUMBER                 = CONTROLS_TABLE + 'C001';
export const CONTROL_TEXT                   = CONTROLS_TABLE + 'C002';
export const CONTROL_TYPE                   = CONTROLS_TABLE + 'C015';
export const CONTROL_PARENT                 = CONTROLS_TABLE + 'C016';
export const CONTROL_VAR_TABLE_NUMBER       = CONTROLS_TABLE + 'C017';
export const CONTROL_VAR_COLUMN_NUMBER      = CONTROLS_TABLE + 'C018';
export const CONTROL_ORDER_NUMBER_COLUMN    = CONTROLS_TABLE + 'C022';

export const USER_TABLE                     = 'T012';
export const USER_ID                        = USER_TABLE + 'C001';
export const USER_NAME                      = USER_TABLE + 'C002';
export const USER_PASSWORD                  = USER_TABLE + 'C004';
export const USER_DEFAULT_LANGUAGE          = USER_TABLE + 'C005';

export const SELECT_OPTION_TABLE            = 'T020';
export const SELECT_OPTION_SORT_ORDER       = SELECT_OPTION_TABLE + 'C008';

export const ACCOUNT_TABLE                  = 'T100';
export const ACCOUNT_ID                     = ACCOUNT_TABLE + 'C001';
export const ACCOUNT_ASSIGNED_ID            = ACCOUNT_TABLE + 'C002';
export const ACCOUNT_LAST_NAME              = ACCOUNT_TABLE + 'C003';
export const ACCOUNT_FIRST_NAME             = ACCOUNT_TABLE + 'C004';
export const ACCOUNT_SECOND_NAME            = ACCOUNT_TABLE + 'C005';
export const ACCOUNT_OTHER_NAME             = ACCOUNT_TABLE + 'C006';
export const ACCOUNT_ALIAS_NAME             = ACCOUNT_TABLE + 'C007';
export const ACCOUNT_PREV_SURNAME           = ACCOUNT_TABLE + 'C008';
export const ACCOUNT_COMPANY_NAME           = ACCOUNT_TABLE + 'C009';
export const ACCOUNT_DESCRIPTION            = ACCOUNT_TABLE + 'C010';
export const ACCOUNT_BIRTH_DATE             = ACCOUNT_TABLE + 'C011';
export const ACCOUNT_BIRTH_PLACE            = ACCOUNT_TABLE + 'C012';
export const ACCOUNT_GUID                   = ACCOUNT_TABLE + 'C013';
export const ACCOUNT_GENDER                 = ACCOUNT_TABLE + 'C014';
export const ACCOUNT_MARITAL_STATUS         = ACCOUNT_TABLE + 'C015';
export const ACCOUNT_COMPANY_DESCRIPTION    = ACCOUNT_TABLE + 'C016';
export const ACCOUNT_CREATED_BY_USER        = ACCOUNT_TABLE + 'C021';
export const ACCOUNT_CREATED_DATE           = ACCOUNT_TABLE + 'C022';
export const ACCOUNT_STATUS                 = ACCOUNT_TABLE + 'C023';

export const ACCOUNT_ADDRESS_TABLE          = 'T101';
export const COMMUNICATION_TABLE            = 'T102';
export const ACCOUNT_TITLE_TABLE            = 'T103';
export const ACCOUNT_LANGUAGE_TABLE         = 'T104';
export const ACCOUNT_NATIONALITY_TABLE      = 'T105';
export const ACCOUNT_ARCHIVE_TABLE          = 'T106';
export const ACCOUNT_EXTERNAL_ID            = 'T107';
export const ACCOUNT_TYPE_TABLE             = 'T110';
export const ACCOUNT_CLASSIFICATION_TABLE   = 'T112';
export const ACCOUNT_FLAG_TABLE             = 'T113';
export const ACCOUNT_PREFERENCES_TABLE      = 'T114';
export const ACCOUNT_SOURCE_TABLE           = 'T115';
export const COMPANY_CONTACTS_TABLE         = 'T116';
export const COMPANY_TYPES_TABLE            = 'T118';
export const ACCOUNT_USER_ASSIGNMENT_TABLE  = 'T120';

// Controls
export const ACCOUNT_DETAILS_ACCOUNT_TYPE_LABEL           = 10101008;

/**
 * Fields that must be sended to server when saving account data,
 * all other fields will be omitted
 * */
export const ACCOUNTS_FIELDS_TO_SAVE = [
  ACCOUNT_ID,
  ACCOUNT_ASSIGNED_ID,
  ACCOUNT_LAST_NAME,
  ACCOUNT_FIRST_NAME,
  ACCOUNT_SECOND_NAME,
  ACCOUNT_OTHER_NAME,
  ACCOUNT_ALIAS_NAME,
  ACCOUNT_PREV_SURNAME,
  ACCOUNT_COMPANY_NAME,
  ACCOUNT_DESCRIPTION,
  //ACCOUNT_COMPANY_DESCRIPTION,
  ACCOUNT_STATUS,
  ACCOUNT_BIRTH_DATE,
  ACCOUNT_BIRTH_PLACE,
  ACCOUNT_CREATED_DATE,
  ACCOUNT_GENDER,
  ACCOUNT_MARITAL_STATUS,

  ACCOUNT_ADDRESS_TABLE,
  COMMUNICATION_TABLE,
  ACCOUNT_TITLE_TABLE,
  ACCOUNT_LANGUAGE_TABLE,
  ACCOUNT_NATIONALITY_TABLE,
  ACCOUNT_ARCHIVE_TABLE,
  ACCOUNT_TYPE_TABLE,
  ACCOUNT_CLASSIFICATION_TABLE,
  ACCOUNT_EXTERNAL_ID,
  ACCOUNT_FLAG_TABLE,
  ACCOUNT_PREFERENCES_TABLE,
  ACCOUNT_SOURCE_TABLE,
  COMPANY_CONTACTS_TABLE,
  COMPANY_TYPES_TABLE,
  ACCOUNT_USER_ASSIGNMENT_TABLE
];
