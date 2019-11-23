import _ from 'lodash';
import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { keyframe, transition } from '../../styles';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.components.Select.color.default};
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.components.Select.label.fontSize};
  font-weight: ${({ theme }) => theme.components.Select.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transition.speed.superfast} linear;
  white-space: nowrap;
`;

const StyledSimulatedSelect = styled.div`
  background-color: ${({ theme }) => theme.components.Select.bgColor};
  border: 0;
  border-bottom-width: ${({ theme }) => (
    theme.components.Select.borderBottomWidth
  )};
  border-color: ${({ theme }) => theme.components.Select.color.default};
  border-style: solid;
  cursor: pointer;
  height: 45px;
  line-height: 45px;
  position: relative;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;
  z-index: 100;

  ${({ rounded, theme }) => rounded && `
    border-top-left-radius: ${theme.global.borderRadius};
    border-top-right-radius: ${theme.global.borderRadius};
  `}
`;

const StyledSelectedOption = styled.span`
  padding-left: 10px;
  user-select: none;
`;

const StyledArrowDownIcon = styled(KeyboardArrowDown)`
  color: ${({ theme }) => theme.components.Select.color.default};
  position: absolute;
  right: 10px;
  top: 33px;
  width: 30px;
  z-index: 101;
`;

const StyledWrapper = styled.div`
  position: relative;

  ${({ disabled, theme }) => disabled && `
    ${StyledLabel},
    ${StyledSelectedOption} {
      color: ${theme.components.Select.color.disabled} !important
      cursor: default;
    }

    ${StyledSimulatedSelect} {
      border-color: ${theme.components.Select.color.disabled} !important;
      cursor: default;
    }
  `}

  ${({ error, theme }) => error && `
    ${StyledLabel},
    ${StyledArrowDownIcon} {
      color: ${theme.components.Select.color.error};
    }

    ${StyledSimulatedSelect} {
      border-color: ${theme.components.Select.color.error};
    }
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ success, theme }) => success && `
    ${StyledLabel},
    ${StyledArrowDownIcon} {
      color: ${theme.components.Select.color.success};
    }

    ${StyledSimulatedSelect} {
      border-color: ${theme.components.Select.color.success};
    }
  `}
`;

const StyledSpan = styled.span`
  height: 45px;
  position: absolute;
  width: 100%;
`;

const StyledUl = styled.ul`
  background-color: ${({ theme }) => theme.components.Select.ul.bgColor};
  box-shadow: ${({ theme }) => theme.components.Select.ul.boxShadow};
  list-style: none;
  margin: 0;
  margin-top: 0.5px;
  max-height: 225px;
  overflow: auto;
  padding: 0;
  user-select: none;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => (
      theme.components.Select.ul.scrollBar.thumb.bgColor
    )};
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => (
      theme.components.Select.ul.scrollBar.track.bgColor
    )};
  }

  ${({ rounded, theme }) => rounded && `
    border-bottom-left-radius: ${theme.global.borderRadius};
    border-bottom-right-radius: ${theme.global.borderRadius};

    ::-webkit-scrollbar-track {
      border-bottom-right-radius: ${theme.global.borderRadius};
    }
  `}
`;

const StyledLi = styled.li`
  height: 45px;
  line-height: 45px;
  padding-left: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.components.Select.li.hoverColor};
  }
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  color: ${({ theme }) => theme.components.Select.color.error};
  position: absolute;
  right: 40px;
  top: 33px;
  width: 30px;
  z-index: 101;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.Select.color.error};
  font-size: ${({ theme }) => theme.components.Select.errorMessage.fontSize};
  font-weight: ${({ theme }) => theme.components.Select.errorMessage.fontWeight};
  padding-top: 5px;
`;

const Select = ({
  disabled,
  error,
  label,
  margin,
  onChangeHandler,
  options,
  rounded,
  success,
  value,
}) => {
  const [listIsOpen, setListIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const wrapperRef = useRef();
  const intl = useIntl();

  const translatedOptions = options.map(
    option => ({
      category: intl.formatMessage({ id: option.messageId }),
      index: option.index,
    }),
  );

  const closeList = (event) => {
    if (wrapperRef.current.contains(event.target)) return;
    if (listIsOpen) setListIsOpen(!listIsOpen);
  };

  const handleKeydown = event => event.key === 'Escape' && closeList(event);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(options[optionIndex].messageId);
    setListIsOpen(!listIsOpen);
    onChangeHandler(options[optionIndex].messageId);
  };

  useEffect(() => {
    if (!disabled) {
      document.addEventListener('click', closeList);
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      if (!disabled) {
        document.removeEventListener('click', closeList);
        document.removeEventListener('keydown', handleKeydown);
      }
    };
  });

  return (
    <StyledWrapper
      disabled={disabled}
      error={error}
      margin={margin}
      ref={wrapperRef}
      success={success}
    >
      <StyledLabel
        onClick={!disabled ? () => setListIsOpen(!listIsOpen) : null}
      >
        {intl.formatMessage({ id: label })}
      </StyledLabel>

      <StyledSimulatedSelect rounded={rounded}>
        <StyledSpan
          onClick={!disabled ? () => setListIsOpen(!listIsOpen) : null}
        />

        <StyledSelectedOption>
          {selectedOption
            ? intl.formatMessage({ id: selectedOption })
            : '-'
          }
        </StyledSelectedOption>

        {listIsOpen && (
          <StyledUl rounded={rounded}>
            {_.sortBy(
              translatedOptions,
              translatedOption => translatedOption.category,
            ).map(option => (
              <StyledLi
                key={option.index}
                onClick={!disabled ? () => handleOptionClick(option.index) : null}
              >
                {option.category}
              </StyledLi>
            ))}
          </StyledUl>
        )}
      </StyledSimulatedSelect>

      {!disabled && <StyledArrowDownIcon />}
      {!disabled && error && <StyledErrorIcon />}
      {!disabled && error && (
        <StyledErrorMessage>
          {intl.formatMessage({ id: error })}
        </StyledErrorMessage>
      )}
    </StyledWrapper>
  );
};

Select.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
  value: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: false,
  success: false,
  value: null,
};

export default Select;
