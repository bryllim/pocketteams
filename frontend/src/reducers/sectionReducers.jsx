import { 
    SECTION_LIST_FAIL, SECTION_LIST_REQUEST, SECTION_LIST_SUCCESS,
    SECTION_ORDER_LIST_REQUEST,SECTION_ORDER_LIST_SUCCESS,SECTION_ORDER_LIST_FAIL,
    SECTION_UPDATE_REQUEST,SECTION_UPDATE_SUCCESS,SECTION_UPDATE_FAIL,
    SECTION_TASK_UPDATE_REQUEST,SECTION_TASK_UPDATE_SUCCESS,SECTION_TASK_UPDATE_FAIL,
    SECTION_ORDER_UPDATE_REQUEST, SECTION_ORDER_UPDATE_SUCCESS, SECTION_ORDER_UPDATE_FAIL
} from "../constants/sectionConstants"

export const sectionListReducer = (state = {data: []}, action) => {
    switch (action.type){
        case SECTION_LIST_REQUEST:
            return { loading: true, data: []};
        case SECTION_LIST_SUCCESS:
            return { loading: false, data: action.payload};
        case SECTION_LIST_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const sectionOrderListReducer = (state = {order: []}, action) => {
    switch (action.type){
        case SECTION_ORDER_LIST_REQUEST:
            return { loading: true };
        case SECTION_ORDER_LIST_SUCCESS:
            return { loading: false, order: action.payload};
        case SECTION_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const sectionUpdateTaskReducer = (state = {order: []}, action) => {
    switch (action.type){
        case SECTION_TASK_UPDATE_REQUEST:
            return { loading: true };
        case SECTION_TASK_UPDATE_SUCCESS:
            return { loading: false, order: action.payload};
        case SECTION_TASK_UPDATE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const sectionUpdateReducer = (state = {order: []}, action) => {
    switch (action.type){
        case SECTION_UPDATE_REQUEST:
            return { loading: true };
        case SECTION_UPDATE_SUCCESS:
            return { loading: false, order: action.payload};
        case SECTION_UPDATE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const SectionOrderUpdateReducer = (state = {order: []}, action) => {
    switch (action.type){
        case SECTION_ORDER_UPDATE_REQUEST:
            return { loading: true };
        case SECTION_ORDER_UPDATE_SUCCESS:
            return { loading: false, order: action.payload};
        case SECTION_ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

