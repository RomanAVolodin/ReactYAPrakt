import React, { ReactChild, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals-container') as HTMLElement;

const Modal = ({
  title,
  show,
  children,
  onCloseClick,
}: {
  title?: string;
  show?: boolean;
  children: ReactChild;
  onCloseClick: () => void;
}) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseClick();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onCloseClick]);

  if (!show) {
    return null;
  }

  const onclick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={[styles.ModalWindow, 'text text_type_main-default'].join(' ')}
        onClick={onclick}
      >
        <div className={styles.TitleAndClose}>
          <span className="text text_type_main-medium">{title}</span>
          <CloseIcon type="primary" onClick={onCloseClick} />
        </div>
        {children}
      </div>
      <ModalOverlay onCloseClick={onCloseClick} />
    </>,
    modalRoot,
  );
};

export default Modal;
