import React from "react";

const Comment = () => {
  return (
    <div>
      <div className="d-flex align-items-center p-2">
      <i class="lni lni-user mx-2 fas-icon"></i>
        <input
          className="border-1 p-1 full radius"
          type="text"
          readOnly="true"
        ></input>
      </div>
    </div>
  );
};

export default Comment;
