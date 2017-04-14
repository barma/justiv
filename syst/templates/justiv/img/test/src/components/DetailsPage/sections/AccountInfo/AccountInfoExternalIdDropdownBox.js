'use strict';

import React from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import {CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME, CRM_PARAMS_PARAM_VALUE, CRM_PARAMS_PARAM_CATEGORY, CRM_PARAMS_PARAM_TYPE} from '../../../../constants/db';

export default class AccountInfoExternalIdDropdownBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: '',
      defaultSelection: 'Select...'
    };

    this.onChangeOption = this.onChangeOption.bind(this);
  }

  componentWillMount() {
    this.setSelectedItem();
  }

  componentWillReceiveProps(nextProps) {
    this.setSelectedItem(nextProps);
  }

  setSelectedItem(nextProps = this.props) {
    if(nextProps.selected) {
      this.setState({selectedItem: nextProps.selected});
    }
  }

  onChangeOption(e) {
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = target.dataset.label;

        if(label) {
          this.setState({selectedItem: label});
          if(label === this.state.defaultSelection) {
            return this.props.deselectExternalId(e.target.dataset.table);
          }
          this.props.updateAccountInfo(e.target.dataset.table, e.target.dataset.column, e.target.dataset.value, {
            oldValue: e.currentTarget.dataset.oldValue,
            parameter: e.target.dataset.parameter,
            category: e.target.dataset.category,
            unset: e.target.dataset.unset
          });
        }
        return;
      }
      target = target.parentNode;
    }
  }

  render() {

    return (
      <div className="dropdown">
        <div style={{width: '48%', float: 'left', position: 'relative'}} className="dropdown-toggle ad-dropdownbox-selection-label text-left" data-toggle="dropdown">
          <div className="ad-dropdownbox-selection-label-overflow">
            {this.state.selectedItem || this.props.defaultValue}
          <span>
            <FaCaretDown size="20" className="ad-dropdownbox-selection-icon" />
          </span>
          </div>
        </div>
        <ul className="inp dropdown-menu dropdown-menu-right ad-dropdownbox-selection-menu" data-old-value={this.props.oldValue} onClick={this.onChangeOption}>
          <li data-unset="true" data-table={this.props.table} data-label={this.props.defaultValue || 'Select...'}>{this.props.defaultValue || 'Select...'}</li>
          {this.props.items.map((item) => {
            return (<li
              key={item.T001C001}
              data-parameter={item[CRM_PARAMS_PARAM_TYPE]}
              data-category={item[CRM_PARAMS_PARAM_CATEGORY]}
              data-label={item[CRM_PARAMS_PARAM_NAME]}
              data-table={this.props.table}
              data-column={this.props.column}
              data-value={item[CRM_PARAMS_PARAM_CODE]}
            >
              {item[CRM_PARAMS_PARAM_VALUE]}
            </li>);
          })}
        </ul>
      </div>
    );
  }

}

AccountInfoExternalIdDropdownBox.propTypes = {
  items       : React.PropTypes.string,
  header      : React.PropTypes.string,
  onSetInfo   : React.PropTypes.func
};
