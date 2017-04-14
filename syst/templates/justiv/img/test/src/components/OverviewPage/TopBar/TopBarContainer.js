'use strict';

import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';

import * as accountsActions from '../../../actions/accountsActions';
import * as UIStateActions from '../../../actions/UIStateActions';
import _bindAll from 'lodash/bindAll';
import _filter from 'lodash/filter';

// sections
import AccountGroups from './components/AccountsGroups';
import AccountSearchInput from './components/AccountSearchInput';
import FilterByDropdown from './components/FilterByDropdown';

import TaggedSearch from '../../Common/Forms/TaggedSearch';
import UpdatePanel from '../../Common/Panels/Update/Update';

// icons
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';

export default class OverviewTopBarContainer extends React.Component {

  constructor(props) {
    super(props);

    _bindAll(this, ['updateSearchQuery', 'getUpdateLeads']);
  }

  updateSearchQuery(opts) {
    this.props.actions.accounts.updateSearchQuery(opts);
  }

  getUpdateLeads() {
    return _filter(this.props.crmparams, crmparam => crmparam.T001C017 === 'UPDATE_LEAD');
  }

  render() {
    const {accountsLabel, accountSelectionDropdown, searchTypeBtn, searchPlaceholder, searchAccountTypeDropdown, filterByLabel, filterByDropdown} = this.props.controls;
    return (
      <Grid fluid className="ao-body" id="topBar">
        <Row>
          <Clearfix>
            <Row>
              <Col xs={12} sm={4} md={3}>
                <AccountGroups
                  {...this.props}
                  accountsDisplayed={this.props.accountsList.length}
                  accountsLabel={accountsLabel}
                  accountSelectionDropdown={accountSelectionDropdown}
                  changeAccountsSelection={this.props.changeAccountsSelection}
                  updateSearchQuery={this.updateSearchQuery}
                  />
              </Col>
              <Col xs={11} sm={7} md={8} className="clearfix">
                <div className="ao-top-bar-middle">
                  <TaggedSearch
                    searchTypeBtn={searchTypeBtn}
                    searchPlaceholder={searchPlaceholder}
                    searchAccountTypeDropdown={searchAccountTypeDropdown}
                    accountsList={this.props.accountsList}
                    searchAccounts={this.props.searchAccounts}
                    updateSearchQuery={this.updateSearchQuery}
                    />
                  <FilterByDropdown
                    filterByLabel={filterByLabel}
                    filterByDropdown={filterByDropdown}
                    />
                </div>
              </Col>
              <Col xs={1} sm={1} md={1} className="ao-top-bar-right clearfix">
                <span className="ao-switch-sidebar pull-right" onClick={this.props.switchSidebar}>
                  <FaChevronLeft />
                  <FaChevronRight />
                </span>
              </Col>
            </Row>

            <UpdatePanel
              menuItems={this.getUpdateLeads()}
              />

          </Clearfix>
        </Row>
      </Grid>
    );
  }

}

OverviewTopBarContainer.propTypes = {
  actions         : React.PropTypes.object.isRequired,
  controls        : React.PropTypes.object.isRequired,
  accountsList    : React.PropTypes.array.isRequired,
  totalAmount     : React.PropTypes.number.isRequired,
  session_id      : React.PropTypes.string.isRequired,
  isSidebarHidden : React.PropTypes.bool.isRequired,
  accountSelection: React.PropTypes.string
};

