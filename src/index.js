import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'react-redux'
import store from './reducers/store'
import App from './containers/app-container';
import registerServiceWorker from './services/register-service-worker';
import { useLocale } from './services/i18n';

import './styles/index.css';

const locale = navigator.language.split('-')[0];
useLocale(locale);

ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));

registerServiceWorker();
