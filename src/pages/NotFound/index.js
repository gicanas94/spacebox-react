import { Helmet } from 'react-helmet';
import React from 'react';
import styled from 'styled-components';

import { device } from '../../styles';
import Emoji from '../../components/Emoji';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: center;
  margin: auto;
  width: 80%;

  @media ${device.tablet} {
    flex-direction: row;
    width: 435px;
  }
`;

const StyledContent = styled.p`
  margin-bottom: 0;
  margin-top: 25px;

  @media ${device.tablet} {
    margin-left: 25px;
    margin-top: 0;
  }
`;

const StyledBoldFragment = styled.span`
  font-weight: ${({ theme }) => theme.pages.NotFound.content.fontWeight};
`;

const NotFoundPage = () => {
  const emojisToRandom = [
    '😶',
    '😧',
    '😬',
    '😔',
    '😵',
    '😱',
  ];

  return (
    <StyledWrapper>
      <Helmet title="404 - Spacebox" />

      <Emoji
        fontSize="120px"
        label="anguished face"
        symbol={emojisToRandom[
          Math.floor(Math.random() * emojisToRandom.length)
        ]}
      />

      <StyledContent>
        This is embarrassing but...
        <StyledBoldFragment> this page was not found.</StyledBoldFragment>
      </StyledContent>
    </StyledWrapper>
  );
};

export default NotFoundPage;
