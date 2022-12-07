import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../../util/date';
import styles from './videoItem.module.css';

const VideoItem = ({ displayType, video }) => {
  const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();

  const onVideoClick = () => {
    navigate(`/detail/${video.id}`, { state: { video } });
  };

  return (
    <li className={`${styles.videoItem} ${displayType === 'list' ? styles.list : styles.grid}`} onClick={onVideoClick}>
      <div className={styles.thumbnail}>
        <img className={styles.thumbnailImg} src={thumbnails.medium.url} alt={title}></img>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.channelTitle}>{channelTitle}</p>
        <p className={styles.publishedAt}>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
};

export default VideoItem;
