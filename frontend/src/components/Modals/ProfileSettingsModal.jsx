import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../actions/userActions";
import { toast } from "react-toastify";



const ProfileSettingsModal = ({ showModal, hideModal }) => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  
  const profileRef = React.createRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {loading: updateLoading, data: userData, success: updateSuccess} = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {

    if(updateSuccess && updateLoading === false && userData){
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmailAddress(userData.emailAddress);
    }

    if (userInfo) {
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setEmailAddress(userInfo.email_address);
    }
  }, [userInfo]);

  const updateHandler = (e) => {

    const PP = profileRef.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();
    console.log("Image as data url: ", imageAsDataURL);


    //Update
    e.preventDefault();
    // dispatch(
    //   updateUserAction(
    //     userInfo._id,
    //     firstName,
    //     lastName,
    //     emailAddress,
    //     password,
    //     confirmPassword,
    //     file
    //   )
    // );
    notifyInfo("User Updated");
    //resetHandler();
    //hideModal();
  };

  //NOTIFICATIONS
  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const resetHandler = () => {
    setFirstName(null);
    setLastName(null);
    setEmailAddress(null);
    setPassword(null);
    setConfirmPassword(null);
  };
  
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
                      ref={profileRef}
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
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Col>
                <Col md="5">
                  <label className="form-label">Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Col>
                <Col md="5">
                  <label className="form-label">Confirm Password</label>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onChange={(e) => setEmailAddress(e.target.value)}
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
        <Button
          className="theme-btn theme-btn-modal mx-0"
          onClick={updateHandler}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileSettingsModal;
