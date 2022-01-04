import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { register } from "../actions/userActions";
import Logo from "../assets/img/logo/logo.png";
import ErrorMessage from "../components/ErrorMessage";
import Preload from "../components/Preload";

const RegisterPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [profile_pic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    document.title = "Register - PocketTeams";
  }, []);

  useEffect(() => {
    if (userInfo) {
      history.push("/project");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setMessage("Password does not match");
    } else {
      dispatch(
        register(first_name, last_name, email_address, password, profile_pic)
      );
    }
  };

  return (
    <>
      <section className="feature-section pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
              <div className="section-title text-center mb-55">
                <NavLink className="mb-5" to="/">
                  <Image src={Logo}></Image>
                </NavLink>
                <p>
                  An all-in-one platform where you can write, plan, collaborate
                  and get organized. Take notes, add tasks, manage projects &
                  more.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 text-center mx-auto">
              <div className="contact-form-wrapper">
                <div className="row">
                  <div className="col-xl-10 col-lg-8 mx-auto">
                    <div className="section-title text-center mb-50">
                      <h3>Create an account</h3>
                    </div>
                  </div>
                </div>
                {error && <ErrorMessage variant="danger"><small>{error}</small></ErrorMessage>}
                {message && (
                  <ErrorMessage variant="danger"><small>{message}</small></ErrorMessage>
                )}
                {loading && <Preload />}
                <form onSubmit={submitHandler} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="First name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={first_name}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={last_name}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmailAddress(e.target.value)}
                        value={email_address}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirm_password}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="button text-center">
                        <button type="submit" className="theme-btn">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-4">
                      <NavLink to="/login">Back to Login</NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <p className="text-center mt-5">
            Powered by{" "}
            <strong>
              <a href="https://www.pocketdevs.ph">PocketDevs</a>
            </strong>
          </p>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
