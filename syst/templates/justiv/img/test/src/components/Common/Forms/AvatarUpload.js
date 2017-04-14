'use strict';

import React from 'react';
import FaTimes from 'react-icons/lib/fa/close';
import {isEnterBtn} from '../../../helpers/uiHelpers';

export default class AvatarUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultAvatar: "../../../../../images/avatar.jpg",
      image_width: 95,
      image_height: 95
    };

    this.handleClick      = this.handleClick.bind(this);
    this.handleOnChange   = this.handleOnChange.bind(this);
    this.removeAvatar     = this.removeAvatar.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.removeAvatarPress= this.removeAvatarPress.bind(this);
  }

  handleClick(e) {
    this.refs.inputFile.click();
  }

  removeAvatar() {
    if(this.props.removeAvatar) {
      this.props.removeAvatar();
    }
  }

  handleOnChange(e) {
    let reader = new FileReader();
    let imageEl = this.refs.imageElement;

   if(e.currentTarget.files[0].size > 100000) {
     if(this.props.onError) {
       return this.props.onError('Max 100Kb file size allowed | Ok');
     }
    }

    reader.onload = (e) => {
      imageEl.src = e.target.result;
      imageEl.width = this.state.image_width;
      imageEl.height = this.state.image_height;

      this.props.saveImage(window.btoa(e.target.result));
    };

    reader.readAsDataURL(e.currentTarget.files[0]);
  }

  handleEnterPress(e) {
    if(isEnterBtn(e.keyCode)) {
      e.preventDefault();
      this.refs.inputFile.click();
    }
  }

  removeAvatarPress(e) {
    if(isEnterBtn(e.keyCode)) {
      e.preventDefault();
      if(this.props.removeAvatar) {
        this.props.removeAvatar();
      }
    }
  }

  render() {

    return(
      <div className="user-details-column-left-fixed full-height">
        <a href="#" className="pd-avatar" onKeyDown={this.handleEnterPress}>
          <img
            onClick={this.handleClick}
            ref="imageElement"
            width={this.state.image_width}
            height={this.state.image_height}
            src={this.props.image || require("../../../images/avatar.jpg")}
            />

          <input onChange={this.handleOnChange} type="file" style={{display: 'none'}} ref="inputFile" accept="image/*" />

        </a>
        {this.props.image ?
          (<a href="#" onKeyDown={this.removeAvatarPress} className="pd-avatar-remove" title="remove avatar" onClick={this.removeAvatar}>
            <FaTimes size={25} />
          </a>) :
          null
        }
      </div>
    );
  }

}
