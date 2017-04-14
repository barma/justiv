'use strict';

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const CancelAlert = (props) => {

  return (
    <Modal show={props.showModal} onHide={props.hideCancelAlert}>
      <Modal.Body>
        <p>{props.cancelPopupMessage[0]}</p>
        <p>{props.cancelPopupMessage[1]}</p>
        <a href="#" onKeyDown={props.onReturnToAccountsPress} className="modal-body-button btn btn-default" onClick={props.onReturnToAccounts}>{props.cancelPopupMessage[2]}</a>
        <a href="#" onKeyDown={props.hideCancelAlertPress} className="modal-body-button btn btn-cancel-btn" onClick={props.hideCancelAlert}>{props.cancelPopupMessage[3]}</a>
      </Modal.Body>
    </Modal>
  );

};

export default CancelAlert;
