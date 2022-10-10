import React from 'react';
import VideoDetail from '../videoDetail/videoDetail';
import VideoList from '../videoList/videoList';
import styles from './videoDetailPage.module.css';

const VideoDetailPage = ({ video, channel, videos, handleVideoClick }) => {
  return (
    <main className={styles.videoDetailPage}>
      <div className={styles.content}>
        <VideoDetail //
          video={video}
          channel={channel}
        />
      </div>
      <div className={styles.list}>
        <VideoList //
          displayType={`list`}
          videos={videos}
          handleVideoClick={handleVideoClick}
        />
      </div>
    </main>
  );
};

export default VideoDetailPage;
