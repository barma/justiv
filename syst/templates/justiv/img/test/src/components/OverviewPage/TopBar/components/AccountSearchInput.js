'use strict';

import React from 'react';
import {CRM_PARAMS_TABLE_INDEX, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME} from '../../../../constants/db';
import {SEARCH_ALL_TYPES} from '../../../../constants/temp';
import _bindAll from 'lodash/bindAll';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import _head from 'lodash/head';

import FaCheck from 'react-icons/lib/fa/check';
import FaSearch from 'react-icons/lib/fa/search';
import FaTimeCircle from 'react-icons/lib/fa/times-circle';

export default class AccountSearchInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [''],
      searchQuery: '',
      typingTimer: null,
      typingTimeout: 1000
    };

    _bindAll(this, ['renderDropdownItems', 'onSearchTagSelect', 'clearSearchInput', 'onSearchQueryChange']);
  }

  handleClickOnDocument(e) {
    let $trigger = $('#searchDropdown');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
    }
  }

  componentDidMount() {
    $(document).on('click', this.handleClickOnDocument);

    // TODO do something with this...
    $('#searchDropdown').on('click', (e) => {
      if('close' in e.target.dataset) return;

      this.onSearchTagSelect(e);
      e.stopPropagation();
    });

    if(this.props.searchAccountTypeDropdown.items && this.props.searchAccountTypeDropdown.items.length) {
      this.setState({selectedItems: [_head(this.props.searchAccountTypeDropdown.items)[CRM_PARAMS_PARAM_CODE]]});
    }
  }

  clearSearchInput() {
    this.refs.searchInput.value = '';
    this.setState({searchQuery: ''});

    this.props.updateSearchQuery({
      query: '',
      types: this.state.selectedItems.join()
    });

    this.props.searchAccounts('', this.state.selectedItems.join());
  }

  onSearchQueryChange(e) {
    this.setState({searchQuery: e.currentTarget.value});

    clearTimeout(this.state.typingTimer);

    this.props.updateSearchQuery({
      query: e.currentTarget.value,
      types: this.state.selectedItems.join()
    });

    this.setState({typingTimer: setTimeout(() => {
      this.props.searchAccounts(this.state.searchQuery, this.state.selectedItems.join());
    }, this.state.typingTimeout)});

  }

  markSelectedItem(menuItem) {
    if(this.state.selectedItems.indexOf(menuItem) !== -1) {
      return (<FaCheck className="ao-dropdown-menu-checked" />);
    }
  }

  onSearchTagSelect(e) {
    let target = e.target,
        label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = target.dataset.label;
        if(label) {
          if(label === SEARCH_ALL_TYPES) {
            return this.setState({selectedItems: [SEARCH_ALL_TYPES]});
          }
          let selectedItems = this.state.selectedItems.slice(0);

          let indexAllTypes = selectedItems.indexOf(SEARCH_ALL_TYPES);
          if(indexAllTypes !== -1) {
            selectedItems.splice(indexAllTypes, 1);
          }

          let index = selectedItems.indexOf(label);
          if(index === -1) {
            selectedItems.push(label);
          } else {
            selectedItems.splice(index, 1)
          }

          this.props.updateSearchQuery({
            query: this.state.searchQuery,
            types: this.state.selectedItems.join()
          });

          this.setState({selectedItems});
        }
        return;
      }
      target = target.parentNode;
    }
  }

  renderDropdownItems() {
    let items = [];

    if(this.props.searchAccountTypeDropdown) {
      _each(this.props.searchAccountTypeDropdown.items, (item, index) => {
        items.push(<li className="ao-accounts-groups-menu-dropdown-item ao-dropdown-menu-item" data-label={item[CRM_PARAMS_PARAM_CODE]}>
          {this.markSelectedItem(item[CRM_PARAMS_PARAM_CODE])}
          <span className="ao-accounts-groups-menu-dropdown-item-label">{item[CRM_PARAMS_PARAM_NAME]}</span>
        </li>);
        if(index !== (this.props.searchAccountTypeDropdown.items.length - 1)) {
          items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);
        }
      });
    }

    return items;
  }

  render() {
    return (
      <div className="ao-search-input-main-container">
        <div className="ao-search-input-main-inner dropdown">
          <span className="ao-search-input-main-tag drowpdown-toggle" data-toggle="dropdown">{this.props.searchTypeBtn}</span>
          <ul className="dropdown-menu crm-custom-dropdown" id="searchDropdown" onClick={this.onSearchTagSelect}>
            <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
            {this.renderDropdownItems()}
          </ul>
          <FaSearch size={20} className="ao-search-input-main-search ao-search-input-icon" />
          <input type="text" className="ao-top-bot-input-border ao-search-input-main" placeholder={this.props.searchPlaceholder} onChange={this.onSearchQueryChange} ref="searchInput" />
          <FaTimeCircle size={22} className="ao-search-input-main-circle ao-search-input-icon" onClick={this.clearSearchInput} />
        </div>
      </div>
    );
  }

}

AccountSearchInput.propTypes = {
  searchTypeBtn     : React.PropTypes.string.isRequired,
  searchPlaceholder : React.PropTypes.string.isRequired
};
