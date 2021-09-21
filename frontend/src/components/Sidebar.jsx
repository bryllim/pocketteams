import Notes from "./Notes";
import Profilecard from "./ProfileCard";
import Teamcard from "./TeamCard";

const Sidebar = () => {
  return (
    <div class="sidebar-wrapper">
      <Profilecard />
      <Teamcard />
      <Notes />
    </div>
  );
};
export default Sidebar;
