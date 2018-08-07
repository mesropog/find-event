import axios from 'axios';

import ENV from '../../ENV';
import {setError} from './events';
import {
    SET_CATEGORY,
    SET_LOCATION,
    SET_PRICE,
    SET_TYPE,
    SET_TEXT,
    SET_TODAY,
    SET_TOMORROW,
    SET_THIS_FRIDAY,
    SET_THIS_WEEK,
    SET_THIS_WEEKEND,
    SET_NEXT_WEEK,
    SET_THIS_MONTH,
    GET_CATEGORIES,
    REMOVE_FILTER,
} from './types';

const ROOT_URL = ENV.eventbriteAPI.rootURL;

export const getCategories = () => dispatch => {
    return axios.get(`${ROOT_URL}/categories/`, {headers : {Authorization : ENV.eventbriteAPI.OAuthToken}})
        .then(resp =>  {
            //console.log(resp.data.categories);
            dispatch({
                type : GET_CATEGORIES,
                categories : resp.data.categories
            })
        })
        .catch(err => {
            //console.log(err.response.data.error_description);
            dispatch(setError(err.response.data.error_description));
        })
};

export const setCategory = category =>  ({
    type : SET_CATEGORY,
    category
});

export const setLocation = location => ({
    type : SET_LOCATION,
    location
});

export const setPrice = price => ({
    type : SET_PRICE,
    price
});

export const setType = typeOfE => ({
    type : SET_TYPE,
    typeOfE
});

export const setText = text => ({
    type : SET_TEXT,
    text
});

export const setToday = () => ({
    type : SET_TODAY
});

export const setTomorrow = () => ({
    type : SET_TOMORROW
});

export const setThisFriday = () => ({
    type : SET_THIS_FRIDAY
});

export const setThisWeek = () => ({
    type : SET_THIS_WEEK
});

export const setThisWeekend = () => ({
    type : SET_THIS_WEEKEND
});

export const setNextWeek = () => ({
    type : SET_NEXT_WEEK
});

export const setThisMonth = () => ({
    type : SET_THIS_MONTH
});

export const removeFilter = filter => ({
    type : REMOVE_FILTER,
    filter
});




