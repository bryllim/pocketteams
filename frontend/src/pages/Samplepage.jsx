import React, { useState } from "react";
import Notes from "../components/Notes";
import Sidetask from "../components/Sidetask";

const Samplepage = () => {
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
      <Sidetask show={showNav} hide={setShowNav} />
    </div>
  );
};

export default Samplepage;
