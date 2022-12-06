import VideoList from '../../components/videoList/videoList';
import styles from './videoSearchPage.module.css';

const VideoSearchPage = () => {
  return (
    <main className={styles.videoSearchPage}>
      <VideoList displayType={'list'} />
    </main>
  );
};

export default VideoSearchPage;
