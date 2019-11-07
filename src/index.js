import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import App from './App';
import Firebase, { FirebaseContext } from './Firebase';
import GlobalStyle from './styles/GlobalStyle';
import messages from './i18n';
import store from './Redux/store';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Normalize />
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <IntlProvider locale="en" messages={messages.en}>
            <App />
          </IntlProvider>
        </ThemeProvider>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
