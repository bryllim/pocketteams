import axios from "axios";
import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const login = (email_address, password) => async (dispatch) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post('/api/users/login',
            {
                email_address,
                password
            },
            config
        );
        
        dispatch({type: USER_LOGIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const register = (first_name, last_name, email_address, password, profile_picture) => async (dispatch) => {
    try{
        (dispatch({type: USER_REGISTER_REQUEST}));

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {data} = await axios.post("/api/users",
        {first_name, last_name, email_address, password, profile_picture}, 
        config);

        (dispatch({type: USER_REGISTER_SUCCESS, payload: data}));
        (dispatch({type: USER_LOGIN_SUCCESS, payload: data}));
        localStorage.setItem("userInfo", JSON.stringify(data));
        
    } catch (error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});
};