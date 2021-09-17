import React, { useState } from "react";
// import Navigation from "../components/Navigation";
import Sidetask from "../components/Sidetask";

const Samplepage = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      {/* <Navigation /> */}
      <header>
        <button onClick={() => setShowNav(!showNav)} className="theme-btn my-2">
          Edit Task
        </button>
      </header>
      <div>
        <Sidetask show={showNav} hide={setShowNav} />
      </div>
    </div>
  );
};

export default Samplepage;
