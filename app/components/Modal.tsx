// src/components/Modal.tsx
import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode; // add this line
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
