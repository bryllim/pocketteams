import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/blog/browser_snapshot.PNG'
import image1 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-1.png"
//import image2 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-2.png"
import image3 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-3.png"
import image4 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-4.png"
import axios from 'axios'
import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const LandingPage = ({history}) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push('/project');
          } 
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
                                <h1 className="mb-25 example-fade-text" data-wow-delay=".2s">What is Pocket Teams?</h1>
                                <p className="mb-35 wow fadeInLeft" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="#contact" className="theme-btn">Get Started</a>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className="hero-img">
                                <div className="d-inline-block hero-img-right">
                                    <Image src={heroImage} alt="" className="image wow fadeInRight"
                                        data-wow-delay=".5s" />
                                    <Image src={dotShape} alt="" className="dot-shape" />
                                    <div className="video-btn">
                                        <a href="#features" className="glightbox"><i className="lni lni-display"></i></a>
                                    </div>
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
                                            <h4 className="mb-10">Task Integration</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                            <img src={image1} alt=""/>
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
                                            <h4 className="mb-10">Board Customization</h4>
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
                                            <h4 className="mb-10">Time Management</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                            <img src={image4} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ========================= Features description end =========================*/}
           <Footer />
        </div>
    )
}

export default LandingPage
