import React from 'react'

const Teamcard = () => {
    return (
        <div className="container-fluid basecard">
            <h4>Teamname</h4>
             <div className="row justify-content-between" style={{ background: 'red'}}>
                
            <div className="col-auto">
                
                <button type="d-flex button" class="btn">
                     <i class="bi bi-caret-right-fill" />
                </button>

                <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'40px'}}/>
                <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'auto', height:'40px'}}/>
                
            </div>
         
            <div className="col-auto">
                <button type="d-flex button " class="btn">
                        <i class="bi bi-three-dots"/>    
                </button>  
            </div>

            </div>

            



        </div>
    )
}

export default Teamcard
