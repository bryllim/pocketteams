import React, { useState } from "react";
import TaskCard from "./TaskCard";
import PopMenu from "../PopMenu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const SectionCard = ({ provided, snapshot, column }) => {
  return (
    <>
      <div
        className="d-flex flex-column section-wrapper mx-2 mb-3"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-2 ">
          <h5 className="text-white">{column.name}</h5>
          <div>
            <button class="btn text-white" type="button">
              <i class="lni lni-plus fs-3 "></i>
            </button>

            <button class="btn text-white" type="button">
              <i class="lni lni-more-alt fs-3 "></i>
            </button>
          </div>
        </div>
        <div className="section-wrapper-internal scrolling-wrapper-y flex-nowrap py-4 basecard">
          {column.items.map((item, index) => {
            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <>
                      <TaskCard
                        provided={provided}
                        snapshot={snapshot}
                        item={item}
                      />
                    </>
                  );
                }}
              </Draggable>
            );
          })}
          {provided.placeholder}
          <div
            class="d-flex justify-content-center theme-btn align-items-center mx-auto"
            style={{ width: "324px", height: "50px" }}
          >
            <button class="btn" type="button">
              <i class="lni lni-plus"></i>
            </button>
            <div>Add Another Task</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionCard;
