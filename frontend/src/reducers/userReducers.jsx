import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state={}, action) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST: 
            return {loading:true};
        case USER_LOGIN_SUCCESS:  //Takes the userinfo payload if the user login is a success
            return {loading:false, userInfo:action.payload};
        case USER_LOGIN_FAIL: //Takes the userinfo error if the user login is failed
            return {loading:false, error:action.payload};
        case USER_LOGOUT: 
            return {loading:true};
        default:
            return state;
    }
}

export const userRegisterReducer = (state={}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST: 
            return {loading:true};
        case USER_REGISTER_SUCCESS:  //Takes the userinfo payload if the user login is a success
            return {loading:false, userInfo:action.payload};
        case USER_REGISTER_FAIL: //Takes the userinfo error if the user login is failed
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}