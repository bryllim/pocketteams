import React from 'react'
import { Image, Navbar } from 'react-bootstrap'
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const RegisterPage = () => {
    return (
        <>
            <section class="feature-section pt-50">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div class="section-title text-center mb-55">
                                <a class="navbar-brand" href="/">
                                    <Image src={pocketdevsLogo}></Image>
                                    <Navbar.Brand href="/">Pocket Teams</Navbar.Brand>
                                </a>
                                <p class ="wow fadeInUp" data-wow-delay=".6s">
                                An all-in-one workspace where you can write, plan, collaborate and get organized - it allows you to take notes, add tasks, manage projects & more.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 text-center mx-auto">
                            <div class="contact-form-wrapper">
                                <div class="row">
                                    <div class="col-xl-10 col-lg-8 mx-auto">
                                        <div class="section-title text-center mb-50">
                                            <h3 class="wow fadeInUp" data-wow-delay=".4s">Create an account</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="assets/php/mail.php" class="contact-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input type="text" name="name" id="name" placeholder="First name" required/>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="email" name="email" id="email" placeholder="Last name" required/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="email" name="email" id="email" placeholder="Email" required/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="password" name="password" id="password" placeholder="Password" required/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="password" name="password" id="password" placeholder="Confirm password" required/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="button text-center">
                                                <button type="submit" class="theme-btn">Register</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 mt-4">
                                            <a href="/login">Back to Login</a>
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
