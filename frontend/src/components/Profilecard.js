import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import pocketdevsLogo from "../assets_pocketdevs/assets/img/profile/generated_profile.PNG";
import settingsLogo from "../assets_pocketdevs/assets/img/profile/settings.svg";

function Profilecard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = localStorage.getItem("userInfo");

  return (
    <div className="container basecard">
      <div class="col">
        <h5>{user.first_name}</h5>
        <h6>test@gmail.com</h6>
        <h6>Pocketdevs</h6>
        <h6 className="hover-me" onClick={handleShow}>
          <Image src={settingsLogo} className="settings-icon" />
          Account Settings
        </h6>
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>My Profile Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs="12">
                  <div className="text-center mx-auto">
                    <div className="contact-form-wrapper">
                      <form onSubmit={null} className="contact-form">
                        <div className="text-center mx-auto">
                          <Row className="mb-20">
                            <Col xs="6">
                              <div className="col-md-12">
                                <p>Profile Picture</p>
                              </div>
                              <div className="navbar-brand col-md-12">
                                <Image
                                  src={pocketdevsLogo}
                                  className="profile-image hover-me"
                                ></Image>
                              </div>
                            </Col>
                            <Col xs="6" className="my-auto">
                              <div className="col-md-12">
                                <p className="hover-me">Upload new photo</p>
                              </div>
                              <div className="col-md-12">
                                <p className="hover-me">Remove photo</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Row>
                          <Col xs="6">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="First name"
                              required
                            />
                          </Col>
                          <Col xs="6">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              placeholder="Last name"
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Email"
                              required
                            />
                          </Col>
                          <Col xs="6">
                            <div className="col-md-12">
                              <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="text-center mx-md-0">
                              <form onSubmit={null} className="contact-form">
                                <div className="col-md-12">
                                  <textarea
                                    type="text"
                                    name="about_me"
                                    id="about_me"
                                    placeholder="About me"
                                    required
                                  />
                                </div>
                              </form>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="theme-btn" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <h6>Logout</h6>
      </div>
    </div>
  );
}

export default Profilecard;
