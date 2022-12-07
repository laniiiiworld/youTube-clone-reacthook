import React from 'react';
import { Link } from 'react-router-dom';
import KeywordSearchArea from '../keywordSearchArea/keywordSearchArea';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={'/'}>
        <img className={styles.logoImg} src='/images/logo.png' alt='logo'></img>
        <span className={styles.logoText}>YouTube</span>
      </Link>
      <KeywordSearchArea />
      <div className={styles.icons}></div>
    </header>
  );
};

export default Header;
