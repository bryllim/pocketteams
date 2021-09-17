import React from 'react'
import {Dropdown} from 'react-bootstrap'

const PopMenu = ({menuOptions}) => {
    
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {

            e.preventDefault();
            onClick(e);
            
          }}
        >
          {children}
   
        </a>
    ));


    return (
        <>
           <Dropdown>
                <Dropdown.Toggle 
                as={CustomToggle} 
                
        
                id="dropdown-custom-components">

                    <i class="bi bi-three-dots"/> 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {menuOptions.map((items) => (
                        <Dropdown.Item eventKey="1">{items}</Dropdown.Item>
                        
                    ))}
                    
                </Dropdown.Menu>
            </Dropdown>

        </>
    )
}

export default PopMenu
