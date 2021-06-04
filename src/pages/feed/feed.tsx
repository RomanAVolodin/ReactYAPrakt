import React from 'react';
import FeedList from '../../components/feed-list/feed-list';
import { FeedSummary } from '../../components/feed-summary/feed-summary';
import styles from './feed.module.css';

export const Feed: React.FC = () => {
  return (
    <div className={styles.container}>
      <FeedList />
      <FeedSummary />
    </div>
  );
};
