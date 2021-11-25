import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Col, Dropdown, Row } from "react-bootstrap";
import EditProjectModal from "../Modals/EditProjectModal";
import AddProjectModal from "../Modals/AddProjectModal";
import { deleteProjectAction } from "../../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import Preload from "../Preload";
import ErrorMessage from "../ErrorMessage";

const ProjectCard = ({data}) => {
  const projectId = (data) ? data._id : null;
  const history = useHistory();
  const dispatch = useDispatch();
  const sectionList = (data && data.sections) ? data.sections: [];
  const handleOnClick = useCallback(() => history.push({pathname: '/board',
  sectionList,projectId}), [history, projectId]);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);

  const projectDelete = useSelector((state) => state.projectDelete);
  const {loading: loadingDelete, error: errorDelete} = projectDelete;

  const handleDelete = (id) => {
    if(window.confirm("Are you sure?")){
      dispatch(deleteProjectAction(id));
      window.location.reload(false);
    }
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
    <div className="sidebar-wrapper m-0 p-2">
      {loadingDelete && <Preload/>}
      {errorDelete && (<ErrorMessage varaint="danger">{errorDelete}</ErrorMessage>)}
      {data ?
      <div className="d-flex flex-column sidebar-box basecard project-card px-4 pb-4 pt-2">
        <div className="d-flex justify-content-end">
        <button type="button" className="d-flex btn m-0 p-0 ">
            <Dropdown className="my-auto">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                &nbsp;<i className="bi bi-three-dots fs-3" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditShow}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleDelete(data._id)}>Remove</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </button>
        </div>
        <div className="d-flex justify-content-flex-start">
          <img
            src="https://via.placeholder.com/150"
            alt=""
            className="rounded me-3"
            style={{ height: "50px", width: "50px" }}
          />
          <h4 className="text-limit">{data.project_name}</h4>
        </div>
        <div className="d-flex flex-fill flex-column mt-3">
          <p className="text-limit text-limit-project text-dark fs-6"> {data.project_description} </p>
          <div className="d-flex justify-content-between mt-auto">
            <Row>
              <Col>
                <blockquote className="blockquote mb-0">
                      <p>Created on{" "}<cite title="Source Title">{data.createdAt.substring(0,10)}</cite></p>
                </blockquote>
                </Col>
              <Col>
                <blockquote className="blockquote mb-0 hover-me" onClick={handleOnClick}>
                  <p>{" "}Open project <i className="bi bi-chevron-right"></i>{" "}</p>
                </blockquote>
              </Col>
            </Row>
          </div>
        </div>
        <EditProjectModal data={data} showModal={editShow} hideModal={handleEditClose}/>
      </div>
      :
          <div className="d-flex flex-column sidebar-box basecard project-card hover-me add-project px-4 pb-4 pt-2" onClick={handleShow}>
              <div className="mx-auto my-auto">
                <i className="lni lni-plus text-secondary"></i>
                <p className="text-secondary fs-6">New Project</p>
              </div>
          </div>
      } 
      <AddProjectModal showModal={show} hideModal={handleClose} />
    </div>
  );
};

export default ProjectCard;
