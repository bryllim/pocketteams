import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/hero/hero-img.png'
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
                        <h1 className="mb-25 wow fadeInDown" data-wow-delay=".2s">What is Pocket Teams?</h1>
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
                                data-wow-delay=".5s"/>
                            <Image src={dotShape} alt="" className="dot-shape"/>
                            <div className="video-btn">
                                <a href="https://www.instagram.com/pocketdevs.ph/" className="glightbox"><i
                                        className="lni lni-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <hr/>
        {/* ========== Feature Section ========== */}
         <Footer />
    </div>
    )
}

export default LandingPage
