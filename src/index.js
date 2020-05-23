import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import ConnectedIntlProvider from './components/ConnectedIntlProvider';
import ConnectedThemeProvider from './components/ConnectedThemeProvider';
import Firebase, { FirebaseContext } from './Firebase';
import store from './Redux/store';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <ConnectedIntlProvider>
          <ConnectedThemeProvider>
            <App />
          </ConnectedThemeProvider>
        </ConnectedIntlProvider>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
