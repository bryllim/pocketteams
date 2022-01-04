import Notes from "./Notes";
import ProfileCard from "./Cards/ProfileCard";
import TeamCard from "./Cards/TeamCard";
import { useEffect, useState } from "react";
import AddTeam from "./Modals/AddTeamModal";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTeam, updateTeamAction } from "../actions/teamActions";
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
  const { userInfo } = userLogin;

  const teamList = useSelector((state) => state.teamList);
  const { loading, teams, error } = teamList;

  const teamCreate = useSelector((state) => state.teamCreate);
  const { loading: createTeamLoading, teams: newTeamData } = teamCreate;

  const teamUpdate = useSelector((state) => state.teamUpdate);
  const {
    loading: updateTeamLoading,
    teams: updatedTeam,
    success: successUpdateTeam,
  } = teamUpdate;

  const teamDelete = useSelector((state) => state.teamDelete);
  const { success: successDeleteTeam, data: deleteTeamId } = teamDelete;

  const teamAddUser = useSelector((state) => state.teamAddUser);
  const {
    loading: addUserLoading,
    teams: addUserTeam,
    success: successAddUser,
  } = teamAddUser;

  const teamUserDelete = useSelector((state) => state.teamUserDelete);
  const { success: successDeleteUser, data: deleteUserData } = teamUserDelete;

  //NOTIFICATIONS
  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  //USE EFFECTS

  useEffect(() => {
    dispatch(listTeam());
  }, [dispatch, history, userInfo]);

  // Loading Teams
  useEffect(() => {
    if (loading === false && teams) {
      setTeamData(teams);
    }
  }, [loading, teams]);

  //Creating Teams
  useEffect(() => {
    if (createTeamLoading === false && newTeamData) {
      if (!teamData) {
        setTeamData([newTeamData]);
      } else {
        const newTeams = [...teamData];
        newTeams.push(newTeamData);
        setTeamData(newTeams);
      }
    }
  }, [createTeamLoading, newTeamData]);

  //Adding Users to team
  useEffect(() => {
    if (addUserLoading === false && successAddUser === true && addUserTeam) {
      const newTeam = [...teamData];
      const index = newTeam.findIndex((teams) => teams._id === addUserTeam._id);
      newTeam.splice(index, 1, addUserTeam);
      setTeamData(newTeam);
    }
  }, [teams, addUserTeam, successAddUser, addUserLoading]);

  //Updating Teams
  useEffect(() => {
    if (
      updateTeamLoading === false &&
      successUpdateTeam === true &&
      updatedTeam
    ) {
      const newTeam = [...teamData];
      const index = newTeam.findIndex((teams) => teams._id === updatedTeam._id);
      newTeam.splice(index, 1, updatedTeam);
      setTeamData(newTeam);
    }
  }, [teams, updatedTeam, successUpdateTeam, updateTeamLoading]);

  //User Delete
  useEffect(() => {
    if (successDeleteUser === true && deleteUserData) {
      const newUsers = [...teamData];
      const index = newUsers.findIndex(
        (teams) => teams._id === deleteUserData._id
      );
      newUsers.splice(index, 1, deleteUserData);
      setTeamData(newUsers);
    }
  }, [successDeleteUser, deleteUserData]);

  // //Deleting Teams
  // useEffect(() => {
  //   if(successDeleteTeam === true && deleteTeamId)
  //   {
  //     const newTeams = [...teamData]
  //     const index = newTeams.findIndex(teams => teams._id === deleteTeamId)
  //     newTeams.splice(index,1)
  //     setTeamData(newTeams)
  //   }
  // }, [successDeleteTeam, deleteTeamId])

  return (
    <div className="d-flex flex-column sidebar-wrapper scrolling-wrapper-y h-100">
      <ProfileCard />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div className="team-section-wrapper sidebar-box d-flex flex-column scrolling-wrapper-y mb-30 p-2">
        {teamData ? (
          teamData?.map((team) => <TeamCard data={team} />)
        ) : (
          <p className="m-4">You currently don't have any teams.</p>
        )}
        {/* CREATE TEAM BUTTON */}
      </div>
      <div className="ms-4">
        <button
          type="button"
          className="theme-btn theme-btn-md mb-30"
          onClick={handleTeamShow}
        >
          <small><i className="lni lni-plus me-3"></i></small> New team
        </button>
      </div>
      <AddTeam showModal={teamShow} hideModal={handleTeamClose} />
      {/* NOTES */}
      <Notes />
    </div>
  );
};
export default Sidebar;
