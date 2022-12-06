import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import { YoutubeApiProvider } from './context/youtubeApiContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <YoutubeApiProvider>
        <App />
      </YoutubeApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
