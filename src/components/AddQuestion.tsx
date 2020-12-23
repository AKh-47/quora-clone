import React, { ReactElement } from "react";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  closeModal: Function;
}

export default function AddQuestion({
  isOpen,
  closeModal,
}: Props): ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Question"
      // className="addQues"
      // overlayClassName="addQues__overlay"
    >
      ffdfdf
    </Modal>
  );
}
