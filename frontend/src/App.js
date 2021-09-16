import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Board from "./pages/Board";
import Project from "./pages/Project";
import ProjectDashboard from "./pages/ProjectDashboard";
import My from "./pages/My";
import TeamDashboard from "./pages/TeamDashboard";
import Samplepage from "./pages/Samplepage";

// import Loader from 'react-loader-spinner';
import { useEffect, useState } from "react";
import Preload from "../src/components/Preload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

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
            <Route path="/board" exact component={Board}></Route>
            <Route path="/project" exact component={Project}></Route>
            <Route path="/my" exact component={My}></Route>
            <Route
              path="/teamdashboard"
              exact
              component={TeamDashboard}
            ></Route>
            <Route
              path="/projectdashboard"
              exact
              component={ProjectDashboard}
            ></Route>
            <Route path="/Samplepage" exact component={Samplepage}></Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
