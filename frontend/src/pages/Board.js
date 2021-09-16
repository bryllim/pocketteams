
import Sidebar from '../components/Sidebar'
import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'

import Sectioncard from '../components/Sectioncard'


const Board = () => {
    return (
        <>
        <Navigation/>
    

      

            
            <div className="main container-fluid p-5 justify-content-center">
                <div className="row">

                    <div class="col-3 ">
                        <Sidebar/>
                    </div>

                    <div className="col-xxl-9">
                        <h1>Project</h1>
                    
                        <div className="row scrolling-wrapper flex-nowrap">
                

                                <Sectioncard/>
                         
                                    
                        
                                
                                <div className="col-5">
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
