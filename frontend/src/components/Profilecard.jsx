import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../actions/userActions";
import pocketdevsLogo from "../assets_pocketdevs/assets/img/profile/generated_profile.PNG";

function ProfileCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };



  return (
    <div className="sidebar-box search-form-box mb-30">
      <h5>{user.first_name + " " + user.last_name}</h5>
      <p>{user.email_address}</p>
      <p className="text-dark">Pocketdevs</p>
      <p className="text-danger hover-me" onClick={handleShow}>
        <small>
          <i class="lni lni-cog" /> Account Settings
        </small>
      </p>
      <Modal show={show} onHide={handleClose} size="lg">
          <Container>
          <Modal.Header>
          <h5>My Profile Settings</h5>
          <button type="button" class="btn-close me-2" onClick={handleClose} aria-label="Close"></button>
        </Modal.Header>
            <Row>
              <Col xs="12">
                <div className="text-center mx-auto">
                  <div className="contact-form-wrapper">
                    <form onSubmit={null} className="contact-form">
                      <div className="text-center mx-auto">
                        <Row className="mb-20">
                          <div className="col-md-12">
                            <p>Profile Picture</p>
                          </div>
                          <div className="navbar-brand col-md-12">
                            <Image
                              src={pocketdevsLogo}
                              className="profile-image hover-me"
                            ></Image>
                          </div>
                        </Row>
                      </div>
                      <Row>
                        <Col md="6">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="First name"
                            required
                          />
                        </Col>
                        <Col md="6">
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
                        <Col md="6">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                          />
                        </Col>
                        <Col md="6">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                          />
                        </Col>
                        <Col md="12">
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
        <Modal.Footer>
            <Button
              className="theme-btn theme-btn-modal mx-0"
              onClick={handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>
      <p className="text-danger hover-me" onClick={logoutHandler}>
        <small>
          <strong>Logout</strong>
        </small>
      </p>
    </div>
  );
}

export default ProfileCard;
