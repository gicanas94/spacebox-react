import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';

import Box from '../../components/Box';
import Emoji from '../../components/Emoji';
import { ROUTES } from '../../constants';

const FaqPage = () => (
  <Box size="medium">
    <Helmet title="WT#? - Spacebox" />
    <h1>What is this all about?</h1>

    <p>
      Spacebox is a platform designed for two types of people: those who like
      to write and those who like to read what other people write.
    </p>

    <p>
      On the home page you can filter the spaces depending on what you want to
      read, the idea is that you always find content that you find interesting.
    </p>

    <p>
      If you want to create your own space and start writing or maybe just make
      a comment in the space of another person, you
      can <span><Link to={ROUTES.SIGN_UP}>create an account</Link></span> (don't worry, is
      free) or <Link to={ROUTES.SIGN_IN}>sign in</Link> using your favorite
      social media account.
    </p>

    <p>
      At the moment of thinking about the idea of creating this page I thought
      it would be longer, but I'm running out of imagination so... I think this
      is it <Emoji label="Face Neutral Skeptical" symbol="🙄" />
    </p>

    <Link to={ROUTES.HOME}>Enjoy!</Link>
  </Box>
);

export default FaqPage;
