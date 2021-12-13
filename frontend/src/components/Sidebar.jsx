import Notes from "./Notes";
import ProfileCard from "./Cards/ProfileCard";
import TeamCard from "./Cards/TeamCard";
import { useEffect, useState } from "react";
import AddTeam from "./Modals/AddTeamModal";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTeam } from "../actions/teamActions";
import ErrorMessage from "./ErrorMessage";
import Preload from "./Preload";
import { toast } from "react-toastify";

const Sidebar = () => {

  const [teamData, setTeamData] = useState(null);

  const [teamShow, setTeamShow] = useState(false);
  const handleTeamClose = () => setTeamShow(false);
  const handleTeamShow = () => setTeamShow(true);

  const history = useHistory();
  const dispatch = useDispatch();

  // USE SELECTORS

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const teamList = useSelector((state) => state.teamList);
  const {loading, teams ,error} = teamList;

  const teamCreate = useSelector((state) => state.teamCreate);
  const {loading: createTeamLoading, teams: newTeamData} = teamCreate;

  const teamDelete = useSelector((state) => state.teamDelete);
  const { success: successDeleteTeam, data: deleteTeamId} = teamDelete;

  //NOTIFICATIONS

  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const notifySuccess = (msg) =>
    toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  //USE EFFECTS

  useEffect(() => {
    dispatch(listTeam());
  }, [dispatch,history,userInfo])

  // Loading Teams
  useEffect(() => {
    if(loading === false && teams.length > 0){
      setTeamData(teams);
    }
  },[loading, teams])

  //Creating Teams
  useEffect(() => {
    if( createTeamLoading === false && newTeamData){
      if(!teamData){
        setTeamData([newTeamData]);
      } 
      else {
        const newTeams = [...teamData];
        newTeams.push(newTeamData);
        setTeamData(newTeams);
      }
      notifySuccess("Team Created");
    } 
  }, [createTeamLoading, newTeamData])

  //Deleting Teams
  useEffect(() => {
    if(successDeleteTeam === true)
    {
      const newTeams = [...teamData]
      const index = newTeams.findIndex(teams => teams._id === deleteTeamId)
      newTeams.splice(index,1)
      setTeamData(newTeams)
      notifyInfo("Team Delete");
    }
  }, [successDeleteTeam, deleteTeamId])

  return (
    <div className="d-flex flex-column sidebar-wrapper scrolling-wrapper-y h-100">
      <ProfileCard />
      { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      <div className="team-section-wrapper sidebar-box d-flex flex-column scrolling-wrapper-y mb-30 p-2">
        { teamData?.map((team) => (
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