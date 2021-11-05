import { 
    TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, 
    TASK_DELETE_REQUEST, TASK_DELETE_FAIL, TASK_DELETE_SUCCESS,
    TASK_UPDATE_REQUEST, TASK_UPDATE_FAIL, TASK_UPDATE_SUCCESS
} from "../constants/taskConstants"
import axios from "axios";

export const listTasks = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get(`/api/tasks`, config);

    dispatch({
        type: TASK_LIST_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: TASK_LIST_FAIL,
            payload: message,
        });
    }
}

export const deleteTask = ({sectionId,taskId,taskIndex}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_DELETE_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.put(
        `/api/tasks/${taskId}`,
        {sectionId,taskIndex}, 
        config
    );

    dispatch({
        type: TASK_DELETE_SUCCESS,
        payload: data,
    })

    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: TASK_DELETE_FAIL,
            payload: message,
        });
    }
}

export const updateTask = ({task_name,task_description,section_id}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_UPDATE_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.put(
        `/api/tasks/${section_id}`,
        {task_name,task_description}, 
        config
    );

    dispatch({
        type: TASK_UPDATE_SUCCESS,
        payload: data,
    })

    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: message,
        });
    }
}
 
