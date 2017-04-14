'use strict';

import React from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import crmParamsHelpers from '../../../../helpers/crmParams';
import _each from 'lodash/each';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';

export default class DropdownBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: '',
      isSet: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.setDefaultType = this.setDefaultType.bind(this);
  }

  componentWillMount() {
    this.setDefaultType();
    //if(this.props.items.length) {
    //  let defaults = '';
    //  let item;
    //  _each(this.props.items, i => {
    //    if(i.T001C023) {
    //      defaults = i.T001C005;
    //      item = i;
    //    }
    //  });
    //  this.setState({selectedItem: defaults}, () => {
    //    this.props.onChangeType({
    //      category: item.T001C016,
    //      code: item.T001C003
    //    });
    //  });
    //}
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultType(nextProps);
  }

  handleClick(e) {
    let dataset = e.currentTarget.dataset;

    this.setState({selectedItem: dataset.label});

    this.props.onChangeType('T110', dataset.code, {
      category: dataset.category
    });
  }

  setDefaultType(props = this.props) {
    if(props.defaultSelection && props.items.length && !this.state.isSet) {
      let defaultItem = crmParamsHelpers.findByCode(this.props.items, this.props.defaultSelection);

      if(defaultItem) {
        this.setState({selectedItem: defaultItem.T001C005, isSet: true});
        this.props.onChangeType('T110', defaultItem.T001C003, {
          category: defaultItem.T001C016
        });
      }
    }
  }

  renderOptions() {
    let items = [];
    _each(this.props.items, (item, key) => {
      items.push(<li
        key={item.T001C001}
        data-id={item.T001C001}
        data-label={item.T001C005}
        data-category={item.T001C016}
        data-code={item.T001C003}
        data-parameter={item.T001C017}
        className="locale-selection-item"
        onClick={this.handleClick}>
          {item.T001C005}
      </li>);
    });
    return items;
  }

  render() {
    return (
      <div className="dropdownbox-selection-menu text-right dropdown">
        <span className="dropdown-toggle" data-toggle="dropdown">
          {this.state.selectedItem}
          <FaCaretDown size="24" />
        </span>
        <ul className="dropdown-menu dropdown-menu-right">
          {this.renderOptions()}
        </ul>
      </div>
    );
  }

}

DropdownBox.propTypes = {
  menuRole      : React.PropTypes.bool,
  items         : React.PropTypes.array,
  onChangeType  : React.PropTypes.func
};
