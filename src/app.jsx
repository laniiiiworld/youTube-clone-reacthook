import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import ErrorPage from './components/errorPage/errorPage';
import Loading from './components/loading/loading';
import './app.css';

const App = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState([]);
  const [channel, setChannel] = useState([]);

  /** 검색 페이지로 이동 */
  const handleSearch = async (keyword) => {
    setIsLoading(true);
    try {
      const data = await getSearchResultVideos(keyword);
      setIsLoading(false);
      //error가 발생하지 않은 경우에만 이동
      if (data.length) {
        setVideos(data);
        navigate(`/search`);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      navigate(`/error`);
    }
  };

  /** 비디오 클릭시 상세 페이지로 이동 */
  const handleVideoClick = async (videoId) => {
    setIsLoading(true);
    try {
      const isSuccess = await getVideoDetailData(videoId);
      setIsLoading(false);
      isSuccess && navigate(`/detail/${videoId}`);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      navigate(`/error`);
    }
  };

  /** 메인 페이지 - API에서 인기있는 동영상 목록 가져오기 */
  const getMostPopularVideos = async () => {
    setIsLoading(true);
    try {
      const videos = await props.youtube.videos();
      setVideos(videos); //상세 페이지 이동시 동영상 목록으로 사용
      setIsLoading(false);
      return videos;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      navigate(`/error`);
    }
  };

  /** 검색 페이지 - API에서 검색 결과 가져오기 */
  const getSearchResultVideos = async (keyword) => {
    setIsLoading(true);
    try {
      const videos = await props.youtube.search(keyword);
      setIsLoading(false);
      return videos;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      navigate(`/error`);
      return [];
    }
  };

  /** 상세 페이지 - 비디오와 채널 데이터 가져오기 */
  const getVideoDetailData = async (videoId) => {
    setIsLoading(true);
    try {
      const video = await props.youtube.videoDetail(videoId);
      video.snippet.description = setDescription(video.snippet.description);

      const channelId = video.snippet.channelId;
      const channel = await props.youtube.videoChannel(channelId);
      channel.statistics = { ...channel.statistics, subscribers: setSubscribers(channel.statistics.subscriberCount) };

      setVideo(video);
      setChannel(channel);
      setIsLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      navigate(`/error`);
      return false;
    }
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route path='/' element={<MainPage getMostPopularVideos={getMostPopularVideos} handleVideoClick={handleVideoClick} />} />
        <Route path='/detail/:videoId' element={<VideoDetailPage video={video} channel={channel} videos={videos} handleVideoClick={handleVideoClick} />} />
        <Route path='/search' element={<VideoSearchPage videos={videos} handleVideoClick={handleVideoClick} />} />
        <Route path='/error' element={<ErrorPage errorMessage={error} />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;

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

/** 상세 페이지 - 채널 구독자 수 */
function setSubscribers(subscriberCount) {
  if (subscriberCount.length > 5) {
    return `${Math.floor(Number(subscriberCount) / 10000)}만명`;
  } else if (subscriberCount.length > 4) {
    return `${Math.floor(Number(subscriberCount) / 1000) / 10}만명`;
  }
  return subscriberCount;
}
