import { useQuiz } from 'contexts/QuizContext';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
  const { handleCancel, handleConfirm, isModalOpen, warningTimeSound } =
    useQuiz();
  const navigate = useNavigate();

  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to quit?</p>
        <button onClick={handleCancel}>Cancel</button>
        <button
          onClick={() => {
            handleConfirm();
            navigate('/languages');
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
