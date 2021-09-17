import React from "react";

const Teamcard = () => {
  return (
    <div className="sidebar-box catagories-box mb-30">
      <h4>Teamname</h4>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <button type="d-flex button" class="btn">
            <i class="bi bi-caret-right-fill" />
          </button>
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="rounded-circle"
            style={{ width: "auto", height: "40px" }}
          />
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="rounded-circle"
            style={{ width: "auto", height: "40px" }}
          />
        </div>
        <button type="d-flex button" class="btn">
          <i class="bi bi-three-dots" />
        </button>
      </div>
    </div>
  );
};

export default Teamcard;
