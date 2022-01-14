import { 
    TEAM_CREATE_FAIL,
    TEAM_CREATE_REQUEST,
    TEAM_CREATE_SUCCESS,
    TEAM_LIST_FAIL,
    TEAM_LIST_REQUEST, 
    TEAM_LIST_SUCCESS,  
    TEAM_UPDATE_REQUEST, 
    TEAM_UPDATE_SUCCESS,
    TEAM_UPDATE_FAIL,
    TEAM_DELETE_REQUEST, 
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAIL, 
    TEAM_USER_DELETE_REQUEST, 
    TEAM_USER_DELETE_SUCCESS,
    TEAM_USER_DELETE_FAIL, 
    TEAM_ADDUSER_REQUEST,
    TEAM_ADDUSER_SUCCESS,
    TEAM_ADDUSER_FAIL,
    TEAM_ADDPROJECT_REQUEST,
    TEAM_ADDPROJECT_SUCCESS,
    TEAM_ADDPROJECT_FAIL,
    TEAM_PROJECT_DELETE_REQUEST,
    TEAM_PROJECT_DELETE_SUCCESS,
    TEAM_PROJECT_DELETE_FAIL} from "../constants/teamConstants";

export const teamtListReducer = (state = {teams: []}, action) => {
    switch (action.type){
        case TEAM_LIST_REQUEST:
            return { loading: true };
        case TEAM_LIST_SUCCESS:
            return { loading: false, teams: action.payload};
        case TEAM_LIST_FAIL:
            return { loading: false, error: action.payload};
        
        default:
            return state;
    }
};

export const teamCreateReducer = (state = {}, action) => {
    switch (action.type){
        case TEAM_CREATE_REQUEST:
            return { loading: true };
        case TEAM_CREATE_SUCCESS:
            return { loading: false, teams: action.payload};
        case TEAM_CREATE_FAIL:
            return { loading: false, error: action.payload};
        
        default:
            return state;
    }
};

export const teamUpdateReducer = (state = {}, action) => {
    switch (action.type){
        case TEAM_UPDATE_REQUEST:
            return { loading: true };
        case TEAM_UPDATE_SUCCESS:
            return { loading: false, teams: action.payload, success: true};
        case TEAM_UPDATE_FAIL:
            return { loading: false, error: action.payload , success: false};
        
        default:
            return state;
    }
};

export const teamUserDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case TEAM_USER_DELETE_REQUEST:
            return { loading: true };
        case TEAM_USER_DELETE_SUCCESS:
            return { loading: false, data: action.payload, success: true};
        case TEAM_USER_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false};
        default:
            return state;
    }
};

export const teamProjectDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case TEAM_PROJECT_DELETE_REQUEST:
            return { loading: true };
        case TEAM_PROJECT_DELETE_SUCCESS:
            return { loading: false, userlist: action.payload ,success: true};
        case TEAM_PROJECT_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false};
        default:
            return state;
    }
};

export const teamAddUserReducer = (state = {teams: []}, action) => {
    switch (action.type){
        case TEAM_ADDUSER_REQUEST:
            return { loading: true };
        case TEAM_ADDUSER_SUCCESS:
            return { loading: false, teams: action.payload, success: true};
        case TEAM_ADDUSER_FAIL:
            return { loading: false, error: action.payload, success: false};
        default:
            return state;
    }
};

export const teamAddProjectReducer = (state = {teams: []}, action) => {
    switch (action.type){
        case TEAM_ADDPROJECT_REQUEST:
            return { loading: true };
        case TEAM_ADDPROJECT_SUCCESS:
            return { loading: false, teams: action.payload};
        case TEAM_ADDPROJECT_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const teamDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TEAM_DELETE_REQUEST:
        return { loading: true };
      case TEAM_DELETE_SUCCESS:
        return { loading: false, success: true , teams: action.payload};
      case TEAM_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };