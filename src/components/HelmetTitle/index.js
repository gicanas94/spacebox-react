import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

const HelmetTitle = ({ title }) => (
  <FormattedMessage id={title.id} values={title.values}>
    {(formattedTitle) => (
      <Helmet>
        <title>{formattedTitle}</title>
      </Helmet>
    )}
  </FormattedMessage>
);

HelmetTitle.propTypes = {
  title: PropTypes.shape({
    id: PropTypes.string,
    values: PropTypes.object,
  }).isRequired,
};

export default HelmetTitle;
