import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/blog/browser_snapshot.PNG'
import image1 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-1.png"
//import image2 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-2.png"
import image3 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-3.png"
import image4 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-4.png"
import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Dave from '.././assets_pocketdevs/assets/img/team/Dave.svg'
import Lester from '.././assets_pocketdevs/assets/img/team/Lester.svg'
import Seb from '.././assets_pocketdevs/assets/img/team/Seb.svg'
import createTeam from '../assets_pocketdevs/assets/videos/createTeam.mp4'
import createProject from '../assets_pocketdevs/assets/videos/createProject.mp4'
import createTask from '../assets_pocketdevs/assets/videos/createTask.mp4'


const LandingPage = ({history}) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push('/project');
        } 
        console.log(userInfo);
    },[history, userInfo])

    return (
        <div>
            <Navigation />
            {/* ========== Hero Section ========== */}
            <section id="home" className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-6">
                            <div className="hero-content-wrapper">
                                <h1 className="mb-0 example-fade-text text-danger" data-wow-delay=".2s">INTRODUCING</h1>                          
                                <h1 className="mb-25 example-fade-text" data-wow-delay=".2s">PocketTeams</h1>
                                <p className="mb-35 wow fadeInLeft" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="/login" className="theme-btn">Get Started</a>
                            </div>
                            {/* <h1 className="mb-25 example-fade-text text-center" data-wow-delay=".2s">Pocket Teams</h1> */}
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className="hero-img">
                                <div className="d-inline-block hero-img-right">
                                    <Image src={heroImage} alt="" className="image wow fadeInRight"
                                        data-wow-delay=".5s" />
                                    <Image src={dotShape} alt="" className="dot-shape" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ========================= Features section start ========================= */}
            <section id="features" className="service-section pt-10 pb-20">       
            <hr/>
                <div className="container">        
                    <div className="row">                 
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div className="section-title text-center mb-55">
                                <h2 className="wow fadeInUp" data-wow-delay=".4s">Features</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="service-box box-style white-bg">
                                <div className="service-icon box-icon-style">
                                    <i className="lni lni-handshake"></i>
                                </div>
                                <div className="box-content-style service-content">
                                    <h5>Teams</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5">
                            <div className="service-box box-style white-bg">
                                <div className="service-icon box-icon-style">
                                    <i className="lni lni-bar-chart"></i>
                                </div>
                                <div className="box-content-style service-content">
                                    <h5>Project Management</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5">
                            <div className="service-box box-style white-bg">
                                <div className="service-icon box-icon-style">
                                    <i className="lni lni-radio-button"></i>
                                </div>
                                <div className="box-content-style service-content">
                                    <h5>Task Management</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5">
                            <div className="service-box box-style white-bg">
                                <div className="service-icon box-icon-style">
                                    <i className="lni lni-files"></i>
                                </div>
                                <div className="box-content-style service-content">
                                    <h5>Collaboration</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>               
                    </div>
                </div>
            </section>
            <hr/>
            {/* ========================= Features section end ========================= */}
            {/* ========================= Features description start =========================*/}
            <section className="process-section pt-130 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div className="section-title text-center mb-55">
                                <h2 className="wow fadeInUp" data-wow-delay=".4s">How it works</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center time-line">
                        <div className="col-12">
                            <div className="single-timeline">
                                <div className="row align-items-center">
                                    <div className="col-lg-5 order-last order-lg-first">
                                        <div className="box-icon-style">
                                            <i className="lni lni-list"></i>
                                        </div>
                                        <div className="timeline-content left-content text-lg-end">
                                            <h4 className="mb-10">Teams</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                            <video src={createTeam} width="100%" autoplay="true" loop muted/>
                                            {/* <img src={image1} alt=""/> */}
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
                                        <video src={createProject} width="100%" autoplay="true" loop muted/>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-content right-content text-start">
                                            <div className="box-icon-style">
                                                <i className="lni lni-pencil-alt"></i>
                                            </div>
                                            <h4 className="mb-10">Project Management</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                                                <i className="lni lni-calendar"></i>
                                            </div>
                                            <h4 className="mb-10">Task Management</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                        <video src={createTask} width="100%" autoplay="true" loop muted/>
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
                                            <img src={image3} alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-content right-content text-start">
                                            <div className="box-icon-style">
                                                <i className="lni lni-pencil-alt"></i>
                                            </div>
                                            <h4 className="mb-10">Collaboration</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ========================= Features description end =========================*/}
            {/* ========================= Pricing section start =========================*/}
            <section className="pricing-section pt-100 pb-100 bg-danger">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto ">
                            <div className="section-title text-center mb-55">
                                <h2 className="wow fadeInUp text-light" data-wow-delay=".4s">Pricing</h2>
                            <p className="wow fadeInUp text-light" data-wow-delay=".4s">
                            PocketTeams is a simple and easy to use task management tool for your projects.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div className="service-box box-style white-bg">
                                <div className="single-pricing-box text-center mb-30">
                                    <div className="pricing-header">
                                        <div className="box-icon-style mx-auto">
                                            <i class="lni lni-calendar text-danger"></i>
                                        </div>
                                        <h3 className="mb-10 ">IT'S COMPLETLY</h3>
                                        <h1 className="mb-10 ">FREE!</h1>
                                        <p>For Everyone</p>
                                    </div>
                                    <div className="pricing-price mb-30">
                                        <h2 className="price">$0</h2>
                                        <p>Per Month</p>
                                    </div>
                                    {/* <div className="pricing-list">
                                            <ul>
                                                <li>Unlimited Users</li>
                                                <li>Unlimited Projects</li>
                                                <li>Unlimited Storage</li>
                                                <li>Unlimited Bandwidth</li>
                                                <li>Unlimited Support</li>
                                            </ul>
                                    </div> */}
                                    <div className="pricing-btn">
                                        <a href="#" className="btn btn-primary">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            {/* ========================= Pricing section end =========================*/}
            {/* ========================= Team section start =========================*/}
            <section className="team-section pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                                <h1 className="wow fadeInUpt text-center" data-wow-delay=".4s">Meet Our Team</h1>
                                <h2 className="wow fadeInUp text-center" data-wow-delay=".4s">Our Team</h2>
                            <p className="wow fadeInUp text-center" data-wow-delay=".4s">
                            Our team is comprised of dedicated people in software design and development
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="team-box text-center mb-30">
                                <div className="team-img">
                                    <img src={Lester} alt=""/>
                                </div>
                                <h3 className="mt-2">
                                    <a href="#">Lester Fong</a>
                                </h3>
                                <p className="mt-2">Associate Developer</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="team-box text-center mb-30">
                                <div className="team-img">
                                    <img src={Seb} alt=""/>
                                </div>
                                <h3 className="mt-2"> 
                                    <a href="#">Sebastian Ceblano</a>
                                </h3>
                                <p className="mt-2">Associate Developer</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="team-box text-center mb-30">
                                <div className="team-img">
                                    <img src={Dave} alt=""/>
                                    <h3 className="mt-2">
                                        <a href="#">Christian Dave Montalban</a>
                                    </h3>
                                    <p className="mt-2">Associate Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </section>   
           <Footer />
        </div>
    )
}

export default LandingPage
