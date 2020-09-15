import { combineReducers } from 'redux';
import bookForm from './bookForm';
import gamingCdForm from './gamingCdForm';
import gamingConsoleForm from './gamingConsoleForm';
import mobileForm from './mobileForm';
import donateBook from './donateBook';

export default combineReducers({
	bookForm,
	gamingCdForm,
	gamingConsoleForm,
	mobileForm,
	donateBook,
});
