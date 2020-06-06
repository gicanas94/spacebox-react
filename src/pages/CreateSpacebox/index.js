import { compose } from 'recompose';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../../components/Box';
import CreateSpaceboxForm from '../../forms/CreateSpacebox';
import HelmetTitle from '../../components/HelmetTitle';
import { withAuthorization, withEmailVerification } from '../../session';

const CreateSpaceboxPage = ({ authUser }) => (
  <Box size="medium">
    <HelmetTitle title={{ id: 'pages.createSpacebox.title' }} />

    <h1>
      <FormattedMessage id="pages.createSpacebox.h1" />
    </h1>

    <CreateSpaceboxForm authUser={authUser} />
  </Box>
);

CreateSpaceboxPage.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

const condition = (authUser) => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(CreateSpaceboxPage);
