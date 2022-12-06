import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useYoutubeApi } from '../../context/youtubeApiContext';
import ErrorPage from '../errorPage/errorPage';
import Loading from '../loading/loading';
import styles from './videoDetail.module.css';

const EMBED_URL = 'https://www.youtube.com/embed/';

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: channel } = useQuery(['channel', videoId], () => youtube.videoChannel(video.snippet.channelId), { staleTime: 1000 * 60 * 5 });

  const [isMore, setIsMore] = useState(false);

  //더보기, 간략히 버튼
  const handleIsMoreToggle = () => {
    setIsMore(!isMore);
  };

  if (error) return <ErrorPage errorMessage={error.message} />;
  if (isLoading) return <Loading />;

  video.snippet.description = setDescription(video.snippet.description);

  return (
    <>
      <section className={styles.videoPlayer}>
        <iframe src={EMBED_URL + video.id} frameBorder='0' allowFullScreen title={video.snippet.title}></iframe>
      </section>
      <div className={styles.title}>{video.snippet.title}</div>
      <ul className={styles.icons}>
        <li>
          <button>
            <i className={`${styles.icon} ${'fa-regular fa-thumbs-up active'}`}></i>
            <span>0</span>
          </button>
        </li>
        <li>
          <button>
            <i className={`${styles.icon} ${'fa-regular fa-thumbs-down'}`}></i>
            <span>0</span>
          </button>
        </li>
        <li>
          <button>
            <i className={`${styles.icon} ${'fas fa-share active'}`}></i>
            <span>공유</span>
          </button>
        </li>
        <li>
          <button>
            <i className={`${styles.icon} ${'fa-solid fa-download active'}`}></i>
            <span>오프라인 저장</span>
          </button>
        </li>
        <li>
          <button>
            <i className={`${styles.icon} ${'fas fa-plus active'}`}></i>
            <span>저장</span>
          </button>
        </li>
      </ul>
      <hr />
      <div className={styles.channelArea}>
        <div className={styles.channelInfo}>
          <img alt='' className={styles.user} src={channel.snippet.thumbnails.default.url} />
          <div className={styles.channel}>
            <span className={styles.channelTitle}>{video.snippet.channelTitle}</span>
            <span className={styles.subscribers}>{channel.statistics.subscribers}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn__subscription}>구독</button>
          <i className='fa-solid fa-bell'></i>
        </div>
      </div>
      <div className={styles.descriptionArea}>
        <div className={`${styles.description} ${isMore ? '' : styles.clamp}`} dangerouslySetInnerHTML={{ __html: video.snippet.description }}></div>
        <button className={`${styles.moreBtn} ${isMore ? styles.displayNone : ''}`} onClick={handleIsMoreToggle}>
          더보기
        </button>
        <button className={`${styles.shortBtn} ${isMore ? '' : styles.displayNone}`} onClick={handleIsMoreToggle}>
          간략히
        </button>
      </div>
    </>
  );
};

export default VideoDetail;

/** 상세 페이지 - 비디오 설명에 있는 링크와 태그 형식 만들기 */
function setDescription(description) {
  //줄바꿈 변환
  let str = description.replaceAll('\n', '<br/>');
  //url link로 변경
  str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-\_]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  //태그들 link로 변경
  str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
  return str;
}
