import React, { useState } from "react";
import Sidetask from "./SideTask";

const TaskCard = () => {
  const [showNav, setShowNav] = useState(false);
  return (

    <div
      onClick={() => setShowNav(!showNav)}
      className="d-flex flex-column task-wrapper mb-3 pb-3 px-3"
    >
      {showNav &&< Sidetask show={showNav} />}
      <div className="d-flex flex-row justify-content-between">
        <h6>Title</h6>
        <i class="lni lni-pencil"></i>
      </div>

      <p className="ps-3">Description</p>
      <div className="d-flex justify-content-between align-items-center mt-auto">
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
    
    </div>
  );
};

export default TaskCard;
