import React from 'react';
import VideoList from '../videoList/videoList';
import styles from './mainPage.module.css';

const MainPage = ({ videos, handleVideoClick }) => {
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
