import axios from 'axios';
import React, { useState } from 'react'
import { Image, Navbar} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import pocketdevsLogo from '../assets_pocketdevs/assets/img/logo/pocketdevs-logo.png';
import ErrorMessage from '../components/ErrorMessage';
import Preload from '../components/Preload';

const RegisterPage = () => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email_address, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [profile_pic, setProfilePic] = useState
    ("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [pic_message, setPicMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        //Check if the password is 
        if(password !== confirm_password){
            setMessage("Password does not match");
        } else {
            setMessage(null)
            try{
                const config = {
                    header: {
                        "Content-type": "application/json",
                    },
                };

            //Post the request to the API
            setLoading(true);
            const {data} = await axios.post("/api/users",
                {first_name, last_name, email_address, password}, 
                config
            );               
            setLoading(false);

            //Set the info into the local storage 
            localStorage.setItem("userInfo", JSON.stringify(data));
            } catch (error) {
                setLoading(false);
                setError(error.response.data.message);
            }
        }    
    };

    const postDetails = (profile_pic) => {

        if(!profile_pic){
            return setPicMessage("Please select an Image");
        }        

        setPicMessage(null);

        if(profile_pic.type === 'image/jpeg' || profile_pic.type === 'image/png'){
            const data = new FormData();
            data.append('file', profile_pic)
            data.append('upload_present','pocketteams')//Upload cloud name
            data.append('cloud_name', 'dppl4qapk')//Username for cloudinary
            fetch("https://api.cloudinary.com/v1_1/dppl4qapk/image/upload", {
                method: "post",
                body: data,
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setProfilePic(data.url.toString());
            })
            .catch ((err) => {
                console.log(err);
            });
        } else {
            return setPicMessage("Please select an Image");
        }
        
    };

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
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                                {loading && <Preload/>}
                                <form onSubmit={submitHandler} className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="name" id="name" placeholder="First name" required
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={first_name}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="lastName" id="lastName" placeholder="Last name" required
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={last_name}
                                            />
                                        </div>
                                    </div>
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
                                        <div className="col-md-12">
                                            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" required
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirm_password}
                                            />
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
