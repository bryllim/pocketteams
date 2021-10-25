import { 
    SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS,
    SECTION_ORDER_LIST_REQUEST,SECTION_ORDER_LIST_SUCCESS,SECTION_ORDER_LIST_FAIL
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
    dispatch({
        type: SECTION_LIST_SUCCESS,
        payload: data,
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









