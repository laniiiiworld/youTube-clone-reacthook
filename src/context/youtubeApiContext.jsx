import { createContext, useContext } from 'react';
import Youtube from '../service/youtube';

export const YoutubeApiContext = createContext();

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
