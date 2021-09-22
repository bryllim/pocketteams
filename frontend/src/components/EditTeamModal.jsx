import { useState } from "react";
import {
  Form,
  Modal,
  Col,
  Row,
  Container,
} from "react-bootstrap";

const EditTeamModal = ({ showModal, hideModal }) => {
  return (
      <Modal size="lg" show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Edit Team</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
            <Col>
            <div className="sidebar-wrapper">
              <div className="sidebar-box">
                1</div>
              </div>
            </Col>
          </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
  );
};

export default EditTeamModal;
