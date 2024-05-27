import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import { userLogin } from '../action/userLogin';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

export default rootReducer;