import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import App from './App';
import ConnectedIntlProvider from './components/ConnectedIntlProvider';
import Firebase, { FirebaseContext } from './Firebase';
import GlobalStyle from './styles/GlobalStyle';
import store from './Redux/store';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Normalize />
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ConnectedIntlProvider>
            <App />
          </ConnectedIntlProvider>
        </ThemeProvider>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
