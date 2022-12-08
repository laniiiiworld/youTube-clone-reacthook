import React from 'react';
import { useParams } from 'react-router-dom';
import VideoDetail from '../../components/videoDetail/videoDetail';
import VideoList from '../../components/videoList/videoList';
import styles from './videoDetailPage.module.css';

const VideoDetailPage = () => {
  const { videoId } = useParams();

  return (
    <main className={styles.videoDetailPage}>
      <div className={styles.content}>
        <VideoDetail />
      </div>
      <div className={styles.list}>
        <VideoList displayType={`list`} relatedToVideoId={videoId} />
      </div>
    </main>
  );
};

export default VideoDetailPage;
