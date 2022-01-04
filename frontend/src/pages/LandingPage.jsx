import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import heroImage from "../../src/assets/img/hero/hero-img.png";
import createTeam from "../assets/videos/createTeam.webm";
import createProject from "../assets/videos/createProject.webm";
import createTask from "../assets/videos/createTask.webm";
import Dave from ".././assets/img/team/Dave.svg";
import Lester from ".././assets/img/team/Lester.svg";
import Seb from ".././assets/img/team/Seb.svg";

const LandingPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  AOS.init();

  useEffect(() => {
    if (userInfo) {
      history.push("/project");
    }
    console.log(userInfo);
  }, [history, userInfo]);

  return (
    <div>
      <Navigation />

      {/* ========== Hero Section ========== */}
      <section id="home" className="hero-section pb-40 mb-40">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="hero-content-wrapper">
                <h2 data-aos="fade-right" data-aos-duration="1000">
                  Get things done, faster
                </h2>
                <h1
                  className="mb-25 example-fade-text"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  Level up the way you work with your team
                </h1>
                <p
                  className="mb-35"
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                >
                  The only platform you need to keep your team and your projects
                  on the same page. Collaborate on what you need to do, and get
                  the work done.
                </p>
                <a
                  href="/register"
                  className="theme-btn"
                  data-aos="fade-right"
                  data-aos-delay="600"
                  data-aos-duration="1000"
                >
                  Create an account
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div>
                <div
                  className="d-inline-block hero-img-right"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="2000"
                >
                  <img src={heroImage} alt="hero"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== End of Hero Section ========== */}

      {/* ========================= Features Section ========================= */}
      <section className="service-section mt-35 pt-10 pb-20">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
              <div className="section-title text-center mb-55">
                <h2
                  data-aos="fade-left"
                  data-aos-delay="800"
                  data-aos-duration="2000"
                >
                  Features
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div
                className="service-box box-style"
                data-aos="fade-left"
                data-aos-delay="800"
                data-aos-duration="2000"
              >
                <div className="service-icon box-icon-style">
                  <i className="lni lni-handshake"></i>
                </div>
                <div className="box-content-style service-content">
                  <h5>Teams</h5>
                  <p className="mt-2">
                    Create teams, invite members, assign roles, and work on
                    projects together.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-5">
              <div
                className="service-box box-style"
                data-aos="fade-left"
                data-aos-delay="600"
                data-aos-duration="2000"
              >
                <div className="service-icon box-icon-style">
                  <i className="lni lni-bar-chart"></i>
                </div>
                <div className="box-content-style service-content">
                  <h5>Project Management</h5>
                  <p className="mt-2">
                    Easily manage multiple projects and track your workload with
                    your team.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-5">
              <div
                className="service-box box-style"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="2000"
              >
                <div className="service-icon box-icon-style">
                  <i className="lni lni-radio-button"></i>
                </div>
                <div className="box-content-style service-content">
                  <h5>Task Management</h5>
                  <p className="mt-2">
                    View and organize your tasks and determine their status and
                    priority.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-5">
              <div
                className="service-box box-style"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="2000"
              >
                <div className="service-icon box-icon-style">
                  <i className="lni lni-files"></i>
                </div>
                <div className="box-content-style service-content">
                  <h5>Collaboration</h5>
                  <p className="mt-2">
                    Make collaborating with your team simple by easily assigning
                    tasks and leaving comments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================= End of Features Section ========================= */}

      {/* ========================= How It Works Section =========================*/}
      <section className="process-section pt-130 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
              <div className="section-title text-center mb-55">
                <h2
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  How it works
                </h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center time-line">
            <div className="col-12">
              <div className="single-timeline">
                <div className="row align-items-center">
                  <div className="col-lg-5 order-last order-lg-first">
                    <div className="box-icon-style">
                      <i className="lni lni-pencil-alt"></i>
                    </div>
                    <div className="timeline-content left-content text-lg-end">
                      <div
                        data-aos="fade-right"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                      >
                        <h4 className="mb-10">Sign up</h4>
                        <p>
                          Creating an account is simple and easy. Open the
                          registration field and fill in the fields and hit
                          submit.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-5">
                    <div className="timeline-img">
                      <video
                        src={createTeam}
                        width="100%"
                        autoplay="true"
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="single-timeline">
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <div className="timeline-img">
                      <video
                        src={createTeam}
                        width="100%"
                        autoplay="true"
                        loop
                        muted
                      />
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-5">
                    <div className="timeline-content right-content text-start">
                      <div className="box-icon-style">
                        <i className="lni lni-users"></i>
                      </div>
                      <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="2000"
                      >
                        <h4 className="mb-10">Create your team</h4>
                        <p>
                          Give your team a name and invite team members and
                          assign user roles. You can also create multiple teams.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="single-timeline">
                <div className="row align-items-center">
                  <div className="col-lg-5 order-last order-lg-first">
                    <div className="timeline-content left-content text-lg-end">
                      <div className="box-icon-style">
                        <i className="lni lni-grid-alt"></i>
                      </div>
                      <div
                        data-aos="fade-right"
                        data-aos-delay="200"
                        data-aos-duration="2000"
                      >
                        <h4 className="mb-10">Project management</h4>
                        <p>
                          Create your project, add a description, and invite
                          your team members. You can then create multiple boards
                          for your project.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-5">
                    <div className="timeline-img">
                      <video
                        src={createProject}
                        width="100%"
                        autoplay="true"
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="single-timeline">
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <div className="timeline-img">
                      <video
                        src={createTask}
                        width="100%"
                        autoplay="true"
                        loop
                        muted
                      />
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-5">
                    <div className="timeline-content right-content text-start">
                      <div className="box-icon-style">
                        <i className="lni lni-ux"></i>
                      </div>
                      <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="2000"
                      >
                        <h4 className="mb-10">Manage tasks and collaborate</h4>
                        <p>
                          Add, drag, and drop tasks to your board and assign
                          them to your team or change their order. You can also
                          leave comments on tasks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================= End of How It Works Section =========================*/}

      {/* ========================= Pricing Section =========================*/}
      <section className="pricing-section pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
              <div
                className="section-title text-center mb-60"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <h2>Pricing</h2>
                <p>
                  We're still actively adding features and making PocketTeams
                  better. As one of our early users, we're happy to offer it to
                  you for free.
                </p>
              </div>
            </div>
          </div>
          <div className="tab-content mt-60" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-1"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 d-none d-md-block">
                  <div className="single-pricing mb-50">
                    <h4>
                      <del>Standard</del>
                    </h4>
                    <h3>
                      <del>$5.00</del>
                    </h3>
                    <ul>
                      <li>
                        <del>3 Teams</del>
                      </li>
                      <li>
                        <del>3 Projects</del>
                      </li>
                      <li>
                        <del>Unlimited Tasks</del>
                      </li>
                      <li>
                        <del>Team Collaboaration</del>
                      </li>
                      <li>
                        <del>24/7 Support</del>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="single-pricing active mb-50">
                    <h4>Basic</h4>
                    <h3>Free</h3>
                    <ul>
                      <li>Multiple Teams</li>
                      <li>Multiple Projects</li>
                      <li>Unlimited Tasks</li>
                      <li>Team Collaboration</li>
                      <li>24/7 Support</li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 d-none d-md-block">
                  <div className="single-pricing mb-50">
                    <h4>
                      <del>Premium</del>
                    </h4>
                    <h3>
                      <del>$15.00</del>
                    </h3>
                    <ul>
                      <li>
                        <del>Unlimited Teams</del>
                      </li>
                      <li>
                        <del>Unlimited Projects</del>
                      </li>
                      <li>
                        <del>Unlimited Tasks</del>
                      </li>
                      <li>
                        <del>Team Collaboaration</del>
                      </li>
                      <li>
                        <del>24/7 Support</del>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================= End of Pricing Section =========================*/}

      {/* ========================= Team Section =========================*/}
      <section className="team-section pt-100 pb-100">
        <div
          className="container"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
              <h2 className="text-center">Our Team</h2>
              <p className="text-center mt-3 mb-4">
                We're a young team of developers who love to build software
                solutions.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="team-box text-center mb-30">
                <div className="team-img">
                  <img src={Lester} alt="team-1" />
                </div>
                <h4 className="mt-4">
                  Lester Fong
                </h4>
                <p className="mt-2">Associate Developer</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-box text-center mb-30">
                <div className="team-img">
                  <img src={Seb} alt="team-2" />
                </div>
                <h4 className="mt-4">
                  Sebastian Ceblano
                </h4>
                <p className="mt-2">Associate Developer</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-box text-center mb-30">
                <div className="team-img">
                  <img src={Dave} alt="team-3" />
                  <h4 className="mt-4">
                    Christian Dave Montalban
                  </h4>
                  <p className="mt-2">Associate Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================= End of Team Section =========================*/}

      {/* ========================= Footer Section =========================*/}
      <Footer />
      {/* ========================= End of Footer Section =========================*/}
    </div>
  );
};

export default LandingPage;
