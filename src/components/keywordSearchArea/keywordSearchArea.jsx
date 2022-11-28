import React, { useState } from 'react';
import KeywordSearch from '../keywordSearch/keywordSearch';
import SelectedKeyword from '../selectedKeyword/selectedKeyword';
import styles from './keywordSearchArea.module.css';
import { getSelectedKeywords, setSelectedKeywords, removeSelectedKeyword } from '../../service/storage';

const KeywordSearchArea = ({ handleSearch }) => {
  const [keywordList, setKeywordList] = useState([]);

  //최근검색어 검색
  const searchKeyword = (keyword, keywords) => {
    handleSearch(keyword);
    setKeywordList(keywords);
  };

  //검색어 입력란 focus -> 최근 검색어 목록 display
  const handleInputFocus = () => {
    setKeywordList(getSelectedKeywords('selectedKeywords', []));
  };
  //검색 영역 밖이 클릭된 경우, 최근 검색어 목록 display none
  window.addEventListener('click', (event) => {
    if (event.target.closest('#keywordSearchArea')) return;
    keywordList.length && setKeywordList([]);
  });
  //Esc가 눌린 경우, 최근 검색어 목록 display none
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      keywordList.length && setKeywordList([]);
    }
  });
  //최근검색어 목록 클릭시 이벤트 처리
  const handleKeywordListClick = (event) => {
    event.stopPropagation();

    //삭제
    const deleteIndex = Number(event.target.dataset?.deleteIndex);
    if (deleteIndex >= 0) {
      const nextSelectedKeywords = removeSelectedKeyword('selectedKeywords', deleteIndex);
      setSelectedKeywords('selectedKeywords', nextSelectedKeywords);
      setKeywordList(nextSelectedKeywords);
      return;
    }
    //검색
    const selectIndex = Number(event.target.closest('li').dataset.index);
    const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
    const keywordSearchInput = document.querySelector('#keywordSearchInput');
    keywordSearchInput.value = selectedKeywords[selectIndex];
    searchKeyword(selectedKeywords[selectIndex], []);
  };

  //검색 영역(검색어 입력란, 최근 검색어 목록) - 키보드 제어
  const handleKeyup = (event) => {
    event.stopPropagation();

    const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];
    if (!navigationKeys.includes(event.key)) {
      return;
    }
    const keywordSearchInput = document.querySelector('#keywordSearchInput');

    if (event.key === 'Enter') {
      //검색
      searchKeyword(keywordSearchInput.value, getSelectedKeywords('selectedKeywords', []));
    } else {
      //최근검색어 목록 키보드로 위,아래 이동
      controlUpAndDown(event.key, keywordSearchInput);
    }
  };

  /** 최근검색어 목록 키보드로 위,아래 이동 */
  const controlUpAndDown = (key, input) => {
    const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
    if (!selectedKeywords.length) return;

    let $nowLi = document.querySelector('.keywordItemSelected');
    const lastIndex = selectedKeywords.length - 1;
    let selectedIndex;
    let nextIndex;

    if ($nowLi) {
      selectedIndex = Number($nowLi.dataset.index);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      selectedIndex = key === 'ArrowUp' ? lastIndex + 1 : -1;
    }

    if (key === 'ArrowUp') {
      nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
    } else if (key === 'ArrowDown') {
      nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
    }

    input.value = selectedKeywords[nextIndex];

    const $nextLi = document.querySelector(`li[data-index='${nextIndex}']`);
    $nowLi && $nowLi.classList.remove('keywordItemSelected');
    $nextLi && $nextLi.classList.add('keywordItemSelected');
  };

  return (
    <div id='keywordSearchArea' className={styles.keywordSearchArea} onKeyUp={handleKeyup}>
      <KeywordSearch searchKeyword={searchKeyword} handleInputFocus={handleInputFocus} />
      <SelectedKeyword //
        keywords={keywordList}
        handleKeywordListClick={handleKeywordListClick}
      />
    </div>
  );
};

export default KeywordSearchArea;
