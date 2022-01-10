import { WAITLIST_CREATE_FAIL, 
    WAITLIST_CREATE_REQUEST, 
    WAITLIST_CREATE_SUCCESS, 
 } from "../constants/waitlistConstants"
import axios from "axios";

export const joinWaitlistAction = (name, email) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WAITLIST_CREATE_REQUEST,
        });

        // const {
        //     userLogin: { userInfo },
        // } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `api/waitlists/create`,
            {name,email},
            config
        );

        dispatch({
            type: WAITLIST_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error){
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message;
            dispatch({
                type: WAITLIST_CREATE_FAIL,
                payload: message,
            });
    }
};