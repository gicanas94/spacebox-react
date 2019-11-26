import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import { SliderPicker } from 'react-color';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;

  ${({ margin }) => margin && `
    margin: ${margin};
  `}
`;

const StyledLabel = styled.span`
  color: ${({ theme }) => theme.components.colorPicker.color};
  font-size: ${({ theme }) => theme.components.colorPicker.fontSize};
  font-weight: ${({ theme }) => theme.components.colorPicker.fontWeight};
  margin-bottom: 20px;
  word-break: break-all;
`;

const ColorPicker = ({
  color,
  disabled,
  label,
  margin,
  onChangeHandler,
}) => (
  <StyledWrapper margin={margin}>
    <StyledLabel>
      <FormattedMessage id={label} />
    </StyledLabel>

    <SliderPicker color={color} onChange={!disabled && onChangeHandler} />
  </StyledWrapper>
);

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  disabled: false,
  margin: undefined,
};

export default ColorPicker;
