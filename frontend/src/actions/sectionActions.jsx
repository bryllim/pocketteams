import { 
    SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS,
    SECTION_ORDER_LIST_REQUEST,SECTION_ORDER_LIST_SUCCESS,SECTION_ORDER_LIST_FAIL,
    SECTION_UPDATE_REQUEST,SECTION_UPDATE_SUCCESS,SECTION_UPDATE_FAIL
} from "../constants/sectionConstants"
import axios from "axios";

export const listSection = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/sections`, config);

    const sectionOrder = await axios.get(`/api/sectionorder/6179228d94d94e1c2c6c21e3`, config).data.items;
    if(!sectionOrder){
        throw new Error("Error");
    }

   

    // data.map(item=>{
    //     return sectionOrder.push(item._id)
    // })

    dispatch({
        type: SECTION_LIST_SUCCESS,
        payload: {data,sectionOrder}
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

export const sectionOrderList = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_ORDER_LIST_REQUEST,
        });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    // const { data } = await axios.get(`/api/columns/s`, config);
    const data = ['col1', 'col2']

    dispatch({
        type: SECTION_ORDER_LIST_SUCCESS,
        payload: data,
    })
    } catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: SECTION_ORDER_LIST_FAIL,
            payload: message,
        });
    }
}


export const updateSection = ({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}) => async (dispatch, getState) => {
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

        const { data } = await axios.put(
            `/api/sections/tasks/${taskId}`,
            {sourceSectionId, destinationSectionId,sourceDragindex,destinationDragindex,type}, 
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






