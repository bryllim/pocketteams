import React,{Container} from "react";
import TaskCard from './TaskCard'
import PopMenu from './PopMenu'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const SectionCard = ({ provided,snapshot,column,columnId,index }) => {
  return (
      <Draggable draggableId={columnId} index={index}>
        {provided => {
          return(
            <div 
              {...provided.draggableProps}
              ref={provided.innerRef}
              className="d-flex flex-column section-wrapper mx-2 mb-3"
            >
              <div className="d-flex justify-content-between align-items-center px-3 py-2 ">
                <h5 className="text-white"
                  {...provided.dragHandleProps}
                >{column.name}asd</h5>
                <div>
                  <button class="btn text-white" type="button">
                    <i class="lni lni-plus fs-3 "></i>
                  </button>
              
                  <button class="btn text-white" type="button">
                    <i class="lni lni-more-alt fs-3 "></i>
                  </button>
                </div>
              </div>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided,snapshot) => {
                  return(
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="section-wrapper-internal scrolling-wrapper-y flex-nowrap py-4 basecard"
                    >
                      {column.items.map((item, index) => {
                        return (
                          <>
                            <TaskCard
                              provided={provided}
                              snapshot={snapshot}
                              item={item}
                              index={index}
                            />
                          </>
                        )})}
                      {provided.placeholder}
                        <div class="d-flex justify-content-center theme-btn align-items-center mx-auto"  style={{width:"324px", height:"50px"}}>
                          <button class="btn" type="button">
                              <i class="lni lni-plus"></i>
                          </button>
                          <div>Add Another Task</div>
                        </div>
                    </div> 
                  )
                }}  
              </Droppable> 
            </div>
          )
        }}
    </Draggable> 
  )}

export default SectionCard;
