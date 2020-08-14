import { logout } from '../../services/authService';
import { userLoggedOut } from '../auth/login';
import { Dispatch, Action } from 'redux';
import { MiddlewareStore } from '../models';

const postLogin = (_store: MiddlewareStore) => (next: Dispatch) => (
	action: Action
) => {
	if (action.type !== userLoggedOut.type) return next(action);
	next(action);
	logout();
};

export default postLogin;
