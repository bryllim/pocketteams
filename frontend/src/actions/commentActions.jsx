import { 
    COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, COMMENT_LIST_FAIL, COMMENT_CREATE_FAIL, COMMENT_CREATE_SUCCESS, COMMENT_CREATE_REQUEST
} from "../constants/commentConstants"
import axios from "axios";

export const listComments = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: COMMENT_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get(`/api/comments/`, config);

    
    // console.log("data:", filteredData);

    dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: message,
        });
    }
}


export const createComments = ( task_id, Comment_context ) => async (dispatch, getState) => {
    try{
        dispatch({
            type: COMMENT_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/comments/create`, {Comment_context,task_id}, config);

    dispatch({
        type: COMMENT_CREATE_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: message,
        });
    }
}