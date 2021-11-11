import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form,Modal,Button,Col,Row,Dropdown,} from "react-bootstrap";
import { createTeamAction } from "../../actions/teamActions"

const AddTeam = ({ showModal, hideModal }) => {

  const dispatch = useDispatch()
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  const resetHandler = () => {
    setTeamName("");
    setTeamDescription("");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTeamAction(teamName, teamDescription, userInfo._id, userInfo._id));
    if (!teamName || !teamDescription || !userInfo._id) return;

    resetHandler();
    hideModal();
    window.location.reload(false);
  }
  

  
  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
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
                  onChange={(e) => setTeamName(e.target.value)}
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
                rows="10"
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </Col>
            <Row>
              <Col md="4">
              <Form.Label className="px-4">User Access</Form.Label>
              </Col>
              <Col md="6">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-custom-components"
                  className="option"
                />
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Request Invites Only
                    </Dropdown.Item>
                    <Dropdown.Item>Private</Dropdown.Item>
                    <Dropdown.Item>Public</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              </Col>
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="theme-btn theme-btn-modal mx-0"
            onClick={submitHandler}
          >
            Create team
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTeam;
