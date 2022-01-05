import {SUBTASK_LIST_REQUEST, SUBTASK_LIST_SUCCESS, SUBTASK_LIST_FAIL, SUBTASK_CREATE_REQUEST, SUBTASK_CREATE_SUCCESS, SUBTASK_CREATE_FAIL, SUBTASK_UPDATE_FAIL, SUBTASK_UPDATE_REQUEST,SUBTASK_UPDATE_SUCCESS, SUBTASK_DELETE_REQUEST, SUBTASK_DELETE_SUCCESS, SUBTASK_DELETE_FAIL } from "../constants/subtaskConstants";

export const subtaskListReducer = (state = { subtask: [] }, action) => {
    switch (action.type) {
        case SUBTASK_LIST_REQUEST:
            return { loading: true };
        case SUBTASK_LIST_SUCCESS:
            return { loading: false, subtasks: action.payload };
        case SUBTASK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const subtaskCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBTASK_CREATE_REQUEST:
            return { loading: true };
        case SUBTASK_CREATE_SUCCESS:
            return { loading: false, successCreateSubtask: action.payload };
        case SUBTASK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const subtaskUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBTASK_UPDATE_REQUEST:
            return { loading: true };
        case SUBTASK_UPDATE_SUCCESS:
            return { loading: false, successUpdateSubtask: action.payload };
        case SUBTASK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const subtaskDeleteReducer = (state = {subtask: []}, action) => {
    switch (action.type) {
        case SUBTASK_DELETE_REQUEST:
            return { loading: true };
        case SUBTASK_DELETE_SUCCESS:
            return { loading: false, successDeleteSubtask: action.payload };
        case SUBTASK_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};