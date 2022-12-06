import axios from 'axios';

const cache = [];
export default class Youtube {
  BASE_URL = 'https://www.googleapis.com/youtube/v3';
  constructor(key) {
    this.key = key;
  }

  /** 메인 페이지 - 비디오들 */
  videos = async () => {
    const url = `${this.BASE_URL}/videos?`;
    const obj = {
      key: this.key,
      part: 'snippet',
      videoSyndicated: true,
      chart: 'mostPopular',
      maxResults: 25,
      regionCode: 'KR',
    };
    try {
      const videoLists = await axios.get(url + new URLSearchParams(obj));
      return videoLists.data.items;
    } catch (err) {
      throw new Error(`${err.request.status}|API를 가져올 수 없습니다.`);
    }
  };

  /** 검색 페이지 - 조회결과 */
  search = async (keyword) => {
    const url = `${this.BASE_URL}/search?`;
    const obj = {
      key: this.key,
      type: 'video',
      videoSyndicated: true, //외부에서 재생할 수 있는 동영상만 포함
      part: 'snippet',
      maxResults: 25,
      regionCode: 'kr',
      q: keyword,
      safeSearch: 'strict',
    };
    if (cache[keyword]) return cache[keyword];
    try {
      const videoLists = await axios.get(url + new URLSearchParams(obj));
      cache[keyword] = videoLists.data.items;
      return cache[keyword];
    } catch (err) {
      throw new Error(`${err.request.status}|API를 가져올 수 없습니다.`);
    }
  };

  /** 상세 페이지 - 비디오 */
  videoDetail = async (videoId) => {
    const url = `${this.BASE_URL}/videos?`;
    const obj = {
      key: this.key,
      id: videoId,
      part: 'snippet',
    };
    try {
      const video = await axios.get(url + new URLSearchParams(obj));
      return video.data.items[0];
    } catch (err) {
      throw new Error(`${err.request.status}|API를 가져올 수 없습니다.`);
    }
  };

  /** 상세 페이지 - 채널 */
  videoChannel = async (channelId) => {
    const url = `${this.BASE_URL}/channels?`;
    const obj = {
      key: this.key,
      id: channelId,
      part: 'snippet,statistics',
    };
    try {
      const channel = await axios.get(url + new URLSearchParams(obj));
      return channel.data.items[0];
    } catch (err) {
      throw new Error(`${err.status}|API를 가져올 수 없습니다.`);
    }
  };
}
