import styled from 'styled-components';
import media from 'styled-media-query';

export const AppoitmentsContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
  h1 {
    margin-top: 80px;
    margin-bottom: 24px;
  };
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    list-style: none;
    ${media.lessThan('medium')`
      display: block;
    `};
  };
`;
