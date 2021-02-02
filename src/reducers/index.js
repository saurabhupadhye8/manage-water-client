import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { waterManagementReducer } from './waterManagementReducer';

export default combineReducers({
    userReducer,
    waterManagementReducer
})