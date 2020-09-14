import { createSlice, Dispatch } from '@reduxjs/toolkit';
import mobileFormData from '../../../data/forms/mobileFormData';
import { ErrorResponsePayload } from '../../models/api';
import { ActionWithPayload, RootState } from './../../models/index';

export interface MobileFormSlicePage1 {
	brand: string;
	model: string;
	otherBrandName: string;
	workingCondition: string;
	phoneDamaged: string[];
	screenIssues: string[];
}
export interface MobileFormSlicePage2 {
	functionalIssues: string[];
	accessories: string[];
	mobileAge: string;
	insurance: number;
}

interface InitialState {
	loading: boolean;
	error: string;
	success: string;
	data: MobileFormSlicePage1 & MobileFormSlicePage2;
}

const initialBrand = mobileFormData.brand.options[0];
const initialModel = mobileFormData.model.options[initialBrand][0];

const initialState: InitialState = {
	loading: false,
	error: '',
	success: '',
	data: {
		brand: initialBrand,
		model: initialModel,
		otherBrandName: '',
		workingCondition: '',
		phoneDamaged: [],
		screenIssues: [],
		functionalIssues: [],
		accessories: [],
		insurance: 0,
		mobileAge: '',
	},
};

const mapToViewModal = (data: MobileFormSlicePage1 & MobileFormSlicePage2) => {
	let accessories;

	const accessoriesOptions = mobileFormData.accessories.options;
	const accessoriesOptionsLength =
		mobileFormData.accessories.options.length - 1;
	const accessoriesLastOption = accessoriesOptions[accessoriesOptionsLength];

	if (data.accessories.includes(accessoriesLastOption)) {
		accessories = [
			...data.accessories.filter(acc => acc !== accessoriesLastOption),
			`insurance (${data.insurance} months left)`,
		].join(', ');
	} else {
		accessories = [...data.accessories].join(', ');
	}

	return {
		brand: data.brand !== 'Others' ? data.brand : data.otherBrandName,
		model: data.model,
		workingcondition: data.workingCondition,
		bodydamaged: data.phoneDamaged.join(', '),
		problems: data.screenIssues.join(', '),
		functionalissues: data.functionalIssues.join(', '),
		accessories,
		age: data.mobileAge,
	};
};

const slice = createSlice({
	name: 'mobileForm',
	initialState,
	reducers: {
		page1DetailsUpdated: (
			state,
			action: ActionWithPayload<MobileFormSlicePage1>
		) => {
			const {
				brand,
				model,
				otherBrandName,
				workingCondition,
				phoneDamaged,
				screenIssues,
			} = action.payload;

			state.data.brand = brand;
			state.data.model = model;
			state.data.otherBrandName = otherBrandName;
			state.data.workingCondition = workingCondition;
			state.data.phoneDamaged = phoneDamaged;
			state.data.screenIssues = screenIssues;
		},
		page2DetailsUpdated: (
			state,
			action: ActionWithPayload<MobileFormSlicePage2>
		) => {
			const {
				functionalIssues,
				accessories,
				mobileAge,
				insurance,
			} = action.payload;

			state.data.functionalIssues = functionalIssues;
			state.data.accessories = accessories;
			state.data.mobileAge = mobileAge;
			state.data.insurance = insurance;
		},

		formCleared: state => {
			state.data.brand = initialBrand;
			state.data.model = initialModel;
			state.data.otherBrandName = '';
			state.data.workingCondition = '';
			state.data.phoneDamaged = [];
			state.data.screenIssues = [];
			state.data.functionalIssues = [];
			state.data.accessories = [];
			state.data.mobileAge = '';
			state.data.insurance = 0;
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
	page1DetailsUpdated,
	page2DetailsUpdated,
	formCleared,
	formSubmitInitiated,
	formSubmitFailed,
	formSubmitSuccess,
} = slice.actions;

export const updateMobileFormPage1Details = (data: MobileFormSlicePage1) =>
	page1DetailsUpdated(data);
export const updateMobileFormPage2Details = (data: MobileFormSlicePage2) =>
	page2DetailsUpdated(data);

export const postMobileForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.mobileForm.data;
	const data = mapToViewModal(formState);
	console.log(data);

	// dispatch(
	//     apiCallBegan({
	//         method: 'post',
	//         url: 'products/book',
	//         data,
	//         onStart: formSubmitInitiated.type,
	//         onError: formSubmitFailed.type,
	//         onSuccess: formSubmitSuccess.type,
	//     })
	// );
};

export const clearMobileForm = () => formCleared();
