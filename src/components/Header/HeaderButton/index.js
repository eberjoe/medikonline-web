import React from 'react';

import * as S from './style';

const HeaderButton = ({ icon, handleClick }) => {

  return <S.ButtonStyled onClick={handleClick}>{icon}</S.ButtonStyled>
}

export default HeaderButton;