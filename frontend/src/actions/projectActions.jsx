import { PROJECT_CREATE_FAIL, PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS, PROJECT_LIST_FAIL, PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS } from "../constants/projectConstants"
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

export const createProjectAction = (project_name, project_description, project_status) => async (dispatch, getState) => {
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
            {project_name,project_description,project_status},
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