'use strict';

import React from 'react';
import AccountsGridHeader from './AccountsGridHeader';
import AccountsGridBody from './AccountsGridBody';
import {findDOMNode} from 'react-dom';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';
import GmRefresh from 'react-icons/lib/md/refresh';
import {ACCOUNT_ASSIGNED_ID} from '../../../constants/db';
import _map from 'lodash/map';
import TopBar from '../TopBar/TopBarContainer';
import {ACTION_CODE_EXPAND_SELECTED_ACCOUNTS, ACTION_CODE_DELETE_SELECTED_ACCOUNTS} from '../../../constants/temp';

require('../../../rc');

export default class AccountsGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedAccountRows: [],
      expandedAccounts: []
    };

    this.renderShowMoreBtn = this.renderShowMoreBtn.bind(this);
    this.switchAccountRowChecked = this.switchAccountRowChecked.bind(this);
    this.onAllCheckboxClick = this.onAllCheckboxClick.bind(this);
    this.isAccountRowChecked = this.isAccountRowChecked.bind(this);
    this.isAllChecked = this.isAllChecked.bind(this);
    this.onActionsDropdownClick = this.onActionsDropdownClick.bind(this);
    this.executeActionForCheckedAccounts = this.executeActionForCheckedAccounts.bind(this);
    this.switchAccountRowView = this.switchAccountRowView.bind(this);
    this.resizeFirstlastCols = this.resizeFirstlastCols.bind(this);
    this.forceUpd = this.forceUpd.bind(this);
  }

  /**
   * @param {String} accountId
   * */
  isAccountRowChecked(accountId) {
    return this.state.checkedAccountRows.indexOf(accountId) !== -1;
  }

  /**
   * @returns {Boolean}
   * */
  isAllChecked() {
    if(this.props.accountsList.length === 0) return false;
    return this.state.checkedAccountRows.length === this.props.accountsList.length;
  }

  switchAccountRowView(e) {
    e.preventDefault();
    let data = e.currentTarget.dataset;
    let number = data.accountNum;
    let expandedAccounts = this.state.expandedAccounts;
    let accountIndex = expandedAccounts.indexOf(number);
    accountIndex === -1 ? expandedAccounts.push(number) : expandedAccounts.splice(accountIndex, 1);
    this.setState({expandedAccounts});
  }

  switchAccountRowChecked(target) {
    let dataset = target.dataset;
    let rowIndex = dataset.accountId;
    if(!rowIndex) return;

    let checkedAccountRows = this.state.checkedAccountRows.slice(0);
    let index = checkedAccountRows.indexOf(rowIndex);

    index === -1 ?
      checkedAccountRows.push(rowIndex) :
      checkedAccountRows.splice(index, 1);

    this.setState({checkedAccountRows});
  }

  onAllCheckboxClick() {
    let checkedAccountRows = [];
    if(this.state.checkedAccountRows.length < this.props.accountsList.length) {
      checkedAccountRows = _map(this.props.accountsList, ACCOUNT_ASSIGNED_ID);
    }
    this.setState({checkedAccountRows});
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.initResizableTable();
      this.resizeFirstlastCols();
    }, 100);
  }

  executeActionForCheckedAccounts(target) {
    // Implementation only for expand and delete selected actions

    // TODO rework with switch case
    if(target.dataset.actionCode === this.props.route.pageId + ACTION_CODE_EXPAND_SELECTED_ACCOUNTS) {
      return this.setState({expandedAccounts: this.state.checkedAccountRows});
    }
    if(target.dataset.actionCode === this.props.route.pageId + ACTION_CODE_DELETE_SELECTED_ACCOUNTS) {
      let accountsAsSring = this.state.checkedAccountRows.join();
      this.props.actions.accounts.accountDelete(this.props.session_id, accountsAsSring);
    }

  }

  onActionsDropdownClick(e) {
    let target = e.target;

    while (target != e.currentTarget) {
      if(target.tagName === 'LI') {
        return this.executeActionForCheckedAccounts(target);
      }
      target = target.parentNode;
    }
  }

  recalculateTableWidths() {
    let table = $("#aoMainTable");
    let data = table.data('resizableColumns');
    if(data) {
      data.setHeaders();
      data.syncHandleWidths();
    }
  }

  resizeFirstlastCols() {
    // TODO optimize jQuery resize logic
    let container = findDOMNode(this),
        self = this;
    $(container).scroll(function(e) {
      $('.first-column').css('left', $(this).scrollLeft());
      $('#aoMainTable .ao-main-table-column-selection > div').css('right', ($('#aoMainTable').outerWidth() - $('.account-table-overflow').outerWidth()) - $(container).scrollLeft() - 1);
      self.scrollTableHeaders(e);
    });
    $(container).scroll();
  }

  componentDidMount() {
    this.initResizableTable();
    setTimeout(this.resizeFirstlastCols, 400);

    $(window).resize(function(e) {
      $('#aoMainTable .ao-main-table-column-selection > div').css('right', ($('#aoMainTable').outerWidth() - $('.account-table-overflow').outerWidth()) - $('#accountTableWrapper').scrollLeft() - 1);
    });
  }

  scrollTableHeaders(e) {
    let tableHeaders = $(e.target).find('thead td'),
        headerInner = $(e.target).find('thead td:not(:last) > div');

    // add bottom shadow to table headers
    e.target.scrollTop > 5 ?
      headerInner.addClass('table-header-scrolling') :
      headerInner.removeClass('table-header-scrolling');

    tableHeaders.css('top', e.target.scrollTop - 1);
  }

  componentWillUnmount() {
    let container = findDOMNode(this);
    $(container).off("scroll");
    $(window).off("resize");
  }

  initResizableTable() {
    let table = $("#aoMainTable");

    if(!table.data('resizableColumns') && !this.props.isFetching && this.props.allLoaded) {
      table.resizableColumns({
        selector: 'tr:first > td:visible',
        usePixels: true,
        width: 150,
        minWidth: 60,
        resize: function() {
          this.resizeFirstlastCols();
        }.bind(this),
        start: function() {
          this.resizeFirstlastCols();
        }.bind(this)
      });
    }

  }

  renderShowMoreBtn() {
    const {totalAmount, isFetching, allLoaded, allAccountReceived, accountsList, isMoreAccountsRequested} = this.props;
    if(!allLoaded || isFetching || allAccountReceived || !accountsList.length || (totalAmount <= accountsList.length)) return;

    return (<div className="text-center">
      {isMoreAccountsRequested ?
        <GmRefresh size={22} className="rotating-spinner" /> :
        <button type="button" className="btn btn-link" onClick={this.props.onShowMoreBtnClick}>Show more</button>
      }
    </div>);
  }

  // TODO rework
  // method for triggering rerender of whole accounts grid when showing/hiding columns
  forceUpd() {
    this.forceUpdate();
  }

  /**
   * Show this label if any account wasn't found
   * */
  showNotAvailableLabel() {
    if(!this.props.accountsList.length && !this.props.isFetching && this.props.allLoaded) {
      return (<div className="text-center">No data available</div>);
    }
  }

  render() {
    return (<div
      id="accountTableWrapper"
      style={this.props.isSidebarHidden ? {width: '100%'} : null}
      className="account-table-box">

      <div className="account-table">
        <div className="account-table-overflow">
          {!this.props.allLoaded ?
            (<div className="spinner-container">
              <FaCircleONotch size={32} className="c-spinner rotating-spinner"/>
            </div>) :
            (<table id="aoMainTable" className="table table-striped ao-table ao-main-table">
              <AccountsGridHeader
                {...this.props}
                onAllCheckboxClick={this.onAllCheckboxClick}
                isAllChecked={this.isAllChecked}
                onActionsDropdownClick={this.onActionsDropdownClick}
                recalculateTableWidths={this.recalculateTableWidths}
                forceUpd={this.forceUpd}
                />
              <AccountsGridBody
                {...this.props}
                switchAccountRowChecked={this.switchAccountRowChecked}
                isAccountRowChecked={this.isAccountRowChecked}
                switchAccountRowView={this.switchAccountRowView}
                expandedAccounts={this.state.expandedAccounts}
                />
            </table>)
          }
        </div>
        {this.showNotAvailableLabel()}
        {this.renderShowMoreBtn()}
      </div>

    </div>);
  }

}

AccountsGrid.propTypes = {
  isSidebarHidden          : React.PropTypes.bool.isRequired,
  isFetching               : React.PropTypes.bool.isRequired,
  allAccountReceived       : React.PropTypes.bool.isRequired,
  controls                 : React.PropTypes.object.isRequired,
  selectOptions            : React.PropTypes.array.isRequired,
  accountsList             : React.PropTypes.array.isRequired,
  crmparams                : React.PropTypes.array.isRequired,
  actions                  : React.PropTypes.object.isRequired,
  session_id               : React.PropTypes.string.isRequired
};
