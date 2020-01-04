import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import { device } from '../../styles';
import Emoji from '../../components/Emoji';
import HelmetTitle from '../../components/HelmetTitle';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 75vh;
  justify-content: center;
  margin: auto;
  width: 80%;

  @media ${device.tablet} {
    flex-direction: row;
    width: 435px;
  }
`;

const StyledContent = styled.p`
  font-size: ${({ theme }) => theme.pages.notFound.content.fontSize};
  margin-bottom: 0;
  margin-top: 25px;

  @media ${device.tablet} {
    margin-left: 25px;
    margin-top: 0;
  }
`;

const StyledBoldFragment = styled.span`
  font-weight: ${({ theme }) => theme.pages.notFound.content.fontWeight};
`;

const NotFoundPage = () => {
  const emojisToRandom = [
    {
      emoji: '😶',
      label: 'pages.notFound.randomEmojiLabels.emoji1',
    },
    {
      emoji: '😧',
      label: 'pages.notFound.randomEmojiLabels.emoji2',
    },
    {
      emoji: '😬',
      label: 'pages.notFound.randomEmojiLabels.emoji3',
    },
    {
      emoji: '😔',
      label: 'pages.notFound.randomEmojiLabels.emoji4',
    },
    {
      emoji: '😵',
      label: 'pages.notFound.randomEmojiLabels.emoji5',
    },
    {
      emoji: '😱',
      label: 'pages.notFound.randomEmojiLabels.emoji6',
    },
  ];

  const randomEmoji = Math.floor(Math.random() * emojisToRandom.length);

  return (
    <StyledWrapper>
      <HelmetTitle title={{ id: 'pages.notFound.title' }} />

      <Emoji
        emoji={emojisToRandom[randomEmoji].emoji}
        fontSize="120px"
        label={emojisToRandom[randomEmoji].label}
      />

      <StyledContent>
        <FormattedMessage
          id="pages.notFound.content"
          values={{
            boldPieceOfContent: (
              <StyledBoldFragment>
                <FormattedMessage id="pages.notFound.boldPieceOfContent" />
              </StyledBoldFragment>
            ),
          }}
        />
      </StyledContent>
    </StyledWrapper>
  );
};

export default NotFoundPage;
