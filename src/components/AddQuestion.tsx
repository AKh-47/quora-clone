import React, { ReactElement, useRef } from "react";
import Modal from "react-modal";
import "../styles/question.scss";

import { useQuestions } from "../context/QuestionContext";

interface Props {
  isOpen: boolean;
  closeModal: Function;
}

export default function AddQuestion({
  isOpen,
  closeModal,
}: Props): ReactElement {
  const { postQuestion } = useQuestions();

  const questionInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async () => {
    const ques = questionInputRef.current?.value;
    if (!ques) return;
    await postQuestion(ques);
    closeModal();
  };

  const closeHandler = () => closeModal();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="addQues"
      contentLabel="Add Question"
      overlayClassName="addQues__overlay"
    >
      <h1>Add A Question</h1>
      <input
        ref={questionInputRef}
        type="text"
        placeholder="What is your question?"
      />
      <button onClick={handleAdd}>Add Question</button>
      <div onClick={closeHandler} className="cancel">
        <i className="fas fa-times"></i>
      </div>
    </Modal>
  );
}
