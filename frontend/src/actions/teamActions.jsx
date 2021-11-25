import { 
    TEAM_CREATE_FAIL, 
    TEAM_CREATE_REQUEST, 
    TEAM_CREATE_SUCCESS, 
    TEAM_LIST_FAIL, 
    TEAM_LIST_REQUEST, 
    TEAM_LIST_SUCCESS, 
    TEAM_UPDATE_FAIL, 
    TEAM_UPDATE_REQUEST, 
    TEAM_UPDATE_SUCCESS,
    TEAM_DELETE_FAIL, 
    TEAM_DELETE_REQUEST, 
    TEAM_DELETE_SUCCESS,
    TEAM_USER_DELETE_FAIL, 
    TEAM_USER_DELETE_REQUEST, 
    TEAM_USER_DELETE_SUCCESS,
    TEAM_ADDUSER_REQUEST,
    TEAM_ADDUSER_SUCCESS,
    TEAM_ADDUSER_FAIL
 } from "../constants/teamConstants"
import axios from "axios";

export const listTeam = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEAM_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get(`/api/teams`, config);

    dispatch({
        type: TEAM_LIST_SUCCESS,
        payload: data.reverse(),
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: TEAM_LIST_FAIL,
            payload: message,
        });
    }
}

export const createTeamAction = (team_name, team_description, team_access, owner, users) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEAM_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `api/teams/create`,
            {team_name,team_description,team_access,owner, users},
            config
        );

        dispatch({
            type: TEAM_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error){
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({
                type: TEAM_CREATE_FAIL,
                payload: message,
            });
    }
};

export const updateTeamAction = (id, team_name, team_description, team_access) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEAM_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/teams/${id}`,
            {team_name, team_description, team_access}, 
            config
        );

        dispatch({
            type: TEAM_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: TEAM_UPDATE_FAIL,
            payload: message,
        });
    } 
}

export const deleteTeamAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEAM_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/teams/${id}`, config);
  
      dispatch({
        type: TEAM_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TEAM_DELETE_FAIL,
        payload: message,
      });
    }
  };

  export const deleteTeamUserAction = (id, user_id) => async (dispatch, getState) => {
    try {
        dispatch({
          type: TEAM_USER_DELETE_REQUEST,
        });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
    
        const { data } = await axios.delete(`/api/teams/deleteusers/${id}`, {user_id}, config);
    
        dispatch({
          type: TEAM_USER_DELETE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: TEAM_USER_DELETE_FAIL,
          payload: message,
        });
      }
  };

export const updateTeamUser = (id, user_id) => async(dispatch,getState) => {
    try{
        dispatch({
            type: TEAM_ADDUSER_REQUEST,
        });

        const {
            userLogin: { userInfo },
          } = getState();
      
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        const { data } = await axios.put(
            `/api/teams/addusers/${id}`,
            {user_id}, 
            config
        );

        dispatch({
            type: TEAM_ADDUSER_SUCCESS,
            payload: data,
          });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: TEAM_ADDUSER_FAIL,
            payload: message,
        });
    } 
}