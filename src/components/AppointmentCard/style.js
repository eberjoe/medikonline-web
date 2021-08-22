import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: 24px;
  border-radius: 8px;
  position: relative;
  background: ${props => props.bg};
  cursor: ${props => props.c};
  p {
    color: #737380;
    margin-bottom: 16px;
    line-height: 21px;
    font-size: 16px;
  };
`;

export const AppointmentDetails = styled.div`
  strong {
    padding-right: 30px;
  };
`;

export const ControlPanel = styled.div`
  position: absolute;
  right: 5px;
  top: 20px;
  button {
    display: block;
    border: none;
    background: transparent;
    padding: 0;
    margin: 5px 0;
    height: 20px;
    width: auto;
    transition: opacity 0.3s;
  };
  button:hover {
    opacity: 0.5;
  };
`;

export const ModalContent = styled.div`
  position: absolute;
  border-style: double;
  border-radius: 3px;
  width: auto;
  height: auto;
  background: #f7f7f7;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -250px;
  h2 {
    margin:20px;
  };
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 40px;
    margin: 20px;
    font-size: 16px;
    padding: 5px;
  };
`;

export const ModalBody = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
`;