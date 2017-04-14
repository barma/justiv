'use strict';

import React from 'react';
import {
  ACCOUNT_ASSIGNED_ID
  } from '../../../../constants';
import accountHelpers from '../../../../helpers/account';
import {ACCOUNT_NAME_EL} from '../../../../constants/temp';
import {ACCOUNT_LAST_NAME, CONTROL_NUMBER} from '../../../../constants/db';
import { Link } from 'react-router';
import _bindAll from 'lodash/bindAll';
import _each from 'lodash/each';
import _find from 'lodash/find';
import AccountValueRating from '../../../Common/Ratings/AccountValueRating';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

// icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

export default class StandardRow extends React.Component {

  constructor(props) {
    super(props);
  }

  renderStandardAccountRow() {
    const {selectOptions, controls, account, crmparams, isRowSelected, onDeleteAccount} = this.props;

    let cells = [];

    let index = 0;
    let counter = this.props.countVisibleRows();
    if(selectOptions && selectOptions.length) {
      selectOptions.map((th, i) => {
        if(!th.T020C005 || (th.T020C002 !== (this.props.route.pageId + '_1'))) return;

        let found = _find(controls.detailsControls, control => control[CONTROL_NUMBER] === th.T020C007.T006C001);

        let accountInfo = accountHelpers.findAccountInfo(account, crmparams, found, this.props.route.account_type);

        index++;

        cells.push(<td className={this.props.accMap[th.T020C007.T006C001]}>
          <div className="ellipsis">
            <div className="ellipsis-inline">{
              (th.T020C007.T006C017 + th.T020C007.T006C018) === ACCOUNT_LAST_NAME ?
                (<Link to={this.props.location.pathname + "/" + account[ACCOUNT_ASSIGNED_ID]} className="mname">{accountHelpers.getFullName(account)}</Link>) :
                accountInfo
            }</div>
          </div>
        </td>);
        if(index === counter) {
          if(isRowSelected) {
            cells.push(<td className="ao-main-table-last-column ao-main-table-column-selection text-right" colSpan="2">
              <div className="ao-main-table-column-selection-links">
                <Link to={this.props.location.pathname + '/' + account[ACCOUNT_ASSIGNED_ID]} className="ao-main-table-icons">
                  <FaPencil />
                </Link>
                |
                <a data-account-id={account[ACCOUNT_ASSIGNED_ID]} className="ao-main-table-icons" onClick={onDeleteAccount} href="#">
                  <FaTrash />
                </a>
              </div>
            </td>);
          } else {
            cells.push(<td className="ao-main-table-last-column ao-main-table-column-selection ao-main-table-border-off">
              <div className="ao-main-table-column-selection-empty"></div>
            </td>);
          }
        }

      });
    }

    return cells;
  }

  render() {
    const {
      account, isRowSelected, rowNumber,
      isRowChecked, switchAccountRowView, renderExpandSign
      } = this.props;

    return (<tr
      className={"ao-main-table-row-standard" + (isRowSelected ? " ao-main-table-row-selected" : '')}
      data-account={account[ACCOUNT_ASSIGNED_ID]}
      >
        <td className="ao-main-table-first-column">
          <div className="clearfix first-column">
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
              {renderExpandSign(account[ACCOUNT_ASSIGNED_ID])}
            </span>
            <div className="table-vertical-line"></div>
          </div>
        </td>
        {this.renderStandardAccountRow()}
    </tr>);
  }

}

StandardRow.propTypes = {
  rowNumber         : React.PropTypes.number.isRequired,
  isRowSelected     : React.PropTypes.bool.isRequired,
  isRowChecked      : React.PropTypes.bool.isRequired,
  account           : React.PropTypes.object.isRequired
};
