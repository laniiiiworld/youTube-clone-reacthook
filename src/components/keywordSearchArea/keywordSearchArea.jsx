import React from 'react';
import KeywordSearch from '../keywordSearch/keywordSearch';
import styles from './keywordSearchArea.module.css';

const KeywordSearchArea = (props) => {
  return (
    <div className={styles.keywordSearchArea}>
      <KeywordSearch handleSubmit={props.handleSubmit} />
    </div>
  );
};

export default KeywordSearchArea;
