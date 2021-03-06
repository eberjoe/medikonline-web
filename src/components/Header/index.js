import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiPower} from 'react-icons/fi';
import './styles.css'

// eslint-disable-next-line
const Header = ({ headerMessage, optionalLink = <a/> }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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