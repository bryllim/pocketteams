import {
  Form,
  Modal,
  Col,
  Row,
} from "react-bootstrap";

const AddMemberModal = ({ showModal, hideModal }) => {
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Add Member</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body>
          <Row xs="12">
            <Col xs="6">
                <Form.Label>Add to Team</Form.Label>
                <Form.Control as="select"> 
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
            </Col>
            <Col xs="6">
                <Form.Label>Add to Project</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
            </Col>
            <Col md="12">
              <Form.Label>Add to Project</Form.Label>
              <textarea
                class="form-control"
                placeholder="add emails here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMemberModal;
