import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { waterManagementReducer } from './waterManagementReducer';
import { allWaterDetailsReducer } from './allWaterDetailsReducer';

export default combineReducers({
    userReducer,
    waterManagementReducer,
    allWaterDetailsReducer
})