import { useState } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Modal from "../../components/Modal/Modal";


export default function RegistrationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
 <div onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
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