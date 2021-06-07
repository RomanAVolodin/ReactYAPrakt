import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404: React.FC = () => {
  return (
    <div
      style={{
        paddingTop: 50,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <h3 className="mt-4 mb-15 text text_type_main-large">Страница не найдена</h3>
      <Link style={{ color: 'white' }} className="text text_type_main-default" to={'/'}>
        Перейти на главную
      </Link>
    </div>
  );
};

export default NotFound404;
