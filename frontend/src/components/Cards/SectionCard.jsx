import React,{useContext,useState,useEffect} from "react";
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
import { ObjectID } from 'bson';
import midString from "../../functions/ordering"

const changeSection =({
  sectionTitle,
  dispatch,
  sectionId,
  openDeleteSection,
  initialData,
  setInitialData}) => {
  if(sectionTitle === ''){
    openDeleteSection()
    return
  }
  else{
    sectionRename({ sectionTitle,
      initialData,
      setInitialData,
      sectionId})
    const newData = {
      section_name: sectionTitle,
    }
    dispatch(updateSection({ params:newData, sectionId}))
    return
  }
}
const removeSection = ({
  initialData,
  setInitialData,
  sectionId,
  index,
  dispatch}) =>{ 
  sectionDelete({
    initialData,
    setInitialData,
    sectionId,
    index})
  dispatch(deleteSection({sectionId}))
}
const newTask = ({
  initialData,
  setInitialData,
  sectionId 
  }) =>{
  const section = initialData.sections[sectionId]
  const tasks = initialData.tasks
  const taskIds = section.taskIds
  const totalTasks = taskIds.length
  const newTask = {
    task_name: '',
    description: '',
    section_id: sectionId,
    project_id: section.project_id,
    order: totalTasks === 0 ? 'n' : midString(tasks[taskIds[totalTasks - 1]].order, ''),
    _id: new ObjectID().toHexString(),
  }
  taskCreate({
    initialData,
    setInitialData,
    sectionId,
    newTask})
  return
}

const SectionCard = ({index,section,sectionId,tasks}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const closeDeleteSection = () => setShowDeleteSection(false)
  const openDeleteSection = () => setShowDeleteSection(true)
  const [sectionTitle, setSectionTitle] = useState(section.section_name)
  const [sectionToggleState,setSectionToggleState] = useState(true)
  const {initialData,setInitialData} = useContext(TaskContext)
  const dispatch = useDispatch();
  
  useEffect(() => {
    setSectionTitle(section.section_name)
  }, [section])
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
              <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2 "  {...provided.dragHandleProps}>
                {sectionToggleState && sectionTitle !== '' ?
                  (<h5 className="text-white"
                   
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
                      changeSection({
                        sectionTitle,
                        index,
                        dispatch,
                        sectionId,
                        openDeleteSection, 
                        initialData,
                        setInitialData})
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === 'Escape') {
                        setSectionToggleState(true)
                        changeSection({
                          sectionTitle,
                          index,
                          dispatch,
                          sectionId,
                          openDeleteSection, 
                          initialData,
                          setInitialData})
                        event.preventDefault()
                        event.stopPropagation()
                      }}} 
                  />)
                }               
                  <button className="btn text-white ms-auto" type="button">
                    <i className="lni lni-plus fs-5 " 
                      onClick={()=>newTask({
                        initialData,
                        setInitialData,
                        sectionId
                      })}>
                    </i>
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
          <Droppable 
            droppableId={section._id} 
            key={index} 
            id="task"
          >  
            {(provided,snapshot) => (  
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="section-wrapper-internal scrolling-wrapper-y flex-nowrap pt-4 basecard">
                    {tasks.map((task,index) =>{
                      return(
                        <TaskCard
                          sectionId={sectionId}
                          task={task}
                          index={index}
                        />  
                      )
                      })}
                    
                   
                  {provided.placeholder}
                  <div className="d-flex justify-content-center align-items-center theme-btn mx-auto my-4"  
                  style={{width:"250px", height:"50px"}}
                    onClick={()=>newTask({
                      initialData,
                      setInitialData,
                      sectionId
                    })}>
                        <button className="btn" type="button">
                            <i className="lni lni-plus text-white"></i>
                        </button>
                        <h6 className="text-white">Add Another</h6>
                  </div>
                </div>
                  )}  
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