import { useState } from "react";
import { Form, Modal, Card, Dropdown } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../../actions/projectActions";

const AddProjectModal = ({ showModal, hideModal }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const dispatch = useDispatch();
  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, error, project } = projectCreate;

  const resetHandler = () => {
    setProjectDescription("");
    setProjectName("");
    setProjectStatus("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProjectAction(projectName, projectDescription, projectStatus));
    if (!projectName || !projectDescription || !projectStatus) return;

    resetHandler();
    hideModal();
    window.location.reload(false);
  };

  return (
    <Modal centered size="lg" show={showModal} onHide={hideModal}>
      <Card>
        <Modal.Header>
          <h5>Create New Project</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={null}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="project_name" className="my-auto p-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={projectName}
                placeholder="Project Name"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="project_description" className="my-auto p-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={projectDescription}
                placeholder="Enter something about your project"
                rows={4}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex my-auto p-3 search-form-box">
              <Dropdown>
                <Form.Label>Project Status &nbsp; {projectStatus}</Form.Label>&nbsp;&nbsp;
                <Dropdown.Toggle
                  id="dropdown-custom-components dropdown-button-drop-up"
                  className="option f-dark"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" onClick={(e) => setProjectStatus("Light")}>
                    Light
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={(e) => setProjectStatus("Medium")}>
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={(e) => setProjectStatus("Heavy")}>
                    Heavy
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="theme-btn theme-btn-md mx-3"
            onClick={submitHandler}
          >
            Create Project
          </button>
        </Modal.Footer>
      </Card>
    </Modal>
  );
};

export default AddProjectModal;
