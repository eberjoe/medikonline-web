import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { IoMegaphone } from "react-icons/io5";
import './styles.css'

import socket from '../../services/socket';

import HeaderButton from './HeaderButton';

// eslint-disable-next-line
const Header = ({ headerMessage, optionalLink = <a/> }) => {
  const history = useHistory();

  const handleBroadcast = () => {
    const broadcastMessage = window.prompt('Digite sua mensagem de broadcast');
    console.log(broadcastMessage);
  }

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
      <HeaderButton icon={<IoMegaphone size={18} color="#6c63ff" />} handleClick={handleBroadcast} />
      <HeaderButton icon={<FiPower size={18} color="#6c63ff" />} handleClick={handleLogout} />
    </header>
  )
};

export default Header;