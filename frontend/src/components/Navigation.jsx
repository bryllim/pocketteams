/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/img/logo/logo.png";
import JoinWaitlistModal from "./Modals/JoinWaitlistModal";


const Navigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setActive] = useState(false);

  const toggleNavbar = () => {
    setActive(!isActive);
  };

  const [JoinModal, setJoinModal] = useState(false);
  const handleJoinClose = () => setJoinModal(false);
  const handleJoinShow = () => setJoinModal(true);

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <section className={
      loggedIn
      ?"header navbar-area sticky theme-bg-color"
      :"header navbar-area sticky"
    }>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="banner-content">
                      <a className="navbar-brand d-none d-md-block" href="/">
                        {!loggedIn?<img src={Logo} alt="logo" />:<img/>}
                      </a>
                    </div>
                  
                  </div>
                </div>
              </div>
              {!loggedIn?
              <button
                className={
                  isActive 
                    ? "navbar-toggler active"
                    : "navbar-toggler collapsed"
                }
                onClick={toggleNavbar}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button>:  <div></div>}
              <div
                className={
                  isActive
                    ? "collapse navbar-collapse sub-menu-bar show"
                    : "collapse navbar-collapse sub-menu-bar"
                }
                id="navbarSupportedContent"
              >
                {!loggedIn && (
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a href="/#" onClick={handleJoinShow}>
                        <span className="d-none d-md-block">
                          <span class="badge bg-danger">It's free!</span> &nbsp;{" "}
                        </span>
                        <strong>Join the wait list</strong>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <JoinWaitlistModal
                // data={data}
                showModal={JoinModal}
                hideModal={handleJoinClose}
              />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
