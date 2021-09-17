import React from 'react'
import Navigation from '../components/Navigation'
const ProjectDashboard = () => {
    return (
       
        <>
        <header className="header navbar-area sticky">
            <div className="container py-1">
                <button type="d-flex button" class="btn">
                    <i class="fs-1 bi bi-chevron-left"></i>
                </button>
            </div>
           
        </header>
        <div className="d-flex flex-column align-items-center"> 

            <div className="d-flex flex-column  align-items-center " style={{ width:"500px"}} >

                <img src="https://via.placeholder.com/150" alt="" className="rounded"  style={{height:"150px", width:"150px"}}/>

                <div class="mb-3">
                <input type="text" class="form-control text-center border-top-0 border-end-0 border-start-0 border-bottom  "  id="formGroupExampleInput" placeholder="Title"/>
                </div>

                <div class="mb-3 align-self-stretch">
                <label for="formGroupExampleInput" class="form-label">Description</label>
                <input type="text" class="form-control border-top-0 border-end-0 border-start-0 border-bottom" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                </div>

               

                <div class="mb-3 align-self-stretch">
                    <label for="formGroupExampleInput2" class="form-label">Dates</label>
                    <div class="d-flex justify-content-between">
                        <input type="date" class=" d-inline" id="date" name="date"/>
                        <span className="m-2">to</span>
                        <input type="date" class=" d-inline" id="date" name="date"/>
                    </div>
                </div>

                <div className="d-flex flex-row basecard align-items-center align-self-stretch"  style={{height:"115px"}}>
                    
                    <button type="d-flex button" class="btn">
                        <i class="bi bi-caret-right-fill" />
                    </button>
                  
                    <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'60px'}}/>
                    <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'60px'}}/>
                    
                
                    <button type="d-flex button" class="btn ms-auto align-self-start">
                        <i class="bi bi-three-dots"/>    
                        
                    </button>  

                </div>

            </div>            
            
                    
        
        </div>
    
                

         
        </>
    )
}

export default ProjectDashboard
