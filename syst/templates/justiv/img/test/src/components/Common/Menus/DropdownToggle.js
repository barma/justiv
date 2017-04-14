'use strict';

import React from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

export default class DropdownToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <div className="clearfix" onClick={this.handleClick}>
        <span className="ao-dropdown-label">{this.props.children}</span>
        <span className="pull-right"><FaCaretDown size={20} /></span>
      </div>
    );
  }
}
