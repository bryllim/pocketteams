import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Button, Col, Row, Dropdown } from "react-bootstrap";
import { createTeamAction } from "../../actions/teamActions";
import Preload from "../Preload";
import ErrorMessage from "../ErrorMessage";
import { toast } from 'react-toastify';
import { getusers } from "../../actions/userActions";

const AddTeam = ({ showModal, hideModal }) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const [teamAccess, setTeamAccess] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [teamProjects] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const teamCreate = useSelector((state) => state.teamCreate);
  const {loading, error} = teamCreate;

  const userList = useSelector((state) => state.userList);
  const {users} = userList;

  const notifySuccess = (msg) => toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  const notifyError = (msg) => toast.info(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      //change last to user id array
      createTeamAction(teamName, teamDescription, teamAccess,userInfo._id, addedUsers, teamProjects)
    );
    if (!teamName || !teamDescription || !teamAccess) return;

    resetHandler();
    hideModal();
    notifySuccess("Team Created");
  };

  const resetHandler = () => {
    setTeamName("");
    setTeamAccess("");
    setTeamDescription("");
    setAddedUsers([]);
    setSuggestions([]);
  };

  const handleAdd = (val) => {
    console.log(addedUsers.includes(val.email_address));
    if(addedUsers.some(item => val.email_address === item.email_address)){
      notifyError("User Exists");
    } else {
      setAddedUsers([...addedUsers, val]);
    }
    return;
  };

  const memberInputHandler = (input) =>{
    //If the seacrh has value
    if(input !== ''){
      const filteredData = users.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(input.toLowerCase())
      });
      setSuggestions(filteredData);
    }
    else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch])

  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Create New Team</h5>
          <button
            type="button"
            className="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body>
          <Col xs="12">
            <Row>
              {loading && <Preload/>}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                  value={addedUsers.email_address}
                  placeholder="Search members here"
                  required
                  onChange={(e) => memberInputHandler(e.target.value)}
                />
                {suggestions.slice(0,3).map((item) => 
                  <p className="mt-1 hover-me" onClick={ (e) => handleAdd(item)}>{item.email_address}</p>
                )}
                
              </Col>
            </Row>
            <Row>
              <Form.Label>Added Members: </Form.Label>
                <p className="horizontal sidebar-wrapper mb-2">{
                  addedUsers.map((item) => <p className="sidebar-box horizontal-container mx-1 mb-3">{item.email_address}</p>)
                }</p>
              </Row>
            <Col md="12" className="mb-2">
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                type="text"
                name="description"
                id="description"
                required
                rows="10"
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </Col>
            <Row>
              <Col>
                <Form.Group className="d-flex my-3 search-form-box">
                <Form.Label className="fs-6 my-auto me-3">
                    {" "}
                    User Access:{" "}
                  </Form.Label>
                  <select
                    aria-label="form-select-sm example"
                    id="test"
                    defaultValue={teamAccess}
                    onChange={(e) => setTeamAccess(e.target.value)}
                  >
                    <option className="form-select form-select-sm">
                      Set Access
                    </option>
                    <option className="form-select-sm" value="invite">
                      Invite Only
                    </option>
                    <option className="form-select-sm" value="private">
                      Private
                    </option>
                    <option className="form-select-sm" value="public">
                      Public
                    </option>
                  </select>
                </Form.Group>
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
