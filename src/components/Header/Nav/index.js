import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Button from '../../Button';
import { ROUTES } from '../../../constants';
import { withFirebase } from '../../../Firebase';

const Nav = ({
  authUser,
  buttonsSize,
  firebase,
  history,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <CommonNav
      buttonsSize={buttonsSize}
      history={history}
      location={location}
      onLinkClickHandler={onLinkClickHandler}
    />

    {authUser
      ? (
        <AuthNav
          authUser={authUser}
          buttonsSize={buttonsSize}
          firebase={firebase}
          history={history}
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      ) : (
        <NonAuthNav
          buttonsSize={buttonsSize}
          history={history}
          location={location}
          onLinkClickHandler={onLinkClickHandler}
        />
      )
    }
  </Fragment>
);

const CommonNav = ({
  buttonsSize,
  history,
  location,
  onLinkClickHandler,
}) => (
  <Button
    color="punch"
    fullWidth
    onClick={() => {
      history.push(ROUTES.HOME);
      onLinkClickHandler(false);
    }}
    size={buttonsSize}
    styleType={location.pathname === ROUTES.HOME
      ? 'filled'
      : 'unbordered'
    }
    type="button"
  >
    {'components.header.links.home'}
  </Button>
);

const AuthNav = ({
  buttonsSize,
  firebase,
  history,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <Button
      color="emerald"
      fullWidth
      onClick={() => {
        history.push(ROUTES.CREATE_SPACEBOX);
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType={location.pathname === ROUTES.CREATE_SPACEBOX
        ? 'filled'
        : 'bordered'
      }
      type="button"
    >
      {'components.header.links.createSpacebox'}
    </Button>

    <Button
      color="flax"
      fullWidth
      onClick={() => {
        history.push(ROUTES.ACCOUNT_BASE);
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType={location.pathname.startsWith(ROUTES.ACCOUNT_BASE)
        ? 'filled'
        : 'unbordered'
      }
      type="button"
    >
      {'components.header.links.account'}
    </Button>

    <Button
      color="salmon"
      fullWidth
      onClick={() => {
        firebase.doSignOut();
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType="unbordered"
      type="button"
    >
      {'components.header.links.signOut'}
    </Button>

  </Fragment>
);

const NonAuthNav = ({
  buttonsSize,
  history,
  location,
  onLinkClickHandler,
}) => (
  <Fragment>
    <Button
      color="flax"
      fullWidth
      onClick={() => {
        history.push(ROUTES.FAQ);
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType={location.pathname === ROUTES.FAQ
        ? 'filled'
        : 'unbordered'
      }
      type="button"
    >
      {'components.header.links.faq'}
    </Button>

    <Button
      color="babyBlue"
      fullWidth
      onClick={() => {
        history.push(ROUTES.SIGN_UP);
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType={location.pathname === ROUTES.SIGN_UP
        ? 'filled'
        : 'unbordered'
      }
      type="button"
    >
      {'components.header.links.signUp'}
    </Button>

    <Button
      color="emerald"
      fullWidth
      onClick={() => {
        history.push(ROUTES.SIGN_IN);
        onLinkClickHandler(false);
      }}
      size={buttonsSize}
      styleType={location.pathname === ROUTES.SIGN_IN
        ? 'filled'
        : 'bordered'
      }
      type="button"
    >
      {'components.header.links.signIn'}
    </Button>
  </Fragment>
);

Nav.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

CommonNav.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

AuthNav.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

NonAuthNav.propTypes = {
  buttonsSize: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  onLinkClickHandler: PropTypes.func.isRequired,
};

export default withFirebase(Nav);
