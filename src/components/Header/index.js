import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Cross } from 'styled-icons/icomoon';
import { Menu } from 'styled-icons/boxicons-regular';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { appThemeSet } from '../../Redux/actions';
import { device, keyframe, transition } from '../../styles';
import largeLogo from '../../assets/images/logo-with-name.png';
import Nav from './Nav';
import SearchBar from './SearchBar';
import smallLogo from '../../assets/images/logo.png';
import themes from '../../styles/themes';

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

const StyledSmallLogoImg = styled.img`
  cursor: pointer;
  line-height: 0;
  margin-right: 10px;
  user-select: none;
  transition: all ${transition.speed.superfast} linear;
  z-index: 1200;

  &:active {
    transform: translateY(2px);
  }
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
    height: 30px;
  }

  @media ${device.laptop} {
    display: flex;
  }
`;

const StyledLargeLogoImg = styled.img`
  animation: ${keyframe.float(['1px', '-2px'])} ${transition.speed.ultraslow} ease-in-out infinite;
  cursor: pointer;
  line-height: 0;
  margin-right: 25px;
  user-select: none;
  transition: all ${transition.speed.superfast} linear;

  &:active {
    animation: none;
    transform: translateY(2px);
  }
`;

const StyledLaptopViewSearchBarWrapper = styled.div`
  margin-right: 25px;
`;

const StyledLaptopViewNav = styled.nav`
  display: flex;
`;

const StyledLaptopViewNavElementsWrapper = styled.div`
  display: flex;

  button {
    margin-right: 25px;
    width: fit-content;
  }

  button:last-child {
    margin-right: 0;
  }
`;

const Header = ({
  appTheme,
  appThemeSetAction,
  authUser,
  history,
  location,
}) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const intl = useIntl();

  const handleOnLogoClick = () => {
    themes.forEach((theme, index) => {
      if (theme.name === appTheme.name) {
        if (themes[index + 1]) {
          appThemeSetAction(themes[index + 1]);
        } else if (themes[index - 1]) {
          appThemeSetAction(themes[index - 1]);
        } else {
          appThemeSetAction(themes[index]);
        }
      }
    });
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledMobileView>
          <StyledSpan>
            <StyledSmallLogoImg
              alt={intl.formatMessage({
                id: 'components.header.logoImageAlt',
              })}
              onClick={() => handleOnLogoClick()}
              src={smallLogo}
            />

            {location.pathname === '/' && <SearchBar intl={intl} />}
          </StyledSpan>

          <Transition
            items={mobileNavIsOpen}
            from={{ marginTop: `-${window.screen.height}px` }}
            enter={{ marginTop: '0' }}
            leave={{ marginTop: `-${window.screen.height}px` }}
            config={{ mass: 1, tension: 600, friction: 42 }}
          >
            {navIsOpen => navIsOpen && (transitionProps => (
              <StyledOverlay style={transitionProps}>
                <StyledCloserOnClick onClick={() => setMobileNavIsOpen(false)} />
                <StyledCrossIcon onClick={() => setMobileNavIsOpen(false)} />

                <StyledMobileViewNav>
                  <Nav
                    authUser={authUser}
                    buttonsSize="large"
                    history={history}
                    location={location}
                    onLinkClickHandler={setMobileNavIsOpen}
                  />
                </StyledMobileViewNav>
              </StyledOverlay>
            ))}
          </Transition>

          {!mobileNavIsOpen && (
            <StyledMenuIcon onClick={() => setMobileNavIsOpen(true)} />
          )}
        </StyledMobileView>

        <StyledLaptopView>
          <StyledLargeLogoImg
            alt={intl.formatMessage({
              id: 'components.header.logoImageAlt',
            })}
            onClick={() => handleOnLogoClick()}
            src={largeLogo}
          />

          <StyledLaptopViewNav>
            {location.pathname === '/' && (
              <StyledLaptopViewSearchBarWrapper>
                <SearchBar intl={intl} rounded />
              </StyledLaptopViewSearchBarWrapper>
            )}

            <StyledLaptopViewNavElementsWrapper>
              <Nav
                authUser={authUser}
                buttonsSize="small"
                history={history}
                location={location}
                onLinkClickHandler={setMobileNavIsOpen}
              />
            </StyledLaptopViewNavElementsWrapper>
          </StyledLaptopViewNav>
        </StyledLaptopView>
      </StyledHeader>
    </StyledWrapper>
  );
};

Header.propTypes = {
  appTheme: PropTypes.oneOfType([PropTypes.any]).isRequired,
  appThemeSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  appTheme: state.appTheme,
  authUser: state.authUser,
});

const mapDispatchToProps = { appThemeSetAction: appThemeSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Header);
