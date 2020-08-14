import rootReducer from './../reducer';
import { Dispatch } from 'redux';

export type RootState = ReturnType<typeof rootReducer>;

export interface MiddlewareStore {
	getState(): RootState;
	dispatch: Dispatch; //TODO
}
