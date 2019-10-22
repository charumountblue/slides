import { combineReducers } from 'redux';
import userStateReducer from './userStateReducer';
export default combineReducers({
  user: userStateReducer
});
