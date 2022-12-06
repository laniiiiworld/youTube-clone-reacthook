import VideoList from '../../components/videoList/videoList';
import styles from './mainPage.module.css';

const MainPage = () => {
  return (
    <main className={styles.mainPage}>
      <VideoList displayType={'grid'} />
    </main>
  );
};

export default MainPage;
