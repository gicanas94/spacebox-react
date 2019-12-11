import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Button from '../../Button';
import { ROUTES } from '../../../constants';
import { withFirebase } from '../../../Firebase';

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;

  &:active {
    transform: none;
  }

  &:hover {
    text-decoration: none;
  }
`;

const StyledSignOutButtonWrapper = styled.div`
  width: 100%;
`;

const Links = ({
  authUser,
  buttonsSize,
  firebase,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <CommonLinks
      buttonsSize={buttonsSize}
      location={location}
      onLinkClickHandler={onLinkClickHandler}
    />

    {authUser
      ? (
        <AuthLinks
          authUser={authUser}
          buttonsSize={buttonsSize}
          firebase={firebase}
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      ) : (
        <NonAuthLinks
          buttonsSize={buttonsSize}
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      )
    }
  </Fragment>
);

const CommonLinks = ({ buttonsSize, location, onLinkClickHandler }) => (
  <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.HOME}>
    <Button
      color="punch"
      fullWidth
      rounded
      size={buttonsSize}
      styleType={location.pathname === ROUTES.HOME
        ? 'filled'
        : 'unbordered'
      }
      type="button"
    >
      {'components.header.links.home'}
    </Button>
  </StyledLink>
);

const AuthLinks = ({
  buttonsSize,
  firebase,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <StyledLink
      onClick={() => onLinkClickHandler(false)}
      to={ROUTES.CREATE_SPACEBOX}
    >
      <Button
        color="emerald"
        fullWidth
        rounded
        size={buttonsSize}
        styleType={location.pathname === ROUTES.CREATE_SPACEBOX
          ? 'filled'
          : 'bordered'
        }
        type="button"
      >
        {'components.header.links.createSpacebox'}
      </Button>
    </StyledLink>

    <StyledLink
      onClick={() => onLinkClickHandler(false)}
      to={ROUTES.ACCOUNT_BASE}
    >
      <Button
        color="flax"
        fullWidth
        rounded
        size={buttonsSize}
        styleType={location.pathname.startsWith(ROUTES.ACCOUNT_BASE)
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.account'}
      </Button>
    </StyledLink>

    <StyledSignOutButtonWrapper onClick={() => onLinkClickHandler(false)}>
      <Button
        color="salmon"
        fullWidth
        onClick={firebase.doSignOut}
        rounded
        size={buttonsSize}
        styleType="unbordered"
        type="button"
      >
        {'components.header.links.signOut'}
      </Button>
    </StyledSignOutButtonWrapper>

  </Fragment>
);

const NonAuthLinks = ({ buttonsSize, location, onLinkClickHandler }) => (
  <Fragment>
    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.FAQ}>
      <Button
        color="flax"
        fullWidth
        rounded
        size={buttonsSize}
        styleType={location.pathname === ROUTES.FAQ
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.faq'}
      </Button>
    </StyledLink>

    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.SIGN_UP}>
      <Button
        color="babyBlue"
        fullWidth
        rounded
        size={buttonsSize}
        styleType={location.pathname === ROUTES.SIGN_UP
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.signUp'}
      </Button>
    </StyledLink>

    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.SIGN_IN}>
      <Button
        color="emerald"
        fullWidth
        rounded
        size={buttonsSize}
        styleType={location.pathname === ROUTES.SIGN_IN
          ? 'filled'
          : 'bordered'
        }
        type="button"
      >
        {'components.header.links.signIn'}
      </Button>
    </StyledLink>
  </Fragment>
);

Links.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

CommonLinks.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthLinks.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

NonAuthLinks.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ authUser: state.authUser });

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withRouter,
)(Links);
