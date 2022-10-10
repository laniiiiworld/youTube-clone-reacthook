import React from 'react';
import styles from './errorPage.module.css';

const ErrorPage = ({ errorMessage }) => {
  const error = errorMessage ? errorMessage.split('|') : ['404', '페이지를 찾을 수 없습니다.'];

  return (
    <div className={styles.errorPage}>
      <h1>Error {error[0]}</h1>
      <span>{error[1]}</span>
    </div>
  );
};

export default ErrorPage;
