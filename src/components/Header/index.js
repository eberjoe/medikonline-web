import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { IoMegaphone } from "react-icons/io5";

import * as S from './style';

import socket from '../../services/socket';

import HeaderButton from './HeaderButton';

// eslint-disable-next-line
const Header = ({ headerMessage, optionalLink = <a/> }) => {
  const history = useHistory();

  const handleBroadcast = async () => {
    const broadcastMessage = window.prompt('Emita um aviso geral');
    if(broadcastMessage) {
      await socket.emit('broadcastMessage', {
        senderId: localStorage.getItem('userId'),
        msg: broadcastMessage
      });
    }
  }

  const handleLogout = async () => {
    socket.emit('leave', localStorage.getItem('userId'));
    localStorage.clear();
    sessionStorage.clear();
    await socket.disconnect();
    history.push('/');
  }

  return (
    <S.HeaderStyled>
      <img src={logoImg} alt="Medikonline"/>
      <span>{headerMessage}</span>
      {optionalLink}
      <HeaderButton icon={<IoMegaphone size={18} color="#6c63ff" />} handleClick={handleBroadcast} />
      <HeaderButton icon={<FiPower size={18} color="#6c63ff" />} handleClick={handleLogout} />
    </S.HeaderStyled>
  )
};

export default Header;