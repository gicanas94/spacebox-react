import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Button from '../../Button';
import { ROUTES } from '../../../constants';
import { withFirebase } from '../../../Firebase';

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`;

const StyledSignOutButtonWrapper = styled.div`
  width: 100%;
`;

const Links = ({ authUser, firebase, onLinkClickHandler }) => (
  <Fragment>
    <CommonLinks onLinkClickHandler={onLinkClickHandler} />

    {authUser
      ? (
        <AuthLinks
          authUser={authUser}
          firebase={firebase}
          onLinkClickHandler={onLinkClickHandler}
        />
      ) : <NonAuthLinks onLinkClickHandler={onLinkClickHandler} />
    }
  </Fragment>
);

const CommonLinks = ({ onLinkClickHandler }) => (
  <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.HOME}>
    <Button color="punch" fullWidth noBorder rounded size="small">HOME</Button>
  </StyledLink>
);

const AuthLinks = ({ authUser, firebase, onLinkClickHandler }) => (
  <Fragment>
    {!authUser.isSpaceboxOwner && (
      <StyledLink
        onClick={() => onLinkClickHandler(false)}
        to={ROUTES.CREATE_SPACEBOX}
      >
        <Button
          color="emerald"
          fullWidth
          rounded
          size="small"
        >
          {'Create Spacebox'}
        </Button>
      </StyledLink>
    )}

    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.ACCOUNT}>
      <Button color="flax" fullWidth noBorder rounded size="small">Account</Button>
    </StyledLink>

    {authUser.isAdmin && (
      <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.ADMIN}>
        <Button color="flax" fullWidth noBorder rounded size="small">Admin</Button>
      </StyledLink>
    )}

    <StyledSignOutButtonWrapper onClick={() => onLinkClickHandler(false)}>
      <Button
        color="salmon"
        fullWidth
        onClick={firebase.doSignOut}
        noBorder
        rounded
        size="small"
      >
        {'Sign out'}
      </Button>
    </StyledSignOutButtonWrapper>

  </Fragment>
);

const NonAuthLinks = ({ onLinkClickHandler }) => (
  <Fragment>
    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.FAQ}>
      <Button color="flax" fullWidth noBorder rounded size="small">WT#?</Button>
    </StyledLink>

    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.SIGN_UP}>
      <Button color="tea" fullWidth rounded size="small">Sign up</Button>
    </StyledLink>

    <StyledLink onClick={() => onLinkClickHandler(false)} to={ROUTES.SIGN_IN}>
      <Button color="emerald" fullWidth rounded size="small">Sign in</Button>
    </StyledLink>
  </Fragment>
);

Links.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

Links.defaultProps = {
  authUser: null,
};

CommonLinks.propTypes = {
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthLinks.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthLinks.defaultProps = {
  authUser: null,
};

NonAuthLinks.propTypes = {
  onLinkClickHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

export default compose(
  connect(mapStateToProps),
  withFirebase,
)(Links);
