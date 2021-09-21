import React from "react";

const Notes = () => {
  return (
    <div class="sidebar-box recent-blog-box mb-30">
      <h5>My Notes</h5>
      <hr className="notes"></hr>
      <textarea className="notes-text"></textarea>
      <button className="theme-btn theme-btn-nav">
        <i class="lni lni-cloud-sync"></i>
        <span>Sync notes</span>
      </button>
    </div>
  );
};

export default Notes;
