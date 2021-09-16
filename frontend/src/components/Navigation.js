import React, { useEffect, useState } from 'react';
import { Button, Image, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../actions/userActions';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const Navigation = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setActive] = useState(false);

  const toggleNavbar = () => {
    setActive(!isActive);   
  };

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userInfo]);


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
                <button className={isActive ? "navbar-toggler active": "navbar-toggler collapsed" } onClick={toggleNavbar} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div className={isActive ? "collapse navbar-collapse sub-menu-bar show": "collapse navbar-collapse sub-menu-bar"} id="navbarSupportedContent">
                  {loggedIn ? //Show logout only on the navbar if the user is logged in
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a href={false}><Button className="theme-btn theme-btn-nav mt-1" onClick={logoutHandler}>Log out</Button></a>
                      </li>
                    </ul>
                    :
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="page-scroll mt-3" href="#features">Features</a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll mt-3" href="#contact_us">Contact Us</a>
                      </li>  
                      <li className="nav-item">
                        {isActive ? <a className="page-scroll mt-3" href="/login">Login</a> : 
                                    <a href="/login"><Button className="theme-btn theme-btn-nav mt-1">Login</Button></a>}                       
                      </li>
                      <li className="nav-item">
                        {isActive ? <a className="page-scroll mt-3" href="/register">Register</a> : 
                                    <a href="/register"><Button className="theme-btn theme-btn-nav mt-1">Sign Up</Button></a>}                      
                      </li>
                    </ul>
                  }
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
