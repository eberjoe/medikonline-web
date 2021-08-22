import styled from 'styled-components';
import media from 'styled-media-query';

export const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 10px;
  margin: auto;
  background: white;
  span {
    font-size: 20px;
    margin-left: 100px;
    ${media.lessThan('medium')`
      font-size: 12px;
      margin-left: 0;
      margin-right: 10px;
    `};
  };
  img {
    height: 40px;
    ${media.lessThan('medium')`
      display: none;
    `};
  };
  a {
    width: 260px;
    padding: 0 3px;
    margin-left: auto;
    margin-top: 0;
  };
`;