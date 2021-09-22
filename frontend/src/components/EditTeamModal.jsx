import { useState } from "react";
import { Form, Modal, Col, Row, Container, Image } from "react-bootstrap";
import pocketdevsLogo from "../assets_pocketdevs/assets/img/profile/generated_profile.PNG";

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
          <Row xs="1" sm="2" md="3" className="mx-auto">
            <Col>
              <div className="sidebar-wrapper mt-10 mb-10">
                <div className="sidebar-box">
                  <Row className="mb-20">
                    <Image
                      src={pocketdevsLogo}
                      roundedCircle
                      className="edit-modal"
                    ></Image>
                  </Row>
                  <Row>
                    <Col>
                      <small><p>Sebastian Ceblano</p></small>
                      <small><p>Member</p></small>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col>
            <div className="sidebar-wrapper mt-10 mb-10">
                <div className="sidebar-box">
                  <Row className="mb-20">
                    <Image
                      src={pocketdevsLogo}
                      roundedCircle
                      className="edit-modal"
                    ></Image>
                  </Row>
                  <Row>
                    <Col>
                      <p>Sebastian Ceblano</p>
                      <p>Member</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <button className="theme-btn theme-btn-modal mx-0" onClick={hideModal}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamModal;
