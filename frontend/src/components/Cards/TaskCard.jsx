import React, { useState,useEffect,useContext} from "react";
import SideTask from "../Sidetask";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import AddIcon from "../../assets_pocketdevs/assets/svg/AddIcon";
import { Dropdown } from "react-bootstrap";
import {editTitle} from "../../functions/TaskFunctions"
import { TaskContext } from "../../contexts/SectionContext";
import { deleteTask,updateTask } from "../../actions/taskActions";

const changeTask = ({sectionId, sections, setSections, taskName,index}) =>{
  editTitle({sectionId, sections, setSections, taskName,index});
  dispatch()
}

const TaskCard = ({task,index,sectionId}) => {
  const [showNav, setShowNav] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [name, setName] = useState(task.task_name)
  const taskId = task.task_id
  const taskName = task.task_name
  const {sections, setSections, dispatch} = useContext(TaskContext)

  useEffect(() => {
    // update the state of name when dragging
    setName(task.task_name);
  },[task]);
  

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

              {toggle && name !== '' ?
              (<h6 className="hover-me" onClick={()=> editText()} >{name}</h6>)
              :
              (<input
                type="text"
                maxlength="16"
                className="border-top-0 border-end-0 border-start-0"
                value={name}
                onChange={(e) => {
                  setToggle(false)
                  setName(e.target.value)
                }}
                autoFocus
                onBlur={(e)=>{
                  setToggle(true)
                  changeTask({sectionId, sections, setSections, taskName,index});
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === 'Escape') {
                    setToggle(true)
                    editTitle(index,name,task.id,sectionId);
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
                          editTitle(index,'',task.id,columnId);
                        }}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* <i onClick={() => setShowNav(!showNav)} className="lni lni-pencil p-2"></i> */}
              </div>

            <p className="px-3 text-limit">Desc scrip scrip scrip ripti oscripti oscripti oscript ios crip tioscrip
            tioscriptioscn</p>

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
    <SideTask showed={showNav} hide={setShowNav} />
  </div>
  );
}


export default TaskCard;
