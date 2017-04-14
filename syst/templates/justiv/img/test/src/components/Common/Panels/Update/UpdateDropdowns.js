'use strict';

import React from 'react';
import UpdateDropdownMenu from './UpdateDropdownMenu';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownToggle from '../../Menus/DropdownToggle';

export default class UpdateDropdowns extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {menuItems} = this.props;

    return(
      <div>
        <Dropdown id="dropdown-custom-1" className="custom-dropdown-menu">

          <DropdownToggle bsRole="toggle">
            Lead Status
          </DropdownToggle>

          <UpdateDropdownMenu bsRole="menu">
            {menuItems.map((menuItem, index) => {
              return <MenuItem className="update-dropdown-menu-item" eventKey={index}>{menuItem.T001C005}</MenuItem>;
            })}
          </UpdateDropdownMenu>
        </Dropdown>

        <Dropdown id="dropdown-custom-2" className="custom-dropdown-menu">

          <DropdownToggle bsRole="toggle">
            Assigned
          </DropdownToggle>

          <UpdateDropdownMenu bsRole="menu">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>Active Item</MenuItem>
          </UpdateDropdownMenu>
        </Dropdown>
      </div>
    );
  }

}

