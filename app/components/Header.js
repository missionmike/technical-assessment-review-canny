import './css/_Header.css';

import Logo from '../img/logo.svg';
import React from 'react';
import { connect } from 'react-redux';

const Header = ({ votes }) => {
  return (
    <div className="header">
      <img src={Logo} alt="Canny" className="logo" />
      <div className="spacer" />
      <div>Total Votes: {votes}</div>
    </div>
  );
};

export default connect(({ posts }) => ({ votes: posts.votes }))(Header);
