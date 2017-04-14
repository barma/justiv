'use strict';

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

// TODO make one modal component for save and cancel
const SaveAlert = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.hideModal}>
      <Modal.Body>
        <p>{props.savePopupMessage[0]}</p>
        <p>{props.savePopupMessage[1]}</p>
        <a href="#" onKeyDown={props.onSaveAccountPress} onClick={props.onSaveAccount} className="modal-body-button btn btn-default">{props.savePopupMessage[2]}</a>
        <a href="#" onKeyDown={props.hideModalPress} className="modal-body-button btn btn-cancel-btn" onClick={props.hideModal}>{props.savePopupMessage[3]}</a>
      </Modal.Body>
    </Modal>
  );

};

export default SaveAlert;
