import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { MuiThemeProvider } from 'material-ui/styles';
import App from './components/app';
import registerServiceWorker from './services/register-service-worker';
//import log from 'loglevel';

//log.enableAll();

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
