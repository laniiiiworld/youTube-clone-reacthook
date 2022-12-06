import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './videoItem.module.css';

const VideoItem = ({ displayType, video }) => {
  const navigate = useNavigate();

  const onVideoClick = () => {
    navigate(`/detail/${video.id}`, { state: { video } });
  };

  return (
    <li className={`${styles.videoItem} ${displayType === 'list' ? styles.list : styles.grid}`} onClick={onVideoClick}>
      <div className={styles.thumbnail}>
        <img className={styles.thumbnailImg} src={video.snippet.thumbnails.medium.url} alt='thumbnail'></img>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{video.snippet.title}</p>
        <p className={styles.channelTitle}>{video.snippet.channelTitle}</p>
      </div>
    </li>
  );
};

export default VideoItem;
