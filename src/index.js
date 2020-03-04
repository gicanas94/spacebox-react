import { BrowserRouter } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import ConnectedIntlProvider from './components/ConnectedIntlProvider';
import Firebase, { FirebaseContext } from './Firebase';
import store from './Redux/store';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Normalize />
      <BrowserRouter>
        <ConnectedIntlProvider>
          <App />
        </ConnectedIntlProvider>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
