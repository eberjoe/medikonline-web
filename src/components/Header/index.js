import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiPower} from 'react-icons/fi';
import './styles.css'

import socket from '../../services/socket';

// eslint-disable-next-line
const Header = ({ headerMessage, optionalLink = <a/> }) => {
  const history = useHistory();

  const handleLogout = () => {
    socket.emit('leave', localStorage.getItem('userId'));
    localStorage.clear();
    sessionStorage.clear();
    socket.disconnect();
    history.push('/');
  }

  return (
    <header className="header-container">
      <img src={logoImg} alt="Medikonline"/>
      <span>{headerMessage}</span>
      {optionalLink}
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#6c63ff" />
      </button>
    </header>
  )
};

export default Header;