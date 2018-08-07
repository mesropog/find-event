import {SET_USER_LOCATION, SET_USER_LOCALITY, SIGN_USER_IN, SET_AUTH_ERROR, SIGN_USER_OUT, CLICK_NAVBAR} from './types';
import {setError} from './events'
import ENV from '../../ENV';

import axios from 'axios';

export const setUserLocation = location => ({
    type : SET_USER_LOCATION,
    location
});

export const signUserOut = () => {
    localStorage.removeItem('token');
    return {
        type : SIGN_USER_OUT,
    }
};

export const toggleNavbar = () => ({
    type : CLICK_NAVBAR
});

export const getUsersLocality = coord => dispatch => {
    let URL = `${ENV.googleAPI.rootURL}?latlng=${coord.latitude},${coord.longitude}&result_type=locality&key=${ENV.googleAPI.keyAPI}`;
    return axios.get(URL)
        .then(resp => {
            //console.log(resp);
            dispatch({type : SET_USER_LOCALITY, locality: resp.data.results[0].formatted_address})
        })
        .catch(err => dispatch(setError(err)));
};

export const signUserIn = (email, password) => dispatch => {
    return axios.post(`${ENV.backendServer.rootUrl}/signin`, { email, password })
        .then(resp => {
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.token);
                dispatch({
                    type : SIGN_USER_IN,
                    jwtToken : resp.data.token
                })
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch({
                    type  : SET_AUTH_ERROR,
                    error : 'Wrong combination of email and password'
                })
            } else {
                dispatch({
                    type  : SET_AUTH_ERROR,
                    error : 'Ooops! Something went wrong, please try again'
                })
            }
        });
};

export const signUserUp = ({email, password}) => dispatch =>  {
    return axios.post(`${ENV.backendServer.rootUrl}/signup`, {email, password})
        .then(resp => {
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.token);
                dispatch({
                    type : SIGN_USER_IN,
                    jwtToken : resp.data.token
                })
            }
        })
        .catch(err => {
            if (err.response.status === 422) {
                dispatch({
                    type  : SET_AUTH_ERROR,
                    error : 'It looks like this email is already in use'
                })
            } else {
                dispatch({
                    type  : SET_AUTH_ERROR,
                    error : err.response.data.error
                })
            }
        });
};



