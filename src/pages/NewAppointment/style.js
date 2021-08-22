import styled from 'styled-components';

export const NewAppointmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80vh;
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 60px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  section {
    width: 100%;
    max-width: 380px;
    h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    };
    p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    };
    img {
      max-height: 250px;
    };
  };
  form {
    width: 100%;
    max-width: 450px;
    textarea, input, select, label {
      margin-top: 8px;
    };
    button {
      margin: 16px 0;
    };
  };

`;
