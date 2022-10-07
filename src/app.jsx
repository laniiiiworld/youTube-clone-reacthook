import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/detail' element={<VideoDetailPage />} />
        <Route path='/search' element={<VideoSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
