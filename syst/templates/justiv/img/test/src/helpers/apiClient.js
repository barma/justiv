'use strict';

import axios from 'axios';
import {apiAddress, HTTP_UNAUTHORIZED} from '../constants';
import store from '../store/configureStore';
import * as authActions from '../actions/authActions';

const PROTECTION_PREFIX = /^\)\]\}',?\n/;

const apiClient = axios.create({
  baseURL: apiAddress
});

apiClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

apiClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if(error.response.status === HTTP_UNAUTHORIZED) {
    return store.dispatch(authActions.loginUnauthorized());
  }

  return Promise.reject(error);
});

export default apiClient;
