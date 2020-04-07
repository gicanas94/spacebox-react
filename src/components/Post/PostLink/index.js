import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.post.postLink.bgColor};
  border: ${({ theme }) => theme.components.post.postLink.border};
  border-radius: ${({ theme }) => theme.components.post.postLink.borderRadius};
  box-shadow: ${({ theme }) => theme.components.post.postLink.boxShadow};
  display: flex;
  font-size: ${({ theme }) => theme.components.post.postLink.fontSize};
  height: 45px;
  margin-bottom: 25px;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledLabel = styled.label`
  align-items: center;
  background-color: ${({ theme }) => (
    theme.components.post.postLink.label.bgColor
  )};
  display: flex;
  color: ${({ theme }) => theme.components.post.postLink.label.color};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.components.post.postLink.label.fontWeight};
  height: 100%;
  padding: 0 10px;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => (
    theme.components.post.postLink.input.bgColor
  )};
  border: ${({ theme }) => theme.components.post.postLink.input.border};
  height: 100%;
  padding: 0 10px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const PostLink = ({ inputId, link, ...props }) => {
  useEffect(() => {
    const input = document.getElementById(inputId);
    input.select();
  });

  return (
    <StyledWrapper {...props}>
      <StyledLabel htmlFor={inputId}>
        <FormattedMessage id="components.post.postLink.label" />
      </StyledLabel>

      <StyledInput
        autoFocus
        id={inputId}
        name={inputId}
        onClick={event => event.target.select()}
        readOnly
        type="text"
        value={link}
      />
    </StyledWrapper>
  );
};

PostLink.propTypes = {
  inputId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PostLink;
