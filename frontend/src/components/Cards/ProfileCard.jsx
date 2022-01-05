/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useSelector } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../actions/userActions";
import ProfileSettingsModal from "../Modals/ProfileSettingsModal";
import Swal from 'sweetalert2'
function ProfileCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(true);
  const logoutHandler = async() => {
    const result = await Swal.fire({
      title: "Wait!",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#dc3741",
      denyButtonColor: "#6c757d",
    })
      /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoggedIn(false);
    }
  };

  if(!loggedIn) {
      dispatch(logout());
    history.push("/");
  }

  return (
    <div className="sidebar-box recent-blog-box mb-30">
      <div className="recent-blog-items">
        <div className="recent-blog">
          <div className="recent-blog-img my-auto">
            <img
              className="img-thumbnail"
              src="https://images.generated.photos/aAfI_Wg_CmFdnZIYHNNUTBmqlNrh_HSSQblB77dy3ro/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDg2MDg2LmpwZw.jpg"
              alt=""
            />
          </div>
          <div className="recent-blog-content">
            <p className="text-dark fw-bold">
              {user.first_name + " " + user.last_name}
            </p>
            <p className="date">{user.email_address}</p>
            <a className="text-danger hover-me" onClick={handleShow}>
              <small><i className="lni lni-cog" /> Account Settings</small>
            </a>
            <div>
              <a className="text-danger hover-me" onClick={logoutHandler}>
                <strong>
                  <small>Logout</small>
                </strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProfileSettingsModal
        user={user}
        showModal={show}
        hideModal={handleClose}
      />
    </div>
  );
}

export default ProfileCard;
