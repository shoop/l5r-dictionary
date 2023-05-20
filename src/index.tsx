import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
const definitionsUrl: string | undefined = rootElement.getAttribute('data-param-definitions-url')?.trim();

root.render(
  <React.StrictMode>
    <App definitionsUrl={definitionsUrl} />
  </React.StrictMode>
);
