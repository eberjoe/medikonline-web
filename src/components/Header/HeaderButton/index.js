import React from 'react';
import './styles.css';

const HeaderButton = ({ icon, handleClick }) => {

  return <button onClick={handleClick}>{icon}</button>
}

export default HeaderButton;