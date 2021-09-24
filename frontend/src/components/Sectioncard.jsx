import React from "react";
<<<<<<< HEAD
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

=======
import TaskCard from './TaskCard'
import PopMenu from './PopMenu'

const SectionCard = ({ taskList }) => {
  return (
    <>
   
    <div className="d-flex flex-column section-wrapper mx-2 mb-3" >
      <div className="d-flex justify-content-between align-items-center px-3 py-2 ">

        <h5 className="text-white">Sectionname</h5>
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

            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>

                  <div class="d-flex justify-content-center theme-btn align-items-center mx-auto"  style={{width:"324px", height:"50px"}}>
                      <button class="btn" type="button">
                          <i class="lni lni-plus"></i>
                      </button>
                      <div>Add Another Task</div>
                  </div>
            </div>
    </div>
    </>
>>>>>>> b73e56b2c887fafa22abd207f5e1305c5bbda3d2
  );
};

export default SectionCard;
