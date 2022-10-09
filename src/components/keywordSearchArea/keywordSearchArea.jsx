import React from 'react';
import KeywordSearch from '../keywordSearch/keywordSearch';
import styles from './keywordSearchArea.module.css';

const KeywordSearchArea = ({ handleSearch }) => {
  return (
    <div className={styles.keywordSearchArea}>
      <KeywordSearch handleSearch={handleSearch} />
    </div>
  );
};

export default KeywordSearchArea;
