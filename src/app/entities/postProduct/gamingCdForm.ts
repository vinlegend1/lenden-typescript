import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';

export interface GamingCdFormSliceState {
	title: string;
	deviceCompatible: string;
	description: string;
	originalCase: string;
	scratches: string;
}

const initialState: GamingCdFormSliceState = {
	title: '',
	deviceCompatible: '',
	description: '',
	originalCase: '',
	scratches: '',
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

			state.title = title;
			state.deviceCompatible = deviceCompatible;
			state.description = description;
			state.originalCase = originalCase;
			state.scratches = scratches;
		},
		formCleared: state => Object.keys(state).forEach(key => (state[key] = '')),
	},
});

export default slice.reducer;

const { formDetailsUpdated, formCleared } = slice.actions;

export const updateGamingCdFormDetails = (data: GamingCdFormSliceState) =>
	formDetailsUpdated(data);
export const clearGamingCdForm = () => formCleared();

export const postGamingCdForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.gamingCdForm;
	const data = mapToViewModal(formState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/gamingcd',
			data,
		})
	);
};
