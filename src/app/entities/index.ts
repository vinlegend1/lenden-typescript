import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import common from './common';

export default combineReducers({
	common,
	burgerMenu,
});
