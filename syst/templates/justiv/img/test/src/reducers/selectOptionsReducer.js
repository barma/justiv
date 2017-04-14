'use strict';

import {
  SELECT_OPTIONS_REQUEST, SELECT_OPTIONS_RECEIVED,
  SELECT_OPTION_REQUEST, SELECT_OPTION_RECEIVED,
  SELECT_OPTION_LIST_UPDATE, SELECT_OPTIONS_UPDATE_SUCCESS
  } from '../actions/actionTypes';
import _find from 'lodash/find';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';

export default function selectOptionsReducer(state = {}, action = {}) {

  switch (action.type) {

    case SELECT_OPTIONS_REQUEST:
      return Object.assign({}, state);

    case SELECT_OPTIONS_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        [action.data.type]: action.data.selectOptions
      });

    case SELECT_OPTIONS_UPDATE_SUCCESS: {

      let options = state[action.data.type].slice(0);
      _each(action.data.selectOptions, selectOption => {
        let index = _findIndex(state[action.data.type], oldSelectOption => {
          if(oldSelectOption.T020C007) {
            return oldSelectOption.T020C007.T006C001 === selectOption.T020C007.T006C001;
          }
        });
        if(index !== -1) {
          options.splice(index, 1, selectOption);
        } else {
          options.push(selectOption);
        }
      });

      return Object.assign({}, state, {
        isFetching: false,
        [action.data.type]: options
      });

    }

    case SELECT_OPTION_REQUEST: {
      let options = state[action.data.type].slice(0);

      let option = _find(options, {T020C001: action.data.selectOption.T020C001});

      option._loading = true;

      return Object.assign({}, state, {
        isFetching: false,
        [action.data.type]: options
      });
    }
    case SELECT_OPTION_RECEIVED: {
      let options = state[action.data.type].slice(0);

      let optionIndex = _findIndex(options, option => {
        if(option.T020C007) {
          return option.T020C007.T006C001 === action.data.selectOption.T020C007.T006C001;
        }
      });

      if(optionIndex !== -1) {
        action.data.selectOption.T020C007.T006C033 = action.data.selectOption.T020C007.T006C033 || action.data.existingSelectOption.T020C007.T006C033;
        options.splice(optionIndex, 1, action.data.selectOption);
      }

      //delete options[optionIndex]._loading;

      return Object.assign({}, state, {
        isFetching: false,
        [action.data.type]: options
      });
    }

    case SELECT_OPTION_LIST_UPDATE: {
      let options = state[action.data.type].slice(0);

      let optionIndex = _findIndex(options, {T020C001: action.data.selectOption.T020C001});

      if(optionIndex === -1) {
        options.push(action.data.selectOption);
      } else {
        optionIndex = options.splice(optionIndex, 1, action.data.selectOption);
      }

      return Object.assign({}, state, {
        isFetching: false,
        [action.data.type]: options
      });
    }

    default:
      return state;
  }
}
