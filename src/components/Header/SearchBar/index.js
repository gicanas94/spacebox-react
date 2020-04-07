import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { SearchAlt } from 'styled-icons/boxicons-regular';
import styled from 'styled-components';

import { device, transition } from '../../../styles';
import { searchBarChange } from '../../../Redux/actions';

const StyledWrapper = styled.div`
  height: auto;
  position: relative;
  z-index: 1200;

  @media ${device.laptop} {
    height: 100%;
  }
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.components.header.searchBar.bgColor};
  border: ${({ theme }) => theme.components.header.searchBar.border};
  color: ${({ theme }) => theme.components.header.searchBar.color};
  height: 100%;
  padding: 5px 35px 0 7px;
  transition: width ${transition.speed.fast} linear;
  width: 140px;

  &:focus {
    outline: none;
    width: 210px;
  }

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const StyledSearchIcon = styled(SearchAlt)`
  color: ${({ theme }) => theme.components.header.searchBar.searchIcon.color};
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 7px;
  width: 30px;

  @media ${device.laptop} {
    right: 10px;
    top: 6px;
    width: 25px;
  }
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
