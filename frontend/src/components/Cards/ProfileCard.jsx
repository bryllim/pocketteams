import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../actions/userActions";
import ProfileSettingsModal from "../Modals/ProfileSettingsModal";

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
      <p className="text-danger" onClick={handleShow}>
        <small className="hover-me">
          <i className="lni lni-cog" /> Account Settings
        </small>
      </p>
      <p className="text-danger" onClick={logoutHandler}>
        <small className="hover-me">
          <strong>Logout</strong>
        </small>
      </p>
      <ProfileSettingsModal
        user={user}
        showModal={show}
        hideModal={handleClose}
      />
    </div>
  );
}

export default ProfileCard;
