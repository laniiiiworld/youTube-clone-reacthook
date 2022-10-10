import React from 'react';
import VideoItem from '../videoItem/videoItem';
import styles from './videoList.module.css';

const VideoList = ({ displayType, videos, handleVideoClick }) => {
  return (
    <ul className={`${styles.videoList} ${displayType === 'list' ? styles.list : styles.grid}`}>
      {videos.map((video) => (
        <VideoItem //
          key={video.id.videoId ? video.id.videoId : video.id}
          displayType={displayType}
          video={video}
          handleVideoClick={handleVideoClick}
        />
      ))}
    </ul>
  );
};

export default VideoList;
