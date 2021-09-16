import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';
import ErrorMessage from '../components/ErrorMessage';
import Preload from '../components/Preload';

const LoginPage = ({history}) => {

    const [email_address, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfo = localStorage.getItem("userInfo");
    useEffect(() => {
        console.log("SAMPLE: " + userInfo);
        //If the user is logged in from local storage
        if(userInfo){
            console.log("Inside if condition");
            history.push("/boardx");
        }
    }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        //Call the API 
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            //Load to get the data from API
            setLoading(true);
            const { data } = await axios.post('/api/users/login',
                {
                    email_address,
                    password
                },
                config);
            
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
        } catch (error) {  
            setError(error.response.data.message);
            setLoading(false);
        }
    }

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
                                <p className="wow fadeInUp" data-wow-delay=".6s">
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
                                            <h3 className="wow fadeInUp" data-wow-delay=".4s">Login</h3>
                                        </div>
                                    </div>
                                </div>
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                {loading && <Preload/>}
                                <form onSubmit={submitHandler} className="contact-form">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="email" name="email" id="email" placeholder="Email" required
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                value={email_address}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="password" name="password" id="password" placeholder="Password" required
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="button text-center">
                                                <button type="submit" className="theme-btn">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mt-4">
                                            <NavLink to="/register">Don't have an account? Click here to register.</NavLink>
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
