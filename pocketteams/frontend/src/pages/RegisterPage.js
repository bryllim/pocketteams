import React from 'react'
import { Image, Navbar} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const RegisterPage = () => {
    return (
        <>
            <section className="feature-section pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div className="section-title text-center mb-55">
                                <NavLink className="navbar-brand" to="/">
                                    <Image src={pocketdevsLogo}></Image>
                                    <Navbar.Brand>Pocket Teams</Navbar.Brand>
                                </NavLink>
                                <p className ="wow fadeInUp" data-wow-delay=".6s">
                                An all-in-one workspace where you can write, plan, collaborate and get organized - it allows you to take notes, add tasks, manage projects & more.
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
                                            <h3 className="wow fadeInUp" data-wow-delay=".4s">Create an account</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="assets/php/mail.php" className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="name" id="name" placeholder="First name" required/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="email" name="email" id="email" placeholder="Last name" required/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="email" name="email" id="email" placeholder="Email" required/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="password" name="password" id="password" placeholder="Password" required/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="password" name="password" id="password" placeholder="Confirm password" required/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="button text-center">
                                                <button type="submit" className="theme-btn">Register</button>
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
                </div>
            </section>
        </>
    )
}

export default RegisterPage
