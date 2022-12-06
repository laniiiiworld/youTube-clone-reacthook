import React from 'react';
import styles from './videoIcon.module.css';

export default function VideoIcon({ iconClass, text }) {
  return (
    <li>
      <button>
        <i className={`${styles.icon} ${iconClass}`}></i>
        <span>{text}</span>
      </button>
    </li>
  );
}
