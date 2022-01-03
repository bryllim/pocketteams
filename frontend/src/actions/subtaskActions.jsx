import {SUBTASK_LIST_REQUEST, SUBTASK_LIST_SUCCESS, SUBTASK_LIST_FAIL, SUBTASK_CREATE_REQUEST, SUBTASK_CREATE_SUCCESS, SUBTASK_CREATE_FAIL, SUBTASK_UPDATE_FAIL, SUBTASK_UPDATE_REQUEST,SUBTASK_UPDATE_SUCCESS, SUBTASK_DELETE_REQUEST, SUBTASK_DELETE_SUCCESS, SUBTASK_DELETE_FAIL } from "../constants/subtaskConstants";
import axios from "axios";

export const listSubtasks = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SUBTASK_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get(`/api/subtasks/`, config);

    dispatch({
        type: SUBTASK_LIST_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SUBTASK_LIST_FAIL,
            payload: message,
        });
    }
}

export const createSubtask = ( subtask_content,task_id ) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SUBTASK_CREATE_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.post(`/api/subtasks/create/`, {subtask_content, task_id}, config);

    dispatch({
        type: SUBTASK_CREATE_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SUBTASK_CREATE_FAIL,
            payload: message,
        });
    }
}

export const updateSubtask = ( id, subtask_content, task_id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SUBTASK_UPDATE_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.put(`/api/subtasks/update/${id}`, {subtask_content,task_id}, config);

    dispatch({
        type: SUBTASK_UPDATE_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SUBTASK_UPDATE_FAIL,
            payload: message,
        });
    }
}

export const subtask_updateTaskStatus = (subtask_id,markTask) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SUBTASK_UPDATE_REQUEST,
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
        `/api/subtasks/update/status/${subtask_id}`,
        {markTask}, 
        config
    );
        console.log("action",markTask,subtask_id)
    dispatch({
        type: SUBTASK_UPDATE_SUCCESS,
        payload: data,
    })

    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SUBTASK_UPDATE_FAIL,
            payload: message,
        });
    }
}

export const deleteSubtask = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SUBTASK_DELETE_REQUEST,
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
            `/api/subtasks/delete/${id}`,
            config
        );

        dispatch({
            type: SUBTASK_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: SUBTASK_DELETE_FAIL,
            payload: message,
        });
    }
}