import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown';
import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

class Select extends Component {
  constructor(props) {
    super(props);
    const { value } = this.props;

    this.wrapperRef = React.createRef();

    this.state = {
      listIsOpen: false,
      selectedOption: value,
    };
  }

  componentDidMount() {
    const { disabled } = this.props;

    if (!disabled) {
      document.addEventListener('click', this.closeList);
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeList);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  closeList = (event) => {
    const { listIsOpen } = this.state;

    if (this.wrapperRef.current.contains(event.target)) return;
    if (listIsOpen) this.toggleListIsOpenState();
  }

  handleKeydown = event => event.key === 'Escape' && this.closeList(event);

  handleOptionClick = (value, onChangeHandler, event) => {
    this.setState({ selectedOption: value });
    this.toggleListIsOpenState();
    onChangeHandler(event.target.textContent);
  };

  setListIsOpenState = state => this.setState({ listIsOpen: state });

  toggleListIsOpenState = () => this.setState(
    prevState => ({ listIsOpen: !prevState.listIsOpen }),
  )

  render() {
    const {
      disabled,
      error,
      label,
      margin,
      onChangeHandler,
      options,
      rounded,
      success,
    } = this.props;

    const { listIsOpen, selectedOption } = this.state;

    return (
      <StyledWrapper
        disabled={disabled}
        error={error}
        margin={margin}
        ref={this.wrapperRef}
        success={success}
      >
        <StyledLabel
          onClick={!disabled ? () => this.toggleListIsOpenState() : null}
        >
          {label}
        </StyledLabel>

        <StyledSimulatedSelect rounded={rounded}>
          <StyledSpan
            onClick={!disabled ? () => this.toggleListIsOpenState() : null}
          />

          <StyledSelectedOption>{selectedOption}</StyledSelectedOption>

          {listIsOpen && (
            <StyledUl rounded={rounded}>
              {options.map(option => (
                <StyledLi
                  key={option}
                  onClick={!disabled
                    ? event => (
                      this.handleOptionClick(option, onChangeHandler, event)
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
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  value: '-',
};

export default Select;
