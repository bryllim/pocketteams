import React, { useState,useEffect,useContext} from "react";
import SideTask from "../Sidetask";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {TaskContext} from "../../contexts/SectionContext"
const TaskCard = ({item,index}) => {
  const [showNav, setShowNav] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [name, setName] = useState(item.content)
  const {editTitle} = useContext(TaskContext)

  useEffect(() => {
    // update the state of name when dragging

    setName(item.content);
  },[item]);
  

  const editText = () => {
    setToggle(false)
  }


  return (
    <div>
      <Draggable
        key={item.id}
        draggableId={item.id}
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

              {toggle ?
              (<h6 className="hover-me" onClick={()=> editText()}>{name}</h6>)
              :
              (<input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                // onBlur={(e)=>{
                //   setToggle(true)
                //   setName(e.target.value)
                //   e.preventDefault()
                //   e.stopPropagation()
                // }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === 'Escape') {
                    setToggle(true)
                    editTitle(index,item);
                    event.preventDefault()
                    event.stopPropagation()
                }}} 
              />)
            }      
                {/* <h6>{item.content}</h6> */}
                <i onClick={() => setShowNav(!showNav)} className="lni lni-pencil p-2"></i>
              </div>

            <p className="px-3 text-limit">Desc scrip scrip scrip ripti oscripti oscripti oscript ios crip tioscrip
            tioscriptioscn</p>

            <div className="d-flex justify-content-between align-items-center">

           

              <p>date</p>
              <div className="d-flex align-items-center">
                <i className="lni lni-circle-plus fs-2 mx-1"/>
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
