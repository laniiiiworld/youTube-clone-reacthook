import React from 'react';
import '@fortawesome/fontawesome-free/js/all.js';
import { useNavigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { YoutubeApiProvider } from './context/youtubeApiContext';
import { setSelectedKeyword } from './service/storage';
import Header from './components/header/header';
import './app.css';

const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();

  /** 검색 페이지로 이동 */
  const handleSearch = async (keyword) => {
    if (!keyword) return;
    setSelectedKeyword('selectedKeywords', keyword);
    navigate(`/search/${keyword}`);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
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
