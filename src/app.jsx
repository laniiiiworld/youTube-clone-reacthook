import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import './app.css';

const App = (props) => {
  const navigate = useNavigate();
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    getVideosData();
  }, []);

  /** 메인 페이지 - 비디오 목록 가져오기 */
  const getVideosData = async () => {
    try {
      const videos = await props.youtube.videos();
      setVideo(videos);
    } catch (error) {
    }
  };
  /** 검색 페이지 - 조회 결과 가져오기 */
  const handleSubmit = (keyword) => {
    navigate(`/search`);
  };

  /** 비디오 클릭시 */
  const handleVideoClick = (videoId) => {
    navigate(`/detail/`);
  };

  return (
    <>
      <Header handleSubmit={handleSubmit} />
      <Routes>
        <Route path='/' element={<MainPage videos={videos} handleVideoClick={handleVideoClick} />} />
        <Route path='/detail' element={<VideoDetailPage />} />
        <Route path='/search' element={<VideoSearchPage />} />
      </Routes>
    </>
  );
};

export default App;
