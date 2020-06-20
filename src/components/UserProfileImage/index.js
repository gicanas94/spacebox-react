import { ErrorOutline } from 'styled-icons/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Button from '../Button';
import defaultUserImage from '../../assets/images/default-user-image.png';
import { devices, keyframes, transitions } from '../../styles';

const StyledWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const StyledActionsWrapper = styled.div`
  background-color: ${({ theme }) =>
    theme.components.userProfileImage.actionsWrapperBgColor};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  opacity: 1;
  position: absolute;
  transition: opacity ${transitions.speed.superfast} linear;
  width: 100%;
  z-index: 100;

  @media ${devices.laptop} {
    opacity: 0;
  }

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
  position: absolute;
  width: 0.1px;
  z-index: -1;
`;

const StyledImg = styled.img`
  height: 100%;
  transition: filter ${transitions.speed.superfast} linear;
  width: 100%;

  @media ${devices.laptop} {
    filter: none;
  }
`;

const StyledErrorWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  padding-top: 5px;
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transitions.speed.normal} infinite ${keyframes.beat(1.1)};
  color: ${({ theme }) => theme.components.userProfileImage.errorMessage.color};
  margin-right: 7px;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.userProfileImage.errorMessage.color};
  font-size: ${({ theme }) =>
    theme.components.userProfileImage.errorMessage.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.userProfileImage.errorMessage.fontWeight};
  padding-top: 5px;
`;

const StyledImageWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.userProfileImage.bgColor};
  // border: ${({ theme }) => theme.components.userProfileImage.border};
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;

  @media ${devices.laptop} {
    &:hover {
      ${StyledActionsWrapper} {
        opacity: 1;
      }

      ${StyledImg} {
        filter: ${({ theme }) => theme.components.userProfileImage.filter};
      }
    }
  }

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};

    ${StyledActionsWrapper} {
      border-radius: ${theme.global.borderRadius};
    }

    ${StyledImg} {
      border-radius: ${theme.global.borderRadius};
    }
  `}
`;

const UserProfileImage = ({
  alertSetAction,
  authUser,
  firebase,
  isLoadingSetAction,
  rounded,
}) => {
  const intl = useIntl();
  const [fileInputError, setFileInputError] = useState(null);

  const uploadImageAndUpdateUser = async (image) => {
    try {
      isLoadingSetAction(true);
      const storageRef = firebase.storage.ref(
        `user-profile-images/${authUser.uid}`,
      );
      await storageRef.put(image);
      const imageUrl = await storageRef.getDownloadURL();
      await firebase.user(authUser.uid).update({ profileImageUrl: imageUrl });
    } catch (error) {
      alertSetAction({
        message: error.message,
        type: 'danger',
      });
    } finally {
      isLoadingSetAction(false);
    }
  };

  const removeImageAndUpdateUser = async () => {
    try {
      isLoadingSetAction(true);
      await firebase.user(authUser.uid).update({ profileImageUrl: null });
      const storageRef = firebase.storage.ref(
        `user-profile-images/${authUser.uid}`,
      );
      await storageRef.delete();
    } catch (error) {
      if (error.code !== 'storage/object-not-found') {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      }
    } finally {
      isLoadingSetAction(false);
    }
  };

  const handleFileInputChange = (event) => {
    if (!event.target.files[0].type.includes('image')) {
      setFileInputError('components.userProfileImage.badFileTypeErrorMessage');
    } else if (event.target.files[0].size > 10000000) {
      setFileInputError('components.userProfileImage.badFileSizeErrorMessage');
    } else {
      uploadImageAndUpdateUser(event.target.files[0]);
    }
  };

  return (
    <StyledWrapper>
      <StyledImageWrapper authUser={authUser} rounded={rounded}>
        <StyledActionsWrapper>
          <Button
            color="emerald"
            dontTranslateChildren
            size="large"
            styleType="bordered"
            type="button"
          >
            <StyledLabel htmlFor="file">
              {intl.formatMessage({
                id: authUser.profileImageUrl
                  ? 'components.userProfileImage.changeImageButton'
                  : 'components.userProfileImage.uploadNewImageButton',
              })}
            </StyledLabel>
          </Button>

          {authUser.profileImageUrl && (
            <Button
              color="salmon"
              onClick={removeImageAndUpdateUser}
              size="large"
              styleType="unbordered"
              type="button"
            >
              components.userProfileImage.removeImageButton
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

        <StyledImg
          alt={intl.formatMessage({
            id: 'components.userProfileImage.altImage',
          })}
          src={authUser.profileImageUrl || defaultUserImage}
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
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
};

UserProfileImage.defaultProps = {
  rounded: false,
};

export default UserProfileImage;
