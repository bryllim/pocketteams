import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import PocketdevsLogo from '../assets/img/logo/pocketdevs-logo.png';
import ErrorMessage from '../components/ErrorMessage';
import Preload from '../components/Preload';
import { login } from '../actions/userActions';

const LoginPage = () => {

    const [email_address, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        document.title = "Login - PocketTeams"
      }, [])

    useEffect(() => {
        if(userInfo){
            history.push('/project');
        }
    }, [history, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email_address, password));
    };

    return (
        <>
            <section className="feature-section pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                            <div className="section-title text-center mb-55">
                                <NavLink className="navbar-brand" to="/">
                                    <Image src={PocketdevsLogo}></Image>
                                    <Navbar.Brand>PocketTeams</Navbar.Brand>
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
