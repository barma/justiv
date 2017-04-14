'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as leadsActions from '../../actions/leadsActions';
import * as pageControlsActions from '../../actions/pageControlsActions';
import * as selectOptionsActions from '../../actions/selectOptionsActions';
import * as UIStateActions from '../../actions/UIStateActions';
import * as accountsActions from '../../actions/accountsActions';
import selectOptionHelpers from '../../helpers/selectOption';

// sections
import TopBar from './TopBar/TopBarContainer';
import Sidebar from './Sidebar/OverviewSidebar';
import AccountsGrid from './Grid/AccountsGrid';

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
    const {route, session_id, controls, actions, selectOptions, detailsControls} = this.props;

    // get account list
    //actions.accounts.getAccountList(session_id, route.accounts_api_route);
    let promises = [];

    if(!this.props.location.state || !(this.props.location.state && this.props.location.state.current_account)) {
      promises.push(actions.accounts.resetSearchQuery());
    }

    if(!selectOptions || (selectOptions && !selectOptions.length)) {
      promises.push(actions.selectOptions.getSelectOption(session_id, route.select_options));
    }

    if(!controls.isReceived) {
      promises.push(actions.pageControls.loadPageControls(route.pageId, null, session_id, {selection: route.account_search_selection}));

      // TODO check and remove next action from this condition
      promises.push(actions.pageControls.loadPageControls(1010, null, session_id));
    }

    if(!detailsControls.isReceived) {
      promises.push(actions.pageControls.loadPageControls(1010, null, session_id));
    }

    Promise.all(promises)
      .then(() => {
        let code;

        let selectOption = selectOptionHelpers.findByControlId(this.props.selectOptions, Number(this.props.controls.accountSelectionDropdown.id));
        if(selectOption) {
          code = selectOption.T020C002;
        } else {
          code = selectOptionHelpers.getDefaultSelectOptionCode(this.props.controls.accountSelectionDropdown.items);
        }

        // Next implementation: use code here
        if(this.props.accountsList.length + 1 > 20 && this.props.location.state && this.props.location.state.isNewAccount && this.props.location.state.current_account) {
          return actions.accounts.searchAccounts(session_id, route.accounts_api_route, route.account_search_listbox, code, {
            amount: this.props.accountsList.length,
            newAccount: this.props.location.state.current_account
          });
        }
        if(this.props.accountsList.length > 20) {
          return actions.accounts.searchAccounts(session_id, route.accounts_api_route, route.account_search_listbox, code, {
            amount: this.props.accountsList.length
          });
        }
        return actions.accounts.getAccountList(session_id, route.account_search_listbox, route.accounts_api_route, code);
      })
      .then(() => {
        this.setState({loaded: true}, this.setFullHeight);
      })
      .catch(err => {
        console.log("Error: ", err);
        //alert('Server doesnt respond');
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

  componentDidUpdate(nextProps) {
    if(nextProps.controls.isReceived) {
      setTimeout(this.setFullHeight, 100);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setFullHeight);
  }

  searchAccounts() {
    const {actions, session_id, route} = this.props;
    // TODO
    actions.accounts.searchAccounts(session_id, route.accounts_api_route, route.account_search_selection, route.account_search_listbox);
  }

  changeAccountsSelection() {
    const {actions, session_id, route} = this.props;
    // TODO
    actions.accounts.searchAccounts(session_id, route.accounts_api_route, route.account_search_selection, route.account_search_listbox);
  }

  onShowMoreBtnClick(e) {
    e.preventDefault();
    const {session_id, accountsPage, route, actions} = this.props;
    let nextPage = accountsPage + 1;
    actions.accounts.showMoreAccounts(session_id, nextPage, route.accounts_api_route, route.account_search_selection, route.account_search_listbox);
  }

  switchSidebar() {
    this.props.actions.UIState.switchSidebar(this.props.isSidebarHidden);
  }

  setFullHeight() {
    //if(!this.state.loaded) return;

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
              allLoaded={this.state.loaded}
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
    user            : state.auth.user,
    totalAmount     : state.accounts.totalAmount,
    accountsList    : state.accounts.all,
    controls        : state.pageControls[ownProps.route.pageId],
    detailsControls : state.pageControls.accountDetails,
    selectOptions   : state.selectOptions[ownProps.route.select_options],
    isMoreAccountsRequested: state.accounts.isMoreAccountsRequested,
    isFetching      : state.accounts.isFetching,
    allAccountReceived: state.accounts.allReceived,
    accountsPage    : state.accounts.page,
    sort            : state.accounts.sort
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

