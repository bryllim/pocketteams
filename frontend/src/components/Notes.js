import React from "react";
import { Image } from "react-bootstrap";
import myNotes from "../assets_pocketdevs/assets/img/logo/note-icon.svg";

const Notes = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h3 className="my-2 py-2 border-bottom border-bottom-dark">My Notes</h3>
        <textarea className="border-1 resize-0 h6 h-full"></textarea>
      </div>
      <div>
        <button className="theme-btn subtask py-0 d-flex align-items-center">
          <Image className="fas-icon pt-2" src={myNotes}></Image>
          Sync notes
        </button>
      </div>
    </div>
  );
};

export default Notes;
