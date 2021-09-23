import Notes from "./Notes";
import ProfileCard from "./ProfileCard";
import Teamcard from "./TeamCard";

const Sidebar = () => {
  return (
    <div class="sidebar-wrapper">
      <ProfileCard />
      <Teamcard />
      <Notes />
    </div>
  );
};
export default Sidebar;
