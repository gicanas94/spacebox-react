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
  border-style: ${props => (props.dashed ? 'dashed' : 'solid')};
  border-width: ${props => props.theme.components.Hr.borderWidth};
  border-radius: ${props => props.theme.global.borderRadius};
  display: inline-flex;
  margin: 0;
  width: 100%;

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.width && `
    width: ${props.width};
  `}
`;

const Hr = ({ ...props }) => <StyledHr {...props} />;

Hr.propTypes = {
  color: PropTypes.string,
  dashed: PropTypes.bool,
  margin: PropTypes.string,
  width: PropTypes.string,
};

Hr.defaultProps = {
  color: undefined,
  dashed: false,
  margin: undefined,
  width: undefined,
};

export default Hr;
