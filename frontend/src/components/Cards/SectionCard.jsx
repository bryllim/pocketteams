import React,{useContext,useState,useRef} from "react";
import TaskCard from './TaskCard'
import { Droppable, Draggable} from 'react-beautiful-dnd' 
import {TaskContext} from "../../contexts/SectionContext"
import AddTaskModal from "../Modals/AddTaskModal";
import { Dropdown } from "react-bootstrap";
import DeleteSectionConfirmation from "../Modals/DeleteSectionConfirmation"



const SectionCard = ({columnId,index,section}) => {
  //rework
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);

  const handleEditShow = () => setEditShow(true);
  
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const closeDeleteSection = () => setShowDeleteSection(false)
  const openDeleteSection = () => setShowDeleteSection(true)

  const [sectionTitle, setSectiontitle] = useState(section.section_name)
  const [sectionToggleState,setSectionToggleState] = useState(true)


  // console.log("Section Card")
  // console.log(section._id)
  // console.log(columnId)

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
    <>
      <Draggable draggableId={columnId} index={index} >
        {provided => {
          return(
            <div 
            {...provided.draggableProps}
              ref={provided.innerRef}
              className="d-flex flex-column section-wrapper mx-2"
            >
              <p>{section.section_name}</p>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2 ">
                { section.section_name !== '' ?
                  (<h5 className="text-white"
                    {...provided.dragHandleProps}
                  >
                    {<p>{section.section_name}</p>}
                  </h5>):<></>}
              </div>
            </div>
          )
        }}
   
        
    </Draggable> 
    <AddTaskModal showModal={show} hideModal={handleClose} />
    <DeleteSectionConfirmation showModal={showDeleteSection} hideModal={closeDeleteSection} columnId={columnId} index={index} />
    </>
  )}

export default SectionCard;