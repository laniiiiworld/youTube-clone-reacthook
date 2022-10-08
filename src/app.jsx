import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import './app.css';

const App = (props) => {
  const navigate = useNavigate();

  //검색 페이지 - 조회 결과 가져오기
  const handleSubmit = (keyword) => {
    navigate(`/search`);
  };

  return (
    <>
      <Header handleSubmit={handleSubmit} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/detail' element={<VideoDetailPage />} />
        <Route path='/search' element={<VideoSearchPage />} />
      </Routes>
    </>
  );
};

export default App;
