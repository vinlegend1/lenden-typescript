import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import common from './common';
import products from './products';

export default combineReducers({
	common,
	burgerMenu,
	products,
});
