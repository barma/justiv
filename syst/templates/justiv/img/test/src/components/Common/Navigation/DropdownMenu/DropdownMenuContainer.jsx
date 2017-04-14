'use strict';

import React from 'react';
import {Link} from 'react-router';
import {MENU_CREATE_ACCOUNT} from '../../../../constants/temp';

const NavDropdownMenuItem = (props) => {
  return (<li>
    {props.id === MENU_CREATE_ACCOUNT ?
      <Link to="/accounts/new">{props.label}</Link> :
      <a href="#">{props.label}</a>
    }
  </li>);
};

export default NavDropdownMenuItem;
