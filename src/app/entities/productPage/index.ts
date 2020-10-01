import { combineReducers } from 'redux';
import mobiles from './mobiles';
import books from './books';
import gamingCd from './gamingCd';
import gamingConsoles from './gamingConsoles';

export default combineReducers({
	mobiles,
	books,
	gamingCd,
	gamingConsoles,
});
