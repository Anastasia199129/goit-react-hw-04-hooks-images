import s from './modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, modalImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModalOnEscape);
    return () => window.removeEventListener('keydown', closeModalOnEscape);
  });

  const closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const omBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={omBackdropClick}>
      <div className={s.modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  modalImg: PropTypes.string,
};

export default Modal;
