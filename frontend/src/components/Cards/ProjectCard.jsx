import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import EditProjectModal from "../Modals/EditProjectModal";

const ProjectCard = () => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/board"), [history]);
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
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
    <div className="sidebar-wrapper m-0">
      <div className="d-flex flex-column sidebar-box basecard project-card">
        <div className="d-flex justify-content-between">
          <img
            src="https://via.placeholder.com/150"
            alt=""
            className="rounded"
            style={{ height: "50px", width: "50px" }}
          />
          <button type="button" className="d-flex btn m-0 p-0 ">
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <i className="bi bi-three-dots" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditShow}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={null}>Remove</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </button>
        </div>
        <div className="d-flex flex-fill flex-column mt-3">
          <h4 className="mb-1">Title</h4>
          <p className="ps-3"> Contedsa here </p>

          <div className="d-flex justify-content-between mt-auto">
            <p>Date</p>
            <p className="hover-me" onClick={handleOnClick}>
              {" "}
              Open project <i className="bi bi-chevron-right"></i>{" "}
            </p>
          </div>
        </div>
      </div>
      <EditProjectModal showModal={editShow} hideModal={handleEditClose}/>
    </div>
  );
};

export default ProjectCard;
