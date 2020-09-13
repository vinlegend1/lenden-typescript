import { combineReducers } from 'redux';
import bookForm from './bookForm';
import gamingCdForm from './gamingCdForm';
import gamingConsoleForm from './gamingConsoleForm';

export default combineReducers({
	bookForm,
	gamingCdForm,
	gamingConsoleForm,
});
