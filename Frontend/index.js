import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


render(
    // TODO: Explain why provider is needed and what React.StrictMode is doing
  <App />,
  document.getElementById('root')
);