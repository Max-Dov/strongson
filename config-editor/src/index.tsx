import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppComponent from './features/app/app.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);
