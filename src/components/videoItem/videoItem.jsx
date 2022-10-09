import React from 'react';
import styles from './videoItem.module.css';

const VideoItem = ({ displayType, video, handleVideoClick }) => {
  const onVideoClick = (event) => {
    handleVideoClick(video.id.videoId ? video.id.videoId : video.id);
  };

  return (
    <li className={`${styles.videoItem} ${displayType === 'list' ? styles.list : styles.grid}`} onClick={onVideoClick}>
      <div className={styles.thumbnail}>
        <img className={styles.thumbnailImg} src={video.snippet.thumbnails.medium.url}></img>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{video.snippet.title}</p>
        <p className={styles.channelTitle}>{video.snippet.channelTitle}</p>
      </div>
    </li>
  );
};

export default VideoItem;
