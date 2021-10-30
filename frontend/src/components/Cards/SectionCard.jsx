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


  console.log("Section Card")

  console.log(sectionTitle)
  console.log(section)

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

  // const {addTask,columns,setColumns,changeSectionTitle} = useContext(TaskContext)
    
  // const changeSection = () =>{
  //   if(sectionTitle === ''){
  //     openDeleteSection()
  //   }
  //   else{
  //     changeSectionTitle({index,columnId,sectionTitle})
  //   }
      
  // }

  return (
    <>
    
    
      <Draggable draggableId={section._id} index={index} >
        {provided => {
          return(
            <div 
              {...provided.draggableProps}
              ref={provided.innerRef}
              className="d-flex flex-column section-wrapper mx-2"
            >
              <p>{sectionTitle}</p>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2 ">
                {sectionToggleState && sectionTitle !== '' ?
                  (<h5 className="text-white"
                    {...provided.dragHandleProps}
                  >
                    {<p>{sectionTitle}</p>}
                  </h5>)
                  :
                  (<input
                    type="text"
                    maxlength="16"
                    className="border-top-0 border-light border-end-0 border-start-0 bg-transparent text-white"
                    value={sectionTitle}
                    onChange={(e) => {
                      setSectionToggleState(false)
                      setSectiontitle(e.target.value)
                    }}
                    autoFocus
                    onBlur={(e)=>{
                      setSectionToggleState(true)
                      // changeSection()
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === 'Escape') {
                        setSectionToggleState(true)
                        // changeSection()
                        event.preventDefault()
                        event.stopPropagation()
                      }}} 
                  />)
                }
                

                  <button className="btn text-white ms-auto" type="button">
                    <i className="lni lni-plus fs-5 "></i>
                  </button>

                  <Dropdown>
                    <Dropdown.Toggle 
                      as={CustomToggle} 
                      id="dropdown-custom-components">
                        <button className="btn text-white" type="button">
                          <i className="lni lni-more-alt fs-5 "></i>
                        </button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>setSectionToggleState(false)}>Rename</Dropdown.Item>
                        <Dropdown.Item onClick={openDeleteSection}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  
             
              </div>
          {/* <Droppable droppableId={section._id} key={index} id="task">
                {(provided,snapshot) => {
                  

                  return(
                  
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="section-wrapper-internal scrolling-wrapper-y flex-nowrap pt-4 basecard">
                        {section.tasks.map((task, index) => {
                          return (
                            <div key={index}>
                            <TaskCard
                              columnId={columnId}
                              provided={provided}
                              snapshot={snapshot}
                              task={task}
                              index={index}
                            />
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
              </Droppable>  */}
            </div>
          )
        }}
   
        
    </Draggable> 
    <AddTaskModal showModal={show} hideModal={handleClose} />
    <DeleteSectionConfirmation showModal={showDeleteSection} hideModal={closeDeleteSection} columnId={columnId} index={index} />
    </>
  )}

export default SectionCard;