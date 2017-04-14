'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import localeHelpers from '../../../../helpers/localesHelpers';
import userHelpers from '../../../../helpers/user';

// actions
import * as localeActions from '../../../../actions/localeActions';

import _isEmpty from 'lodash/isEmpty';
import _each from 'lodash/each';
import _findKey from 'lodash/findKey';

class LocaleSelectionMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      localeSet: false
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    this.props.actions.localeActions.localesListRequest();
  }

  onSelectChange(e) {
    let data = e.target.dataset;
    this.props.actions.localeActions.changeLocale(data.id);
    // TODO fix this force update
    this.forceUpdate();
  }

  getSelectedLocale() {
    const {user, locales} = this.props;

    if(user && !_isEmpty(user) && !this.state.localeSet && !_isEmpty(locales)) {
      this.setState({localeSet: true});
      localeHelpers.setActiveLocale(locales, Number(userHelpers.getUserLocaleId(user)));
      return user.T012C005.T004C002;
    }

    return _findKey(locales, {default: true});
  }

  renderLocaleOptions() {
    let locales = [];
    _each(this.props.locales, (locale, key) => {
      locales.push(<li key={locale.id} data-id={locale.id} className="locale-selection-item" onClick={this.onSelectChange}>{key}</li>);
    });
    return locales;
  }

  render() {
    return (
      <div className="locale-selection-menu text-right dropdown">
        <span className="dropdown-toggle" data-toggle="dropdown">
          {this.getSelectedLocale()}
          <FaCaretDown size={24} />
        </span>
        <ul className="dropdown-menu">
          {this.renderLocaleOptions()}
        </ul>
      </div>
    );
  }

}

LocaleSelectionMenu.propTypes = {
  actions   : React.PropTypes.object.isRequired,
  user      : React.PropTypes.object.isRequired,
  locales   : React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    locales: state.pageControls.locales,
    user:    state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      localeActions: bindActionCreators(localeActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelectionMenu);
