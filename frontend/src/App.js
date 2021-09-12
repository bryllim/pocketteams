import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoardView from './pages/BoardView';
import Board from './pages/Board';
// import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import Preload from '../src/Preload'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])

    return (
        <>
            <Router>
                {/* Preloader if condition */}
                {loading ? <Preload /> :
                    <Switch>
                        <Route path="/" exact component={LandingPage}></Route>
                        <Route path="/login" exact component={LoginPage}></Route>
                        <Route path="/register" exact component={RegisterPage}></Route>
                        <Route path="/boardx" exact component={Board}></Route>
                    </Switch>}
            </Router>
        </>
    )
}

export default App;
