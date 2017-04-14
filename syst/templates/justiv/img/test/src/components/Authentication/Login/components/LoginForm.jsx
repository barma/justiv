'use strict';

import React from 'react';
import { Link } from 'react-router';
import FaSpinner from 'react-icons/lib/fa/spinner';

const LoginForm = (props) => {
  const {controls} = props;

  return (<form onSubmit={props.login} >
	<h1>{ controls.headerLabel }</h1>
    <p>{ controls.headerLine }</p>
    <div className="inp-box">
      <div>
        <label>{ controls.usernameLabel }</label>
        <input type="text" className="form-control" placeholder={ controls.txtboxUsername } name="username" required="" />
      </div>
      <br />
      <div>
        <label>{ controls.passwordLabel }</label>
        <input type="password" className="form-control" placeholder={ controls.txtboxPassword } name="password" required="" />
      </div>
    </div>
    {props.children}
    <div>
      <button type="submit" className="btn btn-primary submit">
        {props.isFetching ? (<FaSpinner size={22} className="centered-spinner rotating-spinner" />) : null }
        <span className={props.isFetching ? 'invisible' : null}>{ controls.logInButton }</span>
      </button>
      <span className="chbx-line">
        <input type="checkbox" name="keepLoggedIn" onChange={props.onKeepLoggedInChange} />
        <p>{ controls.labelKeepMeLoggedIn }</p>
      </span>
      <Link className="blue-color" to="login/reset-password">{ controls.lnUnableAccessAccount }</Link>
      <p>{ controls.labelAdminRequest }</p>
    </div>
    <div>
      <span className="login-privacy-policy">
        <p>{ controls.labelForPolicy }&nbsp;
            <Link className="blue-color" to="privacy-policy">{ controls.lnPolicy }</Link>
        </p>
      </span>
    </div>
    <div className="clearfix"></div>
  </form>);
};

LoginForm.propTypes = {
  isFetching        : React.PropTypes.bool.isRequired,
  controls          : React.PropTypes.object.isRequired,
  children          : React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default LoginForm;
