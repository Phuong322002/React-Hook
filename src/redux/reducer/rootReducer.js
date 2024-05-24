import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
    // counter ở đây theo tôi hiểu nó cũng là state của hàm counterReducer
    counter: counterReducer
});
export default rootReducer;