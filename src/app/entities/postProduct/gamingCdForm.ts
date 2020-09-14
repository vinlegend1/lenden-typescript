import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';
import { ErrorResponsePayload } from '../../models/api';

export interface GamingCdFormSliceState {
	title: string;
	deviceCompatible: string;
	description: string;
	originalCase: string;
	scratches: string;
}

interface InitialState {
	loading: boolean;
	error: string;
	success: string;
	data: GamingCdFormSliceState;
}

const initialState: InitialState = {
	loading: false,
	error: '',
	success: '',
	data: {
		title: '',
		deviceCompatible: '',
		description: '',
		originalCase: '',
		scratches: '',
	},
};

const mapToViewModal = (data: GamingCdFormSliceState) => ({
	title: data.title,
	devicename: data.deviceCompatible,
	description: data.description,
	originalcase: data.originalCase,
	anyscratches: data.scratches,
});

const slice = createSlice({
	name: 'gamingCdForm',
	initialState,
	reducers: {
		formDetailsUpdated: (
			state,
			action: ActionWithPayload<GamingCdFormSliceState>
		) => {
			const {
				title,
				deviceCompatible,
				description,
				originalCase,
				scratches,
			} = action.payload;

			state.data.title = title;
			state.data.deviceCompatible = deviceCompatible;
			state.data.description = description;
			state.data.originalCase = originalCase;
			state.data.scratches = scratches;
		},
		formCleared: state => {
			const { data } = state;
			Object.keys(data).forEach(key => {
				if (typeof data[key] === 'string') data[key] = '';
				else if (Array.isArray(data[key])) data[key] = [];
				else if (typeof data[key] === 'object') data[key] = {};
			});
		},

		formSubmitInitiated: state => {
			state.loading = true;
			state.error = '';
			state.success = '';
		},
		formSubmitFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.loading = false;
			if (typeof action.payload === 'string') state.error = action.payload;
			else state.error = action.payload.data.message;
			state.success = '';
		},

		formSubmitSuccess: state => {
			state.loading = false;
			state.error = '';
			state.success = 'Successfully Submitted!';
		},
	},
});

export default slice.reducer;

const {
	formDetailsUpdated,
	formCleared,
	formSubmitInitiated,
	formSubmitFailed,
	formSubmitSuccess,
} = slice.actions;

export const updateGamingCdFormDetails = (data: GamingCdFormSliceState) =>
	formDetailsUpdated(data);
export const clearGamingCdForm = () => formCleared();

export const postGamingCdForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.gamingCdForm.data;
	const data = mapToViewModal(formState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/gamingcd',
			data,
			onStart: formSubmitInitiated.type,
			onError: formSubmitFailed.type,
			onSuccess: formSubmitSuccess.type,
		})
	);
};
