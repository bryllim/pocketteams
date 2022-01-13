import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage"
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProfileSettingsModal = ({ showModal, hideModal, data}) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(null);

  const profileRef = React.createRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {success: updateSuccess, error: updateError} = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo){
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setEmailAddress(userInfo.email_address);
    }
  }, [userInfo])

  const updateHandler = (e) => {
    e.preventDefault();
    //postDetails(profileRef.current.state.file)
    console.log("DATA 1: ", profileRef.current.state.file);
    console.log("PIC: ", pic);
    //Update
    dispatch(
      updateUserAction(
        userInfo._id,
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        pic
      )
    );
    
    if(updateSuccess){
      notifyInfo("User Updated");
    } else {
      notifyWarning("Update Failed: ", updateError);
      console.log("Error: ", updateError);
    }  
    hideModal();
  };

  const uploadImage = () => {
    postDetails(profileRef.current.state.file)
  }

  const postDetails = (image) => {
    if (!image) {
      return setPicMessage("Please Select an Image");
    }

    setPicMessage(null);

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append('upload_preset', 'pocketteams');
      data.append('cloud_name', 'dppl4qapk');
      fetch("https://api.cloudinary.com/v1_1/dppl4qapk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        }).then( async() => {
          Swal.fire('Image is uploaded successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  //NOTIFICATIONS
  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

    const notifyWarning = (msg) =>
    toast.warning(msg, {
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
                    {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                      )}
                    <ProfilePicture
                      ref={profileRef}
                      useHelper={true}
                      debug={true}
                    />
                      <Button
                        className="theme-btn theme-btn-modal ms-5"
                        onClick={uploadImage}
                      > Upload Image </Button> 
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
