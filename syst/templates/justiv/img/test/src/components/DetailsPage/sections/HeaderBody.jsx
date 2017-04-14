'use strict';

import React from 'react';

import {ACCOUNT_ASSIGNED_ID} from '../../../constants/db';
import AccountValueRating from '../../Common/Ratings/AccountValueRating';
import DropdownBox from '../../Common/Menus/DropdownBox/DropdownBox.js';
import BlackListedSelect from './BlackListedSelect.js';

const DetailsHeaderBody = (props) => {
  return (<div className="user-details-header-body clearfix">
    <div className="">
      <div className="width-perc-70 full-height clearfix col-sm-12">

        <div className="clearfix user-details-header-body-inner col-sm-12">
        <span className="pd-acc-id">{props.controls.labelAccountId} {props.account[ACCOUNT_ASSIGNED_ID]}
          <span className="pd-acc-type">{props.controls.accountType && props.controls.accountType.label}
            {props.isNewAccount ?
              (<span className="pd-acc-type-box">
                <DropdownBox items={props.accountTypes} defaultSelection={props.defaultAccountType} onChangeType={props.onChangeType} />
              </span>) :
              <span className="pd-acc-type-box cu">{props.currentAccountType}</span>
            }
          </span>
        </span>
        <span className="pd-acc-id">{props.controls.labelValueRating}
          <AccountValueRating
            updateAccountRate={props.updateAccountRate}
            valueRate={props.valueRate}
            className={"pad-left-15"}
          />
          {props.valueRate > 0 ? (<a href="#" className="value-unset-btn" onKeyDown={props.unsetValueRate} onClick={props.unsetValueRate}>Unset</a>) : null}
          <span className="pd-acc-type span-r">
            <BlackListedSelect menuRole setBlacklisted={props.setBlacklisted} isBlacklisted={props.isBlacklisted} items={props.getListFlags} />
          </span>
        </span>
        </div>
      </div>
    </div>
  </div>);
};

export default DetailsHeaderBody;
