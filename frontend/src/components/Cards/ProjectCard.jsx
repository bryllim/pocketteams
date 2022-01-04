import React, { useCallback, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import EditProjectModal from "../Modals/EditProjectModal";
import AddProjectModal from "../Modals/AddProjectModal";
import { deleteProjectAction } from "../../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import Preload from "../Preload";
import ErrorMessage from "../ErrorMessage";
import { Row,Col } from "react-bootstrap";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

const ProjectCard = ({ data }) => {
  const projectId = data ? data._id : null;

  const history = useHistory();
  const dispatch = useDispatch();
  const sectionList = useMemo(
    () => (data && data.sections ? data.sections : []),
    [data]
  );
  const handleOnClick = useCallback(
    () => history.push({ pathname: "/board", sectionList, projectId }),
    [history, sectionList, projectId]
  );

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const projectDelete = useSelector((state) => state.projectDelete);
  const { loading: loadingDelete, error: errorDelete } = projectDelete;

  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this project?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#dc3741",
      denyButtonColor: "#6c757d",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteProjectAction(id));
        notifyInfo("Project Deleted");
      } 
    })
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
  ));

  return (
    <div className="sidebar-wrapper">
      {errorDelete && (<ErrorMessage varaint="danger">{errorDelete}</ErrorMessage>)}
      {data ?
      (
      <div className="d-flex flex-column sidebar-box basecard project-card px-4 pb-4 pt-2">
        <div className="d-flex justify-content-end">
        <button type="button" className="d-flex btn m-0 p-0">
            <Dropdown className="my-auto">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                &nbsp;<i className="lni lni-more-alt fs-5" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditShow}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleDelete(data._id)}>Remove</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </button>
        </div>
        <div className="d-flex justify-content-flex-start">
          <h4 className="text-limit">{data.project_name}</h4>
        </div>
        <div className="d-flex flex-fill flex-column mt-3">
          <p className="text-limit text-limit-project text-secondary fs-10"> {data.project_description} </p>
          <div className="d-flex justify-content-between mt-auto">
            <Row>
              <Col>
                <button className="theme-btn theme-btn-sm" onClick={handleOnClick}>
                    Open Project &nbsp;<i className="lni lni-arrow-right"></i>&nbsp;
                </button>
              </Col>
            </Row>
          </div>
          <EditProjectModal
            data={data}
            showModal={editShow}
            hideModal={handleEditClose}
          />
        </div>
      </div>
      ) : (
  
        <div
          className="d-flex flex-column sidebar-box basecard project-card project-card m-2  p-2 hover-me add-project "
          onClick={handleShow}
        >
          <div className="mx-auto my-auto">
            <i className="lni lni-plus text-secondary"></i>
            <p className="text-secondary fs-6">New Project</p>
          </div>
        </div>
        
      )}
      <AddProjectModal showModal={show} hideModal={handleClose} />
    </div>
    
  );
};

export default ProjectCard;
