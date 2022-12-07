import React from 'react';
import '@fortawesome/fontawesome-free/js/all.js';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { YoutubeApiProvider } from './context/youtubeApiContext';
import Header from './components/header/header';
import './app.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <YoutubeApiProvider>
          <Outlet />
        </YoutubeApiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
