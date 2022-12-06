import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Channel from '../channel/channel';
import VideoIcon from '../videoIcon/videoIcon';
import styles from './videoDetail.module.css';

const EMBED_URL = 'https://www.youtube.com/embed/';

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();

  const [isMore, setIsMore] = useState(false);

  //더보기, 간략히 버튼
  const handleIsMoreToggle = () => {
    setIsMore(!isMore);
  };

  return (
    <>
      <section className={styles.videoPlayer}>
        <iframe src={EMBED_URL + video.id} frameBorder='0' allowFullScreen title={video.snippet.title}></iframe>
      </section>
      <div className={styles.title}>{video.snippet.title}</div>
      <ul className={styles.icons}>
        <VideoIcon iconClass='fa-regular fa-thumbs-up active' text='0' />
        <VideoIcon iconClass='fa-regular fa-thumbs-down' text='0' />
        <VideoIcon iconClass='fas fa-share active' text='공유' />
        <VideoIcon iconClass='fa-solid fa-download active' text='오프라인 저장' />
        <VideoIcon iconClass='fas fa-plus active' text='저장' />
      </ul>
      <hr />
      <Channel channelId={video.snippet.channelId} />
      <div className={styles.descriptionArea}>
        <div className={`${styles.description} ${isMore ? '' : styles.clamp}`} dangerouslySetInnerHTML={{ __html: setDescription(video.snippet.description) }}></div>
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
