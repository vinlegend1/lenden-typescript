import { combineReducers } from 'redux';
import mobiles from './mobiles';
import books from './books';
import gamingCd from './gamingCd';

export default combineReducers({
	mobiles,
	books,
	gamingCd,
});
