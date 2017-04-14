'use strict';

import {
  CONTROL_NUMBER, CONTROL_TEXT,
  SELECT_OPTION_PANEL,
  CONTROL_TYPE_PANEL
  } from '../../constants';
import {CRM_PARAMS_TABLE, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME, CRM_PARAMS_PARAM_VALUE, CONTROL_PARENT, CONTROL_ORDER_NUMBER_COLUMN, CONTROL_VAR_TABLE_NUMBER, CONTROL_VAR_COLUMN_NUMBER} from '../../constants/db';
import {EXTERNAL_ID_BOX} from '../../constants/temp';
import {BUTTON, COMBOBOX, CHECKBOX, PANEL, COMBOBOX_WITH_CHECKBOXES, LISTBOX, TEXTBOX, LABEL} from '../../constants/controlTypes';
import pageControlsHelpers from './index';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _map from 'lodash/map';
import _concat from 'lodash/concat';

// lodash methods for chaining
import _flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import each from 'lodash/fp/each';

export default {
  formPanels,
  findValueByCode,
  findParameterByCode,
  prepareSelectOptionsList
};

// TODO bring that method into selectOptions helpers
/**
 * @param {Array} selectOptionsList
 * @param {Object} targetSelect
 * */
function prepareSelectOptionsList(selectOptionsList, targetSelect) {
  return _flow(
    filter(selectOption => selectOption.T020C002 === targetSelect[CRM_PARAMS_PARAM_CODE]),
    sortBy([element => element.T020C007 === CONTROL_ORDER_NUMBER_COLUMN])
    //map(option => {
    //  return {
    //    optionId: option.T020C001,
    //    allowAddNew: option.T020C003,
    //    display: option.T020C005,
    //    code: option.T020C002,
    //    control: option.T020C007,
    //    label: option.T020C007.T006C033.trim(),
    //    loading: option._loading,
    //    id: option.T020C007.T006C001
    //  };
    //})
  )(selectOptionsList);
}

/**
 * @param {Object} sortedControls
 * @param {Object} parentElement
 * */
function getPanelHeader(sortedControls, parentElement) {
  let comboboxHeader = _find(sortedControls[COMBOBOX_WITH_CHECKBOXES], {[CONTROL_PARENT]: parentElement[CONTROL_NUMBER]});
  if(!comboboxHeader) return '';

  if(comboboxHeader[CRM_PARAMS_TABLE]) {
    return comboboxHeader;
  }
}

/**
 *
 * */
function isAddressSection(sectionHeader) {
  if(!sectionHeader) return false;
  return sectionHeader[CRM_PARAMS_PARAM_CODE] === "1010_4";
}

/**
 * @param {Object} sortedControls
 * @param {Array} selectOptions
 * */
function formPanels(sortedControls, selectOptions) {

  let panels = [];

  _flow(
    filter(panel => pageControlsHelpers.hasDescription(panel, SELECT_OPTION_PANEL)),
    sortBy(CONTROL_ORDER_NUMBER_COLUMN),
    each(container => {
      panels.push(formPanelMetadata(sortedControls, container, selectOptions));
    })
  )(sortedControls[PANEL]);

  return panels;
}

/**
 * @private
 * */
function formCheckboxObject(rawCheckbox) {
  let checkbox = {};

  checkbox.id = rawCheckbox[CONTROL_NUMBER];
  checkbox.label = rawCheckbox[CONTROL_TEXT].trim();
  checkbox.table = rawCheckbox[CONTROL_VAR_TABLE_NUMBER];
  checkbox.column = rawCheckbox[CONTROL_VAR_COLUMN_NUMBER];

  if(rawCheckbox[CRM_PARAMS_TABLE] && rawCheckbox[CRM_PARAMS_TABLE].length) {
    checkbox.params = rawCheckbox[CRM_PARAMS_TABLE];
  }

  return checkbox;
}

/**
 * @private
 * @param {Object} sortedControls
 * @param {Object} container
 * @returns {Array}
 * */
function findCheckboxes(sortedControls, container) {
  let items = [];

  _flow(
    filter(rawCheckbox => rawCheckbox[CONTROL_PARENT] === container[CONTROL_NUMBER]),
    sortBy(CONTROL_ORDER_NUMBER_COLUMN),
    each(checkbox => {
      items.push(formCheckboxObject(checkbox));
    })
  )(sortedControls[CHECKBOX]);

  return items;
}

function findSelectOptionFooter(sortedControls, headerEl) {
  let controls = _concat(sortedControls[BUTTON], sortedControls[LABEL], sortedControls[LISTBOX]);

  controls = _filter(controls, control => control[CONTROL_PARENT] === headerEl[CONTROL_NUMBER]);
  if(controls.length) {
    // TODO ?
    // render submenu for address
    if(headerEl[CONTROL_NUMBER] === 10105010) {
      return {
        label: pageControlsHelpers.getControlById(controls, 10105012)[CONTROL_TEXT], // TODO remove control ids
        submenu: {
          label: pageControlsHelpers.getControlById(controls, 10105030)[CONTROL_TEXT],
          items: pageControlsHelpers.getControlById(controls, 10105031).T001
        }
      };
    }
    return {
      label: controls[controls.length - 1][CONTROL_TEXT]
    };
  }
}

