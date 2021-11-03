import { NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_CREATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL } from "../constants/notesConstants";


export const noteListReducer = (state = {note: []}, action) => {
    switch (action.type) {
        case NOTE_LIST_REQUEST:
            return { loading:true }
        case NOTE_LIST_SUCCESS:
            return { loading:false, notes:action.payload }
        case NOTE_LIST_FAIL:
            return { loading:false, error:action.payload }

    default:
     return state;
    }
};

export const noteCreateReducer = (state = [], action) => {
    switch (action.type) {
        case NOTE_CREATE_REQUEST:
            return { loading:true }
        case NOTE_CREATE_SUCCESS:
            return { loading:false, notes:action.payload }
        case NOTE_CREATE_FAIL:
            return { loading:false, error:action.payload }

    default:
     return state;
    }
};

export const noteUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTE_UPDATE_REQUEST:
            return { loading:true }
        case NOTE_UPDATE_SUCCESS:
            return { loading:false, notes:action.payload }
        case NOTE_UPDATE_FAIL:
            return { loading:false, error:action.payload }

    default:
     return state;
    }
};