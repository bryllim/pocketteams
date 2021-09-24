import Notes from "./Notes";
import ProfileCard from "./Cards/ProfileCard";
import TeamCard from "./Cards/TeamCard";

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
