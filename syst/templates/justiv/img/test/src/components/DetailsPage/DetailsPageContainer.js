'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux';
import * as accountsActions from '../../actions/accountsActions';
import * as pageControlsActions from '../../actions/pageControlsActions';
import * as usersActions from '../../actions/userActions';
import * as selectOptionsActions from '../../actions/selectOptionsActions';
import {DATE_PATTERN_DAY_CREATED, DATE_PATTERN_TIME_CREATED} from '../../constants/application';
import {ACCOUNT_GUID, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_VALUE} from '../../constants/db';

import accountHelpers from '../../helpers/account';
import crmParamsHelpers from '../../helpers/crmParams';

import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

import NotFoundPage from '../NotFound/NotFoundPage.jsx';
import HeaderLine from './sections/HeaderLine.jsx';
import HeaderBody from './sections/HeaderBody.jsx';
import Sidebar from './sections/Sidebar.jsx';
import AccountInfoBlock from './sections/AccountInfo/AccountInfo';
import ShowSaveAlert from './sections/Alerts/Save.jsx';
import ShowCancelAlert from './sections/Alerts/Cancel.jsx';
import NameInsertAlert from './sections/Alerts/NameInsert.jsx';

import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _each from 'lodash/each';
import _indexOf from 'lodash/indexOf';
import _bindAll from 'lodash/bindAll';
import _isEmpty from 'lodash/isEmpty';

class DetailsPage extends React.Component {

  constructor(props) {
    super(props);

    _bindAll(this, [
      'updateAccountRate',
      'setBlacklisted',
      'onShowHideComponent',
      'onCancelBtnClick',
      'hideNameInsertAlert',
      'hideCancelAlert',
      'hideCancelAlertPress',
      'hideSaveAlert',
      'hideModalPress',
      'onSaveAccount',
      'onSaveAccountPress',
      'onReturnToAccounts',
      'onReturnToAccountsPress',
      'onSaveBtnClick',
      'renderAccountInfoBlocks',
      'onChangeType',
      'assignAccountToUser',
      'onChangeCheckbox',
      'setFullHeight',
      'redirectToOverviewScreen',
      'addNewAddress',
      'updateAccountInfo',
      'saveUserImage',
      'setErrorMessage',
      'removeUserImage',
      'onSaveBtnPress',
      'unsetValueRate'
    ]);

    this.state = {
      showSaveAlert: false,
      showCancelAlert: false,
      isNewAccount: false,
      showErrorsAlert: false,
      errorMsg: '',
      isLoaded: false
    };
  }

  componentWillMount() {
    const {route, session_id, routeParams, actions} = this.props;

    let promises = [
      //actions.pageControls.loadPageControls(route.pageId, null, session_id),
      actions.users.getUsersList(session_id),
      actions.pageControls.loadDetailsPageControls(route.pageId, session_id, route.select_options)
      //actions.selectOptions.getSelectOption(session_id, route.select_options)
    ];

    if(routeParams.accountId) {
      promises.push(actions.accounts.getAccountInfo(routeParams.accountId, session_id));
    } else {
      // when user goes to create account page
      // reset account info in store
      promises.push(actions.accounts.accountInfoReceived({}));
      this.setState({isNewAccount: true});
    }

    Promise.all(promises)
      .then(() => {
        console.log("Account details: all actions executed");
        this.setState({isLoaded: true});
      })
      .catch(err => {
        console.log(">>>>>ERRRRO");
        console.log(err);
        alert('Server doesnt respond');
      });

    window.addEventListener("resize", this.setFullHeight);
  }

