'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip';

import DetailsSelectOptionMenu from './DetailsSelectOptionMenu';

import AccountInfoInputRow from './AccountInfoInputRow';

import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _chunk from 'lodash/chunk';
import _sortBy from 'lodash/sortBy';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCog from 'react-icons/lib/fa/cog';
import accountDetailsHelpers from '../../../../helpers/pageControlsHelpers/accountDetails';
import crmParamsHelpers from '../../../../helpers/crmParams';
import selectOptionHelpers from '../../../../helpers/selectOption';
import {CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME, CRM_PARAMS_PARAM_VALUE} from '../../../../constants/db';
import {HOME_ADDRESS_CODE} from '../../../../constants/temp';

export default class AccountInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSettingsOpened: false
    };

    this.onSettingsBtnClick   = this.onSettingsBtnClick.bind(this);
    this.renderSelectOptionList  = this.renderSelectOptionList.bind(this);
    this.submenuClick  = this.submenuClick.bind(this);
    this.handleSelectOptionListClick  = this.handleSelectOptionListClick.bind(this);
    this.changeSortOrder  = this.changeSortOrder.bind(this);

  }

  onSettingsBtnClick(e) {
    e.preventDefault();
    this.setState({isSettingsOpened: !this.state.isSettingsOpened});
  }

  renderInputRows(addressTypeNumber) {
    let rows = [], columnAmount = 3;

    let inputs = _sortBy(this.props.section.inputs, 'number');

    let array = _chunk(_filter(inputs, input => input.display), columnAmount);

    for (let i = 0; i < array.length; i ++) {
      rows.push(<AccountInfoInputRow
        {...this.props}
        inputs={array[i]}
        index={i}
        addressTypeNumber={addressTypeNumber}
      />);
    }
    return rows;
  }

  /**
   * @param {String} table
   * @param {String} code
   * @returns {Boolean}
   * */
  onCheckboxChecked(table, code) {
    let foundCode = _find(this.props.account[table], {[table + 'C003']: code});
    return foundCode ? true : false;
  }

  renderCheckboxes() {
    let checkboxes = [];
    if(this.props.section.checkboxes[1]) {
      this.props.section.checkboxes.map((checkbox, index) => {
        if(index === 0) return;

        checkboxes.push(<div className="clearfix">
          <span className="pull-right">
            <label className="account-details-chkbx-label">{checkbox.label}</label>
            <input type="checkbox"
             name={checkbox.params[0].T001C003}
             data-category={checkbox.params[0].T001C016}
             data-type={checkbox.params[0].T001C017}
             data-code={checkbox.params[0].T001C003}
             data-table={checkbox.table}
             data-column={checkbox.column}
             onChange={this.props.onChangeCheckbox}
             checked={this.onCheckboxChecked(checkbox.table, checkbox.params[0].T001C003)}
            />
          </span>
        </div>);
      });
    }
    return checkboxes;
  }

  changeSortOrder(e) {
    const {actions, user, session_id, section, selectOptions, route} = this.props;
    // TODO this is a very unstable method, need to rework in future
    let items = $(e.item).parent().children('.js-sortable-item');

    let filteredSelectOptions = [];

    items.each((index, item) => {
      let input = _find(section.inputs, {id: Number(item.dataset.controlId)});
      // mutate input object to emit resort
      input.number = index + 1;

      filteredSelectOptions.push(_find(selectOptions, selectOption => selectOption.T020C001 === Number(item.dataset.id)));
    });
    let updatedSelectOptions = selectOptionHelpers.updateSelectOptions(filteredSelectOptions, user);

    actions.selectOptions.modifySelectOptionList(session_id, updatedSelectOptions, route.select_options);
    this.forceUpdate();
  }

  handleSelectOptionListClick(e) {
    let target = e.target;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        if(target.dataset.id) {
          // find user customized select option
          let selectOption = _find(this.props.selectOptions, selectOption => {
            return selectOption.T020C001 == target.dataset.id && selectOption.T020C004;
          });
          let input = _find(this.props.section.inputs, {id: Number(target.dataset.controlId)});
          if(input) {
            input.display = !input.display;
          }
          // If user customized option wasn't found - create new
          // TODO bring into separate module/helper
          if(!selectOption) {
            selectOption = _find(this.props.selectOptions, {T020C001: Number(target.dataset.id)});
            let meta = {
              allowAddNew: selectOption.T020C003,
              display: !selectOption.T020C005,
              sort: selectOption.T020C008
            };
            let newSelectOption = selectOptionHelpers.createSelectOption(selectOption.T020C002, selectOption.T020C007.T006C001, this.props.user, null, meta);
            return this.props.actions.selectOptions.modifySelectOption(this.props.session_id, [newSelectOption], this.props.route.select_options, selectOption);
          }
          //
          //// change visibility of control immediately, without waiting for server response
          selectOption.T020C005 = !selectOption.T020C005;
          //
          let updatedOption = selectOptionHelpers.changeVisibility(selectOption);

          //let updatedOption = selectOptionHelpers.formatSelectOption()
          return this.props.actions.selectOptions.modifySelectOption(this.props.session_id, [updatedOption], this.props.route.select_options, selectOption);
        }
        return;
      }
      target = target.parentNode;
    }
  }

  submenuClick(e) {
    let target = e.target;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        if(target.dataset.code && target.dataset.parameter) {
          this.props.addNewAddress(target.dataset);
        }
        return;
      }
      target = target.parentNode;
    }
  }

  renderSelectOptionList() {
    if(this.props.selectOptions && this.props.selectOptions.length) {
      let selectOptions = accountDetailsHelpers.prepareSelectOptionsList(this.props.selectOptions, this.props.section.selectOptions.meta);

      if(this.props.section.selectOptions.footer.submenu && this.props.section.selectOptions.footer.submenu.label) {
        // TODO remove this
        //this.props.section.selectOptions.footer.submenu.items = crmParamsHelpers.findByType(this.props.crmparams, 'ADDRESS_TYPE');
      }
      return <DetailsSelectOptionMenu id={"accDetailsSection" + this.props.index} changeSortOrder={this.changeSortOrder} handleSubmenuClick={this.submenuClick} onClick={this.handleSelectOptionListClick} footer={this.props.section.selectOptions.footer} items={selectOptions} header={this.props.section.header} />;
    }
  }

  renderAddresses() {
    let table = this.props.account[this.props.section.panelMetadata.table];
    if(!this.props.crmparams) return;
    if(table && table.length) {
      let addresses = [];

      table.map((address, addressTypeNumber) => {
        let val = address[this.props.section.panelMetadata.table + 'C003'];
        let crmParam = _find(this.props.crmparams, {[CRM_PARAMS_PARAM_CODE]: val});
        addresses.push(<div className="pull-left">
          <span>{crmParam[CRM_PARAMS_PARAM_VALUE]}</span>
          <span className="pd-box">{this.renderInputRows(addressTypeNumber)}</span>
        </div>);
      });
      return addresses;
    }
    // workaround: if any address exist we display default home address for user
    let crmParam = _find(this.props.crmparams, {[CRM_PARAMS_PARAM_CODE]: HOME_ADDRESS_CODE});

    this.props.addNewAddress({
      code: crmParam[CRM_PARAMS_PARAM_CODE],
      parameter: crmParam.T001C017
    });
    return null;
  }

  render() {
    const {section, index, dropdownRef, onShowHideComponent, onChangeCheckbox} = this.props;

    return (
      <div className="col-sm-12">
        <div className="user-details-column-left user-box-personal-delails" ref={dropdownRef}>

          <span className="pd-details-box">
            <span className="pd-title">
              <span className="dropdown ad-section-select-option-container">
                <FaCog data-tip={section.tooltip ? section.tooltip.label : null} size={24} className="ad-section-select-option-icon dropdown-toggle" data-toggle="dropdown" />
                <ReactTooltip place="bottom" class="tooltip" />
                {this.renderSelectOptionList()}
              </span>
              <div className="ad-section-dropdown-label">
                <span className="pad-right-12" data-index={index} onClick={onShowHideComponent}>
                  <FaCaretDown style={{verticalAlign: 'top'}} />
                </span>
                {section.header}
              </div>
            </span>
          </span>

          {(section.checkboxes.length > 0 && section.checkboxes[0].params && section.checkboxes[0].params.length) ?
            (<span className="pull-right">
              <label className="account-details-chkbx-label">{section.checkboxes[0].label}</label>
              <input
                type="checkbox"
                name={section.checkboxes[0].params[0].T001C003}
                data-category={section.checkboxes[0].params[0].T001C016}
                data-type={section.checkboxes[0].params[0].T001C017}
                data-code={section.checkboxes[0].params[0].T001C003}
                data-table={section.checkboxes[0].table}
                data-column={section.checkboxes[0].column}
                onChange={onChangeCheckbox}
                checked={this.onCheckboxChecked(section.checkboxes[0].table, section.checkboxes[0].params[0].T001C003)}
                />
            </span>) : null}

          {section.isAddressSection ?
            this.renderAddresses() :
            (<span className={"pd-box pad-left-30" + (section.checkboxes.length > 0 ? ' pad-bottom-25' : '')}>{this.renderInputRows()}</span>)
          }

          {this.renderCheckboxes()}

      </div>
    </div>
    );
  }

}

AccountInfo.propTypes = {
  section                 : React.PropTypes.object.isRequired,
  account                 : React.PropTypes.object.isRequired,
  dropdownRef             : React.PropTypes.object.isRequired,
  actions                 : React.PropTypes.object.isRequired,
  route                   : React.PropTypes.object.isRequired,
  user                    : React.PropTypes.object.isRequired,
  index                   : React.PropTypes.number.isRequired,
  session_id              : React.PropTypes.string.isRequired,
  crmparams               : React.PropTypes.array.isRequired,
  selectOptions           : React.PropTypes.array,
  addNewAddress           : React.PropTypes.func,
  onShowHideComponent     : React.PropTypes.func,
  onChangeCheckbox        : React.PropTypes.func.isRequired,
  onChangeAccountInfo     : React.PropTypes.func.isRequired,
  onChangeDropdownOption  : React.PropTypes.func.isRequired,
  onSetAccountBirthDate   : React.PropTypes.func.isRequired
};
