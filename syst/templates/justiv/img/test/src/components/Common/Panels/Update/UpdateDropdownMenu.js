'use strict';

import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import SearchInput from '../../Forms/SearchInput';

export default class UpdateDropdownMenu extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {
    const { children } = this.props;

    return (
      <div className="dropdown-menu update-dropdown-box">
        <SearchInput
          placeholder="Search"
          />
        <ul className="list-unstyled update-dropdown-inner-box">
          {children}
        </ul>
      </div>
    );
  }
}
