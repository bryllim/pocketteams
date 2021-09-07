import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/blog/browser.jpg'
import featuresImage from "../../src/assets_pocketdevs/assets/img/bg/cta-bg.jpg"
import axios from 'axios'
import { Image } from 'react-bootstrap'

const LandingPage = () => {

    //const [myData, setData] = useState([]);

    const fetchData = async() => {
        const {data} = await axios.get("/api/notes");
        console.log(data);
    }

    //console.log("Data: " + myData);

    useEffect(() => {
        fetchData();
    },[])

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
                                        <a href="/" className="glightbox"><i className="lni lni-display"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ========================= Features section start ========================= */}
            <section id="features" className="service-section pt-10 pb-20">       
            <Image src={featuresImage} alt="" className="feature-img"/>
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
                                <h2 className="wow fadeInUp" data-wow-delay=".4s">How we work</h2>
                                <p className="wow fadeInUp" data-wow-delay=".6s">Our process is customer-centric so we make sure to deliver value early and often.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center time-line">
                        <div className="col-12">
                            <div className="single-timeline">
                                <div className="row align-items-center">
                                    <div className="col-lg-5 order-last order-lg-first">
                                        <div className="timeline-content left-content text-lg-end">
                                            <div className="box-icon-style">
                                                <i className="lni lni-search-alt"></i>
                                            </div>
                                            <h4 className="mb-10">Consultation</h4>
                                            <p>We provide a free end-to-end consulting service which covers your requirements and ideate software solutions.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                            <img src="assets/img/timeline/timeline-1.webp" alt=""/>
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
                                            <img src="assets/img/timeline/timeline-2.webp" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-content right-content text-start">
                                            <div className="box-icon-style">
                                                <i className="lni lni-layers"></i>
                                            </div>
                                            <h4 className="mb-10">Design</h4>
                                            <p>Design and transform your requirements to organize and map out the overall solution architecture, modules, and features.</p>
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
                                                <i className="lni lni-code-alt"></i>
                                            </div>
                                            <h4 className="mb-10">Code</h4>
                                            <p>The development phase is where the project will be created and converting the design documentation into the actual solution.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-img">
                                            <img src="assets/img/timeline/timeline-3.webp" alt=""/>
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
                                            <img src="assets/img/timeline/timeline-4.webp" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-5">
                                        <div className="timeline-content right-content text-start">
                                            <div className="box-icon-style">
                                                <i className="lni lni-rocket"></i>
                                            </div>
                                            <h4 className="mb-10">Launch</h4>
                                            <p>Finally, we will be deploying the project into the agreed platforms together with our maintenance services.</p>
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
