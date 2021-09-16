import React from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import Projectcard from '../components/Projectcard'
const Project = () => {
    return (
        <>
            <Navigation/>
            <div className=" main container-fluid p-5">
                <div className="row">

                    <div className="col-auto">
                    <Sidebar/>
                    </div>

                    <div className="col-md-9">
                        <h5>Projects</h5>
                        <div className="row row-cols-xl-5 row-cols-md-3 g-5">
                            <div class="col">
                                <Projectcard/>
                            </div>
                            <div class="col">
                                <Projectcard/>
                            </div>
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
