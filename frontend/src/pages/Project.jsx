import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import ProjectCard from "../components/Cards/ProjectCard";
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { listProjects } from "../actions/projectActions";


const Project = () => {
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const projectCreate = useSelector((state) => state.projectCreate);
  const { success: successCreate} = projectCreate;

  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectList);
  const { loading, projects, error } = projectList;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { success: successUpdate}  = projectUpdate;

  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch, successCreate, successUpdate, history, userInfo]);
  
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
            </h3>
            { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            { loading && <Preload/> }
            <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 g-md-2 g-2">
            <Col><ProjectCard/></Col>
            { projects?.reverse().map((project,index) => (
              <Col key={index}><ProjectCard data={project}/></Col>
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Project;
