import React from 'react';
import { withRouter } from 'react-router-dom';

const Header = (props) => (
  <div onClick={() => props.history.push('/')}>
    <h1>CURTO CIRCUITO</h1>
  </div>
);

export default withRouter(Header);