  componentWillReceiveProps() {
    setTimeout(this.setFullHeight, 100);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setFullHeight);
  }

  setFullHeight() {
    if(!this.containerElement) return;
    this.containerElement.style.height = `${window.innerHeight}px`;
    //let headerLineHeight = this.headerLineElement.offsetHeight,
    //    containerHeight = this.containerElement.offsetHeight;
    //
    //let calculatedHeight = containerHeight - headerLineHeight;
    //this.accDetailsElement.style.height = `${calculatedHeight}px`;
  }

  onShowHideComponent(e) {
    let index = e.currentTarget.dataset.index;
    $(this['dropdownRef-' + index]).children().not('.pd-details-box').toggle();
  }

  onCancelBtnClick(e) {
    e.preventDefault();
    this.setState({showCancelAlert: true});
  }

  hideNameInsertAlert() {
    this.setState({showErrorsAlert: false});
  }

  hideCancelAlert() {
    this.setState({showCancelAlert: false});
  }

  hideCancelAlertPress(e) {
    if(isEnterBtn(e.keyCode)) {
      e.preventDefault();
      this.setState({showCancelAlert: false});
    }
  }

  hideSaveAlert() {
    this.setState({showSaveAlert: false});
  }

  hideModalPress(e) {
    if(isEnterBtn(e.keyCode)) {
      e.preventDefault();
      this.setState({showSaveAlert: false});
    }
  }

  setErrorMessage(msg) {
    this.setState({showErrorsAlert: true, errorMsg: msg.split('|')});
  }

  onSaveAccount(e) {
    const {session_id, account, route, actions} = this.props;
    e.preventDefault();
    this.setState({isLoaded: false});
    actions.accounts.saveAccountInfo(session_id, account, route.accountType)
      .then((savedAccount) => {
        this.hideSaveAlert();
        this.redirectToOverviewScreen(savedAccount);
      });
  }

  onSaveAccountPress(e) {
    if(isEnterBtn(e.keyCode)) {
      e.preventDefault();
      const {session_id, account, route, actions} = this.props;
      this.setState({isLoaded: false});
      actions.accounts.saveAccountInfo(session_id, account, route.accountType)
        .then((savedAccount) => {
          this.hideSaveAlert();
          this.redirectToOverviewScreen(savedAccount);
        });
    }
  }

  onReturnToAccounts(e) {
    e.preventDefault();
    const {account} = this.props;
    this.hideCancelAlert();
    this.redirectToOverviewScreen(account);
  }

  onReturnToAccountsPress(e) {
    if(isEnterBtn(e.keyCode)) {
      const {account} = this.props;
      e.preventDefault();
      this.hideCancelAlert();
      this.redirectToOverviewScreen(account);
    }
  }

  /**
   * @param {Object=} savedAccount
   * */
  redirectToOverviewScreen(savedAccount) {
    const {route, replace} = this.props;
    let account = this.props.account;
    let isNewAccount = _isEmpty(this.props.routeParams);

    // temporary workaround remove blob image from account object
    if(savedAccount) {
      savedAccount.T106 = [];
    }

    if(savedAccount) {
      account = savedAccount;
    }

    replace({
      pathname: `/${route.returnRoute}`,
      state: {
        current_account: account,
        isNewAccount
      }
    });

  }

  onSaveBtnPress(e) {
    e.preventDefault();
    if(isEnterBtn(e.keyCode)) {
      let errors = accountHelpers.validateAccount(this.props.account);
      if(errors) {
        return this.setState({
          showErrorsAlert: true,
          errorMsg: this.props.controls.nameInsertPopup.split('|')
        });
      }
      this.setState({showSaveAlert: true});
    }
  }

  onSaveBtnClick(e) {
    let errors = accountHelpers.validateAccount(this.props.account);
    if(errors) {
      return this.setState({
        showErrorsAlert: true,
        errorMsg: this.props.controls.nameInsertPopup.split('|')
      });
    }
    this.setState({showSaveAlert: true});
  }

  /**
   * Next three methods must be optimized asap
   * it was written under deadline
   * */
  /**
   * @param {Number} rate - value from 1 to 5
   * */
  updateAccountRate(rate) {
    let account = Object.assign({}, this.props.account);
    let valueRateCodes = _filter(this.props.crmparams, param => param.T001C017 === 'VALUE_RATE');

    let newRate = valueRateCodes[rate - 1];

    let dataToUpdate = account['T112'];

    if(!dataToUpdate) {
      dataToUpdate = [{
        T112C003: newRate.T001C003,
        T112C004: newRate.T001C017
      }];
      return this.props.actions.accounts.updateAccountInfo(account, 'T112', dataToUpdate);
    }

    let foundData = _find(dataToUpdate, {T112C004: newRate.T001C017});
    let index = _indexOf(dataToUpdate, foundData);
    if(index !== -1) {
      foundData.T112C003 = newRate.T001C003;
      // replace object in array
      dataToUpdate.splice(index, 1, foundData);
      return this.props.actions.accounts.updateAccountInfo(account, 'T112', dataToUpdate);
    }

    dataToUpdate.push({
      T112C001: dataToUpdate.length + 1,
      T112C002: account[ACCOUNT_GUID],
      T112C003: newRate.T001C003,
      T112C004: newRate.T001C017
    });

    this.props.actions.accounts.updateAccountInfo(account, 'T112', dataToUpdate);
  }

  unsetValueRate(e) {
    e.preventDefault();
    let account = Object.assign({}, this.props.account);
    let dataToUpdate = account['T112'];

    let foundData = _find(dataToUpdate, {T112C004: 'VALUE_RATE'});
    let index = _indexOf(dataToUpdate, foundData);
    if(index !== -1) {
      dataToUpdate.splice(index, 1);
      return this.props.actions.accounts.updateAccountInfo(account, 'T112', dataToUpdate);
    }
  }

  setBlacklisted(dataset) {
    let account = Object.assign({}, this.props.account);
    let type = crmParamsHelpers.findByCode(this.props.crmparams, dataset.code);

    let accountDataToUpdate = account.T113;
    let foundData = _find(accountDataToUpdate, {T113C004: 'LIST_FLAG'});
    let index = _indexOf(accountDataToUpdate, foundData);

    if(!accountDataToUpdate) {
      accountDataToUpdate = [{
        T113C003: type.T001C016,
        T113C004: type.T001C017
      }];
      return this.props.actions.accounts.updateAccountInfo(account, 'T113', accountDataToUpdate);
    }

    if(dataset.code) {
      if(index !== -1) {
        foundData.T113C003 = type.T001C016;
        accountDataToUpdate.splice(index, 1, foundData);
        return this.props.actions.accounts.updateAccountInfo(account, 'T113', accountDataToUpdate);
      }

      accountDataToUpdate.push({
        T113C003: type.T001C016,
        T113C004: type.T001C017
      });
      this.props.actions.accounts.updateAccountInfo(account, 'T113', accountDataToUpdate);
    } else {
      if(index !== -1) {
        accountDataToUpdate.splice(index, 1);
        return this.props.actions.accounts.updateAccountInfo(account, 'T113', accountDataToUpdate);
      }
    }
  }

  // TODO bring that method into account helpers
  onChangeType(table, value, meta) {
    const {crmparams, controls} = this.props;

    let account = Object.assign({}, this.props.account);
    let dataToUpdate = account[table];

    let type = crmParamsHelpers.findByCode(this.props.crmparams, value);
    let defaultTypeParam = crmParamsHelpers.findByCode(this.props.crmparams, this.props.route.accountType);

    if(meta.category !== 'ACCOUNT_TYPE') {
      let defaultType = _find(dataToUpdate, data => {
        return data.T110C003.T001C003 === accountHelpers.getAccountType(account, crmparams, controls.accountType.input, CRM_PARAMS_PARAM_CODE);
      });

      if(!defaultType) {
        defaultType = {
          T110C003: {
            T001C001: defaultTypeParam.T001C001,
            T001C003: defaultTypeParam.T001C003
          },
          // next key will be deleted before sending to server
          _category: defaultTypeParam.T001C016
        };

        if(dataToUpdate && dataToUpdate.length >= 0) {
          dataToUpdate.push(defaultType);
        } else {
          dataToUpdate = [defaultType];
        }
      }

      if(meta.unset) {
        delete defaultType.T110C004;
      } else {
        defaultType.T110C004 = {
          T001C001: type.T001C001,
          T001C003: value
        };
      }
      return this.props.actions.accounts.updateAccountInfo(account, table, dataToUpdate);
    }

    if(!dataToUpdate || (dataToUpdate && !dataToUpdate.length)) {
      dataToUpdate = [{
        T110C003: {
          T001C001: type.T001C001,
          T001C003: value
        },

        // next key will be deleted before sending to server
        _category: meta.category
      }];
      return this.props.actions.accounts.updateAccountInfo(account, table, dataToUpdate);
    } else {
      let foundData = _find(dataToUpdate, {_category: meta.category});

      let index = _indexOf(dataToUpdate, foundData);
      if(index !== -1) {
        foundData.T110C003 = {
          T001C001: type.T001C001,
          T001C003: value
        };
        foundData._category = meta.category;

        dataToUpdate.splice(index, 1, foundData);
        return this.props.actions.accounts.updateAccountInfo(account, table, dataToUpdate);
      } else {
        dataToUpdate.push({
          T110C003: {
            T001C001: type.T001C001,
            T001C003: value
          },
          _category: meta.category
        });
        return this.props.actions.accounts.updateAccountInfo(account, table, dataToUpdate);
      }
    }
  }

  onChangeCheckbox(e) {
    let account = Object.assign({}, this.props.account);

    let dataset = e.currentTarget.dataset;

    let tableToUpdate = account[dataset.table];
    if(!tableToUpdate) {
      tableToUpdate = [{
        [dataset.table + 'C003']: dataset.code,
        [dataset.table + 'C004']: dataset.type
      }];
      return this.props.actions.accounts.updateAccountInfo(account, dataset.table, tableToUpdate);
    }
    let foundData = _find(tableToUpdate, {[dataset.table + 'C003']: dataset.code});
    let index = _indexOf(tableToUpdate, foundData);
    if(index !== -1) {
      tableToUpdate.splice(index, 1);
      this.props.actions.accounts.updateAccountInfo(account, dataset.table, tableToUpdate);
    } else {
      tableToUpdate.push({
        [dataset.table + 'C003']: dataset.code,
        [dataset.table + 'C004']: dataset.type
      });
      this.props.actions.accounts.updateAccountInfo(account, dataset.table, tableToUpdate);
    }
  }

  saveUserImage(blob) {
    let account = Object.assign({}, this.props.account);
    let data = accountHelpers.saveUserImage(account, blob);
    return this.props.actions.accounts.updateAccountInfo(account, 'T106', data);
  }

  removeUserImage() {
    let account = Object.assign({}, this.props.account);
    return this.props.actions.accounts.updateAccountInfo(account, 'T106', accountHelpers.removeUserImage(account));
  }

  assignAccountToUser(users) {
    // TODO optimize this function
    let account = Object.assign({}, this.props.account);

    let accountDataToUpdate = account.T120;
    if(!accountDataToUpdate || (accountDataToUpdate && accountDataToUpdate.length === 0)) {
      accountDataToUpdate = [];
      _each(users, user => {
        accountDataToUpdate.push({
          T120C002: account[ACCOUNT_GUID],
          T120C003: {
            T012C001: user.T012C001
          }
        });
      });
      return this.props.actions.accounts.updateAccountInfo(account, 'T120', accountDataToUpdate);
    }
    for(let i = 0; i < accountDataToUpdate.length; i++) {
      let userIndex = _findIndex(users, user => accountDataToUpdate[i].T120C003.T012C001 === user.T012C001);
      if(userIndex === -1) {
        accountDataToUpdate.splice(i, 1);
        i--;
      }
    }
    // add new users to assigned
    _each(users, user => {
      let isUserFound = _find(accountDataToUpdate, data => data.T120C003.T012C001 === user.T012C001);
      if(!isUserFound) {
        accountDataToUpdate.push({
          T120C003: {
            T012C001:user.T012C001
          }
        });
      }
    });
    return this.props.actions.accounts.updateAccountInfo(account, 'T120', accountDataToUpdate);
  }

  addNewAddress(meta) {
    let account = Object.assign({}, this.props.account);
    return this.props.actions.accounts.updateAccountInfo(account, 'T101', accountHelpers.addAddressType(account, meta));
  }

  updateAccountInfo(table, column, value, meta) {
    let account = Object.assign({}, this.props.account);
    if(table === 'T110') {
      return this.onChangeType(table, value, meta);
    }

    let newData = accountHelpers.changeAccountInfo(account, table, column, value, meta, this.props.crmparams);

    if(table === 'T100') {
      return this.props.actions.accounts.updateAccountInfo(account, table + column, newData);
    }
    return this.props.actions.accounts.updateAccountInfo(account, table, newData);
  }

  renderAccountInfoBlocks() {
    let items = [];
    if(this.props.sections.length) {
      for(let i = 0; i < this.props.sections.length; i++) {
        items.push(<AccountInfoBlock
          {...this.props}
          section={this.props.sections[i]}
          dropdownRef={ref => this['dropdownRef-' + i] = ref}
          onShowHideComponent={this.onShowHideComponent}
          index={i}
          onChangeCheckbox={this.onChangeCheckbox}
          assignAccountToUser={this.assignAccountToUser}
          defaultAccountType={this.props.route.accountType}
          addNewAddress={this.addNewAddress}
          updateAccountInfo={this.updateAccountInfo}
        />);
      }
    }

    return items;
  }

  render() {
    const {account, controls, route, crmparams} = this.props;

    if(account.notFound) {
      return <NotFoundPage />;
    }
    // wait until everything will be load
    if(!this.state.isLoaded) {
      return (<FaCircleONotch size={42} className="centered-spinner rotating-spinner" />);
    }
    return (
      <div ref={container => {this.containerElement = container;}} className="position-relative account-id-block">
        <div ref={headerLine => {this.headerLineElement = headerLine;}} className="user-details-header-outer">
          <HeaderLine
            {...this.props}
            fullName={accountHelpers.getFullName(account)}
            accountCreatedDate={accountHelpers.getCreatedDate(account, DATE_PATTERN_DAY_CREATED + ' ' + DATE_PATTERN_TIME_CREATED)}
            accountCreatedBy={accountHelpers.getCreatedBy(account)}
            onCancelBtnClick={this.onCancelBtnClick}
            onSaveBtnClick={this.onSaveBtnClick}
            saveUserImage={this.saveUserImage}
            userImage={accountHelpers.getUserImage(account)}
            setErrorMessage={this.setErrorMessage}
            removeAvatar={this.removeUserImage}
          />
        </div>
        <div ref={accountDetailsEl => {this.accDetailsElement = accountDetailsEl;}} className="cfx h-100 col-xs-12 col-sm-8">

          {this.state.errorMsg ? (<NameInsertAlert
            hideAlert={this.hideNameInsertAlert}
            showModal={this.state.showErrorsAlert}
            errorMessage={this.state.errorMsg}
            />) : null}

          {this.state.showSaveAlert ? (<ShowSaveAlert
            onSaveAccount={this.onSaveAccount}
            showModal={this.state.showSaveAlert}
            hideModal={this.hideSaveAlert}
            onSaveAccountPress={this.onSaveAccountPress}
            hideModalPress={this.hideModalPress}
            savePopupMessage={controls.savePopupMessage.split('|')}
            />) : null}
          {this.state.showCancelAlert ? (<ShowCancelAlert
            onReturnToAccounts={this.onReturnToAccounts}
            onReturnToAccountsPress={this.onReturnToAccountsPress}
            hideCancelAlertPress={this.hideCancelAlertPress}
            showModal={this.state.showCancelAlert}
            hideCancelAlert={this.hideCancelAlert}
            cancelPopupMessage={controls.cancelPopupMessage.split('|')}
            />) : null}

          <HeaderBody
            {...this.props}
            valueRate={accountHelpers.getValueRate(account)}
            updateAccountRate={this.updateAccountRate}
            setBlacklisted={this.setBlacklisted}
            isBlacklisted={accountHelpers.isAccountBlacklisted(account)}
            isNewAccount={this.state.isNewAccount}
            accountTypes={accountHelpers.getAvailableAccountTypes(crmparams)}
            onChangeType={this.onChangeType}
            getListFlags={accountHelpers.getListFlags(crmparams)}
            defaultAccountType={route.accountType}
            currentAccountType={accountHelpers.getAccountType(account, crmparams, controls.accountType.input, CRM_PARAMS_PARAM_VALUE, route.accountType)}
            blackListLabel={accountHelpers.getBlackListLabel(crmparams)}
            unsetValueRate={this.unsetValueRate}
          />
           <div className="abs-box">
             <div>
              {this.renderAccountInfoBlocks()}
             </div>
           </div>
        </div>
        <Sidebar />
      </div>
    );
  }

}

