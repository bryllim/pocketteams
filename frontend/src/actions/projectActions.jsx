import { PROJECT_CREATE_FAIL, 
    PROJECT_CREATE_REQUEST, 
    PROJECT_CREATE_SUCCESS, 
    PROJECT_LIST_FAIL, 
    PROJECT_LIST_REQUEST, 
    PROJECT_LIST_SUCCESS, 
    PROJECT_UPDATE_FAIL, 
    PROJECT_UPDATE_REQUEST, 
    PROJECT_UPDATE_SUCCESS,
    PROJECT_DELETE_FAIL, 
    PROJECT_DELETE_REQUEST, 
    PROJECT_DELETE_SUCCESS
 } from "../constants/projectConstants"
import axios from "axios";

export const listProjects = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: PROJECT_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get(`/api/projects`, config);

    dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: message,
        });
    }
}

export const createProjectAction = (project_name, project_description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_CREATE_REQUEST,
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
            `api/projects/create`,
            {project_name,project_description},
            config
        );

        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error){
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({
                type: PROJECT_CREATE_FAIL,
                payload: message,
            });
    }
};

export const updateProjectAction = (id, project_name, project_description) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PROJECT_UPDATE_REQUEST,
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
            `/api/projects/${id}`,
            {project_name, project_description}, 
            config
        );

        dispatch({
            type: PROJECT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: PROJECT_UPDATE_FAIL,
            payload: message,
        });
    } 
}

export const deleteProjectAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/projects/${id}`, config);
  
      dispatch({
        type: PROJECT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECT_DELETE_FAIL,
        payload: message,
      });
    }
  };