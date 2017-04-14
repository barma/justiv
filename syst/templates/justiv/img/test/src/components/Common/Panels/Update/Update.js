'use strict';

import React from 'react';
import UpdateDropdowns from './UpdateDropdowns';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import _filter from 'lodash/filter';
import _each from 'lodash/each';
import { Link } from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

export default class UpdatePanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownCount: 1,
      maxRows: 3,
      minRows: 1
    };

    this.handlePlusBtnClick = this.handlePlusBtnClick.bind(this);
    this.handleMinusBtnClick = this.handleMinusBtnClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  componentDidMount() {

  }

  showUpdateDropdowns() {
    let dropdowns = [];

    for(let i = 0; i < this.state.dropdownCount; i++) {
      dropdowns.push(<UpdateDropdowns menuItems={this.props.menuItems} />);
    }

    return dropdowns;
  }

  handlePlusBtnClick() {
    if(this.state.dropdownCount < this.state.maxRows) {
      this.setState({dropdownCount: this.state.dropdownCount + 1});
    }
  }

  handleMinusBtnClick() {
    if(this.state.dropdownCount > this.state.minRows) {
      this.setState({dropdownCount: this.state.dropdownCount - 1});
    }
  }

  handleCancelClick() {
    this.setState({dropdownCount: this.state.minRows});
  }

  render() {
    return(
      <Row className="update-panel-container">

        <div className="update-panel-header-wrapper">
          <h4 className="update-panel-header">Update</h4>
        </div>

        <Col xs={12} sm={6} md={7}>
          <Clearfix>
            <div className="pull-left">
              {this.showUpdateDropdowns()}
            </div>
            <div className="pull-left">
              <span onClick={this.handleMinusBtnClick} className="update-panel-btn-container">
                <FaMinus />
              </span>
              {this.state.dropdownCount < this.state.maxRows ?
                (<span onClick={this.handlePlusBtnClick} className="update-panel-btn-container">
                  <FaPlus />
                </span>) :
                null}
            </div>
          </Clearfix>
        </Col>

        <Col xs={12} sm={3} md={3} className="ao-top-bar-right">
          <Clearfix>
            <div className="pull-right">
              <Button bsStyle="link" onClick={this.handleCancelClick}>Cancel</Button>
              <Button bsStyle="primary">Update</Button>
            </div>
          </Clearfix>
        </Col>

      </Row>
    );
  }

}
