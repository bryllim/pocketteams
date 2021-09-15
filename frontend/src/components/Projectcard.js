import React from 'react'

const Projectcard = () => {
    return (
        
        <div class="d-flex flex-column p-3 basecard bg-light" style={{height:"200px"}}>

            <div className="d-flex justify-content-between">               
                <img src="https://via.placeholder.com/150" alt="" className="rounded"  style={{height:"50px", width:"50px"}}/>
                <i class="bi bi-three-dots"/>    
            </div>

            <div className="d-flex flex-column flex-fill justify-content-between">

                <div className="d-flex flex-column">
                    <h6>Title</h6>
                    <p className='ps-3'> Contedsa here    </p>
                </div>

                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <p>Date</p>
                        <p>Open project <i class="bi bi-chevron-right"></i> </p>
                    </div>
                </div>  

            </div>
            

        
            

        </div>
        
    )
}

export default Projectcard
