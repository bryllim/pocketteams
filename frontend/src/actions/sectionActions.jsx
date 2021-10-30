import { 
    SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS,
    SECTION_ORDER_LIST_SUCCESS,SECTION_ORDER_LIST_FAIL,
    SECTION_UPDATE_REQUEST,SECTION_UPDATE_SUCCESS,SECTION_UPDATE_FAIL,
    SECTION_ORDER_UPDATE_REQUEST, SECTION_ORDER_UPDATE_SUCCESS, SECTION_ORDER_UPDATE_FAIL
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

    // const { data } = await axios.get(`/api/sections`, config);

    const {data:projectData} = await axios.get(`/api/sectionorder/6179228d94d94e1c2c6c21e3`, config)

    if(!projectData){
        throw new Error("Error");
    }
    
    const sectionOrderList = projectData.items.map(order =>{
        return order._id
    })

    const sectionDataList = projectData.items
    const sectionOrderId = projectData._id
    dispatch({
        type: SECTION_LIST_SUCCESS,
        payload: {sectionOrderList,sectionDataList,sectionOrderId,}
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

export const updateSectionOrder =({sectionId,sourceDragIndex,destinationDragIndex,sectionOrderId}) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SECTION_ORDER_UPDATE_REQUEST,
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
        `/api/sectionorder/${sectionOrderId}`,
        {sourceDragIndex,destinationDragIndex,sectionId}, 
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






