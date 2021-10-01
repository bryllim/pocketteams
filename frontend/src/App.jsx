import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Board from "./pages/Board";
import Project from "./pages/Project";

// import Loader from 'react-loader-spinner';
import { useEffect, useState } from "react";
import Preload from "./components/Preload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  //Check if user is logged in
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(userInfo == null){
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
    },[userInfo, setLoggedIn])

  return (
    <>
      <Router>
        {/* Preloader if condition */}
        {loading ? (
          <Preload />
        ) : (
          <Switch>
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/login" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            {loggedIn ? <Route path="/board" exact component={Board}></Route> : <Redirect to="/" exact component={LandingPage}/>}
            {loggedIn ? <Route path="/project" exact component={Project}></Route> : <Redirect to="/" exact component={LandingPage}/>}
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
