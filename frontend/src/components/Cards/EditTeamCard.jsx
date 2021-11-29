import React, { useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTeamUserAction } from "../../actions/teamActions";

const EditTeamCard = (props) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const teamUserDelete = useSelector((state) => state.teamUserDelete);
  const {loading, error} = teamUserDelete

  const notifySuccess = (msg) => toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  const handleClick = (id, userId) => {
    if(window.confirm("Are you sure?")){
      dispatch(deleteTeamUserAction(id, userId));
      window.location.reload(false);
      notifySuccess();
    }
    //Delete user
  };


  return (
    <div className="sidebar-wrapper mt-10 mb-10 mx-1">
      <div className="sidebar-box">
        <div className="d-flex justify-content-end">
          <i class="lni lni-cross-circle hover-me" onClick={()=>handleClick(props.teamId ,props.data._id)}></i>
        </div>
        <div className="mb-20 navbar-brand">
          <Image
            //   src={user.profile_picture}
            src={props.logo}
            alt="Profile Picture"
            className="profile-image hover-me"
          ></Image>
        </div>
        <Row>
          <p className="editteam-p text-center text-primary">
            {props.data.first_name + " " + props.data.last_name}
          </p>
        </Row>
        <Row>
          <p className="editteam-p editteam-email text-center">
            {props.data.email_address}
          </p>
        </Row>
        <Row>
          <p className="editteam-p editteam-email text-center">Role</p>
        </Row>
      </div>
    </div>
  );
};

export default EditTeamCard;
