'use strict';

import React from 'react';
import {
  ACCOUNT_ASSIGNED_ID
} from '../../../constants';
import accountHelpers from '../../../helpers/account';
import {ACCOUNT_NAME_EL} from '../../../constants/temp';
import { Link } from 'react-router';
import _bindAll from 'lodash/bindAll';
import _each from 'lodash/each';
import _find from 'lodash/find';
import StandardRow from './rows/StandardRow';
import EnlargedRow from './rows/EnlargedRow';
import AccountValueRating from '../../Common/Ratings/AccountValueRating';

// icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

class AccountsGridBody extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRow: null
    };

    _bindAll(this,
      [
        'isAccountRowSelected',
        'onTableClick',
        'onDeleteAccount',
        'renderExpandSign',
        'selectAccount',
        'countVisibleRows'
      ]);
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.current_account) {
      this.selectAccount(Number(this.props.location.state.current_account[ACCOUNT_ASSIGNED_ID]), this.scrollToSelectedRow);
    }
  }

  scrollToSelectedRow() {
    let offset = $(".ao-main-table-row-selected").offset().top,
        parentOffset = $(".ao-main-table-row-selected").parent().offset().top,
        tableheight = $("#accountTableWrapper").height();

    if((offset - parentOffset) > tableheight) {

      $('#accountTableWrapper').animate({
        scrollTop: offset - parentOffset
      }, 1500);
    }
  }

  /**
   * @param {Number} accountId
   * @param {Function=} cb
   * */
  selectAccount(accountId, cb) {
    this.setState({
      selectedRow: accountId
    }, () => {
      if(cb) cb();
    });
  }

  isAccountRowSelected(accountId) {
    return this.state.selectedRow === Number(accountId);
  }

  switchAccountRowSelection(target) {
    let label = Number(target.dataset.account);
    if(label) {
      let newSelectedAccount = label === this.state.selectedRow ? null : label;
      this.selectAccount(newSelectedAccount);
    }
  }

  onDeleteAccount(e) {
    e.stopPropagation();
    let dataset = e.currentTarget.dataset,
        accountId = dataset.accountId;

    if(confirm(`Account with ID ${accountId} will be deleted. Are you sure?`)) {
      // TODO probably need to bring this function in a page component
      this.props.actions.accounts.accountDelete(this.props.session_id, accountId);
    }
  }

  onTableClick(e) {
    let target = e.target;

    while (target != e.currentTarget) {
      if(target.tagName.toLowerCase() === 'input') {
        return this.props.switchAccountRowChecked(target);
      }
      // do not select/unselect row when user clicks on interactive elements
      if(target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'svg') {
        break;
      }
      if(target.tagName === 'TR') {
        return this.switchAccountRowSelection(target);
      }
      target = target.parentNode;
    }
  }

  renderTableRows() {
    let listItems = [];

    _each(this.props.accountsList, (account, i) => {
      let isAccountEnlarged = this.props.expandedAccounts.indexOf(String(account[ACCOUNT_ASSIGNED_ID])) !== -1;
      let isAccountRowSelected = this.isAccountRowSelected(account[ACCOUNT_ASSIGNED_ID]);
      let isAccountRowChecked = this.props.isAccountRowChecked(account[ACCOUNT_ASSIGNED_ID]);

      if(!isAccountEnlarged) {
        listItems.push(<StandardRow
          {...this.props}
          rowNumber={i}
          account={account}
          isRowSelected={isAccountRowSelected}
          isRowChecked={isAccountRowChecked}
          renderExpandSign={this.renderExpandSign}
          countVisibleRows={this.countVisibleRows}
          onDeleteAccount={this.onDeleteAccount}
          accMap={accMap}
          />);
      } else {
        // TODO push enlarged row component
        listItems.push(<EnlargedRow
          {...this.props}
          rowNumber={i}
          account={account}
          countVisibleRows={this.countVisibleRows}
          renderExpandSign={this.renderExpandSign}
          onDeleteAccount={this.onDeleteAccount}
          isRowChecked={isAccountRowChecked}
          />);
      }
    });

    return listItems;
  }

  /**
   * First cell on each row with checkbox and +/- sign
   * */
  renderFirstCell(number, isAccountRowSelected) {
    return (<td>
      <div className="clearfix first-column">
        <span className="nbr">{number + 1}</span>
        <span>
          <input
            className="ao-main-table-checkbox"
            data-account-id={this.props.accountsList[number][ACCOUNT_ASSIGNED_ID]}
            type="checkbox"
            checked={isAccountRowSelected ? 'checked' : ''}
          />
        </span>
        <span data-account-num={this.props.accountsList[number][ACCOUNT_ASSIGNED_ID]} onClick={this.props.switchAccountRowView}>
          {this.renderExpandSign(this.props.accountsList[number][ACCOUNT_ASSIGNED_ID])}
        </span>
      </div>
    </td>);
  }

  renderExpandSign(accountId) {
    if(this.props.expandedAccounts.indexOf(String(accountId)) !== -1) {
      return (<a href="#" className="a-off js-expand-account-info"><FaMinus /></a>);
    }
    return (<a href="#" className="a-off js-expand-account-info"><FaPlus /></a>);
  }

  countVisibleRows() {
    let index = 0;
    if(this.props.selectOptions && this.props.selectOptions.length) {
      this.props.selectOptions.map((th, i) => {
        if(th.T020C005 && (th.T020C002 == (this.props.route.pageId + '_1'))) {
          index++;
        }
      });
    }
    return index;
  }

  render() {
    return (<tbody onClick={this.onTableClick}>
      {this.renderTableRows()}
    </tbody>);
  }

}

AccountsGridBody.propTypes = {
  actions                       : React.PropTypes.object.isRequired,
  isSidebarHidden               : React.PropTypes.bool.isRequired,
  renderActionsDropdown         : React.PropTypes.func.isRequired,
  isAccountRowChecked           : React.PropTypes.func.isRequired,
  accountsList                  : React.PropTypes.array.isRequired,
  isFetching                    : React.PropTypes.bool.isRequired,
  selectOptions                 : React.PropTypes.array.isRequired,
  session_id                    : React.PropTypes.string.isRequired
};

// TODO delete this and make dynamic
const accMap = {
  10101011: 'fullName',
  10101018: 'accountType',
  10101017: ACCOUNT_ASSIGNED_ID,
  10104114: 'email',
  10105115: 'city',
  10104112: 'phone_mobile',
  10101014: 'createdDate',
  10103111: 'assignedTo', // miss
  10103112: 'status'
};

export default AccountsGridBody;
