import React, { useState } from "react";
import SideTask from "../Sidetask";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const TaskCard = ({item,index }) => {
  const [showNav, setShowNav] = useState(false);

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
              className="d-flex flex-column task-wrapper mb-3 px-3 rounded"

              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}

              style={{
                userSelect: "none",
                ...provided.draggableProps.style
              }}

            >
              <div className="d-flex flex-row justify-content-between">
                <h6>{item.content}</h6>
                <i onClick={() => setShowNav(!showNav)} className="lni lni-pencil p-2"></i>
              </div>

            <p className="ps-3">Description</p>
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
