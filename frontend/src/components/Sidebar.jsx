import Notes from "./Notes";
import ProfileCard from "./Cards/ProfileCard";
import TeamCard from "./Cards/TeamCard";
import { useState } from "react";
import AddTeam from "./Modals/AddTeamModal";

const Sidebar = () => {
  const [teamShow, setTeamShow] = useState(false);
  const handleTeamClose = () => setTeamShow(false);
  const handleTeamShow = () => setTeamShow(true);

  return (
    <div className="d-flex flex-column sidebar-wrapper scrolling-wrapper-y h-100">
      <ProfileCard />
      <div className="team-section-wrapper sidebar-box d-flex flex-column scrolling-wrapper-y mb-30 p-2">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        {/* CREATE TEAM BUTTON */}
      </div>
      <div>
        <button
          type="button"
          className="theme-btn theme-btn-md mb-30"
          onClick={handleTeamShow}
        >
          Create New Team
        </button>
        <AddTeam showModal={teamShow} hideModal={handleTeamClose} />
      </div>
      {/* NOTES */}
        <Notes />
    </div>
  );
};
export default Sidebar;