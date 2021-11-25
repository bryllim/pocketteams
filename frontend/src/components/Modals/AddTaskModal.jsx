import {
  Form,
  Modal,
  Col,
  Row,
} from "react-bootstrap";
import React from "react";

const AddTaskModal = ({ showModal, hideModal }) => {
  
  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Add Task</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body>
          <Row xs="12">
            <Col xs="6">
                <Form.Control type="email" placeholder="Task Title" />
            </Col>
            <Col xs="6">
                <Form.Label>Add to Project</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
            </Col>
            <Col md="12">
              <Form.Label>Add to Project</Form.Label>
              <textarea
                class="form-control"
                placeholder="add emails here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Add Task
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTaskModal;
