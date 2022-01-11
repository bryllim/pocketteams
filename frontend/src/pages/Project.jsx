import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import ProjectCard from "../components/Cards/ProjectCard";
import ErrorMessage from "../components/ErrorMessage";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { listProjects } from "../actions/projectActions";
import ProfileCard from "../components/Cards/ProfileCard";
import Footer from "../components/Footer";

const Project = () => {
  // States & Reducers
  const [projectData, setProjectData] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const dispatch = useDispatch();

  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading: createProjectLoading, projects: newProjectData } =
    projectCreate;

  const projectList = useSelector((state) => state.projectList);
  const { loading, projects, error } = projectList;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {
    loading: updateProjectLoading,
    success: successUpdateProject,
    data: updatedProject,
  } = projectUpdate;

  const deleteProject = useSelector((state) => state.projectDelete);
  const { success: successDeleteProject, data: deleteProjectId } =
    deleteProject;

  //titlebar
  useEffect(() => {
    document.title = "Projects - PocketTeams";
  }, []);

  // Use Effects
  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch, history, userInfo]);

  // Loading Projects
  useEffect(() => {
    if (loading === false && projects != null && projects.length > 0) {
      setProjectData(projects);
    }
  }, [loading, projects]);

  // Creating Projects
  useEffect(() => {
    if (createProjectLoading === false && newProjectData) {
      if (projectData != null && projectData.length > 0) {
        const newProjects = [...projectData];
        newProjects.push(newProjectData);
        setProjectData(newProjects);
      } else {
        setProjectData([newProjectData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProjectLoading, newProjectData]);

  // Deleting Projects
  useEffect(() => {
    if (successDeleteProject === true) {
      const newProjects = [...projectData];
      const index = newProjects.findIndex(
        (project) => project._id === deleteProjectId
      );
      newProjects.splice(index, 1);
      setProjectData(newProjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDeleteProject, deleteProjectId]);

  // Updating Projects
  useEffect(() => {
    if (
      updateProjectLoading === false &&
      successUpdateProject === true &&
      updatedProject
    ) {
      const newProject = [...projectData];
      const index = newProject.findIndex(
        (project) => project._id === updatedProject._id
      );
      newProject.splice(index, 1, updatedProject);
      setProjectData(newProject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, updatedProject, successUpdateProject, updateProjectLoading]);

  return (
    <>
    <Container className="board-container scrolling-wrapper-y hv-100">
      <Navigation />
      <Row className="h-100 justify-content-sm-center ">
        <Col xxl="4" className="d-flex flex-column h-100 d-none d-lg-block">
          <Sidebar />
        </Col>

        <Col xs="12" lg="8" className="d-flex flex-column ">
          <Row className="sidebar-wrapper d-md-block d-lg-none">
            <Col className="">
              <ProfileCard />{" "}
            </Col>
          </Row>

          <h4>
            <Breadcrumb>
              <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
            </Breadcrumb>
          </h4>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Row className="row-cols-lg-auto row-cols-1 
          row-cols-md-2 g-2 mb-30 ">
            <Col>
              <ProjectCard />
            </Col>
            {projectData?.map((project, index) => (
              <Col key={index}>
                <ProjectCard data={project} />
              </Col>
            ))}
          </Row>
          <Row className="d-block d-lg-none">
            <Sidebar />
          </Row>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default Project;
