import css from './Modal.module.css'

export default function Modal({ children, onClose }) {
  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}