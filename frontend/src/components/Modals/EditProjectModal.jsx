import React, { useState,useEffect } from "react";
import { Form, Modal, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAction } from "../../actions/projectActions";
import ErrorMessage from "../ErrorMessage";
import AddMemberModal from "./AddMemberModal";
import Preload from "../Preload";

const EditProjectModal = ({ showModal, hideModal, data}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectName, setProjectName] = useState(data.project_name);
  const [projectDescription, setProjectDescription] = useState(data.project_description);
  const [projectStatus, setProjectStatus] = useState(data.project_status);

  const dispatch = useDispatch();

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {loading, error} = projectUpdate;

  const [color, setColor] = useState("form-select form-select-sm ms-3");

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProjectAction(data._id, projectName, projectDescription, projectStatus));
    if(!projectName || !projectDescription || !projectStatus) return;

    resetHandler();
    hideModal();
    window.location.reload(false);
  }

  const resetHandler = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectStatus("");
  }

  const reClass = (e) => {
    if (e.target.value === "light") {
      setColor("form-select form-select-sm ms-3 light");
    } else if (e.target.value === "medium") {
      setColor("form-select form-select-sm ms-3 medium");
    } else if (e.target.value === "heavy") {
      setColor("form-select form-select-sm ms-3 heavy");
    } else if (e.target.value === "set priority") {
      setColor("form-select form-select-sm ms-3 prio");
    }
    setProjectStatus(e.target.value);
  };

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

  useEffect(() => {
    //to check/show the color
    if (projectStatus === "light") {
      setColor("form-select form-select-sm ms-3 light");
    } else if (projectStatus === "medium") {
      setColor("form-select form-select-sm ms-3 medium");
    } else if (projectStatus === "heavy") {
      setColor("form-select form-select-sm ms-3 heavy");
    }
  },[projectStatus]);

  return (
    <Modal size="lg" centered show={showModal} onHide={hideModal}>
      <Modal.Header>
        <h5>Edit Project</h5>
        <button
          type="button"
          class="btn-close me-2"
          onClick={hideModal}
          aria-label="Close"
        ></button>
      </Modal.Header>

      <Modal.Body>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <div className="d-flex flex-column align-items-center">
          <div
            className="d-flex flex-column  align-items-center "
            style={{ width: "500px" }}
          >
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="rounded"
              style={{ height: "150px", width: "150px" }}
            />

            <div class="mb-3">
              <input
                type="text"
                class="form-control text-center border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                placeholder="Title"
                defaultValue={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
              />
            </div>

            <div class="mb-3 align-self-stretch">
              <label for="formGroupExampleInput" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
                defaultValue={projectDescription}
                onChange={(e)=> setProjectDescription(e.target.value)}
              />
            </div>

            <div class="mb-3 align-self-stretch">
            <Form.Group className="d-flex my-auto p-3 search-form-box">
            <Form.Label className="text-dark fs-6 my-auto"> Project Status:  </Form.Label>
                    <select
                      className={color}
                      aria-label="form-select-sm example"
                      id="status"
                      onChange={(e) => reClass(e)}
                      defaultValue={projectStatus}
                    >
                      <option
                        className="form-select form-select-sm"
                      >
                        select priority
                      </option>
                      <option className="light form-select-sm" value="light">
                        Light
                      </option>
                      <option className="medium form-select-sm" value="medium">
                        Medium
                      </option>
                      <option className="heavy form-select-sm" value="heavy">
                        Heavy
                      </option>
                    </select>
            </Form.Group>
            </div>

            <div className="sidebar-wrapper">
              <div
                className="d-flex flex-row basecard align-items-center align-self-stretch sidebar-box search-form-box"
                style={{ height: "115px" }}
              >
                <button type="d-flex button" class="btn">
                  <i class="bi bi-caret-right-fill" />
                </button>

                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />

                <button type="button" class="btn ms-auto align-self-start">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <i className="bi bi-three-dots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={null}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </button>
              </div>
              <AddMemberModal showModal={show} hideModal={handleClose} />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {loading && <Preload/>}
        <button className="theme-btn theme-btn-modal mx-0" onClick={updateHandler}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
