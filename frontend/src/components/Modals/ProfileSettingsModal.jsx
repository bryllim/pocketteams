import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import { useSelector } from "react-redux";

const ProfileSettingsModal = ({ showModal, hideModal}) => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
    
  useEffect(() => {
    console.log("Info: ", userInfo);
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmailAddress(userInfo.email_address);
    setProfilePic(userInfo.profile_pic);
  }, [userInfo])

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
            <div className="text-start">
              <div className="text-start">
                <Row className="mb-20">
                  <div className="navbar-brand col-md-12">
                    <ProfilePicture
                      image={profilePic}
                      useHelper={true}
                      debug={true}
                    />
                  </div>
                </Row>
              </div>
              <Row className="mb-20 justify-content-md-center">
                <Col md="5">
                <label className="form-label">First Name</label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    defaultValue={firstName}
                    required
                  />
                </Col>
                <Col md="5">
                <label className="form-label">Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-20 justify-content-md-center">
                <Col md="5">
                    <label className="form-label">Last Name</label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    defaultValue={lastName}
                    required
                  />
                </Col>
                <Col md="5">
                <label className="form-label">Confirm Password</label>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-80 justify-content-md-center">
                <Col md="5">
                <label className="form-label">Email Address</label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    defaultValue={emailAddress}
                    required
                  />
                </Col>
                <Col md="5"></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal.Footer>
        <Button className="theme-btn theme-btn-modal mx-0" onClick={hideModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileSettingsModal;
