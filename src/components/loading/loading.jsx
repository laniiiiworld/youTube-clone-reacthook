import React from 'react';
import styles from './loading.module.css';

const Loading = (props) => {
  return (
    <div title='loading' className={styles.loading}>
      <div className={styles.content}></div>
    </div>
  );
};

export default Loading;
