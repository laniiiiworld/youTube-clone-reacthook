import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import ErrorPage from './page/errorPage/errorPage';
import MainPage from './page/mainPage/mainPage';
import VideoDetailPage from './page/videoDetailPage/videoDetailPage';
import VideoSearchPage from './page/videoSearchPage/videoSearchPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/detail/:videoId', element: <VideoDetailPage /> },
      { path: '/search/:keyword', element: <VideoSearchPage /> },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
