'use strict';

import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import FaPlus from 'react-icons/lib/fa/plus';

export default class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickOnDocument = this.handleClickOnDocument.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMainMenuClick = this.handleMainMenuClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.onClickSubmenu = this.onClickSubmenu.bind(this);
  }

  componentDidMount() {
    // TODO do something with this...
    if(this.props.id) {
      $(document).on('click', this.handleClickOnDocument);
      $('#' + this.props.id).on('click', this.handleMainMenuClick);
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

  handleMainMenuClick(e) {
    let $submenu = $('#' + this.idForSubmenu);

    if('close' in e.target.dataset) {
      this.hideSubmenu($submenu);
      return;
    }

    if(e.target.dataset.submenu) {
      this.showSubmenu($(e.target).find('.dropdown-menu'));
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

  renderDropdownItems() {
    let items = [];
    if(this.props.header) {
      items.push(<li className="dropdown-menu-header">{this.props.header}</li>);
    }
    this.props.items.map((item, index) => {

      items.push(<li key={item.id} className="dropdown-menu-item" data-label={item.label}>

        {item.display && <FaCheck className="dropdown-menu-item-icon dropdown-menu-item-icon-checked" />}
        <span className="dropdown-menu-item-label">{item.label}</span>
        {item.allowAddNew && <FaPlus className="dropdown-menu-item-icon dropdown-menu-item-icon-add" />}

      </li>);

      if(index !== (this.props.items.length - 1)) {
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
      items.push(<li>{this.props.footer.submenu.label}</li>);
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
      <ul onClick={this.handleClick} className="dropdown-menu crm-custom-dropdown crm-custom-dropdown-off" id={this.props.id || null}>
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

DropdownMenu.propTypes = {
  items               : React.PropTypes.string,
  header              : React.PropTypes.string,
  footer              : React.PropTypes.object,
  id                  : React.PropTypes.string,
  onClick             : React.PropTypes.func,
  handleSubmenuClick  : React.PropTypes.func
};
