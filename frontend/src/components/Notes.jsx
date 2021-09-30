import React from "react";

const Notes = () => {
  return (
    <div className="sidebar-box recent-blog-box mb-30">
      <h5>My Notes</h5>
      <hr className="default"></hr>
      <textarea className="notes-text"></textarea>
      <button className="theme-btn theme-btn-sm">
        <i className="lni lni-cloud-sync me-2"></i>
        <span>Sync notes</span>
      </button>
    </div>
  );
};

export default Notes;
