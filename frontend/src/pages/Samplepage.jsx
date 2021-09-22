import React, { useState } from "react";
import Notes from "../components/Notes";
import SideTask from "../components/SideTask";

const SamplePage = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <header>
        <button onClick={() => setShowNav(!showNav)} className="theme-btn my-2">
          Edit Task
        </button>
      </header>
      <div className="notes">
        <Notes />
      </div>
      <SideTask show={showNav} hide={setShowNav} />
    </div>
  );
};

export default SamplePage;
