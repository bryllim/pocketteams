import Notes from "./Notes";
import ProfileCard from "./ProfileCard";
import TeamCard from "./TeamCard";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <ProfileCard />
      <TeamCard />
      <Notes />
    </div>
  );
};
export default Sidebar;
