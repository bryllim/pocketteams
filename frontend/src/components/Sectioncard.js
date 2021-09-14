import React from 'react'
import Taskcard from './Taskcard'

const Sectioncard = () => {
    return (

        <div className="col">
            <div className="d-grid d-flex d-flex justify-content-between rounded-top bg-danger ps-2">
                
                <div class="d-flex align-items-center">
                    <div>Sectionname</div>
                </div>
                <div>
                    <button class="btn" type="button">
                        <i class="bi bi-plus-square"></i>
                    </button>

                    <button class="btn " type="button">
                        <i class="bi bi-three-dots"></i>
                    </button>

                </div>
         

                 
            </div>

            <div className="d-flex flex-column sectioncard">
                <Taskcard/>
            </div>

            <div className="d-flex justify-content-center rounded-bottom bg-danger">
                
                <div class="d-flex align-items-center">
                    <button class="btn" type="button">
                            <i class="bi bi-plus-square"></i>
                        </button>
                    <div>Add Another Task</div>

                </div>
               
            </div>


        </div>

        
    )
}

export default Sectioncard
