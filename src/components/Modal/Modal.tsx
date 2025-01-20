import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { TModal } from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById("modal");

export const Modal: React.FC<TModal> = ({active, setClose, children}) => {

  const escFunction: (event: KeyboardEvent) => void = React.useCallback((event) => {
    if (event.key === "Escape") {
      setClose();
    }
  }, []);

  React.useEffect(() => {
    if (active) {
      document.addEventListener("keydown", escFunction);
    } 
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [active]);

  return ReactDOM.createPortal(
    (
      <ModalOverlay active={active} setClose={setClose}>
      <div className={active ? `${styles.modal__container} ${styles.modal__contVisibility_active}` : `${styles.modal__container}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal__close-button']} onClick={setClose}>
          x
        </button>
        {children}
      </div>  
    </ModalOverlay>
    ), modalRoot!
  );
}
