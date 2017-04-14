'use strict';

import {BIRTH_DATE_PATTERN} from '../constants/application';
import moment from 'moment';

export default {
  formatTime,
  parseTime,
  formatBirthDate
};

/**
 * @param {Number} timestamp
 * @param {String} pattern
 * */
function formatTime(timestamp, pattern, params = {}) {
  if(params.withOffset) {
    return formatTimeWithOffset(timestamp, pattern);
  }
  return moment(timestamp).format(pattern);
}

function formatTimeWithOffset(timestamp, pattern) {
  let offset = moment(timestamp).utcOffset();
  if(offset > 0) {
    return moment(timestamp).add(offset, 'minutes').format(pattern);
  }
  return moment(timestamp).subtract(offset, 'minutes').format(pattern);
}

/**
 *
 * */
function parseTime(date, pattern, params = {}) {
  if(params.utc) {
    return parseTimeUTC(date, pattern);
  }
  return moment(date, pattern).valueOf();
}

function parseTimeUTC(date, pattern) {
  return moment(date, pattern).toDate().getTime() -
    moment(date, pattern).toDate().getTimezoneOffset() * 60000;

  //let offset = moment(date, pattern).utcOffset();
  //if(offset > 0) {
  //  return moment(date, pattern).add(offset, 'minutes').utc().valueOf();
  //}
  //return moment(date, pattern).subtract(offset, 'minutes').valueOf();
}

/**
 * @private
 * @param {String} input
 * */
function parseDate(input) {
  return moment(input, [
    "DD-MM-YYYY",
    "DD/MM/YYYY",
    "DD/MM-YYYY",
    "DD-MM/YYYY",
    "DD|MM|YYYY",
    "DD MM YYYY",
    "DD_MM_YYYY",
    "DD.MM.YYYY",
    "D-M-YYYY",
    "D/M/YYYY",
    "D/M-YYYY",
    "D-M/YYYY",
    "D|M|YYYY",
    "D M YYYY",
    "D_M_YYYY",
    "D.M.YYYY"
  ]);
}

function formatBirthDate(input) {
  let parsedDate = parseDate(input);

  if(parsedDate.isValid()) {
    return parsedDate.format(BIRTH_DATE_PATTERN);
  }
  return '';

}
