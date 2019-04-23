import { Cross } from 'styled-icons/icomoon/Cross';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { cambalache, device, font } from '../../styles';

const StyledAlert = styled.div`
  bottom: 0;
  display: flex;
  font-weight: ${font.weight.medium};
  height: fit-content;
  justify-content: center;
  left: 0;
  min-height: 60px;
  padding: 10px;
  position: fixed;
  text-align: justify;
  width: 100%;
  z-index: 1000;

  @media ${device.laptop} {
    padding: 5px 0;
    top: 0;
  }

  ${props => props.type && `
    background-color: ${props.theme.components.alert.type[props.type].bgColor};
  `}

  ${props => props.withBorder && `
    border-bottom: 0;
    border-top: 1px solid ${props.theme.components.alert.type[props.type].bdrColor};

    @media ${device.laptop} {
      border-bottom: 1px solid ${props.theme.components.alert.type[props.type].bdrColor};
      border-top: 0;
    }
  `}
  }
`;

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${cambalache.maxWidth.mobile};

  @media ${device.laptop} {
    width: ${cambalache.maxWidth.laptop};
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
