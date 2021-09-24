import React from 'react'
import {Dropdown} from 'react-bootstrap'

const PopMenu = () => {
    
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <p
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </p>
    ));

    function handleClick(items){
        console.log(items);
    }

    return (
           <Dropdown>
                <Dropdown.Toggle 
                as={CustomToggle} 
                id="dropdown-custom-components">
                    <i className="bi bi-three-dots"/> 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    
                    {/* {menuOptions.map((items) => (
                        <Dropdown.Item>{items}</Dropdown.Item>
                    ))} */}
                </Dropdown.Menu>
            </Dropdown>
    )
}

export default PopMenu
