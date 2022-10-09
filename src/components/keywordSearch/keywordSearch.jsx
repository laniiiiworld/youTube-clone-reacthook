import React, { useRef } from 'react';
import styles from './keywordSearch.module.css';

const KeywordSearch = ({ handleSearch }) => {
  const inputRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const keyword = inputRef.current.value;
    keyword && handleSearch(keyword);
  };

  return (
    <form className={styles.keywordSearch} onSubmit={onSubmit}>
      <input className={styles.input} ref={inputRef} type='text' placeholder='검색' />
      <button className={styles.button}>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>
    </form>
  );
};

export default KeywordSearch;
