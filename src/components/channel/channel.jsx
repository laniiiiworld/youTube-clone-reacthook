import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/youtubeApiContext';
import ErrorPage from '../../page/errorPage/errorPage';
import Loading from '../loading/loading';
import styles from './channel.module.css';

export default function Channel({ channelId }) {
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: channel } = useQuery(['channel', videoId], () => youtube.videoChannel(channelId), { staleTime: 1000 * 60 * 5 });

  if (error) return <ErrorPage errorMessage={error.message} />;
  if (isLoading) return <Loading />;

  return (
    <div className={styles.channelArea}>
      <div className={styles.channelInfo}>
        <img alt='' className={styles.user} src={channel.snippet.thumbnails.default.url} />
        <div className={styles.channel}>
          <span className={styles.channelTitle}>{channel.snippet.title}</span>
          <span className={styles.subscribers}>{channel.statistics.subscribers}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn__subscription}>구독</button>
        <i className='fa-solid fa-bell'></i>
      </div>
    </div>
  );
}
