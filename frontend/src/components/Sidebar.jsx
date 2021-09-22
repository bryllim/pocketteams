import Notes from "./Notes";
import ProfileCard from "./ProfileCard";
import TeamCard from "./TeamCard";

const Sidebar = () => {
  return (
    <div class="sidebar-wrapper">
      <ProfileCard />
      <TeamCard />
      <Notes />
    </div>
  );
};
export default Sidebar;
