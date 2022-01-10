import axios from "axios";
import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_GET_FAIL,
    USER_GET_SUCCESS,
    USER_GET_REQUEST,  } from "../constants/userConstants";

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

export const getusers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST,
        });

        const {
            userLogin:  {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.get(`/api/users/get`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    }   catch (error){
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};

export const getUserAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_GET_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_GET_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: USER_GET_FAIL,
            payload: message,
        });
    } 
}

export const updateUserAction = (id, first_name, last_name, email_address, password, confirm_password, profile_pic) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/${id}`,
            {
            first_name, 
            last_name, 
            email_address, 
            password, 
            confirm_password, 
            profile_pic
            },
            config
        );

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        });
    } 
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});
};