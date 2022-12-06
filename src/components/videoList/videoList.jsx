import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/youtubeApiContext';
import styles from './videoList.module.css';
import ErrorPage from '../errorPage/errorPage';
import Loading from '../loading/loading';
import VideoItem from '../videoItem/videoItem';

const VideoList = ({ displayType }) => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: videos } = useQuery(['videos', keyword], () => youtube.search(keyword), { staleTime: 1000 * 60 * 5 });

  if (error) return <ErrorPage errorMessage={error.message} />;
  if (isLoading) return <Loading />;

  return (
    <ul className={`${styles.videoList} ${displayType === 'list' ? styles.list : styles.grid}`}>
      {videos
        ? videos.map((video) => (
            <VideoItem //
              key={video.id}
              displayType={displayType}
              video={video}
            />
          ))
        : ''}
    </ul>
  );
};

export default VideoList;
