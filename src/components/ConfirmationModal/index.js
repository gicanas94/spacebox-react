import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Button from '../Button';
import { device } from '../../styles';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => (
    theme.components.ConfirmationModal.bgColor1
  )};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1300;

  @media ${device.mobileL} {
    background-color: ${({ theme }) => (
      theme.components.ConfirmationModal.bgColor2
    )};
  }
`;

const StyledCloserOnClick = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const StyledBox = styled(Box)`
  width: 90%;

  @media ${device.tablet} {
    width: 400px;
  }
`;

const StyledContent = styled.p`
  margin-bottom: 0;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 60px;

  button {
    width: 100%;
  }

  button:last-of-type {
    margin-bottom: 25px;
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      width: fit-content;
    }

    button:last-of-type {
      margin-bottom: 0;
    }
  }

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

const ConfirmationModal = ({
  buttonsAreDisabled,
  buttonsContent,
  content,
  onCancelHandler,
  onConfirmHandler,
  rounded,
  title,
}) => (
  <StyledWrapper>
    <StyledCloserOnClick onClick={onCancelHandler} />

    <StyledBox rounded={rounded} noBorder>
      <h1>
        <FormattedMessage id={title} />
      </h1>

      <StyledContent>
        <FormattedMessage id={content} />
      </StyledContent>

      <StyledButtonsWrapper>
        <Button
          color="abalone"
          disabled={buttonsAreDisabled}
          onClick={onCancelHandler}
          rounded
          styleType="unbordered"
          type="button"
        >
          {buttonsContent[0]}
        </Button>

        <Button
          disabled={buttonsAreDisabled}
          onClick={onConfirmHandler}
          rounded
          styleType="bordered"
          type="submit"
        >
          {buttonsContent[1]}
        </Button>
      </StyledButtonsWrapper>
    </StyledBox>
  </StyledWrapper>
);

ConfirmationModal.propTypes = {
  buttonsAreDisabled: PropTypes.bool,
  buttonsContent: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.string.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
  onConfirmHandler: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

ConfirmationModal.defaultProps = {
  buttonsAreDisabled: false,
  buttonsContent: [
    'components.confirmationModal.buttons.defaultCancel',
    'components.confirmationModal.buttons.defaultConfirm',
  ],
  rounded: true,
};

export default ConfirmationModal;
