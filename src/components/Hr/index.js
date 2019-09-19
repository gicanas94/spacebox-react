import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/color';

const StyledHr = styled.hr`
  border-color: ${({ color, theme }) => (
    color
      ? colors.palette[color]
      : theme.components.Hr.color.default
  )};
  border-style: ${({ dashed }) => (dashed ? 'dashed' : 'solid')};
  border-width: ${({ theme }) => theme.components.Hr.borderWidth};
  border-radius: ${({ theme }) => theme.global.borderRadius};
  display: block;
  margin: 0;
  width: 100%;

  ${({ centered }) => centered && `
    margin-left: 25% !important;
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ width }) => width && `
    width: ${width};
  `}
`;

const Hr = ({ ...props }) => <StyledHr {...props} />;

Hr.propTypes = {
  centered: PropTypes.bool,
  color: PropTypes.string,
  dashed: PropTypes.bool,
  margin: PropTypes.string,
  width: PropTypes.string,
};

Hr.defaultProps = {
  centered: false,
  color: undefined,
  dashed: false,
  margin: undefined,
  width: undefined,
};

export default Hr;
