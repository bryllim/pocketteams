import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/blog/browser.jpg'
import { Image } from 'react-bootstrap'

const LandingPage = () => {
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
                                <a href="#contact" class="theme-btn">Get Started</a>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className="hero-img">
                                <div className="d-inline-block hero-img-right">
                                    <Image src={heroImage} alt="" className="image wow fadeInRight"
                                        data-wow-delay=".5s" />
                                    <Image src={dotShape} alt="" className="dot-shape" />
                                    <div className="video-btn">
                                        <a href="/" className="glightbox"><i class="lni lni-display"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            {/* ========================= Features section start ========================= */}
            <section id="features" class="service-section pt-50 pb-50">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div class="section-title text-center mb-55">
                                <h2 class="wow fadeInUp" data-wow-delay=".4s">Features</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-3 col-md-5">
                            <div class="service-box box-style">
                                <div class="service-icon box-icon-style">
                                    <i class="lni lni-handshake"></i>
                                </div>
                                <div class="box-content-style service-content">
                                    <h5>Teams</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div class="service-box box-style">
                                <div class="service-icon box-icon-style">
                                    <i class="lni lni-bar-chart"></i>
                                </div>
                                <div class="box-content-style service-content">
                                    <h5>Project Management</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div class="service-box box-style">
                                <div class="service-icon box-icon-style">
                                    <i class="lni lni-radio-button"></i>
                                </div>
                                <div class="box-content-style service-content">
                                    <h5>Task Management</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div class="service-box box-style">
                                <div class="service-icon box-icon-style">
                                    <i class="lni lni-files"></i>
                                </div>
                                <div class="box-content-style service-content">
                                    <h5>Collaboration</h5>
                                    <p>Lorem ipsum dolor</p>
                                </div>
                            </div>
                        </div>               
                    </div>
                </div>
            </section>
            <hr/>
            {/* ========================= service-section end ========================= */}

            <Footer />
        </div>
    )
}

export default LandingPage
