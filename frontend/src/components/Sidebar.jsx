import Notes from "./Notes";
import ProfileCard from "./Cards/ProfileCard";
import TeamCard from "./Cards/TeamCard";
import { useEffect, useState } from "react";
import AddTeam from "./Modals/AddTeamModal";
import { Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTeam } from "../actions/teamActions";
import ErrorMessage from "./ErrorMessage";
import Preload from "./Preload";

const Sidebar = () => {
  const [teamShow, setTeamShow] = useState(false);
  const handleTeamClose = () => setTeamShow(false);
  const handleTeamShow = () => setTeamShow(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const teamList = useSelector((state) => state.teamList);
  const {loading, teams, error} = teamList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    if(teamList)

    dispatch(listTeam());
  }, [dispatch,history,userInfo])

  return (
    <div className="d-flex flex-column sidebar-wrapper scrolling-wrapper-y h-100">
      <ProfileCard />
      { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      { loading && <Preload/> }
      <div className="team-section-wrapper sidebar-box d-flex flex-column scrolling-wrapper-y mb-30 p-2">
        { teams?.map((team) => (
          <TeamCard data={team}/>
        ))}
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
      </div>
      <AddTeam showModal={teamShow} hideModal={handleTeamClose} />
      {/* NOTES */}
        <Notes />
    </div>
  );
};
export default Sidebar;