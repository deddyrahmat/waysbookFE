import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';

// style bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContextProvider } from './configs';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);