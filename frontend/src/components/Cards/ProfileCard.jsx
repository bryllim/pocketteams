/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector  } from "react-redux";
import { useHistory } from "react-router";
import { getUserAction, logout } from "../../actions/userActions";
import ProfileSettingsModal from "../Modals/ProfileSettingsModal";
import Swal from 'sweetalert2'
function ProfileCard() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pic, setPic] = useState(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = async() => {
    const result = await Swal.fire({
      title: "Logout?",
      html: "<p>Are you sure you want to <b>logout?</></p>",
      text: "Are you sure you want to",
      icon: "question",
      showDenyButton: true,
      denyButtonText: `Cancel`,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#dc3741",
      denyButtonColor: "#6c757d",
    })
      /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      dispatch(logout());
      history.push("/");
    }
  };
  
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, data: userData, success: updateSuccess} = userUpdate;

  //Loading the user profile
  useEffect(() => {
    if(user){
      setUserName(user.first_name + " " + user.last_name);
      setEmail(user.email_address);
      setPic(user.profile_pic);
    } else {
      history.push("/");
    }
  }, [user, history])

  //Updating the user profile
  useEffect(() => {
    if(userData){
      if(updateLoading === false){
        setUserName(userData.first_name + " " + userData.last_name);
        setEmail(userData.email_address);
        setPic(userData.profile_pic);
      }
    } else {
      if(user){
        setUserName(user.first_name + " " + user.last_name);
        setEmail(user.email_address);
        setPic(user.profile_pic);
      }  
    }   
  }, [updateLoading, userData, updateSuccess, user])

  return (
    <div className="sidebar-box recent-blog-box mb-30">
      <div className="recent-blog-items">
        <div className="recent-blog">
          <div className="recent-blog-img my-auto">
            <Image
              className="img-thumbnail"
              src={pic}
              alt=""
            />
          </div>
          <div className="recent-blog-content">
            <p className="text-dark fw-bold">
              {userName}
            </p>
            <p className="date">{email}</p>
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
        showModal={show}
        hideModal={handleClose}
      />
    </div>
  );
}

export default ProfileCard;
