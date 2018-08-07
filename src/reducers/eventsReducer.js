import {SET_ERROR, SET_NEARBY, SET_FILTERED_EVENTS, SAVE_EVENT, SET_VENUE, RESET_VENUE} from '../actions/types';

const eventReducerDefaultState = {
    events : [],
    filteredEvents : [],
    currentEventVenue : {},
    errors  : '',
    newEventSaved : false,
};

export default (state=eventReducerDefaultState, action) => {
    switch(action.type) {
        case SET_ERROR:
            return {...state, errors : action.error};
        break;
        case SET_NEARBY:
            return {...state, events: action.events};
        case SET_FILTERED_EVENTS:
            return {...state, filteredEvents: action.events};
            break;
        case SAVE_EVENT:
            return {
                ...state,
                newEventSaved: !state.newEventSaved,
                errors: ''
            };
            break;
        case SET_VENUE:
            return {
                ...state,
                currentEventVenue: action.venue
            };
        case RESET_VENUE:
            return {
                ...state,
                currentEventVenue : {}
            };
        default:
            return state;
    }

}