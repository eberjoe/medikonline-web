import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ConvoContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 8vh;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  h1 {
    margin-top: 50px;
    margin-bottom: 24px;
  };
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
  form {
    width: 100%;
    max-width: 300px;
    button {
      width: 20%;
      padding-top: 5px;
      margin: 16px 0;
    };
  };
`;

export const ChatBox = styled.div`
  overflow: auto;
  padding: 5px;
  resize: none;
  border-radius: 8px;
  width: 100%;
  height: 445px;
  margin-left: 15px;
  border: 1px solid #dcdce5;
  background: ${props => props.bg};
`;

export const BackLink = styled(Link)`
  position: absolute;
  bottom: 15px;
`;