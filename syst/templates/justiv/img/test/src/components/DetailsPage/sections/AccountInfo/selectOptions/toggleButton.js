'use strict';

import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import FaCheck from 'react-icons/lib/fa/check';
import FaPlus from 'react-icons/lib/fa/plus';
import FaCog from 'react-icons/lib/fa/cog';

export default class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

  }

  renderDropdownItems() {
    let items = [];
    if(this.props.header) {
      items.push(<li className="dropdown-menu-header">{this.props.header}</li>);
    }
    this.props.items.map((item, index) => {

      items.push(<li className="dropdown-menu-item" data-label={item.label}>

        {item.display && <FaCheck className="dropdown-menu-item-icon dropdown-menu-item-icon-checked" />}
        <span className="dropdown-menu-item-label">{item.label}</span>
        {item.allowAddNew && <FaPlus className="dropdown-menu-item-icon dropdown-menu-item-icon-add" />}

      </li>);

      if(index !== (this.props.items.length - 1)) {
        items.push(<li className="divider dropdown-menu-item-divider"></li>);
      }
    });
    return items;
  }

  render() {
    //<ul className="dropdown-menu">
    //  {this.renderDropdownItems()}
    //</ul>
    return (
      <span className="dropdown ad-section-select-option-container">
        <FaCog data-tip={this.props.tooltip ? this.props.tooltip : null} size={24} className="ad-section-select-option-icon dropdown-toggle" data-toggle="dropdown" />
        <ReactTooltip place="bottom" class="tooltip" />
        {this.renderSelectOptionList()}
      </span>
    );
  }

}

DropdownMenu.propTypes = {
  items       : React.PropTypes.string,
  header      : React.PropTypes.string
};
