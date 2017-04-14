'use strict';

import React from 'react';

import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaPlus from 'react-icons/lib/fa/plus';

const DetailsSidebar = (props) => {

  return (<div style={{display: 'block'}} className="col-xs-12 col-sm-4 sidebar-account">
    <div className="account-table">
      <table className="ao-table ao-table-sidebar table-striped">
        <thead>
        <tr>
          <td>
            <div className="text-center">
              <span className="nbr">Activities</span>
            </div>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <span className="nbr">Notes(3)</span>
            <span className="pull-right">
              <FaPlus />
              <FaCaretDown />
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span className="nbr">Tasks(1)</span>
            <span className="pull-right">
              <FaPlus />
              <FaCaretDown />
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span className="nbr">Calls(0)</span>
            <span className="pull-right">
              <FaPlus />
              <FaCaretDown />
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span className="nbr">Account updated(0)</span>
            <span className="pull-right">
              <FaPlus />
              <FaCaretDown />
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span className="nbr">Content right(0)</span>
            <span className="pull-right">
              <FaPlus />
              <FaCaretDown />
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>);

};

export default DetailsSidebar;
