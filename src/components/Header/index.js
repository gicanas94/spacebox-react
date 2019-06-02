import { Cross } from 'styled-icons/icomoon/Cross';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'styled-icons/boxicons-regular/Menu';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { device } from '../../styles';
import largeLogo from '../../assets/images/logo-with-name.png';
import Links from './Links';
import { ROUTES } from '../../constants';
import SearchBar from './SearchBar';
import smallLogo from '../../assets/images/logo.png';

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.Header.bgColor};
  color: ${({ theme }) => theme.components.Header.color};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 500;
`;

const StyledHeader = styled.header`
  margin: auto;
  max-width: ${({ theme }) => theme.components.Header.maxWidth};
  padding: 10px;
  width: ${({ theme }) => theme.components.Header.mobileWidth};

  @media ${device.laptop} {
    padding: 10px 0;
    width: ${({ theme }) => theme.components.Header.laptopWidth};
  }
`;

const StyledMobileView = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  img {
    height: 40px;
  }

  @media ${device.laptop} {
    display: none;
  }
`;

const StyledSpan = styled.span`
  display: flex;
`;

const StyledSmallLogoLink = styled(Link)`
  line-height: 0;
  margin-right: 10px;
  user-select: none;
  z-index: 600;
`;

const StyledOverlay = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.Header.bgColor};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;

  @media ${device.laptop} {
    display: none;
  }
`;

const StyledCloserOnClick = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const StyledCrossIcon = styled(Cross)`
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
`;

const StyledMobileViewNav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 185px;

  > * {
    margin-bottom: 30px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledMenuIcon = styled(Menu)`
  cursor: pointer;
  width: 40px;
`;

const StyledLaptopView = styled.div`
  align-items: center;
  display: none;
  justify-content: space-between;

  img {
    height: 30px;
  }

  @media ${device.laptop} {
    display: flex;
  }
`;

const StyledLargeLogoLink = styled(Link)`
  line-height: 0;
  margin-right: 25px;
  user-select: none;
`;

const StyledLaptopViewNav = styled.nav`
  display: flex;

  > * {
    margin-right: 25px;
  }

  > *:last-child {
    margin-right: 0;
  }
`;

const Header = ({ history }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledMobileView>
          <StyledSpan>
            <StyledSmallLogoLink
              onClick={() => setMobileNavIsOpen(false)}
              to={ROUTES.HOME}
            >
              <img alt="Spacebox logo" src={smallLogo} />
            </StyledSmallLogoLink>

            {history.location.pathname === '/' && <SearchBar />}
          </StyledSpan>

          {mobileNavIsOpen
            ? (
              <StyledOverlay>
                <StyledCloserOnClick onClick={() => setMobileNavIsOpen(false)} />
                <StyledCrossIcon onClick={() => setMobileNavIsOpen(false)} />

                <StyledMobileViewNav>
                  <Links onLinkClickHandler={setMobileNavIsOpen} />
                </StyledMobileViewNav>
              </StyledOverlay>
            )
            : <StyledMenuIcon onClick={() => setMobileNavIsOpen(true)} />
          }
        </StyledMobileView>

        <StyledLaptopView>
          <StyledLargeLogoLink to={ROUTES.HOME}>
            <img alt="Spacebox logo" src={largeLogo} />
          </StyledLargeLogoLink>

          <StyledLaptopViewNav>
            <Links onLinkClickHandler={setMobileNavIsOpen} />

            {history.location.pathname === '/' && <SearchBar rounded />}
          </StyledLaptopViewNav>
        </StyledLaptopView>
      </StyledHeader>
    </StyledWrapper>
  );
};

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Header);
