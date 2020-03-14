import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Button from '../../Button';
import { ROUTES } from '../../../constants';
import { withFirebase } from '../../../Firebase';

const StyledNavItem = styled(Link)`
  text-decoration: none !important;
  transform: none !important;
`;

const Nav = ({
  authUser,
  buttonsPadding,
  buttonsSize,
  firebase,
  location,
  onNavItemClickHandler,
}) => (
  <Fragment>
    <CommonNav
      buttonsPadding={buttonsPadding}
      buttonsSize={buttonsSize}
      location={location}
      onNavItemClickHandler={onNavItemClickHandler}
    />

    {authUser
      ? (
        <AuthNav
          authUser={authUser}
          buttonsPadding={buttonsPadding}
          buttonsSize={buttonsSize}
          firebase={firebase}
          location={location}
          onNavItemClickHandler={onNavItemClickHandler}
        />
      ) : (
        <NonAuthNav
          buttonsPadding={buttonsPadding}
          buttonsSize={buttonsSize}
          location={location}
          onNavItemClickHandler={onNavItemClickHandler}
        />
      )
    }
  </Fragment>
);

const CommonNav = ({
  buttonsPadding,
  buttonsSize,
  location,
  onNavItemClickHandler,
}) => (
  <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.HOME}>
    <Button
      color="punch"
      fullWidth
      padding={buttonsPadding}
      size={buttonsSize}
      styleType={location.pathname === ROUTES.HOME
        ? 'filled'
        : 'unbordered'
      }
      type="button"
    >
      {'components.header.links.home'}
    </Button>
  </StyledNavItem>
);

const AuthNav = ({
  buttonsPadding,
  buttonsSize,
  firebase,
  location,
  onNavItemClickHandler,
}) => (
  <Fragment>
    <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.CREATE_SPACEBOX}>
      <Button
        color="emerald"
        fullWidth
        padding={buttonsPadding}
        size={buttonsSize}
        styleType={location.pathname === ROUTES.CREATE_SPACEBOX
          ? 'filled'
          : 'bordered'
        }
        type="button"
      >
        {'components.header.links.createSpacebox'}
      </Button>
    </StyledNavItem>

    <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.ACCOUNT_BASE}>
      <Button
        color="flax"
        fullWidth
        padding={buttonsPadding}
        size={buttonsSize}
        styleType={location.pathname.startsWith(ROUTES.ACCOUNT_BASE)
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.account'}
      </Button>
    </StyledNavItem>

    <Button
      color="salmon"
      fullWidth
      onClick={() => {
        firebase.doSignOut();
        onNavItemClickHandler(false);
      }}
      padding={buttonsPadding}
      size={buttonsSize}
      styleType="unbordered"
      type="button"
    >
      {'components.header.links.signOut'}
    </Button>
  </Fragment>
);

const NonAuthNav = ({
  buttonsPadding,
  buttonsSize,
  location,
  onNavItemClickHandler,
}) => (
  <Fragment>
    <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.FAQ}>
      <Button
        color="flax"
        fullWidth
        padding={buttonsPadding}
        size={buttonsSize}
        styleType={location.pathname === ROUTES.FAQ
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.faq'}
      </Button>
    </StyledNavItem>

    <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.SIGN_UP}>
      <Button
        color="babyBlue"
        fullWidth
        padding={buttonsPadding}
        size={buttonsSize}
        styleType={location.pathname === ROUTES.SIGN_UP
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.signUp'}
      </Button>
    </StyledNavItem>

    <StyledNavItem onClick={() => onNavItemClickHandler(false)} to={ROUTES.SIGN_IN}>
      <Button
        color="emerald"
        fullWidth
        padding={buttonsPadding}
        size={buttonsSize}
        styleType={location.pathname === ROUTES.SIGN_IN
          ? 'filled'
          : 'bordered'
        }
        type="button"
      >
        {'components.header.links.signIn'}
      </Button>
    </StyledNavItem>
  </Fragment>
);

Nav.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  buttonsPadding: PropTypes.string,
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onNavItemClickHandler: PropTypes.func.isRequired,
};

CommonNav.propTypes = {
  buttonsPadding: PropTypes.string,
  buttonsSize: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onNavItemClickHandler: PropTypes.func.isRequired,
};

AuthNav.propTypes = {
  buttonsPadding: PropTypes.string,
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onNavItemClickHandler: PropTypes.func.isRequired,
};

NonAuthNav.propTypes = {
  buttonsPadding: PropTypes.string,
  buttonsSize: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onNavItemClickHandler: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  buttonsPadding: undefined,
};

CommonNav.defaultProps = {
  buttonsPadding: undefined,
};

AuthNav.defaultProps = {
  buttonsPadding: undefined,
};

NonAuthNav.defaultProps = {
  buttonsPadding: undefined,
};

export default withFirebase(Nav);
