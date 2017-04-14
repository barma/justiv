'use strict';

import React from 'react';
import {CRM_PARAMS_TABLE_INDEX, CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME, CRM_PARAMS_PARAM_VALUE} from '../../../constants/db';
import {SEARCH_ALL_TYPES} from '../../../constants/temp';
import selectOptionsHelpers from '../../../helpers/selectOption';
import _bindAll from 'lodash/bindAll';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import _head from 'lodash/head';

import FaCheck from 'react-icons/lib/fa/check';
import FaSearch from 'react-icons/lib/fa/search';
import FaTimeCircle from 'react-icons/lib/fa/times-circle';

export default class TaggedSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [''],
      searchQuery: '',
      typingTimer: null,
      typingTimeout: 1000,
      isSetted: false
    };

    _bindAll(this, ['renderDropdownItems', 'onSearchTagSelect', 'clearSearchInput', 'onSearchQueryChange']);
  }

  componentDidMount() {
    $(document).on('click', this.handleClickOnDocument);

    // TODO do something with this...
    $('#searchDropdown').on('click', (e) => {
      if('close' in e.target.dataset) return;

      this.onSearchTagSelect(e);
      e.stopPropagation();
    });

    if(this.props.searchAccountTypeDropdown && this.props.searchAccountTypeDropdown.items && this.props.searchAccountTypeDropdown.items.length) {
      this.setState({isSetted: true, selectedItems: [selectOptionsHelpers.getDefaultSelectOptionCode(this.props.searchAccountTypeDropdown.items)]});
    }
  }

  componentWillReceiveProps(nextProps = this.props) {
    if(nextProps.searchAccountTypeDropdown && nextProps.searchAccountTypeDropdown.items && nextProps.searchAccountTypeDropdown.items.length && !this.state.isSetted) {
      this.setState({isSetted: true, selectedItems: [selectOptionsHelpers.getDefaultSelectOptionCode(nextProps.searchAccountTypeDropdown.items)]});
    }
  }

  handleClickOnDocument(e) {
    let $trigger = $('#searchDropdown');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
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

  onSearchTagSelect(e) {
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = target.dataset.label;
        if(label) {
          let defaultCode = selectOptionsHelpers.getDefaultSelectOptionCode(this.props.searchAccountTypeDropdown.items);

          if(label === defaultCode) {
            return this.setState({selectedItems: [defaultCode]}, () => {
              this.props.updateSearchQuery({
                query: this.state.searchQuery,
                types: this.state.selectedItems.join()
              });
            });
          }
          let selectedItems = this.state.selectedItems.slice(0);

          let indexAllTypes = selectedItems.indexOf(defaultCode);
          if(indexAllTypes !== -1) {
            selectedItems.splice(indexAllTypes, 1);
          }

          let index = selectedItems.indexOf(label);
          if(index === -1) {
            selectedItems.push(label);
          } else {
            selectedItems.splice(index, 1);
          }

          selectedItems = selectedItems.length > 0 ?
            selectedItems :
            [selectOptionsHelpers.getDefaultSelectOptionCode(this.props.searchAccountTypeDropdown.items)];

          this.setState({selectedItems}, () => {
            this.props.updateSearchQuery({
              query: this.state.searchQuery,
              types: this.state.selectedItems.join()
            });
          });
        }
        return;
      }
      target = target.parentNode;
    }
  }

  renderDropdownItems() {
    let items = [];

    if(this.props.searchAccountTypeDropdown && this.props.searchAccountTypeDropdown.items) {
      _each(this.props.searchAccountTypeDropdown.items, (item, index) => {
        items.push(<li key={item[CRM_PARAMS_TABLE_INDEX]} className="ao-accounts-groups-menu-dropdown-item ao-dropdown-menu-item" data-label={item[CRM_PARAMS_PARAM_CODE]}>
          {this.isSelected(item[CRM_PARAMS_PARAM_CODE]) ? (<FaCheck className="ao-dropdown-menu-checked" />) : null}
          <span className="ao-accounts-groups-menu-dropdown-item-label">{item[CRM_PARAMS_PARAM_VALUE]}</span>
        </li>);
        if(index !== (this.props.searchAccountTypeDropdown.items.length - 1)) {
          items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);
        }
      });
    }

    return items;
  }

  isSelected(menuItem) {
    return this.state.selectedItems.indexOf(menuItem) !== -1;
  }

  showTags() {
    let tags = [];
    if(!this.props.searchAccountTypeDropdown) return;
    _each(this.props.searchAccountTypeDropdown.items, item => {
        tags.push(<span className={"tagged-search-tag" + (!this.isSelected(item[CRM_PARAMS_PARAM_CODE]) ? " tagged-search-tag--hidden" : "")} >{item._tag}</span>);
    });
    return tags;
  }

  render() {
    return(
      <div className="tagged-search-container">
        <div className="tagged-search-outer dropdown clearfix">
        <div className="drowpdown-toggle pull-left" data-toggle="dropdown">
          {this.showTags()}
        </div>
        <ul className="dropdown-menu crm-custom-dropdown" id="searchDropdown" onClick={this.onSearchTagSelect}>
          <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
          {this.renderDropdownItems()}
        </ul>
        <div className="tagged-search-field-wrapper">
          <div className="tagged-search-icon-outer pull-left">
            <FaSearch size={20} className="tagged-search-icon" />
          </div>
          <div className="tagged-search-input-outer">
            <input type="text" className="tagged-search-field" placeholder={this.props.searchPlaceholder} onChange={this.onSearchQueryChange} ref="searchInput" />
          </div>
          <div>
            <FaTimeCircle size={22} className="tagged-search-icon-clear" onClick={this.clearSearchInput} />
          </div>
        </div>
        </div>
      </div>
    );

  }

}

TaggedSearch.propTypes = {
  searchAccountTypeDropdown     : React.PropTypes.object,
  searchAccounts                : React.PropTypes.func,
  updateSearchQuery             : React.PropTypes.func,
  searchPlaceholder             : React.PropTypes.string
};
