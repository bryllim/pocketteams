import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer pt-100">
        <div className="container">
          <div className="copyright-area">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="footer-social-links">
                  <ul className="d-flex">
                    <li>
                      <a href="https://www.facebook.com/pocketdevscebu">
                        <i className="lni lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/pocketdevs.ph/">
                        <i className="lni lni-instagram-filled"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <p className="wow fadeInUp" data-wow-delay=".3s">
                  Copyright © 2021{" "}
                  <a href="https://pocketdevs.online" rel="nofollow">
                    PocketDevs
                  </a>{" "}
                  All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
