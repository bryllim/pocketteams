import React from 'react'
import Taskcard from './Taskcard'
import PopMenu from './PopMenu'

const Sectioncard = ({taskList}) => {
    return (

        <div className="d-flex flex-column" style={{width:"300px"}}>
            <div className="d-grid section justify-content-between rounded-top bg-danger ps-2">
                <div className="sectionTitle">
                    Sectionname
                </div>
            

                <div className="btn-group optionButton">
                    <button class="btn" type="button">
                        <i class="bi bi-plus-square"></i>
                    </button>

                    <button type="button" class="d-flex btn">
                            <PopMenu  menuOptions={["Edit","Remove"]} />
                    </button>    
                </div>
         

                 
            </div>
            <div className="d-flex flex-column scrolling-wrapper-y flex-nowrap" style={{maxHeight:"500px"}}>
                <div className="d-flex flex-column sectioncard">

                    {taskList.map((items) => (
                         <Taskcard/>
                    ))}
                  
                </div>
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
