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
  const { title, channelId, channelTitle, description } = video.snippet;
  const [isMore, setIsMore] = useState(false);

  return (
    <>
      <section className={styles.videoPlayer}>
        <iframe src={EMBED_URL + video.id} frameBorder='0' allowFullScreen title={title}></iframe>
      </section>
      <div className={styles.title}>{title}</div>
      <ul className={styles.icons}>
        <VideoIcon iconClass='fa-regular fa-thumbs-up active' text='0' />
        <VideoIcon iconClass='fa-regular fa-thumbs-down' text='0' />
        <VideoIcon iconClass='fas fa-share active' text='공유' />
        <VideoIcon iconClass='fa-solid fa-download active' text='오프라인 저장' />
        <VideoIcon iconClass='fas fa-plus active' text='저장' />
      </ul>
      <hr />
      <Channel channelId={channelId} channelTitle={channelTitle} />
      <div className={styles.descriptionArea}>
        <div className={`${styles.description} ${isMore ? '' : styles.clamp}`} dangerouslySetInnerHTML={{ __html: formatDescription(description) }}></div>
        <button className={`${isMore ? styles.shortBtn : styles.moreBtn}`} onClick={() => setIsMore(!isMore)}>
          {isMore ? '간략히' : '더보기'}
        </button>
      </div>
    </>
  );
};

export default VideoDetail;

/** 상세 페이지 - 비디오 설명에 있는 링크와 태그 추출 */
function formatDescription(description = '') {
  const urlPattern = new RegExp(/(?:https?:\/\/)[a-zA-Z0-9ㄱ-ㅎ가-힣./-_?=&@%]+/, 'g');
  const tagPattern = new RegExp(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/, 'g');

  description = description.replace(urlPattern, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  description = description.replace(tagPattern, (tag) => `<span style='color:blue'>${tag}</span>`);

  return description.replaceAll('\n', '<br/>');
}
