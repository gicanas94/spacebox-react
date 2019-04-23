import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color } from '../../styles';

const StyledHr = styled.hr`
  border: 2px solid ${props => (
    props.color
      ? color.palette[props.color]
      : props.theme.components.hr.color.default
  )};
  border-radius: 4px;
  display: inline-block;
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
