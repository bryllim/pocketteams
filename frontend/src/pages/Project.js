import React from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import Projectcard from '../components/Projectcard'
const Project = () => {
    return (
        <>
            <Navigation/>
            <div className="container main p-5">
                <div className="row">
                    <Sidebar/>
                    <div className="col">
                        <h5>Projects</h5>
                        <div className="row row-cols-3 g-2">
                            <div class="col">
                                <Projectcard/>
                            </div>
                            <div class="col">
                                <Projectcard/>
                            </div>
                            <div class="col">
                                <Projectcard/>
                            </div>
                         
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Project
