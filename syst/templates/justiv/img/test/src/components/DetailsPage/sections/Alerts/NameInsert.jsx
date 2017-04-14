'use strict';

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const ErrorAlert = (props) => {

  return (
    <Modal show={props.showModal}>
      <Modal.Body>
        <p>{props.errorMessage[0]}</p>
        <Button onClick={props.hideAlert}>{props.errorMessage[1]}</Button>
      </Modal.Body>
    </Modal>
  );

};

export default ErrorAlert;
