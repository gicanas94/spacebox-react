import Editor from 'draft-js-plugins-editor';

import {
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from 'draft-js';

import { FormattedHTMLMessage } from 'react-intl';
import React, { useState } from 'react';
import styled from 'styled-components';

import { transition } from '../../styles';

const StyledWrapper = styled.div``;

const StyledButtonsWrapper = styled.div`
  margin-bottom: 25px;

  button {
    margin-right: 15px;
  }

  button:last-of-type {
    margin-right: 0;
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => (
    theme.components.richTextEditor.button.default.backgroundColor
  )};
  border: ${({ theme }) => (
    theme.components.richTextEditor.button.default.border
  )};
  border-radius: ${({ theme }) => theme.global.borderRadius};
  cursor: pointer;
  color: ${({ theme }) => (
    theme.components.richTextEditor.button.default.color
  )};
  line-height: 1;
  padding: 7px 10px 5px 10px;
  transition: all ${transition.speed.superfast} linear;

  &:active {
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) => (
      theme.components.richTextEditor.button.hover.backgroundColor
    )};
    border: ${({ theme }) => (
      theme.components.richTextEditor.button.hover.border
    )};
    color: ${({ theme }) => (
      theme.components.richTextEditor.button.hover.color
    )};
  }

  &.active {
    background-color: ${({ theme }) => (
      theme.components.richTextEditor.button.active.backgroundColor
    )};
    border: ${({ theme }) => (
      theme.components.richTextEditor.button.active.border
    )};
    color: ${({ theme }) => (
      theme.components.richTextEditor.button.active.color
    )};
`;

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command) => {
    let newState = RichUtils.handleKeyCommand(editorState, command);

    if (!newState && command === 'strikethrough') {
      newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
    }

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const keyBindingFn = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event)
      && event.shiftKey
      && event.key === 'x'
    ) {
      return 'strikethrough';
    }

    return getDefaultKeyBinding(event);
  };

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    const style = event.currentTarget.getAttribute('data-style');
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event) => {
    event.preventDefault();
    const block = event.currentTarget.getAttribute('data-block');
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const inlineStyleButtons = [
    {
      style: 'BOLD',
      value: 'components.richTextEditor.buttons.bold',
    },
    {
      style: 'ITALIC',
      value: 'components.richTextEditor.buttons.italic',
    },
    {
      style: 'UNDERLINE',
      value: 'components.richTextEditor.buttons.underline',
    },
    {
      style: 'STRIKETHROUGH',
      value: 'components.richTextEditor.buttons.strikethrough',
    },
    {
      style: 'HIGHLIGHT',
      value: 'components.richTextEditor.buttons.highlight',
    },
  ];

  const blockTypeButtons = [
    {
      block: 'header-one',
      value: 'components.richTextEditor.buttons.h1',
    },
    {
      block: 'header-two',
      value: 'components.richTextEditor.buttons.h2',
    },
    {
      block: 'header-three',
      value: 'components.richTextEditor.buttons.h3',
    },
    {
      block: 'blockquote',
      value: 'components.richTextEditor.buttons.blockquote',
    },
    {
      block: 'ordered-list-item',
      value: 'components.richTextEditor.buttons.ol',
    },
    {
      block: 'unordered-list-item',
      value: 'components.richTextEditor.buttons.ul',
    },
  ];

  const customStyleMap = {
    HIGHLIGHT: {
      backgroundColor: '#dedd43',
    },
  };

  const plugins = [];

  return (
    <StyledWrapper>
      <StyledButtonsWrapper>
        {inlineStyleButtons.map(inlineStyleButton => (
          <StyledButton
            className={
              editorState.getCurrentInlineStyle().has(inlineStyleButton.style)
                ? 'active'
                : null
            }
            data-style={inlineStyleButton.style}
            key={inlineStyleButton.style}
            onClick={toggleInlineStyle}
            onMouseDown={event => event.preventDefault()}
            type="button"
          >
            <FormattedHTMLMessage id={inlineStyleButton.value} />
          </StyledButton>
        ))}

        {blockTypeButtons.map(blockTypeButton => (
          <StyledButton
            className={
              RichUtils.getCurrentBlockType(editorState) === blockTypeButton.block
                ? 'active'
                : null
            }
            data-block={blockTypeButton.block}
            key={blockTypeButton.block}
            onClick={toggleBlockType}
            onMouseDown={event => event.preventDefault()}
            type="button"
          >
            <FormattedHTMLMessage id={blockTypeButton.value} />
          </StyledButton>
        ))}
      </StyledButtonsWrapper>

      <Editor
        customStyleMap={customStyleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onChange={setEditorState}
        plugins={plugins}
      />
    </StyledWrapper>
  );
};

export default RichTextEditor;
