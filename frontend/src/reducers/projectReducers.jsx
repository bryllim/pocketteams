import { 
    PROJECT_CREATE_FAIL,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_LIST_REQUEST, 
    PROJECT_LIST_SUCCESS,  
    PROJECT_UPDATE_REQUEST, 
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAIL,
    PROJECT_DELETE_REQUEST, 
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL } from "../constants/projectConstants";

export const projectListReducer = (state = {projects: []}, action) => {
    switch (action.type){
        case PROJECT_LIST_REQUEST:
            return { loading: true };
        case PROJECT_LIST_SUCCESS:
            return { loading: false, projects: action.payload};
        case PROJECT_LIST_FAIL:
            return { loading: false, error: action.payload};
        
        default:
            return state;
    }
};

export const projectCreateReducer = (state = {}, action) => {
    switch (action.type){
        case PROJECT_CREATE_REQUEST:
            return { loading: true };
        case PROJECT_CREATE_SUCCESS:
            return { loading: false, projects: action.payload};
        case PROJECT_CREATE_FAIL:
            return { loading: false, error: action.payload};
        
        default:
            return state;
    }
};

export const projectUpdateReducer = (state = {}, action) => {
    switch (action.type){
        case PROJECT_UPDATE_REQUEST:
            return { loading: true };
        case PROJECT_UPDATE_SUCCESS:
            return { loading: false, data: action.payload, success: true};
        case PROJECT_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false};
        
        default:
            return state;
    }
};

export const projectDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PROJECT_DELETE_REQUEST:
        return { loading: true };
      case PROJECT_DELETE_SUCCESS:
        return { loading: false, success: true, data: action.payload };
      case PROJECT_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };