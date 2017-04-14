'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as leadsActions from '../../../actions/leadsActions';
import * as pageControlsActions from '../../../actions/pageControlsActions';
import * as selectOptionsActions from '../../../actions/selectOptionsActions';
import * as UIStateActions from '../../../actions/UIStateActions';
import * as accountsActions from '../../../actions/accountsActions';

// sections
import TopBar from '../../Common/Overview/TopBar/TopBarContainer';
import Sidebar from '../../Common/Overview/Sidebar/OverviewSidebar';
import AccountsGrid from '../../Common/Overview/Grid/AccountsGrid';

class LeadsOverviewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.setFullHeight = this.setFullHeight.bind(this);
    this.onShowMoreBtnClick = this.onShowMoreBtnClick.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.searchAccounts = this.searchAccounts.bind(this);
    this.changeAccountsSelection = this.changeAccountsSelection.bind(this);
  }

  componentWillMount() {
    const {route, session_id, controls} = this.props;
    const {pageControls, selectOptions, accounts} = this.props.actions;

    let promises = [
      accounts.getAccountList(session_id, '/account/lead'),
      selectOptions.getSelectOption(session_id, route.select_options)
    ];

    if(!controls.isReceived) {
      promises.push(pageControls.loadPageControls(route.pageId, null, session_id));
    }

    Promise.all(promises)
      .then(() => {
        this.setState({loaded: true}, () => {
          this.setFullHeight();
        });
      });
  }

  componentDidMount() {
    window.addEventListener("resize", this.setFullHeight);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.controls.isReceived) {
      this.setFullHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setFullHeight);
  }

  searchAccounts() {
    this.props.actions.accounts.searchAccounts(this.props.session_id, "account/lead", 'ACC_SEARCH_L_STATUS', 'LEAD_LISTBOX');
  }

  changeAccountsSelection() {
    this.props.actions.accounts.searchAccounts(this.props.session_id, "account/lead", 'ACC_SEARCH_L_STATUS', 'LEAD_LISTBOX');
  }

  onShowMoreBtnClick(e) {
    e.preventDefault();
    const {session_id, accountsPage, accountSelection} = this.props;
    this.props.actions.accounts.showMoreAccounts(session_id, accountsPage, accountSelection);
  }

  switchSidebar() {
    this.props.actions.UIState.switchSidebar(this.props.isSidebarHidden);
  }

  setFullHeight() {
    if(!this.state.loaded) return;

    let navbar = document.querySelector('.navbar-default'),
      navbarHeight = navbar.offsetHeight,
      docHeight = document.body.offsetHeight,
      topbar = document.querySelector('#topBar'),
      tWrapper = document.querySelector('#accountTableWrapper');

    let bodyHeight = docHeight - navbarHeight;

    this.refs.body.style.height = `${bodyHeight}px`;
    tWrapper.style.height = `${bodyHeight - topbar.offsetHeight}px`;
  }

  render() {
    if(!this.state.loaded) {
      return (
        <div ref="body" className="ao-body-box ao-body">
          <div className="level-1 container-fluid ao-body">
            <div className={this.props.isSidebarHidden ? "col-xs-12" : "col-xs-12 col-sm-8"}>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div ref="body" className="ao-body-box ao-body">
        <div className="level-1 container-fluid ao-body">
          <div className={this.props.isSidebarHidden ? "col-xs-12" : "col-xs-12 col-sm-8"}>
            <TopBar
              {...this.props}
              switchSidebar={this.switchSidebar}
              searchAccounts={this.searchAccounts}
              changeAccountsSelection={this.changeAccountsSelection}
              />
            <AccountsGrid
              {...this.props}
              onShowMoreBtnClick={this.onShowMoreBtnClick}
              />
          </div>
          <Sidebar
            isSidebarHidden={this.props.isSidebarHidden}
            />
        </div>
      </div>
    );
  }

}

LeadsOverviewPage.propTypes = {
  actions           : React.PropTypes.object.isRequired,
  route             : React.PropTypes.object.isRequired,
  isSidebarHidden   : React.PropTypes.bool.isRequired,
  session_id        : React.PropTypes.string.isRequired,
  crmparams         : React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    session_id      : state.auth.session_id,
    isSidebarHidden : state.UIState.isSidebarHidden,
    crmparams       : state.crmParams.keys,
    totalAmount     : state.accounts.totalAmount,
    accountsList    : state.accounts.all,
    controls        : state.pageControls[ownProps.route.pageId],
    selectOptions   : state.selectOptions[ownProps.route.select_options],
    isMoreAccountsRequested: state.accounts.isMoreAccountsRequested,
    isFetching      : state.accounts.isFetching,
    allAccountReceived: state.accounts.allReceived,
    accountsPage    : state.accounts.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      leads        : bindActionCreators(leadsActions, dispatch),
      accounts     : bindActionCreators(accountsActions, dispatch),
      pageControls : bindActionCreators(pageControlsActions, dispatch),
      selectOptions: bindActionCreators(selectOptionsActions, dispatch),
      UIState      : bindActionCreators(UIStateActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsOverviewPage);
