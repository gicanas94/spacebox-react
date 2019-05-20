import { Cross } from 'styled-icons/icomoon/Cross';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { device } from '../../styles';

const StyledAlert = styled.div`
  bottom: 0;
  cursor: pointer;
  display: flex;
  font-weight: ${props => props.theme.components.Alert.fontWeight};
  height: fit-content;
  justify-content: center;
  left: 0;
  min-height: 60px;
  padding: 10px;
  position: fixed;
  text-align: justify;
  width: 100%;
  z-index: 900;

  @media ${device.laptop} {
    padding: 5px 0;
    top: 0;
  }

  ${props => props.type && `
    background-color: ${props.theme.components.Alert.type[props.type].bgColor};
  `}

  ${props => props.withBorder && `
    border-bottom: 0;
    border-top: ${props.theme.components.Alert.type[props.type].border};

    @media ${device.laptop} {
      border-bottom: ${props.theme.components.Alert.type[props.type].border};
      border-top: 0;
    }
  `}
  }
`;

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: ${props => props.theme.components.Alert.maxWidth};
  width: ${props => props.theme.components.Alert.mobileWidth};

  @media ${device.laptop} {
    width: ${props => props.theme.components.Alert.laptopWidth};
  }
`;

const StyledText = styled.div`
  margin-right: 10px;

  @media ${device.laptop} {
    margin-right: 20px;
  }
`;

const StyledCrossIcon = styled(Cross)`
  min-width: 30px;
  width: 30px;
`;

const Alert = ({ onAlertCloseHandler, text, ...props }) => (
  <StyledAlert onClick={onAlertCloseHandler} {...props}>
    <StyledWrapper>
      <StyledText>{text}</StyledText>
      <StyledCrossIcon />
    </StyledWrapper>
  </StyledAlert>
);

Alert.propTypes = {
  onAlertCloseHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  withBorder: PropTypes.bool,
};

Alert.defaultProps = {
  withBorder: false,
};

export default Alert;