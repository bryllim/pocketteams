import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Col, Dropdown, Row } from "react-bootstrap";
import EditProjectModal from "../Modals/EditProjectModal";
import AddProjectModal from "../Modals/AddProjectModal";

const ProjectCard = ({data}) => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/board"), [history]);
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);

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
                <Dropdown.Item onClick={null}>Remove</Dropdown.Item>
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
          <h4>{data.project_name}</h4>
        </div>
        <div className="d-flex flex-fill flex-column mt-3">
          <p className="text-limit text-limit-project text-dark fs-6"> {data.project_description} </p>
          <div className="d-flex justify-content-between mt-auto">
            <blockquote className="blockquote mb-0">
                  <p>Created on{" "}<cite title="Source Title">{data.createdAt.substring(0,10)}</cite></p>
            </blockquote>
            <blockquote className="blockquote mb-0 hover-me" onClick={handleOnClick}>
              <p>{" "}Open project <i className="bi bi-chevron-right"></i>{" "}</p>
            </blockquote>
          </div>
        </div>
      </div>

      :
          <div className="d-flex flex-column sidebar-box basecard project-card hover-me add-project px-4 pb-4 pt-2" onClick={handleShow}>
              <div className="mx-auto my-auto">
                <i className="lni lni-plus text-dark"></i>
                <p className="text-dark fs-6">New Project</p>
              </div>
          </div>
      } 
      <EditProjectModal data_id={`/`} showModal={editShow} hideModal={handleEditClose}/>
      <AddProjectModal showModal={show} hideModal={handleClose} />
    </div>
  );
};

export default ProjectCard;
