import React, { useRef } from 'react';
import styles from './keywordSearch.module.css';

const KeywordSearch = ({ searchKeyword, handleInputFocus }) => {
  const inputRef = useRef();

  //검색버튼 click -> 검색
  const onSubmit = (event) => {
    event.preventDefault();
    const keyword = inputRef.current.value;
    searchKeyword(keyword, []);
  };

  return (
    <form className={styles.keywordSearch} onSubmit={onSubmit}>
      <input //
        id='keywordSearchInput'
        className={styles.input}
        ref={inputRef}
        type='text'
        placeholder='검색'
        autoComplete='off'
        onFocus={handleInputFocus}
      />
      <button className={styles.button}>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>
    </form>
  );
};

export default KeywordSearch;
