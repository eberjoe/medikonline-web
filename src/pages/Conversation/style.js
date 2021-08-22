import styled from 'styled-components';
import { Link } from 'react-router-dom';
import media from 'styled-media-query';

export const ConvoContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  padding: 50px;
  h1 {
    margin-top: 50px;
    margin-bottom: 24px;
  };

  ${media.lessThan('medium')`
    height: 90vh;
    padding: 50px 10px;
  `}
`;

export const Convo = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0;
  `}
`;

export const FormStyled = styled.form`
  width: 100%;
  max-width: 300px;
  button {
    width: 20%;
    padding-top: 5px;
    margin: 16px 0;
  };

  ${media.lessThan('medium')`
    display: none;
  `}
`;

export const MobileForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 300px;
  button {
    width: 20%;
    padding-top: 5px;
    margin: 0;
  };

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const ChatBox = styled.div`
  overflow: auto;
  padding: 5px;
  resize: none;
  border-radius: 8px;
  width: 100%;
  height: 350px;
  margin-left: 15px;
  border: 1px solid #dcdce5;
  background: ${props => props.bg};

  ${media.lessThan('medium')`
    height: 40vh;
    margin: 0;
  `}
`;

export const BackLink = styled(Link)`
  position: absolute;
  bottom: 15px;

  ${media.lessThan('medium')`
    position: inherit;
  `}
`;