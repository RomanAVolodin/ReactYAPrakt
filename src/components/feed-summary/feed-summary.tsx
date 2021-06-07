import React from 'react';
import styles from './feed-summary.module.css';


export const FeedSummary: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.orders_numbers}>
        <div className={styles.orders_ready}>
          <p className="text text_type_main-medium mb-6">
            Готовы:
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">
            В работе:
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>
          <p className="text text_type_digits-default mb-3">
            0467682
          </p>

        </div>
      </div>
      <p className="text text_type_main-medium mb-6 mt-20">
        Выполнено за все время:
      </p>
      <p className="text text_type_digits-large glow_text">12 567</p>
      <p className="text text_type_main-medium mb-6 mt-20">
        Выполнено за сегодня:
      </p>
      <p className="text text_type_digits-large glow_text">138</p>
    </div>
  );
};
