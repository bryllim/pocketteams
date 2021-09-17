import React, { useState } from "react";
import Sidetask from "../components/Sidetask";

const Taskcard = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div
      onClick={() => setShowNav(!showNav)}
      className="d-flex flex-column mb-2 basecard"
    >
      <Sidetask show={showNav} hide={setShowNav} />
      <h6>Title</h6>
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
    </div>
  );
};

export default Taskcard;
