import styled from 'styled-components';
import media from 'styled-media-query';

export const RegistrationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  section {
    width: 100%;
    max-width: 380px;
    p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    };
    h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    };
    
    ${media.lessThan('medium')`
      display: none;
    `}
  };
  form {
    width: 100%;
    max-width: 450px;
    input {
      margin-top: 8px;
    };
    button {
      margin: 16px 0;
    };
  };

  ${media.lessThan('medium')`
    height: 80vh;
    justify-content: center;
    padding: 50px;
  `}
`;

export const MobileLogo = styled.div`
  display: flex;
  justify-content: center;
  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const MobileFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  height: auto;

  ${media.greaterThan('medium')`
    display: none;
  `}
`;
