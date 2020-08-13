import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';

export default combineReducers({
	login,
	signup,
	user,
});
