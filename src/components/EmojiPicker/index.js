import { FormattedMessage, useIntl } from 'react-intl';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  emojis,
  emojisNamesInEnglish,
  emojisNamesInSpanish,
} from './emojisList';

import { transition } from '../../styles';

const StyledInput = styled.input`
  background-color: ${({ theme }) =>
    theme.components.emojiPicker.searchInput.bgColor};
  border: 0;
  border-bottom: ${({ theme }) =>
    theme.components.emojiPicker.searchInput.borderBottom};
  font-size: ${({ theme }) =>
    theme.components.emojiPicker.searchInput.fontSize};
  // margin: 0 5px;
  padding-bottom: 2px;
  width: -webkit-fill-available;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.div`
  color: ${({ theme }) => theme.components.emojiPicker.label.color};
  font-size: ${({ theme }) => theme.components.emojiPicker.label.fontSize};
  font-weight: ${({ theme }) => theme.components.emojiPicker.label.fontWeight};
  line-height: 1;
  padding: 15px 0;

  &:first-of-type {
    padding: 0 0 15px 0;
  }
`;

const StyledEmojisWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
`;

const StyledEmoji = styled.span`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  transition: transform ${transition.speed.superfast} linear;
  width: 40px;

  &:active {
    transform: translateY(2px);
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.components.emojiPicker.emojiHoverColor};
  }
`;

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.emojiPicker.bgColor};
  border: ${({ theme }) => theme.components.emojiPicker.border};
  // box-shadow: ${({ theme }) => theme.components.emojiPicker.boxShadow};
  display: flex;
  flex-direction: column;
  height: 270px;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px;
  user-select: none;
  width: 100%

  ${StyledEmojisWrapper} {
    ::-webkit-scrollbar {
      width: 15px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme.components.emojiPicker.scrollBar.thumb.bgColor};
    }

    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) =>
        theme.components.emojiPicker.scrollBar.track.bgColor};
    }
  }

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};

    ${StyledEmojisWrapper} {
      ::-webkit-scrollbar-thumb {
        border-radius: ${theme.components.emojiPicker.scrollBar.thumb.borderRadius};
      }
    }

    ${StyledEmoji} {
      border-radius: ${theme.global.borderRadius};
    }
  `}
`;

const EmojiPicker = ({ callback, rounded, ...props }) => {
  const intl = useIntl();
  const [searchContent, setSearchContent] = useState('');
  const [emojisFound, setEmojisFound] = useState([]);
  const [recentlyUsedEmojis, setRecentlyUsedEmojis] = useState(
    JSON.parse(localStorage.getItem('recentlyUsedEmojis')) || [],
  );

  const emojisNames =
    intl.locale === 'es' ? emojisNamesInSpanish : emojisNamesInEnglish;

  const handleInputChange = (event) => {
    setSearchContent(event.target.value);

    const foundEmojis = [];

    for (let i = 0; i < emojisNames.length; i += 1) {
      if (
        emojisNames[i].toUpperCase().includes(event.target.value.toUpperCase())
      ) {
        foundEmojis.push(emojis[i]);
      }
    }

    setEmojisFound(foundEmojis);
  };

  const updateRecentlyUsedEmojis = (emoji) => {
    const recentlyUsedEmojisCopy = [...recentlyUsedEmojis];

    recentlyUsedEmojisCopy.unshift(emoji);

    if (recentlyUsedEmojisCopy.length >= 23) {
      recentlyUsedEmojisCopy.splice(-1, 1);
    }

    setRecentlyUsedEmojis(recentlyUsedEmojisCopy);

    localStorage.setItem(
      'recentlyUsedEmojis',
      JSON.stringify(recentlyUsedEmojisCopy),
    );
  };

  const handleEmojiClick = (emoji) => {
    if (!recentlyUsedEmojis.includes(emoji)) {
      updateRecentlyUsedEmojis(emoji);
    }

    callback(emoji);
  };

  const emojiElement = (emoji, index) => (
    <StyledEmoji
      aria-label="Emoji"
      key={emoji + index}
      onClick={() => handleEmojiClick(emoji)}
      role="img"
    >
      {emoji}
    </StyledEmoji>
  );

  const searchContentElement = (
    <>
      <StyledLabel>
        <FormattedMessage id="components.emojiPicker.searchResultsLabel" />
      </StyledLabel>

      {emojisFound.map((emoji, index) => emojiElement(emoji, index))}
    </>
  );

  const recentlyUsedEmojisElement = (
    <>
      <StyledLabel>
        <FormattedMessage id="components.emojiPicker.recentlyUsedEmojisLabel" />
      </StyledLabel>

      {recentlyUsedEmojis.map((emoji, index) => emojiElement(emoji, index))}
    </>
  );

  const allEmojisElement = (
    <>
      <StyledLabel>
        <FormattedMessage id="components.emojiPicker.allEmojisLabel" />
      </StyledLabel>

      {emojis.map((emoji, index) => emojiElement(emoji, index))}
    </>
  );

  return (
    <StyledWrapper rounded={rounded} {...props}>
      <StyledInput
        onChange={handleInputChange}
        placeholder={intl.formatMessage({
          id: 'components.emojiPicker.searchInputPlaceholder',
        })}
        type="text"
      />

      <StyledEmojisWrapper>
        {searchContent ? (
          searchContentElement
        ) : (
          <>
            {recentlyUsedEmojis.length > 0 ? (
              <>
                {recentlyUsedEmojisElement}
                {allEmojisElement}
              </>
            ) : (
              allEmojisElement
            )}
          </>
        )}
      </StyledEmojisWrapper>
    </StyledWrapper>
  );
};

EmojiPicker.propTypes = {
  callback: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
};

EmojiPicker.defaultProps = {
  rounded: false,
};

export default EmojiPicker;
