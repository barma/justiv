'use strict';

import React from 'react';

import pageControlsHelpers from '../../../../helpers/pageControlsHelpers';
import accountHelpers from '../../../../helpers/account';
import userHelpers from '../../../../helpers/user';
import crmParamsHelpers from '../../../../helpers/crmParams';

import _find from 'lodash/find';

import DropdownMenu from '../../../Common/Menus/DropdownMenu/DropdownMenu';
import AccountInfoMultipleDropdownBox from './AccountInfoMultipleDropdownBox';
import AccountInfoDropdownBox from './AccountInfoDropdownBox';
import AccountInfoExternalIdBox from './AccountInfoExternalIdDropdownBox.js';
import BirthDateInput from '../../../Common/Forms/BirthDateInput';
import Textarea from '../../../Common/Forms/Textarea';
import TextInput from '../../../Common/Forms/TextInput';

export default class AccountInfoInputRow extends React.Component {

  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
  }

  renderInput() {
    let {inputs, user, account, users, addressTypeNumber} = this.props;

    let cols = [];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i],
          inputEl,
          val;

      let defaultValue = pageControlsHelpers.getDefaultValueByLocale(input.defaultVal, userHelpers.getUserLocaleId(user));

      let selectedValue = accountHelpers.findSelectedValue(account, input.table, input.column, input.params);

      // Workaround: find address information here
      if(account[input.table] && account[input.table].length && addressTypeNumber >= 0) {
        if(account[input.table][addressTypeNumber]) {
          selectedValue = account[input.table][addressTypeNumber][input.table + input.column];
        }
      }
      //

      // disable deselect for record status
      if(input.table === 'T100' && input.column === 'C023') {
        input.disableDeselect = true;
      }

      // do not render external id text field
      if(input.id === 10103127) continue;

      switch (input.type) {

        case 'input_text':
          inputEl = (<TextInput
            type="text"
            data-address-type-number={addressTypeNumber}
            value={selectedValue}
            data-table={input.table}
            data-column={input.column}
            params={input.params}
            onBlur={this.props.updateAccountInfo}
          />);
          break;

        case 'textarea':
          inputEl = (<Textarea
            value={selectedValue}
            data-table={input.table}
            data-column={input.column}
            onBlur={this.props.updateAccountInfo}
          />);
          break;

        case 'input_birth_date':
          inputEl = (<BirthDateInput
            table={input.table}
            existingValue={selectedValue}
            column={input.column}
            onBlur={this.props.updateAccountInfo}
          />);
          break;

        case 'external_id_field':
          val = crmParamsHelpers.getValueByCode(input.params, selectedValue);
          inputEl = [];
          // inputEl.push(<AccountInfoExternalIdBox
          //   items={input.params}
          //   defaultValue={defaultValue}
          //   oldValue={selectedValue}
          //   table={input.table}
          //   column={input.column}
          //   selected={val}
          //   updateAccountInfo={this.props.updateAccountInfo}
          // />);
          inputEl.push(<AccountInfoDropdownBox
            oldValue={selectedValue}
            selected={val}
            style={{width: '49%', float: 'left', position: 'relative'}}
            table={input.table}
            column={input.column}
            items={input.params}
            defaultValue={defaultValue}
            updateAccountInfo={this.props.updateAccountInfo}
          />);

          if(account[input.table] && account[input.table].length) {
            selectedValue = account[input.table][0][input.table + 'C003'];
          }
          inputEl.push(<TextInput
            type="text"
            value={selectedValue}
            data-table={input.table}
            data-column={'C003'}
            onBlur={this.props.updateAccountInfo}
            style={{width: '48%', position: 'relative', float: 'right'}}
          />);
          break;

        case 'select':
          val = crmParamsHelpers.getValueByCode(input.params, selectedValue);
          inputEl = (<AccountInfoDropdownBox
            addressTypeNumber={addressTypeNumber}
            oldValue={selectedValue}
            selected={val}
            table={input.table}
            column={input.column}
            items={input.params}
            disableDeselect={input.disableDeselect}
            defaultValue={defaultValue}
            updateAccountInfo={this.props.updateAccountInfo}
          />);
          break;

        case 'assigned_to_field':
          inputEl = (<AccountInfoMultipleDropdownBox
            assignedTo={account[input.table]}
            items={users}
            defaultValue={defaultValue}
            onSetInfo={this.props.assignAccountToUser}
          />);
          break;

        case 'select_multi':
          val = crmParamsHelpers.getValueByCode(input.params, selectedValue);
          inputEl = (<AccountInfoDropdownBox
            oldValue={selectedValue}
            selected={val}
            table={input.table}
            column={input.column}
            items={input.params}
            defaultValue={defaultValue}
            updateAccountInfo={this.props.updateAccountInfo}
          />);
          break;

        case 'select_combo':
          val = crmParamsHelpers.getValueByCode(input.params, selectedValue);
          inputEl = (<AccountInfoDropdownBox
            oldValue={selectedValue}
            selected={val}
            table={input.table}
            column={input.column}
            items={input.params}
            defaultValue={defaultValue}
            updateAccountInfo={this.props.updateAccountInfo}
          />);
          break;

      }
      cols.push(<div className="w32">
        <label>{input.label}</label>
        {inputEl}
      </div>);
    }
    return cols;
  }

  render() {
    return (
      <div className="line100 label-mini">
        {this.renderInput()}
      </div>
    );
  }

}

AccountInfoInputRow.propTypes = {
  addressTypeNumber : React.PropTypes.number,
  updateAccountInfo : React.PropTypes.func,
  assignAccountToUser: React.PropTypes.func,
  inputs            : React.PropTypes.array
};
