import styles from './modal-overlay.module.css';
import { MouseEventHandler } from 'react';

const ModalOverlay = ({ onCloseClick }: { onCloseClick: MouseEventHandler<HTMLDivElement> }) => {
  return <div className={styles.Backdrop} onClick={onCloseClick}></div>;
};

export default ModalOverlay;
