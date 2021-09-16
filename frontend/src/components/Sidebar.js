import React, { useState } from 'react'

import Profilecard from './Profilecard'
import Teamcard from './Teamcard'
import {Button,Accordion,Card} from 'react-bootstrap'

const Sidebar = () => {



    return (
         
           <div class="d-flex flex-column align-items-center" style={{maxWidth:"300px"}}>
                
                   <Profilecard/>
                   <Teamcard/>
                   
                   <Button variant="primary"  >Primary</Button>

                            
            </div>     
  
    )
}

export default Sidebar
