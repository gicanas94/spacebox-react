import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { SearchAlt } from 'styled-icons/boxicons-regular/SearchAlt';
import styled from 'styled-components';

import { searchBarChange } from '../../../Redux/actions';
import Tooltip from '../../Tooltip';
import { transition } from '../../../styles';

const StyledWrapper = styled.div`
  position: relative;
  z-index: 600;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.components.SearchBar.bgColor};
  border: ${({ theme }) => theme.components.SearchBar.border};
  color: ${({ theme }) => theme.components.SearchBar.color};
  font-size: ${({ theme }) => theme.components.SearchBar.fontSize};
  height: 40px;
  padding: 5px 35px 0 10px;
  transition: width ${transition.speed.fast} linear;
  width: 140px;

  &:focus {
    width: 190px;
    outline: none;
  }

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const StyledSearchIcon = styled(SearchAlt)`
  color: ${({ theme }) => theme.components.SearchBar.searchIconColor};
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 7px;
  width: 30px;
`;

const SearchBar = ({ searchBarChangeAction, ...props }) => {
  let textInput = null;

  return (
    <StyledWrapper>
      <StyledSearchIcon onClick={() => textInput.focus()} />

      <StyledInput
        data-for="search"
        data-tip="Search by name, for example: Best pasta recipes<br>
          Or by category, for example: Poetry"
        onChange={event => searchBarChangeAction(event.target.value)}
        placeholder="Search"
        ref={(input) => { textInput = input; }}
        type="text"
        {...props}
      />

      <Tooltip
        className="search-tooltip"
        effect="solid"
        event="focus"
        eventOff="blur"
        id="search"
        multiline
        place="bottom"
      />
    </StyledWrapper>
  );
};

SearchBar.propTypes = {
  rounded: PropTypes.bool,
  searchBarChangeAction: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  rounded: false,
};

const mapDispatchToProps = { searchBarChangeAction: searchBarChange };

export default connect(null, mapDispatchToProps)(SearchBar);
