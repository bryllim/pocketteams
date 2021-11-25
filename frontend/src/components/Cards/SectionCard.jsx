import React,{useContext,useState,useRef} from "react";
import TaskCard from './TaskCard'
import { Droppable, Draggable} from 'react-beautiful-dnd' 
import {TaskContext} from "../../contexts/SectionContext"
import AddTaskModal from "../Modals/AddTaskModal";
import { Dropdown } from "react-bootstrap";
import DeleteSectionConfirmation from "../Modals/DeleteSectionConfirmation"
import {sectionDelete,sectionRename} from "../../functions/sectionFunctions"
import { useDispatch} from "react-redux";
import { updateSection, deleteSection} from "../../actions/sectionActions";
import {taskCreate} from "../../functions/taskFunctions"
import { v4 as uuidv4 } from 'uuid'

const changeSection =({sectionTitle,sections,setSections,index,dispatch,sectionId,openDeleteSection}) => {
  console.log(sectionTitle)
  if(sectionTitle === ''){
    openDeleteSection()
    return
  }
  else{
    sectionRename({sectionTitle,sections,setSections,index})
    dispatch(updateSection({ section_name:sectionTitle,sectionId}))
    return
  }
}

const removeSection = ({sectionOrder,setSectionOrder,sections,setSections,sectionId,index,dispatch}) =>{
  sectionDelete({sectionOrder,setSectionOrder,sections,setSections,sectionOrderIndex:index,sectionId})
  dispatch(deleteSection({section_id:sectionId}))
}

const newTask = ({sectionId, sections, setSections,dispatch}) =>{
  const taskTempId = uuidv4()
  taskCreate({sectionId, sections, setSections, taskTempId})
}

const SectionCard = ({sectionId,index,section}) => {
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

  const [sectionTitle, setSectionTitle] = useState(section.section_name)
  const [sectionToggleState,setSectionToggleState] = useState(true)

  const {sections,setSections} = useContext(TaskContext)

  const dispatch = useDispatch();
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
      <Draggable draggableId={sectionId} index={index} >
        {provided => {
          return(
            <div 
              {...provided.draggableProps}
              ref={provided.innerRef}
              className="d-flex flex-column section-wrapper mx-2"
            >
              <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2 ">
                {sectionToggleState && sectionTitle !== '' ?
                  (<h5 className="text-white"
                    {...provided.dragHandleProps}
                  >
                    {sectionTitle}
                  </h5>):(<input
                    type="text"
                    maxlength="16"
                    className="border-top-0 border-light border-end-0 border-start-0 bg-transparent text-white"
                    value={sectionTitle}
                    onChange={(e) => {
                      setSectionToggleState(false)
                      setSectionTitle(e.target.value)
                    }}
                    autoFocus
                    onBlur={(e)=>{
                      //not working when clicking to other sections
                      setSectionToggleState(true)
                      changeSection({sectionTitle,sections,setSections,index,dispatch,sectionId,openDeleteSection})
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === 'Escape') {
                        setSectionToggleState(true)
                        changeSection({sectionTitle,sections,setSections,index,dispatch,sectionId,openDeleteSection})
                        event.preventDefault()
                        event.stopPropagation()
                      }}} 
                  />)
                }
                

                  <button className="btn text-white ms-auto" type="button">
                    <i className="lni lni-plus fs-5 " onClick={()=>newTask({sectionId, sections, setSections,dispatch})}></i>
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
          <Droppable droppableId={section._id} key={index} id="task">
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
                              sectionId={sectionId}
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
                      style={{width:"250px", height:"50px"}} onClick={()=>newTask({sectionId, sections, setSections,dispatch})}>
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
        }}
         {/* MODALS */}
    </Draggable> 
    <AddTaskModal showModal={show} hideModal={handleClose} />
    <DeleteSectionConfirmation 
      showModal={showDeleteSection} 
      hideModal={closeDeleteSection} 
      sectionId={sectionId} 
      index={index} 
      removeSection={removeSection}
    />
      </>
  )}

export default SectionCard;