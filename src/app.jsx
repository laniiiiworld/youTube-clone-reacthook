import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@fortawesome/fontawesome-free/js/all.js';
import { setSelectedKeyword } from './service/storage';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
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
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/detail/:videoId' element={<VideoDetailPage />} />
          <Route path='/search/:keyword' element={<VideoSearchPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
