'use strict';

import React from 'react';

export default class ErrorBox extends React.Component {

  render() {
    return(
      <div className="alert alert-danger" role="alert">
        <p>{this.props.error}</p>
      </div>
    );
  }

}

ErrorBox.propTypes = {
  error: React.PropTypes.string.isRequired
};
