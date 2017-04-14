'use strict';

import _find from 'lodash/find';
import _isString from 'lodash/isString';

export default {
  findById,
  validateUserAuth,
  getUserLocaleId
};

function findById(users, id) {
  if(_isString(id)) {
    id = Number(id);
  }
  return _find(users, {T012C001: id});
}

/**
 * @param {Object} user
 * */
function getUserLocaleId(user) {
  return user.T012C005.T004C001;
}

/**
 * @param {Object} credentials
 * @returns {String}
 * */
function validateUserAuth(credentials) {
  let errors = [];
  if(!credentials.username) {
    errors.push('Username required');
  }
  if(!credentials.password) {
    errors.push('Password required');
  }

  return errors.join();
}
