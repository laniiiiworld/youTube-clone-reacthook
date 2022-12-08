import axios from 'axios';

export default class Youtube {
  /**
   * 메인페이지 - 최신 트렌드 비디오들
   * 검색페이지 - 검색결과
   * 상세페이지 - 관련 비디오들
   */
  async search(keyword, relatedToVideoId) {
    if (relatedToVideoId) return this.#relatedVideos(relatedToVideoId);
    return keyword ? this.#searchByKeyword(keyword) : this.#hotTrendVideos();
  }

  /** 상세 페이지 - 채널 */
  async videoChannel(channelId) {
    const res = await axios.get('/data/channel.json');
    const channel = res.data.items[0];
    channel.statistics = { ...channel.statistics, subscribers: this.#setSubscribers(channel.statistics.subscriberCount) };
    return channel;
  }

  /** 상세 페이지 - 관련 비디오들 */
  async #relatedVideos(videoId) {
    // console.log('relatedVideos => ', videoId);
    const res = await axios.get('/data/relatedVideos.json');
    return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
  }

  /** 메인 페이지 - hot trend videos */
  async #hotTrendVideos() {
    const res = await axios.get('/data/hotTrendVideos.json');
    return res.data.items;
  }

  /** 검색 페이지 - 검색결과 */
  async #searchByKeyword(keyword) {
    const res = await axios.get('/data/searchVideos.json');
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
