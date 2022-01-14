import React from "react";
import { Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTeamUserAction } from "../../actions/teamActions";
import Swal from 'sweetalert2';

const EditTeamCard = (props) => {
  const dispatch = useDispatch();
  
  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const handleClick = (id, user_Id) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to remove this user?',
      icon: 'error',
      reverseButtons: true,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#dc3741',
      denyButtonColor: '#6c757d'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteTeamUserAction(id, user_Id));
        notifyInfo("User Deleted");
      } 
    })
  };

  return (
    <div className="sidebar-wrapper mt-10 mb-10 mx-1">
      <div className="sidebar-box">
        <div className="d-flex justify-content-end">
          <i class="lni lni-cross-circle hover-me" onClick={()=>handleClick(props.teamId ,props.data._id)}></i>
        </div>
        <div className="mb-20 recent-blog-img">
          <Image
            src={props.data.profile_pic}
            alt="Profile Picture"
            className="img-thumbnail"
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
