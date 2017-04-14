'use strict';

import React from 'react';
import {
  ACCOUNT_ASSIGNED_ID
  } from '../../../../constants';
import accountHelpers from '../../../../helpers/account';
import crmParamsHelpers from '../../../../helpers/crmParams';
import timeHelpers from '../../../../helpers/timeHelpers';
import {ACCOUNT_NAME_EL} from '../../../../constants/temp';
import {DATE_PATTERN_DAY_CREATED, DATE_PATTERN_TIME_CREATED, BIRTH_DATE_PATTERN} from '../../../../constants/application';
import { Link } from 'react-router';
import _bindAll from 'lodash/bindAll';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import _isObject from 'lodash/isObject';
import _find from 'lodash/find';
import AccountValueRating from '../../../Common/Ratings/AccountValueRating';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

// icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

export default class EnlargedRow extends React.Component {

  constructor(props) {
    super(props);

    this.find = this.find.bind(this);
    this.resizeEnlargedContainer = this.resizeEnlargedContainer.bind(this);
    this.setColumnHeight = this.setColumnHeight.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setColumnHeight();
    }, 100);
    this.resizeEnlargedContainer();
    window.addEventListener('resize', this.resizeEnlargedContainer);
    window.addEventListener('resize', this.setColumnHeight);
  }

  resizeEnlargedContainer() {
    let tableWrapperWidth = $('#accountTableWrapper').width();
    this.column_user_info_inner.style.width = `${tableWrapperWidth - 24 - this.column_last_inner.clientWidth - this.column_first_inner.clientWidth}px`;
  }

  setColumnHeight() {
    this.column_first.style.height = `${this.column_user_info.clientHeight + 2}px`;
    this.column_last.style.height = `${this.column_user_info.clientHeight + 2}px`;
  }

  unsetcolumnHeight() {
    this.column_first.style.height = null;
    this.column_last.style.height = null;
  }

  componentWillUnmount() {
    this.unsetcolumnHeight();
    window.removeEventListener('resize', this.resizeEnlargedContainer);
    window.removeEventListener('resize', this.setColumnHeight);
  }

  /**
   * temporary method
   * */
  findLabel(table, column, controlNumber) {
    if(this.props.selectOptions && this.props.selectOptions.length) {
      let foundOption = _find(this.props.selectOptions, selectOption => {
        if(controlNumber) {
          return selectOption.T020C007.T006C001 === controlNumber;
        }
        return selectOption.T020C007.T006C017 === table && selectOption.T020C007.T006C018 === column;
      });

      if(foundOption) {
        return foundOption.T020C007.T006C033 || foundOption.T020C007.T006C013;
      }
    }
  }

  find() {
    const {account, detailsControls, crmparams} = this.props;

    let allData = [];
    _each(detailsControls.sections, section => {
      let allInputs = section.inputs.concat(section.checkboxes);

      if(section.isAddressSection) {
        return _each(account.T101, address => {
          _each(allInputs, input => {
            allData.push({
              type: address.T101C003,
              id: input.id,
              label: input.label,
              section: section.header,
              info: address[input.table + input.column]
            });
          });
        });
      }

      _each(allInputs, input => {
        let info;

        switch(input.table) {

          case 'T100':
            if(input.params.length) {
              let accData = _find(input.params, param => param.T001C003 == account[input.table + input.column]);
              if(accData) info = accData.T001C005;
              break;
            }
            if(input.column === 'C011') {
              info = timeHelpers.formatTime(account[input.table + input.column], BIRTH_DATE_PATTERN);
            } else {
              info = account[input.table + input.column];
            }
            break;

          case 'T110':
            if(input.column === 'C004') {
              info = accountHelpers.getLeadStatus(account, crmparams, input.table, detailsControls.accountType.input, 'T001C004');
            }
            break;

          // do not do anything for address table
          case 'T101':
            break;

          case 'T107':
            if(account[input.table] && account[input.table].length && input.column === 'C004') {
              let idType = _find(input.params, param => param.T001C017 == account[input.table][0][input.table + 'C005']);

              if(idType) {
                info = idType.T001C005 + ' ' + account[input.table][0].T107C003;
              }
            }

            break;

          case 'T120':
            info = accountHelpers.findCreatedBy(account);
            break;

          default:
            let tableData = account[input.table];
            if(tableData && tableData.length) {
              if(input.column === 'C003') {
                let data;
                for(let i = 0; i < tableData.length; i++) {
                  if(_isObject(tableData[i][input.table + input.column]) && tableData[i][input.table + input.column].T001C003) {
                    data = _find(input.params, {T001C003: tableData[i][input.table + input.column].T001C003});
                  } else {
                    data = _find(input.params, {T001C003: tableData[i][input.table + input.column]});
                  }
                  if(data) info = data.T001C005;
                }
              } else {
                let data;
                for(let i = 0; i < input.params.length; i++) {
                  if(input.table === 'T102') {
                    data = _find(tableData, {[input.table + 'C004']: input.params[i].T001C003});
                  } else {
                    data = _find(tableData, {[input.table + 'C003']: input.params[i].T001C003});
                  }
                  if(data) info = data[input.table + input.column];
                }
              }
            }
        }

        allData.push({
          id: input.id,
          label: input.label,
          info,
          section: section.header
        });
      });
    });

    return _filter(allData, dataItem => dataItem.info !== undefined);
  }

  renderAllAccountData() {
    let allData = this.find();
    let items = [];

    let currentAddressType = '', currentSection = '';
    for(let i = 0; i < allData.length; i += 2) {
      let cells = [];
      for (let j = 0; j < 2 && i+j < allData.length; j++) {
        //if(allData[i+j].section !== currentSection) {
        //  currentSection = allData[i+j].section;
        //  items.push(<tr><td colSpan={2} className="enlarged-data-header"><p>{allData[i+j].section}</p></td></tr>);
        //}

        if(allData[i+j].type && currentAddressType !== allData[i+j].type) {
          currentAddressType = allData[i+j].type;
          let address = crmParamsHelpers.findByCode(this.props.crmparams, currentAddressType);

          items.push(<tr><td colSpan={2} className="enlarged-data-header"><p>{address.T001C005}</p></td></tr>);

          cells.push(<td className=""><p>{allData[i+j].label}</p>: <p>{allData[i+j].info}</p></td>);
          //cells.push(<td className="ao-main-table-expanded-row-value">{allData[i+j].info}</td>);
        } else {
          cells.push(<td className=""><p>{allData[i+j].label}</p>: <p>{allData[i+j].info}</p></td>);
          //cells.push(<td className="ao-main-table-expanded-row-value">{allData[i+j].info}</td>);
        }
      }
      items.push(<tr className="">{cells}</tr>);
    }
    return items;
  }

  renderEnlargedAccountRow() {
    const {account, rowNumber, isRowChecked, location, switchAccountRowView} = this.props;

    return (<td colSpan={this.props.countVisibleRows() + 1} ref={firstCol => this.column_first = firstCol}>
      <div className="first-column" ref={userInfoCol => this.column_user_info = userInfoCol}>
        <div className="first-column-inner" ref={firstColInner => this.column_first_inner = firstColInner}>
          <span className="nbr">{rowNumber + 1}</span>
          <span>
            <input
              className="ao-main-table-checkbox"
              data-account-id={account[ACCOUNT_ASSIGNED_ID]}
              type="checkbox"
              checked={isRowChecked ? 'checked' : ''}
              />
          </span>
          <span data-account-num={account[ACCOUNT_ASSIGNED_ID]} onClick={switchAccountRowView}>
            {this.props.renderExpandSign(account[ACCOUNT_ASSIGNED_ID])}
          </span>
        </div>

        <div className="ao-user-info" ref={userInfoColInner => this.column_user_info_inner = userInfoColInner}>
          <table>
            <tr>
              <td>{this.findLabel('T100', 'C003')}: <Link to={location.pathname + "/" + account[ACCOUNT_ASSIGNED_ID]} className="">{account.fullName}</Link></td>
              <td></td>
            </tr>
            <tr>
              {this.showAccountId(account)}
              {this.showAccountType(account)}
            </tr>
            {this.showBlacklistedRow(account)}
            <tr>
              <td><p>{this.props.detailsControls.labelAccountCreated}</p>: <p>{accountHelpers.getCreatedDate(account, DATE_PATTERN_DAY_CREATED + ' ' + DATE_PATTERN_TIME_CREATED)}</p></td>
              <td><p>{this.props.detailsControls.labelCreatedBy}</p>: <p>{accountHelpers.getCreatedBy(account)}</p></td>
            </tr>
            {this.renderAllAccountData()}
          </table>
          {/*<div>{this.findLabel('T100', 'C003')}: <Link to={location.pathname + "/" + account[ACCOUNT_ASSIGNED_ID]} className="ao-main-table-expanded-row-value">{account.fullName}</Link></div>
          <div className="ao-main-table-expanded-row">

          </div>
          <div className="ao-main-table-expanded-row">
            <div className="ao-main-table-expanded-row-item">
              {this.props.detailsControls.labelAccountCreated}: <span className="ao-main-table-expanded-row-value">{accountHelpers.getCreatedDate(account, DATE_PATTERN_DAY_CREATED + ' ' + DATE_PATTERN_TIME_CREATED)}</span>
            </div>
            <div className="ao-main-table-expanded-row-item">
              {this.props.detailsControls.labelCreatedBy}: <span className="ao-main-table-expanded-row-value">{accountHelpers.getCreatedBy(account)}</span>
            </div>
          </div>
          {this.renderAllAccountData()}*/}
        </div>

      </div>
    </td>);
  }

  showAccountId(account) {
    if(account[ACCOUNT_ASSIGNED_ID]) {
      return (<td>
        <p>{this.props.detailsControls.labelAccountId}</p>: <p>{account[ACCOUNT_ASSIGNED_ID]}</p>
      </td>);
    }
  }

  showAccountType(account) {
    if(account.accountType) {
      return (<td>
        <p>{this.props.detailsControls.accountType && this.props.detailsControls.accountType.label}</p>: <p>{accountHelpers.findAccountType(account, this.props.crmparams)}</p>
      </td>);
    }
  }

  showBlacklistedRow(account) {
    if(!account.valueRate && !account.isBlacklisted) return null;
    return(<tr>
      {this.showAccountValueRating(account)}
      {this.isBlacklisted(account.isBlacklisted)}
    </tr>);
  }

  isBlacklisted(isBlacklisted) {
    if(isBlacklisted) {
      return (<td><p>{accountHelpers.getBlackListLabel(this.props.crmparams)}</p></td>);
    } else {
      return (<td><p></p></td>);
    }
  }

  showAccountValueRating(account) {
    if(account.valueRate) {
      return (<td className="ao-main-table-expanded-row-item"><p>{this.props.detailsControls.labelValueRating}</p>:
        <p><span className="ao-main-table-expanded-row-rating">
          <AccountValueRating
            amount={account.valueRate}
            readonly
            valueRate={account.valueRate}
            />
        </span></p>
      </td>);
    }
  }

  render() {
    const accountId = this.props.account[ACCOUNT_ASSIGNED_ID];

    return (<tr
      className="ao-main-table-row-enlarged"
      data-account={accountId}
      >
        {this.renderEnlargedAccountRow()}
        <td className="ao-main-table-column-selection text-right" ref={lastCol => this.column_last = lastCol}>
          <div className="ao-main-table-column-selection-links" ref={lastColInner => this.column_last_inner = lastColInner}>
            <span className="ao-main-table-column-selection-links-inner">
              <Link to={this.props.location.pathname + '/' + accountId} className="ao-main-table-icons"><FaPencil /></Link> | <a data-account-id={accountId} className="ao-main-table-icons" onClick={this.props.onDeleteAccount} href="#"><FaTrash /></a>
            </span>
          </div>
        </td>
    </tr>);
  }

}

EnlargedRow.propTypes = {
  rowNumber         : React.PropTypes.number.isRequired,
  countVisibleRows  : React.PropTypes.func.isRequired,
  isRowChecked      : React.PropTypes.bool.isRequired,
  account           : React.PropTypes.object.isRequired
};
