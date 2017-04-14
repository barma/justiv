'use strict';

import _each from 'lodash/each';
import _find from 'lodash/find';

export default {
  formatLocalesList,
  setActiveLocale,
  getActiveLocaleId,
  isDefaultLocale
};

/**
 * @param {Array} rawLocales
 * @return {Object}
 * */
function formatLocalesList(rawLocales) {
  let formattedLocales = {};
  for(let i = 0; i < rawLocales.length; i++) {
    formattedLocales[rawLocales[i].T004C002] = {
      id: rawLocales[i].T004C001,
      default: rawLocales[i].T004C004
    };
  }

  return formattedLocales;
}

/**
 * Check if default locale is active
 * @return {Boolean}
 * */
function isDefaultLocale(locales) {
  let locale = _find(locales, {default: true});
  return locale.id === 0;
}

function getActiveLocaleId(locales) {
  let locale = _find(locales, {default: true});
  if(!locale) return 0;
  return locale.id;
}

function setActiveLocale(locales, activeLocaleId) {
  _each(locales, locale => {
    locale.default = locale.id === activeLocaleId;
  });
  return locales;
}
