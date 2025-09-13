import { useState } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Modal from "../../components/Modal/Modal";
import css from './RegistrationPage.module.css'

export default function RegistrationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
 <div className={css.modalOverlay} onClick={closeModal}>
          <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <RegistrationForm />
        </Modal>
      
      )}
        </div>
     </div>
    </>
  );
}