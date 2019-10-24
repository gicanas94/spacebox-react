import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Button from '../Button';
import { device } from '../../styles';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => (
    theme.components.ConfirmationModal.bgColor
  )};
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 800;
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
  justify-content: space-around;
  margin-top: 60px;

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

const ConfirmationModal = ({
  buttonsText,
  confirmButtonIsDisabled,
  content,
  onCancelHandler,
  onConfirmHandler,
  rounded,
  title,
}) => (
  <StyledWrapper>
    <StyledCloserOnClick onClick={onCancelHandler} />

    <StyledBox rounded={rounded} noBorder>
      <h1>{title}</h1>
      <StyledContent>{content}</StyledContent>

      <StyledButtonsWrapper>
        <Button
          color="abalone"
          onClick={onCancelHandler}
          margin="0 25px 0 0"
          rounded
          styleType="unbordered"
          type="button"
        >
          {buttonsText[0]}
        </Button>

        <Button
          disabled={confirmButtonIsDisabled}
          onClick={onConfirmHandler}
          rounded
          styleType="bordered"
          type="submit"
        >
          {buttonsText[1]}
        </Button>
      </StyledButtonsWrapper>
    </StyledBox>
  </StyledWrapper>
);

ConfirmationModal.propTypes = {
  buttonsText: PropTypes.arrayOf(PropTypes.string),
  confirmButtonIsDisabled: PropTypes.bool,
  content: PropTypes.string.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
  onConfirmHandler: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

ConfirmationModal.defaultProps = {
  buttonsText: ['Cancel', 'Confirm'],
  confirmButtonIsDisabled: false,
  rounded: true,
};

export default ConfirmationModal;