'use strict';

import React from 'react';
import SortableListItem from './ListItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      draggingIndex: null
    };

  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    var childProps = { className: 'myClass1' };
    var listItems = this.props.data.items.map((item, i) => {
      return (
        <SortableListItem
          key={i}
          updateState={this.updateState}
          items={this.props.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list"
          childProps={childProps}
          >{item}</SortableListItem>
      );
    }, this);

    return (
      <div className="list">{listItems}</div>
    )
  }

}
