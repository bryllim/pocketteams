import React from "react";
import { Image } from "react-bootstrap";
import myNotes from "../assets_pocketdevs/assets/img/logo/note-icon.svg";

const Notes = () => {
  return (
    <div class="sidebar-box recent-blog-box mb-30">
      <h5>My Notes</h5>
      <hr className="notes"></hr>
      <textarea cols="30" rows="15" className="notes-text"></textarea>
      <button className="theme-btn subtask py-0 d-flex align-items-center">
        <Image className="fas-icon pt-2" src={myNotes}></Image>
        Sync notes
      </button>
    </div>
  );
};

export default Notes;
