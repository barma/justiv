'use strict';

import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

export const isLoggedIn = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  predicate: auth => auth.isAuthenticated
});
