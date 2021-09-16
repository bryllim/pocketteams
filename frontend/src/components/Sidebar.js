import React from 'react'
import Profilecard from './Profilecard'
import Teamcard from './Teamcard'
import Button from './Button'
const Sidebar = () => {
    return (
            // <div class='bg-dark' style={{width: '200px'}}> 
            //     <h1>test</h1>

            // </div>
           <div class="d-flex flex-column align-items-center" style={{maxWidth:"300px"}}>
                
                   <Profilecard/>
                   <Teamcard/>
                   <Button/>

            </div>     
  
    )
}

export default Sidebar
