import {combineReducers} from 'redux';

import EventReducer from '../reducers/eventsReducer';
import FiltersReducer from '../reducers/filtersReducer';
import UserDataReducer from '../reducers/userDataReducer';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
    events   : EventReducer,
    filters  : FiltersReducer,
    userData : UserDataReducer,
    form     : formReducer
});

export default rootReducer;