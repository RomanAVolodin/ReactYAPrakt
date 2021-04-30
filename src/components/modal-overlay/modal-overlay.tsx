import styles from './modal-overlay.module.css'
import { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';


const ModalOverlay = ({onCloseClick} : {onCloseClick: MouseEventHandler<HTMLDivElement>}) => {
  return (
    <div className={styles.Backdrop} onClick={onCloseClick}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onCloseClick: PropTypes.func.isRequired
};

export default ModalOverlay;