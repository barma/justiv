'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import FaCheck from 'react-icons/lib/fa/check';
import FaPlus from 'react-icons/lib/fa/plus';
import GmRefresh from 'react-icons/lib/md/refresh';
import Sortable from 'sortablejs';

export default class DetailsSelectOptionMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sortableClass: 'js-sortable-item'
    };

    this.handleClickOnDocument = this.handleClickOnDocument.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMainMenuClick = this.handleMainMenuClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.onClickSubmenu = this.onClickSubmenu.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
  }

  componentDidMount() {
    // TODO do something with this...
    if(this.props.id) {
      $(document).on('click', this.handleClickOnDocument);
      $('#' + this.props.id).on('click', this.handleMainMenuClick);

      this.initSortableList();
    }
  }

  componentWillUnmount() {
    $(document).off('click', this.handleClickOnDocument);
    $('#' + this.props.id).off('click');
  }

  onClickSubmenu(e, $submenu) {
    if('closeSubmenu' in e.target.dataset) {
      this.hideSubmenu($submenu);
    } else {
      this.handleSubmenuClick(e);
    }
    e.stopPropagation();
  }

  initSortableList() {
    let el = findDOMNode(this.refs.sortableList);
    new Sortable(el, {
      draggable: '.js-sortable-item',
      onUpdate: this.changeSortOrder
    });
  }

  changeSortOrder(e) {
    this.props.changeSortOrder(e);
  }

  handleMainMenuClick(e) {
    let $submenu = $('#' + this.idForSubmenu);

    if(e.target.dataset) {
      if('close' in e.target.dataset) {
        this.hideSubmenu($submenu);
        return;
      }

      if(e.target.dataset.submenu) {
        this.showSubmenu($(e.target).find('.dropdown-menu'));
      }
    }


    if($submenu !== e.target && !$submenu.has(e.target).length) {
      this.handleClick(e);
    } else {
      return this.onClickSubmenu(e, $submenu);
    }
    e.stopPropagation();
  }

  handleClickOnDocument(e) {
    let $trigger = $('#' + this.props.id);
    if($trigger !== e.target && !$trigger.has(e.target).length) {
      $trigger.find('[data-toggle="dropdown"]').parent().removeClass('open');
      this.hideSubmenu($trigger.find('.dropdown-menu'));
    }
  }

  handleClick(e) {
    e.preventDefault();
    if(this.props.onClick) {
      this.props.onClick(e);
    }
  }

  handleSubmenuClick(e) {
    e.preventDefault();
    if(this.props.handleSubmenuClick) {
      this.props.handleSubmenuClick(e);
    }
  }

  // TODO replace these two methods to one switch
  hideSubmenu($submenu) {
    $submenu.css({display:'none'});
  }

  showSubmenu($submenu) {
    $submenu.css({display:'block'});
  }

  showCheckedOrLoadingIndicator(item) {
    //if(item.loading) {
    //  return <GmRefresh size={14} className="dropdown-menu-item-icon dropdown-menu-item-icon-checked rotating-spinner" />;
    //}
    if(item.T020C005) {
      return <FaCheck className="dropdown-menu-item-icon dropdown-menu-item-icon-checked" />;
    }
    return null;
  }

  renderDropdownItems() {
    let items = [];
    if(this.props.header) {
      items.push(<li className="dropdown-menu-header">{this.props.header}</li>);
    }
    this.props.items.map((item, index) => {

      items.push(<li key={item.T020C007.T006C001} data-control-id={item.T020C007.T006C001} data-id={item.T020C001} className={this.state.sortableClass + " dropdown-menu-item"} data-code={item.T020C002} data-label={item.T020C007.T006C033}>

        {this.showCheckedOrLoadingIndicator(item)}
        <span className="dropdown-menu-item-label">{item.T020C007.T006C033}</span>
        {item.T020C003 && <FaPlus className="dropdown-menu-item-icon dropdown-menu-item-icon-add" />}

      </li>);

      if(index === (this.props.items.length - 1)) {
        items.push(<li className="divider dropdown-menu-item-divider"></li>);
      }
    });
    return items;
  }

  get idForSubmenu() {
    return this.props.id + '_sub';
  }

  renderSubmenu() {
    if(this.props.footer.submenu && this.props.footer.submenu.items) {
      let items = [];
      items.push(<li className="bold-txt">{this.props.footer.submenu.label}</li>);
      this.props.footer.submenu.items.map(item => {
        items.push(<li data-code={item.T001C003} data-parameter={item.T001C017} data-category={item.T001C016}>{item.T001C005}</li>);
      });

      return (<ul onClick={this.handleSubmenuClick} id={this.idForSubmenu || null} className="dropdown-menu crm-custom-dropdown-submenu" >
        <span data-close-submenu="true" className="crm-custom-dropdown-close">&times;</span>{items}
      </ul>);
    }
  }

  render() {
    return (
      <ul ref="sortableList" className="dropdown-menu crm-custom-dropdown crm-custom-dropdown-off" id={this.props.id || null}>
        <span data-close="true" className="crm-custom-dropdown-close">&times;</span>
        {this.renderDropdownItems()}
        {this.props.footer ? <li className="dropdown dropdown-submenu"><span data-submenu="true" className="dropdown-toggle" data-toggle="dropdown">
          {this.props.footer.label}
          {this.renderSubmenu()}
        </span></li> : null}
      </ul>
    );
  }

}

DetailsSelectOptionMenu.propTypes = {
  items               : React.PropTypes.string,
  header              : React.PropTypes.string,
  footer              : React.PropTypes.object,
  id                  : React.PropTypes.string,
  onClick             : React.PropTypes.func,
  handleSubmenuClick  : React.PropTypes.func
};
