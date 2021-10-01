import { useState } from "react";
import { Form, Modal, Col, Row, Container, Image, Card, Dropdown } from "react-bootstrap";
import EditTeamCard from "../Cards/EditTeamCard";
import pocketdevsLogo from "../../assets_pocketdevs/assets/img/profile/generated_profile.PNG";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const AddProjectModal = ({ showModal, hideModal }) => {

const [projectName, setProjectName] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [projectStatus, setProjectStatus] = useState("");

const dispatch = useDispatch();
const projectCreate = useSelector(state => state.projectCreate)
const {loading, error, project} = projectCreate;



  return (
 
    <Modal centered size="lg" show={showModal} onHide={hideModal}>
        <Card>
      <Modal.Header>
            <h5>Create new Project</h5>
        {/* <h5>Edit Team</h5>
        <button
          type="button"
          class="btn-close"
          onClick={hideModal}
          aria-label="Close"
        ></button>  */}
      </Modal.Header>
      <Modal.Body>

          {/* <Row xs="1" sm="2" md="3" className="mx-auto">
            <Col>
              <EditTeamCard logo={pocketdevsLogo} />
            </Col>
            <Col>
              <EditTeamCard logo={pocketdevsLogo}/>
            </Col>
            <Col>
              <EditTeamCard logo={pocketdevsLogo}/>
            </Col>
          </Row> */}
          <Form onSubmit={null}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="project_name">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="title"
                    value={projectName}
                    placeholder="Project Name"
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="project_description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={projectDescription}
                placeholder="Enter something about your project"
                rows={4}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex">
                
                <Dropdown>&nbsp;
                <Form.Label>Project Status</Form.Label>
                      <Dropdown.Toggle
                        id="dropdown-custom-components"
                        className="option f-dark"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Initial</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Heavy</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
            </Form.Group>
          </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="theme-btn theme-btn-modal mx-0" onClick={hideModal}>
        Create Project
        </button>
      </Modal.Footer>
      </Card>
      </Modal>
  );
};

export default AddProjectModal;
