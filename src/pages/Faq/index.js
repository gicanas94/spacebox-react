import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import React from 'react';

import Box from '../../components/Box';
import Emoji from '../../components/Emoji';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';

const FaqPage = () => (
  <Box size="medium">
    <HelmetTitle title={{ id: 'pages.faq.title' }} />

    <h1>
      <FormattedMessage id="pages.faq.h1" />
    </h1>

    <p>
      <FormattedMessage id="pages.faq.p1" />
    </p>

    <p>
      <FormattedMessage id="pages.faq.p2" />
    </p>

    <p>
      <FormattedMessage
        id="pages.faq.p3"
        values={{
          signUpLink: (
            <span>
              <Link to={ROUTES.SIGN_UP}>
                <FormattedMessage id="pages.faq.links.signUp" />
              </Link>
            </span>
          ),
          signInLink: (
            <span>
              <Link to={ROUTES.SIGN_IN}>
                <FormattedMessage id="pages.faq.links.signIn" />
              </Link>
            </span>
          ),
        }}
      />
    </p>

    <p>
      <FormattedMessage id="pages.faq.p4" />
      <Emoji emoji="🙄" label="pages.faq.p4EmojiLabel" />
    </p>

    <Link to={ROUTES.HOME}>
      <FormattedMessage id="pages.faq.links.home" />
    </Link>
  </Box>
);

export default FaqPage;
