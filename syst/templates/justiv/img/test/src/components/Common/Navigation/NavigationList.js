'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {MORE_ITEMS_BUTTON_ID} from '../../../constants/temp';
import NavigationItem from './NavigationItem.js';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import AccountImageItem from './AccountImageItem.jsx';
import { Link } from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus';

export default class NavigationList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalSpace: 0,
      numberOfItems: 0,
      breakWidths: []
    };
  }

  componentDidMount() {
    let ul = findDOMNode(this);
    let totalSpace = 0,
        breakWidths = [];

    let listItems = _filter(ul.getElementsByTagName('li'), li => li.parentNode === ul);
    _each(listItems, li => {
      totalSpace += li.clientWidth;
      breakWidths.push(totalSpace);
    });

    this.setState({
      numberOfItems: listItems.length - 1,
      totalSpace,
      breakWidths
    });

    this.check();
  }

  check() {
    let ul = findDOMNode(this);
  }

  renderNavigationItems() {
    let items = [];
    let moreItemsBtn;

    this.props.menuItems.map(menuItem => {
      if(menuItem.id !== MORE_ITEMS_BUTTON_ID) {
        items.push(<NavigationItem key={menuItem.id} isAuthenticated={this.props.isAuthenticated} item={menuItem} />);
      } else {
        moreItemsBtn = menuItem;
      }
    });

    // TODO rework with react-router
    let accountType = window.location.pathname;
    accountType = accountType.split('/');

    if(this.props.isAuthenticated) {
      items.push(<li className="dropdown">
        <AccountImageItem />
        <Link to={'/' + accountType[1] + '/new'} className="navbar-top-links-label navbar-plus-button dropdown-toggle">
          <FaPlus size={20} />
        </Link>
      </li>);
    }
    return items;
  }

  render() {
    return(
      <ul className="nav navbar-nav navbar-top-links navbar-primary">
        {this.renderNavigationItems()}
      </ul>
    );
  }

}

NavigationList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

NavigationList.propTypes = {
  menuItems         : React.PropTypes.array.isRequired,
  isAuthenticated   : React.PropTypes.bool.isRequired
};
