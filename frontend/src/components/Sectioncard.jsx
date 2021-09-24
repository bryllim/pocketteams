import React from "react";
import TaskCard from "./TaskCard";

const SectionCard = ({ taskList }) => {
  return (
    <div className="d-flex flex-column" style={{ width: "300px" }}>
      <div className="section-wrapper">
          <p className="sectionTitle py-2">Sectionname</p>
          <div className="section-wrapper-internal">
              {/* <button class="btn-add-task" type="button">
                <p><i class="bi bi-plus-square"></i> Add Another Task</p>
              </button> */}
              <TaskCard/>
              <TaskCard/>
              <TaskCard/>
              <TaskCard/>
              <div className="btn-container">
                <button className="theme-btn add-task-btn">ADD ANOTHER TASK</button>
            </div>
          </div>
      </div>
    </div>

  );
};

export default SectionCard;
