import React, { useState, useEffect } from 'react';
import VideoList from '../videoList/videoList';
import styles from './mainPage.module.css';

const MainPage = ({ getMostPopularVideos, handleVideoClick }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    drawVideosData();
  }, []);

  /** 메인 페이지 - 비디오 목록 그리기 */
  const drawVideosData = async () => {
    const data = await getMostPopularVideos();
    setVideos(data);
  };

  return (
    <main className={styles.mainPage}>
      <VideoList //
        displayType={'grid'}
        videos={videos}
        handleVideoClick={handleVideoClick}
      />
    </main>
  );
};

export default MainPage;
