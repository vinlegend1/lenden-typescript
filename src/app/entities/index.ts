import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import common from './common';
import products from './products';
import productPage from './productPage';
import newProduct from './newProduct';

export default combineReducers({
	common,
	burgerMenu,
	products,
	productPage,
	newProduct,
});
