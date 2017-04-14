'use strict';

import React from 'react';
import { Link } from 'react-router';
import {MORE_ITEMS_BUTTON_ID} from '../../../constants/temp.js';
import NavDropdownMenuItem from './DropdownMenu/DropdownMenuContainer.jsx';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

export default class NavigationItem extends React.Component {

  showDropdownList() {
    if(this.props.item.children && this.props.item.children.length) {

        let list = [];
        for(let i = 0; i < this.props.item.children.length; i++) {
          list.push(<NavDropdownMenuItem key={this.props.item.children[i].id} id={this.props.item.children[i].id} label={this.props.item.children[i].label} />);
        }
        return (<ul className="dropdown-menu dropdown-user">{list}</ul>);
    }
    return (<ul className="dropdown-menu dropdown-user">
      <NavDropdownMenuItem label="" />
    </ul>);
  }

  /**
   * Show dropdown icons only for specific menu items
   * */
  showDropdownArrow() {
    if(this.props.item.dropdown) {
      return (<span><FaCaretDown /></span>);
    }
  }

  showNavigationItem() {
    if(this.props.item.originalLabel) {
      if(!this.props.isAuthenticated) {
        return (<div className="navbar-top-links-label navbar-top-links-label--inactive">
          <span className="navbar-top-links-hover">{this.props.item.label}</span>
          <span className="navbar-top-links-hover">{this.showDropdownArrow()}</span>
          {this.showDropdownList()}
        </div>);
      }
      return (<Link activeClassName="navbar-top-links-active" className="navbar-top-links-label" to={'/' + this.props.item.originalLabel.toLowerCase()}>
        <span className="navbar-top-links-hover">{this.props.item.label}</span>
        <span className="navbar-top-links-hover dropdown-toggle" data-toggle="dropdown">{this.showDropdownArrow()}</span>
        {this.showDropdownList()}
      </Link>);
    }
    if(!this.props.isAuthenticated) {
      return (<div className="navbar-top-links-label" data-toggle="dropdown" href="#">
        {this.props.item.label} {this.showDropdownArrow()}
        {this.showDropdownList()}
      </div>);
    }
    if(this.props.item.id === MORE_ITEMS_BUTTON_ID) {
      return (<Link to="/accounts/new" className="navbar-top-links-label dropdown-toggle">
        {this.props.item.label} {this.showDropdownArrow()}
        {this.showDropdownList()}
      </Link>);
    }
    return (<a className="navbar-top-links-label dropdown-toggle" data-toggle="dropdown" href="#">
      {this.props.item.label} {this.showDropdownArrow()}
      {this.showDropdownList()}
    </a>);
  }

  render() {
    return(
      <li className="dropdown">
        {this.showNavigationItem()}
      </li>
    );
  }

}

NavigationItem.propTypes = {
  isAuthenticated     : React.PropTypes.bool.isRequired,
  item                : React.PropTypes.object.isRequired
};
