import {
  Form,
  Modal,
  Button,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const AddTeam = ({ showModal, hideModal }) => {
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Create New Team</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body>
          <Col xs="12">
            <Row>
              <Col md="6" className="mb-3">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="text"
                  name="team_name"
                  id="team_name"
                  required
                />
              </Col>

              <Col md="6" className="mb-3">
                <Form.Label>Members</Form.Label>
                <Form.Control
                  type="text"
                  name="team_members"
                  id="team_members"
                  required
                />
              </Col>
            </Row>
            <Col md="12" className="mb-5">
              <Form.Label>Description</Form.Label>
              <textarea
                class="form-control"
                type="text"
                name="description"
                id="description"
                required
              />
            </Col>
            <Col md="12">
              <Form.Label>User Access</Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title="Accessibility Type"
              >
                <Dropdown.Item href="#/action-1">
                  Request Invites Only
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Private</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Public</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Create team
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTeam;
