import styled from 'styled-components';

export const BalloonRow = styled.div`
  display: inline;
  width: 100%;
  padding-bottom: 15px;
`;

export const BalloonContainer = styled.div`
  display: flex;
  padding: 5px;
  margin: 5px;
  flex-direction: column;
  border-radius: 10px;
  width: fit-content;
  clear: both;
  background: ${props => props.bg};
  float: ${props => props.f};
`;

export const Timestamp = styled.label`
  background: transparent;
  padding: 2px;
  font-size: 10px;
`;

export const Message = styled.label`
  background: transparent;
  font-size: 16px;
  padding: 5px;
`;