'use strict';

import React from 'react';
import {
  ACCOUNT_ASSIGNED_ID
  } from '../../../constants';
import accountHelpers from '../../../helpers/account';
import {ACCOUNT_NAME_EL} from '../../../constants/temp';
import { Link } from 'react-router';
import _bindAll from 'lodash/bindAll';
import _each from 'lodash/each';
import _find from 'lodash/find';
import AccountValueRating from '../../Common/Ratings/AccountValueRating';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

// icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';
// icons
import FaSort from 'react-icons/lib/fa/sort';
import FaSortAsc from 'react-icons/lib/fa/sort-asc';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCheck from 'react-icons/lib/fa/check';

export default class ColumnSelectionList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      isPropsReceived: false,
      changed: []
    };

    this.handleClickOnDocument = this.handleClickOnDocument.bind(this);
    this.onColumnSelectionClick = this.onColumnSelectionClick.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.updateSelectOptions = this.updateSelectOptions.bind(this);
  }

  // TODO bring on listener to container on remove it
  // TODO remove all listeners before unmount
  componentDidMount() {
    $(document).on('click', this.handleClickOnDocument);

    // TODO do something with this...
    $('#selectCols').on('click', (e) => {
      if('close' in e.target.dataset) return;
      e.stopPropagation();
      this.onColumnSelectionClick(e);
    });

    $('#columnsDropdown').on('hidden.bs.dropdown', this.updateSelectOptions);
  }

  componentWillReceiveProps(nextProps) {
    let selected = [];
    if(nextProps.selectOptions && nextProps.selectOptions.length && !this.props.isPropsReceived) {
      this.setState({isPropsReceived: true});
      nextProps.selectOptions.map((selectOption) => {
        if(selectOption.T020C005) {
          selected.push(selectOption.T020C001);
        }
      });
    }
    this.setState({selected});
  }

  componentWillUnmount() {
    $('#columnsDropdown').off('hidden.bs.dropdown', this.updateSelectOptions);
    $('#selectCols').off('click');
    $(document).off('click', this.handleClickOnDocument);
  }

  handleClickOnDocument(e) {
    let $trigger = $('#selectCols');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
    }
  }

  onColumnSelectionClick(e) {
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = Number(target.dataset.label);
        if(label) {
          //this.updateSelectOption(label);
          let selectedItems = this.state.changed.slice(0);
          let selectedItems2 = this.state.selected.slice(0);

          let index = selectedItems.indexOf(label);
          let index2 = selectedItems2.indexOf(label);
          if(index === -1) {
            selectedItems.push(label);
          } else {
            selectedItems.splice(index, 1);
          }
          if(index2 === -1) {
            selectedItems2.push(label);
          } else {
            selectedItems2.splice(index2, 1);
          }
          this.setState({changed: selectedItems, selected: selectedItems2});
        }
        return;
      }
      target = target.parentNode;
    }
  }

  updateSelectOptions() {
    let selected = this.state.changed.slice(0);
    selected.map(selectedOption => {
      this.props.updateSelectOption(selectedOption);
    });
    setTimeout(() => {
      this.props.forceUpd();
      this.props.recalculateTableWidths();
    }, 400);

    this.setState({changed: []});
  }

  renderItems() {
    let items = [];
    items.push(<li className="ao-filter-dropdown-item-category">{this.props.controls.columnSelectionLabel}</li>);

    if(this.props.selectOptions && this.props.selectOptions.length) {
      // insert divider before subitems
      items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);

      for(let i = 0; i < this.props.selectOptions.length; i++) {
        if(this.props.selectOptions[i].T020C002 !== (this.props.route.pageId + '_1')) continue;

        if(this.props.selectOptions[i].T020C007) {
          items.push(<li data-label={this.props.selectOptions[i].T020C001} className="ao-dropdown-menu-item ao-filter-dropdown-item-subcategory">
            {this.state.selected.indexOf(this.props.selectOptions[i].T020C001) !== -1 ? (<FaCheck className="ao-dropdown-menu-checked" />) : null}
            <span>{this.props.selectOptions[i].T020C007.T006C033 || this.props.selectOptions[i].T020C007.T006C002}</span>
          </li>);
        }
        if(i !== (this.props.selectOptions.length - 1)) {
          items.push(<li className="divider ao-accounts-groups-menu-dropdown-item-divider"></li>);
        }
      }
    }
    return items;
  }

  render() {
    return (<ul id="selectCols" className="dropdown-menu dropdown-menu-right crm-custom-dropdown" onClick={this.onColumnSelectionClick}>
      <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
      {this.renderItems()}
    </ul>);
  }

}

ColumnSelectionList.propTypes = {
  selectOptions       : React.PropTypes.array,
  controls            : React.PropTypes.object
};
