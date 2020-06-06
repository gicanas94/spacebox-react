import { connect } from 'react-redux';
import { Cross } from 'styled-icons/icomoon';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'styled-icons/remix-fill';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';
import { useIntl } from 'react-intl';

import { appThemeSet } from '../../redux/actions';

import { device, keyframe, transition, transitionProps } from '../../styles';

import largeLogo from '../../assets/images/logo-with-name.png';
import Nav from './Nav';
import { ROUTES } from '../../constants';
import SearchBar from './SearchBar';
import smallLogo from '../../assets/images/logo.png';
// import themes from '../../styles/themes';

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.components.header.bgColor};
  color: ${({ theme }) => theme.components.header.color};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1100;
`;

const StyledHeader = styled.header`
  margin: auto;
  max-width: ${({ theme }) => theme.components.header.maxWidth};
  padding: 10px;
  width: ${({ theme }) => theme.components.header.mobileWidth};

  @media ${device.laptop} {
    padding: 10px 0;
    width: ${({ theme }) => theme.components.header.laptopWidth};
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

const StyledLogoLink = styled(Link)`
  cursor: pointer;
  line-height: 0;
  user-select: none;
`;

const StyledSmallLogoLink = styled(StyledLogoLink)`
  margin-right: 10px;
  z-index: 1200;
`;

const StyledOverlay = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.header.bgColor};
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
    height: 25px;
  }

  @media ${device.laptop} {
    display: flex;
  }
`;

const StyledLargeLogoLink = styled(StyledLogoLink)`
  // animation: ${keyframe.float(['1px', '-2px'])} ${
  transition.speed.ultraslow
} ease-in-out infinite;
  margin-right: 25px;
`;

const StyledLaptopViewSearchBarWrapper = styled.div`
  margin-right: 25px;
`;

const StyledLaptopViewNav = styled.nav`
  display: flex;
`;

const StyledLaptopViewNavElementsWrapper = styled.div`
  display: flex;

  a {
    margin-right: 25px;
    width: fit-content;
  }

  a:last-child {
    margin-right: 0;
  }
`;

const Header = ({ /* appTheme, appThemeSetAction, */ authUser }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const intl = useIntl();
  const location = useLocation();

  // const handleLogoClick = () => {
  //   themes.forEach((theme, index) => {
  //     if (theme.name === appTheme.name) {
  //       if (themes[index + 1]) {
  //         appThemeSetAction(themes[index + 1]);
  //       } else if (themes[index - 1]) {
  //         appThemeSetAction(themes[index - 1]);
  //       } else {
  //         appThemeSetAction(themes[index]);
  //       }
  //     }
  //   });
  // };

  useEffect(() => {
    if (mobileNavIsOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    }

    if (!mobileNavIsOpen) {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [mobileNavIsOpen]);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledMobileView>
          <StyledSpan>
            <StyledSmallLogoLink to={ROUTES.HOME}>
              <img
                alt={intl.formatMessage({
                  id: 'components.header.logoImageAlt',
                })}
                src={smallLogo}
              />
            </StyledSmallLogoLink>

            {location.pathname === '/' && <SearchBar intl={intl} />}
          </StyledSpan>

          <Transition
            items={mobileNavIsOpen}
            {...transitionProps.components.header.mobileNav}
          >
            {(navIsOpen) =>
              navIsOpen &&
              ((styleProps) => (
                <StyledOverlay style={styleProps}>
                  <StyledCloserOnClick
                    onClick={() => setMobileNavIsOpen(false)}
                  />
                  <StyledCrossIcon onClick={() => setMobileNavIsOpen(false)} />

                  <StyledMobileViewNav>
                    <Nav
                      authUser={authUser}
                      buttonsPadding="10px 40px"
                      buttonsSize="headerOnMobile"
                      onNavItemClickHandler={setMobileNavIsOpen}
                    />
                  </StyledMobileViewNav>
                </StyledOverlay>
              ))
            }
          </Transition>

          {!mobileNavIsOpen && (
            <StyledMenuIcon onClick={() => setMobileNavIsOpen(true)} />
          )}
        </StyledMobileView>

        <StyledLaptopView>
          <StyledLargeLogoLink to={ROUTES.HOME}>
            <img
              alt={intl.formatMessage({
                id: 'components.header.logoImageAlt',
              })}
              src={largeLogo}
            />
          </StyledLargeLogoLink>

          <StyledLaptopViewNav>
            {location.pathname === '/' && (
              <StyledLaptopViewSearchBarWrapper>
                <SearchBar intl={intl} rounded />
              </StyledLaptopViewSearchBarWrapper>
            )}

            <StyledLaptopViewNavElementsWrapper>
              <Nav
                authUser={authUser}
                buttonsPadding="0 7px"
                buttonsSize="headerOnLaptop"
                onNavItemClickHandler={setMobileNavIsOpen}
              />
            </StyledLaptopViewNavElementsWrapper>
          </StyledLaptopViewNav>
        </StyledLaptopView>
      </StyledHeader>
    </StyledWrapper>
  );
};

Header.propTypes = {
  // appTheme: PropTypes.oneOfType([PropTypes.any]).isRequired,
  // appThemeSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  authUser: state.authUser,
});

const mapDispatchToProps = { appThemeSetAction: appThemeSet };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
