import { Cross } from 'styled-icons/icomoon/Cross';
import { Link } from 'react-router-dom';
import { Menu } from 'styled-icons/boxicons-regular/Menu';
import React, { useState } from 'react';
import styled from 'styled-components';

import { cambalache, device } from '../../styles';
import largeLogo from '../../assets/images/logo-with-name.png';
import Links from './Links';
import { ROUTES } from '../../constants';
import smallLogo from '../../assets/images/logo.png';

const StyledWrapper = styled.div`
  background-color: ${props => props.theme.components.header.bgColor};
  color: ${props => props.theme.components.header.color};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 500;
`;

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 10px;
  width: ${cambalache.maxWidth.mobile};

  img {
    height: 40px;
  }

  @media ${device.laptop} {
    padding: 10px 0;
    width: ${cambalache.maxWidth.laptop};

    img {
      height: 30px;
    }
  }
`;

const StyledSmallLogoLink = styled(Link)`
  line-height: 0;
  z-index: 600;

  @media ${device.laptop} {
    display: none;
  }
`;

const StyledLargeLogoLink = styled(Link)`
  display: none;
  line-height: 0;

  @media ${device.laptop} {
    display: block;
    margin-right: 25px;
  }
`;

const StyledOverlay = styled.div`
  align-items: center;
  background-color: ${props => props.theme.components.header.bgColor};
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

  @media ${device.laptop} {
    display: none;
  }
`;

const StyledMenuIcon = styled(Menu)`
  width: 40px;

  @media ${device.laptop} {
    display: none;
  }
`;

const StyledLaptopViewNav = styled.nav`
  display: none;

  @media ${device.laptop} {
    display: flex;

    > * {
      margin-right: 25px;
    }

    > *:last-child {
      margin-right: 0;
    }
  }
`;

const Header = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledSmallLogoLink to={ROUTES.HOME}>
          <img alt="Spacebox logo" src={smallLogo} />
        </StyledSmallLogoLink>

        <StyledLargeLogoLink to={ROUTES.HOME}>
          <img alt="Spacebox logo" src={largeLogo} />
        </StyledLargeLogoLink>

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

        <StyledLaptopViewNav>
          <Links onLinkClickHandler={setMobileNavIsOpen} />
        </StyledLaptopViewNav>
      </StyledHeader>
    </StyledWrapper>
  );
};

export default Header;
