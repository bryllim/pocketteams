import { 
    WAITLIST_CREATE_FAIL,
    WAITLIST_CREATE_REQUEST,
    WAITLIST_CREATE_SUCCESS,
     } from "../constants/waitlistConstants";

export const joinWaitingListReducer = (state = {}, action) => {
    switch (action.type){
        case WAITLIST_CREATE_REQUEST:
            return { loading: true };
        case WAITLIST_CREATE_SUCCESS:
            return { loading: false, projects: action.payload};
        case WAITLIST_CREATE_FAIL:
            return { loading: false, error: action.payload};
        
        default:
            return state;
    }
};