'use strict';

import React from 'react';

const HomePage = (props) => {
  return (<div className="container">
    <h1>Main Page</h1>
    {props.loginButton}
  </div>);
};

export default HomePage;
