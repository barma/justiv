'use strict';

import React from 'react';
import AvatarUpload from '../../Common/Forms/AvatarUpload.js';

const AccountDetailsHeaderLine = (props) => {
  return (<div className="user-details-header-top">
    <div className="center-cont full-height ">
      <div className="user-details-column-left col-xs-12 col-sm-8 full-height clearfix">
        <div className="user-details-column-left-fixed full-height"></div>
        <div className="clearfix">
          <AvatarUpload saveImage={props.saveUserImage} onError={props.setErrorMessage} removeAvatar={props.removeAvatar} image={props.userImage} />
          <div className="pull-left">
            <h4 className="account-details-header-name">{props.account.fullName}</h4>
          </div>
          <span className="ubh-links">
            <a href="#" onClick={props.onCancelBtnClick}>{props.controls.cancelBtn}</a>
            |
            <a href="#" onClick={props.onSaveBtnClick}>{props.controls.saveBtn}</a>
          </span>
        </div>
      </div>
      <div className="user-details-column-right col-xs-12 col-sm-4">
        <div className="account-details-header-info-wrapper text-right">
          <p className="account-details-header-info-row">{props.controls.labelAccountCreated}: {props.accountCreatedDate}</p>
          <p className="account-details-header-info-row">{props.controls.labelCreatedBy}: {props.accountCreatedBy}</p>
        </div>
      </div>
    </div>
  </div>);
};

export default AccountDetailsHeaderLine;
