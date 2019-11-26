import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { SearchAlt } from 'styled-icons/boxicons-regular/SearchAlt';
import styled from 'styled-components';

import { searchBarChange } from '../../../Redux/actions';
import { transition } from '../../../styles';

const StyledWrapper = styled.div`
  position: relative;
  z-index: 1200;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.components.searchBar.bgColor};
  border: ${({ theme }) => theme.components.searchBar.border};
  color: ${({ theme }) => theme.components.searchBar.color};
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
  color: ${({ theme }) => theme.components.searchBar.searchIcon.color};
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 7px;
  width: 30px;
`;

const SearchBar = ({
  intl,
  searchBarChangeAction,
  spaceboxToSearch,
  ...props
}) => {
  let textInput = null;

  return (
    <StyledWrapper>
      <StyledSearchIcon onClick={() => textInput.focus()} />

      <StyledInput
        onChange={event => searchBarChangeAction(event.target.value)}
        placeholder={
          intl.formatMessage({ id: 'components.header.searchBar.placeholder' })
        }
        ref={(input) => { textInput = input; }}
        type="text"
        value={spaceboxToSearch}
        {...props}
      />
    </StyledWrapper>
  );
};

SearchBar.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  rounded: PropTypes.bool,
  searchBarChangeAction: PropTypes.func.isRequired,
  spaceboxToSearch: PropTypes.string,
};

SearchBar.defaultProps = {
  rounded: false,
  spaceboxToSearch: '',
};

const mapStateToProps = state => ({ spaceboxToSearch: state.spaceboxToSearch });

const mapDispatchToProps = { searchBarChangeAction: searchBarChange };

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
