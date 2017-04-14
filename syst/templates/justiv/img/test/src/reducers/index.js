'use strict';

import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import pageControls from './pageControlsReducer';
import accounts from './accountsReducer';
import leads from './leadsReducer';
import UIState from './UIStateReducer';
import crmParams from './crmParamsReducer';
import selectOptions from './selectOptionsReducer';
import users from './usersReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  pageControls,
  accounts,
  leads,
  UIState,
  crmParams,
  selectOptions,
  users
});

export default rootReducer;
