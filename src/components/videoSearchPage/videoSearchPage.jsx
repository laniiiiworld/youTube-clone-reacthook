import React, { useState, useEffect } from 'react';
import VideoList from '../videoList/videoList';
import styles from './videoSearchPage.module.css';

const VideoSearchPage = ({ videos, handleVideoClick }) => {
  return (
    <main className={styles.videoSearchPage}>
      <VideoList //
        displayType={'list'}
        videos={videos}
        handleVideoClick={handleVideoClick}
      />
    </main>
  );
};

export default VideoSearchPage;
