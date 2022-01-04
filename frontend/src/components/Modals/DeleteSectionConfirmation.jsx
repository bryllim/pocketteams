import { Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { TaskContext } from "../../contexts/SectionContext";

const DeleteSectionConfirmation = ({
  showModal,
  hideModal,
  sectionId,
  index,
  removeSection,
}) => {
  const {  
    initialData,
    setInitialData,
    dispatch } =
    useContext(TaskContext);
  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Do you want to remove this section?</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Footer>
          <button
            className="btn btn-outline-secondary  theme-btn-modal rounded-pill"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={() =>
              removeSection({
                initialData,
                setInitialData,
                sectionId,
                index,
                dispatch
              })
            }
          >
            Remove Section
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteSectionConfirmation;
