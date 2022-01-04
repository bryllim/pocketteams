import React, { useState,useEffect,useContext} from "react";
import SideTask from "../Sidetask";
import {Draggable} from 'react-beautiful-dnd'
import AddIcon from "../../assets_pocketdevs/assets/svg/AddIcon";
import { Dropdown } from "react-bootstrap";
import {taskRename,taskRemove} from "../../functions/taskFunctions"
import { TaskContext } from "../../contexts/SectionContext";
import { deleteTask, updateTask,createTask } from "../../actions/taskActions";
import "../../css/skeleton.css"


const updateTaskName = ({
  sectionId, 
  sections, 
  setSections, 
  index, 
  taskId,
  taskName,
  dispatch,
  task,
  initialData,
  setInitialData}) =>{
  if(taskName === ''){
    taskRemove({
      initialData,
      setInitialData,
      taskId,
      index,
      sectionId,
      dispatch
    });
    dispatch(deleteTask({taskId}))
  }
  else if(task.task_name === ''){
    taskRename({
      initialData,
      setInitialData,
      taskName,
      taskId});
    task.task_name = taskName
    dispatch(createTask(task))
  }
  else{
    const newData = taskRename({
      initialData,
      setInitialData,
      taskName,
      taskId});
    dispatch(updateTask({params:newData,taskId}))
  }
}
const removeTask = ({
  initialData,
  setInitialData,
  taskId,
  index,
  sectionId,
  dispatch}) =>{
  taskRemove({
    initialData,
    setInitialData,
    taskId,
    sectionId,
    index
  });
  dispatch(deleteTask({taskId}))
}

const TaskCard = ({task,index,sectionId}) => {
  const {
    sections, 
    setSections, 
    dispatch,
    initialData,
    setInitialData} = useContext(TaskContext)
  const [showNav, setShowNav] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [taskName, setTaskName] = useState(task.task_name)
  const [taskColor, setTaskColor] = useState("")
  const [badgeStatus, setBadgeStatus] = useState("")
  const taskId = task._id
  const taskDescription = task.task_description
  const taskPriority = task.task_priority
 
  useEffect(() => {
    // update the state of taskName when dragging
    setTaskName(task.task_name);
  },[task]);

   useEffect(() => {
    if (taskPriority === "light") {
      setTaskColor("light-1");
      setBadgeStatus("light")
    } else if (taskPriority === "medium") {
      setTaskColor("medium-2 text-white");
      setBadgeStatus("medium")
    } else if (taskPriority === "heavy") {
      setTaskColor("heavy-3");
      setBadgeStatus("heavy")
    } else {
      setBadgeStatus('')
    }
  },[taskPriority]);
  
  const editText = () => {
    console.log("Edit")
    setToggle(false)
  }

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
    <div>
      <Draggable
        key={task._id}
        draggableId={task._id}
        index={index}
      >
          
        {(provided, snapshot) => {
          return (
            <div
              className={`d-flex flex-column task-wrapper rounded`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}

              style={{
                userSelect: "none",
                ...provided.draggableProps.style
              }}
            >
              <div className="d-flex flex-row justify-content-between">
              {toggle && taskName !== '' ?
              (<h6 className="hover-me" onClick={()=> editText()} >{taskName}</h6>)
              :
              (<input
                type="text"
                maxLength="16"
                className="border-top-0 border-end-0 border-start-0"
                value={taskName}
                onChange={(e) => {
                  setToggle(false)
                  setTaskName(e.target.value)
                }}
                autoFocus
                onBlur={(e)=>{
                  setToggle(true)
                  updateTaskName({sectionId, sections, setSections, taskName,index,dispatch,taskId,task,initialData,setInitialData});
                  e.preventDefault()
                  e.stopPropagation()
                }}  
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === 'Escape') {
                    setToggle(true)
                    updateTaskName({sectionId, sections, setSections, taskName,index,dispatch,taskId,task,initialData,setInitialData});
                    event.preventDefault()
                    event.stopPropagation()
                }}} 
              />)
            }      
                <span className={`badge ${taskColor}`}>{badgeStatus}</span>
                {/* <h6>{task.content}</h6> */}
                <Dropdown>
                    <Dropdown.Toggle 
                      as={CustomToggle} 
                      id="dropdown-custom-components">
                        <button className="btn p-0" type="button">
                          <i className="lni lni-pencil p-2"></i>
                        </button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>setShowNav(!showNav)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{
                          removeTask({sectionId, sections, setSections, index,taskId,dispatch});;
                        }}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <i onClick={() => setShowNav(!showNav)} className="lni lni-pencil p-2"></i> */}
              </div>                    
            <p className={`px-3 text-limit`}>{taskDescription}</p>
            <div className="d-flex justify-content-between align-tasks-center">
              <p>date</p>
              <div className="d-flex align-tasks-center">
                <AddIcon className={"bi btn-outline-secondary rounded-circle ico"} />
                <img
                  // src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle ico mx-1"
                />
              </div>
            </div>
          </div>)}}
    </Draggable>
    <SideTask showed={showNav} hide={setShowNav} task={task} index={index} sectionId ={sectionId} section={sections}  />
    {/* sidetask causing delay, need fix */}
  </div>
)}


export default TaskCard;
