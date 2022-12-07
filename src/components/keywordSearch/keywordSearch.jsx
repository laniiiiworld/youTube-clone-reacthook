import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './keywordSearch.module.css';

const KeywordSearch = ({ searchKeyword, handleInputFocus }) => {
  const { keyword } = useParams();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(keyword || ''); //브라우저에서 이전 페이지로 이동시 검색어 컨트롤
  }, [keyword]);

  //검색버튼 click -> 검색
  const onSubmit = (event) => {
    event.preventDefault();
    searchKeyword(text, []);
  };

  return (
    <form className={styles.keywordSearch} onSubmit={onSubmit}>
      <input //
        id='keywordSearchInput'
        className={styles.input}
        type='text'
        value={text}
        placeholder='검색'
        autoComplete='off'
        onFocus={handleInputFocus}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button}>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>
    </form>
  );
};

export default KeywordSearch;
