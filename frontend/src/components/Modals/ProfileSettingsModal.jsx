import React from 'react'
import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import pocketdevsLogo from "../../assets/img/profile/generated_profile.PNG";

const ProfileSettingsModal = ({showModal, hideModal}) => {
    return (
        <Modal show={showModal} onHide={hideModal} size="lg">
        <Container>
          <Modal.Header>
            <h5>My Profile Settings</h5>
            <button
              type="button"
              className="btn-close me-2"
              onClick={hideModal}
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Row>
            <Col xs="12">
              <div className="text-center mx-auto">
                  <div className="text-center mx-auto">  
                    <Row className="mb-20">
                      <div className="col-md-12">
                      <Form.Label>Profile Picture</Form.Label>
                      </div>
                      <div className="navbar-brand col-md-12">
                        <Image
                          src={pocketdevsLogo}
                          alt="Profile Picture"
                          className="profile-image hover-me"
                        ></Image>
                      </div>
                    </Row>
                  </div>
                  <Row className="mb-20 justify-content-md-center">
                    <Col md="5">
                      <Form.Control type="text" name="first_name" placeholder="First Name" required />
                    </Col>
                    <Col md="5">
                      <Form.Control type="text" name="last_name" placeholder="Last Name" required />
                    </Col>
                  </Row>
                  <Row className="mb-20 justify-content-md-center">
                  <Col md="5">
                      <Form.Control type="email" name="email" id="email" placeholder="Email Address" required />
                    </Col>
                    <Col md="5">
                      <Form.Control type="password" name="password" placeholder="Password" required />
                    </Col>
                    </Row>
                    <Row className="mb-20 justify-content-md-center">
                    <Col md="10">
                      <div className="text-center">
                
                          <textarea
                            class="form-control"
                            type="text"
                            name="about_me"
                            id="about_me"
                            required
                            rows="5"
                            placeholder="About me"
                        />
                      </div>
                    </Col>
                    </Row>
                </div>
            </Col>
          </Row>
        </Container>
        <Modal.Footer>
          <Button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ProfileSettingsModal
