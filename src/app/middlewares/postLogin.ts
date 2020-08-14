import { setToken } from '../../services/authService';
import { loginFulfilled } from '../auth/login';
import { MiddlewareStore } from '../models';
import { Dispatch } from 'redux';

interface Action {
	type: string;
	payload: {
		location: {
			state?: {
				from: {
					pathname: string;
				};
			};
		};
		headers: {
			authorization: string;
		};
	};
}

const postLogin = (_store: MiddlewareStore) => (next: Dispatch) => (
	action: Action
) => {
	if (action.type !== loginFulfilled.type) return next(action);

	const { location, headers } = action.payload;

	if (location.state) window.location.replace(location.state.from.pathname);
	window.location.replace('/');

	next(action);
	setToken(headers.authorization);
};

export default postLogin;
