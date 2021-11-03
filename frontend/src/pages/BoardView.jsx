import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

const BoardView = () => {
    return (
        <>
        <Navigation/>
        <section id="home" className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-6">
                            <div className="hero-content-wrapper">
                                <h1 className="mb-25 example-fade-text" data-wow-delay=".2s">BoardView</h1>
                                <p className="mb-35 wow fadeInLeft" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <a href="#contact" className="theme-btn">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <Footer/>
        </>
    )
}

export default BoardView
