import { useState } from "react";
import { Form, Modal, Card, Dropdown, Row, Col, Button, DropdownButton } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../../actions/projectActions";
import Preload from "../Preload";
// import ReactMarkdown from "react-markdown";

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
  const [color, setColor] = useState("form-select form-select-sm ms-3");

  const reClass = () => {
    let val = document.getElementById("test").value;

    if (val == 1) {
      setColor("form-select form-select-sm ms-3 light");
    } else if (val == 2) {
      setColor("form-select form-select-sm ms-3 medium");
    } else if (val == 3) {
      setColor("form-select form-select-sm ms-3 heavy");
    } else if (val == "select priority") {
      setColor("form-select form-select-sm ms-3 prio");
    }
  };

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
            {loading && <Preload/>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="project_name" className="my-auto p-3">
              <Row>
                <Col md="3">
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <Form.Label className="text-dark ms-2">Project Picture</Form.Label>
                  <img
                    src={projectPic}
                    alt="Project_Pic"
                    className="rounded fs-3 ms-2"
                    style={{
                      height: "6rem",
                      width: "6rem",
                      margin: "1rem 0rem",
                      display: "block",
                      objectFit: "cover"
                    }}
                  />
                  </Col>
                  <Col md="9" className="my-auto">
                    <Form.Control 
                        onChange={(e) => postDetails(e.target.files[0])}
                        type="file"
                    />
                  </Col>
              </Row>
              <Row>
                <Form.Group controlId="project_name" className="my-auto p-3">
                  <Form.Label className="text-dark fs-6">Title</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Project Name"
                    onChange={(e) => setProjectName(e.target.value)}
                    label={projectName}
                  />
                </Form.Group>
              </Row>
            </Form.Group>
            <Form.Group controlId="project_description" className="my-auto p-3">
              <Form.Label className="text-dark fs-6">Description</Form.Label>
              <Form.Control
                as="textarea"
                value={projectDescription}
                placeholder="Enter something about your project"
                rows={4}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex my-auto p-3 search-form-box">
            <Form.Label className="text-dark fs-6 my-auto"> Project Status:  </Form.Label>
                    <select
                      className={color}
                      aria-label="form-select-sm example"
                      id="test"
                      onChange={(e) => setProjectStatus(e.target.value)}
                    >
                      <option
                        className="form-select form-select-sm"
                        default
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
