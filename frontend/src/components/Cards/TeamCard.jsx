import React, { useEffect, useState } from "react";
import {
  Button,
  Accordion,
  Card,
  Dropdown,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import EditTeam from "../Modals/EditTeamModal";
import { deleteTeamAction, deleteTeamProjectAction } from "../../actions/teamActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import AddTeamProjectModal from "../Modals/AddTeamProjectModal";
import AddMemberModal from "../Modals/AddMemberModal";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

const TeamCard = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [projectShow, setProjectShow] = useState(false);
  const handleProjectClose = () => setProjectShow(false);
  const handleProjectShow = () => setProjectShow(true);

  const teamDelete = useSelector((state) => state.teamDelete);
  const { loading: loadingDelete, error: errorDelete } = teamDelete;


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to delete this team?',
      icon: 'error',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#dc3741',
      denyButtonColor: '#6c757d'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteTeamAction(id));
      } 
    })
  };

  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const handleDeleteProject = (id, project_id) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to remove this project?',
      icon: 'error',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#dc3741',
      denyButtonColor: '#6c757d'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteTeamProjectAction(id, project_id));
        notifyInfo("Project Deleted");
      } 
    })
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
  ));

  //Load the user by id
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <Accordion defaultActiveKey="0" className="pt-3 px-3">
        <h4>
          {data.team_name}
          <button type="d-flex button btn" className="btn">
            {errorDelete && (
              <ErrorMessage varaint="danger">{errorDelete}</ErrorMessage>
            )}
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <i className="bi bi-three-dots" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(data._id)}>
                  Remove
                </Dropdown.Item>
              </Dropdown.Menu>
              <EditTeam
                data={data}
                showModal={show}
                hideModal={handleClose}
              />
            </Dropdown>
          </button>
        </h4>
        <div className="d-flex text-wrap horizontal-scrollable">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <button type="button" className="btn  p-0 ">
              <i className="bi bi-caret-right-fill" />
            </button>
          </Accordion.Toggle>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            type="button"
            className="bi btn-outline-secondary bi-plus-circle-dotted rounded-circle mx-1"
            viewBox="0 0 16 16"
            onClick={handleEditShow}
          >
            <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
          </svg>

          {data?.users.slice(0, 4).map((userslist) => (
            <p className="sidebar-box p-2">{userslist.first_name}</p>
          ))}
        </div>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="list-group">
              <p
                href="#"
                className="list-group-item list-group-item-action active"
                aria-current="true"
              >
                {data.team_description}
              </p>
              <p
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  type="button"
                  className="bi btn-outline-secondary bi-plus-circle-dotted rounded-circle me-2"
                  viewBox="0 0 16 16"
                  onClick={handleProjectShow}
                >
                  <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                </svg>
                Add Projects
              </p>
              {data?.projects.map((project) => (
                  <p className="list-group-item list-group-item-action d-flex justify-content-between">
                    {project.project_name}

                    <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <i className="bi bi-three-dots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleEditShow}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteProject(data._id, project._id)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </p>  
              ))}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
      {/* MODALS */}
      <AddTeamProjectModal
        showModal={projectShow}
        hideModal={handleProjectClose}
        data={data}
      />
      <AddMemberModal
        showModal={editShow}
        hideModal={handleEditClose}
        data={data}
      />
      <hr className="team"></hr>
    </div>
  );
};

export default TeamCard;
