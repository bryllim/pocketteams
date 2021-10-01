import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import ProjectCard from "../components/Cards/ProjectCard";
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { listProjects } from "../actions/projectActions";
import AddProjectModal from "../components/Modals/AddProjectModal";

const Project = () => {
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const projectCreate = useSelector((state) => state.projectCreate);
  const { success: successCreate} = projectCreate;

  const dispatch = useDispatch();
  const projectList = useSelector(state => state.projectList);
  const { loading, projects, error } = projectList;

  useEffect(() => {
    if (userInfo) {
      history.push("/project");
    }
    dispatch(listProjects());
  }, [dispatch, successCreate, history, userInfo]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);

  return (
    <>
      <Navigation />
      <Container fluid className="board-container">
        <Row className="h-100">
          <Col
            xxl="3"
            className="d-flex flex-column h-100 d-none d-md-block d-md-none d-lg-block  d-lg-none d-xl-block"
          >
            <Sidebar />
          </Col>
          <Col md="9" className="d-flex flex-column h-100">
            <h3>
              <Breadcrumb>
                <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
              </Breadcrumb>
              <button
              type="button"
              className="theme-btn theme-btn-lg mb-30"
              onClick={handleShow}
            >
              <i class="lni lni-plus"/>&nbsp;New Project
            </button>
            </h3>
            
            { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            { loading && <Preload/> }
            <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 g-md-2 g-2">
            { projects?.map((project) => (
              <div class="col">
                <ProjectCard data={project}/>
              </div>
            ))}
            </div>
            <AddProjectModal showModal={show} hideModal={handleClose} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Project;
