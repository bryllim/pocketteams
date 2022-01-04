import { Form, Modal, Col, Row } from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTeamUser } from "../../actions/teamActions";

const AddMemberModal = ({ showModal, hideModal, data }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [addedUsers, setAddedUsers] = useState(data.users);

  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTeamUser(data._id, addedUsers));
    notifyInfo("Added User");
    hideModal();
  }

  const memberInputHandler = (input) => {
    //If the search has value
    if (input !== "") {
      const filteredData = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(input.toLowerCase());
      });
      setSuggestions(filteredData);
    } else {
      setSuggestions([]);
    }
  };

  const resetHandler = () => {
    setAddedUsers([]);
    setSuggestions([]);
  };

  const handleAdd = (val) => {
    console.log(addedUsers.includes(val.email_address));
    if (addedUsers.some((item) => val.email_address === item.email_address)) {
      notifyError("User Exists");
    } else {
      resetHandler();
      setAddedUsers([...addedUsers, val]);
    }
    return;
  };

  // const notifySuccess = (msg) =>
  //   toast.success(msg, {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 2500,
  //   });

  const notifyError = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
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
            <Col md="12" className="mb-3">
              <Form.Control
                type="text"
                name="team_members"
                id="team_members"
                className="mb-3"
                value={addedUsers.email_address}
                placeholder="Search members here"
                required
                onChange={(e) => memberInputHandler(e.target.value)}
              />
              {suggestions.slice(0, 3).map((item) => (
                <p className="mt-1 hover-me text-dark text-center" onClick={(e) => handleAdd(item)}>
                  {item.email_address}
                </p>
              ))}
              <Row>
                <Form.Label>Added Members: </Form.Label>
                <p className="horizontal sidebar-wrapper mb-2">
                  {addedUsers.map((item) => (
                    <p className="sidebar-box horizontal-container mx-1 mb-3">
                      {item.email_address}
                    </p>
                  ))}
                </p>
              </Row>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="theme-btn theme-btn-modal mx-0"
            onClick={submitHandler}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMemberModal;
