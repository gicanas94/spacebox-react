import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import React from 'react';

import Box from '../../components/Box';
import CreateSpaceboxForm from '../../forms/CreateSpacebox';
import { withAuthorization, withEmailVerification } from '../../Session';

const CreateSpaceboxPage = () => (
  <Box size="medium">
    <Helmet title="Create Spacebox - Spacebox" />
    <h1>Create Spacebox</h1>
    <CreateSpaceboxForm />
  </Box>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(CreateSpaceboxPage);
