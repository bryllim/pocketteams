import React from "react";
import Profilecard from "./Profilecard";
import Teamcard from "./Teamcard";
import Button from "./Button";
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper" >
      <Profilecard />
      <Teamcard />
      <Button />
    </div>
  );
};

export default Sidebar;
