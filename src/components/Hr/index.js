import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color } from '../../styles';

const StyledHr = styled.hr`
  border-color: ${props => (
    props.color
      ? color.palette[props.color]
      : props.theme.components.Hr.color.default
  )};
  border-style: solid;
  border-width: ${props => props.theme.components.Hr.borderWidth};
  border-radius: ${props => props.theme.global.borderRadius};
  display: inline-flex;
  margin: 0;
  width: 100%;

  ${props => props.margin && `
    margin: ${props.margin};
  `}
`;

const Hr = ({ ...props }) => <StyledHr {...props} />;

Hr.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
};

Hr.defaultProps = {
  color: undefined,
  margin: undefined,
};

export default Hr;
