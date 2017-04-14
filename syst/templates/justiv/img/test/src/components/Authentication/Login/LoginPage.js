'use strict';

import React from 'react';
import LoginForm from './components/LoginForm.js';
import LocaleSelectMenu from '../../Common/Menus/LocaleSelectionMenu/LocaleSelectionMenu';

export default class LoginPage extends React.Component {

  constructor(params) {
    super(params);
  }

  render() {
    return(
      <div className="login_wrapper">
        <div className="form login_form">
          <section className="locale_select">
            <LocaleSelectMenu />
          </section>
          <section className="login_content">
            <LoginForm
              location={this.props.location}
              router={this.context.router}
              pageId={this.props.route.pageId}
              />
          </section>
        </div>
      </div>
    );
  }

}

LoginPage.propTypes = {
  location  : React.PropTypes.object.isRequired,
  route     : React.PropTypes.object.isRequired
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};
