import { combineReducers } from 'redux';
import mobiles from './mobiles';
import books from './books';

export default combineReducers({
	mobiles,
	books,
});
