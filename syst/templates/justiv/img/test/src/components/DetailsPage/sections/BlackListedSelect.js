'use strict';

import React from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaFlag from 'react-icons/lib/fa/flag';
import crmParams from '../../../helpers/crmParams';

import _each from 'lodash/each';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';

export default class DropdownBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.clickOnParent = this.clickOnParent.bind(this);
  }

  componentWillMount() {
    if(this.props.isBlacklisted && this.props.items && this.props.items.length) {

      // TODO
      let value = crmParams.getValueByCode(this.props.items, 'LIST1');
      return this.setState({selectedItem: value});

    }
    this.setState({selectedItem: 'Select...'});
  }

  handleClick(e) {
    let dataset = e.currentTarget.dataset;

    this.props.setBlacklisted(dataset);
    this.setState({selectedItem: dataset.label});
  }

  clickOnParent(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
      $(e.currentTarget).parent().click();
    }
    return false;
  }

  renderOptions() {
    let items = [];

    this.props.items.map(item => {
      items.push(
        <li
          className="listflag-selection-menu-item"
          key={item.T001C001}
          data-parameter={item.T001C017}
          data-code={item.T001C003}
          data-label={item.T001C005}
          onClick={this.handleClick}>
          <a onKeyDown={this.clickOnParent} href="#">{item.T001C005}</a>
        </li>);
    });

    return items;
  }

  render() {
    return (
      <div className="dropdownbox-selection-menu text-right dropdown">
        {(this.props.isBlacklisted && <FaFlag className="blacklist-icon" />)}
        <button className="listflag-selection-menu dropdown-toggle" data-toggle="dropdown">
          {this.state.selectedItem}
          <FaCaretDown size="24" />
        </button>
        <ul className="dropdown-menu dropdown-menu-right" role={this.props.menuRole ? "menu" : ""}>
          <li data-label="Select..." className="listflag-selection-menu-item" onClick={this.handleClick}>
            <a onKeyDown={this.clickOnParent} href="#">Select...</a>
          </li>
          {this.renderOptions()}
        </ul>
      </div>
    );
  }

}
