import React from 'react'
import {Dropdown,DropdownButton} from 'react-bootstrap'

const PopMenu = (toggleButton) => {
    
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
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                   
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                        Orange
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>,

        </>
    )
}

export default PopMenu
