import React, { useEffect } from 'react';
import FeedList from '../../components/feed-list/feed-list';
import { FeedSummary } from '../../components/feed-summary/feed-summary';
import styles from './feed.module.css';
import { feedSocketClose, feedSocketInit } from '../../services/slices/feed/feed';
import { TRootState } from '../../services/reducers';
import { useDispatch, useSelector } from '../../utils/hooks';

export const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: TRootState) => state.ingredients);

  useEffect(() => {
    if (ingredients.length) {
      dispatch(feedSocketInit());
    }
    return () => {
      dispatch(feedSocketClose());
    };
  }, [dispatch, ingredients]);

  return (
    <div className={styles.container}>
      <FeedList />
      <FeedSummary />
    </div>
  );
};
