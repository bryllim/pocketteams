import { Form, Modal, Col, Row } from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTeamProject } from "../../actions/teamActions";
import { useEffect } from "react";
import { listProjects } from "../../actions/projectActions";

const AddTeamProjectModal = ({ showModal, hideModal, data }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const projectList = useSelector((state) => state.projectList);
  const { loading, projects, error } = projectList;

  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [addedProjects, setaddedProjects] = useState(data.projects);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTeamProject(data._id, addedProjects));
    window.location.reload(false);
  }

  const memberInputHandler = (input) => {
    //If the seacrh has value
    if (input !== "") {
      const filteredData = projects.filter((item) => {
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
    setaddedProjects([]);
    setSuggestions([]);
  };

  const handleAdd = (val) => {
    console.log(addedProjects.includes(val.project_name));
    if (addedProjects.some((item) => val.project_name === item.project_name)) {
      notifyError("Already Added");
    } else {
      notifySuccess("Project Added");
      setaddedProjects([...addedProjects, val]);
    }
    return;
  };

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const notifyError = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });
  
    useEffect(() => {
      dispatch(listProjects());
    }, [dispatch])

  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Add Project</h5>
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
                value={addedProjects.project_name}
                placeholder="Search projects here"
                required
                onChange={(e) => memberInputHandler(e.target.value)}
              />
              {suggestions.slice(0, 3).map((item) => (
                <p className="mt-1 hover-me text-dark text-center" onClick={(e) => handleAdd(item)}>
                  {item.project_name}
                </p>
              ))}
              <Row>
                <Form.Label>Added Projects: </Form.Label>
                <p className="horizontal sidebar-wrapper mb-2">
                  {addedProjects?.reverse().map((item) => (
                    <p className="sidebar-box horizontal-container mx-1 mb-3">
                      {item.project_name}
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

export default AddTeamProjectModal;
