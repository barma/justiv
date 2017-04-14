'use strict';

import React from 'react';
import {CRM_PARAMS_TABLE_INDEX, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_VALUE} from '../../../../constants/db';
import selectOptionsHelpers from '../../../../helpers/selectOption';
import FaCheck from 'react-icons/lib/fa/check';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import _find from 'lodash/find';

export default class AccountsGroups extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: ''
    };

    this.onAccountsGroupSelect = this.onAccountsGroupSelect.bind(this);
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultItem(nextProps);
  }

  setDefaultItem(props = this.props) {
    if(props.accountSelectionDropdown) {
      let items = props.accountSelectionDropdown.items;
      if(items && items.length && !this.state.selectedItem) {

        if(props.selectOptions && props.selectOptions.length) {
          let selectOption = selectOptionsHelpers.findByControlId(props.selectOptions, Number(props.accountSelectionDropdown.id));

          if(selectOption) {
            let defaultItem = selectOptionsHelpers.getValueByCode(items, selectOption.T020C002);
            return this.setState({selectedItem: defaultItem});
          }
        }

        let defaultItem = selectOptionsHelpers.getValueByCode(items, selectOptionsHelpers.getDefaultSelectOptionCode(items));
        this.setState({selectedItem: defaultItem});
      }
    }
  }

  onAccountsGroupSelect(e) {
    let target = e.target,
        label, code;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = target.dataset.label;
        code = target.dataset.code;
        if(label) {
          this.setState({selectedItem: label});
          this.props.updateSearchQuery({
            accountSelection: code
          });

          // save select option
          let selectOption = selectOptionsHelpers.findByControlId(this.props.selectOptions, this.props.accountSelectionDropdown.id);
          let newSelectOption;
          if(!selectOption) {
            newSelectOption = selectOptionsHelpers.createSelectOption(target.dataset.code, this.props.accountSelectionDropdown.id, this.props.user);
            this.props.actions.selectOptions.modifySelectOption(this.props.session_id, [newSelectOption]);
          } else {
            newSelectOption = selectOptionsHelpers.createSelectOption(target.dataset.code, this.props.accountSelectionDropdown.id, this.props.user, selectOption);
            this.props.actions.selectOptions.modifySelectOption(this.props.session_id, [newSelectOption]);
          }
          this.props.actions.selectOptions.updateSelectOptionList(newSelectOption, this.props.route.select_options);

          this.props.changeAccountsSelection(code);
        }
        return;
      }
      target = target.parentNode;
    }
  }

  handleClickOnDocument(e) {
    let $trigger = $('#accountGroupsDropdown');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
    }
  }

  componentDidMount() {
    this.setDefaultItem();

    //$(document).on('click', this.handleClickOnDocument);
    //
    //// TODO do something with this...
    //$('#accountGroupsDropdown').on('click', (e) => {
    //  if('close' in e.target.dataset) return;
    //
    //  this.onAccountsGroupSelect(e);
    //  e.stopPropagation();
    //});
  }

  componentWillUnmount() {
    //$(document).off('click', this.handleClickOnDocument);
  }

  markSelectedItem(menuItem) {
    if(this.state.selectedItem === menuItem) {
      return (<FaCheck className="ao-dropdown-menu-checked" />);
    }
  }

  renderDropdownItems() {
    let items = [];

    if(this.props.accountSelectionDropdown && this.props.accountSelectionDropdown.items) {
      this.props.accountSelectionDropdown.items.map((item, i) => {
        items.push(<li
          key={item[CRM_PARAMS_TABLE_INDEX]}
          className="ao-accounts-groups-menu-dropdown-item ao-dropdown-menu-item"
          data-code={item[CRM_PARAMS_PARAM_CODE]}
          data-label={item[CRM_PARAMS_PARAM_VALUE]}>
          {this.markSelectedItem(item[CRM_PARAMS_PARAM_VALUE])}
          <span className="ao-accounts-groups-menu-dropdown-item-label">{item[CRM_PARAMS_PARAM_VALUE]}</span>
        </li>);
        if(i !== (this.props.accountSelectionDropdown.items.length - 1)) {
          items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);
        }
      });
    }
    return items;
  }

  render() {
    return (
      <div className="dropdown ao-accounts-groups-menu">
        <div>{this.props.accountsLabel} ({this.props.accountsDisplayed} of <span className="ao-accounts-groups-counter-total">{this.props.totalAmount}</span>)</div>
        <div className="ao-accounts-groups-menu-label-wrapper drowpdown-toggle" data-toggle="dropdown">
          <span className="ao-dropdown-label ellipsis-inline">
            {this.state.selectedItem}
            <span className="accounts-groups-dropdown-sign"><FaCaretDown /></span>
          </span>
        </div>
        <ul className="dropdown-menu crm-custom-dropdown" id="accountGroupsDropdown" onClick={this.onAccountsGroupSelect}>
          <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
          {this.renderDropdownItems()}
        </ul>
      </div>
    );
  }

}

AccountsGroups.propTypes = {
  accountsDisplayed         : React.PropTypes.number.isRequired,
  totalAmount               : React.PropTypes.number.isRequired,
  accountsLabel             : React.PropTypes.string.isRequired,
  accountSelectionDropdown  : React.PropTypes.object.isRequired,
  changeAccountsSelection   : React.PropTypes.func.isRequired
};
