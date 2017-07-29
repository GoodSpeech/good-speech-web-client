import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { MuiThemeProvider } from 'material-ui/styles';
// import log from 'loglevel';

import App from './components/app';
import registerServiceWorker from './services/register-service-worker';
import { useLocale } from './services/i18n';


// log.enableAll();
const locale = navigator.language.split('-')[0];
useLocale(locale);

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
