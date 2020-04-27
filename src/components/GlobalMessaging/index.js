import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { device } from '../../styles';
import { getCookie, setCookie } from '../../utils';
import GlobalMessage from './GlobalMessage';
import { withFirebase } from '../../Firebase';

const StyledGlobalMessagesWrapper = styled.div`
  & > * {
    margin-bottom: 10px;
  }

  @media ${device.laptop} {
    & > * {
      margin-bottom: 20px;
    }
  }
`;

const GlobalMessaging = ({ appLocale, firebase }) => {
  const [globalMessages, setGlobalMessages] = useState(null);
  const location = useLocation();

  const onCloseGlobalMessageIconClickHandler = (globalMessageToDismiss) => {
    setCookie(
      `globalMessageDismissed-${globalMessageToDismiss.slug}`,
      true,
      new Date(new Date().getTime() + 30 * 86400000).toGMTString(),
    );

    setGlobalMessages(globalMessages.filter((globalMessage) => (
      globalMessage.slug !== globalMessageToDismiss.slug
    )));
  };

  useEffect(() => {
    firebase.allActiveGlobalMessages().onSnapshot((documents) => {
      const array = [];

      documents.forEach((document) => array.push(document.data()));

      setGlobalMessages(array);
    });
  }, []);

  return (
    <StyledGlobalMessagesWrapper>
      {globalMessages && globalMessages.map((gMessage) => (
        gMessage.pages.map((page) => (
          ((_.startsWith(location.pathname, page) && page !== '/')
          || (page === '/' && location.pathname === '/')
          || page === '/*')
          && !getCookie(`globalMessageDismissed-${gMessage.slug}`)
          && (
            <GlobalMessage
              appLocale={appLocale}
              globalMessage={gMessage}
              key={gMessage.slug}
              onCloseGlobalMessageIconClickHandler={
                onCloseGlobalMessageIconClickHandler
              }
            />
          )
        ))
      ))}
    </StyledGlobalMessagesWrapper>
  );
};

GlobalMessaging.propTypes = {
  appLocale: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withFirebase(GlobalMessaging);