function findSelectOptionCodes(sortedControls, container, headerEl) {
  let element = _find(sortedControls[COMBOBOX_WITH_CHECKBOXES], {[CONTROL_PARENT]: container[CONTROL_NUMBER]});

  if(element && element[CRM_PARAMS_TABLE]) {
    return {
      meta: element[CRM_PARAMS_TABLE][0],
      footer: findSelectOptionFooter(sortedControls, headerEl)
    };
  }
}

function findTooltip(sortedControls, container) {
  let tooltip = _find(sortedControls[LABEL], label => {
    return label['T006C016'] === container.T006C001 &&
      label.T006C001 === label.T006C016 + 5;
  });
  if(tooltip) {
    return {
      label: tooltip.T006C002,
      id: tooltip.T006C001
    };
  }
}

function formInputs(sortedControls, container) {
  let allInputs = _concat(sortedControls[LISTBOX], sortedControls[COMBOBOX_WITH_CHECKBOXES], sortedControls[COMBOBOX], sortedControls[TEXTBOX]),
      comboboxStandard = _find(sortedControls[COMBOBOX], {T006C016: container[CONTROL_NUMBER]});

  return _flow(
    filter(input => input.T006C016 === comboboxStandard[CONTROL_NUMBER]),
    sortBy(CONTROL_ORDER_NUMBER_COLUMN),
    map(input => {
      let type = defineInputType(input.T006C015, input.T006C001);

      if(input.T006C001 === EXTERNAL_ID_BOX) {}

      return {
        id: input.T006C001,
        params: input.T001,
        type,
        table: input.T006C017,
        column: input.T006C018,
        defaultVal: input.T006C025,
        label: input.T006C033.trim()
      };
    })
  )(allInputs);
}

function formInputsWithSelectOptions(sortedControls, container, selectOptions) {
  let comboboxStandard = _find(sortedControls[COMBOBOX], {T006C016: container[CONTROL_NUMBER]});

  // TODO ?
  let allInputs = _concat(sortedControls[LISTBOX], sortedControls[COMBOBOX_WITH_CHECKBOXES], sortedControls[COMBOBOX], sortedControls[TEXTBOX]);
  allInputs = _filter(allInputs, input => input.T006C016 === comboboxStandard[CONTROL_NUMBER]);
  //

  return _flow(
    filter(input => {
      if(input.T020C007) {
        return input.T020C007.T006C016 === comboboxStandard[CONTROL_NUMBER];
      }
    }),
    //sortBy('T020C008'),
    map((input) => {
      let control = input.T020C007;

      let type = defineInputType(control.T006C015, control.T006C001);
      let params = _find(allInputs, {T006C001: control.T006C001});

      return {
        id: control.T006C001,
        params: params.T001,
        number: input.T020C008,
        type,
        table: control.T006C017,
        column: control.T006C018,
        defaultVal: control.T006C025,
        label: control.T006C033.trim(),
        display: input.T020C005
      };
    })
  )(selectOptions);
}

/**
 * @private
 *
 * */
function formPanelMetadata(sortedControls, container, selectOptions) {
  let panelHeader = getPanelHeader(sortedControls, container);

  let isAddress = false, panelMetadata;
  if(isAddressSection(panelHeader[CRM_PARAMS_TABLE][0])) {
    isAddress = true;

    // TODO
    panelMetadata = {
      table: 'T101',
      column: 'C004'
    };
  }

  let inputs;
  if(selectOptions && selectOptions.length) {
    inputs = formInputsWithSelectOptions(sortedControls, container, selectOptions)
  } else {
    inputs = formInputs(sortedControls, container);
  }

  return {
    id: panelHeader.T006C001,
    header: panelHeader[CRM_PARAMS_TABLE][0][CRM_PARAMS_PARAM_VALUE],
    inputs,
    selectOptions: findSelectOptionCodes(sortedControls, container, panelHeader),
    checkboxes: findCheckboxes(sortedControls, container),
    isAddressSection: isAddress,
    tooltip: findTooltip(sortedControls, container),
    panelMetadata
  };
}

function findValueByCode(account, codeObject, tableNum) {
  let valObj = _find(account[tableNum], {[tableNum + 'C004']: codeObject[CRM_PARAMS_PARAM_CODE]});
  if(valObj) {
    return valObj[tableNum + 'C005'];
  }
  return '';
}

function findParameterByCode(params, parameterObject) {
  let valObj = _find(params, {[CRM_PARAMS_PARAM_CODE]: parameterObject[CRM_PARAMS_PARAM_CODE]});
  if(valObj) {
    return valObj[CRM_PARAMS_PARAM_CODE];
  }
  return '';
}

function defineInputType(inputTypeNum, inputNumber) {
  // workaround: set specific types for some controls by control number
  if(inputNumber === 10106111) {
    return 'input_birth_date';
  }
  if(inputNumber === EXTERNAL_ID_BOX) {
    return 'external_id_field';
  }

  if(inputNumber === 10102130 || inputNumber === 10108113) {
    return 'textarea';
  }
  if(inputNumber === 10103111) {
    return 'assigned_to_field';
  }
  //

  switch(String(inputTypeNum)) {
    case TEXTBOX: {
      return 'input_text';
    }
    case COMBOBOX_WITH_CHECKBOXES: {
      return 'select_combo';
    }
    case LISTBOX: {
      return 'select';
    }
    case COMBOBOX: {
      return 'select_multi';
    }
  }
}
