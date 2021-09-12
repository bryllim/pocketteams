// import React from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'

import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import dotShape from '../assets_pocketdevs/assets/img/hero/dots.shape.svg'
import heroImage from '../../src/assets_pocketdevs/assets/img/blog/browser.jpg'
import image1 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-1.png"
//import image2 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-2.png"
import image3 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-3.png"
import image4 from "../../src/assets_pocketdevs/assets/img/timeline/timeline-4.png"
import axios from 'axios'
import { Image } from 'react-bootstrap'



const Board = () => {
    return (
        <>
        <Navigation/>

        <section id="home" className="hero-section">
            <div className="sideBar">
                <Sidebar/>
            </div>
        </section>
        </>
    )
}

export default Board
