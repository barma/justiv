'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import _bindAll from 'lodash/bindAll';

export default class Textarea extends React.Component {

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

    let textarea = findDOMNode(this);
    textarea.addEventListener('keydown', this.autoresizeTextarea);
    this.autoresizeTextarea.call(textarea);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultValue(nextProps);
  }

  componentWillUnmount() {
    let textarea = findDOMNode(this);
    textarea.removeEventListener('keydown', this.autoresizeTextarea);
  }

  autoresizeTextarea() {
    let el = this;
    setTimeout(() => {

      el.style = {
        'height': 0,
        'overflow': 'hidden'
      };

      el.style.height = (el.scrollHeight + 20) + 'px';
    }, 0);

    //.style.overflow = 'hidden';
    //el.style.height = 0;
    //el.style.height = el.scrollHeight + 'px';
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
    if(this.props.onBlur) {
      this.props.onBlur(e.currentTarget.dataset.table, e.currentTarget.dataset.column, e.currentTarget.value)
    }
  }

  render() {
    return(
      <textarea
        {...this.props}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        />
    );

  }

}

Textarea.propTypes = {
  onChangeAccountInfo: React.PropTypes.func
};
