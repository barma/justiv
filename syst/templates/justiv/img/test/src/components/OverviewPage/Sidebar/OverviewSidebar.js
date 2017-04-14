'use strict';

import React from 'react';
import SettingsButton from '../../Common/Buttons/SettingsButton/SettingsButton';

import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaPlus from 'react-icons/lib/fa/plus';

export default class OverviewSidebar extends React.Component {

  render() {
    return (<div style={{display: this.props.isSidebarHidden ? 'none' : 'block'}} className="col-xs-12 col-sm-4 sidebar-account">
      <div className="account-table">
        <div className="sidebar-account-menu">
          <ul className="sam-ul">
            <li className="active-li">
              <a href="#">Online Track</a>
            </li>
            <li>
              <a href="#">Tasks</a>
            </li>
            <li>
              <a href="#">History</a>
            </li>
          </ul>
          <div className="sam1">
            <select>
              <option>--all--</option>
              <option></option>
            </select>
          </div>
          <div className="sam2 d-none">
            <select>
              <option>--all--</option>
              <option></option>
            </select>
          </div>
          <div className="sam3 d-none">
            <select>
              <option>--all--</option>
              <option></option>
            </select>
          </div>
        </div>
        <table className="ao-table ao-table-sidebar table-striped">
          <thead>
          <tr>
            <td>
              <span className="nbr">All</span>
            <span>
              <input type="checkbox" />
            </span>
            <span className="drowpdown-toggle" data-toggle="dropdown">
              <FaCaretDown size={20} />
            </span>
            </td>
            <td>
              <a href="#" className="a-filter-off">
                Date<i className="fa fa-caret-down" aria-hidden="true"></i><i className="fa fa-caret-up" aria-hidden="true"></i></a>
            </td>
            <td>
              <a href="#" className="a-filter-off">
                Status<i className="fa fa-caret-down" aria-hidden="true"></i><i className="fa fa-caret-up" aria-hidden="true"></i></a>
            </td>
            <td>
              <SettingsButton size={26} className="settings-button-default" />
            </td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span className="nbr">1</span>
            <span>
              <input type="checkbox" />
            </span>
            <span>
              <FaPlus />
            </span>
            </td>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td>
              <span className="nbr">2</span>
            <span>
              <input type="checkbox" />
            </span>
            <span>
              <FaPlus />
            </span>
            </td>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td>
              <span className="nbr">3</span>
            <span>
              <input type="checkbox" />
            </span>
            <span>
              <FaPlus />
            </span>
            </td>
            <td colSpan="3"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>);
  }

}

OverviewSidebar.propTypes = {
  isSidebarHidden : React.PropTypes.bool.isRequired
};
