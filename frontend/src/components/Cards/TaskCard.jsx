import React, { useState,useEffect,useContext} from "react";
import SideTask from "../Sidetask";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import AddIcon from "../../assets_pocketdevs/assets/svg/AddIcon";
import { Dropdown } from "react-bootstrap";
import {taskRename,taskRemove,taskDescriptionUpdate} from "../../functions/taskFunctions"
import { TaskContext } from "../../contexts/SectionContext";
import { deleteTask, updateTask,createTask } from "../../actions/taskActions";

// const changeTask = ({sectionId, sections, setSections, taskName,index,dispatch,taskId}) =>{
//   if(taskName === ''){
//     taskRemove({sectionId, sections, setSections, index});
//     dispatch(deleteTask({taskId}))
//   }
//   else if(taskId === '123'){
//     console.log('create')
//     const task_priority = "light";
//     console.log(task_priority);
//     dispatch(createTask({task_name:taskName,task_description:'tempdescription',task_priority,section_id:sectionId}))
//   }
//   else{//retaskNameTask
//     taskRename({sectionId, sections, setSections, taskName,index});
//     dispatch(updateTask({task_name:taskName,task_id:taskId}))
//   }
// }



const updateTaskName = ({sectionId, sections, setSections, index, taskId,taskName,dispatch}) =>{
  if(taskName === ''){
    taskRemove({sectionId, sections, setSections, index});
    dispatch(deleteTask({taskId}))
  }
  else if(taskId === '123'){
    console.log('create')
    const task_priority = "";
    console.log(task_priority);
    dispatch(createTask({task_name:taskName,task_description:'tempdescription',task_priority,section_id:sectionId}))
  }
  else{
    taskRename({sectionId, sections, setSections, taskName,index});
    dispatch(updateTask({task_name:taskName, task_id:taskId}))
  }
}
const updateTaskEndDate = (taskId,taskEndDate) =>{

}
const updateTaskAssignedUsers = (taskId,taskAssignedUsers) =>{

}



const removeTask = ({sectionId, sections, setSections, index,taskId,dispatch}) =>{
  taskRemove({sectionId, sections, setSections, index});
  dispatch(deleteTask({taskId,task_index:index}))
}

const TaskCard = ({task,index,sectionId}) => {
  const {sections, setSections, dispatch} = useContext(TaskContext)

  const [showNav, setShowNav] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [taskName, setTaskName] = useState(task.task_name)
  const taskId = task._id
  const taskDescription = task.task_description
  useEffect(() => {
    // update the state of taskName when dragging
    setTaskName(task.task_name);
  },[task]);
  
  // console.log("task:" + task)

  const editText = () => {
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
              className="d-flex flex-column task-wrapper rounded"
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
                maxlength="16"
                className="border-top-0 border-end-0 border-start-0"
                value={taskName}
                onChange={(e) => {
                  setToggle(false)
                  setTaskName(e.target.value)
                }}
                autoFocus
                onBlur={(e)=>{
                  setToggle(true)
                  updateTaskName({sectionId, sections, setSections, taskName,index,dispatch,taskId});
                  e.preventDefault()
                  e.stopPropagation()
                }}  
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === 'Escape') {
                    setToggle(true)
                    updateTaskName({sectionId, sections, setSections, taskName,index,dispatch,taskId});
                    event.preventDefault()
                    event.stopPropagation()
                }}} 
              />)
            }      
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
                        <Dropdown.Item onClick={(e)=>{
                          removeTask({sectionId, sections, setSections, index,taskId,dispatch});;
                        }}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

              </div>

            <p className="px-3 text-limit">{taskDescription}</p>

            <div className="d-flex justify-content-between align-tasks-center">

           

              <p>date</p>
              <div className="d-flex align-tasks-center">
                <AddIcon className={"bi btn-outline-secondary rounded-circle ico"} />
                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle ico mx-1"
                />
              </div>
            </div>
          </div>)}}
    </Draggable>
    <SideTask showed={showNav} hide={setShowNav} task={task} index={index} sectionId ={sectionId}/>
  </div>
  );
}


export default TaskCard;
