import React from 'react';
import { Button,  Image, Navbar } from 'react-bootstrap';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const Navigation = () => {
  return (
    <>
        <header class="header navbar-area sticky">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <nav class="navbar navbar-expand-lg">
                        <a class="navbar-brand" href="index.html">
                            <Image src={pocketdevsLogo}></Image>
                            <Navbar.Brand href="/">Pocket Teams</Navbar.Brand>
                        </a>
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
                                  <Button className="theme-btn theme-btn-nav ms-3 mt-2">Login</Button>
                                </li>
                                <li className="nav-item">
                                  <Button className="theme-btn theme-btn-nav ms-3 mt-2">Sign Up</Button>
                                </li>
                            </ul>
              </div>
              </nav>
              </div>
              </div>
              </div>
              </header>
    </>
  )
}

export default Navigation
