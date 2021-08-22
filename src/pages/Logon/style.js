import styled from 'styled-components';
import media from 'styled-media-query';

export const LogonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  section {
    width: 100%;
    max-width: 350px;
    margin-right: 30px;
    form {
      margin-top: 100px;
      input {
        margin-top: 8px;
      };
      button {
        margin: 16px 0;
      };
    };
  };
  
  ${media.lessThan('medium')`
    justify-content: center;
    padding: 50px;
    margin: 0;
  `}
`;

export const ImgContainer = styled.div`
  ${media.lessThan('medium')`
    display: none;
  `}
`;
