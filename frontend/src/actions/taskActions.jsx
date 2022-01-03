import { 
    TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, 
    TASK_DELETE_REQUEST, TASK_DELETE_FAIL, TASK_DELETE_SUCCESS,
    TASK_UPDATE_REQUEST, TASK_UPDATE_FAIL, TASK_UPDATE_SUCCESS,
    TASK_CREATE_REQUEST, TASK_CREATE_FAIL, TASK_CREATE_SUCCESS
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

export const createTask = ({task_name,task_description,section_id,task_id,task_priority,isComplete}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_CREATE_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    const { data } = await axios.post(
        `/api/tasks/create`,
        {task_name, task_description, section_id, task_id,task_priority,isComplete}, 
        config
    );

    dispatch({
        type: TASK_CREATE_SUCCESS,
        payload: data,
    })

    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: TASK_CREATE_FAIL,
            payload: message,
        });
    }
}


export const deleteTask = ({taskId, task_index}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_DELETE_REQUEST,
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

        const { data } = await axios.delete(
            `/api/tasks/${taskId}`,
            config
        );

        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
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


export const updateTask = ({task_name,task_description,task_id}) => async (dispatch, getState) => {
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
        `/api/tasks/${task_id}`,
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

export const updateTaskDescription = ({task_description,task_id}) => async (dispatch, getState) => {
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
        `/api/tasks/update/description/${task_id}`,
        {task_description}, 
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

export const updateTaskPriority = ({task_priority,task_id}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_UPDATE_REQUEST,
        });
        console.log("update taskprio:", task_priority)
    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    const { data } = await axios.put(
        `/api/tasks/update/priority/${task_id}`,
        {task_priority}, 
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

export const updateTaskStatus = (task_id,markTask) => async (dispatch, getState) => {
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
        `/api/tasks/update/status/${task_id}`,
        {markTask}, 
        config
    );
        console.log("action",markTask,task_id)
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