DetailsPage.propTypes = {
  session_id          : React.PropTypes.string,
  user                : React.PropTypes.object,
  account             : React.PropTypes.object,
  replace             : React.PropTypes.func,
  isFetching          : React.PropTypes.bool,
  crmparams           : React.PropTypes.array,
  selectOptions       : React.PropTypes.array,
  sections            : React.PropTypes.array,
  users               : React.PropTypes.array,
  actions             : React.PropTypes.object,
  controls            : React.PropTypes.object,
  route               : React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    session_id          : state.auth.session_id,
    user                : state.auth.user,
    account             : state.accounts.current,
    isFetching          : state.accounts.isFetching,
    crmparams           : state.crmParams.keys,
    controls            : state.pageControls.accountDetails,

    locales             : state.pageControls.locales,
    sections            : state.pageControls.accountDetails.sections,
    selectOptions       : state.selectOptions[ownProps.route.select_options],
    users               : state.users.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      accounts        : bindActionCreators(accountsActions, dispatch),
      pageControls    : bindActionCreators(pageControlsActions, dispatch),
      users           : bindActionCreators(usersActions, dispatch),
      selectOptions   : bindActionCreators(selectOptionsActions, dispatch)
    },
    replace(path) {
      dispatch(routerActions.replace(path));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
