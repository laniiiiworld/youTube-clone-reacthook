import React from 'react';
import VideoDetail from '../../components/videoDetail/videoDetail';
import VideoList from '../../components/videoList/videoList';
import styles from './videoDetailPage.module.css';

const VideoDetailPage = () => {
  return (
    <main className={styles.videoDetailPage}>
      <div className={styles.content}>
        <VideoDetail />
      </div>
      <div className={styles.list}>
        <VideoList displayType={`list`} />
      </div>
    </main>
  );
};

export default VideoDetailPage;
