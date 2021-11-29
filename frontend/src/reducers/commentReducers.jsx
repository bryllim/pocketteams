import {COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, COMMENT_LIST_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_CREATE_FAIL, COMMENT_UPDATE_FAIL, COMMENT_UPDATE_REQUEST,COMMENT_UPDATE_SUCCESS } from "../constants/commentConstants";

export const commentListReducer = (state = { comment: [] }, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return { loading: true };
        case COMMENT_LIST_SUCCESS:
            return { loading: false, comments: action.payload };
        case COMMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true };
        case COMMENT_CREATE_SUCCESS:
            return { loading: false, successCreateComment: action.payload };
        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const commentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_UPDATE_REQUEST:
            return { loading: true };
        case COMMENT_UPDATE_SUCCESS:
            return { loading: false, successUpdateComment: action.payload };
        case COMMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};