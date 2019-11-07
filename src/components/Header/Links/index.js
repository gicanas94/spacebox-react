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
  firebase,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <CommonLinks location={location} onLinkClickHandler={onLinkClickHandler} />

    {authUser
      ? (
        <AuthLinks
          authUser={authUser}
          firebase={firebase}
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      ) : (
        <NonAuthLinks
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      )
    }
  </Fragment>
);

const CommonLinks = ({ location, onLinkClickHandler }) => (
  <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.HOME}>
    <Button
      color="punch"
      fullWidth
      rounded
      size="small"
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
  authUser,
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
        size="small"
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
        size="small"
        styleType={location.pathname.startsWith(ROUTES.ACCOUNT_BASE)
          ? 'filled'
          : 'unbordered'
        }
        type="button"
      >
        {'components.header.links.account'}
      </Button>
    </StyledLink>

    {authUser.isAdmin && (
      <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.ADMIN}>
        <Button
          color="helio"
          fullWidth
          rounded
          size="small"
          styleType={location.pathname === ROUTES.ADMIN
            ? 'filled'
            : 'unbordered'
          }
          type="button"
        >
          {'components.header.links.admin'}
        </Button>
      </StyledLink>
    )}

    <StyledSignOutButtonWrapper onClick={() => onLinkClickHandler(false)}>
      <Button
        color="salmon"
        fullWidth
        onClick={firebase.doSignOut}
        rounded
        size="small"
        styleType="unbordered"
        type="button"
      >
        {'components.header.links.signOut'}
      </Button>
    </StyledSignOutButtonWrapper>

  </Fragment>
);

const NonAuthLinks = ({ location, onLinkClickHandler }) => (
  <Fragment>
    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.FAQ}>
      <Button
        color="flax"
        fullWidth
        rounded
        size="small"
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
        size="small"
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
        size="small"
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
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

Links.defaultProps = {
  authUser: null,
};

CommonLinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthLinks.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthLinks.defaultProps = {
  authUser: null,
};

NonAuthLinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withRouter,
)(Links);
