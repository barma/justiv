'use strict';

import React from 'react';
import {BIRTH_DATE_PATTERN} from '../../../constants/application';
import timeHelpers from '../../../helpers/timeHelpers';

export default class BirthDateInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.setBirthDate = this.setBirthDate.bind(this);
  }

  componentDidMount() {
    this.setBirthDate();
  }

  componentWillReceiveProps(nextProps) {
    this.setBirthDate(nextProps);
  }

  setBirthDate(props = this.props) {
    if(props.existingValue) {
      let formattedTime = timeHelpers.formatTime(props.existingValue, BIRTH_DATE_PATTERN);
      this.setState({value: formattedTime});
    }
  }

  onBlur(e) {
    let newVal = timeHelpers.formatBirthDate(e.currentTarget.value);
    this.setState({value: newVal});

    if(this.props.onBlur) {
      this.props.onBlur(this.props.table, this.props.column, newVal);
    }
  }

  onChange(e) {
    this.setState({value: e.currentTarget.value});
  }

  render() {

    return(
      <input
        placeholder={BIRTH_DATE_PATTERN}
        onBlur={this.onBlur}
        onChange={this.onChange}
        type="text"
        value={this.state.value}
        />
    );

  }

}

BirthDateInput.propTypes = {
  onSetAccountBirthDate      : React.PropTypes.func,
  field                      : React.PropTypes.string,
  existingValue              : React.PropTypes.number
};
