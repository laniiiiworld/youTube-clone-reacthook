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
      const videoLists = await getAPIData(url, obj);
      return videoLists.items;
    } catch (err) {
      throw new Error(err);
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
    try {
      const videoLists = await getAPIData(url, obj);
      return videoLists.items;
    } catch (err) {
      console.log(err);
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
      const video = await getAPIData(url, obj);
      return video.items[0];
    } catch (err) {
      console.log(err);
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
      const channel = await getAPIData(url, obj);
      return channel.items[0];
    } catch (err) {
      console.log(err);
    }
  };
}

/** API에서 데이터 가져오기 */
const getAPIData = async (url, obj) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    let response = await fetch(url + new URLSearchParams(obj), requestOptions);
    if (!response.ok) {
      throw new Error('API를 가져올 수 없습니다.');
    }
    const myJson = response.json();
    return myJson;
  } catch (error) {
    throw new Error(error);
  }
};
