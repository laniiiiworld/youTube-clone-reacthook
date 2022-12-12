import Youtube from '../service/youtube';
import { YoutubeApiContext } from './youtubeApiContext';

const youtube = new Youtube();

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}
