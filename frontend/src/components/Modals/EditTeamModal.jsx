import { useState } from "react";
import { Form, Modal, Col, Row, Container, Image } from "react-bootstrap";
import EditTeamCard from "../Cards/EditTeamCard";
import pocketdevsLogo from "../../assets_pocketdevs/assets/img/profile/generated_profile.PNG";

const EditTeamModal = ({ showModal, hideModal, data }) => {

  console.log("Modal: " + data.team_name);
  return (
 
    <Modal centered size="lg" show={showModal} onHide={hideModal}>
      <Modal.Header>
        <h5>Edit Team</h5>
        <button
          type="button"
          class="btn-close"
          onClick={hideModal}
          aria-label="Close"
        ></button> 
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row xs="1" sm="2" md="3" className="mx-auto">
            <Col>
              <EditTeamCard logo={pocketdevsLogo} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <button className="theme-btn theme-btn-modal mx-0" onClick={hideModal}>
        <i class="lni lni-plus"></i> Add Members
        </button>
      </Modal.Footer>
      </Modal>
  );
};

export default EditTeamModal;
