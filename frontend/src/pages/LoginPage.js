import React from 'react'
import { Image, Navbar } from 'react-bootstrap';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';

const LoginPage = () => {
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
                                            <h3 class="wow fadeInUp" data-wow-delay=".4s">Login</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="assets/php/mail.php" class="contact-form">
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
                                        <div class="col-12">
                                            <div class="button text-center">
                                                <button type="submit" class="theme-btn">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 mt-4">
                                            <a href="/register">Don't have an account? Click here to register.</a>
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

export default LoginPage
