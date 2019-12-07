import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/color';

const StyledHr = styled.hr`
  background-color: ${({ color, theme }) => (
    color
      ? colors.palette[color]
      : theme.components.hr.color.default
  )};
  border: none;
  border-radius: ${({ theme }) => theme.global.borderRadius};
  display: block;
  height: ${({ theme }) => theme.components.hr.height};
  margin: 0;
  width: 100%;

  ${({ centered }) => centered && `
    margin-left: 25% !important;
  `}

  ${({ height }) => height && `
    height: ${height};
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
  height: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
};

Hr.defaultProps = {
  centered: false,
  color: undefined,
  height: undefined,
  margin: undefined,
  width: undefined,
};

export default Hr;
