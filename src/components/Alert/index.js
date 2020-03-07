import Color from 'color';
import { Cross } from 'styled-icons/icomoon';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { device } from '../../styles';

const StyledAlert = styled.div`
  cursor: pointer;
  display: flex;
  font-weight: ${({ theme }) => theme.components.alert.fontWeight};
  justify-content: center;
  min-height: 60px;
  left: 0;
  padding: 10px;
  position: fixed;
  text-align: justify;
  top: 0;
  width: 100%;
  z-index: 1500;

  ${({ type, theme }) => type && `
    background: linear-gradient(
      ${theme.components.alert.type[type].bgColor},
      ${Color(theme.components.alert.type[type].bgColor).darken(0.05)}
    );
    color: ${theme.components.alert.type[type].color};
  `}

  ${({ withBorder, type, theme }) => withBorder && `
    border-bottom: ${theme.components.alert.type[type].border};
  `}
`;

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.components.alert.maxWidth};
  width: ${({ theme }) => theme.components.alert.mobileWidth};

  @media ${device.laptop} {
    width: ${({ theme }) => theme.components.alert.laptopWidth};
  }
`;

const StyledMessage = styled.div`
  margin-right: 20px;
`;

const StyledCrossIcon = styled(Cross)`
  min-width: 22px;
  width: 22px;
`;

const Alert = ({ message, onAlertCloseHandler, ...props }) => (
  <StyledAlert onClick={onAlertCloseHandler} {...props}>
    <StyledWrapper>
      <StyledMessage>
        {message.id
          ? (
            <FormattedHTMLMessage
              id={message.id}
              values={message.values}
            />
          ) : message
        }
      </StyledMessage>

      <StyledCrossIcon />
    </StyledWrapper>
  </StyledAlert>
);

Alert.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  onAlertCloseHandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  withBorder: PropTypes.bool,
};

Alert.defaultProps = {
  withBorder: false,
};

export default Alert;
