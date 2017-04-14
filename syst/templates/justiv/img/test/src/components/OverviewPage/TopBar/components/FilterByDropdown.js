'use strict';

import React from 'react';
import _each from 'lodash/each';
import _bindAll from 'lodash/bindAll';

import FaCheck from 'react-icons/lib/fa/check';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

export default class FilterByDropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: '' // this.props.filterByDropdown.items[0].T001C001
    };

    _bindAll(this, ['renderDropdownItems', 'onFilterSelect']);
  }

  componentDidMount() {
    $(document).on('click', this.handleClickOnDocument);

    // TODO do something with this...
    $('#filterDropdown').on('click', (e) => {
      if('close' in e.target.dataset) return;

      this.onFilterSelect(e);
      e.stopPropagation();
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.filterByDropdown && nextProps.filterByDropdown.items && nextProps.filterByDropdown.items.length) {
      this.setState({selectedFilter: nextProps.filterByDropdown.items[0].T001C001});
    }
  }

  componentWillUnmount() {
    $(document).off('click', this.handleClickOnDocument);
  }

  handleClickOnDocument(e) {
    let $trigger = $('#filterDropdown');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
    }
  }

  markSelectedItem(menuItem) {
    if(this.state.selectedFilter === menuItem) {
      return (<FaCheck className="ao-dropdown-menu-checked" />);
    }
  }

  renderDropdownItems() {
    let items = [];
    if(this.props.filterByDropdown && this.props.filterByDropdown.items && this.props.filterByDropdown.items.length) {
    items.push(<li className="ao-filter-dropdown-item-category">{this.props.filterByDropdown.header}</li>);

      // insert divider before subitems
      items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);

      for(let i = 0; i < this.props.filterByDropdown.items.length; i++) {
        items.push(<li key={this.props.filterByDropdown.items[i].T001C001} data-label={this.props.filterByDropdown.items[i].T001C001} className="ao-dropdown-menu-item ao-filter-dropdown-item-subcategory">
          {this.markSelectedItem(this.props.filterByDropdown.items[i].T001C001)}
          <span>{this.props.filterByDropdown.items[i].T001C004}</span>
          </li>);
        if(i !== (this.props.filterByDropdown.items.length - 1)) {
          items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);
        }
      }
    }
    return items;
  }

  onFilterSelect(e) {
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = Number(target.dataset.label);
        if(label) {
          this.setState({selectedFilter: label});
        }
        return;
      }
      target = target.parentNode;
    }
  }

  render() {
    return (
      <div className="dropdown filter-dropdown-container ao-top-bot-input-border">
        <div className="drowpdown-toggle" data-toggle="dropdown">
          <span className="ao-dropdown-label">{this.props.filterByLabel}</span>
          <span><FaCaretDown size={24} /></span>
        </div>
        <ul className="dropdown-menu crm-custom-dropdown" id="filterDropdown" onClick={this.onFilterSelect}>
          <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
          {this.renderDropdownItems()}
        </ul>
      </div>
    );
  }

}

FilterByDropdown.propTypes = {
  filterByLabel     : React.PropTypes.string.isRequired,
  filterByDropdown  : React.PropTypes.object.isRequired
};
