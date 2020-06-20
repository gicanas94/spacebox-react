import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from 'draft-js';

import { ErrorOutline } from 'styled-icons/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import styled from 'styled-components';

import { keyframes, transitions } from '../../styles';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.components.richTextEditor.status.default};
  display: block;
  font-size: ${({ theme }) => theme.components.richTextEditor.label.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.richTextEditor.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transitions.speed.superfast} linear;
  white-space: nowrap;
`;

const StyledRichUtilButtonsWrapper = styled.div`
  padding: 10px 10px 5px 10px;

  button {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  button:last-of-type {
    margin-right: 0;
  }
`;

const StyledRichUtilButton = styled.button`
  background-color: ${({ theme }) =>
    theme.components.richTextEditor.richUtilButton.status.default.bgColor};
  border ${({ theme }) =>
    theme.components.richTextEditor.richUtilButton.status.default.border};
  cursor: pointer;
  color: ${({ theme }) =>
    theme.components.richTextEditor.richUtilButton.status.default.color};
  font-size: ${({ theme }) =>
    theme.components.richTextEditor.richUtilButton.fontSize};
  line-height: 1;
  padding: 6px 10px 5px 10px;
  transition: all ${transitions.speed.superfast} linear;

  &:active {
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.hover.bgColor};
    border ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.hover.border};
    color: ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.hover.color};
  }

  &.active {
    background-color: ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.active.bgColor};
    border ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.active.border};
    color: ${({ theme }) =>
      theme.components.richTextEditor.richUtilButton.status.active.color};
`;

const StyledEditorAndRichUtilsButtonsWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.richTextEditor.bgColor};
  border: 0;
  border-bottom-width: ${({ theme }) =>
    theme.components.richTextEditor.borderBottomWidth};
  border-color: ${({ theme }) =>
    theme.components.richTextEditor.status.default};
  border-style: solid;
  transition: border ${transitions.speed.superfast} linear;

  .DraftEditor-root {
    padding: 10px;
    padding-top: 0;

    &:focus {
      outline: none;
    }
  }
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transitions.speed.normal} infinite ${keyframes.beat(1.1)};
  background-color: ${({ theme }) => theme.components.richTextEditor.bgColor};
  bottom: 34px;
  color: ${({ theme }) => theme.components.richTextEditor.status.error};
  position: absolute;
  right: 10px;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.richTextEditor.status.error};
  font-size: ${({ theme }) =>
    theme.components.richTextEditor.errorMessage.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.richTextEditor.errorMessage.fontWeight};
  padding-top: 5px;
`;

const StyledWrapper = styled.div`
  overflow: hidden;
  position: relative;

  ${({ disabled, theme }) =>
    disabled &&
    `
    ${StyledLabel} {
      color: ${theme.components.richTextEditor.status.disabled} !important;
    }

    ${StyledEditorAndRichUtilsButtonsWrapper} {
      border-color: ${theme.components.richTextEditor.status.disabled} !important;
    }

    ${StyledRichUtilButton} {
      background-color: ${theme.components.richTextEditor.richUtilButton.status.disabled.bgColor};
      border ${theme.components.richTextEditor.richUtilButton.status.disabled.border};
      color: ${theme.components.richTextEditor.richUtilButton.status.disabled.color};
      cursor: default;

      &:active {
        transform: none;
      }
    }

    .DraftEditor-root {
      ::placeholder {
        color: ${theme.components.richTextEditor.status.disabled} !important;
      }

      :-ms-input-placeholder {
        color: ${theme.components.richTextEditor.status.disabled} !important;
      }

      ::-ms-input-placeholder {
        color: ${theme.components.richTextEditor.status.disabled} !important;
      }
    }
  `}

  ${({ error, theme }) =>
    error &&
    `
    ${StyledLabel} {
      color: ${theme.components.richTextEditor.status.error};
    }

    ${StyledEditorAndRichUtilsButtonsWrapper} {
      border-color: ${theme.components.richTextEditor.status.error};
    }
  `}

  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}

  ${({ rounded, theme }) =>
    rounded &&
    `
    ${StyledEditorAndRichUtilsButtonsWrapper} {
      border-top-left-radius: ${theme.global.borderRadius};
      border-top-right-radius: ${theme.global.borderRadius};
    }

    ${StyledRichUtilButton} {
      border-radius: ${theme.global.borderRadius};
    }
  `}

  ${({ success, theme }) =>
    success &&
    `
    ${StyledLabel} {
      color: ${theme.components.richTextEditor.status.success};
    }

    ${StyledEditorAndRichUtilsButtonsWrapper} {
      border-color: ${theme.components.richTextEditor.status.success};
    }
  `}
`;

