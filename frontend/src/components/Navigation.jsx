import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/img/logo/logo.png";

const Navigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    <section className="header navbar-area sticky">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="banner-content">
                      <a className="navbar-brand d-none d-md-block" href="/">
                        <img src={Logo} alt="Logo" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
              </button>
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
                      <a href="/register">
                        <span className="d-none d-md-block">
                          <span class="badge bg-danger">It's free!</span> &nbsp;{" "}
                        </span>
                        <strong>Create an Account</strong>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
