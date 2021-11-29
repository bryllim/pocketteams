import React from "react";
import { Droppable} from 'react-beautiful-dnd' 
import AddIcon from "../../assets_pocketdevs/assets/svg/AddIcon";
import { Dropdown } from "react-bootstrap";
import "../../css/skeleton.css"
const SkeletonSectionCard = () => {
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
  return (
        <div className="d-flex flex-column section-wrapper mx-2">
            <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2 ">
                <h5 className="skeleton skeleton-text title"></h5>
                <button className="btn text-white ms-auto" type="button">
                <i className="lni lni-plus fs-5 "></i>
                </button>
                <Dropdown>
                <Dropdown.Toggle
                   as={CustomToggle} 
                >
                    <button className="btn text-white" type="button">
                        <i className="lni lni-more-alt fs-5 "></i>
                    </button>
                </Dropdown.Toggle>
                </Dropdown>
            </div>
            <Droppable >
                {(provided,snapshot) => {
                    return(
                        <div className="section-wrapper-internal scrolling-wrapper-y flex-nowrap pt-4 basecard">
                            { Array.from(Array(Math.floor(Math.random() * 5))).map((task, index) => {
                                return (
                                    <div className="d-flex flex-column task-wrapper rounded">
                                        <div className="d-flex flex-row justify-content-between">
                                            <h6 className="skeleton skeleton-text title"></h6>
                                            <Dropdown>
                                                <Dropdown.Toggle 
                                                as={CustomToggle} 
                                                id="dropdown-custom-components">
                                                    <button className="btn p-0" type="button">
                                                    <i className="lni lni-pencil p-2"></i>
                                                    </button>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item >Edit</Dropdown.Item>
                                                    <Dropdown.Item >Remove</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                            <div >
                                                <p className="skeleton skeleton-text"></p>
                                                <p className="skeleton skeleton-text"></p>
                                            </div>                          
                                            <div className="d-flex justify-content-between align-tasks-center">
                                                <p>date</p>
                                                <div className="d-flex align-tasks-center">
                                                <AddIcon className={"bi btn-outline-secondary rounded-circle ico"} />
                                                <div className="ico header-img skeleton"></div>           
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {provided.placeholder} 
                            <div className="d-flex justify-content-center align-items-center theme-btn mx-auto my-4"  
                            style={{width:"250px", height:"50px"}}>
                                <button className="btn" type="button">
                                    <i className="lni lni-plus text-white"></i>
                                </button>
                                <h6 className="text-white">Add Another</h6>
                            </div>
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}

export default SkeletonSectionCard;