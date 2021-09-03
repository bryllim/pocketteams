import React from 'react';
import { Button, Container,  Image,  Nav, Navbar } from 'react-bootstrap';
import pocketdevsLogo from '../../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const Navigation = () => {
  return (
    <>
        <Navbar bg="light" expand="lg" variant="dark">
          <Container>
          <Image src={pocketdevsLogo}/>
          <Navbar.Brand href="/">Pocket Teams</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {/* <Navbar.Collapse id="navbarScroll">
            <Nav 
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '300px'}}
              navbarScroll
            >      */}
            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="toggler-icon"></span>
                            <span className="toggler-icon"></span>
                            <span className="toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                            <ul id="nav" className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="page-scroll" href="#features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="page-scroll" href="#contact_us">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                  <Button className="theme-btn">Log in</Button>
                                </li>
                                <li className="nav-item">
                                  <Button className="theme-btn">Sign Up</Button>
                                </li>
                            </ul>
              </div>
            {/* </Nav>
          </Navbar.Collapse> */}
          </Container>
        </Navbar>
    </>
  )
}

export default Navigation
