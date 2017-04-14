'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import _bindAll from 'lodash/bindAll';

export default class TextInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isValueSet: false
    };

    _bindAll(this, ['handleChange', 'setDefaultValue', 'handleBlur']);
  }

  componentDidMount() {
    this.setDefaultValue();
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultValue(nextProps);
  }

  setDefaultValue(props = this.props) {
    if(props.value && !this.state.isValueSet) {
      this.setState({value: props.value, isValueSet: true});
    }
  }

  handleChange(e) {
    this.setState({value: e.currentTarget.value});
  }

  handleBlur(e) {
    let params;
    if(this.props.params && this.props.params.length) {
      params = Object.assign({}, this.props.params[0]);
    }
    if(e.currentTarget.dataset.addressTypeNumber >= 0) {
      params = {_addressTypeNumber: e.currentTarget.dataset.addressTypeNumber};
    }

    if(this.props.onBlur) {
      this.props.onBlur(e.currentTarget.dataset.table, e.currentTarget.dataset.column, e.currentTarget.value, params);
    }
  }

  render() {
    return(
      <input
        {...this.props}
        style={this.props.style}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        />
    );

  }

}

TextInput.propTypes = {
  onChangeAccountInfo: React.PropTypes.func,
  params: React.PropTypes.array,
  onBlur: React.PropTypes.func
};
