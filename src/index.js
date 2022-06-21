import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import FullStory from 'react-fullstory';
import ReactPixel from 'react-facebook-pixel';
import posthog from 'posthog-js';
import history from './history';
import App from './screens/App';
import theme from './themes/white';
import reportWebVitals from './reportWebVitals';
import ReducerProvider from './context/reducerProvider';

// PostHog
posthog.init('*****************', {
  api_host: 'https://app.posthog.com',
  disable_session_recording: true,
  autocapture: false
  // capture_pageview: false
});

// Sentry
Sentry.init({
  dsn:
    '**********************',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});

const ORG_ID = '*********';

// FB Pixel
const fbUserIdentification = {};
const fbOptions = {
  autoConfig: true,
  debug: false
};
ReactPixel.init('**************', fbUserIdentification, fbOptions);

ReactDOM.render(
  <Router history={history}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReducerProvider>
        <FullStory org={ORG_ID} />
        <App />
      </ReducerProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
