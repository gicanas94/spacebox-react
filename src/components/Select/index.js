import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown';
import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { keyframe, transition } from '../../styles';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.components.Select.color.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.components.Select.label.fontSize};
  font-weight: ${({ theme }) => theme.components.Select.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transition.speed.superfast} linear;
  white-space: nowrap;
`;

const StyledSimulatedSelect = styled.div`
  background-color: transparent;
  border: 0;
  border-color: ${({ theme }) => theme.components.Select.color.default};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.Select.borderWidth};
  cursor: pointer;
  height: 45px;
  line-height: 45px;
  position: relative;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;
  z-index: 100;

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const StyledSelectedOption = styled.span`
  padding-left: 10px;
  user-select: none;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 92px;
  justify-content: flex-start;
  position: relative;

  ${({ disabled, theme }) => disabled && `
    ${StyledLabel} {
      color: ${theme.components.Select.color.disabled} !important
      cursor: default;
    }

    ${StyledSimulatedSelect} {
      border-color: ${theme.components.Select.color.disabled} !important;
      cursor: default;
    }

    ${StyledSelectedOption} {
      color: ${theme.components.Select.color.disabled} !important
    }
  `}

  ${({ error, theme }) => error && `
    ${StyledLabel} {
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
    ${StyledLabel} {
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
  margin-top: -1px;
  max-height: 225px;
  overflow: auto;
  padding: 0;
  user-select: none;

  ::-webkit-scrollbar {
    width: 5px;
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

const StyledArrowDownIcon = styled(KeyboardArrowDown)`
  position: absolute;
  right: 10px;
  top: 35%;
  width: 30px;
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  color: ${({ theme }) => theme.components.Select.color.error};
  position: absolute;
  right: 40px;
  top: 35%;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.Select.color.error};
  font-size: ${({ theme }) => theme.components.Select.errorMessage.fontSize};
  font-weight: ${({ theme }) => theme.components.Select.errorMessage.fontWeight};
  overflow: hidden;
  padding-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
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

  const closeList = (event) => {
    if (wrapperRef.current.contains(event.target)) return;
    if (listIsOpen) setListIsOpen(!listIsOpen);
  };

  const handleKeydown = event => event.key === 'Escape' && closeList(event);

  const handleOptionClick = (option, event) => {
    setSelectedOption(option);
    setListIsOpen(!listIsOpen);
    onChangeHandler(event.target.textContent);
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
        {label}
      </StyledLabel>

      <StyledSimulatedSelect rounded={rounded}>
        <StyledSpan
          onClick={!disabled ? () => setListIsOpen(!listIsOpen) : null}
        />

        <StyledSelectedOption>{selectedOption || '-'}</StyledSelectedOption>

        {listIsOpen && (
          <StyledUl rounded={rounded}>
            {options.map(option => (
              <StyledLi
                key={option}
                onClick={!disabled
                  ? event => (
                    handleOptionClick(option, event)
                  ) : null
                }
              >
                {option}
              </StyledLi>
            ))}
          </StyledUl>
        )}
      </StyledSimulatedSelect>

      {!disabled && <StyledArrowDownIcon />}
      {!disabled && error && <StyledErrorIcon />}
      {!disabled && error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </StyledWrapper>
  );
};

Select.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: false,
  success: false,
};

export default Select;
