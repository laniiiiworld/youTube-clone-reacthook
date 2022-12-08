import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/youtubeApiContext';
import styles from './channel.module.css';

export default function Channel({ channelId, channelTitle }) {
  const { youtube } = useYoutubeApi();
  const { data: channel } = useQuery(['channel', channelId], () => youtube.videoChannel(channelId), { staleTime: 1000 * 60 * 5 });
  const thumbnailUrl = channel?.snippet?.thumbnails?.default?.url;
  const subscribers = channel?.statistics?.subscribers;

  return (
    <div className={styles.channelArea}>
      <div className={styles.channelInfo}>
        {thumbnailUrl ? ( //
          <img alt={channelTitle} className={styles.user} src={thumbnailUrl} />
        ) : (
          <span>
            <i className='fa-solid fa-user' />
          </span>
        )}
        <div className={styles.channel}>
          <span className={styles.channelTitle}>{channelTitle}</span>
          <span className={styles.subscribers}>{subscribers}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn__subscription}>구독</button>
        <i className='fa-solid fa-bell'></i>
      </div>
    </div>
  );
}
