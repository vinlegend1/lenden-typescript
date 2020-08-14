import {
	createAction,
	Action,
	ActionCreator,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { RequestObject, ResponseObject } from './models/api';

export const apiCallBegan: ActionCreatorWithPayload<
	RequestObject,
	string
> = createAction('api/callBegan');

export const apiCallSuccess: ActionCreatorWithPayload<
	ResponseObject,
	string
> = createAction('api/callSuccess');

export const apiCallFailed: ActionCreator<Action> = createAction(
	'api/callFailed'
);
