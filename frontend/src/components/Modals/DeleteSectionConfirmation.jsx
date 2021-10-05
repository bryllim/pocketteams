import {
  Form,
  Modal,
  Col,
  Row,
} from "react-bootstrap";
import React,{useContext} from "react";
import {TaskContext} from "../../contexts/SectionContext"

const DeleteSectionConfirmation = ({ showModal, hideModal,columnId,index }) => {
  const {removeSection} = useContext(TaskContext)
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
            className="btn btn-outline-secondary rounded"
            onClick={hideModal}
          >
            Cancel
          </button>

          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={()=>removeSection(columnId,index)}
          >
            Remove Section
          </button>

          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteSectionConfirmation;
