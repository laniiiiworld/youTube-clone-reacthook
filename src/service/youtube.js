import axios from 'axios';

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  /** 메인 페이지,검색 페이지 - 비디오들 */
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#hotTrendVideos();
  }

  /** 상세 페이지 - 채널 */
  async videoChannel(channelId) {
    const obj = {
      id: channelId,
      part: 'snippet,statistics',
    };
    const res = await this.httpClient.get('channels', { params: obj });
    const channel = res.data.items[0];
    channel.statistics = { ...channel.statistics, subscribers: this.#setSubscribers(channel.statistics.subscriberCount) };
    return channel;
  }

  /** 메인 페이지 - hot trend videos */
  async #hotTrendVideos() {
    const obj = {
      part: 'snippet',
      videoSyndicated: true,
      chart: 'mostPopular',
      maxResults: 25,
      regionCode: 'KR',
    };
    const res = await this.httpClient.get('videos', { params: obj });
    return res.data.items;
  }

  /** 검색 페이지 - 검색결과 */
  async #searchByKeyword(keyword) {
    const obj = {
      type: 'video',
      videoSyndicated: true, //외부에서 재생할 수 있는 동영상만 포함
      part: 'snippet',
      maxResults: 25,
      regionCode: 'kr',
      q: keyword,
      safeSearch: 'strict',
    };
    const res = await this.httpClient.get('search', { params: obj });
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
