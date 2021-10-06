import { useState } from "react";
import { Form, Modal, Card, Dropdown, Row, Col } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../../actions/projectActions";
import ReactMarkdown from "react-markdown";

const AddProjectModal = ({ showModal, hideModal }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectPic, setProjectPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, error, project } = projectCreate;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pocketteams");
      data.append("cloud_name", "dppl4qapk"); //Username for cloudinary
      fetch("https://api.cloudinary.com/v1_1/dppl4qapk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProjectPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an Image");
    }
  };

  const resetHandler = () => {
    setProjectDescription("");
    setProjectName("");
    setProjectStatus("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProjectAction(projectName, projectDescription, projectStatus)
    );
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
              <Row>
                <Col md="6">
                  <Form.Control
                    type="title"
                    placeholder="Project Name"
                    onChange={(e) => setProjectName(e.target.value)}
                    label={projectName}
                  />
                </Col>
                <Col md="2">
                  <img
                    src={projectPic}
                    alt="Project_Pic"
                    className="rounded fs-3"
                    style={{
                      height: "5rem",
                      width: "5rem",
                      display: "block",
                      margin: "auto",
                    }}
                  ></img>
                </Col>
                <Col md="4" className="my-auto">
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <Form.Group controlId="pic">
                    <Form.File
                      onChange={(e) => postDetails(e.target.files[0])}
                      id="custom-file"
                      className="custom-file-label text-limit"
                      type="image/png"
                      custom
                    />
                  </Form.Group>
                </Col>
              </Row>
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
                <Form.Label>Project Status &nbsp; {projectStatus}</Form.Label>
                &nbsp;&nbsp;
                <Dropdown.Toggle
                  id="dropdown-custom-components dropdown-button-drop-up"
                  className="option f-dark"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={(e) => setProjectStatus("Light")}
                  >
                    Light
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={(e) => setProjectStatus("Medium")}
                  >
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={(e) => setProjectStatus("Heavy")}
                  >
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
