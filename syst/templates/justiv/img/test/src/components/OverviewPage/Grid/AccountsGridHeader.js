'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
  ACCOUNT_ASSIGNED_ID
} from '../../../constants';
import {CRM_PARAMS_PARAM_CODE, CRM_PARAMS_PARAM_NAME} from '../../../constants/db';
import {SORT_DIRECTION_ASC, SORT_DIRECTION_DESC} from '../../../constants/application';
import _bindAll from 'lodash/bindAll';
import _find from 'lodash/find';
import _each from 'lodash/each';
import SettingsButton from '../../Common/Buttons/SettingsButton/SettingsButton';
import pageControlHelpers from '../../../helpers/pageControlsHelpers/index';
import selectOptionHelpers from '../../../helpers/selectOption';
import ColumnSelectionList from './ColumnSelectionList.js';

// icons
import FaSort from 'react-icons/lib/fa/sort';
import FaSortAsc from 'react-icons/lib/fa/sort-asc';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCheck from 'react-icons/lib/fa/check';

export default class AccountsGridHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columnIndex: -1,
      currentDirection: null,
      directions: [SORT_DIRECTION_ASC, SORT_DIRECTION_DESC]
    };

    _bindAll(this, ['onTableHeaderClick', 'onColumnSelectionClick', 'updateSelectOption']);
  }

  componentWillMount() {
    if(this.props.sort) {
      let sort = this.props.sort || {};

      let index = -1;

      _each(this.props.selectOptions, selectOption => {
        if(selectOption.T020C007 && selectOption.T020C007.T006C001 === Number(sort.field)) {
          index = selectOption.T020C007.T006C001;
        }
      });

      let sortDirection = sort.direction || null;
      this.setState({currentDirection: sortDirection, columnIndex: index});
    }
  }

  renderActionsDropdown() {
    const {controls} = this.props;

    let actions = [];
    // TODO replace long conditions
    if(controls.selectAllListBox && controls.selectAllListBox.items && controls.selectAllListBox.items.length) {
      controls.selectAllListBox.items.map((item, index) => {
        if(pageControlHelpers.isControlEnabled(item)) {
          actions.push(<li data-action-code={item[CRM_PARAMS_PARAM_CODE]} className="ao-dropdown-menu-item">{item[CRM_PARAMS_PARAM_NAME]}</li>);
        }
      });
    }

    return (<ul className="dropdown-menu dropdown-menu-left" onClick={this.props.onActionsDropdownClick}>{actions}</ul>);
  }

  renderTableHeaders() {
    let items = [];
    let actualIndex = 0;

    _each(this.props.selectOptions, selectOption => {
      if(!selectOption.T020C005 || (selectOption.T020C002 !== (this.props.route.pageId + '_1'))) return;

      actualIndex++;
      if(selectOption.T020C007 && selectOption.T020C005) {
        items.push(<td data-t={selectOption.T020C007.T006C017} data-col={selectOption.T020C007.T006C018} key={selectOption.T020C007.T006C001} data-number={selectOption.T020C007.T006C001} data-key={accMap[selectOption.T020C007.T006C001]} style={{position: 'relative', cursor: 'pointer'}} className={accMap[selectOption.T020C007.T006C001] + (this.state.columnIndex === selectOption.T020C007.T006C001 ? ' ao-main-table-column-selected' : '')}>
          <div className="ellipsis">
            <h4 className="ellipsis-inline ao-main-table-header">{selectOption.T020C007.T006C002}</h4>
            {this.renderSortButton(selectOption.T020C007.T006C001)}
          </div>
        </td>);
      }
    });
    return items;
  }

  /**
   * Probably will need to move sort button to separate component
   * */
  renderSortButton(controlNumber) {
    if(this.state.columnIndex === controlNumber) {
      switch (this.state.currentDirection) {
        case SORT_DIRECTION_ASC:
          return (<FaSortAsc className="ao-table-sort-icon" />);
        case SORT_DIRECTION_DESC:
          return (<FaSortDesc className="ao-table-sort-icon" />);
        default:
          return (<FaSort className="ao-table-sort-icon" />);
      }
    }
    return (<FaSort className="ao-table-sort-icon" />);
  }

  onTableHeaderClick(e) {
    let target = e.target;

    while (target != e.currentTarget) {
      if (target.tagName === 'TD') {
        let i = 0;
        let data = target.dataset;
        let key = data.key;

        // ignore clicks on first and last columns
        if(target == target.parentNode.children[target.parentNode.children.length - 1] || target == target.parentNode.children[0]) {
          return;
        }
        while( (target = target.previousSibling) != null ) {
          i++;
        }
        let dirIndex = this.state.directions.indexOf(this.state.currentDirection);
        this.setState({
          columnIndex: Number(data.number),
          currentDirection: this.state.directions[dirIndex + 1] || this.state.directions[0]
        }, () => {
          const route = this.props.route;

          //if(this.props.accountsList.length === this.props.totalAmount) {
          //
          //  let control = _find(this.props.selectOptions, selectOption => {
          //    if(selectOption.T020C007) {
          //      return selectOption.T020C007.T006C001 === Number(data.number);
          //    }
          //  });
          //
          // this.props.actions.accounts.sortAccountList(this.props.accountsList, this.state.currentDirection, control.T020C007);
          //} else {
            this.props.actions.accounts.updateSearchQuery({
              sort: {
                field: data.number,
                direction: this.state.currentDirection
              }
            });
            this.props.actions.accounts.sortAccounts(this.props.session_id, data.number, this.state.currentDirection, route.accounts_api_route, route.account_search_selection, route.account_search_listbox);
          //}
        });
        return;
      }
      target = target.parentNode;
    }
  }

  /**
   * @param {Number} optionNumber
   * */
  updateSelectOption(optionNumber) {
    let selectOption = _find(this.props.selectOptions, {T020C001: optionNumber});

    // change visibility of control immediately, without waiting for server response
    selectOption.T020C005 = !selectOption.T020C005;

    let updatedOption = selectOptionHelpers.changeVisibility(selectOption);
    this.props.actions.selectOptions.modifySelectOption(this.props.session_id, [updatedOption]);
  }

  onColumnSelectionClick(e) {
    let target = e.target,
      label;

    while (target != e.currentTarget) {
      if (target.tagName === 'LI') {
        label = Number(target.dataset.label);
        if(label) {
          this.updateSelectOption(label);
        }
        return;
      }
      target = target.parentNode;
    }
  }

  render() {
    return (<thead onClick={this.onTableHeaderClick}>
    <tr>
      <td className="dropdown ao-main-table-first-column" data-noresize="true">
        <div className="clearfix first-column">
          <span className="nbr ao-main-table-header">{this.props.controls.allLabel}</span>
            <span data-tip={this.props.controls.actionsTooltip ? this.props.controls.actionsTooltip : null}>
                <input
                  className="ao-main-table-checkbox"
                  onClick={this.props.onAllCheckboxClick}
                  ref="overallCheckbox"
                  type="checkbox"
                  checked={this.props.isAllChecked()}
                  />
              </span>
              <span
                data-for={this.props.controls.actionsTooltip ? this.props.controls.actionsTooltip : null}
                data-tip={this.props.controls.actionsTooltip ? this.props.controls.actionsTooltip : null}
                className="dropdown-toggle"
                data-toggle="dropdown"
                >
                <FaCaretDown size={20} />
              </span>
              {this.props.controls.actionsTooltip ?
                (<ReactTooltip id={this.props.controls.actionsTooltip} place="bottom" class="tooltip" />) :
                null
              }
          {this.renderActionsDropdown()}
        </div>
      </td>
      {this.renderTableHeaders()}
      <td className="text-center ao-main-table-last-column ao-main-table-column-selection ao-main-table-border-off dropdown" id="columnsDropdown" data-noresize="true">
        <div className="js-ao-table-last-col-inner">
          <SettingsButton
            for={this.props.controls.columnsTooltip ? this.props.controls.columnsTooltip : null}
            tip={this.props.controls.columnsTooltip ? this.props.controls.columnsTooltip : null}
            size={26}
            className="settings-button-default"
            dropdown
            />
          {this.props.controls.columnsTooltip ?
            (<ReactTooltip id={this.props.controls.columnsTooltip} place="bottom" class="tooltip" />) :
            null
          }
          <ColumnSelectionList
            {...this.props}
            updateSelectOption={this.updateSelectOption}
            recalculateTableWidths={this.props.recalculateTableWidths}
            forceUpd={this.props.forceUpd}
            />
        </div>
      </td>
    </tr>
    </thead>);
  }

}

AccountsGridHeader.propTypes = {
  controls                : React.PropTypes.object.isRequired,
  selectOptions           : React.PropTypes.array.isRequired,
  accountsList            : React.PropTypes.array.isRequired,
  actions                 : React.PropTypes.object.isRequired,
  isAllChecked            : React.PropTypes.func.isRequired,
  session_id              : React.PropTypes.string.isRequired,
  onActionsDropdownClick  : React.PropTypes.func.isRequired,
  onAllCheckboxClick      : React.PropTypes.func.isRequired,
  recalculateTableWidths  : React.PropTypes.func.isRequired
};

// TODO make this dynamic
const accMap = {
  10101011: 'fullName',
  10101018: 'accountType',
  10101017: ACCOUNT_ASSIGNED_ID,
  10104114: 'email',
  10105115: 'city',
  10104112: 'phone_mobile',
  10101014: 'createdDate',
  10103111: 'assignedTo', // miss
  10103112: 'status'
};
