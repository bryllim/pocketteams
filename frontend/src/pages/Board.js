
import Sidebar from '../components/Sidebar'
import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Taskboard from '../components/Taskboard'



const Board = () => {
    return (
        <>
        <Navigation/>
    

        <div className="container-fluid main">

            
            


            <div className="row">
                <div class="col-auto">
                    <Sidebar/>
                </div>


                <div className="col">
                    <h1>Project</h1>
                   
                    <div className="row">
               
                        <div className="col">
                        <Taskboard/>
                        </div>
                        <div className="col-8">
                        <h6>Add Section</h6>
                        </div>
                       

                    </div>
                </div>
    
             
            </div>
            
        </div>

        </>
    )
}

export default Board
