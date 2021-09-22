import React, { useState } from "react";
import Sidetask from "./SideTask";

const TaskCard = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="d-flex flex-column mb-2 basecard pointer">
      <h6>Title</h6>
      <button onClick={() => setShowNav(!showNav)} className="theme-btn p-0">
        try
      </button>
      <p>Description</p>
      <div className="d-flex justify-content-between align-items-center">
        <p>date</p>
        <div className="d-flex align-items-center">
          <button class="btn p-1 " type="button">
            <i class="bi bi-plus-circle"></i>
          </button>
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="rounded-circle"
            style={{ width: "auto", height: "20px" }}
          />
        </div>
      </div>
      <Sidetask show={showNav} hide={setShowNav} />
    </div>
  );
};

export default TaskCard;
