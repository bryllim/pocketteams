import {useState} from "react";
import { Form, Modal, Col, Row, Container } from "react-bootstrap";
import EditTeamCard from "../Cards/EditTeamCard";
import pocketdevsLogo from "../../assets_pocketdevs/assets/img/profile/generated_profile.PNG";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import Preload from "../Preload";
import { updateTeamAction } from "../../actions/teamActions";

const EditTeamModal = ({ showModal, hideModal, data }) => {

  const [teamName, setTeamName] = useState(data.team_name);
  const [teamDescription, setTeamDescription] = useState(data.team_description);
  const [teamAccess, setTeamAccess] = useState(data.team_access);
  const dispatch = useDispatch();

  const teamUpdate = useSelector((state) => state.teamUpdate);
  const {loading, error} = teamUpdate;

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateTeamAction(data._id, teamName, teamDescription, teamAccess));
    if(!teamName || !teamDescription || !teamAccess)  return;

    resetHandler();
    hideModal();
    window.location.reload(false);
  }

  const resetHandler = () => {
    setTeamName("");
    setTeamDescription("");
  }

  return (
    <Modal centered size="lg" show={showModal} onHide={hideModal}>
      <Modal.Header>
        <h5>Edit Team</h5>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <button
          type="button"
          class="btn-close"
          onClick={hideModal}
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md="2">
              <Form.Label>Team name:</Form.Label>
            </Col>
            <Col md="3">
              <input
                type="text"
                class="form-control text-center border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                defaultValue={data.team_name}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Col>
            <Col md="2">
              <Form.Label>Description:</Form.Label>
            </Col>
            <Col>
              <textarea
                class="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                defaultValue={data.team_description}
                onChange={(e) => setTeamDescription(e.target.value)}
                id="floatingTextarea2"
                style={{ height: "40px" }}
              />
            </Col>
          </Row>
          <div className="horizontal">
            {
              data.users?.map((users) => (
                <EditTeamCard logo={pocketdevsLogo} data={users} teamId={data._id} />
              ))
            }
           </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {loading && <Preload/>}
        <Form.Group className="search-form-box me-5">
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
                    <option className="form-select form-select-sm" value={null}>
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
        <button className="theme-btn theme-btn-modal ms-5 mx-1" onClick={hideModal}> <i class="lni lni-plus"></i> Add Members </button>
        <button className="theme-btn theme-btn-modal mx-1" onClick={updateHandler}> Save Changes </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamModal;
