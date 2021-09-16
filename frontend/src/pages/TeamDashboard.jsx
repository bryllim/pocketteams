import React from 'react'
import MemberCard from '../components/MemberCard'
const TeamDashboard = () => {
    return (
        <>
        <header className="header navbar-area sticky">
            <div className="container py-1">
                <div className="row">
                   <div className="col">
                    <button type="d-flex button" class="btn">
                            <i class="fs-1 bi bi-chevron-left"></i>
                        </button>
                        <span className="fs-1">TeamDashboard</span>
                    </div>
                </div>
               
            </div>
        </header>
        
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6 p-5 ">
                
                        <div className="row row-cols-xl-3 row-cols-l-2 g-5">
                            <div class="col">
                                <MemberCard/>
                            </div>
                            <div class="col">
                                <MemberCard/>
                            </div>
                            <div class="col">
                                <MemberCard/>
                            </div>
                            <div class="col">
                                <MemberCard/>
                            </div>
                            <div class="col">
                                <MemberCard/>
                            </div>
                            <div class="col">
                                <MemberCard/>
                            </div>
                        </div>
                    </div>
            </div>
         
        </div>



        </>
    )
}

export default TeamDashboard
