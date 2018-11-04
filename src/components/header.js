import React from 'react';
import { withRouter } from 'react-router-dom';

// Assets
import Logo from '../assets/images/Logo_48.png';

const Header = (props) => (
  <div onClick={() => props.history.push('/')}>
    <h2>CURTO <img src={Logo} alt="Curto Circuito Logo"/>CIRCUITO</h2>
  </div>
);

export default withRouter(Header);