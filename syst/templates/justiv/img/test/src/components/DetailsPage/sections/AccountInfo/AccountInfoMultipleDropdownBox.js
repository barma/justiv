'use strict';

import React from 'react';
import commonHelpers from '../../../../helpers/commonHelpers';
import {USER_ID, USER_NAME} from '../../../../constants/db';
import userHelpers from '../../../../helpers/user';
import FaCheck from 'react-icons/lib/fa/check';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import _indexOf from 'lodash/indexOf';
import _each from 'lodash/each';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _map from 'lodash/map';
import _pick from 'lodash/pick';

export default class AccountInfoMultipleDropdownBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let dataset = e.currentTarget.dataset;

    let user = userHelpers.findById(this.props.items, dataset.userId);
    let updatedState = commonHelpers.pushOrRemoveItem(this.state.selectedItems, user);
    this.setState({selectedItems: updatedState}, () => {
      this.props.onSetInfo(this.state.selectedItems);
    });
  }

  renderDropdownItems() {
    let items = [];

    this.props.items.map((item, index) => {

      let isSelected = _indexOf(this.state.selectedItems, item) !== -1;

      items.push(<li
        className={"dropdown-menu-item" + (isSelected ? ' ao-dropdown-menu-item--selected' : '')}
        data-label={item[USER_NAME]}
        data-user-id={item[USER_ID]}
        onClick={this.handleClick}
        >
        <a href="#">{item[USER_NAME]}</a>
      </li>);

      if(index !== (this.props.items.length - 1)) {
        items.push(<li className="divider dropdown-menu-item-divider"></li>);
      }
    });
    return items;
  }

  findAssigned(nextProps) {
    let props = nextProps || this.props;

    let founded = [];
    _each(props.assignedTo, account => {
      let found = _find(props.items, item => account.T120C003[USER_ID] === item[USER_ID]);
      if(found) founded.push(found);
    });
    if(founded.length) {
      this.setState({selectedItems: founded});
    }
  }

  componentWillMount() {
    this.findAssigned();
  }

  componentDidMount() {
    this.findAssigned();

    $(document).on('click', this.handleClickOnDocument);

    // TODO do something with this...
    $('#assignedToDropdown').on('click', (e) => {
      if(e.target.tagName === 'A') {
        $(e.target).parent().click();
      }
      e.stopPropagation();
    });
  }

  handleClickOnDocument(e) {
    let $trigger = $('#assignedToDropdown');
    if($trigger !== e.target && !$trigger.has(e.target).length){
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.findAssigned(nextProps);
  }

  componentWillUnmount() {
    $('#assignedToDropdown').off('click');
    $(document).off('click', this.handleClickOnDocument);
  }

  renderSelected() {
    return _map(this.state.selectedItems, USER_NAME).join();
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropdown-toggle ad-dropdownbox-selection-label text-left" data-toggle="dropdown">
          <div className="dropdown-toggle ad-dropdownbox-selection-label-overflow">
            {this.renderSelected()}
            <span>
              <FaCaretDown size="20" className="ad-dropdownbox-selection-icon" />
            </span>
          </div>
        </button>
        <ul id="assignedToDropdown" className="dropdown-menu dropdown-menu-right ad-dropdownbox-selection-menu" role="menu">
          {this.renderDropdownItems()}
        </ul>
      </div>
    );
  }

}

AccountInfoMultipleDropdownBox.propTypes = {
  items       : React.PropTypes.string,
  header      : React.PropTypes.string,
  onSetInfo   : React.PropTypes.func
};
