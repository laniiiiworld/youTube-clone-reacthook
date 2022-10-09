import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Youtube from './service/youtube';
import App from './app';
import './index.css';

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App youtube={youtube} />
    </BrowserRouter>
  </React.StrictMode>
);
