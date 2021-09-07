import React from 'react';
import { Button, Image, Navbar } from 'react-bootstrap';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const Navigation = () => {
  return (
    <>
      <header className="header navbar-area sticky">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <Image src={pocketdevsLogo}></Image>
                  <Navbar.Brand>Pocket Teams</Navbar.Brand>
                </a>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="page-scroll mt-3" href="#features">Features</a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll mt-3" href="#contact_us">Contact Us</a>
                    </li>
                      <li className="nav-item">                       
                        <a href="/login"><Button className="theme-btn theme-btn-nav mt-1">Login</Button></a>
                      </li>
                      <li className="nav-item">                 
                        <a href="/register"><Button className="theme-btn theme-btn-nav mt-1">Sign Up</Button></a>
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
