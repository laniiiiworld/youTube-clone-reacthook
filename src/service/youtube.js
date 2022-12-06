import axios from 'axios';

export default class Youtube {
  BASE_URL = 'https://www.googleapis.com/youtube/v3';
  constructor(key) {
    this.key = key;
  }

  /** 메인 페이지,검색 페이지 - 비디오들 */
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#hotTrendVideos();
  }

  /** 상세 페이지 - 채널 */
  async videoChannel(channelId) {
    const url = `${this.BASE_URL}/channels?`;
    const obj = {
      key: this.key,
      id: channelId,
      part: 'snippet,statistics',
    };
    const res = await axios.get(url + new URLSearchParams(obj));
    const channel = res.data.items[0];
    channel.statistics = { ...channel.statistics, subscribers: this.#setSubscribers(channel.statistics.subscriberCount) };
    return channel;
  }

  /** 메인 페이지 - hot trend videos */
  async #hotTrendVideos() {
    const url = `${this.BASE_URL}/videos?`;
    const obj = {
      key: this.key,
      part: 'snippet',
      videoSyndicated: true,
      chart: 'mostPopular',
      maxResults: 25,
      regionCode: 'KR',
    };
    const res = await axios.get(url + new URLSearchParams(obj));
    return res.data.items;
  }

  /** 검색 페이지 - 검색결과 */
  async #searchByKeyword(keyword) {
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
    const res = await axios.get(url + new URLSearchParams(obj));
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  /** 채널 구독자 수 format */
  #setSubscribers(subscriberCount) {
    const formatter = Intl.NumberFormat(navigator.language, {
      notation: 'compact',
      compactDisplay: 'short',
    });
    return String(formatter.format(Number(subscriberCount)));
  }
}
