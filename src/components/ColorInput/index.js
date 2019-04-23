import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { font } from '../../styles';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95px;

  ${props => props.margin && `
    margin: ${props.margin};
  `}
`;

const StyledLabel = styled.span`
  font-size: ${font.size.xs};
  margin-bottom: 7px;
  word-break: break-all;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 60px;
  outline: none;
  padding: 0;
  width: 95px;

  &::-webkit-color-swatch {
    border: 0;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  ${props => props.rounded && `
    border-radius: 4px;
  `}
`;

const ColorInput = ({
  label,
  margin,
  rounded,
  ...props
}) => (
  <StyledWrapper margin={margin}>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput rounded={rounded} type="color" {...props} />
  </StyledWrapper>
);

ColorInput.propTypes = {
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
};

ColorInput.defaultProps = {
  margin: undefined,
  rounded: false,
};

export default ColorInput;