const RichTextEditor = ({ disabled, error, label, name, ...props }) => {
  const richTextEditorId = `richTextEditor-component_${name}`;

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
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === 'x'
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
      value: 'components.richTextEditor.richUtilButton.bold',
    },
    {
      style: 'ITALIC',
      value: 'components.richTextEditor.richUtilButton.italic',
    },
    {
      style: 'UNDERLINE',
      value: 'components.richTextEditor.richUtilButton.underline',
    },
    {
      style: 'STRIKETHROUGH',
      value: 'components.richTextEditor.richUtilButton.strikethrough',
    },
    {
      style: 'HIGHLIGHT',
      value: 'components.richTextEditor.richUtilButton.highlight',
    },
  ];

  const blockTypeButtons = [
    {
      block: 'header-one',
      value: 'components.richTextEditor.richUtilButton.h1',
    },
    {
      block: 'header-two',
      value: 'components.richTextEditor.richUtilButton.h2',
    },
    {
      block: 'header-three',
      value: 'components.richTextEditor.richUtilButton.h3',
    },
    {
      block: 'blockquote',
      value: 'components.richTextEditor.richUtilButton.blockquote',
    },
    {
      block: 'ordered-list-item',
      value: 'components.richTextEditor.richUtilButton.ol',
    },
    {
      block: 'unordered-list-item',
      value: 'components.richTextEditor.richUtilButton.ul',
    },
  ];

  const customStyleMap = {
    HIGHLIGHT: {
      backgroundColor: '#abef1b',
    },
  };

  return (
    <StyledWrapper disabled={disabled} error={error} {...props}>
      <StyledLabel htmlFor={richTextEditorId}>
        <FormattedMessage id={label} />
      </StyledLabel>

      <StyledEditorAndRichUtilsButtonsWrapper>
        <StyledRichUtilButtonsWrapper>
          {inlineStyleButtons.map((inlineStyleButton) => (
            <StyledRichUtilButton
              className={
                editorState.getCurrentInlineStyle().has(inlineStyleButton.style)
                  ? 'active'
                  : null
              }
              data-style={inlineStyleButton.style}
              key={inlineStyleButton.style}
              onClick={!disabled && toggleInlineStyle}
              onMouseDown={(event) => event.preventDefault()}
              type="button"
            >
              <FormattedMessage
                id={inlineStyleButton.value}
                values={{
                  b: (...chunks) => <b>{chunks}</b>,
                  i: (...chunks) => <i>{chunks}</i>,
                  u: (...chunks) => <u>{chunks}</u>,
                  s: (...chunks) => <s>{chunks}</s>,
                }}
              />
            </StyledRichUtilButton>
          ))}

          {blockTypeButtons.map((blockTypeButton) => (
            <StyledRichUtilButton
              className={
                RichUtils.getCurrentBlockType(editorState) ===
                blockTypeButton.block
                  ? 'active'
                  : null
              }
              data-block={blockTypeButton.block}
              key={blockTypeButton.block}
              onClick={!disabled && toggleBlockType}
              onMouseDown={(event) => event.preventDefault()}
              type="button"
            >
              <FormattedMessage id={blockTypeButton.value} />
            </StyledRichUtilButton>
          ))}
        </StyledRichUtilButtonsWrapper>

        <Editor
          customStyleMap={customStyleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          onChange={setEditorState}
          readOnly={disabled}
        />
      </StyledEditorAndRichUtilsButtonsWrapper>

      {!disabled && error && (
        <>
          <StyledErrorIcon />

          <StyledErrorMessage>
            <FormattedMessage defaultMessage={error} id={error} />
          </StyledErrorMessage>
        </>
      )}
    </StyledWrapper>
  );
};

RichTextEditor.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
};

RichTextEditor.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: undefined,
  success: false,
};

export default RichTextEditor;
