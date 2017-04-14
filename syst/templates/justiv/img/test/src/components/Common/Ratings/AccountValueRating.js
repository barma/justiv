'use strict';

import React from 'react';
import ReactRating from 'react-rating';
import FaStar from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';

export default class AccountValueRating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fractions: 1,
      rating: props.valueRate
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rating: nextProps.valueRate});
  }

  emptyRatingSign() {
    return (<FaStarO />);
  }

  fullRatingSign() {
    return (<FaStar />);
  }

  handleClick(rate) {
    this.props.updateAccountRate(rate);
    this.setState({rating: rate});
    this.forceUpdate();
  }

  render() {
    return(
      <ReactRating
        initialRate={this.state.rating}
        fractions={this.state.fractions}
        stop={this.props.amount}
        readonly={this.props.readonly}
        empty={this.emptyRatingSign()}
        full={this.fullRatingSign()}
        className={this.props.className}
        onClick={this.handleClick}
        />
    );
  }

}

AccountValueRating.propTypes = {
  valueRate   : React.PropTypes.number,
  amount      : React.PropTypes.number,
  readonly    : React.PropTypes.bool,
  className   : React.PropTypes.string
};
