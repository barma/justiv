'use strict';

import React from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import {CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME, CRM_PARAMS_PARAM_VALUE, CRM_PARAMS_PARAM_CATEGORY, CRM_PARAMS_PARAM_TYPE} from '../../../../constants/db';

export default class AccountInfoDropdownBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: '',
      defaultSelection: ''
    };

    this.onChangeOption = this.onChangeOption.bind(this);
    this.clickOnParent = this.clickOnParent.bind(this);
  }

  //handleClick(e) {
  //  let dataset = e.currentTarget.dataset;
  //
  //  let user = userHelpers.findById(this.props.items, dataset.userId);
  //  let updatedState = commonHelpers.pushOrRemoveItem(this.state.selectedItems, user);
  //  this.setState({selectedItems: updatedState}, () => {
  //    this.props.onSetInfo(this.state.selectedItems);
  //  });
  //}

  componentDidMount() {
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

  clickOnParent(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
      $(e.currentTarget).parent().click();
    }
    return false;
  }

  onChangeOption(e) {
    e.preventDefault();
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = target.dataset.label;

        if(label) {
          this.setState({selectedItem: label});
          this.props.updateAccountInfo(target.dataset.table, target.dataset.column, target.dataset.value, {
            oldValue: e.currentTarget.dataset.oldValue,
            // TODO ?
            _addressTypeNumber: e.currentTarget.dataset.addressTypeNumber,

            parameter: target.dataset.parameter,
            category: target.dataset.category,
            unset: target.dataset.unset
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
        <button style={this.props.style} className="dropdown-toggle ad-dropdownbox-selection-label text-left" data-toggle="dropdown">
          <div className="ad-dropdownbox-selection-label-overflow">
            {this.state.selectedItem || this.props.defaultValue || 'Select...'}
          <span>
            <FaCaretDown size="20" className="ad-dropdownbox-selection-icon" />
          </span>
          </div>
        </button>
        <ul className="inp dropdown-menu dropdown-menu-right ad-dropdownbox-selection-menu" role="menu" data-address-type-number={this.props.addressTypeNumber} data-old-value={this.props.oldValue} onClick={this.onChangeOption}>
          {!this.props.disableDeselect ? (<li data-unset="true" data-column={this.props.column} data-table={this.props.table} data-label={this.props.defaultValue || 'Select...'}><a href="#" onKeyDown={this.clickOnParent}>{this.props.defaultValue || 'Select...'}</a></li>) : null}
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
              <a href="#" onKeyDown={this.clickOnParent}>
                {item[CRM_PARAMS_PARAM_VALUE]}
              </a>
              </li>);
          })}
        </ul>
      </div>
    );
  }

}

AccountInfoDropdownBox.propTypes = {
  items       : React.PropTypes.array,
  header      : React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  onSetInfo   : React.PropTypes.func
};
