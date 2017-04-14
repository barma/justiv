'use strict';

import React from 'react';
import Header from './Header.jsx';

export default class HeaderContainer extends React.Component {

  render() {
    return(
      <Header
        logoLabel={this.props.logoLabel}
        menuItems={this.props.menuItems}
        isAuthenticated={this.props.isAuthenticated}
        />
    );
  }

}

HeaderContainer.propTypes = {
  logoLabel: React.PropTypes.string.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  menuItems: React.PropTypes.array.isRequired
};
