import axios from "axios";
import { NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_CREATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL} from "../constants/notesConstants";

export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTE_LIST_REQUEST,
        });

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/note`, config);

        dispatch({
            type: NOTE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch ({
            type: NOTE_LIST_FAIL,
            payload: message,
        });
    }
}

export const createNoteAction =  ( content ) => 
    async (dispatch, getState) => {
        try {
            dispatch({
                type: NOTE_CREATE_REQUEST,
            });
        
        const {
            userLogin: {userInfo},
             } = getState();

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/note`, {content}, config);

        dispatch({
            type: NOTE_CREATE_SUCCESS,
            payload: data, 
        });
        } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch ({
            type: NOTE_CREATE_FAIL,
            payload: message,
        });
    }
}

export const updateNoteAction =  ( id, content ) => 
    async (dispatch, getState) => {
        try {
            dispatch({
                type: NOTE_UPDATE_REQUEST,
            });
        
        const {
            userLogin: {userInfo},
             } = getState();

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.put(
            `/api/note/${id}`, 
            {content} ,
             config
        );
        

        dispatch({
            type: NOTE_UPDATE_SUCCESS,
            payload: data, 
        });
        } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch ({
            type: NOTE_UPDATE_FAIL,
            payload: message,
        });
    }
}