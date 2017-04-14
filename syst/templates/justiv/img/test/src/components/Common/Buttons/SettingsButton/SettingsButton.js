'use strict';

import React from 'react';
import FaCog from 'react-icons/lib/fa/cog.js';

export default class SettingsButton extends React.Component {

  render() {
    return(
      <FaCog
        size={this.props.size}
        onClick={this.props.onClick}
        className={this.props.className}
        data-toggle={this.props.dropdown ? 'dropdown' : ''}
        data-tip={this.props.tip ? this.props.tip : null}
        data-for={this.props.for ? this.props.for : null}
      />
    );
  }

}
