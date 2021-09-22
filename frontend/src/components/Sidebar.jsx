import Notes from "./Notes";
import Profilecard from "./Profilecard";
import Teamcard from "./Teamcard";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <Profilecard />
      <Teamcard />
      <Notes />
    </div>
  );
};
export default Sidebar;
