import React, { useState } from 'react';
import styles from './keywordSearch.module.css';

const KeywordSearch = ({ searchKeyword, handleInputFocus }) => {
  const [keyword, setKeyword] = useState('');

  //검색버튼 click -> 검색
  const onSubmit = (event) => {
    event.preventDefault();
    searchKeyword(keyword, []);
  };

  return (
    <form className={styles.keywordSearch} onSubmit={onSubmit}>
      <input //
        id='keywordSearchInput'
        className={styles.input}
        type='text'
        placeholder='검색'
        autoComplete='off'
        onFocus={handleInputFocus}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={styles.button}>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>
    </form>
  );
};

export default KeywordSearch;
