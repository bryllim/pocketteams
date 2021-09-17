import React from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import Projectcard from '../components/Projectcard'
import Addmember from '../components/Addmember'



const Project = () => {
    return (
        <>
            <Navigation/>




            
            <section className="blog-section mt-5">

                <div className="container">    
                    <div className="row">



                    <div className="col-md-4">
                    <Sidebar/>
                    </div>

                    <div className="col-lg-8">
                        <h5>Projects</h5>
                        <div className="row row-cols-l-4 row-cols-md-3 g-2">
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
            </section>

            

        </>
    )
}

export default Project
