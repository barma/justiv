import React from 'react';
import { sortable } from 'react-sortable';

class ListItem extends React.Component {

  render() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    );
  }
}

export default sortable(ListItem);
