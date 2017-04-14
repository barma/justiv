'use strict';

import React from 'react';
import { Link } from 'react-router';
import NavigationList from '../Navigation/NavigationList.js';

const Header = (props) => {
  return (<nav className="navbar navbar-default navbar-static-top" role="navigation">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#primaryNavigation" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link className="navbar-brand logo" to="/"></Link><Link className="navbar-brand brand-link" to="/"><span>{ props.logoLabel }</span></Link>
      <div id="primaryNavigation" className="navbar-collapse collapse">
        <NavigationList menuItems={props.menuItems} isAuthenticated={props.isAuthenticated} />
      </div>
    </div>
  </nav>);
};

export default Header;
