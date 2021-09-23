import React from 'react'
import Sidebar from '../components/SideBar'
import Navigation from '../components/Navigation'
import ProjectCard from '../components/Cards/ProjectCard'

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
                        <h1>Projects</h1> 
                        <div className="row row-cols-xxl-3 row-cols-md-2 g-md-2 g-2">
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
                            </div>
                            <div class="col">
                                <ProjectCard/>
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
