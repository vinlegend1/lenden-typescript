import rootReducer from './../reducer';
import { Dispatch, Action } from 'redux';

export type RootState = ReturnType<typeof rootReducer>;

export interface MiddlewareStore {
	getState(): RootState;
	dispatch: Dispatch; //TODO
}

export interface ActionWithPayload<T> extends Action {
	type: string;
	payload: T;
}
