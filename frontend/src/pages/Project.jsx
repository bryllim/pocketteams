import React from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import Projectcard from '../components/ProjectCard'
import { Col, Container, Row } from "react-bootstrap";

const Project = () => {
    return (
        <>
            <Navigation/>
            <Container fluid className="board-container">
                    <Row className="h-100">
                            <Col xxl="3" className="d-flex flex-column h-100 d-none d-md-block d-md-none d-lg-block  d-lg-none d-xl-block">
                                <Sidebar/>
                            </Col>
                            <Col md="9" className="d-flex flex-column h-100">
                                <h1>Projects</h1> 
                                <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 g-md-2 g-2">
                                    <div class="col">
                                        <Projectcard/>
                                    </div>
                                    <div class="col">
                                        <Projectcard/>
                                    </div>
                                    <div class="col">
                                        <Projectcard/>
                                    </div>
                                    <div class="col">
                                        <Projectcard/>
                                    </div>
                                    <div class="col">
                                        <Projectcard/>
                                    </div>
                                </div> 
                            </Col>
                    </Row>
            </Container>
        </>
    )
}

export default Project
