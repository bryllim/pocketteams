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
            <div className="contact-form-wrapper">
              <form onSubmit={null} className="contact-form">
                <Row>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="team_name"
                      id="team_name"
                      placeholder="Team name"
                      required
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="team_members"
                      id="team_members"
                      placeholder="Members"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <form onSubmit={null} className="contact-form">
                      <div className="col-md-12">
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          required
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-12">
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
                  </div>
                </Row>
              </form>
            </div>
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
