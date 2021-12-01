import { 
    SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS,
    SECTION_UPDATE_REQUEST,SECTION_UPDATE_SUCCESS,SECTION_UPDATE_FAIL,
    SECTION_ORDER_UPDATE_REQUEST, SECTION_ORDER_UPDATE_SUCCESS, SECTION_ORDER_UPDATE_FAIL,
    SECTION_TASK_UPDATE_REQUEST,SECTION_TASK_UPDATE_SUCCESS,SECTION_TASK_UPDATE_FAIL,
    SECTION_CREATE_REQUEST,SECTION_CREATE_SUCCESS,SECTION_CREATE_FAIL,
    SECTION_DELETE_REQUEST,SECTION_DELETE_SUCCESS,SECTION_DELETE_FAIL,
} from "../constants/sectionConstants"
import axios from "axios";

export const listSectionByProjectId = ({project_id}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    const {data} = await axios.get(`/api/sections/project/${project_id}`, config)

    dispatch({
        type: SECTION_LIST_SUCCESS,
        payload: data
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SECTION_LIST_FAIL,
            payload: message,
        });
    }
}

export const updateSectionOrder =({sourceDragIndex,destinationDragIndex,project_id}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_ORDER_UPDATE_REQUEST,
        });
        console.log(sourceDragIndex,destinationDragIndex,project_id)
    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    
    const { data } = await axios.put(
        `/api/projects/sectionorder/${project_id}`,
        {sourceDragIndex,destinationDragIndex}, 
        config
    );


    dispatch({
        type: SECTION_ORDER_UPDATE_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SECTION_ORDER_UPDATE_FAIL,
            payload: message,
        });
    }
}


export const updateSectionTask = ({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_TASK_UPDATE_REQUEST,
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
            `/api/sections/tasks/${taskId}`,
            {sourceSectionId, destinationSectionId,sourceDragindex,destinationDragindex,type}, 
            config
        );

        dispatch({
            type: SECTION_TASK_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: SECTION_TASK_UPDATE_FAIL,
            payload: message,
        });
    }
    
}


export const updateSection = ({params, sectionId}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_UPDATE_REQUEST,
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

        const { data } = await axios.patch(
            `/api/sections/${sectionId}`,
            params, 
            config
        );

        dispatch({
            type: SECTION_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: SECTION_UPDATE_FAIL,
            payload: message,
        });
    }
}

export const createSection = (newSection) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_CREATE_REQUEST,
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
            `/api/sections/create`,
            {newSection}, 
            config
        );

        dispatch({
            type: SECTION_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: SECTION_CREATE_FAIL,
            payload: message,
        });
    }
}


export const deleteSection = ({section_id}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_DELETE_REQUEST,
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
            `/api/sections/${section_id}`,
            config
        );

        dispatch({
            type: SECTION_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: SECTION_DELETE_FAIL,
            payload: message,
        });
    }
}
    




