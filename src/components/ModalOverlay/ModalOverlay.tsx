import React from 'react';
import styles from './ModalOverlay.module.css';

export interface TModal {
  active: boolean;
  setActive?: () => void;
  setClose: () => void;
  children?: React.ReactNode;
}

const ModalOverlay: React.FC<TModal> = ({active, setClose, children}) => {

  return (
    <div className={active ? `${styles.modalOverlay} ${styles.modalOverlay__visibility_active}` : `${styles.modalOverlay}`} onClick={setClose}>
        {children}
    </div>
  );
}

export default ModalOverlay;