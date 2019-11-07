import { compose } from 'recompose';
import { FormattedMessage } from 'react-intl';
import React from 'react';

import Box from '../../components/Box';
import CreateSpaceboxForm from '../../forms/CreateSpacebox';
import HelmetTitle from '../../components/HelmetTitle';
import { withAuthorization, withEmailVerification } from '../../Session';

const CreateSpaceboxPage = () => (
  <Box size="medium">
    <HelmetTitle title={{ id: 'pages.createSpacebox.title' }} />

    <h1>
      <FormattedMessage id="pages.createSpacebox.h1" />
    </h1>

    <CreateSpaceboxForm />
  </Box>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(CreateSpaceboxPage);
