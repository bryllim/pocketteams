
import Sidebar from '../components/Sidebar'
import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'

import Sectioncard from '../components/Sectioncard'


const Board = () => {
    return (
        <>
        <Navigation/>
    

      

            
            <div className="main container-fluid p-5 ">
                <div className="row">

                    <div class="col-5 " >
                        <Sidebar/>
                    </div>

                    <div className="col-6">
                        <h1>Project</h1>
                    
                        <div className="row scrolling-wrapper flex-nowrap">
                

                                <Sectioncard/>
                                <Sectioncard/>
                                <Sectioncard/>
                                <Sectioncard/>
                                <Sectioncard/>
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
