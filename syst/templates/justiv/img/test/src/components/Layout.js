'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageControlsActions from '../actions/pageControlsActions';
import * as globalParamsActions from '../actions/globalParamsActions';
import Header from './Common/Header/HeaderContainer';
import localeHelpers from '../helpers/localesHelpers';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLocaleReceived: false
    };
  }

  componentWillMount() {
    let localeId = !this.props.isAuthenticated ? localeHelpers.getActiveLocaleId(this.props.locales) : null;
    let sessionId = this.props.isAuthenticated ? this.props.session_id : null;

    const {globalParams, pageControls} = this.props.actions;

    Promise.all([
      globalParams.getGlobalParams({sessionId}),
      pageControls.loadPageControls(this.props.route.pageId, localeId, sessionId)
    ])
      .then(() => {
        this.setState({isLocaleReceived: true});
      });
  }

  render () {
    if(!this.state.isLocaleReceived) return (<div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#e6e6e6'}}>
      <FaCircleONotch size={42} className="centered-spinner rotating-spinner" />
    </div>);

    return (
      <div>
        <Header
          logoLabel={this.props.logoLabel}
          menuItems={this.props.menuItems}
          isAuthenticated={this.props.isAuthenticated}
          />
        {React.cloneElement(this.props.children, { isAuthenticated: this.props.isAuthenticated })}
      </div>
    );
  }

}

Layout.propTypes = {
  children          : PropTypes.object.isRequired,
  route             : PropTypes.object.isRequired,
  actions           : React.PropTypes.object.isRequired,
  locales           : React.PropTypes.object.isRequired,
  logoLabel         : React.PropTypes.string.isRequired,
  menuItems         : React.PropTypes.array.isRequired,
  isAuthenticated   : React.PropTypes.bool.isRequired,
  session_id        : React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    locales: state.pageControls.locales,
    logoLabel: state.pageControls.header.logo.label,
    menuItems: state.pageControls.header.menuItems,
    isAuthenticated: state.auth.isAuthenticated,
    session_id: state.auth.session_id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      pageControls: bindActionCreators(pageControlsActions, dispatch),
      globalParams: bindActionCreators(globalParamsActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
