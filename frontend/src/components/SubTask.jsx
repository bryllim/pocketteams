import React, { useState } from "react";

const SubTask = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="theme-btn theme-btn-sm"
      >
        + Add subtask
      </button>

      {Array.from(Array(counter)).map((c, index) => {
        return (
          <div key={c} className="d-flex align-items-center my-3 px-3">
            <i class="lni lni-checkmark-circle pe-2"></i>
            <input name="subtask" className="full input-border form-control px-1" type="text" />
          </div>
        );
      })}
    </div>
  );
};

export default SubTask;
