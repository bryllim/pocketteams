import React from 'react'
import Sidebar from '../components/SideBar'
import Navigation from '../components/Navigation'
import ProjectCard from '../components/Cards/ProjectCard'
import { Col, Container, Row } from 'react-bootstrap'

const Project = () => {
    return (
        <>
            <Navigation/>




            

                <Container fluid>    
                    <Row>



                    <Col xxl="3">
                    <Sidebar/>
                    </Col>

                    <Col md="9">
                        <h1>Projects</h1> 
                        <div className="row row-cols-xxl-4 row-cols-md-3 g-md-2 g-2">
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                        </div> 
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Project
