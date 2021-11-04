import { TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS} from "../constants/taskConstants"
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
