'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux';
import localeHelpers from '../../../../helpers/localesHelpers';
import userHelpers from '../../../../helpers/user';
import _bindAll from 'lodash/bindAll';

// actions
import * as authActions from '../../../../actions/authActions.js';
import * as pageLoginActions from '../../../../actions/pageLoginActions';
import * as pageControlsActions from '../../../../actions/pageControlsActions';

import ErrorBox from '../../../Common/ErrorBox.js';
import LoginForm from './LoginForm.jsx';

class LoginFormContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errorText: ''
    };

    _bindAll(this, ['login', 'onKeepLoggedInChange']);
  }

  componentWillMount() {
    // load interface items from REST API
    let localeId = !this.props.isAuthenticated ? localeHelpers.getActiveLocaleId(this.props.locales) : null;
    let sessionId = this.props.isAuthenticated ? this.props.session_id : null;
    this.props.actions.pageControlsActions.loadPageControls(this.props.pageId, localeId, sessionId);
  }

  onKeepLoggedInChange(e) {
    this.props.actions.authActions.switchKeepSessionId(e.currentTarget.checked);
  }

  // TODO replace this implementation with redux-form (http://redux-form.com/6.0.5/)
  login(e) {
    let activeLocaleId = localeHelpers.getActiveLocaleId(this.props.locales);

    e.preventDefault();
    let creds = {
      username: e.currentTarget.elements['username'].value,
      password: e.currentTarget.elements['password'].value,
      remember: e.currentTarget.elements['keepLoggedIn'].checked,
      activeLocale: activeLocaleId
    };

    let errors = userHelpers.validateUserAuth(creds);
    if(errors) {
      return this.setState({errorText: errors});
    }

    this.props.actions.authActions.loginUser(creds)
      .then(() => {
        if(this.props.isAuthenticated) {
          this.props.replace(this.props.redirect);
        }
      })
      .catch(err => {
        this.setState({errorText: err.message});
      });
  }

  render() {
    return(
      <LoginForm
        login={this.login}
        onKeepLoggedInChange={this.onKeepLoggedInChange}
        {...this.props}>
        {this.state.errorText ?
          <ErrorBox error={this.state.errorText} /> :
          null
        }
      </LoginForm>
    );
  }

}

LoginFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

LoginFormContainer.propTypes = {
  actions:              React.PropTypes.object.isRequired,
  redirect:             React.PropTypes.string.isRequired,
  session_id:           React.PropTypes.string.isRequired,
  locales:              React.PropTypes.object.isRequired,
  controls:             React.PropTypes.object.isRequired,
  pageId:               React.PropTypes.number.isRequired,
  isAuthenticated:      React.PropTypes.bool.isRequired,
  isFetching:           React.PropTypes.bool.isRequired,
  replace:              React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated:      state.auth.isAuthenticated,
    isFetching:           state.auth.isFetching,
    session_id:           state.auth.session_id,
    redirect:             ownProps.location.query.redirect || '/',
    locales:              state.pageControls.locales,
    controls:             state.pageControls.logInForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      authActions:          bindActionCreators(authActions, dispatch),
      pageControlsActions:  bindActionCreators(pageControlsActions, dispatch)
    },
    replace(path) {
      dispatch(routerActions.replace(path));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
