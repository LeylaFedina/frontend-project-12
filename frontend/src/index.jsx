import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

import { store } from './app/store.js';
import App from './app/App.jsx';
import './styles/index.scss';

const rollbarConfig = {
  enabled: true,
  accessToken: 'b0c18783f5964955b526b8f4872984b2',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>,
);
