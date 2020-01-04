import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Button from '../Button';
import defaultUserImage from '../../assets/images/default-user-image.png';
import { keyframe, transition } from '../../styles';
import { withFirebase } from '../../Firebase';

const StyledWrapper = styled.div`
  width: ${({ size }) => size};
`;

const StyledActionsWrapper = styled.div`
  background-color: ${({ theme }) => (
    theme.components.userProfileImage.actionsWrapperBgColor
  )};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: opacity ${transition.speed.superfast} linear;
  width: 100%;
  z-index: 100;

  button {
    max-width: 80%;
    margin-bottom: 25px;
  }

  button:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

const StyledFileInput = styled.input`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
`;

const StyledImg = styled.img`
  height: 100%;
  overflow: hidden;
  transition: filter ${transition.speed.superfast} linear;
  width: 100%;
`;

const StyledErrorWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  padding-top: 5px;
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  color: ${({ theme }) => theme.components.userProfileImage.errorMessage.color};
  margin-right: 7px;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.userProfileImage.errorMessage.color};
  font-size: ${({ theme }) => (
    theme.components.userProfileImage.errorMessage.fontSize
  )};
  font-weight: ${({ theme }) => (
    theme.components.userProfileImage.errorMessage.fontWeight
  )};
  padding-top: 5px;
`;

const StyledImageWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.userProfileImage.bgColor};
  // border: ${({ theme }) => theme.components.userProfileImage.border};
  height: ${({ size }) => size};
  position: relative;
  width: ${({ size }) => size};

  &:hover {
    ${StyledActionsWrapper} {
      opacity: 1;
    }

    ${StyledImg} {
      filter: blur(5px);
    }
  }

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};

    ${StyledActionsWrapper} {
      border-radius: ${theme.global.borderRadius};
    }
  `}
`;

const UserProfileImage = ({
  authUserIsTheOwner,
  firebase,
  rounded,
  size,
  src,
}) => {
  const intl = useIntl();

  const [labelText, setLabelText] = useState(intl.formatMessage(
    { id: 'components.userProfileImage.uploadImageButton' },
  ));

  const [fileInputError, setFileInputError] = useState(null);

  const handleFileInputChange = (event) => {
    if (!event.target.files[0].type.includes('image')) {
      setFileInputError('components.userProfileImage.badFileTypeErrorMessage');
    } else if (event.target.files[0].size > 10000000) {
      setFileInputError('components.userProfileImage.badFileSizeErrorMessage');
    } else {
      setLabelText(event.target.files[0].name);

      const storageRef = firebase.storage.ref('user-profile-images/test');
      storageRef.put(event.target.files[0]);

      storageRef.getDownloadURL().then(url => console.log(url));
    }
  };

  return (
    <StyledWrapper size={size}>
      <StyledImageWrapper
        authUserIsTheOwner={authUserIsTheOwner}
        rounded={rounded}
        size={size}
      >
        {authUserIsTheOwner && (
          <StyledActionsWrapper>
            <Button
              color="emerald"
              dontTranslateChildren
              rounded
              size="large"
              styleType="filled"
              type="button"
            >
              <StyledLabel htmlFor="file">
                {labelText}
              </StyledLabel>
            </Button>

            {src && (
              <Button
                color="salmon"
                rounded
                size="large"
                styleType="unbordered"
                type="button"
              >
                {'components.userProfileImage.removeImageButton'}
              </Button>
            )}

            <StyledFileInput
              accept="image/*"
              id="file"
              name="file"
              onChange={handleFileInputChange}
              type="file"
            />
          </StyledActionsWrapper>
        )}

        <StyledImg
          src={src || defaultUserImage}
          alt={intl.formatMessage(
            { id: 'components.userProfileImage.altImage' },
          )}
        />
      </StyledImageWrapper>

      {fileInputError && (
        <StyledErrorWrapper>
          <StyledErrorIcon />

          <StyledErrorMessage>
            {intl.formatMessage({ id: fileInputError })}
          </StyledErrorMessage>
        </StyledErrorWrapper>
      )}
    </StyledWrapper>
  );
};

UserProfileImage.propTypes = {
  authUserIsTheOwner: PropTypes.bool,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  rounded: PropTypes.bool,
  size: PropTypes.string.isRequired,
  src: PropTypes.string,
};

UserProfileImage.defaultProps = {
  authUserIsTheOwner: false,
  rounded: false,
  src: undefined,
};

export default withFirebase(UserProfileImage);
