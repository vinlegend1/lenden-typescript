import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import userDetails from './userDetails';

export default combineReducers({
	login,
	signup,
	userDetails,
});
