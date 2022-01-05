import { useState } from "react";
import { Form, Modal, Card, Row, Col } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../../actions/projectActions";
import Preload from "../Preload";
import { toast } from "react-toastify";
// import ReactMarkdown from "react-markdown";

const AddProjectModal = ({ showModal, hideModal }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const dispatch = useDispatch();
  const projectCreate = useSelector((state) => state.projectCreate);
  const {loading, error } = projectCreate;

  const notifySuccess = (msg) =>
    toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  const resetHandler = () => {
    setProjectDescription("");
    setProjectName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProjectAction(projectName, projectDescription));
    if (!projectName || !projectDescription) return;
    resetHandler();
    hideModal();
    notifySuccess("Project Created");
  };

  return (
    <Modal centered size="md" show={showModal} onHide={hideModal}>
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
            {loading && <Preload/>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <div className="my-auto p-3">
                <label for="formGroupExampleInput" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                    placeholder="Project Name"
                    onChange={(e) => setProjectName(e.target.value)}
                    label={projectName}
                  />
            </div>
            <div className="my-auto p-3">
            <label for="formGroupExampleInput" className="form-label">Description</label>
              <textarea
                className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                value={projectDescription}
                placeholder="Enter something about your project"
                rows={4}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
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
