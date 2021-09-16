import React from 'react'

const ProjectDashboard = () => {
    return (
        <div className="container">
          
       
        <div className="d-flex flex-column align-items-center"> 

            <div className="d-flex flex-column  align-items-center " style={{ width:"500px"}} >

                <img src="https://via.placeholder.com/150" alt="" className="rounded"  style={{height:"150px", width:"150px"}}/>

                <div class="mb-3">
                <input type="text" class="form-control text-center"  id="formGroupExampleInput" placeholder="Title"/>
                </div>

                <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">Description</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                </div>

                <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Dates</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
                </div>

                <div className="d-flex flex-row basecard align-self-stretch "  style={{height:"115px"}}>
                    
                    <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'60px'}}/>
                    <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'60px'}}/>
                </div>

            </div>            
            
                    
        
        </div>
    
                

         
        </div>
    )
}

export default ProjectDashboard
