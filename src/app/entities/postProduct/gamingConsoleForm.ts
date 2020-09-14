import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ErrorResponsePayload } from '../../models/api';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';

export interface GamingConsoleFormSliceState {
	brand: string | number;
	model: string;
	description: string;
	workingCondition: string;
	functionalIssues: string[];
	accessories: string[];
	consoleAge: string;
	condition: string;
}

interface InitialState {
	loading: boolean;
	error: string;
	success: string;
	data: GamingConsoleFormSliceState;
}

const initialState: InitialState = {
	loading: false,
	error: '',
	success: '',
	data: {
		brand: 0,
		model: '',
		description: '',
		workingCondition: '',
		functionalIssues: [],
		accessories: [],
		consoleAge: '',
		condition: '',
	},
};

const mapToViewModal = (data: GamingConsoleFormSliceState) => ({
	brand: data.brand,
	model: data.model,
	description: data.description,
	workingcondition: data.workingCondition,
	functionalissue: data.functionalIssues.join(', '),
	accessories: data.accessories.join(', '),
	overallcondition: data.condition,
	age: data.consoleAge,
});

const slice = createSlice({
	name: 'gamingConsoleForm',
	initialState,
	reducers: {
		formDetailsUpdated: (
			state,
			action: ActionWithPayload<GamingConsoleFormSliceState>
		) => {
			const {
				brand,
				model,
				workingCondition,
				functionalIssues,
				accessories,
				consoleAge,
				description,
				condition,
			} = action.payload;

			state.data.brand = brand;
			state.data.model = model;
			state.data.workingCondition = workingCondition;
			state.data.functionalIssues = functionalIssues;
			state.data.accessories = accessories;
			state.data.consoleAge = consoleAge;
			state.data.description = description;
			state.data.condition = condition;
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

export const updateGamingConsoleFormDetails = (
	data: GamingConsoleFormSliceState
) => formDetailsUpdated(data);
export const clearGamingConsoleForm = () => formCleared();

export const postGamingConsoleForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.gamingConsoleForm.data;
	const data = mapToViewModal(formState);
	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/gamingconsole',
			data,
			onStart: formSubmitInitiated.type,
			onError: formSubmitFailed.type,
			onSuccess: formSubmitSuccess.type,
		})
	);
};
