import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 45px;
  margin-bottom: 25px;
  position: relative;
  width: 100%;
`;

const StyledArrow = styled.div`
  background-color: ${({ theme }) => theme.components.post.postLink.bgColor};
  border: ${({ theme }) => theme.components.post.postLink.border};
  height: 25px;
  left: 37px;
  margin-top: -25px;
  position: absolute;
  top: 13px;
  transform: rotate(45deg);
  width: 25px;
  z-index: 1;
`;

const StyledArrowCover = styled.div`
  background-color: ${({ theme }) => theme.components.post.postLink.bgColor};
  height: 25px;
  left: 37px;
  margin-top: -25px;
  position: absolute;
  top: 16px;
  transform: rotate(45deg);
  width: 25px;
  z-index: 2;
`;

const StyledLabelAndInputWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.post.postLink.bgColor};
  border: ${({ theme }) => theme.components.post.postLink.border};
  border-radius: ${({ theme }) => theme.components.post.postLink.borderRadius};
  display: flex;
  font-size: ${({ theme }) => theme.components.post.postLink.fontSize};
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  z-index: 3;
`;

const StyledLabel = styled.label`
  align-items: center;
  background-color: ${({ theme }) =>
    theme.components.post.postLink.label.bgColor};
  display: flex;
  color: ${({ theme }) => theme.components.post.postLink.label.color};
  cursor: pointer;
  font-weight: ${({ theme }) =>
    theme.components.post.postLink.label.fontWeight};
  height: 100%;
  padding: 0 10px;
  z-index: 3;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) =>
    theme.components.post.postLink.input.bgColor};
  border: 0;
  border: ${({ theme }) => theme.components.post.postLink.input.border};
  height: 100%;
  padding-bottom: 4px;
  padding-right: 10px;
  width: 100%;
  z-index: 3;

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
      <StyledArrow />
      <StyledArrowCover />

      <StyledLabelAndInputWrapper>
        <StyledLabel htmlFor={inputId}>
          <FormattedMessage id="components.post.postLink.label" />
        </StyledLabel>

        <StyledInput
          autoFocus
          id={inputId}
          name={inputId}
          onClick={(event) => event.target.select()}
          readOnly
          type="text"
          value={link}
        />
      </StyledLabelAndInputWrapper>
    </StyledWrapper>
  );
};

PostLink.propTypes = {
  inputId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PostLink;
