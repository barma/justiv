'use strict';

import React from 'react';
import { Link } from 'react-router';
import HomePage from './HomePage.jsx';

export default class HomePageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.showLoginButton = this.showLoginButton.bind(this);
  }

  showLoginButton() {
    if(this.props.isAuthenticated) {
      return (<Link className="btn btn-primary" to="account">Account page</Link>);
    }
    return (<Link className="btn btn-primary" to="login">Login</Link>);
  }

  render() {
    return (
      <HomePage
        loginButton={this.showLoginButton()}
        />
    );
  }

}

HomePageContainer.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired
};
