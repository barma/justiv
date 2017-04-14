'use strict';

import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FaSearch from 'react-icons/lib/fa/search';

export default class SearchInput extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {

    return (
      <div className="search-input-wrapper">
        <FormControl
          type="text"
          className="search-input-field"
          placeholder={this.props.placeholder}
          />
        <span className="search-input-icon">
          <FaSearch />
        </span>
      </div>
    );
  }
}
